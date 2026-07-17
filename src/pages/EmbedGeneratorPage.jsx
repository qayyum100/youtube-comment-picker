import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Code, Copy, Settings } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function EmbedGeneratorPage() {
  const [url, setUrl] = useState('');
  const [autoplay, setAutoplay] = useState(false);
  const [controls, setControls] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [embedCode, setEmbedCode] = useState('');

  const extractYouTubeId = (urlStr) => {
    if (!urlStr) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&\?]*).*/;
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
    <div className="page-wrapper">
      <SEO 
        title="Free YouTube Responsive Embed Generator | iframe Embedder"
        description="Generate clean, mobile-responsive YouTube video iframe embed codes instantly. Customize autoplay options, controls, and start times."
        url="/youtube-embed-generator"
      />

      <div className="page-hero">
        <h1>YouTube Embed Code Generator</h1>
        <p>Generate responsive, highly customizable YouTube video iframe embed codes instantly.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Settings */}
        <div className="card card-lg">
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Settings size={16} style={{ color: 'var(--primary)' }} /> Embed Parameters
          </h3>
          
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label htmlFor="embed-url" className="field-label">Video URL</label>
              <input 
                id="embed-url"
                type="url" 
                className="input-field"
                placeholder="Paste YouTube Video URL here..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div className="grid-cols-2" style={{ gap: '16px', alignItems: 'end' }}>
              <div>
                <label htmlFor="embed-start" className="field-label">Start Time (Seconds)</label>
                <input 
                  id="embed-start"
                  type="number" 
                  className="input-field"
                  value={startTime} 
                  onChange={(e) => setStartTime(Number(e.target.value))} 
                  min="0"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '2px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} style={{ width: '15px', height: '15px', accentColor: 'var(--primary)' }} />
                  Autoplay (Muted)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  <input type="checkbox" checked={controls} onChange={(e) => setControls(e.target.checked)} style={{ width: '15px', height: '15px', accentColor: 'var(--primary)' }} />
                  Show Controls
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              <Code size={16} /> Generate Responsive Embed Code
            </button>
          </form>
        </div>

        {/* Code & Preview */}
        <div className="card card-lg" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Responsive Embed Code</h3>
          {embedCode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              <textarea 
                value={embedCode}
                readOnly
                className="input-textarea"
                style={{ height: '140px', fontFamily: 'monospace', fontSize: '12px', resize: 'none', flex: 1 }}
              />
              <button onClick={() => navigator.clipboard.writeText(embedCode)} className="btn btn-secondary">
                <Copy size={14} /> Copy HTML Code
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Code size={48} style={{ opacity: 0.25, marginBottom: '12px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>Configure parameters and click generate to get iframe embed codes.</p>
            </div>
          )}
        </div>

      </div>

      <FaqSection 
        faqsData={toolFaqs.embedGenerator}
        customTitle="YouTube Embed Code Generator FAQs"
        customDescription="Learn how to embed YouTube videos on any website with advanced customization options."
      />
    </div>
  );
}
