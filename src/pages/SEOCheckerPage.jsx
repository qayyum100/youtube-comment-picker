import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, CheckCircle, AlertTriangle } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function SEOCheckerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);
    setAnalysis(null);

    try {
      // 1. Fetch Video Details
      const vidResponse = await fetch(`/api/youtube/video?url=${encodeURIComponent(url)}`);
      const vidResult = await vidResponse.json();

      if (!vidResponse.ok) throw new Error(vidResult.error || 'Failed to fetch video data');
      setData(vidResult);

      // 2. Analyze SEO using AI
      const aiResponse = await fetch('/api/ai/seo-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vidResult)
      });
      const aiResult = await aiResponse.json();

      if (!aiResponse.ok) throw new Error(aiResult.error || 'Failed to analyze SEO');
      setAnalysis(aiResult.analysis);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <SEO
        title="YouTube SEO Checker | Free SEO Analyzer Tool"
        description="Check your YouTube video SEO score instantly. Get AI-powered recommendations to improve title, description, and tags."
        url="/youtube-seo-checker"
      />

      {/* Hero */}
      <div className="page-hero">
        <h1>YouTube SEO Checker</h1>
        <p>Analyze your video SEO and get an actionable score to rank higher on YouTube.</p>
      </div>

      {/* Tool Area */}
      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleCheck} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon"><Search size={16} /></span>
            <input
              type="text"
              className="input-field"
              placeholder="Paste YouTube Video URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="YouTube video URL"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexShrink: 0 }}>
            {loading ? <span className="btn-spinner" /> : 'Analyze Video'}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            <AlertTriangle size={16} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        {data && analysis && (
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>

            {/* Score Card */}
            <div className="card" style={{ textAlign: 'center', padding: '28px' }}>
              <p className="field-label" style={{ textAlign: 'center', marginBottom: '16px' }}>Overall SEO Score</p>
              <div
                className="score-ring"
                style={{ background: `conic-gradient(${analysis.score >= 80 ? 'var(--success)' : analysis.score >= 50 ? 'var(--warning)' : 'var(--error)'} ${analysis.score}%, var(--border) 0)` }}
              >
                <div className="score-ring-inner">
                  <span className="score-value">{analysis.score}</span>
                </div>
              </div>
              <p style={{ marginTop: '16px', fontSize: '15px', fontWeight: '700', color: analysis.score >= 80 ? 'var(--success)' : analysis.score >= 50 ? 'var(--warning)' : 'var(--error)' }}>
                {analysis.score >= 80 ? 'Excellent!' : analysis.score >= 50 ? 'Needs Improvement' : 'Poor'}
              </p>
            </div>

            {/* AI Insights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', fontWeight: '700', color: 'var(--success)' }}>
                  <CheckCircle size={16} /> What's Good
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysis.good?.map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--success)', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', fontWeight: '700', color: 'var(--warning)' }}>
                  <AlertTriangle size={16} /> To Improve
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysis.improve?.map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--warning)', flexShrink: 0, marginTop: '1px' }}>⚠</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>

      <FaqSection
        faqsData={toolFaqs.seoChecker}
        customTitle="YouTube SEO Checker FAQs"
        customDescription="Learn more about what makes a good YouTube SEO score and how to optimize your videos for maximum reach."
      />
    </div>
  );
}
