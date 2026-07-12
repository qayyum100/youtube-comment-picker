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
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="AI YouTube Thumbnail Analyzer | Free Thumbnail Audit Tool"
        description="Audit your YouTube video thumbnails with AI. Calculate CTR readability, contrast, facial expressions, and get suggestions to draw more views."
        url="/youtube-thumbnail-analyzer"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI YouTube Thumbnail Analyzer
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Audit your thumbnail design with AI to optimize readability, contrast, and overall CTR potential.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          <div style={{ width: '100%', maxWidth: '500px', height: '280px', border: '2px dashed var(--border-light)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)' }}>
            {base64 ? (
              <img src={base64} alt="Thumbnail preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <ImageIcon size={48} style={{ color: 'var(--text-muted)', marginBottom: '15px' }} />
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Drag and drop or click to upload thumbnail image</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supports PNG, JPG (Max 5MB)</span>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
            />
          </div>

          {base64 && (
            <button type="submit" disabled={loading} style={{ padding: '15px 40px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={18} /> {loading ? 'Analyzing with AI...' : 'Analyze Thumbnail'}
            </button>
          )}
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)', width: '100%', maxWidth: '500px', margin: '20px auto 0 auto' }}>{error}</div>}

        {analysis && (
          <div style={{ marginTop: '45px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
            
            {/* Score Ring */}
            <div style={{ background: 'var(--bg-surface)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Estimated CTR Score</h3>
                <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(#10b981 ${analysis.score * 10}%, #3f3f46 0)` }}>
                    <div style={{ position: 'absolute', width: '130px', height: '130px', background: 'var(--bg-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{analysis.score}/10</span>
                    </div>
                </div>
                <p style={{ marginTop: '20px', fontSize: '1.1rem', fontWeight: '500' }}>
                    {analysis.score >= 8.0 ? 'Outstanding Potential!' : analysis.score >= 5.0 ? 'Acceptable' : 'Needs Optimization'}
                </p>
            </div>

            {/* Critique */}
            <div>
              <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>AI Critique & Breakdown</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}><CheckCircle size={18} /> Strengths</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {analysis.good?.map((item, i) => (
                    <li key={i} style={{ marginBottom: '8px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#10b981' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}><AlertTriangle size={18} /> Improvement Tips</h4>
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

      <FaqSection 
        faqsData={toolFaqs.thumbnailAnalyzer}
        customTitle="YouTube Thumbnail Analyzer FAQs"
        customDescription="Find out how to improve your thumbnail CTR with AI analysis."
      />
    </div>
  );
}
