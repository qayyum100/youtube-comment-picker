import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Hash, Sparkles, Copy } from 'lucide-react';
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
    <div className="page-wrapper">
      <SEO 
        title="YouTube Hashtag Generator | Free Hashtags for YouTube SEO"
        description="Generate highly searchable and popular YouTube hashtags for your topic instantly using AI."
        url="/youtube-hashtag-generator"
      />
      
      <div className="page-hero">
        <h1>YouTube Hashtag Generator</h1>
        <p>
          Discover popular, niche, and SEO hashtags to boost your video visibility.
        </p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon">
              <Hash size={16} />
            </span>
            <input 
              type="text" 
              className="input-field"
              placeholder="Enter your video topic (e.g. photography tips)..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flexShrink: 0 }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <Sparkles size={16} /> Generate
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            {error}
          </div>
        )}

        {hashtags && (
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {/* Popular Hashtags */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Popular Hashtags</h4>
                <button onClick={() => copyToClipboard(hashtags.popular)} className="copy-btn">
                  <Copy size={13} /> Copy
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {hashtags.popular?.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Niche Hashtags */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Niche Hashtags</h4>
                <button onClick={() => copyToClipboard(hashtags.niche)} className="copy-btn">
                  <Copy size={13} /> Copy
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {hashtags.niche?.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* SEO Hashtags */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>SEO Hashtags</h4>
                <button onClick={() => copyToClipboard(hashtags.seo)} className="copy-btn">
                  <Copy size={13} /> Copy
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {hashtags.seo?.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
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
