import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Sparkles, Copy, Tag } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function KeywordToolPage() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/keyword-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to suggest keywords');

      setResults(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyKeyword = (text) => {
    navigator.clipboard.writeText(text);
  };

  const KeywordList = ({ title, items }) => (
    <div className="card" style={{ padding: '20px' }}>
      <h4 style={{ margin: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
        <Tag size={14} style={{ color: 'var(--primary)' }} /> {title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items?.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'block' }}>{item.keyword}</span>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px' }}>
                <span>Demand: <strong style={{ color: 'var(--text-secondary)' }}>{item.demand}</strong></span>
                <span>Competition: <strong style={{ color: 'var(--text-secondary)' }}>{item.competition}</strong></span>
              </div>
            </div>
            <button onClick={() => copyKeyword(item.keyword)} className="copy-btn" style={{ padding: '4px 8px', border: 'none', background: 'transparent' }}>
              <Copy size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <SEO 
        title="Free YouTube Keyword Tool | Video Search Volumes & SEO Tags"
        description="Research search volume, competition, longtail variations, and SEO opportunity scores for any YouTube keyword instantly."
        url="/youtube-keyword-tool"
      />

      <div className="page-hero">
        <h1>Free YouTube Keyword Tool</h1>
        <p>Discover highly searched long-tail keywords, search volumes, and optimization scores.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon"><Search size={16} /></span>
            <input 
              type="text" 
              className="input-field"
              placeholder="Enter target keyword (e.g. video editing tips)..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexShrink: 0 }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <Sparkles size={16} /> Search Keywords
              </>
            )}
          </button>
        </form>

        {error && <div className="alert alert-error" style={{ marginTop: '16px' }}>{error}</div>}

        {results && (
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <KeywordList title="Related Suggestions" items={results.suggestions} />
            <KeywordList title="Long-Tail Variations" items={results.longtail} />
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.keywordTool}
        customTitle="YouTube Keyword Tool FAQs"
        customDescription="Learn how to find and use the best YouTube keywords to rank your videos higher."
      />
    </div>
  );
}
