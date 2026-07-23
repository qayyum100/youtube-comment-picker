import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Smartphone } from 'lucide-react';

export default function MobileThumbnailPreviewPage() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('My Insane YouTube Video!');

  return (
    <>
      <SeoHead pageType="tool" title="Mobile Thumbnail Preview — Test Phone Feed Appearance" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Mobile Thumbnail Preview</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Preview how your video thumbnail and title look on iOS and Android feeds.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Thumbnail Image URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <input
                type="text"
                placeholder="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
            </div>

            <div style={{ maxWidth: '360px', margin: '0 auto', border: '12px solid #222', borderRadius: '32px', padding: '12px', background: '#000', color: '#fff' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative', marginBottom: '8px' }}>
                {url ? <img src={url} alt="Thumbnail preview" style={{ width: '100%', display: 'block' }} /> : <div style={{ height: '180px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Smartphone /></div>}
                <span style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', fontSize: '10px', borderRadius: '3px' }}>10:15</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.3' }}>{title}</div>
              <div style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>Channel Name • 120K views • 2 hours ago</div>
            </div>
          </div>
          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
