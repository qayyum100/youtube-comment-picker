import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import {
  Gift, Download, Tag, Search, Users, Type,
  Sparkles, Hash, DollarSign, MessageSquare,
  FileText, BarChart2, Eye, ShieldAlert, Sparkle,
  Image, Scissors, ImagePlay, UserMinus, QrCode, Code,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'SEO & Optimization', 'AI Generators', 'Analytics & Calculators', 'Creator Graphics & Extras'];

  const tools = [
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
      name: "YouTube Hashtag Generator",
      description: "Generate highly searchable hashtags tailored to your video topic.",
      path: "/youtube-hashtag-generator",
      icon: <Hash size={22} />,
      color: "#F43F5E",
      category: "AI Generators"
    },
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
        title="Free AI YouTube Creator Tools | Optimize Your YouTube SEO"
        description="Access free YouTube SEO and creator tools. Extract tags, generate viral titles, analyze channels, check SEO scores, and pick comment giveaway winners."
        url="/tools"
      />

      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: '16px',
          letterSpacing: '-0.03em',
          lineHeight: '1.15',
        }}>
          AI-Powered YouTube Creator Tools
        </h1>
        <p style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          maxWidth: '640px',
          margin: '0 auto 32px',
          lineHeight: '1.7',
        }}>
          Free, high-fidelity SEO tools built for content creators, marketers, and channel managers.
          Optimize your videos and grow your channel today.
        </p>

        {/* Search */}
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div className="input-group">
            <span className="input-group-icon">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="input-field"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ textAlign: 'left' }}
              aria-label="Search tools"
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
    </div>
  );
}
