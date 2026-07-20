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

export const getYouTubeSuggestions = async (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query is required' });
    try {
        const response = await axios.get(`https://suggestqueries.google.com/complete/search`, {
            params: { client: 'firefox', ds: 'yt', q }
        });
        return res.json(response.data);
    } catch (error) {
        console.error("YouTube Suggest Error:", error.message);
        return res.status(500).json({ error: 'Failed to fetch suggestions' });
    }
};

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

export const checkVideoRank = async (req, res) => {
  const { url, keyword } = req.query;
  const videoId = extractYouTubeId(url);

  if (!url || !keyword) return res.status(400).json({ error: 'URL and keyword are required' });
  if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    // Simulated rank
    const mockRank = Math.floor(Math.random() * 20) + 1;
    return res.json({
      simulated: true,
      videoId,
      keyword,
      rank: mockRank,
      competition: 'Medium',
      difficulty: 'Medium'
    });
  }

  try {
    // Fetch top search results for keyword
    const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'id,snippet',
        q: keyword,
        maxResults: 50,
        type: 'video',
        key: apiKey
      }
    });

    const items = searchResponse.data.items || [];
    const index = items.findIndex(item => item.id?.videoId === videoId);
    const rank = index === -1 ? 'Not in top 50' : index + 1;

    return res.json({
      simulated: false,
      videoId,
      keyword,
      rank,
      competition: items.length > 30 ? 'High' : 'Low',
      difficulty: items.length > 35 ? 'Hard' : 'Easy'
    });
  } catch (error) {
    console.error('Rank Tracker Error:', error.message);
    const mockRank = Math.floor(Math.random() * 15) + 3;
    return res.json({
      simulated: true,
      error: 'API failed, using simulated rank.',
      videoId,
      keyword,
      rank: mockRank,
      competition: 'Medium',
      difficulty: 'Medium'
    });
  }
};

export const getYouTubeChannelTags = async (req, res) => {
  const { url } = req.query;
  const channelId = await extractChannelId(url);

  if (!url || !channelId) return res.status(400).json({ error: 'Valid YouTube Channel URL is required' });

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.json({
      simulated: true,
      tags: ["mock tag 1", "mock tag 2", "mock tag 3", "competitor strategy", "viral"],
      topKeywords: ["viral", "competitor strategy"]
    });
  }

  try {
    // 1. Get channel uploads playlist
    const channelRes = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: { part: 'contentDetails', id: channelId, key: apiKey }
    });
    
    if (!channelRes.data.items || channelRes.data.items.length === 0) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    const uploadsPlaylistId = channelRes.data.items[0].contentDetails.relatedPlaylists.uploads;

    // 2. Get latest 5 videos from uploads
    const playlistRes = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: { part: 'contentDetails', playlistId: uploadsPlaylistId, maxResults: 5, key: apiKey }
    });

    const videoIds = playlistRes.data.items.map(item => item.contentDetails.videoId).join(',');

    if (!videoIds) {
       return res.json({ tags: [], topKeywords: [] });
    }

    // 3. Get tags for those videos
    const videosRes = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: { part: 'snippet', id: videoIds, key: apiKey }
    });

    let allTags = [];
    videosRes.data.items.forEach(video => {
      if (video.snippet.tags) {
        allTags = allTags.concat(video.snippet.tags);
      }
    });

    // Count tag frequencies
    const tagCounts = {};
    allTags.forEach(tag => {
      const lowerTag = tag.toLowerCase();
      tagCounts[lowerTag] = (tagCounts[lowerTag] || 0) + 1;
    });

    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    return res.json({
      simulated: false,
      tags: sortedTags.slice(0, 20),
      topKeywords: sortedTags.slice(0, 5)
    });
  } catch (error) {
    console.error('Channel Tags Error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch competitor tags' });
  }
};
