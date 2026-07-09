import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Controllers
import { getYouTubeComments, getYouTubeVideoDetails, getYouTubeChannelDetails } from './controllers/youtubeController.js';
import { generateTitles, generateDescription, analyzeSEO, analyzeComments, generateHashtags } from './controllers/aiController.js';
// We'll leave out instagram/tiktok comments for now, or just re-import them if needed. 
// For this SaaS, the focus is YouTube tools.

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// YouTube API Routes
app.get('/api/youtube/comments', getYouTubeComments);
app.get('/api/youtube/video', getYouTubeVideoDetails);
app.get('/api/youtube/channel', getYouTubeChannelDetails);

// AI Generator Routes
app.post('/api/ai/title-generator', generateTitles);
app.post('/api/ai/description-generator', generateDescription);
app.post('/api/ai/seo-analysis', analyzeSEO);
app.post('/api/ai/comment-analysis', analyzeComments);
app.post('/api/ai/hashtag-generator', generateHashtags);

// Provide fallback for the old endpoints just in case
app.get('/api/instagram/comments', (req, res) => res.json({ simulated: true, comments: [] }));
app.get('/api/tiktok/comments', (req, res) => res.json({ simulated: true, comments: [] }));

export default app;
