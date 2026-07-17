import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { Link2, Image as ImageIcon, Download, AlertCircle } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ThumbnailDownloaderPage() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [error, setError] = useState('');

  const extractVideoId = (inputUrl) => {
    try {
      const parsedUrl = new URL(inputUrl);
      if (parsedUrl.hostname.includes('youtube.com')) {
        return parsedUrl.searchParams.get('v');
      }
      if (parsedUrl.hostname.includes('youtu.be')) {
        return parsedUrl.pathname.slice(1);
      }
    } catch (e) {
      // Invalid URL
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = inputUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleFetch = (e) => {
    e.preventDefault();
    setError('');
    if (!url.trim()) {
      setError('Please enter a YouTube video URL.');
      return;
    }
    const id = extractVideoId(url);
    if (!id) {
      setError('Could not extract a valid YouTube video ID from the provided URL.');
      setVideoId('');
    } else {
      setVideoId(id);
    }
  };

  const thumbnails = videoId ? [
    { label: 'Maximum Resolution (1080p)', quality: 'maxresdefault', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
    { label: 'Standard Definition (480p)', quality: 'sddefault', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
    { label: 'High Quality (360p)', quality: 'hqdefault', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
    { label: 'Medium Quality (180p)', quality: 'mqdefault', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
  ] : [];

  return (
    <>
      <SeoHead pageType="thumbnail" />
      <main style={{ flexGrow: 1 }}>
        <div className="page-wrapper">
          <div className="page-hero">
            <h1>YouTube Thumbnail Downloader</h1>
            <p>Extract and download high-quality thumbnails (up to 4K/1080p) from any public YouTube video instantly. No login required.</p>
          </div>

          {/* Input */}
          <div className="card card-lg" style={{ marginBottom: '32px', maxWidth: '800px', margin: '0 auto 32px auto' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-primary)' }}>
              <Link2 size={18} style={{ color: 'var(--primary)' }} />
              Paste Video URL
            </h2>
            <form onSubmit={handleFetch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
                <span className="input-group-icon"><Link2 size={16} /></span>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); if (error) setError(''); }}
                  aria-label="YouTube video URL"
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={!url} style={{ flexShrink: 0 }}>
                <ImageIcon size={16} /> Get Thumbnails
              </button>
            </form>
            {error && (
              <div className="alert alert-error" style={{ marginTop: '12px' }}>
                <AlertCircle size={14} style={{ flexShrink: 0 }} /> {error}
              </div>
            )}
          </div>

          {/* Results */}
          {videoId && (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', textAlign: 'center', color: 'var(--text-primary)' }}>
                Available Thumbnail Resolutions
              </h3>

              <div className="card card-lg">
                {/* Quality buttons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
                  {thumbnails.map((thumb) => (
                    <a
                      key={thumb.quality}
                      href={thumb.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-sm ${thumb.quality === 'maxresdefault' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Download size={14} /> {thumb.label}
                    </a>
                  ))}
                </div>

                {/* Preview */}
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Primary Preview (Max Resolution)
                </h4>
                <div style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  aspectRatio: '16/9',
                }}>
                  <img
                    src={thumbnails[0].url}
                    alt="Highest quality thumbnail preview"
                    width="640"
                    height="360"
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                    onError={(e) => {
                      if (!e.target.dataset.failed) {
                        e.target.dataset.failed = true;
                        e.target.src = thumbnails[2].url;
                      }
                    }}
                  />
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
                  Right-click the image and select "Save image as..." to download directly, or use the buttons above.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="container">
        <FaqSection
          faqsData={toolFaqs.thumbnailDownloader}
          customTitle="YouTube Thumbnail Downloader FAQs"
          customDescription="Learn how to download high-resolution YouTube thumbnails instantly."
        />
      </div>
    </>
  );
}
