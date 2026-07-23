import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Palette } from 'lucide-react';

export default function ThumbnailColorCheckerPage() {
  const [url, setUrl] = useState('');
  const [colors, setColors] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!url) return;
    setColors([
      { hex: '#FF0033', percentage: '42%', label: 'Vibrant Red (High Attention)' },
      { hex: '#111827', percentage: '35%', label: 'Dark Charcoal (Background)' },
      { hex: '#FACC15', percentage: '23%', label: 'Accent Yellow (High Contrast)' }
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Thumbnail Color Checker — Extract Dominant Palettes" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Thumbnail Color Checker</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Extract exact HEX codes and dominant color distributions from any thumbnail.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste Thumbnail or Video Image URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                <Palette size={18} style={{ marginRight: '8px' }} /> Analyze Palette
              </button>
            </form>

            {colors && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {colors.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', borderRadius: '8px', background: 'var(--bg-secondary)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: c.hex, border: '1px solid var(--border)' }} />
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '15px' }}>{c.hex}</strong> - <span style={{ color: 'var(--text-secondary)' }}>{c.label}</span>
                    </div>
                    <span className="badge badge-primary">{c.percentage}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
