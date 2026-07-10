import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { 
  Gift, Download, Tag, Search, Users, Type, 
  Sparkles, Hash, DollarSign, MessageSquare,
  FileText, BarChart2, Eye, ShieldAlert, Sparkle,
  Image, Scissors, ImagePlay, UserMinus, QrCode, Code
} from 'lucide-react';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'SEO & Optimization', 'AI Generators', 'Analytics & Calculators', 'Creator Graphics & Extras'];

  const tools = [
    // Original Tools
    {
      name: "YouTube Comment Picker",
      description: "Pick random winners for your YouTube giveaways with advanced filters.",
      path: "/youtube-comment-picker",
      icon: <Gift size={24} />,
      color: "#ef4444",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Thumbnail Downloader",
      description: "Download high-quality YouTube video thumbnails in multiple sizes.",
      path: "/thumbnail-downloader",
      icon: <Download size={24} />,
      color: "#3b82f6",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Tag Extractor",
      description: "Extract hidden tags from any YouTube video for SEO research.",
      path: "/youtube-tag-extractor",
      icon: <Tag size={24} />,
      color: "#10b981",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube SEO Checker",
      description: "Audit your video titles, descriptions, and tags for optimal ranking.",
      path: "/youtube-seo-checker",
      icon: <Search size={24} />,
      color: "#f59e0b",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube Channel Analyzer",
      description: "Audit channel metrics, estimated earnings, and growth metrics.",
      path: "/youtube-channel-analyzer",
      icon: <Users size={24} />,
      color: "#8b5cf6",
      category: "Analytics & Calculators"
    },
    {
      name: "AI YouTube Title Generator",
      description: "Generate viral, click-worthy titles optimized for higher CTR.",
      path: "/youtube-title-generator",
      icon: <Type size={24} />,
      color: "#ec4899",
      category: "AI Generators"
    },
    {
      name: "AI Description Generator",
      description: "Create structured, SEO-friendly video descriptions with chapters.",
      path: "/youtube-description-generator",
      icon: <Sparkles size={24} />,
      color: "#14b8a6",
      category: "AI Generators"
    },
    {
      name: "YouTube Hashtag Generator",
      description: "Generate highly searchable hashtags tailored to your video topic.",
      path: "/youtube-hashtag-generator",
      icon: <Hash size={24} />,
      color: "#f43f5e",
      category: "AI Generators"
    },
    {
      name: "YouTube Money Calculator",
      description: "Calculate potential video earnings based on views and RPM ranges.",
      path: "/youtube-money-calculator",
      icon: <DollarSign size={24} />,
      color: "#22c55e",
      category: "Analytics & Calculators"
    },
    {
      name: "AI Comment Analyzer",
      description: "Analyze viewer sentiment, questions, and requests using AI.",
      path: "/youtube-comment-analyzer",
      icon: <MessageSquare size={24} />,
      color: "#06b6d4",
      category: "Analytics & Calculators"
    },

    // 20 New Phase 2 Tools
    {
      name: "YouTube Transcript Generator",
      description: "Generate and download full transcripts and subtitles instantly.",
      path: "/youtube-transcript-generator",
      icon: <FileText size={24} />,
      color: "#ec4899",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Video Summarizer",
      description: "Summarize video content into detailed notes and key action items.",
      path: "/youtube-video-summarizer",
      icon: <BarChart2 size={24} />,
      color: "#8b5cf6",
      category: "Analytics & Calculators"
    },
    {
      name: "AI Thumbnail Analyzer",
      description: "Get real-time CTR readability, contrast, and visual analysis scoring.",
      path: "/youtube-thumbnail-analyzer",
      icon: <Image size={24} />,
      color: "#f59e0b",
      category: "Creator Graphics & Extras"
    },
    {
      name: "AI Thumbnail Generator",
      description: "Draft high-converting layout suggestions and copy templates.",
      path: "/youtube-thumbnail-generator",
      icon: <ImagePlay size={24} />,
      color: "#10b981",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Shorts Idea Generator",
      description: "Generate 50 high-viral shorts script ideas with hooks and hashtags.",
      path: "/youtube-shorts-idea-generator",
      icon: <Scissors size={24} />,
      color: "#ef4444",
      category: "AI Generators"
    },
    {
      name: "YouTube Script Generator",
      description: "Write custom scripts from scratch matching your tone and length.",
      path: "/youtube-script-generator",
      icon: <FileText size={24} />,
      color: "#3b82f6",
      category: "AI Generators"
    },
    {
      name: "YouTube Hook Generator",
      description: "Create first-sentence hooks optimized for curiosity, shock, or storytelling.",
      path: "/youtube-hook-generator",
      icon: <Sparkle size={24} />,
      color: "#14b8a6",
      category: "AI Generators"
    },
    {
      name: "YouTube Video Idea Generator",
      description: "Compile 100 long-form video concepts ranked by difficulty and SEO opportunity.",
      path: "/youtube-video-ideas-generator",
      icon: <Sparkles size={24} />,
      color: "#f43f5e",
      category: "AI Generators"
    },
    {
      name: "Channel Name Generator",
      description: "Create unique brand, professional, or gaming channel name variations.",
      path: "/youtube-channel-name-generator",
      icon: <Type size={24} />,
      color: "#22c55e",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Handle Checker",
      description: "Verify YouTube custom handle availability and generate alternatives.",
      path: "/youtube-handle-checker",
      icon: <UserMinus size={24} />,
      color: "#06b6d4",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Banner Maker",
      description: "Design custom channel banners (2560x1440) using HTML5 templates.",
      path: "/youtube-banner-maker",
      icon: <Image size={24} />,
      color: "#ef4444",
      category: "Creator Graphics & Extras"
    },
    {
      name: "Profile Picture Maker",
      description: "Resize, crop, and preview standard channel avatars inside a circular layout.",
      path: "/youtube-profile-picture-maker",
      icon: <Users size={24} />,
      color: "#3b82f6",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Timestamp Generator",
      description: "Parse outlines and auto-generate readable chapters from video scripts.",
      path: "/youtube-timestamp-generator",
      icon: <BarChart2 size={24} />,
      color: "#10b981",
      category: "Creator Graphics & Extras"
    },
    {
      name: "YouTube Playlist Analyzer",
      description: "Verify total playlist runtime, views, and individual performative averages.",
      path: "/youtube-playlist-analyzer",
      icon: <Eye size={24} />,
      color: "#f59e0b",
      category: "Analytics & Calculators"
    },
    {
      name: "Watch Time Calculator",
      description: "Convert video views and duration parameters into standard watch hours.",
      path: "/youtube-watch-time-calculator",
      icon: <DollarSign size={24} />,
      color: "#8b5cf6",
      category: "Analytics & Calculators"
    },
    {
      name: "Monetization Checker",
      description: "Verify channel subscription and view goals against Partner Program limits.",
      path: "/youtube-monetization-checker",
      icon: <ShieldAlert size={24} />,
      color: "#ec4899",
      category: "Analytics & Calculators"
    },
    {
      name: "YouTube Rank Tracker",
      description: "Verify your video search position rankings for specific keyword phrases.",
      path: "/youtube-rank-tracker",
      icon: <Search size={24} />,
      color: "#14b8a6",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube QR Code Generator",
      description: "Export high-resolution custom QRs for channels, videos, or playlist urls.",
      path: "/youtube-qr-code-generator",
      icon: <QrCode size={24} />,
      color: "#f43f5e",
      category: "Creator Graphics & Extras"
    },
    {
      name: "Responsive Embed Generator",
      description: "Export responsive video iframe frames with autoplay and offset variables.",
      path: "/youtube-embed-generator",
      icon: <Code size={24} />,
      color: "#22c55e",
      category: "SEO & Optimization"
    },
    {
      name: "YouTube Keyword Tool",
      description: "Search keyword competition, volumes, longtail tags, and SEO opportunity scores.",
      path: "/youtube-keyword-tool",
      icon: <Tag size={24} />,
      color: "#06b6d4",
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
    <div className="page-container" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free AI YouTube Creator Tools | Optimize Your YouTube SEO"
        description="Access free YouTube SEO and creator tools. Extract tags, generate viral titles, analyze channels, check SEO scores, and pick comment giveaway winners."
        url="/tools"
      />

      <section style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>
          AI-Powered YouTube Creator Tools
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', marginBottom: '30px' }}>
          Free, high-fidelity SEO tools built for content creators, marketers, and channel managers. Optimize your videos and grow your channel today.
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '30px' }}>
          <input 
            type="text" 
            placeholder="Search for a tool..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-premium"
            style={{ textAlign: 'center' }}
          />
        </div>

        {/* Category Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className="liquid-glass"
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeCategory === cat ? 'var(--glow-primary)' : 'var(--glass-bg-base)',
                color: activeCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.85rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
        {filteredTools.map((tool, idx) => (
          <Link 
            to={tool.path} 
            key={idx} 
            className="card liquid-glass" 
            style={{ 
              textDecoration: 'none', 
              padding: '30px', 
              borderRadius: 'var(--radius-lg)', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '15px',
              border: '1px solid var(--border-light)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 10px 30px ${tool.color}22`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
            }}
          >
            <div style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '12px', 
              background: `${tool.color}15`, 
              color: tool.color, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              {tool.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{tool.name}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
