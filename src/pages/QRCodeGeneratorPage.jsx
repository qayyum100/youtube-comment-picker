import React, { useState, useRef } from 'react';
import SEO from '../components/SEO';
import QRCode from 'qrcode';
import { QrCode, Download, Settings } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function QRCodeGeneratorPage() {
  const [url, setUrl] = useState('');
  const [color, setColor] = useState('#4F6EF7');
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
    <div className="page-wrapper">
      <SEO 
        title="Free YouTube QR Code Generator | Channel & Video QR Maker"
        description="Generate custom-styled high-resolution QR codes for YouTube channels, videos, or playlists instantly. Customize colors and download PNGs."
        url="/youtube-qr-code-generator"
      />

      <div className="page-hero">
        <h1>YouTube QR Code Generator</h1>
        <p>Generate custom styled high-resolution QR codes for channels, videos, or playlists instantly.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Editor */}
        <div className="card card-lg">
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Settings size={16} style={{ color: 'var(--primary)' }} /> QR Settings
          </h3>
          
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label htmlFor="qr-url" className="field-label">YouTube URL</label>
              <input 
                id="qr-url"
                type="url" 
                className="input-field"
                placeholder="Paste Channel, Video, or Playlist Link..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div className="grid-cols-2" style={{ gap: '16px' }}>
              <div>
                <label htmlFor="qr-color" className="field-label">QR Theme Color</label>
                <input 
                  id="qr-color"
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  style={{ width: '100%', height: '44px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'none', padding: '4px' }}
                />
              </div>
              <div>
                <label htmlFor="qr-size" className="field-label">QR Code Size</label>
                <select 
                  id="qr-size"
                  value={size} 
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="select-field"
                >
                  <option value={200}>Small (200×200)</option>
                  <option value={300}>Medium (300×300)</option>
                  <option value={500}>Large (500×500)</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? (
                <span className="btn-spinner" role="status" aria-label="Loading" />
              ) : (
                <>
                  <QrCode size={16} /> Generate QR Code
                </>
              )}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="card card-lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '340px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)', alignSelf: 'flex-start' }}>QR Code Preview</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'center' }}>
            <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: generated ? 'block' : 'none' }}>
              <canvas ref={canvasRef} style={{ display: 'block' }} />
            </div>

            {!generated && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <QrCode size={56} style={{ marginBottom: '12px', opacity: 0.3 }} />
                <p style={{ margin: 0, fontSize: '14px' }}>Input URL and click generate to preview</p>
              </div>
            )}

            {generated && (
              <button onClick={handleDownload} className="btn btn-secondary">
                <Download size={15} /> Download QR Code (PNG)
              </button>
            )}
          </div>
        </div>

      </div>

      <FaqSection 
        faqsData={toolFaqs.qrCodeGenerator}
        customTitle="YouTube QR Code Generator FAQs"
        customDescription="Find out how to use QR codes to grow your YouTube channel offline and online."
      />
    </div>
  );
}
