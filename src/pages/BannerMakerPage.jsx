import React, { useRef, useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Palette, Download, Image as ImageIcon, Type } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function BannerMakerPage() {
  const canvasRef = useRef(null);
  const [text, setText] = useState('MY CHANNEL');
  const [bgColor, setBgColor] = useState('#0f172a');
  const [textColor, setTextColor] = useState('#ffffff');
  const [template, setTemplate] = useState('dark'); // dark, glow, minimalist

  const drawBanner = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = 2560;
    const height = 1440;

    canvas.width = width;
    canvas.height = height;

    // Draw background
    if (template === 'dark') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, bgColor);
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (template === 'glow') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      // Neon circles
      ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 400, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Minimalist
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);
    }

    // Draw TV safe area guide lines (optional/subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 508, width, 423); // Desktop safe area height: 423px

    // Draw Main channel text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 120px Inter';
    ctx.fillStyle = template === 'minimalist' ? '#0f172a' : textColor;
    
    // Specular text glow if template is 'glow'
    if (template === 'glow') {
      ctx.shadowColor = 'rgba(99, 102, 241, 0.8)';
      ctx.shadowBlur = 30;
    }
    
    ctx.fillText(text.toUpperCase(), width / 2, height / 2);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Subtitle
    ctx.font = '500 40px Inter';
    ctx.fillStyle = template === 'minimalist' ? '#64748b' : 'rgba(255, 255, 255, 0.4)';
    ctx.fillText('NEW VIDEOS EVERY WEEK', width / 2, height / 2 + 100);
  };

  useEffect(() => {
    drawBanner();
  }, [text, bgColor, textColor, template]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'youtube_banner_2560x1440.png';
    link.click();
  };

  return (
    <div className="page-wrapper">
      <SEO 
        title="Free YouTube Banner Maker Online | 2560x1440 Banner Designer"
        description="Design and download custom YouTube channel banners (2560x1440) instantly. Choose templates, modify channel text, background colors, and export high-resolution PNGs."
        url="/youtube-banner-maker"
      />

      <div className="page-hero">
        <h1>Free YouTube Banner Maker</h1>
        <p>Design professional 2560x1440 YouTube channel banners instantly.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Editor controls */}
        <div className="card card-lg" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', margin: 0 }}><Palette size={16} style={{ color: 'var(--primary)' }} /> Design Controls</h3>
          
          <div>
            <label htmlFor="banner-text" className="field-label">Channel Name</label>
            <input 
              id="banner-text"
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              className="input-field"
              maxLength={20}
            />
          </div>

          <div className="grid-cols-2" style={{ gap: '16px' }}>
            <div>
              <label htmlFor="banner-bg" className="field-label">Background Color</label>
              <input 
                id="banner-bg"
                type="color" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)} 
                style={{ width: '100%', height: '44px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'none', padding: '4px' }}
              />
            </div>
            <div>
              <label htmlFor="banner-tc" className="field-label">Text Color</label>
              <input 
                id="banner-tc"
                type="color" 
                value={textColor} 
                onChange={(e) => setTextColor(e.target.value)} 
                style={{ width: '100%', height: '44px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'none', padding: '4px' }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="banner-tmpl" className="field-label">Style Template</label>
            <select 
              id="banner-tmpl"
              value={template} 
              onChange={(e) => setTemplate(e.target.value)}
              className="select-field"
            >
              <option value="dark">Dark Gradient</option>
              <option value="glow">Neon Glow</option>
              <option value="minimalist">Clean Minimalist</option>
            </select>
          </div>

          <button onClick={handleDownload} className="btn btn-primary">
            <Download size={16} /> Export Banner (PNG)
          </button>
        </div>

        {/* Canvas Display */}
        <div className="card card-lg">
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', margin: '0 0 16px 0' }}><ImageIcon size={16} style={{ color: 'var(--primary)' }} /> Preview</h3>
          <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <canvas 
              ref={canvasRef} 
              style={{ width: '100%', height: 'auto', maxHeight: '400px', borderRadius: '4px' }} 
            />
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center' }}>
            Banners are generated in full 2560x1440 YouTube TV resolution. The center area is desktop-safe.
          </p>
        </div>

      </div>

      <FaqSection 
        faqsData={toolFaqs.bannerMaker}
        customTitle="YouTube Banner Maker FAQs"
        customDescription="Learn how to create professional YouTube channel art that attracts subscribers."
      />
    </div>
  );
}
