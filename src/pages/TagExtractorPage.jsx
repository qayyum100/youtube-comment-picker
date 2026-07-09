import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Tag, Copy, Download } from 'lucide-react';

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
    // You'd ideally trigger a toast notification here
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free YouTube Tag Extractor Online | Extract Tags instantly"
        description="Extract YouTube video tags instantly and improve your YouTube SEO ranking with our Free YouTube Tag Extractor tool."
        url="/youtube-tag-extractor"
      />
      
      {/* Hero Section */}
      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Free YouTube Tag Extractor Online
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Extract YouTube video tags instantly and improve your YouTube SEO ranking.
        </p>
      </section>

      {/* Tool Area */}
      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleExtract} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Paste YouTube Video URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Extracting...' : 'Extract Tags'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {data && (
          <div style={{ marginTop: '30px' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {data.thumbnails?.high?.url && (
                <img src={data.thumbnails.high.url} alt={data.title} style={{ width: '320px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
              )}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{data.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '5px' }}>Channel: <strong>{data.channelTitle}</strong></p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Total Tags: <strong>{data.tags?.length || 0}</strong></p>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                   <button onClick={() => copyToClipboard(data.tags?.join(', '))} style={{ padding: '8px 15px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                     <Copy size={16} /> Copy All Tags
                   </button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <h4 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={18} /> Extracted Tags</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {data.tags && data.tags.length > 0 ? data.tags.map((tag, index) => (
                  <span key={index} style={{ padding: '8px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {tag}
                  </span>
                )) : (
                  <p style={{ color: 'var(--text-muted)' }}>No tags found for this video.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Feature & Info Sections */}
      <section style={{ marginBottom: '40px' }}>
        <h2>How to Use YouTube Tag Extractor</h2>
        <ol style={{ paddingLeft: '20px', marginTop: '15px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          <li>Copy the YouTube video URL from your browser or app.</li>
          <li>Paste the video link into the search bar above.</li>
          <li>Click the "Extract Tags" button.</li>
          <li>View, copy, or export the tags to use in your own video SEO strategy.</li>
        </ol>
      </section>
    </div>
  );
}
