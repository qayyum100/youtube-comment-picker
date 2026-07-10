import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Sparkles, Copy, Tag } from 'lucide-react';

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

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free YouTube Keyword Tool | Video Search Volumes & SEO Tags"
        description="Research search volume, competition, longtail variations, and SEO opportunity scores for any YouTube keyword instantly."
        url="/youtube-keyword-tool"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Free YouTube Keyword Tool
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Discover highly searched long-tail keywords, search volumes, and optimization scores.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Enter target keyword (e.g. video editing tips)..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} /> {loading ? 'Analyzing...' : 'Search Keywords'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {results && (
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            
            {/* Suggestions */}
            <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <h4 style={{ margin: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={16} /> Related Suggestions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {results.suggestions?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-dark)', padding: '10px 15px', borderRadius: '6px' }}>
                    <div>
                      <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{item.keyword}</span>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        <span>Demand: <strong>{item.demand}</strong></span>
                        <span>Competition: <strong>{item.competition}</strong></span>
                      </div>
                    </div>
                    <button onClick={() => copyKeyword(item.keyword)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <Copy size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Longtail */}
            <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <h4 style={{ margin: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={16} /> Long-Tail Variations</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {results.longtail?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-dark)', padding: '10px 15px', borderRadius: '6px' }}>
                    <div>
                      <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{item.keyword}</span>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        <span>Demand: <strong>{item.demand}</strong></span>
                        <span>Competition: <strong>{item.competition}</strong></span>
                      </div>
                    </div>
                    <button onClick={() => copyKeyword(item.keyword)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <Copy size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </section>
    </div>
  );
}
