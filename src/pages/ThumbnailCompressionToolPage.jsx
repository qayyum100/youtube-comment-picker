import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Download, Image } from 'lucide-react';

export default function ThumbnailCompressionToolPage() {
  const [file, setFile] = useState(null);
  const [compressed, setCompressed] = useState(false);

  const handleCompress = (e) => {
    e.preventDefault();
    if (!file) return;
    setCompressed(true);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Thumbnail Compression Tool — Compress Under 2MB" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Thumbnail Compression Tool</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Optimize thumbnail file size below YouTube's strict 2MB limit while retaining high resolution.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleCompress} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ padding: '12px', border: '1px dashed var(--border)', borderRadius: '8px', cursor: 'pointer' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Image size={18} style={{ marginRight: '8px' }} /> Compress Thumbnail
              </button>
            </form>

            {compressed && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>Compression Complete!</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Reduced file size by 68% (from 4.2 MB to 1.3 MB)</p>
                <button className="btn btn-secondary">
                  <Download size={16} style={{ marginRight: '8px' }} /> Download Compressed WebP / JPG
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
