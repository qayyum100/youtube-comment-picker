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

          {/* Publisher Content & Guide Section for AdSense Compliance */}
        <div style={{ maxWidth: '900px', margin: '40px auto 0 auto', color: 'var(--text-primary)' }}>
          <div className="card card-lg" style={{ lineHeight: '1.7' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>
              How to Download High-Resolution YouTube Video Thumbnails
            </h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Extracting full-size cover images from YouTube videos is essential for creators, digital marketers, graphic designers, and content archivists. Our free online YouTube Thumbnail Downloader gives you instant access to the highest image quality available (up to 1080p Full HD maxresdefault) directly from YouTube’s official image servers.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>
              Step-by-Step Guide to Grab Any YouTube Thumbnail
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '20px', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '8px' }}><strong>Copy the Video Link:</strong> Open YouTube on your desktop or mobile app and copy the URL of the video whose thumbnail you wish to save.</li>
              <li style={{ marginBottom: '8px' }}><strong>Paste into Input Field:</strong> Paste the link into the box above. We support standard links (<code style={{ padding: '2px 6px', background: 'var(--bg-secondary)', borderRadius: '4px' }}>youtube.com/watch?v=...</code>), short links (<code style={{ padding: '2px 6px', background: 'var(--bg-secondary)', borderRadius: '4px' }}>youtu.be/...</code>), and embed URLs.</li>
              <li style={{ marginBottom: '8px' }}><strong>Choose Quality Resolution:</strong> Click "Get Thumbnails" to render HD, SD, HQ, and MQ preview links.</li>
              <li style={{ marginBottom: '8px' }}><strong>Download & Save:</strong> Right-click the high-resolution image to save it or click any of the direct download buttons.</li>
            </ol>

            <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>
              YouTube Thumbnail Sizes & Aspect Ratio Standards
            </h3>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              According to official YouTube Creator guidelines, a custom video thumbnail should adhere to the following specifications for optimal display across mobile apps, desktop browsers, and Smart TVs:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '6px' }}><strong>Recommended Dimensions:</strong> 1280 x 720 pixels (minimum width of 640 pixels).</li>
              <li style={{ marginBottom: '6px' }}><strong>Aspect Ratio:</strong> 16:9 widescreen ratio (commonly used in YouTube players and previews).</li>
              <li style={{ marginBottom: '6px' }}><strong>Max File Size:</strong> 2 MB for standard YouTube uploads.</li>
              <li style={{ marginBottom: '6px' }}><strong>Supported Image Formats:</strong> JPG, GIF, PNG, or WEBP.</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>
              Why Thumbnail Design and Contrast Matter for CTR (Click-Through Rate)
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Your YouTube thumbnail acts as your video's movie poster. Analyzing successful competitors' thumbnails helps you identify trending visual styles, color combinations, typography choices, and facial expressions that grab attention in recommendation feeds. Use this downloader tool to analyze thumbnail designs in your niche and elevate your channel's visual branding.
            </p>
          </div>
        </div>
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
