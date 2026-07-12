import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function RankTrackerPage() {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!url || !keyword) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`/api/rank-checker?url=${encodeURIComponent(url)}&keyword=${encodeURIComponent(keyword)}`);
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to track rank');

      setResults(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="YouTube Rank Tracker | Video Search Ranking Position Checker"
        description="Verify your YouTube video search ranking position for target keywords. Track search optimizations, competition, and difficulties."
        url="/youtube-rank-tracker"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Rank Tracker
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Verify your video's search position rankings for specific keyword phrases.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleTrack} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: '15px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Video URL</label>
            <input 
              type="text" 
              placeholder="Paste YouTube Video URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input-premium"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Target Keyword</label>
            <input 
              type="text" 
              placeholder="e.g. build a react app" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="input-premium"
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} /> {loading ? 'Tracking...' : 'Track Rank'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {results && (
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
            
            {/* Rank display */}
            <div style={{ background: 'var(--bg-surface)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Search Position</h3>
              <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'var(--bg-dark)', border: '4px solid var(--glow-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <span style={{ fontSize: '2.8rem', fontWeight: 'bold' }}>#{results.rank}</span>
              </div>
              <p style={{ marginTop: '20px', fontSize: '1.1rem', color: 'var(--text-muted)' }}>for keyword: <strong>"{results.keyword}"</strong></p>
            </div>

            {/* Optimization Insights */}
            <div style={{ background: 'var(--bg-surface)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '15px' }}>
              <h4 style={{ margin: 0, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Sparkles size={18} /> SEO Competition Metrics</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
                 <div style={{ background: 'var(--bg-dark)', padding: '15px', borderRadius: '8px' }}>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Keyword Competition:</span>
                   <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', fontSize: '1.1rem' }}>{results.competition}</p>
                 </div>
                 <div style={{ background: 'var(--bg-dark)', padding: '15px', borderRadius: '8px' }}>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ranking Difficulty:</span>
                   <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', fontSize: '1.1rem' }}>{results.difficulty}</p>
                 </div>
              </div>
            </div>

          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.rankTracker}
        customTitle="YouTube Rank Tracker FAQs"
        customDescription="Learn how to track your YouTube video rankings and understand what affects them."
      />
    </div>
  );
}
