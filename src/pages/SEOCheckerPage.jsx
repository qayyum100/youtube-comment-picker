import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

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
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="YouTube SEO Checker | Free SEO Analyzer Tool"
        description="Check your YouTube video SEO score instantly. Get AI-powered recommendations to improve title, description, and tags."
        url="/youtube-seo-checker"
      />
      
      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube SEO Checker
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Analyze your video SEO and get an actionable score to rank higher.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleCheck} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Paste YouTube Video URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Analyzing...' : 'Analyze Video'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {data && analysis && (
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
            
            {/* Score Card */}
            <div style={{ background: 'var(--bg-surface)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Overall SEO Score</h3>
                <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(#10b981 ${analysis.score}%, #3f3f46 0)` }}>
                    <div style={{ position: 'absolute', width: '130px', height: '130px', background: 'var(--bg-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{analysis.score}</span>
                    </div>
                </div>
                <p style={{ marginTop: '20px', fontSize: '1.1rem', fontWeight: '500' }}>
                    {analysis.score >= 80 ? 'Excellent!' : analysis.score >= 50 ? 'Needs Improvement' : 'Poor'}
                </p>
            </div>

            {/* AI Insights */}
            <div>
                <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>AI Recommendations</h3>
                
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}><CheckCircle size={18} /> What's Good</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {analysis.good?.map((item, i) => (
                            <li key={i} style={{ marginBottom: '8px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                <span style={{ color: '#10b981' }}>✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}><AlertTriangle size={18} /> To Improve</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {analysis.improve?.map((item, i) => (
                            <li key={i} style={{ marginBottom: '8px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                <span style={{ color: '#f59e0b' }}>⚠</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

          </div>
        )}
      </section>
    </div>
  );
}
