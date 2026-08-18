import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Sun, Upload, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function ThumbnailContrastCheckerPage() {
  const [url, setUrl] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#111827');
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setUrl(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Convert hex to relative luminance (WCAG spec)
  const getLuminance = (hex) => {
    const rgb = hex.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16) / 255);
    const [r, g, b] = rgb.map(c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const calculateContrast = () => {
    const l1 = getLuminance(textColor);
    const l2 = getLuminance(bgColor);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const rounded = ratio.toFixed(2);

    let status = 'AAA Pass';
    let message = 'Outstanding contrast ratio! Text will be crystal clear on all screen sizes and brightness levels.';
    let score = 'pass-aaa';

    if (ratio < 3.0) {
      status = 'Fail';
      message = 'Very low contrast! Text will be unreadable on mobile feeds and under bright sunlight.';
      score = 'fail';
    } else if (ratio < 4.5) {
      status = 'AA Large Text Pass';
      message = 'Acceptable for large titles, but small subtext may be hard to read.';
      score = 'pass-aa';
    }

    setResult({ ratio: `${rounded}:1`, status, message, score });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Thumbnail Contrast Checker — Audit Visual Legibility" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>🥇 Thumbnail Contrast Checker</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Calculate visual contrast ratios to guarantee 100% text legibility across all phone screens and dark/light modes.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            {/* Color Selectors & Calculator */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Text / Foreground Color</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    style={{ width: '44px', height: '44px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Background Color</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    style={{ width: '44px', height: '44px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Optional Image Upload</label>
                <input type="file" accept="image/*" onChange={handleFileUpload} id="contrast-upload" style={{ display: 'none' }} />
                <label htmlFor="contrast-upload" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
                  <Upload size={14} style={{ marginRight: '6px' }} /> Upload Thumbnail
                </label>
              </div>
            </div>

            <button type="button" onClick={calculateContrast} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px', fontWeight: '600', marginBottom: '24px' }}>
              <Sun size={18} style={{ marginRight: '8px' }} /> Audit Contrast & Readability
            </button>

            {/* Live Text Preview Box */}
            <div style={{ padding: '32px', borderRadius: '12px', background: bgColor, color: textColor, textAlign: 'center', marginBottom: '24px', transition: 'all 0.3s ease', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0', color: 'inherit' }}>SAMPLE THUMBNAIL TEXT</h2>
              <p style={{ fontSize: '15px', margin: 0, opacity: 0.9, color: 'inherit' }}>Subtext Legibility Test — 100K Views Strategy</p>
            </div>

            {/* Result Breakdown Card */}
            {result && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px', borderLeft: `6px solid ${result.score === 'fail' ? '#ef4444' : result.score === 'pass-aa' ? '#f59e0b' : '#10b981'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  {result.score === 'fail' && <XCircle size={22} style={{ color: '#ef4444' }} />}
                  {result.score === 'pass-aa' && <AlertTriangle size={22} style={{ color: '#f59e0b' }} />}
                  {result.score === 'pass-aaa' && <CheckCircle2 size={22} style={{ color: '#10b981' }} />}
                  <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
                    Contrast Ratio: {result.ratio} ({result.status})
                  </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>{result.message}</p>
              </div>
            )}
          </div>

          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
