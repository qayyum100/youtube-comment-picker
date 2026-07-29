import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Hash, Sparkles, Copy, Check, TrendingUp, Layers, Flame, Filter } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

const PRESET_CATEGORIES = [
  'fitness', 'travel', 'fashion', 'photography', 'gaming', 
  'food', 'tech', 'business', 'art', 'beauty', 'music', 'crypto',
  'reels', 'pets', 'nature', 'motivation', 'marketing', 'design',
  'lifestyle', 'architecture', 'cars', 'sports', 'books', 'vlog'
];

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', maxTags: 30 },
  { id: 'tiktok', label: 'TikTok', maxTags: 15 },
  { id: 'youtube', label: 'YouTube Shorts', maxTags: 5 },
  { id: 'twitter', label: 'Twitter / X', maxTags: 6 },
  { id: 'linkedin', label: 'LinkedIn', maxTags: 5 }
];

export default function BestHashtagsSuitePage() {
  const [topic, setTopic] = useState('fitness');
  const [platform, setPlatform] = useState('instagram');
  const [loading, setLoading] = useState(false);
  const [hashtagsData, setHashtagsData] = useState(null);
  const [error, setError] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const currentPlatformObj = PLATFORMS.find(p => p.id === platform) || PLATFORMS[0];

  const handleGenerate = async (searchTopic = topic) => {
    if (!searchTopic) return;
    
    setLoading(true);
    setError(null);
    setSelectedTags([]);

    try {
      const response = await fetch('/api/ai/hashtag-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: searchTopic, platform })
      });
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Failed to generate best hashtags');
      
      setHashtagsData(result.hashtags);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (tagsArray, keyName) => {
    if (!tagsArray || tagsArray.length === 0) return;
    const text = tagsArray.join(' ');
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleSelectTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length >= currentPlatformObj.maxTags) {
        alert(`Platform limit reached (${currentPlatformObj.maxTags} hashtags max for ${currentPlatformObj.label}).`);
        return;
      }
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="page-wrapper">
      <SEO 
        title="Best Hashtags Generator Suite | Copy Top Hashtags for Instagram, TikTok & YouTube"
        description="The ultimate Best-Hashtags tool suite. Search keywords, copy top 1st, 2nd, and 3rd hashtag sets, view reach metrics, and build custom tag selections."
        url="/best-hashtags-generator"
      />
      
      <div className="page-hero">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'rgba(255, 77, 77, 0.1)', color: 'var(--primary)', fontWeight: '600', fontSize: '13px', marginBottom: '12px' }}>
          <Flame size={15} /> All-In-One Best Hashtags Engine
        </div>
        <h1>Best Hashtags Generator Suite</h1>
        <p>
          Find, analyze, and copy top-performing hashtag sets for Instagram, TikTok, Shorts, and X in one click.
        </p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        {/* Platform Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            SELECT TARGET PLATFORM
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PLATFORMS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatform(p.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: platform === p.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: platform === p.id ? 'rgba(255, 77, 77, 0.08)' : 'var(--bg-secondary)',
                  color: platform === p.id ? 'var(--primary)' : 'var(--text-primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                {p.label} <span style={{ opacity: 0.7, fontSize: '11px' }}>({p.maxTags} max)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon">
              <Hash size={16} />
            </span>
            <input 
              type="text" 
              className="input-field"
              placeholder="Enter keyword or topic (e.g. fitness, travel, gym, travel photography)..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flexShrink: 0, padding: '0 24px' }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <Sparkles size={16} /> Generate Best Hashtags
              </>
            )}
          </button>
        </form>

        {/* Quick Category Chips */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <Filter size={13} /> Popular Quick Searches:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PRESET_CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => { setTopic(cat); handleGenerate(cat); }}
                style={{
                  padding: '4px 12px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                #{cat}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '20px' }}>
            {error}
          </div>
        )}

        {/* Output Results */}
        {hashtagsData && (
          <div style={{ marginTop: '36px' }}>
            {/* Reach Summary Header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px', padding: '20px', borderRadius: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Estimated Post Reach</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)' }}>{hashtagsData.avgPostsCount || '1.2M+ Posts'}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Competition Score</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>{hashtagsData.difficultyScore || 45} / 100</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Optimal Tag Count</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>{currentPlatformObj.maxTags} Tags</div>
              </div>
            </div>

            {hashtagsData.topTip && (
              <div className="alert alert-info" style={{ marginBottom: '28px' }}>
                <strong>Pro Tip:</strong> {hashtagsData.topTip}
              </div>
            )}

            {/* Custom Selected Hashtags Toolbar */}
            {selectedTags.length > 0 && (
              <div style={{ padding: '16px 20px', borderRadius: '12px', backgroundColor: 'rgba(255, 77, 77, 0.08)', border: '1px solid var(--primary)', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--primary)' }}>Custom Selected Hashtags ({selectedTags.length}/{currentPlatformObj.maxTags}):</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{selectedTags.join(' ')}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => copyToClipboard(selectedTags, 'custom')} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '13px' }}>
                    {copiedKey === 'custom' ? <Check size={14} /> : <Copy size={14} />} {copiedKey === 'custom' ? 'Copied Custom Set!' : 'Copy Selected'}
                  </button>
                  <button onClick={() => setSelectedTags([])} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '12px' }}>
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Set 1: Best Hashtags (Top 30) */}
            {hashtagsData.bestSet1 && (
              <div className="card" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Flame size={18} style={{ color: 'var(--primary)' }} /> First Best Hashtags Set (Top Reach)
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {hashtagsData.bestSet1.length} hashtags • Click any tag to add to custom selection
                    </span>
                  </div>
                  <button onClick={() => copyToClipboard(hashtagsData.bestSet1, 'set1')} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                    {copiedKey === 'set1' ? <Check size={14} /> : <Copy size={14} />} {copiedKey === 'set1' ? 'Copied Set 1!' : 'Copy First Set'}
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)' }}>
                  {hashtagsData.bestSet1.map((tag, i) => (
                    <span 
                      key={i} 
                      onClick={() => toggleSelectTag(tag)}
                      style={{ 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        fontSize: '13px', 
                        cursor: 'pointer',
                        backgroundColor: selectedTags.includes(tag) ? 'var(--primary)' : 'var(--bg-secondary)', 
                        color: selectedTags.includes(tag) ? '#fff' : 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        fontWeight: selectedTags.includes(tag) ? '600' : 'normal'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Set 2: Second Best Hashtags Set */}
            {hashtagsData.bestSet2 && (
              <div className="card" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TrendingUp size={18} style={{ color: '#3b82f6' }} /> Second Best Hashtags Set (High Engagement)
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {hashtagsData.bestSet2.length} hashtags
                    </span>
                  </div>
                  <button onClick={() => copyToClipboard(hashtagsData.bestSet2, 'set2')} className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                    {copiedKey === 'set2' ? <Check size={14} /> : <Copy size={14} />} {copiedKey === 'set2' ? 'Copied Set 2!' : 'Copy Second Set'}
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)' }}>
                  {hashtagsData.bestSet2.map((tag, i) => (
                    <span 
                      key={i} 
                      onClick={() => toggleSelectTag(tag)}
                      style={{ 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        fontSize: '13px', 
                        cursor: 'pointer',
                        backgroundColor: selectedTags.includes(tag) ? 'var(--primary)' : 'var(--bg-secondary)', 
                        color: selectedTags.includes(tag) ? '#fff' : 'var(--text-primary)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Set 3: Third Best Hashtags Set */}
            {hashtagsData.bestSet3 && (
              <div className="card" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid #10b981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Layers size={18} style={{ color: '#10b981' }} /> Third Best Hashtags Set (Niche Targeted)
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {hashtagsData.bestSet3.length} hashtags
                    </span>
                  </div>
                  <button onClick={() => copyToClipboard(hashtagsData.bestSet3, 'set3')} className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                    {copiedKey === 'set3' ? <Check size={14} /> : <Copy size={14} />} {copiedKey === 'set3' ? 'Copied Set 3!' : 'Copy Third Set'}
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)' }}>
                  {hashtagsData.bestSet3.map((tag, i) => (
                    <span 
                      key={i} 
                      onClick={() => toggleSelectTag(tag)}
                      style={{ 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        fontSize: '13px', 
                        cursor: 'pointer',
                        backgroundColor: selectedTags.includes(tag) ? 'var(--primary)' : 'var(--bg-secondary)', 
                        color: selectedTags.includes(tag) ? '#fff' : 'var(--text-primary)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Popular, Niche, and SEO Category Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '32px' }}>
              {hashtagsData.popular && (
                <div className="card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0 }}>🔥 High-Volume Popular Tags</h4>
                    <button onClick={() => copyToClipboard(hashtagsData.popular, 'popular')} className="copy-btn">
                      <Copy size={13} /> {copiedKey === 'popular' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {hashtagsData.popular.map((t, i) => (
                      <span key={i} onClick={() => toggleSelectTag(t)} style={{ cursor: 'pointer', padding: '3px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', fontSize: '12px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {hashtagsData.niche && (
                <div className="card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0 }}>🎯 Targeted Niche Tags</h4>
                    <button onClick={() => copyToClipboard(hashtagsData.niche, 'niche')} className="copy-btn">
                      <Copy size={13} /> {copiedKey === 'niche' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {hashtagsData.niche.map((t, i) => (
                      <span key={i} onClick={() => toggleSelectTag(t)} style={{ cursor: 'pointer', padding: '3px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', fontSize: '12px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {hashtagsData.seo && (
                <div className="card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0 }}>⚡ Keyword SEO Tags</h4>
                    <button onClick={() => copyToClipboard(hashtagsData.seo, 'seo')} className="copy-btn">
                      <Copy size={13} /> {copiedKey === 'seo' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {hashtagsData.seo.map((t, i) => (
                      <span key={i} onClick={() => toggleSelectTag(t)} style={{ cursor: 'pointer', padding: '3px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', fontSize: '12px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Publisher Content Section for AdSense Compliance */}
        <div style={{ marginTop: '40px', color: 'var(--text-primary)' }}>
          <div className="card card-lg" style={{ lineHeight: '1.7' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>
              Comprehensive Guide to Using Hashtags for Social Media Reach
            </h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Hashtags remain one of the most effective organic growth mechanisms across social media platforms like Instagram, TikTok, YouTube Shorts, X (formerly Twitter), and LinkedIn. Using targeted, contextual hashtags categorizes your content for recommendation algorithms and search discovery.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>
              How Our Best Hashtags Generator Works
            </h3>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Unlike simple random tag lists, our Best Hashtags Suite clusters hashtags into strategic sets based on competition levels and relevance:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '8px' }}><strong>High-Volume Popular Tags:</strong> Broad terms that drive rapid initial impressions from active feeds.</li>
              <li style={{ marginBottom: '8px' }}><strong>Targeted Niche Tags:</strong> Specific community tags designed to reach engaged, targeted audiences.</li>
              <li style={{ marginBottom: '8px' }}><strong>Keyword SEO Tags:</strong> Search-focused phrases that index your posts in long-tail search results.</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>
              Platform Specific Hashtag Best Practices
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Instagram</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                  Use 10–25 relevant tags combining high, medium, and low competition keywords. Mix them into your post caption or first comment.
                </p>
              </div>
              <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>TikTok & Shorts</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                  Focus on 3–6 concise, hyper-relevant hashtags directly related to the video topic to feed TikTok's For You Page (FYP) algorithm.
                </p>
              </div>
              <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>LinkedIn & X</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                  Stick to 3–5 professional industry tags embedded within natural sentences or added cleanly at the bottom of the post.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FaqSection faqs={toolFaqs.hashtagGenerator || []} />
    </div>
  );
}
