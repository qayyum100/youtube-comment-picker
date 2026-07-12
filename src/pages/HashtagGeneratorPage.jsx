import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Hash, Sparkles, Copy, Check } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic) return;
    
    setLoading(true);
    setError(null);
    setHashtags(null);

    try {
      const response = await fetch('/api/ai/hashtag-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Failed to generate hashtags');
      
      setHashtags(result.hashtags);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (tagsArray) => {
    if (!tagsArray) return;
    navigator.clipboard.writeText(tagsArray.join(' '));
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="YouTube Hashtag Generator | Free Hashtags for YouTube SEO"
        description="Generate highly searchable and popular YouTube hashtags for your topic instantly using AI."
        url="/youtube-hashtag-generator"
      />
      
      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Hashtag Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Discover popular, niche, and SEO hashtags to boost your video visibility.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Hash size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Enter your video topic (e.g. photography tips)..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} /> {loading ? 'Generating...' : 'Generate'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {hashtags && (
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {/* Popular Hashtags */}
            <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h4 style={{ margin: 0, fontWeight: '600' }}>Popular Hashtags</h4>
                    <button onClick={() => copyToClipboard(hashtags.popular)} style={{ background: 'none', border: 'none', color: 'var(--glow-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}><Copy size={14} /> Copy</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {hashtags.popular?.map((tag, idx) => (
                        <span key={idx} style={{ padding: '6px 10px', background: 'rgba(124, 58, 237, 0.1)', color: '#a78bfa', borderRadius: '4px', fontSize: '0.9rem' }}>{tag}</span>
                    ))}
                </div>
            </div>

            {/* Niche Hashtags */}
            <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h4 style={{ margin: 0, fontWeight: '600' }}>Niche Hashtags</h4>
                    <button onClick={() => copyToClipboard(hashtags.niche)} style={{ background: 'none', border: 'none', color: 'var(--glow-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}><Copy size={14} /> Copy</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {hashtags.niche?.map((tag, idx) => (
                        <span key={idx} style={{ padding: '6px 10px', background: 'rgba(236, 72, 153, 0.1)', color: '#f472b6', borderRadius: '4px', fontSize: '0.9rem' }}>{tag}</span>
                    ))}
                </div>
            </div>

            {/* SEO Hashtags */}
            <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h4 style={{ margin: 0, fontWeight: '600' }}>SEO Hashtags</h4>
                    <button onClick={() => copyToClipboard(hashtags.seo)} style={{ background: 'none', border: 'none', color: 'var(--glow-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}><Copy size={14} /> Copy</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {hashtags.seo?.map((tag, idx) => (
                        <span key={idx} style={{ padding: '6px 10px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderRadius: '4px', fontSize: '0.9rem' }}>{tag}</span>
                    ))}
                </div>
            </div>
          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.hashtagGenerator}
        customTitle="YouTube Hashtag Generator FAQs"
        customDescription="Find out how to choose the best YouTube hashtags to get your videos and Shorts seen by more people."
      />
    </div>
  );
}
