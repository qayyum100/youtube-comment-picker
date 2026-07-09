import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { 
  Gift, Download, Tag, Search, Users, Type, 
  Sparkles, Hash, DollarSign, MessageSquare 
} from 'lucide-react';

export default function DashboardPage() {
  const tools = [
    {
      name: "YouTube Comment Picker",
      description: "Pick random winners for your YouTube giveaways with advanced filters.",
      path: "/youtube-comment-picker",
      icon: <Gift size={24} />,
      color: "#ef4444"
    },
    {
      name: "YouTube Thumbnail Downloader",
      description: "Download high-quality YouTube video thumbnails in multiple sizes.",
      path: "/thumbnail-downloader",
      icon: <Download size={24} />,
      color: "#3b82f6"
    },
    {
      name: "YouTube Tag Extractor",
      description: "Extract hidden tags from any YouTube video for SEO research.",
      path: "/youtube-tag-extractor",
      icon: <Tag size={24} />,
      color: "#10b981"
    },
    {
      name: "YouTube SEO Checker",
      description: "Audit your video titles, descriptions, and tags for optimal ranking.",
      path: "/youtube-seo-checker",
      icon: <Search size={24} />,
      color: "#f59e0b"
    },
    {
      name: "YouTube Channel Analyzer",
      description: "Audit channel metrics, estimated earnings, and growth metrics.",
      path: "/youtube-channel-analyzer",
      icon: <Users size={24} />,
      color: "#8b5cf6"
    },
    {
      name: "AI YouTube Title Generator",
      description: "Generate viral, click-worthy titles optimized for higher CTR.",
      path: "/youtube-title-generator",
      icon: <Type size={24} />,
      color: "#ec4899"
    },
    {
      name: "AI Description Generator",
      description: "Create structured, SEO-friendly video descriptions with chapters.",
      path: "/youtube-description-generator",
      icon: <Sparkles size={24} />,
      color: "#14b8a6"
    },
    {
      name: "YouTube Hashtag Generator",
      description: "Generate highly searchable hashtags tailored to your video topic.",
      path: "/youtube-hashtag-generator",
      icon: <Hash size={24} />,
      color: "#f43f5e"
    },
    {
      name: "YouTube Money Calculator",
      description: "Calculate potential video earnings based on views and RPM ranges.",
      path: "/youtube-money-calculator",
      icon: <DollarSign size={24} />,
      color: "#22c55e"
    },
    {
      name: "AI Comment Analyzer",
      description: "Analyze viewer sentiment, questions, and requests using AI.",
      path: "/youtube-comment-analyzer",
      icon: <MessageSquare size={24} />,
      color: "#06b6d4"
    }
  ];

  return (
    <div className="page-container" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free AI YouTube Creator Tools | Optimize Your YouTube SEO"
        description="Access free YouTube SEO and creator tools. Extract tags, generate viral titles, analyze channels, check SEO scores, and pick comment giveaway winners."
        url="/tools"
      />

      <section style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>
          AI-Powered YouTube Creator Tools
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
          Free, high-fidelity SEO tools built for content creators, marketers, and channel managers. Optimize your videos and grow your channel today.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
        {tools.map((tool, idx) => (
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
