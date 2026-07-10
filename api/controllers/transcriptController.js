import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Helper to extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Scrape captions or use fallback
export const getTranscript = async (req, res) => {
  const { url, lang = 'en' } = req.query;
  const videoId = extractYouTubeId(url);

  if (!url) return res.status(400).json({ error: 'YouTube URL is required' });
  if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

  try {
    // 1. Try to scrape transcript
    const videoPageResponse = await axios.get(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const html = videoPageResponse.data;
    const splitHtml = html.split('"captions":');
    
    if (splitHtml.length > 1) {
      const jsonText = splitHtml[1].split(',"videoDetails"')[0];
      const captionsJson = JSON.parse(jsonText);
      const captionTracks = captionsJson?.playerCaptionsTracklistRenderer?.captionTracks;

      if (captionTracks && captionTracks.length > 0) {
        // Find language track or take first
        const track = captionTracks.find(t => t.languageCode === lang) || captionTracks[0];
        const xmlResponse = await axios.get(track.baseUrl);
        const xmlText = xmlResponse.data;

        // Parse simple text XML tags like <text start="0.4" dur="2.1">hello</text>
        const matches = [...xmlText.matchAll(/<text start="([\d\.]+)" dur="([\d\.]+)"[^>]*>([^<]+)<\/text>/g)];
        
        if (matches.length > 0) {
          const transcript = matches.map(m => {
            const start = parseFloat(m[1]);
            const duration = parseFloat(m[2]);
            const text = m[3]
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'");
            
            const minutes = Math.floor(start / 60);
            const seconds = Math.floor(start % 60).toString().padStart(2, '0');
            
            return {
              text,
              start,
              duration,
              time: `${minutes}:${seconds}`
            };
          });

          const fullText = transcript.map(t => t.text).join(' ');
          
          return res.json({
            videoId,
            transcript,
            fullText,
            simulated: false
          });
        }
      }
    }

    // 2. Scraper failed or no captions -> Fallback to Gemini generator using video metadata
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Fetch video title and details to inform Gemini
    let videoTitle = "YouTube Video";
    let videoDescription = "";
    const ytApiKey = process.env.YOUTUBE_API_KEY;
    if (ytApiKey) {
      try {
        const detailsResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${ytApiKey}`);
        const item = detailsResponse.data?.items?.[0]?.snippet;
        if (item) {
          videoTitle = item.title;
          videoDescription = item.description;
        }
      } catch (err) {
        console.warn('Failed to fetch video details for fallback transcript:', err.message);
      }
    }

    const prompt = `Based on the YouTube video titled "${videoTitle}" and description "${videoDescription.slice(0, 1000)}", generate a highly realistic and structured transcript with timestamps (0:00, 1:30, etc.) and speech sections. Make it detailed, informative, and closely matching what a video with this topic would contain. 
    Format the output as a JSON object with a "transcript" array of objects, each containing:
    - "time" (string, e.g. "0:15")
    - "start" (number, start time in seconds)
    - "text" (string of spoken text)
    And a "fullText" string containing the complete combined transcript text.
    Return ONLY valid JSON.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{.*\}/s);
    
    let generatedData = {};
    if (jsonMatch) {
      generatedData = JSON.parse(jsonMatch[0]);
    } else {
      generatedData = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
    }

    return res.json({
      videoId,
      transcript: generatedData.transcript || [],
      fullText: generatedData.fullText || "",
      simulated: true
    });

  } catch (error) {
    console.error('Transcript controller error:', error.message);
    return res.status(500).json({ error: 'Failed to generate transcript: ' + error.message });
  }
};
