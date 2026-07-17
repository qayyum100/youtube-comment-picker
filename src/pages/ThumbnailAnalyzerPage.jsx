import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Upload, Sparkles, CheckCircle, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ThumbnailAnalyzerPage() {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setError(null);
    setAnalysis(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!base64) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/thumbnail-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to analyze thumbnail');

      setAnalysis(result.analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <SEO 
        title="AI YouTube Thumbnail Analyzer | Free Thumbnail Audit Tool"
        description="Audit your YouTube video thumbnails with AI. Calculate CTR readability, contrast, facial expressions, and get suggestions to draw more views."
        url="/youtube-thumbnail-analyzer"
      />

      <div className="page-hero">
        <h1>AI YouTube Thumbnail Analyzer</h1>
        <p>Audit your thumbnail design with AI to optimize readability, contrast, and overall CTR potential.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          <div style={{ width: '100%', maxWidth: '500px', height: '280px', border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
            {base64 ? (
              <img src={base64} alt="Thumbnail preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <ImageIcon size={44} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>Drag and drop or click to upload thumbnail image</p>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Supports PNG, JPG (Max 5MB)</span>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              aria-label="Upload thumbnail image"
            />
          </div>

          {base64 && (
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ minWidth: '180px' }}>
              {loading ? (
                <span className="btn-spinner" role="status" aria-label="Loading" />
              ) : (
                <>
                  <Sparkles size={16} /> Analyze Thumbnail
                </>
              )}
            </button>
          )}
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '20px', maxWidth: '500px', margin: '20px auto 0 auto' }}>
            {error}
          </div>
        )}

        {analysis && (
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'start' }}>
            
            {/* Score Ring */}
            <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>Estimated CTR Score</h3>
              <div
                className="score-ring"
                style={{ background: `conic-gradient(var(--success) ${analysis.score * 10}%, var(--border) 0)` }}
              >
                <div className="score-ring-inner">
                  <span className="score-value" style={{ fontSize: '24px' }}>{analysis.score}/10</span>
                </div>
              </div>
              <p style={{ marginTop: '16px', fontSize: '15px', fontWeight: '700', color: analysis.score >= 8.0 ? 'var(--success)' : analysis.score >= 5.0 ? 'var(--warning)' : 'var(--error)' }}>
                {analysis.score >= 8.0 ? 'Outstanding Potential!' : analysis.score >= 5.0 ? 'Acceptable' : 'Needs Optimization'}
              </p>
            </div>

            {/* Critique */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', fontWeight: '700' }}>
                  <CheckCircle size={16} /> Strengths
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysis.good?.map((item, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--success)', flexShrink: 0 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', fontWeight: '700' }}>
                  <AlertTriangle size={16} /> Improvement Tips
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysis.improve?.map((item, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--warning)', flexShrink: 0 }}>⚠</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.thumbnailAnalyzer}
        customTitle="YouTube Thumbnail Analyzer FAQs"
        customDescription="Find out how to improve your thumbnail CTR with AI analysis."
      />
    </div>
  );
}
