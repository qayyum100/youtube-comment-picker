import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Sparkles, AlertCircle, MessageSquare } from 'lucide-react';

export default function CommentAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // 1. Fetch comments
      const commResponse = await fetch(`/api/youtube/comments?url=${encodeURIComponent(url)}`);
      const commResult = await commResponse.json();
      
      if (!commResponse.ok) throw new Error(commResult.error || 'Failed to fetch comments');
      
      // 2. Analyze comments via AI
      const aiResponse = await fetch('/api/ai/comment-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: commResult.comments })
      });
      const aiResult = await aiResponse.json();
      
      if (!aiResponse.ok) throw new Error(aiResult.error || 'Failed to analyze comments');
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
        title="AI YouTube Comment Analyzer | Free Sentiment Analysis"
        description="Analyze YouTube video comment sentiment instantly. Detect positive, negative, spam, and specific viewer suggestions using AI."
        url="/youtube-comment-analyzer"
      />
      
      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI YouTube Comment Analyzer
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Understand your audience. Analyze comment sentiment, questions, and requests using AI.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Paste YouTube Video URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} /> {loading ? 'Analyzing...' : 'Analyze Comments'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {analysis && (
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
            
            {/* Sentiment Breakdown */}
            <div style={{ background: 'var(--bg-surface)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '1.2rem' }}>Sentiment Breakdown</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                            <span>Positive</span>
                            <strong>{analysis.positive}%</strong>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px' }}>
                            <div style={{ width: `${analysis.positive}%`, height: '100%', background: '#10b981', borderRadius: '4px' }} />
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                            <span>Neutral</span>
                            <strong>{analysis.neutral}%</strong>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px' }}>
                            <div style={{ width: `${analysis.neutral}%`, height: '100%', background: '#6b7280', borderRadius: '4px' }} />
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                            <span>Negative</span>
                            <strong>{analysis.negative}%</strong>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px' }}>
                            <div style={{ width: `${analysis.negative}%`, height: '100%', background: '#ef4444', borderRadius: '4px' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Findings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                    <h4 style={{ margin: 0, marginBottom: '10px', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '8px' }}><Sparkles size={16} /> What Your Audience Wants</h4>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{analysis.summary}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                        <h4 style={{ margin: 0, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={16} /> Common Questions</h4>
                        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
                            {analysis.questions?.map((q, idx) => <li key={idx} style={{ marginBottom: '8px' }}>{q}</li>)}
                        </ul>
                    </div>
                    <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                        <h4 style={{ margin: 0, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={16} /> Viewer Suggestions</h4>
                        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
                            {analysis.suggestions?.map((s, idx) => <li key={idx} style={{ marginBottom: '8px' }}>{s}</li>)}
                        </ul>
                    </div>
                </div>
            </div>

          </div>
        )}
      </section>
    </div>
  );
}
