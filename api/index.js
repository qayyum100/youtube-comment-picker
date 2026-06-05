import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { generateMockComments } from './commentsGenerator.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Helper to extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Helper to extract Instagram shortcode from URL
function extractInstagramShortcode(url) {
  if (!url) return null;
  const regExp = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Route: Get YouTube comments
app.get('/api/youtube/comments', async (req, res) => {
  const { url } = req.query;
  const videoId = extractYouTubeId(url);
  
  if (!url) {
    return res.status(400).json({ error: 'YouTube URL is required' });
  }
  
  if (!videoId) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  // Fallback to simulation mode if no API key is configured
  if (!apiKey) {
    const mockCount = Math.floor(Math.random() * (35 - 24 + 1)) + 24; // 24 to 35 comments
    const simulatedComments = generateMockComments('youtube', mockCount);
    return res.json({
      simulated: true,
      videoId,
      comments: simulatedComments,
      totalCount: simulatedComments.length
    });
  }

  try {
    // Call YouTube API v3 commentThreads
    const response = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
      params: {
        part: 'snippet',
        videoId: videoId,
        maxResults: 100, // retrieve up to 100 comments
        key: apiKey,
        textFormat: 'plainText'
      }
    });

    const items = response.data.items || [];
    const comments = items.map(item => {
      const snippet = item.snippet?.topLevelComment?.snippet;
      if (!snippet) return null;
      return {
        id: item.id || `yt_fallback_${Math.random().toString(36).substr(2, 9)}`,
        author: snippet.authorDisplayName || 'Anonymous User',
        authorAvatar: snippet.authorProfileImageUrl || 'https://api.dicebear.com/7.x/adventurer/svg?seed=anonymous',
        text: snippet.textDisplay || '',
        likes: snippet.likeCount || 0,
        timestamp: snippet.publishedAt || new Date().toISOString(),
        platform: 'youtube'
      };
    }).filter(Boolean);

    return res.json({
      simulated: false,
      videoId,
      comments,
      totalCount: comments.length
    });
  } catch (error) {
    console.error('YouTube API Error:', error.message);
    // If API key is configured but fails, fallback to simulation but indicate the error
    const mockCount = Math.floor(Math.random() * (35 - 24 + 1)) + 24;
    const simulatedComments = generateMockComments('youtube', mockCount);
    return res.json({
      simulated: true,
      error: 'Failed to contact YouTube API, running in sandbox mode.',
      videoId,
      comments: simulatedComments,
      totalCount: simulatedComments.length
    });
  }
});

// Route: Get Instagram comments
app.get('/api/instagram/comments', async (req, res) => {
  const { url } = req.query;
  const shortcode = extractInstagramShortcode(url);

  if (!url) {
    return res.status(400).json({ error: 'Instagram URL is required' });
  }

  if (!shortcode) {
    return res.status(400).json({ error: 'Invalid Instagram URL' });
  }

  // Instagram Scraping is extremely restricted and always requires credentials/proxies.
  // Hence, we default to the sandbox simulation which generates beautiful comments.
  const mockCount = Math.floor(Math.random() * (35 - 24 + 1)) + 24;
  const simulatedComments = generateMockComments('instagram', mockCount);

  return res.json({
    simulated: true,
    shortcode,
    comments: simulatedComments,
    totalCount: simulatedComments.length
  });
});

export default app;
