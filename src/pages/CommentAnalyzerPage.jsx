import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Sparkles, AlertCircle, MessageSquare } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

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
    <div className="page-wrapper">
      <SEO 
        title="AI YouTube Comment Analyzer | Free Sentiment Analysis"
        description="Analyze YouTube video comment sentiment instantly. Detect positive, negative, spam, and specific viewer suggestions using AI."
        url="/youtube-comment-analyzer"
      />
      
      <div className="page-hero">
        <h1>AI YouTube Comment Analyzer</h1>
        <p>Understand your audience. Analyze comment sentiment, questions, and requests using AI.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              className="input-field"
              placeholder="Paste YouTube Video URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flexShrink: 0 }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <Sparkles size={16} /> Analyze Comments
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        {analysis && (
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
            
            {/* Sentiment Breakdown */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Sentiment Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Positive</span>
                    <strong style={{ color: 'var(--success)' }}>{analysis.positive}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${analysis.positive}%`, height: '100%', background: 'var(--success)', borderRadius: '4px' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Neutral</span>
                    <strong style={{ color: 'var(--text-muted)' }}>{analysis.neutral}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${analysis.neutral}%`, height: '100%', background: 'var(--border-strong)', borderRadius: '4px' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Negative</span>
                    <strong style={{ color: 'var(--error)' }}>{analysis.negative}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${analysis.negative}%`, height: '100%', background: 'var(--error)', borderRadius: '4px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Findings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card" style={{ padding: '24px', borderColor: 'rgba(59, 130, 246, 0.2)', background: 'var(--primary-light)' }}>
                <h4 style={{ margin: 0, marginBottom: '8px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700' }}>
                  <Sparkles size={16} /> What Your Audience Wants
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>{analysis.summary}</p>
              </div>

              <div className="grid-cols-2" style={{ gap: '20px' }}>
                <div className="card" style={{ padding: '20px' }}>
                  <h4 style={{ margin: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    <MessageSquare size={16} style={{ color: 'var(--primary)' }} /> Common Questions
                  </h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
                    {analysis.questions?.map((q, idx) => <li key={idx} style={{ marginBottom: '6px' }}>{q}</li>)}
                  </ul>
                </div>
                <div className="card" style={{ padding: '20px' }}>
                  <h4 style={{ margin: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    <AlertCircle size={16} style={{ color: 'var(--primary)' }} /> Viewer Suggestions
                  </h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
                    {analysis.suggestions?.map((s, idx) => <li key={idx} style={{ marginBottom: '6px' }}>{s}</li>)}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.commentAnalyzer}
        customTitle="YouTube Comment Analyzer FAQs"
        customDescription="Find out how analyzing your comments can boost your engagement and video ideas."
      />
    </div>
  );
}
