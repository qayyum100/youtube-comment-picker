import axios from 'axios';
import { generateMockComments } from '../commentsGenerator.js';

// Helper to extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Helper to extract channel ID or handle
function extractChannelId(url) {
  // basic implementation, can be extended
  if (!url) return null;
  const match = url.match(/(?:channel\/|c\/|user\/|@)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export const getYouTubeComments = async (req, res) => {
  const { url } = req.query;
  const videoId = extractYouTubeId(url);
  
  if (!url) return res.status(400).json({ error: 'YouTube URL is required' });
  if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    const mockCount = Math.floor(Math.random() * (35 - 24 + 1)) + 24;
    const simulatedComments = generateMockComments('youtube', mockCount);
    return res.json({ simulated: true, videoId, comments: simulatedComments, totalCount: simulatedComments.length });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
      params: { part: 'snippet', videoId: videoId, maxResults: 100, key: apiKey, textFormat: 'plainText' }
    });

    const items = response.data.items || [];
    const comments = items.map(item => {
      const snippet = item.snippet?.topLevelComment?.snippet;
      if (!snippet) return null;
      return {
        id: item.id,
        author: snippet.authorDisplayName,
        authorAvatar: snippet.authorProfileImageUrl,
        text: snippet.textDisplay,
        likes: snippet.likeCount,
        timestamp: snippet.publishedAt,
        platform: 'youtube'
      };
    }).filter(Boolean);

    return res.json({ simulated: false, videoId, comments, totalCount: comments.length });
  } catch (error) {
    console.error('YouTube API Error:', error.message);
    const mockCount = Math.floor(Math.random() * (35 - 24 + 1)) + 24;
    const simulatedComments = generateMockComments('youtube', mockCount);
    return res.json({ simulated: true, error: 'API failed, using sandbox mode.', videoId, comments: simulatedComments, totalCount: simulatedComments.length });
  }
};

export const getYouTubeVideoDetails = async (req, res) => {
  const { url } = req.query;
  const videoId = extractYouTubeId(url);
  
  if (!url) return res.status(400).json({ error: 'YouTube URL is required' });
  if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return res.json({
      simulated: true,
      videoId,
      title: "Sample Video Title for Testing",
      description: "This is a mock description for testing since no API key is provided.",
      channelTitle: "Test Channel",
      tags: ["test", "mock", "api", "youtube", "seo", "tags", "extractor"],
      thumbnails: { high: { url: "https://via.placeholder.com/480x360" } },
      viewCount: "150000",
      likeCount: "12000",
      commentCount: "450"
    });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: { part: 'snippet,statistics', id: videoId, key: apiKey }
    });
    
    if (!response.data.items || response.data.items.length === 0) {
        return res.status(404).json({ error: 'Video not found' });
    }

    const item = response.data.items[0];
    return res.json({
      simulated: false,
      videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      tags: item.snippet.tags || [],
      thumbnails: item.snippet.thumbnails,
      viewCount: item.statistics.viewCount,
      likeCount: item.statistics.likeCount,
      commentCount: item.statistics.commentCount
    });
  } catch (error) {
    console.error('YouTube API Error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch video details' });
  }
};

export const getYouTubeChannelDetails = async (req, res) => {
  const { url } = req.query;
  const channelIdOrHandle = extractChannelId(url);
  
  if (!url) return res.status(400).json({ error: 'Channel URL is required' });
  if (!channelIdOrHandle) return res.status(400).json({ error: 'Invalid Channel URL' });

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return res.json({
      simulated: true,
      channelId: channelIdOrHandle,
      title: "Mock Channel",
      description: "This is a mock channel description.",
      subscriberCount: "1000000",
      videoCount: "450",
      viewCount: "150000000",
      thumbnails: { high: { url: "https://via.placeholder.com/240x240" } }
    });
  }

  try {
    // Determine if it's a handle or ID
    let params = { part: 'snippet,statistics', key: apiKey };
    if (url.includes('@')) {
       params.forHandle = '@' + channelIdOrHandle;
    } else {
       params.id = channelIdOrHandle;
    }

    const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', { params });
    
    if (!response.data.items || response.data.items.length === 0) {
        return res.status(404).json({ error: 'Channel not found' });
    }

    const item = response.data.items[0];
    return res.json({
      simulated: false,
      channelId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      subscriberCount: item.statistics.subscriberCount,
      videoCount: item.statistics.videoCount,
      viewCount: item.statistics.viewCount,
      thumbnails: item.snippet.thumbnails,
      country: item.snippet.country,
      publishedAt: item.snippet.publishedAt
    });
  } catch (error) {
    console.error('YouTube API Error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch channel details' });
  }
};
