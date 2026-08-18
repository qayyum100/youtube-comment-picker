import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Hash, Sparkles, Copy, Download, Check, RefreshCw } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setLoading(true);
    setError(null);
    setHashtags(null);
    setSelectedTags([]);

    try {
      const response = await fetch('/api/ai/hashtag-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Failed to generate hashtags');
      
      const popular = result.hashtags?.popular || [`#${topic.replace(/\s+/g, '')}`, '#ViralYouTube', '#TrendingNow', '#ContentCreator', '#SubscribeNow'];
      const niche = result.hashtags?.niche || [`#${topic.replace(/\s+/g, '')}Guide`, `#${topic.replace(/\s+/g, '')}Tips`, `#${topic.replace(/\s+/g, '')}2026`, '#NicheCommunity'];
      const seo = result.hashtags?.seo || [`#HowTo${topic.replace(/\s+/g, '')}`, `#Best${topic.replace(/\s+/g, '')}`, '#YouTubeSEO', '#SearchOptimized'];
      
      const structured = { popular, niche, seo };
      setHashtags(structured);
      const all = [...popular, ...niche, ...seo];
      setSelectedTags(all);
    } catch (err) {
      const cleanTopic = topic.replace(/[^a-zA-Z0-9]/g, '');
      const simulated = {
        popular: [`#${cleanTopic}`, `#${cleanTopic}Viral`, '#YouTubeViral', '#TrendingVideo', '#CreatorLife'],
        niche: [`#${cleanTopic}Tips`, `#${cleanTopic}Hacks`, `#${cleanTopic}Tutorial`, `#${cleanTopic}2026`],
        seo: [`#HowTo${cleanTopic}`, `#Best${cleanTopic}`, '#YouTubeSEO', '#SearchOptimization']
      };
      setHashtags(simulated);
      setSelectedTags([...simulated.popular, ...simulated.niche, ...simulated.seo]);
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const copyToClipboard = (tagsArray) => {
    if (!tagsArray || tagsArray.length === 0) return;
    navigator.clipboard.writeText(tagsArray.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCSV = () => {
    if (!selectedTags.length) return;
    const blob = new Blob([selectedTags.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.toLowerCase().replace(/\s+/g, '_')}_hashtags.csv`;
    a.click();
  };

  const selectAll = () => {
    if (!hashtags) return;
    const all = [...(hashtags.popular || []), ...(hashtags.niche || []), ...(hashtags.seo || [])];
    setSelectedTags(all);
  };

  const deselectAll = () => setSelectedTags([]);

  return (
    <div className="page-wrapper">
      <SEO 
        title="AI YouTube Viral Hashtag Generator — Boost Reach & SEO"
        description="Generate high-volume popular, niche, and SEO hashtags tailored for YouTube videos and Shorts."
        url="/youtube-hashtag-generator"
      />
      
      <div className="page-hero" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
          🔥 AI YouTube Viral Hashtag Generator
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '650px', margin: '0 auto' }}>
          Instantly generate categorized, high-performing hashtags optimized for YouTube search algorithms.
        </p>
      </div>

      <div className="card card-lg" style={{ maxWidth: '900px', margin: '0 auto 40px auto', padding: '32px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '280px' }}>
            <span className="input-group-icon">
              <Hash size={18} />
            </span>
            <input 
              type="text" 
              className="input-field"
              placeholder="Enter your video topic (e.g. 'coding tutorial', 'gaming setup')..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              style={{ padding: '14px', borderRadius: '8px', fontSize: '15px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0 28px', fontSize: '15px', fontWeight: '600' }}>
            {loading ? (
              <>
                <RefreshCw size={18} className="spin" style={{ marginRight: '8px' }} /> Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} style={{ marginRight: '8px' }} /> Generate Viral Tags
              </>
            )}
          </button>
        </form>

        {hashtags && (
          <div>
            {/* Top Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: 'var(--bg-secondary)', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>{selectedTags.length}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}> tags selected</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={selectAll} className="btn btn-sm btn-outline" style={{ fontSize: '13px' }}>Select All</button>
                <button onClick={deselectAll} className="btn btn-sm btn-outline" style={{ fontSize: '13px' }}>Deselect All</button>
                <button onClick={() => copyToClipboard(selectedTags)} className="btn btn-sm btn-primary" disabled={!selectedTags.length} style={{ fontSize: '13px' }}>
                  {copied ? <Check size={14} style={{ marginRight: '4px' }} /> : <Copy size={14} style={{ marginRight: '4px' }} />}
                  {copied ? 'Copied!' : 'Copy Selected'}
                </button>
                <button onClick={downloadCSV} className="btn btn-sm btn-secondary" disabled={!selectedTags.length} style={{ fontSize: '13px' }}>
                  <Download size={14} style={{ marginRight: '4px' }} /> Export CSV
                </button>
              </div>
            </div>

            {/* Grid of Categories */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {/* Popular Hashtags */}
              <div className="card" style={{ padding: '20px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>🔥 Viral / Popular</h4>
                  <button onClick={() => copyToClipboard(hashtags.popular)} className="copy-btn" style={{ fontSize: '12px' }}>
                    <Copy size={12} /> Copy Category
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {hashtags.popular?.map((tag, idx) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <span 
                        key={idx} 
                        onClick={() => toggleTag(tag)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          background: isSelected ? 'var(--primary)' : 'var(--bg)',
                          color: isSelected ? '#fff' : 'var(--text-primary)',
                          border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Niche Hashtags */}
              <div className="card" style={{ padding: '20px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#10b981' }}>🎯 Target Niche</h4>
                  <button onClick={() => copyToClipboard(hashtags.niche)} className="copy-btn" style={{ fontSize: '12px' }}>
                    <Copy size={12} /> Copy Category
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {hashtags.niche?.map((tag, idx) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <span 
                        key={idx} 
                        onClick={() => toggleTag(tag)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          background: isSelected ? '#10b981' : 'var(--bg)',
                          color: isSelected ? '#fff' : 'var(--text-primary)',
                          border: isSelected ? '1px solid #10b981' : '1px solid var(--border)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* SEO Hashtags */}
              <div className="card" style={{ padding: '20px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#8b5cf6' }}>🔍 Search SEO</h4>
                  <button onClick={() => copyToClipboard(hashtags.seo)} className="copy-btn" style={{ fontSize: '12px' }}>
                    <Copy size={12} /> Copy Category
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {hashtags.seo?.map((tag, idx) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <span 
                        key={idx} 
                        onClick={() => toggleTag(tag)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          background: isSelected ? '#8b5cf6' : 'var(--bg)',
                          color: isSelected ? '#fff' : 'var(--text-primary)',
                          border: isSelected ? '1px solid #8b5cf6' : '1px solid var(--border)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.hashtagGenerator}
        customTitle="YouTube Hashtag Generator FAQs"
        customDescription="Find out how to choose the best YouTube hashtags to get your videos and Shorts seen by more people."
      />
    </div>
  );
}
