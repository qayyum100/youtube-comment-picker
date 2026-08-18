import { GoogleGenerativeAI } from '@google/generative-ai';

const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is not defined.');
    }
    return new GoogleGenerativeAI(apiKey);
};

export const generateTitles = async (req, res) => {
    const { topic, category, tone } = req.body;
    
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Generate 10 viral YouTube video titles about "${topic}" in the category of "${category || 'General'}" with a "${tone || 'Exciting'}" tone. 
        Format the output as a JSON array of objects, where each object has:
        - "title" (string)
        - "seoScore" (number between 0 and 100)
        - "ctrScore" (number between 0 and 100)
        - "emotionScore" (number between 0 and 100)
        Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        let titles = [];
        try {
            titles = JSON.parse(responseText);
        } catch(e) {
            console.error("JSON parse error:", e);
            const jsonMatch = responseText.match(/\[.*\]/s);
            if (jsonMatch) titles = JSON.parse(jsonMatch[0]);
            else titles = JSON.parse(responseText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim());
        }

        return res.json({ titles });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate titles' });
    }
};

export const generateDescription = async (req, res) => {
    const { topic, title } = req.body;
    
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Write an SEO-optimized YouTube video description for a video about "${topic}". The video title is "${title || ''}".
        Include:
        - A catchy introduction
        - 3-5 key points
        - Suggested chapters (timestamps)
        - Call to action
        - Relevant hashtags at the bottom
        Return the result as plain text.`;

        const result = await model.generateContent(prompt);
        return res.json({ description: result.response.text() });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate description' });
    }
};

export const analyzeSEO = async (req, res) => {
    const { title, description, tags, viewCount, likeCount, commentCount } = req.body;
    
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Analyze the following YouTube video data for SEO optimization:
        Title: "${title}"
        Description: "${description}"
        Tags: ${tags?.join(', ') || 'None'}
        Views: ${viewCount}
        Likes: ${likeCount}
        Comments: ${commentCount}
        
        Provide a JSON object containing:
        - "score" (overall SEO score out of 100)
        - "good" (array of strings, positive SEO aspects)
        - "improve" (array of strings, suggestions for improvement)
        Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        const jsonMatch = responseText.match(/\{.*\}/s);
        let analysis = {};
        if (jsonMatch) {
            analysis = JSON.parse(jsonMatch[0]);
        } else {
            analysis = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
        }

        return res.json({ analysis });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to analyze SEO' });
    }
};

export const analyzeComments = async (req, res) => {
    const { comments } = req.body;
    
    if (!comments || !Array.isArray(comments) || comments.length === 0) {
         return res.status(400).json({ error: 'Comments array is required' });
    }

    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });
        
        const sampleComments = comments.slice(0, 50).map(c => c.text).join(' | ');

        const prompt = `Analyze the sentiment and content of these YouTube comments:
        ${sampleComments}
        
        Provide a JSON object containing:
        - "positive" (percentage 0-100)
        - "neutral" (percentage 0-100)
        - "negative" (percentage 0-100)
        - "questions" (array of 3-5 strings, common questions asked by audience)
        - "suggestions" (array of 3-5 strings, audience requests or suggestions)
        - "summary" (A brief paragraph titled "What your audience wants")
        Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        let analysis = {};
        try {
            analysis = JSON.parse(responseText);
        } catch (e) {
            console.error("JSON parse error, attempting regex fallback.", e);
            const jsonMatch = responseText.match(/\{.*\}/s);
            if (jsonMatch) {
                analysis = JSON.parse(jsonMatch[0]);
            } else {
                analysis = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
            }
        }

        return res.json({ analysis });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to analyze comments' });
    }
};

export const generateHashtags = async (req, res) => {
    const { topic, platform = 'instagram' } = req.body;
    
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Act as a social media hashtag research engine like Best-Hashtags.com for the topic "${topic}" and platform "${platform}".
        Generate a comprehensive JSON object containing:
        - "bestSet1": array of exactly 30 top-performing, high-reach hashtags (strings starting with #)
        - "bestSet2": array of 20-30 alternative high-converting hashtags
        - "bestSet3": array of 15-25 low-competition niche hashtags
        - "popular": array of 10 broad high-volume hashtags
        - "niche": array of 10 targeted long-tail hashtags
        - "seo": array of 10 keyword-optimized hashtags
        - "relatedKeywords": array of 8 related topic terms
        - "difficultyScore": number between 15 and 95 (estimated competition)
        - "avgPostsCount": string (e.g., "1.4M posts")
        - "topTip": string of actionable platform recommendation for this topic
        Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        const jsonMatch = responseText.match(/\{.*\}/s);
        let hashtags = {};
        if (jsonMatch) {
            hashtags = JSON.parse(jsonMatch[0]);
        } else {
            hashtags = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
        }

        return res.json({ hashtags });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate hashtags' });
    }
};

export const generateScript = async (req, res) => {
    const { topic, length = '5 minutes', style = 'Educational' } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Write a YouTube video script for a video about "${topic}". The length should be around "${length}" and the tone/style should be "${style}".
        Format the script with clear sections:
        - "hook" (first 5-10 seconds)
        - "intro" (introduction)
        - "body" (main points with script and visual suggestions)
        - "cta" (call to action)
        - "outro" (closing remarks)
        Return ONLY valid JSON with keys: "hook", "intro", "body" (array of strings/sections), "cta", "outro".`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{.*\}/s);
        let script = {};
        if (jsonMatch) {
            script = JSON.parse(jsonMatch[0]);
        } else {
            script = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        }
        return res.json({ script });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate script' });
    }
};

export const generateShortsIdeas = async (req, res) => {
    const { niche, topic } = req.body;
    if (!niche) return res.status(400).json({ error: 'Niche is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });
        const prompt = `Generate 5 viral YouTube Shorts ideas for the niche "${niche}"${topic ? ` on the topic of "${topic}"` : ''}.
        Provide the output as a JSON array of 5 objects, where each object contains:
        - "title" (string, short punchy title)
        - "viralScore" (number 0-100)
        - "difficulty" (string: Easy, Medium, Hard)
        - "hook" (string, first sentence hook)
        - "caption" (string, suggested short caption)
        - "hashtags" (array of strings)
        Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        let ideas = [];
        try {
            ideas = JSON.parse(text);
        } catch(e) {
            console.error("JSON parse error:", e);
            const jsonMatch = text.match(/\[.*\]/s);
            if (jsonMatch) ideas = JSON.parse(jsonMatch[0]);
            else ideas = JSON.parse(text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim());
        }
        return res.json({ ideas });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate shorts ideas' });
    }
};

export const generateVideoIdeas = async (req, res) => {
    const { niche } = req.body;
    if (!niche) return res.status(400).json({ error: 'Niche is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Generate 10 video ideas for a YouTube channel in the niche "${niche}".
        Provide the output as a JSON array of 10 objects, where each object contains:
        - "title" (string)
        - "competition" (string: Low, Medium, High)
        - "difficulty" (string: Easy, Medium, Hard)
        - "viralPotential" (number 0-100)
        - "seoOpportunity" (number 0-100)
        Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[.*\]/s);
        let ideas = [];
        if (jsonMatch) {
            ideas = JSON.parse(jsonMatch[0]);
        } else {
            ideas = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        }
        return res.json({ ideas });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate video ideas' });
    }
};

export const generateChannelNames = async (req, res) => {
    const { niche } = req.body;
    if (!niche) return res.status(400).json({ error: 'Niche is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Generate YouTube channel names for the niche "${niche}".
        Provide the output as a JSON object containing 4 arrays:
        - "creative" (array of 5 strings)
        - "professional" (array of 5 strings)
        - "gaming" (array of 5 strings)
        - "brand" (array of 5 strings)
        Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{.*\}/s);
        let names = {};
        if (jsonMatch) {
            names = JSON.parse(jsonMatch[0]);
        } else {
            names = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        }
        return res.json({ names });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate channel names' });
    }
};

export const suggestKeywords = async (req, res) => {
    const { keyword } = req.body;
    if (!keyword) return res.status(400).json({ error: 'Keyword is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });
        const prompt = `Perform YouTube keyword research for the keyword "${keyword}".
        Estimate and simulate realistic granular SEO metrics based on typical search data.
        Provide the output as a JSON object containing:
        - "suggestions" (array of 5 related keyword objects)
        - "longtail" (array of 5 longtail keyword objects)
        - "clusters" (array of 5-8 short strings related to the niche)
        
        Each keyword object must have the following exact keys:
        - "keyword" (string): the keyword phrase
        - "searchVolume" (number): estimated monthly search volume
        - "trend" (string): trend visualization (e.g., "📈 +12%" or "📉 -5%" or "➡️ Flat")
        - "trendHistory" (array of 12 numbers): 12-month search volume trend data points (e.g., [40, 50, 45, 60...])
        - "difficultyScore" (number): Keyword Golden Ratio/difficulty (0 to 100, 100 being hardest)
        - "cpc" (number): estimated cost per click in USD (e.g., 1.45)
        - "intent" (string): search intent ("Informational", "Commercial", or "Transactional")
        - "viewVelocity" (string): "High", "Medium", or "Low"
        - "cps" (number): clicks per search (e.g., 0.8)
        - "ctr" (number): click-through rate percentage (e.g., 45)
        - "topChannels" (array of 3 objects): Top ranking channels, each with "name" (string), "subs" (string like "1.5M"), and "views" (string like "340K")
        
        Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        let data = {};
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error("JSON parse error:", e);
            const jsonMatch = text.match(/\{.*\}/s);
            if (jsonMatch) data = JSON.parse(jsonMatch[0]);
            else data = JSON.parse(text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim());
        }
        return res.json({ data });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to suggest keywords' });
    }
};

export const generateTimestamps = async (req, res) => {
    const { transcript } = req.body;
    if (!transcript) return res.status(400).json({ error: 'Transcript is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Based on this video transcript: "${transcript.slice(0, 4000)}", generate a YouTube chapter timeline.
        Provide the output as a JSON array of objects, where each object contains:
        - "time" (string, e.g. "01:20")
        - "title" (string, e.g. "Topic Discussion")
        Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[.*\]/s);
        let timestamps = [];
        if (jsonMatch) {
            timestamps = JSON.parse(jsonMatch[0]);
        } else {
            timestamps = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        }
        return res.json({ timestamps });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate timestamps' });
    }
};

export const summarizeVideo = async (req, res) => {
    const { transcript, format = 'bullet' } = req.body;
    if (!transcript) return res.status(400).json({ error: 'Transcript is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Summarize this YouTube transcript: "${transcript.slice(0, 4000)}" using the format: "${format}".
        Provide the output as a JSON object containing:
        - "shortSummary" (string, quick 2-sentence summary)
        - "detailedSummary" (string or array of strings, in-depth breakdown matching the requested format)
        - "keyPoints" (array of strings)
        - "actionItems" (array of strings)
        Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{.*\}/s);
        let summary = {};
        if (jsonMatch) {
            summary = JSON.parse(jsonMatch[0]);
        } else {
            summary = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        }
        return res.json({ summary });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to summarize video' });
    }
};

export const generateVideoOutline = async (req, res) => {
    const { keywords } = req.body;
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
        return res.status(400).json({ error: 'Array of keywords is required' });
    }
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });
        const prompt = `Act as an expert YouTube strategist. I have selected the following keywords for a video:
        [${keywords.join(', ')}]
        
        Generate a highly structured video script outline tailored to maximize watch time based on these keywords.
        Provide the output as a JSON object containing:
        - "title" (string): A suggested working title
        - "hook" (string): The critical first 5-second hook
        - "introduction" (string): Establishing the value proposition
        - "corePoints" (array of strings): 3-5 main talking points
        - "callToAction" (string): Outro and engagement prompt
        
        Return ONLY valid JSON.`;
        
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        let data = {};
        try {
            data = JSON.parse(text);
        } catch(e) {
            console.error("JSON parse error:", e);
            const jsonMatch = text.match(/\{.*\}/s);
            if (jsonMatch) data = JSON.parse(jsonMatch[0]);
            else data = JSON.parse(text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim());
        }
        return res.json({ data });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate video outline' });
    }
};

export const generateShortsHashtags = async (req, res) => {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Generate a list of 8 viral and high-converting YouTube Shorts hashtags for a video about "${topic}".
        Include #Shorts, #YouTubeShorts, and the rest should be highly relevant. Return as a JSON array of strings (e.g. ["#Shorts", "#YouTubeShorts", ...]). Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[.*\]/s);
        let hashtags = [];
        if (jsonMatch) hashtags = JSON.parse(jsonMatch[0]);
        else hashtags = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        return res.json({ hashtags });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate Shorts hashtags' });
    }
};

export const generateShortsTitles = async (req, res) => {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Generate 5 viral, click-worthy titles for a YouTube Short about "${topic}". They must be under 50 characters, punchy, and emotional/curious. Add '#Shorts' at the end of each.
        Return as a JSON array of strings. Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[.*\]/s);
        let titles = [];
        if (jsonMatch) titles = JSON.parse(jsonMatch[0]);
        else titles = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        return res.json({ titles });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate Shorts titles' });
    }
};

export const generateShortsCaptions = async (req, res) => {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Write 3 engaging YouTube Shorts description captions with calls-to-action (like "wait till the end", "comment your thoughts") for the topic "${topic}".
        Return as a JSON array of strings. Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[.*\]/s);
        let captions = [];
        if (jsonMatch) captions = JSON.parse(jsonMatch[0]);
        else captions = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        return res.json({ captions });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate Shorts captions' });
    }
};

export const analyzeShortsHook = async (req, res) => {
    const { hook } = req.body;
    if (!hook) return res.status(400).json({ error: 'Hook text is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Analyze this opening line/hook for a YouTube Short: "${hook}".
        Evaluate:
        1. Score out of 100
        2. Curiosity level (e.g. High, Medium, Low)
        3. Word count/length feedback
        4. Brief suggestions for improvements.
        Return as a JSON object with keys: "score" (number), "curiosityGap" (string), "wordCount" (string), "verdict" (string). Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{.*\}/s);
        let analysis = {};
        if (jsonMatch) analysis = JSON.parse(jsonMatch[0]);
        else analysis = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        return res.json({ analysis });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to analyze Shorts hook' });
    }
};

export const generateCommunityPosts = async (req, res) => {
    const { topic, type } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Write a viral YouTube Community post about "${topic}" of type "${type || 'engagement'}". Include emojis and call-to-actions.
        Return the result as a JSON object with key "post" containing the formatted text. Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{.*\}/s);
        let post = {};
        if (jsonMatch) post = JSON.parse(jsonMatch[0]);
        else post = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        return res.json(post);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate community post' });
    }
};

export const generateLiveStreamTitles = async (req, res) => {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Generate 4 click-worthy titles for a YouTube Live Stream about "${topic}". Include live indicators like "🔴 LIVE" or "LIVE NOW".
        Return as a JSON array of strings. Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[.*\]/s);
        let titles = [];
        if (jsonMatch) titles = JSON.parse(jsonMatch[0]);
        else titles = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        return res.json({ titles });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate live stream titles' });
    }
};

export const suggestClipMoments = async (req, res) => {
    const { videoTitle, transcriptText, durationSec = 300 } = req.body;
    
    const fallbackMoments = [
        {
            title: "Strong Intro Hook & Problem Statement",
            startTime: "00:10",
            endTime: "00:45",
            startSec: 10,
            endSec: 45,
            duration: "00:35",
            reasoning: "High energy opening hook that grabs immediate attention and establishes value."
        },
        {
            title: "Core Insight & Main Key Takeaway",
            startTime: "01:15",
            endTime: "01:50",
            startSec: 75,
            endSec: 110,
            duration: "00:35",
            reasoning: "Delivers the central solution with concise punchy phrasing ideal for social clips."
        },
        {
            title: "Actionable Advice & Final Wrap-up",
            startTime: "02:30",
            endTime: "03:00",
            startSec: 150,
            endSec: 180,
            duration: "00:30",
            reasoning: "Self-contained tip with high viral potential and clear call to action."
        }
    ];

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.json({ moments: fallbackMoments, simulated: true });
        }

        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Analyze this YouTube video context:
Title: "${videoTitle || 'YouTube Video'}"
Transcript / Context: "${(transcriptText || '').slice(0, 3000)}"
Video Duration in seconds: ${durationSec}

Identify 3 high-engagement viral clip moments (between 15 to 60 seconds each).
Return a JSON object with a "moments" array, where each item has:
- "title" (string, short punchy title)
- "startSec" (number, start second timestamp)
- "endSec" (number, end second timestamp)
- "startTime" (string formatted MM:SS)
- "endTime" (string formatted MM:SS)
- "duration" (string formatted MM:SS)
- "reasoning" (string, why this moment is great for TikTok/Shorts/Reels)
Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        let data = {};
        try {
            data = JSON.parse(text);
        } catch(e) {
            const jsonMatch = text.match(/\{.*\}/s);
            if (jsonMatch) data = JSON.parse(jsonMatch[0]);
        }

        if (data && Array.isArray(data.moments) && data.moments.length > 0) {
            return res.json({ moments: data.moments, simulated: false });
        }
        return res.json({ moments: fallbackMoments, simulated: true });
    } catch (error) {
        console.error("Clip Moments AI Error:", error.message);
        return res.json({ moments: fallbackMoments, simulated: true });
    }
};

export const generateCommentReplies = async (req, res) => {
    const { comment, tone = 'Appreciative' } = req.body;
    if (!comment) return res.status(400).json({ error: 'Viewer comment is required' });

    const fallbacks = [
        `Thanks so much for watching! Really glad this resonated with you. 🙌`,
        `Great point! I'm planning to cover that in a follow-up video soon. Stay tuned! 🔔`,
        `Appreciate your feedback! What topic would you like to see next on the channel? 🚀`
    ];

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return res.json({ replies: fallbacks, simulated: true });

        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Generate 3 smart, engaging, high-converting YouTube comment replies to the following viewer comment with a "${tone}" tone.
Comment: "${comment}"
Return a JSON object with a "replies" array containing 3 string responses. Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        let data = {};
        try {
            data = JSON.parse(text);
        } catch(e) {
            const jsonMatch = text.match(/\{.*\}/s);
            if (jsonMatch) data = JSON.parse(jsonMatch[0]);
        }

        if (data && Array.isArray(data.replies) && data.replies.length > 0) {
            return res.json({ replies: data.replies, simulated: false });
        }
        return res.json({ replies: fallbacks, simulated: true });
    } catch (error) {
        console.error("Comment Reply AI Error:", error.message);
        return res.json({ replies: fallbacks, simulated: true });
    }
};

export const generateContentRepurposer = async (req, res) => {
    const { text, title = '' } = req.body;
    if (!text) return res.status(400).json({ error: 'Text content is required' });

    const fallbacks = {
        tweet: `🚀 Quick key takeaway from our latest video "${title || 'YouTube Guide'}":\n\n${text.slice(0, 180)}...\n\nWhat are your thoughts on this? 👇 #YouTube #ContentCreator`,
        linkedin: `💡 Key Insight on ${title || 'Video Strategy'}:\n\n${text.slice(0, 300)}\n\nHere are 3 quick takeaways:\n1. Focus on clear structure\n2. Hook the audience in the first 5s\n3. Deliver immediate value\n\nHow do you approach this in your content?`,
        shortsHook: `Did you know that ${text.slice(0, 100)}? Here is exactly how to leverage this for 10x views!`,
        newsletter: `Hey Creators!\n\nIn this issue, we breakdown: ${title || 'Content Optimization'}.\n\n${text.slice(0, 400)}\n\nUntil next time,\nHappy creating!`,
        igCaption: `✨ NEW POST ✨\n\n"${title || 'Creator Secrets'}"\n\n${text.slice(0, 250)}\n\nDouble tap if this helped you! ❤️ Save for later! 📌`
    };

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return res.json({ repurposed: fallbacks, simulated: true });

        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Repurpose the following video script/transcript snippet into 5 social media formats:
Title context: "${title}"
Content: "${text.slice(0, 3000)}"

Return a JSON object with:
- "tweet" (X/Twitter post)
- "linkedin" (LinkedIn structured post)
- "shortsHook" (15-second viral Shorts script hook)
- "newsletter" (Short newsletter email section)
- "igCaption" (Instagram caption with emojis and tags)
Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const resText = result.response.text();
        let data = {};
        try {
            data = JSON.parse(resText);
        } catch(e) {
            const jsonMatch = resText.match(/\{.*\}/s);
            if (jsonMatch) data = JSON.parse(jsonMatch[0]);
        }

        if (data && data.tweet) {
            return res.json({ repurposed: data, simulated: false });
        }
        return res.json({ repurposed: fallbacks, simulated: true });
    } catch (error) {
        console.error("Content Repurposer AI Error:", error.message);
        return res.json({ repurposed: fallbacks, simulated: true });
    }
};

export const generateFaqs = async (req, res) => {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

    const fallbacks = [
        { q: `How long does it take to see results with ${topic}?`, a: `Most creators notice clear improvements within 14-30 days when executing consistently.` },
        { q: `What equipment or tools do I need for ${topic}?`, a: `No expensive setup is required. Free built-in tools and standard smartphones are more than enough to start.` },
        { q: `What is the #1 mistake to avoid in ${topic}?`, a: `Overcomplicating the initial structure. Focus on immediate audience value over complex editing.` },
        { q: `Can beginners succeed with ${topic}?`, a: `Yes, following structured best practices allows channels of any size to gain fast traction.` }
    ];

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return res.json({ faqs: fallbacks, simulated: true });

        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Generate 4 frequently asked questions (FAQs) with concise answers about "${topic}" to include in a YouTube video description or pinned comment.
Return a JSON object with a "faqs" array where each object has "q" (question string) and "a" (answer string). Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        let data = {};
        try {
            data = JSON.parse(text);
        } catch(e) {
            const jsonMatch = text.match(/\{.*\}/s);
            if (jsonMatch) data = JSON.parse(jsonMatch[0]);
        }

        if (data && Array.isArray(data.faqs) && data.faqs.length > 0) {
            return res.json({ faqs: data.faqs, simulated: false });
        }
        return res.json({ faqs: fallbacks, simulated: true });
    } catch (error) {
        console.error("FAQ AI Error:", error.message);
        return res.json({ faqs: fallbacks, simulated: true });
    }
};

