import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { Link2, Image as ImageIcon, Download, ExternalLink, AlertCircle } from 'lucide-react';

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
    
    // Fallback regex
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

      <main style={{ flexGrow: 1, padding: '40px 0' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }} className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', lineHeight: '1.2' }}>
              YouTube <span style={{ color: 'var(--brand-indigo)' }}>Thumbnail Downloader</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              Extract and download high-quality thumbnails (up to 4K/1080p) from any public YouTube video instantly. No login required.
            </p>
          </div>

          {/* Input Box */}
          <div className="card-premium active-border animate-fade-in" style={{ marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px auto' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Link2 size={20} style={{ color: 'var(--brand-indigo)' }} />
              Paste Video URL
            </h2>

            <form onSubmit={handleFetch} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', width: '100%', flexWrap: 'wrap' }}>
                <div style={{ flexGrow: 1, minWidth: '280px' }}>
                  <input
                    type="text"
                    className="input-premium"
                    placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) setError('');
                    }}
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={!url}>
                  <ImageIcon size={18} />
                  Get Thumbnails
                </button>
              </div>

              {error && (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Results Area */}
          {videoId && (
            <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '24px', textAlign: 'center', color: 'var(--text-primary)' }}>
                Available Thumbnail Resolutions
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div className="card-premium" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Quality Selector Buttons */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-dark)' }}>
                    {thumbnails.map((thumb) => (
                      <a 
                        key={thumb.quality}
                        href={thumb.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={thumb.quality === 'maxresdefault' ? 'btn-primary' : 'btn-secondary'}
                        style={{ padding: '10px 16px', fontSize: '0.9rem', textDecoration: 'none' }}
                      >
                        <Download size={16} /> {thumb.label}
                      </a>
                    ))}
                  </div>

                  {/* Primary Preview */}
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', textAlign: 'center' }}>
                      Primary Preview (Max Resolution)
                    </h4>
                    
                    <div style={{ 
                      width: '100%', 
                      backgroundColor: 'var(--bg-dark)', 
                      borderRadius: 'var(--radius-md)', 
                      overflow: 'hidden',
                      border: '1px solid var(--border-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '360px',
                      aspectRatio: '16/9'
                    }}>
                      <img 
                        src={thumbnails[0].url} 
                        alt="Highest quality thumbnail preview"
                        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                        onError={(e) => {
                          if (!e.target.dataset.failed) {
                            e.target.dataset.failed = true;
                            e.target.src = thumbnails[2].url; // fallback to hqdefault
                          }
                        }}
                      />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
                      Right-click the image and select "Save image as..." to download directly, or use the buttons above.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
