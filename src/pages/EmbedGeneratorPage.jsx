import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Code, Copy, Settings } from 'lucide-react';

export default function EmbedGeneratorPage() {
  const [url, setUrl] = useState('');
  const [autoplay, setAutoplay] = useState(false);
  const [controls, setControls] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [embedCode, setEmbedCode] = useState('');

  // Extract video ID
  const extractYouTubeId = (urlStr) => {
    if (!urlStr) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = urlStr.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    const videoId = extractYouTubeId(url);
    if (!videoId) return;

    let src = `https://www.youtube.com/embed/${videoId}?`;
    if (autoplay) src += `autoplay=1&mute=1&`;
    if (!controls) src += `controls=0&`;
    if (startTime > 0) src += `start=${startTime}&`;

    const code = `<div class="youtube-embed-container" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;"><iframe src="${src}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
    setEmbedCode(code);
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free YouTube Responsive Embed Generator | iframe Embedder"
        description="Generate clean, mobile-responsive YouTube video iframe embed codes instantly. Customize autoplay options, controls, and start times."
        url="/youtube-embed-generator"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Embed Code Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Generate responsive, highly customizable YouTube video iframe embed codes instantly.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Settings */}
        <section className="card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Settings size={20} /> Embed Parameters</h3>
          
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Video URL</label>
              <input 
                type="url" 
                placeholder="Paste YouTube Video URL here..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="input-premium"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Start Time (Seconds)</label>
                <input 
                  type="number" 
                  value={startTime} 
                  onChange={(e) => setStartTime(Number(e.target.value))} 
                  className="input-premium"
                  min="0"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} style={{ width: '16px', height: '16px' }} /> Autoplay (Muted)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={controls} onChange={(e) => setControls(e.target.checked)} style={{ width: '16px', height: '16px' }} /> Show Controls
                </label>
              </div>
            </div>

            <button type="submit" style={{ padding: '15px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <Code size={18} /> Generate Responsive Embed Code
            </button>
          </form>
        </section>

        {/* Code & Preview */}
        <section className="card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.3rem' }}>Responsive Embed Code</h3>
          {embedCode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <textarea 
                value={embedCode}
                readOnly
                style={{ width: '100%', height: '120px', padding: '15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-dark)', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.85rem', resize: 'none' }}
              />
              <button onClick={() => navigator.clipboard.writeText(embedCode)} style={{ padding: '10px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', cursor: 'pointer' }}>
                <Copy size={16} /> Copy HTML Code
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
               <Code size={48} style={{ color: 'var(--text-muted)', marginBottom: '15px' }} />
               <p style={{ margin: 0 }}>Configure parameters and click generate to get iframe embed codes.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
