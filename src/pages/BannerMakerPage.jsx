import React, { useRef, useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Palette, Download, Image as ImageIcon, Type } from 'lucide-react';

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
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free YouTube Banner Maker Online | 2560x1440 Banner Designer"
        description="Design and download custom YouTube channel banners (2560x1440) instantly. Choose templates, modify channel text, background colors, and export high-resolution PNGs."
        url="/youtube-banner-maker"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Free YouTube Banner Maker
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Design professional 2560x1440 YouTube channel banners instantly.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Editor controls */}
        <section className="card liquid-glass" style={{ padding: '25px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Palette size={20} /> Design controls</h3>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Channel Name</label>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              className="input-premium"
              maxLength={20}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Bg Color</label>
              <input 
                type="color" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)} 
                style={{ width: '100%', height: '45px', border: '1px solid var(--border-light)', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Text Color</label>
              <input 
                type="color" 
                value={textColor} 
                onChange={(e) => setTextColor(e.target.value)} 
                style={{ width: '100%', height: '45px', border: '1px solid var(--border-light)', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Style Template</label>
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value)}
              className="input-premium"
              style={{ padding: '12px 15px' }}
            >
              <option value="dark">Dark Gradient</option>
              <option value="glow">Neon Glow</option>
              <option value="minimalist">Clean Minimalist</option>
            </select>
          </div>

          <button onClick={handleDownload} style={{ padding: '15px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <Download size={18} /> Export Banner (PNG)
          </button>
        </section>

        {/* Canvas Display */}
        <section className="card liquid-glass" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><ImageIcon size={20} /> Preview</h3>
          <div style={{ display: 'flex', justifyContent: 'center', background: '#f3f4f6', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            <canvas 
              ref={canvasRef} 
              style={{ width: '100%', height: 'auto', maxHeight: '400px', borderRadius: '4px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
            />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center' }}>
            Banners are generated in full 2560x1440 YouTube TV resolution. The center area is desktop-safe.
          </p>
        </section>

      </div>
    </div>
  );
}
