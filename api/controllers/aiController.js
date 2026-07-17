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
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Generate 10 viral YouTube video titles about "${topic}" in the category of "${category || 'General'}" with a "${tone || 'Exciting'}" tone. 
        Format the output as a JSON array of objects, where each object has:
        - "title" (string)
        - "seoScore" (number between 0 and 100)
        - "ctrScore" (number between 0 and 100)
        - "emotionScore" (number between 0 and 100)
        Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Extract JSON array from text
        const jsonMatch = responseText.match(/\[.*\]/s);
        let titles = [];
        if (jsonMatch) {
            titles = JSON.parse(jsonMatch[0]);
        } else {
             // Fallback
            titles = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
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
            model: "gemini-1.5-flash",
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
    const { topic } = req.body;
    
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Generate a JSON object of YouTube hashtags for the topic "${topic}".
        Include 3 arrays:
        - "popular" (5-10 highly searched broad hashtags)
        - "niche" (5-10 specific, long-tail hashtags)
        - "seo" (5-10 keyword-rich hashtags)
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
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
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
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Perform YouTube keyword research for the keyword "${keyword}".
        Estimate and simulate realistic granular SEO metrics based on typical search data.
        Provide the output as a JSON object containing:
        - "suggestions" (array of 5 related keyword objects)
        - "longtail" (array of 5 longtail keyword objects)
        
        Each keyword object must have the following exact keys:
        - "keyword" (string): the keyword phrase
        - "searchVolume" (number): estimated monthly search volume
        - "trend" (string): trend visualization (e.g., "📈 +12%" or "📉 -5%" or "➡️ Flat")
        - "difficultyScore" (number): Keyword Golden Ratio/difficulty (0 to 100, 100 being hardest)
        - "cpc" (number): estimated cost per click in USD (e.g., 1.45)
        - "intent" (string): search intent ("Informational", "Commercial", or "Transactional")
        
        Return ONLY valid JSON.`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{.*\}/s);
        let data = {};
        if (jsonMatch) {
            data = JSON.parse(jsonMatch[0]);
        } else {
            data = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
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
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
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
        const jsonMatch = text.match(/\{.*\}/s);
        let data = {};
        if (jsonMatch) {
            data = JSON.parse(jsonMatch[0]);
        } else {
            data = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        }
        return res.json({ data });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate video outline' });
    }
};
