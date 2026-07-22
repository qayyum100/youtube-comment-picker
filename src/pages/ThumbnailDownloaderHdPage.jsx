import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { Download, Image as ImageIcon, CheckCircle, Search } from 'lucide-react';

export default function ThumbnailDownloaderHdPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');

  const extractId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const handleFetch = (e) => {
    e.preventDefault();
    const id = extractId(videoUrl);
    setVideoId(id);
  };

  const qualities = [
    { label: '4K Ultra HD (maxresdefault)', resolution: '3840 x 2160 / 1920 x 1080', filename: 'maxresdefault.jpg' },
    { label: 'HD High Quality (hqdefault)', resolution: '480 x 360', filename: 'hqdefault.jpg' },
    { label: 'Medium Quality (mqdefault)', resolution: '320 x 180', filename: 'mqdefault.jpg' },
    { label: 'Standard Quality (sddefault)', resolution: '640 x 480', filename: 'sddefault.jpg' }
  ];

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Thumbnail Downloader HD — Download 4K & 1080p Images" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Thumbnail Downloader HD
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Download high-resolution 4K, 1080p, and HD thumbnails from any YouTube video instantly.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleFetch} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste YouTube Video URL (e.g. https://www.youtube.com/watch?v=...)"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} /> Get Thumbnails
              </button>
            </form>

            {videoId && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {qualities.map((q) => {
                  const imgUrl = `https://img.youtube.com/vi/${videoId}/${q.filename}`;
                  return (
                    <div key={q.filename} className="card" style={{ padding: '16px', background: 'var(--bg-secondary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <strong style={{ fontSize: '15px' }}>{q.label}</strong>
                          <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '8px' }}>({q.resolution})</span>
                        </div>
                        <a
                          href={imgUrl}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className="btn btn-secondary btn-sm"
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                        >
                          <Download size={14} /> Download HD Image
                        </a>
                      </div>
                      <img src={imgUrl} alt={q.label} style={{ width: '100%', borderRadius: '8px', maxHeight: '360px', objectFit: 'cover' }} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
