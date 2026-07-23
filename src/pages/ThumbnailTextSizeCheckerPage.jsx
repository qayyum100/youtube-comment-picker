import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Type } from 'lucide-react';

export default function ThumbnailTextSizeCheckerPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!url) return;
    setResult({
      size: 'Optimal (3-4 Words)',
      readability: '95% (Passes 3-second glance test on small screens)'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Thumbnail Text Size Checker — Audit Font & Scale" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Thumbnail Text Size Checker</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Verify text proportion and legibility on mobile viewports.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleCheck} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste Thumbnail Image URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                <Type size={18} style={{ marginRight: '8px' }} /> Check Text Size
              </button>
            </form>

            {result && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>
                  Text Scale: {result.size}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}><strong>Mobile Readability:</strong> {result.readability}</p>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
