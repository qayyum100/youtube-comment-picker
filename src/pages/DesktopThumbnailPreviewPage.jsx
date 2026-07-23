import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Monitor } from 'lucide-react';

export default function DesktopThumbnailPreviewPage() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('How I Scaled My Channel to 1,000,000 Subscribers!');

  return (
    <>
      <SeoHead pageType="tool" title="Desktop Thumbnail Preview — Test Widescreen Grid" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Desktop Thumbnail Preview</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Simulate browser feed grid presentation on desktop monitors.</p>
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

            <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', background: 'var(--bg-secondary)', maxWidth: '420px', margin: '0 auto' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', position: 'relative', marginBottom: '12px' }}>
                {url ? <img src={url} alt="Thumbnail preview" style={{ width: '100%', display: 'block' }} /> : <div style={{ height: '220px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Monitor /></div>}
                <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '2px 6px', fontSize: '11px', borderRadius: '4px' }}>14:20</span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: '700', lineHeight: '1.4', marginBottom: '4px' }}>{title}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Creator Studio • 450K views • 1 day ago</div>
            </div>
          </div>
          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
