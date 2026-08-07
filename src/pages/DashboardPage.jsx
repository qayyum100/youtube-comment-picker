import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import {
  Gift, Download, Tag, Search, Users, Type,
  Sparkles, Hash, DollarSign, MessageSquare,
  FileText, BarChart2, Eye, ShieldAlert, Sparkle,
  Image, Scissors, ImagePlay, UserMinus, QrCode, Code,
  ArrowRight, Activity, Calendar
} from 'lucide-react';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Developer Tools', 'SEO & Optimization', 'AI Generators', 'Analytics & Calculators', 'Creator Graphics & Extras'];

  const tools = [
    {
      name: "Excalidraw Whiteboard",
      description: "Infinite hand-drawn sketch whiteboard for system architectures, flowcharts, and visual brainstorming.",
      path: "/excalidraw",
      icon: <Code size={22} />,
      color: "#6366F1",
      category: "Developer Tools"
    },
    {
      name: "Java Online Compiler",
      description: "Write, compile, and execute Java code in your browser with real-time output and stdin support.",
      path: "/java-compiler",
      icon: <Code size={22} />,
      color: "#4F6EF7",
      category: "Developer Tools"
    },
    {
      name: "YouTube Comment Picker",
      description: "Pick random winners for your YouTube giveaways with advanced filters.",
      path: "/youtube-comment-picker",
      icon: <Gift size={22} />,
      color: "#EF4444",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Thumbnail Downloader",
      description: "Download high-quality YouTube video thumbnails in multiple sizes.",
      path: "/thumbnail-downloader",
      icon: <Download size={22} />,
      color: "#3B82F6",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Tag Extractor",
      description: "Extract hidden tags from any YouTube video for SEO research.",
      path: "/youtube-tag-extractor",
      icon: <Tag size={22} />,
      color: "#10B981",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube SEO Checker",
      description: "Audit your video titles, descriptions, and tags for optimal ranking.",
      path: "/youtube-seo-checker",
      icon: <Search size={22} />,
      color: "#F59E0B",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube Channel Analyzer",
      description: "Audit channel metrics, estimated earnings, and growth metrics.",
      path: "/youtube-channel-analyzer",
      icon: <Users size={22} />,
      color: "#8B5CF6",
      category: "Analytics & Calculators"
    },
    {
      name: "AI YouTube Title Generator",
      description: "Generate viral, click-worthy titles optimized for higher CTR.",
      path: "/youtube-title-generator",
      icon: <Type size={22} />,
      color: "#EC4899",
      category: "AI Generators"
    },
    {
      name: "AI Description Generator",
      description: "Create structured, SEO-friendly video descriptions with chapters.",
      path: "/youtube-description-generator",
      icon: <Sparkles size={22} />,
      color: "#14B8A6",
      category: "AI Generators"
    },
    {
      name: "Best Hashtags Generator Suite",
      description: "Generate & copy top 1st, 2nd, and 3rd hashtag sets for Instagram, TikTok & Shorts.",
      path: "/best-hashtags-generator",
      icon: <Hash size={22} />,
      color: "#ec4899",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube Hashtag Generator",
      description: "Generate highly searchable hashtags tailored to your video topic.",
      path: "/youtube-hashtag-generator",
      icon: <Hash size={22} />,
      color: "#F43F5E",
      category: "AI Generators"
    },
    {
      name: "YouTube Cards CTA Generator",
      description: "Generate video card call-to-actions to boost viewer engagement.",
      path: "/youtube-cards-cta-generator",
      icon: <ArrowRight size={22} />,
      color: "#EC4899",
      category: "AI Generators"
    },

    // 30 New Tools
    { name: "Thumbnail Split Tester", description: "Compare CTR performance of two thumbnail designs side-by-side.", path: "/youtube-thumbnail-split-tester", icon: <Image size={22} />, color: "#EF4444", category: "Creator Graphics & Extras" },
    { name: "Thumbnail Color Checker", description: "Extract dominant color palettes and HEX codes from thumbnails.", path: "/youtube-thumbnail-color-checker", icon: <Image size={22} />, color: "#F59E0B", category: "Creator Graphics & Extras" },
    { name: "Thumbnail Contrast Checker", description: "Audit visual contrast ratios for light and dark theme legibility.", path: "/youtube-thumbnail-contrast-checker", icon: <Image size={22} />, color: "#10B981", category: "Creator Graphics & Extras" },
    { name: "Thumbnail Text Size Checker", description: "Verify text proportion and scale for mobile feeds.", path: "/youtube-thumbnail-text-size-checker", icon: <Image size={22} />, color: "#3B82F6", category: "Creator Graphics & Extras" },
    { name: "Thumbnail Safe Area Checker", description: "Ensure key graphics aren't hidden by duration badges or overlays.", path: "/youtube-thumbnail-safe-area-checker", icon: <ShieldAlert size={22} />, color: "#8B5CF6", category: "Creator Graphics & Extras" },
    { name: "Mobile Thumbnail Preview", description: "Preview video thumbnail presentation on iOS and Android feeds.", path: "/youtube-mobile-thumbnail-preview", icon: <Image size={22} />, color: "#EC4899", category: "Creator Graphics & Extras" },
    { name: "Desktop Thumbnail Preview", description: "Simulate widescreen thumbnail presentation on desktop monitors.", path: "/youtube-desktop-thumbnail-preview", icon: <Image size={22} />, color: "#14B8A6", category: "Creator Graphics & Extras" },
    { name: "Thumbnail Compression Tool", description: "Optimize image file sizes below YouTube's strict 2MB limit.", path: "/youtube-thumbnail-compression-tool", icon: <Download size={22} />, color: "#22C55E", category: "Creator Graphics & Extras" },
    { name: "Thumbnail Background Remover", description: "Isolate subjects and remove backgrounds for thumbnail design.", path: "/youtube-thumbnail-background-remover", icon: <Scissors size={22} />, color: "#F43F5E", category: "Creator Graphics & Extras" },
    { name: "Thumbnail Upscaler", description: "Enhance low-resolution stills and thumbnails to 4K quality.", path: "/youtube-thumbnail-upscaler", icon: <Sparkles size={22} />, color: "#06B6D4", category: "Creator Graphics & Extras" },

    { name: "AI Video Outline Generator", description: "Generate structured, high-retention video blueprints.", path: "/youtube-ai-video-outline-generator", icon: <FileText size={22} />, color: "#8B5CF6", category: "AI Generators" },
    { name: "AI Video Chapter Generator", description: "Format YouTube-compliant timestamps for video descriptions.", path: "/youtube-ai-video-chapter-generator", icon: <Calendar size={22} />, color: "#EC4899", category: "AI Generators" },
    { name: "AI Comment Reply Generator", description: "Generate authentic responses to viewer comments.", path: "/youtube-ai-comment-reply-generator", icon: <MessageSquare size={22} />, color: "#14B8A6", category: "AI Generators" },
    { name: "AI Community Post Generator", description: "Draft engaging YouTube Community tab updates and polls.", path: "/youtube-ai-community-post-generator", icon: <MessageSquare size={22} />, color: "#F59E0B", category: "AI Generators" },
    { name: "AI Pinned Comment Generator", description: "Craft call-to-action pinned comments for discussion threads.", path: "/youtube-ai-pinned-comment-generator", icon: <MessageSquare size={22} />, color: "#10B981", category: "AI Generators" },
    { name: "AI End Screen CTA Generator", description: "Generate verbal call-to-actions to direct viewers to next videos.", path: "/youtube-ai-end-screen-cta-generator", icon: <Sparkles size={22} />, color: "#3B82F6", category: "AI Generators" },
    { name: "AI Video Intro Generator", description: "Craft high-retention spoken video hooks.", path: "/youtube-ai-video-intro-generator", icon: <Sparkles size={22} />, color: "#EF4444", category: "AI Generators" },
    { name: "AI Outro Generator", description: "Generate clean video outro scripts and closing CTAs.", path: "/youtube-ai-outro-generator", icon: <Sparkles size={22} />, color: "#F43F5E", category: "AI Generators" },
    { name: "AI FAQ Generator", description: "Generate relevant Q&A blocks for video descriptions.", path: "/youtube-ai-faq-generator", icon: <Sparkles size={22} />, color: "#06B6D4", category: "AI Generators" },
    { name: "AI Content Repurposer", description: "Turn video scripts into X threads, LinkedIn posts, and Shorts hooks.", path: "/youtube-ai-content-repurposer", icon: <Sparkles size={22} />, color: "#8B5CF6", category: "AI Generators" },

    { name: "YouTube Title Case Converter", description: "Convert video titles to Title Case, UPPERCASE, or sentence case.", path: "/youtube-title-case-converter", icon: <Type size={22} />, color: "#10B981", category: "SEO & Optimization" },
    { name: "Emoji Generator", description: "Find high-CTR emojis relevant to your video topic.", path: "/youtube-emoji-generator", icon: <Sparkles size={22} />, color: "#F59E0B", category: "SEO & Optimization" },
    { name: "Character Counter", description: "Track character counts against YouTube's 100-char Title and 5000-char Desc limits.", path: "/youtube-character-counter", icon: <Type size={22} />, color: "#3B82F6", category: "SEO & Optimization" },
    { name: "Tag Counter", description: "Count tags and stay within YouTube's 500-character tag box limit.", path: "/youtube-tag-counter", icon: <Tag size={22} />, color: "#8B5CF6", category: "SEO & Optimization" },
    { name: "Description Formatter", description: "Clean up raw text into structured video descriptions.", path: "/youtube-description-formatter", icon: <FileText size={22} />, color: "#EC4899", category: "SEO & Optimization" },
    { name: "Text Formatter", description: "Remove duplicate spaces and fix line breaks in video copy.", path: "/youtube-text-formatter", icon: <Type size={22} />, color: "#14B8A6", category: "SEO & Optimization" },
    { name: "Markdown to Description Converter", description: "Convert Markdown notes into emoji-formatted YouTube descriptions.", path: "/youtube-markdown-to-description-converter", icon: <Code size={22} />, color: "#F43F5E", category: "SEO & Optimization" },
    { name: "HTML to Plain Text Converter", description: "Strip HTML tags from blog posts to create clean video text.", path: "/youtube-html-to-plain-text-converter", icon: <Code size={22} />, color: "#22C55E", category: "SEO & Optimization" },
    { name: "Timestamp Formatter", description: "Format raw timestamp notes into YouTube-recognized chapter lists.", path: "/youtube-timestamp-formatter", icon: <Activity size={22} />, color: "#06B6D4", category: "SEO & Optimization" },
    { name: "Hashtag Formatter", description: "Format words or tags into clean #hashtag lists.", path: "/youtube-hashtag-formatter", icon: <Hash size={22} />, color: "#EF4444", category: "SEO & Optimization" },

    {
      name: "YouTube Money Calculator",
      description: "Calculate potential video earnings based on views and RPM ranges.",
      path: "/youtube-money-calculator",
      icon: <DollarSign size={22} />,
      color: "#22C55E",
      category: "Analytics & Calculators"
    },
    {
      name: "AI Comment Analyzer",
      description: "Analyze viewer sentiment, questions, and requests using AI.",
      path: "/youtube-comment-analyzer",
      icon: <MessageSquare size={22} />,
      color: "#06B6D4",
      category: "Analytics & Calculators"
    },
    {
      name: "YouTube Transcript Generator",
      description: "Generate and download full transcripts and subtitles instantly.",
      path: "/youtube-transcript-generator",
      icon: <FileText size={22} />,
      color: "#EC4899",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Video Summarizer",
      description: "Summarize video content into detailed notes and key action items.",
      path: "/youtube-video-summarizer",
      icon: <BarChart2 size={22} />,
      color: "#8B5CF6",
      category: "Analytics & Calculators"
    },
    {
      name: "AI Thumbnail Analyzer",
      description: "Get real-time CTR readability, contrast, and visual analysis scoring.",
      path: "/youtube-thumbnail-analyzer",
      icon: <Image size={22} />,
      color: "#F59E0B",
      category: "Creator Graphics & Extras"
    },
    {
      name: "AI Thumbnail Generator",
      description: "Draft high-converting layout suggestions and copy templates.",
      path: "/youtube-thumbnail-generator",
      icon: <ImagePlay size={22} />,
      color: "#10B981",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Shorts Idea Generator",
      description: "Generate 50 high-viral shorts script ideas with hooks and hashtags.",
      path: "/youtube-shorts-idea-generator",
      icon: <Scissors size={22} />,
      color: "#EF4444",
      category: "AI Generators"
    },
    {
      name: "YouTube Script Generator",
      description: "Write custom scripts from scratch matching your tone and length.",
      path: "/youtube-script-generator",
      icon: <FileText size={22} />,
      color: "#3B82F6",
      category: "AI Generators"
    },
    {
      name: "YouTube Hook Generator",
      description: "Create first-sentence hooks optimized for curiosity, shock, or storytelling.",
      path: "/youtube-hook-generator",
      icon: <Sparkle size={22} />,
      color: "#14B8A6",
      category: "AI Generators"
    },
    {
      name: "YouTube Video Idea Generator",
      description: "Compile 100 long-form video concepts ranked by difficulty and SEO opportunity.",
      path: "/youtube-video-ideas-generator",
      icon: <Sparkles size={22} />,
      color: "#F43F5E",
      category: "AI Generators"
    },
    {
      name: "Channel Name Generator",
      description: "Create unique brand, professional, or gaming channel name variations.",
      path: "/youtube-channel-name-generator",
      icon: <Type size={22} />,
      color: "#22C55E",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Handle Checker",
      description: "Verify YouTube custom handle availability and generate alternatives.",
      path: "/youtube-handle-checker",
      icon: <UserMinus size={22} />,
      color: "#06B6D4",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Banner Maker",
      description: "Design custom channel banners (2560x1440) using HTML5 templates.",
      path: "/youtube-banner-maker",
      icon: <Image size={22} />,
      color: "#EF4444",
      category: "Creator Graphics & Extras"
    },
    {
      name: "Profile Picture Maker",
      description: "Resize, crop, and preview standard channel avatars inside a circular layout.",
      path: "/youtube-profile-picture-maker",
      icon: <Users size={22} />,
      color: "#3B82F6",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Timestamp Generator",
      description: "Parse outlines and auto-generate readable chapters from video scripts.",
      path: "/youtube-timestamp-generator",
      icon: <BarChart2 size={22} />,
      color: "#10B981",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Playlist Analyzer",
      description: "Verify total playlist runtime, views, and individual performative averages.",
      path: "/youtube-playlist-analyzer",
      icon: <Eye size={22} />,
      color: "#F59E0B",
      category: "Analytics & Calculators"
    },
    {
      name: "Watch Time Calculator",
      description: "Convert video views and duration parameters into standard watch hours.",
      path: "/youtube-watch-time-calculator",
      icon: <DollarSign size={22} />,
      color: "#8B5CF6",
      category: "Analytics & Calculators"
    },
    {
      name: "Monetization Checker",
      description: "Verify channel subscription and view goals against Partner Program limits.",
      path: "/youtube-monetization-checker",
      icon: <ShieldAlert size={22} />,
      color: "#EC4899",
      category: "Analytics & Calculators"
    },
    {
      name: "YouTube Rank Tracker",
      description: "Verify your video search position rankings for specific keyword phrases.",
      path: "/youtube-rank-tracker",
      icon: <Search size={22} />,
      color: "#14B8A6",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube QR Code Generator",
      description: "Export high-resolution custom QRs for channels, videos, or playlist urls.",
      path: "/youtube-qr-code-generator",
      icon: <QrCode size={22} />,
      color: "#F43F5E",
      category: "Creator Graphics & Extras"
    },
    {
      name: "Responsive Embed Generator",
      description: "Export responsive video iframe frames with autoplay and offset variables.",
      path: "/youtube-embed-generator",
      icon: <Code size={22} />,
      color: "#22C55E",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube Best Time to Upload Calculator",
      description: "Find the optimal posting window for your channel to maximize initial 2-hour velocity.",
      path: "/youtube-best-time-to-upload",
      icon: <BarChart2 size={22} />,
      color: "#10B981",
      category: "Analytics & Calculators"
    },
    {
      name: "YouTube CTR Calculator",
      description: "Calculate your Click-Through Rate (CTR) and see how it compares to viral benchmarks.",
      path: "/youtube-ctr-calculator",
      icon: <Eye size={22} />,
      color: "#F59E0B",
      category: "Analytics & Calculators"
    },
    {
      name: "YouTube CPM Calculator",
      description: "Calculate gross advertising CPM and estimated creator revenue share.",
      path: "/youtube-cpm-calculator",
      icon: <DollarSign size={22} />,
      color: "#22C55E",
      category: "Analytics & Calculators"
    },
    {
      name: "YouTube RPM Calculator",
      description: "Calculate exact net revenue per 1,000 total video views (RPM).",
      path: "/youtube-rpm-calculator",
      icon: <DollarSign size={22} />,
      color: "#8B5CF6",
      category: "Analytics & Calculators"
    },
    {
      name: "YouTube Video Duration Calculator",
      description: "Calculate exact video length needed to hit target watch hours.",
      path: "/youtube-video-duration-calculator",
      icon: <BarChart2 size={22} />,
      color: "#3B82F6",
      category: "Analytics & Calculators"
    },
    {
      name: "YouTube Thumbnail Downloader HD",
      description: "Download 4K, 1080p, and HD thumbnails from any YouTube video instantly.",
      path: "/youtube-thumbnail-downloader-hd",
      icon: <Download size={22} />,
      color: "#EF4444",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Thumbnail Preview Tool",
      description: "Preview thumbnail and title packaging on Desktop and Mobile feeds.",
      path: "/youtube-thumbnail-preview",
      icon: <Image size={22} />,
      color: "#EC4899",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Video Metadata Viewer",
      description: "Inspect hidden YouTube video metadata, publish date, category ID, and tags.",
      path: "/youtube-video-metadata-viewer",
      icon: <Search size={22} />,
      color: "#06B6D4",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube Title Analyzer",
      description: "Evaluate clickability, character limits, power words, and curiosity triggers in titles.",
      path: "/youtube-title-analyzer",
      icon: <Type size={22} />,
      color: "#F43F5E",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube Description Analyzer",
      description: "Audit video description for chapters, links, hashtags, and SEO optimization.",
      path: "/youtube-description-analyzer",
      icon: <FileText size={22} />,
      color: "#14B8A6",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube Search Volume Checker",
      description: "Estimate monthly search query volume, competition metrics, and trend momentum.",
      path: "/youtube-search-volume-checker",
      icon: <Search size={22} />,
      color: "#3B82F6",
      category: "SEO & Optimization"
    },
    {
      name: "Keyword Difficulty Checker",
      description: "Check ranking difficulty scores (1-100) to find low-competition keywords.",
      path: "/youtube-keyword-difficulty-checker",
      icon: <BarChart2 size={22} />,
      color: "#F59E0B",
      category: "SEO & Optimization"
    },
    {
      name: "Trending Keywords Finder",
      description: "Discover real-time breakout search terms trending across YouTube algorithms.",
      path: "/youtube-trending-keywords-finder",
      icon: <Sparkles size={22} />,
      color: "#EF4444",
      category: "SEO & Optimization"
    },
    {
      name: "Related Keywords Generator",
      description: "Generate semantically related LSI keywords to expand video metadata.",
      path: "/youtube-related-keywords-generator",
      icon: <Tag size={22} />,
      color: "#10B981",
      category: "SEO & Optimization"
    },
    {
      name: "Search Intent Analyzer",
      description: "Classify keyword search intent to tailor video structure for maximum retention.",
      path: "/youtube-search-intent-analyzer",
      icon: <Search size={22} />,
      color: "#8B5CF6",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube Search Suggest Explorer",
      description: "Extract real-time search suggestions generated by YouTube's prediction engine.",
      path: "/youtube-search-suggest-explorer",
      icon: <Search size={22} />,
      color: "#06B6D4",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube Autocomplete Generator",
      description: "Mine high-converting long-tail autocomplete predictions across A-Z search modifiers.",
      path: "/youtube-autocomplete-generator",
      icon: <Type size={22} />,
      color: "#EC4899",
      category: "SEO & Optimization"
    },
    {
      name: "Question Keyword Finder",
      description: "Extract question-based queries (How, Why, What) that viewers search.",
      path: "/youtube-question-keyword-finder",
      icon: <Search size={22} />,
      color: "#F43F5E",
      category: "SEO & Optimization"
    },
    {
      name: "Keyword Grouper",
      description: "Organize bulk keyword lists into logical thematic groups for channel playlists.",
      path: "/youtube-keyword-grouper",
      icon: <Tag size={22} />,
      color: "#14B8A6",
      category: "SEO & Optimization"
    },
    {
      name: "Keyword Cluster Generator",
      description: "Build topic clusters and video hub architectures to establish topical authority.",
      path: "/youtube-keyword-cluster-generator",
      icon: <BarChart2 size={22} />,
      color: "#22C55E",
      category: "SEO & Optimization"
    },
    {
      name: "Competitor Thumbnail Analyzer",
      description: "Analyze competitor thumbnails for contrast, face expressions, color palettes, and text.",
      path: "/youtube-competitor-thumbnail-analyzer",
      icon: <Image size={22} />,
      color: "#EF4444",
      category: "Creator Graphics & Extras"
    },
    {
      name: "Competitor Title Extractor",
      description: "Extract all video titles from any competitor channel to model click-worthy patterns.",
      path: "/youtube-competitor-title-extractor",
      icon: <Type size={22} />,
      color: "#3B82F6",
      category: "SEO & Optimization"
    },
    {
      name: "Competitor Description Extractor",
      description: "Extract full video descriptions, affiliate links, chapter timestamps, and hashtags.",
      path: "/youtube-competitor-description-extractor",
      icon: <FileText size={22} />,
      color: "#10B981",
      category: "SEO & Optimization"
    },
    {
      name: "Competitor Hashtag Extractor",
      description: "Extract hashtags used by competitor channels to categorize videos for algorithms.",
      path: "/youtube-competitor-hashtag-extractor",
      icon: <Tag size={22} />,
      color: "#F59E0B",
      category: "SEO & Optimization"
    },
    {
      name: "Competitor Upload Time Analyzer",
      description: "Analyze publishing schedules and upload consistency across competing channels.",
      path: "/youtube-competitor-upload-time-analyzer",
      icon: <BarChart2 size={22} />,
      color: "#8B5CF6",
      category: "Analytics & Calculators"
    },
    {
      name: "Competitor Engagement Analyzer",
      description: "Calculate like-to-view ratios, comment density, and audience interaction metrics.",
      path: "/youtube-competitor-engagement-analyzer",
      icon: <Users size={22} />,
      color: "#EC4899",
      category: "Analytics & Calculators"
    },
    {
      name: "Competitor Growth Estimator",
      description: "Project daily subscriber gains, monthly views, and AdSense revenue trajectories.",
      path: "/youtube-competitor-growth-estimator",
      icon: <DollarSign size={22} />,
      color: "#06B6D4",
      category: "Analytics & Calculators"
    },
    {
      name: "Similar Channel Finder",
      description: "Find channels with overlapping audiences for collaboration and market research.",
      path: "/youtube-similar-channel-finder",
      icon: <Users size={22} />,
      color: "#F43F5E",
      category: "SEO & Optimization"
    },
    {
      name: "Viral Video Finder",
      description: "Uncover outlier videos performing 5x-20x above a channel's baseline view average.",
      path: "/youtube-viral-video-finder",
      icon: <Sparkles size={22} />,
      color: "#14B8A6",
      category: "SEO & Optimization"
    },
    {
      name: "Channel Comparison Tool",
      description: "Compare two YouTube channels side-by-side across subscribers, views, and cadence.",
      path: "/youtube-channel-comparison-tool",
      icon: <BarChart2 size={22} />,
      color: "#22C55E",
      category: "Analytics & Calculators"
    },
    {
      name: "Shorts Hashtag Generator",
      description: "Generate viral, high-converting hashtags optimized specifically for YouTube Shorts.",
      path: "/youtube-shorts-hashtag-generator",
      icon: <Hash size={22} />,
      color: "#F43F5E",
      category: "AI Generators"
    },
    {
      name: "Shorts Title Generator",
      description: "Generate short, punchy titles tailored for fast scrolling on the Shorts shelf.",
      path: "/youtube-shorts-title-generator",
      icon: <Type size={22} />,
      color: "#EC4899",
      category: "AI Generators"
    },
    {
      name: "Shorts Caption Generator",
      description: "Create engaging YouTube Shorts description captions with calls-to-action.",
      path: "/youtube-shorts-caption-generator",
      icon: <FileText size={22} />,
      color: "#14B8A6",
      category: "AI Generators"
    },
    {
      name: "Shorts Hook Analyzer",
      description: "Evaluate the first 3-second visual and spoken hook of your Short to prevent swipe-aways.",
      path: "/youtube-shorts-hook-analyzer",
      icon: <Sparkle size={22} />,
      color: "#8B5CF6",
      category: "SEO & Optimization"
    },
    {
      name: "Shorts Trend Finder",
      description: "Discover trending audio, viral formats, and challenge concepts on YouTube Shorts.",
      path: "/youtube-shorts-trend-finder",
      icon: <Sparkles size={22} />,
      color: "#EF4444",
      category: "SEO & Optimization"
    },
    {
      name: "Shorts Duration Optimizer",
      description: "Optimize your Short's exact video duration (15s, 30s, 60s) for maximum retention.",
      path: "/youtube-shorts-duration-optimizer",
      icon: <BarChart2 size={22} />,
      color: "#3B82F6",
      category: "Analytics & Calculators"
    },
    {
      name: "Shorts Upload Time Calculator",
      description: "Find the highest traffic hours for publishing YouTube Shorts to get into the feed.",
      path: "/youtube-shorts-upload-time-calculator",
      icon: <BarChart2 size={22} />,
      color: "#10B981",
      category: "Analytics & Calculators"
    },
    {
      name: "Shorts SEO Checker",
      description: "Audit your Short's title, description, and hashtags for maximum Shorts feed distribution.",
      path: "/youtube-shorts-seo-checker",
      icon: <Search size={22} />,
      color: "#F59E0B",
      category: "SEO & Optimization"
    },
    {
      name: "Shorts Keyword Finder",
      description: "Find high-converting keywords searched specifically on mobile in the Shorts player.",
      path: "/youtube-shorts-keyword-finder",
      icon: <Search size={22} />,
      color: "#06B6D4",
      category: "SEO & Optimization"
    },
    {
      name: "Shorts Performance Predictor",
      description: "Forecast view velocity and algorithm seeding based on retention % and swipe-away rates.",
      path: "/youtube-shorts-performance-predictor",
      icon: <BarChart2 size={22} />,
      color: "#22C55E",
      category: "Analytics & Calculators"
    },
    { name: "Channel Health Checker", description: "Full audit of upload consistency, SEO health, thumbnails, and engagement.", path: "/youtube-channel-health-checker", icon: <Activity size={22} />, color: "#10B981", category: "Analytics & Calculators" },
    { name: "Channel SEO Auditor", description: "Audit channel name, about section, tags, trailer, and links for SEO.", path: "/youtube-channel-seo-auditor", icon: <Search size={22} />, color: "#3B82F6", category: "SEO & Optimization" },
    { name: "Subscriber Growth Analyzer", description: "Project daily, monthly, and yearly subscriber velocity.", path: "/youtube-subscriber-growth-analyzer", icon: <Users size={22} />, color: "#8B5CF6", category: "Analytics & Calculators" },
    { name: "Video Performance Auditor", description: "Deep-audit individual video CTR, retention, and velocity.", path: "/youtube-video-performance-auditor", icon: <BarChart2 size={22} />, color: "#F59E0B", category: "Analytics & Calculators" },
    { name: "Upload Consistency Tracker", description: "Track upload schedule gaps and consistency score.", path: "/youtube-upload-consistency-tracker", icon: <Calendar size={22} />, color: "#EC4899", category: "Analytics & Calculators" },
    { name: "Channel Niche Finder", description: "Discover profitable, low-competition YouTube niches with high CPM.", path: "/youtube-channel-niche-finder", icon: <Search size={22} />, color: "#14B8A6", category: "SEO & Optimization" },
    { name: "Channel Revenue Estimator", description: "Estimate monthly and yearly AdSense earnings from views and CPM.", path: "/youtube-channel-revenue-estimator", icon: <DollarSign size={22} />, color: "#22C55E", category: "Analytics & Calculators" },
    { name: "Channel Age Calculator", description: "Calculate exactly how old your YouTube channel is and your milestone tier.", path: "/youtube-channel-age-calculator", icon: <Calendar size={22} />, color: "#F43F5E", category: "Analytics & Calculators" },
    { name: "Channel Score Calculator", description: "Rate your channel 0-100 based on subscribers, views, and content volume.", path: "/youtube-channel-score-calculator", icon: <BarChart2 size={22} />, color: "#6366F1", category: "Analytics & Calculators" },
    { name: "Live Stream Title Generator", description: "Generate attention-grabbing YouTube live stream titles.", path: "/youtube-live-stream-title-generator", icon: <Type size={22} />, color: "#EF4444", category: "AI Generators" },
    { name: "Community Post Generator", description: "Generate viral YouTube Community tab posts that drive comments.", path: "/youtube-community-post-generator", icon: <FileText size={22} />, color: "#F59E0B", category: "AI Generators" },
    { name: "Stream Schedule Builder", description: "Build an optimized recurring live stream schedule.", path: "/youtube-stream-schedule-builder", icon: <Calendar size={22} />, color: "#10B981", category: "Analytics & Calculators" },
    { name: "Clip Title Generator", description: "Generate viral clip titles for YouTube Clips from live stream highlights.", path: "/youtube-clip-title-generator", icon: <Type size={22} />, color: "#8B5CF6", category: "AI Generators" },
    { name: "Membership Perks Generator", description: "Generate YouTube membership tier names, perks, and pricing.", path: "/youtube-membership-perks-generator", icon: <Sparkles size={22} />, color: "#EC4899", category: "AI Generators" },
    { name: "End Screen Optimizer", description: "Plan your end screen layout with timing and element placement.", path: "/youtube-end-screen-optimizer", icon: <BarChart2 size={22} />, color: "#06B6D4", category: "SEO & Optimization" },
    { name: "Cards & CTA Generator", description: "Generate a card and CTA strategy with timestamps to boost watch time.", path: "/youtube-cards-cta-generator", icon: <Tag size={22} />, color: "#3B82F6", category: "SEO & Optimization" },
    {
      name: "YouTube Keyword Tool",
      description: "Search keyword competition, volumes, longtail tags, and SEO opportunity scores.",
      path: "/youtube-keyword-tool",
      icon: <Tag size={22} />,
      color: "#06B6D4",
      category: "SEO & Optimization"
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-wrapper">
      <SEO
        title="YouTube Giveaway Picker — Free Random Comment Winner Picker & 130+ YouTube Tools"
        description="YouTube Giveaway Picker: free tool to randomly pick winners from YouTube comments. Filter duplicates, require keywords, pick multiple winners. Plus 130+ free YouTube creator tools."
        url="/"
        keywords="youtube giveaway picker, youtube comment picker, free youtube giveaway picker, random youtube comment picker, youtube giveaway winner picker, pick random youtube comment, youtube random comment picker, youtube giveaway tool, youtube comment winner selector, youtube giveaway picker free, youtube thumbnail downloader, youtube seo checker, youtube tag extractor, youtube title generator, youtube description generator, youtube keyword tool, youtube channel analyzer, youtube money calculator, youtube hashtag generator, free youtube tools, youtube creator tools, youtube shorts tools, youtube analytics, ai youtube tools, youtube cpm calculator, youtube rpm calculator, youtube ctr calculator"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://www.youtubecommentpickerthumbnaildownload.online/#website",
              "url": "https://www.youtubecommentpickerthumbnaildownload.online/",
              "name": "YouTube Giveaway Picker & Creator Tools",
              "description": "Free YouTube giveaway picker and 130+ creator tools for SEO, thumbnails, analytics, and AI content generation.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.youtubecommentpickerthumbnaildownload.online/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "SoftwareApplication",
              "name": "YouTube Giveaway Picker",
              "operatingSystem": "Any",
              "applicationCategory": "UtilitiesApplication",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "description": "Free YouTube giveaway picker — randomly select winners from YouTube comments. Filter duplicates, require keywords, pick multiple winners instantly.",
              "url": "https://www.youtubecommentpickerthumbnaildownload.online/youtube-comment-picker",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "3124" }
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is a YouTube giveaway picker?",
                  "acceptedAnswer": { "@type": "Answer", "text": "A YouTube giveaway picker is a free browser tool that randomly selects winners from a YouTube video's comment section. It uses the YouTube Data API to fetch all comments and picks winners fairly using a random algorithm. Ours supports duplicate filtering, keyword requirements, reply exclusion, and multiple winner selection." }
                },
                {
                  "@type": "Question",
                  "name": "Is the YouTube giveaway picker free?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our YouTube giveaway picker is 100% free — no account, no subscription, no Chrome extension, and no download required. Paste your YouTube video URL and pick a random winner instantly." }
                },
                {
                  "@type": "Question",
                  "name": "How does the YouTube giveaway picker ensure fairness?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Our YouTube giveaway picker connects to the official YouTube Data API v3, loads all public comments, filters duplicates, and selects winners using a cryptographically secure random selection algorithm — guaranteeing complete impartiality." }
                }
              ]
            }
          ]
        }}
      />

      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: '999px', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          <span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
          130+ Free YouTube Tools — No Login Required
        </div>

        <h1 style={{
          fontSize: 'clamp(26px, 5vw, 46px)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '18px',
          letterSpacing: '-0.03em',
          lineHeight: '1.12',
        }}>
          YouTube Giveaway Picker —<br />
          <span style={{ color: '#EF4444' }}>Free Random Comment Winner Picker</span>
        </h1>

        <p style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto 10px',
          lineHeight: '1.7',
        }}>
          The #1 free <strong style={{ color: 'var(--text-primary)' }}>YouTube giveaway picker</strong> — randomly pick winners from YouTube comments with duplicate filtering, keyword requirements &amp; multi-winner support. Plus <strong style={{ color: 'var(--text-primary)' }}>130+ free YouTube creator tools</strong>: SEO checker, tag extractor, thumbnail downloader, AI title generator &amp; more.
        </p>

        <p style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          maxWidth: '540px',
          margin: '0 auto 28px',
          lineHeight: '1.6',
        }}>
          Trusted by <strong>200,000+</strong> creators worldwide · No account · No credit card · Always free
        </p>

        {/* Quick-access CTA pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '32px' }}>
          {[
            { label: '🎁 Giveaway Picker', path: '/youtube-comment-picker' },
            { label: '📥 Thumbnail Downloader', path: '/thumbnail-downloader' },
            { label: '🔍 SEO Checker', path: '/youtube-seo-checker' },
            { label: '🏷️ Tag Extractor', path: '/youtube-tag-extractor' },
            { label: '🤖 Title Generator', path: '/youtube-title-generator' },
            { label: '🔑 Keyword Tool', path: '/youtube-keyword-tool' },
          ].map((pill) => (
            <Link
              key={pill.path}
              to={pill.path}
              style={{
                padding: '8px 18px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-tertiary)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              {pill.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div className="input-group">
            <span className="input-group-icon">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="input-field"
              placeholder="Search 130+ tools (e.g. 'thumbnail', 'keyword', 'giveaway')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ textAlign: 'left' }}
              aria-label="Search YouTube tools"
            />
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <div className="filter-tabs" style={{ justifyContent: 'center', marginBottom: '32px' }}>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      {searchTerm && (
        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredTools.length}</strong> result{filteredTools.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {filteredTools.map((tool, idx) => (
            <Link
              to={tool.path}
              key={idx}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="card card-interactive"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  height: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${tool.color}18`;
                  e.currentTarget.style.borderColor = `${tool.color}30`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                {/* Icon */}
                <div
                  className="tool-icon"
                  style={{
                    background: `${tool.color}12`,
                    color: tool.color,
                    flexShrink: 0,
                  }}
                >
                  {tool.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                    lineHeight: '1.3',
                  }}>
                    {tool.name}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                  }}>
                    {tool.description}
                  </p>
                </div>

                {/* Arrow */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: tool.color,
                }}>
                  Open Tool
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Search size={24} style={{ color: 'var(--text-muted)' }} />
          </div>
          <h3>No tools found</h3>
          <p>Try adjusting your search or browse a different category.</p>
        </div>
      )}

      {/* ── Publisher Content & Creator Resource Hub ── */}
      <section style={{ marginTop: '64px', color: 'var(--text-primary)' }}>

        {/* YouTube Giveaway Picker Feature Card */}
        <div className="card card-lg" style={{ marginBottom: '28px', lineHeight: '1.75', borderLeft: '4px solid #EF4444' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)' }}>
            🎁 YouTube Comment Picker — Free Random Giveaway Winner Selector
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Our <strong style={{ color: 'var(--text-primary)' }}>YouTube comment picker</strong> is the fastest, fairest way to randomly select winners from any YouTube video's comment section. Paste your video URL, load all comments via the official YouTube Data API v3, and our free <strong style={{ color: 'var(--text-primary)' }}>YouTube giveaway picker</strong> picks a winner in seconds — with full support for duplicate filtering, keyword requirements (e.g. "giveaway"), reply exclusion, and multi-winner draws.
          </p>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Unlike browser extensions or desktop apps, our <strong style={{ color: 'var(--text-primary)' }}>random YouTube comment picker</strong> runs entirely in your browser — no install, no login, no cost. It's been used by <strong>200,000+</strong> YouTubers to run fair comment giveaways on channels of every size.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {[
              '✅ YouTube Giveaway Picker Free',
              '✅ Duplicate Comment Filter',
              '✅ Keyword-only Entries',
              '✅ Multiple Winners',
              '✅ Instagram & TikTok Giveaway Too',
              '✅ No Login · No Install',
            ].map((f, i) => (
              <span key={i} style={{ fontSize: '13px', padding: '5px 13px', borderRadius: '999px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontWeight: '500' }}>{f}</span>
            ))}
          </div>
          <Link
            to="/youtube-comment-picker"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px', background: '#EF4444', color: '#fff', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}
          >
            <Gift size={16} /> Open YouTube Giveaway Picker Free
          </Link>
        </div>

        {/* Tool Category Overview */}
        <div className="card card-lg" style={{ marginBottom: '28px', lineHeight: '1.75' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
            130+ Free YouTube Creator Tools — Everything in One Place
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Whether you're optimising a single video or scaling a multi-channel network, our suite of free YouTube tools covers every stage of the creator workflow — from pre-production keyword research to post-upload analytics and community management.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '18px' }}>
            {[
              {
                emoji: '🔍',
                heading: 'YouTube SEO & Keyword Tools',
                body: 'YouTube SEO checker, tag extractor, keyword difficulty checker, search volume checker, autocomplete generator, related keywords, question keyword finder, trending keywords finder, keyword grouper, and keyword cluster generator — everything you need to rank on YouTube search.',
                path: '/youtube-seo-checker',
                cta: 'SEO Checker →'
              },
              {
                emoji: '🤖',
                heading: 'AI YouTube Content Generators',
                body: 'AI-powered YouTube title generator, description generator, hashtag generator, hook generator, script generator, video ideas generator, Shorts idea generator, community post generator, pinned comment generator, and FAQ generator \u2014 beat creator\u2019s block with AI.',
                path: '/youtube-title-generator',
                cta: 'Title Generator →'
              },
              {
                emoji: '📊',
                heading: 'YouTube Analytics & Calculators',
                body: 'YouTube money calculator, CPM calculator, RPM calculator, CTR calculator, watch time calculator, channel analyzer, subscriber growth analyzer, monetization checker, channel health checker, rank tracker, channel revenue estimator, and channel score calculator.',
                path: '/youtube-money-calculator',
                cta: 'Money Calculator →'
              },
              {
                emoji: '🖼️',
                heading: 'Thumbnail & Visual Tools',
                body: 'YouTube thumbnail downloader (HD & 4K), thumbnail analyzer, thumbnail generator, thumbnail preview, thumbnail compressor, thumbnail background remover, thumbnail contrast checker, safe area checker, banner maker, and profile picture maker.',
                path: '/thumbnail-downloader',
                cta: 'Thumbnail Downloader →'
              },
              {
                emoji: '📱',
                heading: 'YouTube Shorts Tools',
                body: 'Shorts SEO checker, Shorts title generator, Shorts hashtag generator, Shorts caption generator, Shorts hook analyzer, Shorts keyword finder, Shorts trend finder, Shorts duration optimizer, upload time calculator, and Shorts performance predictor.',
                path: '/youtube-shorts-idea-generator',
                cta: 'Shorts Tools →'
              },
              {
                emoji: '🕵️',
                heading: 'Competitor Analysis Tools',
                body: 'Competitor thumbnail analyzer, competitor title extractor, competitor description extractor, competitor hashtag extractor, competitor upload time analyzer, competitor engagement analyzer, competitor growth estimator, similar channel finder, viral video finder, and channel comparison tool.',
                path: '/youtube-competitor-thumbnail-analyzer',
                cta: 'Analyze Competitors →'
              },
            ].map((item) => (
              <div key={item.heading} style={{ padding: '18px', borderRadius: '12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>{item.emoji} {item.heading}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 12px', lineHeight: '1.6' }}>{item.body}</p>
                <Link to={item.path} style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>{item.cta}</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Keyword-Rich Strategy Section */}
        <div className="card card-lg" style={{ marginBottom: '28px', lineHeight: '1.75' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>
            How to Grow on YouTube in 2025 — A Data-Driven Guide
          </h2>

          <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '18px', marginBottom: '6px' }}>
            1. YouTube SEO: Rank Your Videos in Search &amp; Suggested
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            YouTube SEO is the practice of optimising your video title, description, tags, thumbnail, and chapter timestamps so YouTube's algorithm surfaces your content to the right viewers. Use our <Link to="/youtube-seo-checker" style={{ color: 'var(--primary)', fontWeight: '600' }}>YouTube SEO Checker</Link>, <Link to="/youtube-tag-extractor" style={{ color: 'var(--primary)', fontWeight: '600' }}>Tag Extractor</Link>, and <Link to="/youtube-keyword-tool" style={{ color: 'var(--primary)', fontWeight: '600' }}>YouTube Keyword Tool</Link> to audit and optimise every upload before it goes live.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '18px', marginBottom: '6px' }}>
            2. Boost CTR with Better Thumbnails &amp; Titles
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Click-Through Rate (CTR) is the strongest early signal YouTube uses to decide whether to push your video. A compelling thumbnail + hooky title combination is the #1 lever for CTR improvement. Use our <Link to="/thumbnail-downloader" style={{ color: 'var(--primary)', fontWeight: '600' }}>YouTube Thumbnail Downloader</Link> to research competitor thumbnails, our <Link to="/youtube-title-analyzer" style={{ color: 'var(--primary)', fontWeight: '600' }}>Title Analyzer</Link> to score your working titles, and our <Link to="/youtube-ctr-calculator" style={{ color: 'var(--primary)', fontWeight: '600' }}>YouTube CTR Calculator</Link> to benchmark your performance.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '18px', marginBottom: '6px' }}>
            3. YouTube Giveaways — Drive Comments &amp; Subscriber Growth
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            YouTube giveaways are one of the most cost-effective ways to generate a surge of engaged comments, grow your subscriber count, and signal to YouTube's algorithm that your video is generating community interaction. Our free <Link to="/youtube-comment-picker" style={{ color: 'var(--primary)', fontWeight: '600' }}>YouTube giveaway comment picker</Link> handles the entire winner-selection process transparently — with public filters your audience can verify.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '18px', marginBottom: '6px' }}>
            4. Monetisation: YouTube CPM, RPM &amp; Revenue Estimation
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Understanding your <strong>YouTube CPM</strong> (cost per mille paid by advertisers) and <strong>RPM</strong> (revenue per mille received by you) is critical to scaling income. Higher CPM niches (finance, tech, legal, B2B SaaS) can earn 10× more per 1,000 views than entertainment channels. Use our <Link to="/youtube-cpm-calculator" style={{ color: 'var(--primary)', fontWeight: '600' }}>CPM Calculator</Link>, <Link to="/youtube-rpm-calculator" style={{ color: 'var(--primary)', fontWeight: '600' }}>RPM Calculator</Link>, and <Link to="/youtube-money-calculator" style={{ color: 'var(--primary)', fontWeight: '600' }}>YouTube Money Calculator</Link> to model your revenue at scale.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '18px', marginBottom: '6px' }}>
            5. YouTube Shorts SEO — Reach the Shorts Feed Algorithm
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            YouTube Shorts have separate ranking signals from long-form content. The Shorts feed optimises for swipe-away rate and full-view rate rather than average view duration. Use our <Link to="/youtube-shorts-seo-checker" style={{ color: 'var(--primary)', fontWeight: '600' }}>Shorts SEO Checker</Link>, <Link to="/youtube-shorts-hashtag-generator" style={{ color: 'var(--primary)', fontWeight: '600' }}>Shorts Hashtag Generator</Link>, and <Link to="/youtube-shorts-hook-analyzer" style={{ color: 'var(--primary)', fontWeight: '600' }}>Shorts Hook Analyzer</Link> to maximise distribution.
          </p>
        </div>

        {/* FAQ */}
        <div className="card card-lg" style={{ lineHeight: '1.75' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px' }}>
            Frequently Asked Questions — YouTube Tools &amp; Comment Picker
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              {
                q: 'What is the YouTube comment picker and how does it work?',
                a: 'The YouTube comment picker is a free browser-based tool that connects to the YouTube Data API v3 to fetch all public comments from a video, then randomly selects one or more winners. You can filter by keyword, exclude replies, remove duplicate users, and pick multiple winners — all in seconds, with no login required.'
              },
              {
                q: 'Is the YouTube giveaway picker completely free?',
                a: 'Yes. Our YouTube giveaway picker is 100% free — no account, no subscription, no Chrome extension, and no download required. Simply paste your YouTube video URL and pick a random winner instantly from any browser.'
              },
              {
                q: 'Does the YouTube comment picker work for Instagram and TikTok giveaways too?',
                a: 'Yes. In addition to picking random YouTube comment winners, our tool also supports Instagram giveaway comment picking and TikTok comment pickers — making it a universal giveaway winner selector for all major video platforms.'
              },
              {
                q: 'How do I download a YouTube thumbnail in HD?',
                a: 'Use our free YouTube Thumbnail Downloader — paste any YouTube video URL and instantly download the thumbnail in all available sizes: maxresdefault (1280×720), hqdefault (480×360), mqdefault (320×180), and sddefault (640×480).'
              },
              {
                q: 'What is YouTube SEO and why does it matter?',
                a: 'YouTube SEO (Search Engine Optimisation) is the process of optimising your video metadata — title, description, tags, chapters, and thumbnail — so YouTube surfaces your content to users searching for related topics. Strong YouTube SEO leads to higher impressions, better CTR, and sustainable long-term views without paid promotion.'
              },
              {
                q: 'What is a good YouTube CPM and RPM?',
                a: 'YouTube CPM (cost per mille) is what advertisers pay per 1,000 ad impressions. YouTube RPM (revenue per mille) is what creators receive after YouTube’s 45% cut. Average YouTube CPM ranges from $1–$3 for entertainment and up to $15–$50 for finance or B2B SaaS niches. Use our YouTube CPM Calculator and RPM Calculator to estimate your expected earnings.'
              },
              {
                q: 'How do I extract YouTube video tags?',
                a: 'Paste any YouTube video URL into our free YouTube Tag Extractor. It fetches the hidden video tags that creators use (not visible in the browser) via the YouTube Data API, so you can analyse competitor keyword strategies and improve your own video metadata.'
              },
              {
                q: 'Can I generate YouTube video titles with AI?',
                a: 'Yes. Our AI YouTube Title Generator uses large language models to create viral, click-worthy titles based on your video topic. It considers keyword placement, emotional triggers, number formatting, and curiosity gaps — all factors proven to improve CTR on YouTube search and suggested video feeds.'
              },
              {
                q: 'What YouTube Shorts tools are available for free?',
                a: 'We offer 10+ dedicated YouTube Shorts tools: Shorts SEO Checker, Shorts Hashtag Generator, Shorts Title Generator, Shorts Caption Generator, Shorts Hook Analyzer, Shorts Keyword Finder, Shorts Trend Finder, Shorts Duration Optimizer, Shorts Upload Time Calculator, and Shorts Performance Predictor — all 100% free.'
              },
              {
                q: 'Do these YouTube tools comply with YouTube\'s Terms of Service?',
                a: 'Absolutely. All our tools exclusively use publicly available data accessed via YouTube\'s official Data API v3, in full compliance with YouTube\'s developer policies and Google API Terms of Service. We never scrape, store user data, or access private video information.'
              },
            ].map((faq, i, arr) => (
              <div key={i} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', padding: '16px 0' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>{faq.q}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.65' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
