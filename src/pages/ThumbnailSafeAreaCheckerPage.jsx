import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { ShieldAlert, Upload, Eye, EyeOff } from 'lucide-react';

export default function ThumbnailSafeAreaCheckerPage() {
  const [url, setUrl] = useState('');
  const [aspect, setAspect] = useState('16:9'); // 16:9 or 9:16 Shorts
  const [showOverlays, setShowOverlays] = useState(true);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setUrl(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <SeoHead pageType="tool" title="Thumbnail Safe Area Checker — Avoid Timestamp Clashes" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>🥇 Thumbnail Safe Area Checker</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Verify that key text, logos, and focal faces aren't covered by YouTube timestamps, watch later buttons, or Shorts UI elements.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            {/* Controls Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Image URL</label>
                <input
                  type="text"
                  placeholder="Paste image URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Format Aspect Ratio</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setAspect('16:9')}
                    style={{ flex: 1, padding: '9px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', background: aspect === '16:9' ? 'var(--primary)' : 'var(--bg)', color: aspect === '16:9' ? '#fff' : 'var(--text-primary)', border: '1px solid var(--border)' }}
                  >
                    16:9 Video
                  </button>
                  <button
                    type="button"
                    onClick={() => setAspect('9:16')}
                    style={{ flex: 1, padding: '9px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', background: aspect === '9:16' ? 'var(--primary)' : 'var(--bg)', color: aspect === '9:16' ? '#fff' : 'var(--text-primary)', border: '1px solid var(--border)' }}
                  >
                    9:16 Short
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Upload Custom File</label>
                <input type="file" accept="image/*" onChange={handleFileUpload} id="safe-area-upload" style={{ display: 'none' }} />
                <label htmlFor="safe-area-upload" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '9px' }}>
                  <Upload size={14} style={{ marginRight: '6px' }} /> Select Image
                </label>
              </div>
            </div>

            {/* Toggle Overlay Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>YouTube UI Safe Zone Overlay</span>
              <button
                type="button"
                onClick={() => setShowOverlays(!showOverlays)}
                className="btn btn-sm btn-outline"
                style={{ fontSize: '13px' }}
              >
                {showOverlays ? <EyeOff size={14} style={{ marginRight: '4px' }} /> : <Eye size={14} style={{ marginRight: '4px' }} />}
                {showOverlays ? 'Hide Overlays' : 'Show Overlays'}
              </button>
            </div>

            {/* Canvas Preview Area */}
            <div style={{ maxWidth: aspect === '16:9' ? '100%' : '320px', margin: '0 auto' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: aspect === '16:9' ? '16/9' : '9/16',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#181818',
                  border: '2px solid var(--border)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                }}
              >
                {url ? (
                  <img src={url} alt="Thumbnail preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#777' }}>
                    <ShieldAlert size={36} style={{ marginBottom: '8px' }} />
                    <span>Upload thumbnail or paste image URL</span>
                  </div>
                )}

                {/* Overlays */}
                {showOverlays && aspect === '16:9' && (
                  <>
                    {/* Bottom Right Duration Badge */}
                    <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: '700', border: '1px dashed #ff0000' }}>
                      14:25 (Duration Badge)
                    </div>

                    {/* Top Right Watch Later Hover Overlay */}
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.75)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', border: '1px dashed #ff9900' }}>
                      Watch Later / Queue Zone
                    </div>

                    {/* Bottom Red Progress Bar */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: '#ff0000' }}></div>
                  </>
                )}

                {showOverlays && aspect === '9:16' && (
                  <>
                    {/* Right Action Bar (Shorts) */}
                    <div style={{ position: 'absolute', right: '12px', bottom: '120px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(0,0,0,0.5)', padding: '12px 8px', borderRadius: '20px', color: '#fff', fontSize: '11px', textAlign: 'center' }}>
                      <div>👍<br/>Like</div>
                      <div>💬<br/>Comment</div>
                      <div>↪️<br/>Share</div>
                    </div>

                    {/* Bottom Title Zone */}
                    <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '80px', background: 'rgba(0,0,0,0.6)', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '12px' }}>
                      <strong>@ChannelName</strong><br/>
                      Shorts Title & Audio Details Overlay
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
