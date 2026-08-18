import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Smartphone, Upload, Check, ThumbsUp, MessageCircle, MoreVertical, Share2 } from 'lucide-react';

export default function MobileThumbnailPreviewPage() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('How I Scaled My YouTube Channel to 100K Subscribers in 90 Days!');
  const [channel, setChannel] = useState('Creator Hub');
  const [views, setViews] = useState('245K views');
  const [timeAgo, setTimeAgo] = useState('3 days ago');
  const [duration, setDuration] = useState('14:22');
  const [theme, setTheme] = useState('dark');

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
      <SeoHead pageType="tool" title="Mobile Thumbnail Preview — Test Phone Feed Appearance" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>🥇 Thumbnail Mobile Preview</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Preview how your video thumbnail and title perform on iOS & Android YouTube mobile feeds.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Thumbnail Image Source</label>
                <input
                  type="text"
                  placeholder="Paste Image URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '14px', marginBottom: '8px' }}
                />
                <div style={{ position: 'relative' }}>
                  <input type="file" accept="image/*" onChange={handleFileUpload} id="mobile-thumb-upload" style={{ display: 'none' }} />
                  <label htmlFor="mobile-thumb-upload" className="btn btn-sm btn-outline" style={{ cursor: 'pointer', width: '100%', justifyContent: 'center' }}>
                    <Upload size={14} style={{ marginRight: '6px' }} /> Upload Thumbnail Image
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Video Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Channel Name</label>
                <input
                  type="text"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Mobile Feed Theme</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', background: theme === 'dark' ? '#0f0f0f' : 'var(--bg)', color: theme === 'dark' ? '#fff' : 'var(--text-primary)', border: '1px solid var(--border)' }}
                  >
                    Dark Feed
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', background: theme === 'light' ? '#ffffff' : 'var(--bg)', color: theme === 'light' ? '#000' : 'var(--text-primary)', border: '1px solid var(--border)' }}
                  >
                    Light Feed
                  </button>
                </div>
              </div>
            </div>

            {/* Smartphone Feed Frame */}
            <div style={{ maxWidth: '380px', margin: '0 auto', border: '12px solid #222', borderRadius: '36px', padding: '12px 10px', background: theme === 'dark' ? '#0f0f0f' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#0f0f0f', boxShadow: '0 12px 30px rgba(0,0,0,0.3)' }}>
              {/* Top Phone Notch */}
              <div style={{ width: '120px', height: '18px', background: '#222', borderRadius: '0 0 12px 12px', margin: '-12px auto 12px auto' }}></div>

              {/* YouTube App Top Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 6px 10px 6px', borderBottom: theme === 'dark' ? '1px solid #222' : '1px solid #eee', marginBottom: '10px' }}>
                <span style={{ fontWeight: '800', color: '#ff0000', fontSize: '16px', letterSpacing: '-0.5px' }}>YouTube</span>
                <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: theme === 'dark' ? '#aaa' : '#666' }}>
                  <span>🔍</span>
                  <span>🔔</span>
                </div>
              </div>

              {/* Video Feed Item Card */}
              <div style={{ marginBottom: '16px' }}>
                {/* Thumbnail Wrapper */}
                <div style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#262626', aspectRatio: '16/9' }}>
                  {url ? (
                    <img src={url} alt="Mobile Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                      <Smartphone size={32} style={{ marginBottom: '6px' }} />
                      <span style={{ fontSize: '12px' }}>Upload image to preview</span>
                    </div>
                  )}
                  {/* Timestamp Badge */}
                  <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '2px 6px', fontSize: '11px', fontWeight: '700', borderRadius: '4px' }}>
                    {duration}
                  </span>
                </div>

                {/* Video Info */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px', padding: '0 4px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>
                    {channel.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.35', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: theme === 'dark' ? '#f1f1f1' : '#0f0f0f' }}>
                      {title}
                    </div>
                    <div style={{ fontSize: '12px', color: theme === 'dark' ? '#aaaaaa' : '#606060', marginTop: '4px' }}>
                      {channel} • {views} • {timeAgo}
                    </div>
                  </div>
                  <MoreVertical size={16} style={{ color: theme === 'dark' ? '#aaa' : '#606060', flexShrink: 0 }} />
                </div>
              </div>
            </div>
          </div>

          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
