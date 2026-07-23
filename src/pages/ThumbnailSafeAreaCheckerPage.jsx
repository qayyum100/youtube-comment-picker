import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { ShieldAlert } from 'lucide-react';

export default function ThumbnailSafeAreaCheckerPage() {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState(false);

  const handleAudit = (e) => {
    e.preventDefault();
    if (!url) return;
    setPreview(true);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Thumbnail Safe Area Checker — Avoid Timestamp Clashes" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Thumbnail Safe Area Checker</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Ensure key text and graphics aren't covered by YouTube duration badges or watch later icons.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAudit} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste Thumbnail Image URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                <ShieldAlert size={18} style={{ marginRight: '8px' }} /> Check Overlay
              </button>
            </form>

            {preview && (
              <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img src={url} alt="Thumbnail preview" style={{ width: '100%', display: 'block' }} />
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: '700' }}>
                  12:45
                </div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>
                  Watch Later Overlay Zone
                </div>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
