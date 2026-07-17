import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Sparkles, TrendingUp } from 'lucide-react';
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
    <div className="page-wrapper">
      <SEO 
        title="YouTube Rank Tracker | Video Search Ranking Position Checker"
        description="Verify your YouTube video search ranking position for target keywords. Track search optimizations, competition, and difficulties."
        url="/youtube-rank-tracker"
      />

      <div className="page-hero">
        <h1>YouTube Rank Tracker</h1>
        <p>Verify your video's search position rankings for specific keyword phrases.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleTrack} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-cols-2" style={{ gap: '16px' }}>
            <div>
              <label htmlFor="rank-url" className="field-label">Video URL</label>
              <input 
                id="rank-url"
                type="text" 
                className="input-field"
                placeholder="Paste YouTube Video URL here..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="rank-keyword" className="field-label">Target Keyword</label>
              <input 
                id="rank-keyword"
                type="text" 
                className="input-field"
                placeholder="e.g. build a react app" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <TrendingUp size={16} /> Track Rank
              </>
            )}
          </button>
        </form>

        {error && <div className="alert alert-error" style={{ marginTop: '16px' }}>{error}</div>}

        {results && (
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'center' }}>
            {/* Rank Circle */}
            <div className="card" style={{ padding: '32px 28px', textAlign: 'center', minWidth: '160px' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Search Position</p>
              <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: 'var(--primary-light)', border: '3px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary)' }}>#{results.rank}</span>
              </div>
              <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--text-muted)' }}>for <strong style={{ color: 'var(--text-primary)' }}>"{results.keyword}"</strong></p>
            </div>

            {/* SEO Metrics */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ margin: 0, marginBottom: '20px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                <Sparkles size={16} style={{ color: 'var(--primary)' }} /> SEO Competition Metrics
              </h4>
              <div className="grid-cols-2" style={{ gap: '12px' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Keyword Competition</span>
                  <p style={{ margin: '6px 0 0 0', fontWeight: '700', fontSize: '16px', color: 'var(--text-primary)' }}>{results.competition}</p>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Ranking Difficulty</span>
                  <p style={{ margin: '6px 0 0 0', fontWeight: '700', fontSize: '16px', color: 'var(--text-primary)' }}>{results.difficulty}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.rankTracker}
        customTitle="YouTube Rank Tracker FAQs"
        customDescription="Learn how to track your YouTube video rankings and understand what affects them."
      />
    </div>
  );
}
