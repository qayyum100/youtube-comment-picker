import React, { useState, useRef } from 'react';
import SEO from '../components/SEO';
import QRCode from 'qrcode';
import { QrCode, Download, Settings } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function QRCodeGeneratorPage() {
  const [url, setUrl] = useState('');
  const [color, setColor] = useState('#6366f1');
  const [size, setSize] = useState(300);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      await QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 2,
        color: {
          dark: color,
          light: '#ffffff',
        },
      });
      setGenerated(true);
    } catch (err) {
      console.error('QR Generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current || !generated) return;
    const link = document.createElement('a');
    link.href = canvasRef.current.toDataURL('image/png');
    link.download = 'youtube_qr_code.png';
    link.click();
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free YouTube QR Code Generator | Channel & Video QR Maker"
        description="Generate custom-styled high-resolution QR codes for YouTube channels, videos, or playlists instantly. Customize colors and download PNGs."
        url="/youtube-qr-code-generator"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube QR Code Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Generate custom styled high-resolution QR codes for channels, videos, or playlists instantly.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center' }}>
        
        {/* Editor */}
        <section className="card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Settings size={20} /> Settings</h3>
          
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>YouTube URL</label>
              <input 
                type="url" 
                placeholder="Paste Channel, Video, or Playlist Link..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="input-premium"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>QR Theme Color</label>
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  style={{ width: '100%', height: '45px', border: '1px solid var(--border-light)', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>QR Code Size</label>
                <select 
                  value={size} 
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="input-premium"
                  style={{ padding: '12px 15px' }}
                >
                  <option value={200}>Small (200×200)</option>
                  <option value={300}>Medium (300×300)</option>
                  <option value={500}>Large (500×500)</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ padding: '15px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <QrCode size={18} /> {loading ? 'Generating...' : 'Generate QR Code'}
            </button>
          </form>
        </section>

        {/* Preview */}
        <section className="card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '340px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>QR Code Preview</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: '#ffffff', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: generated ? 'block' : 'none' }}>
              <canvas ref={canvasRef} style={{ display: 'block' }} />
            </div>

            {!generated && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <QrCode size={64} style={{ color: 'var(--text-muted)', marginBottom: '15px' }} />
                <p style={{ margin: 0 }}>Input URL and generate to preview QR Code</p>
              </div>
            )}

            {generated && (
              <button onClick={handleDownload} style={{ padding: '10px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                <Download size={16} /> Download QR Code (PNG)
              </button>
            )}
          </div>
        </section>

      </div>

      <FaqSection 
        faqsData={toolFaqs.qrCodeGenerator}
        customTitle="YouTube QR Code Generator FAQs"
        customDescription="Find out how to use QR codes to grow your YouTube channel offline and online."
      />
    </div>
  );
}
