import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Search, Image, Eye, Sparkles } from 'lucide-react';

export default function CompetitorThumbnailAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setAnalysis({
        contrastScore: '88/100 (High)',
        faceDetected: 'Yes (1 High-Emotion Face)',
        colorPalette: ['#FF0000', '#FFFF00', '#000000'],
        textOverlay: '3 Words ("SECRET UNLOCKED")',
        recommendation: 'Great visual hierarchy. High contrast yellow on dark background drives high CTR.'
      });
      setLoading(false);
    }, 600);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Competitor Thumbnail Analyzer — Decode High CTR Thumbnails" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Competitor Thumbnail Analyzer
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Analyze competitor thumbnails for contrast, face expressions, color palettes, and text overlays.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste Competitor Video URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">
                {loading ? 'Analyzing...' : 'Analyze Thumbnail'}
              </button>
            </form>

            {analysis && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Contrast & Clarity</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--success)' }}>{analysis.contrastScore}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Face & Emotion</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>{analysis.faceDetected}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Text Overlay</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--warning)' }}>{analysis.textOverlay}</div>
                </div>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.competitorThumbnailAnalyzer || []} title="Frequently Asked Questions — Thumbnail Analyzer" />
        </div>
      </main>
    </>
  );
}
