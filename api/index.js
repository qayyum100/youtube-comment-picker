import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Controllers
import { 
  getYouTubeComments, 
  getYouTubeVideoDetails, 
  getYouTubeChannelDetails,
  checkVideoRank,
  getYouTubeChannelTags,
  getYouTubeSuggestions
} from './controllers/youtubeController.js';

import { 
  generateTitles, 
  generateDescription, 
  analyzeSEO, 
  analyzeComments, 
  generateHashtags,
  generateScript,
  generateShortsIdeas,
  generateVideoIdeas,
  generateChannelNames,
  suggestKeywords,
  generateTimestamps,
  summarizeVideo,
  generateVideoOutline
} from './controllers/aiController.js';

import { getTranscript } from './controllers/transcriptController.js';
import { analyzeThumbnail } from './controllers/imageController.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
// Expose larger payload limit for base64 uploads (Thumbnail Analysis)
app.use(express.json({ limit: '10mb' }));

// YouTube API Routes
app.get('/api/youtube/comments', getYouTubeComments);
app.get('/api/youtube/video', getYouTubeVideoDetails);
app.get('/api/youtube/channel', getYouTubeChannelDetails);
app.get('/api/youtube/channel-tags', getYouTubeChannelTags);
app.get('/api/youtube/suggest', getYouTubeSuggestions);

// Phase 2 Direct endpoints
app.get('/api/transcript', getTranscript);
  
app.post('/api/summary', summarizeVideo);
app.post('/api/thumbnail-analysis', analyzeThumbnail);
app.post('/api/script-generator', generateScript);
app.post('/api/shorts-ideas', generateShortsIdeas);
app.post('/api/video-ideas', generateVideoIdeas);
app.post('/api/channel-names', generateChannelNames);
app.post('/api/keyword-research', suggestKeywords);
app.post('/api/timestamps', generateTimestamps);
app.get('/api/rank-checker', checkVideoRank);
app.post('/api/ai/hashtag-generator', generateHashtags);
app.post('/api/ai/title-generator', generateTitles);
app.post('/api/ai/description-generator', generateDescription);
app.post('/api/ai/seo-analysis', analyzeSEO);
app.post('/api/ai/comment-analysis', analyzeComments);
app.post('/api/ai/outline-generator', generateVideoOutline);

app.get('/api/tools', (req, res) => {
  res.json({ status: "healthy", activeTools: 30 });
});

// Provide fallback for the old endpoints just in case
app.get('/api/instagram/comments', (req, res) => res.json({ simulated: true, comments: [] }));
app.get('/api/tiktok/comments', (req, res) => res.json({ simulated: true, comments: [] }));

export default app;
