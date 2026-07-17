import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Tag, Copy } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function TagExtractorPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleExtract = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/youtube/video?url=${encodeURIComponent(url)}`);
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to fetch video data');

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="page-wrapper">
      <SEO
        title="Free YouTube Tag Extractor Online | Extract Tags instantly"
        description="Extract YouTube video tags instantly and improve your YouTube SEO ranking with our Free YouTube Tag Extractor tool."
        url="/youtube-tag-extractor"
      />

      <div className="page-hero">
        <h1>Free YouTube Tag Extractor Online</h1>
        <p>Extract YouTube video tags instantly and improve your YouTube SEO ranking.</p>
      </div>

      {/* Tool */}
      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleExtract} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon"><Search size={16} /></span>
            <input
              type="text"
              className="input-field"
              placeholder="Paste YouTube Video URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="YouTube video URL"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexShrink: 0 }}>
            {loading ? <span className="btn-spinner" /> : 'Extract Tags'}
          </button>
        </form>

        {error && <div className="alert alert-error" style={{ marginTop: '16px' }}>{error}</div>}

        {data && (
          <div style={{ marginTop: '28px' }}>
            {/* Video info */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {data.thumbnails?.high?.url && (
                <img src={data.thumbnails.high.url} alt={data.title} className="thumbnail-img" style={{ width: '280px', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>{data.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '14px' }}>Channel: <strong style={{ color: 'var(--text-secondary)' }}>{data.channelTitle}</strong></p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '14px' }}>Total Tags: <strong style={{ color: 'var(--primary)' }}>{data.tags?.length || 0}</strong></p>
                <button onClick={() => copyToClipboard(data.tags?.join(', '))} className="copy-btn">
                  <Copy size={14} /> Copy All Tags
                </button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                <Tag size={16} style={{ color: 'var(--primary)' }} /> Extracted Tags
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.tags && data.tags.length > 0 ? data.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                )) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No tags found for this video.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* How to Use */}
      <section className="card card-lg" style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>How to Use YouTube Tag Extractor</h2>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '14px' }}>
          <li>Copy the YouTube video URL from your browser or app.</li>
          <li>Paste the video link into the search bar above.</li>
          <li>Click the "Extract Tags" button.</li>
          <li>View, copy, or export the tags to use in your own video SEO strategy.</li>
        </ol>
      </section>

      <FaqSection
        faqsData={toolFaqs.tagExtractor}
        customTitle="YouTube Tag Extractor FAQs"
        customDescription="Learn how to find and use the best YouTube tags from other videos."
      />
    </div>
  );
}
