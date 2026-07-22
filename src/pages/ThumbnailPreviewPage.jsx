import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { Eye, Layout, Monitor, Smartphone } from 'lucide-react';

export default function ThumbnailPreviewPage() {
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80');
  const [title, setTitle] = useState('I Tested The Secret YouTube Algorithm Hack For 30 Days!');
  const [channelName, setChannelName] = useState('Creator Hub');

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Thumbnail Preview Tool — Test Packaging Before Publishing" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Thumbnail Preview Tool
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Preview how your thumbnail and title look on YouTube Feed, Search, and Mobile Dark/Light themes.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Thumbnail Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Video Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Channel Name</label>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Desktop Preview */}
              <div>
                <div style={{ fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Monitor size={18} /> Desktop Home Feed Card Preview
                </div>
                <div style={{ width: '320px', background: '#0f0f0f', color: '#fff', borderRadius: '12px', overflow: 'hidden', paddingBottom: '12px', fontFamily: 'Roboto, sans-serif' }}>
                  <img src={imageUrl} alt="Thumbnail preview" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
                  <div style={{ padding: '12px', display: 'flex', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EF4444', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {channelName.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.3', marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#aaa' }}>{channelName} • 120K views • 2 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
