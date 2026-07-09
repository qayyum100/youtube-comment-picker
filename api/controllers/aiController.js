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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
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
        return res.status(500).json({ error: 'Failed to analyze comments' });
    }
};

export const generateHashtags = async (req, res) => {
    const { topic } = req.body;
    
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
