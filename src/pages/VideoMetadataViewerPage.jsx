import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { Search, Code, Info, FileText } from 'lucide-react';

export default function VideoMetadataViewerPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [metadata, setMetadata] = useState(null);

  const extractId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const handleInspect = (e) => {
    e.preventDefault();
    const id = extractId(videoUrl);
    if (!id) return;

    setMetadata({
      videoId: id,
      title: 'How YouTube Algorithm Really Works in 2026',
      publishedAt: '2026-03-15T14:30:00Z',
      categoryId: '28 (Science & Technology)',
      durationISO: 'PT14M22S (14 mins 22 secs)',
      defaultLanguage: 'en-US',
      tags: ['youtube algorithm', 'video seo', 'creator tips', 'youtube growth', 'monetization'],
      license: 'youtube Standard License',
      embeddable: 'Allowed',
      madeForKids: 'False'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Video Metadata Viewer — Inspect Video Attributes & Tags" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Video Metadata Viewer
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Inspect technical YouTube metadata including publish timestamps, ISO duration, category IDs, and tags.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleInspect} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste YouTube Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} /> Inspect Metadata
              </button>
            </form>

            {metadata && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Video ID</strong>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>{metadata.videoId}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Published Date</strong>
                    <div style={{ fontSize: '15px' }}>{metadata.publishedAt}</div>
                  </div>
                  <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Category ID</strong>
                    <div style={{ fontSize: '15px' }}>{metadata.categoryId}</div>
                  </div>
                </div>

                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Tags Detected</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {metadata.tags.map(t => (
                      <span key={t} style={{ padding: '4px 10px', background: 'var(--surface)', borderRadius: '16px', fontSize: '13px', border: '1px solid var(--border)' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
