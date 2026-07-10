import { GoogleGenerativeAI } from '@google/generative-ai';

export const analyzeThumbnail = async (req, res) => {
  const { image } = req.body; // Expect base64 encoded image string (e.g. data:image/png;base64,...)

  if (!image) {
    return res.status(400).json({ error: 'Image data is required' });
  }

  try {
    const base64Data = image.split(',')[1] || image;
    const mimeType = image.split(';')[0].split(':')[1] || 'image/jpeg';

    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    };

    const prompt = `Analyze this YouTube video thumbnail and estimate its CTR potential on a scale of 0 to 10. 
    Evaluate:
    - Overall CTR Score (0-10)
    - Readability of text (is it too small, bad font, too crowded?)
    - Contrast and color matching
    - Amount of text
    - Visual attraction and clarity
    - Face detection (are there expressive faces?)
    
    Provide the output in JSON format with:
    - "score" (number, e.g. 8.5)
    - "good" (array of strings, positive elements)
    - "improve" (array of strings, actionable improvement suggestions)
    Return ONLY valid JSON.`;

    const result = await model.generateContent([prompt, imagePart]);
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
    console.error('Image analysis error:', error.message);
    return res.status(500).json({ error: 'Failed to analyze image: ' + error.message });
  }
};
