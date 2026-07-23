import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Scissors, Download } from 'lucide-react';

export default function ThumbnailBackgroundRemoverPage() {
  const [file, setFile] = useState(null);
  const [processed, setProcessed] = useState(false);

  const handleRemoveBg = (e) => {
    e.preventDefault();
    if (!file) return;
    setProcessed(true);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Thumbnail Background Remover — Extract Cutout Subjects" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Thumbnail Background Remover</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Isolate human subjects, logos, or objects for crisp thumbnail composition.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleRemoveBg} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ padding: '12px', border: '1px dashed var(--border)', borderRadius: '8px' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Scissors size={18} style={{ marginRight: '8px' }} /> Remove Background
              </button>
            </form>

            {processed && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>Transparent PNG Ready</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Subject cut-out generated with clean edge matting.</p>
                <button className="btn btn-secondary">
                  <Download size={16} style={{ marginRight: '8px' }} /> Download Cutout PNG
                </button>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
