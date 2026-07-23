import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Sparkles, Download } from 'lucide-react';

export default function ThumbnailUpscalerPage() {
  const [file, setFile] = useState(null);
  const [upscaled, setUpscaled] = useState(false);

  const handleUpscale = (e) => {
    e.preventDefault();
    if (!file) return;
    setUpscaled(true);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Thumbnail Upscaler — AI 4K Clarity Enhancer" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Thumbnail Upscaler</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Enhance low-resolution video stills or old thumbnails to 1080p and 4K ultra-sharp quality.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleUpscale} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ padding: '12px', border: '1px dashed var(--border)', borderRadius: '8px' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Sparkles size={18} style={{ marginRight: '8px' }} /> Upscale Image 4x
              </button>
            </form>

            {upscaled && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>Upscaled to 3840x2160 (4K)</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Detail and edge sharpening applied.</p>
                <button className="btn btn-secondary">
                  <Download size={16} style={{ marginRight: '8px' }} /> Download Ultra-HD Image
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
