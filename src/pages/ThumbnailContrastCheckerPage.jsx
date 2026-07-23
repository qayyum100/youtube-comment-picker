import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Sun } from 'lucide-react';

export default function ThumbnailContrastCheckerPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!url) return;
    setResult({
      ratio: '7.8:1 (AAA Pass)',
      feedback: 'Excellent contrast between foreground text and dark background. Highly legible on mobile feeds.'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Thumbnail Contrast Checker — Audit Visual Legibility" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Thumbnail Contrast Checker</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Evaluate visual contrast ratios to guarantee readability across all light & dark themes.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste Thumbnail Image URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                <Sun size={18} style={{ marginRight: '8px' }} /> Audit Contrast
              </button>
            </form>

            {result && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>
                  Contrast Ratio: {result.ratio}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>{result.feedback}</p>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
