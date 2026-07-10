import React, { useRef, useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Upload, Download, Crop, Users } from 'lucide-react';

export default function ProfilePictureMakerPage() {
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [zoom, setZoom] = useState(1);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [imgObj, setImgObj] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      const img = new Image();
      img.onload = () => {
        setImgObj(img);
        setZoom(1);
        setXOffset(0);
        setYOffset(0);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const drawAvatar = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imgObj) return;

    const ctx = canvas.getContext('2d');
    const size = 800;

    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Calculate crop drawing parameters
    const cx = size / 2;
    const cy = size / 2;
    
    const dWidth = imgObj.width * zoom * (size / Math.max(imgObj.width, imgObj.height));
    const dHeight = imgObj.height * zoom * (size / Math.max(imgObj.width, imgObj.height));
    
    const dx = cx - dWidth / 2 + xOffset;
    const dy = cy - dHeight / 2 + yOffset;

    // Save context
    ctx.save();
    
    // Draw background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, size, size);

    // Draw image
    ctx.drawImage(imgObj, dx, dy, dWidth, dHeight);

    // Subtle guide circle (transparent overlay except center circle)
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.8)';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2 - 20, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  };

  useEffect(() => {
    if (imgObj) drawAvatar();
  }, [imgObj, zoom, xOffset, yOffset]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'youtube_profile_avatar.png';
    link.click();
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free YouTube Profile Picture Maker | Avatar Resizer & Cropper"
        description="Design and crop custom circular YouTube avatars instantly. Upload your picture, adjust zoom/alignments, preview circular margins, and download PNG avatars."
        url="/youtube-profile-picture-maker"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Profile Picture Maker
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Crop, zoom, and export clean circular profile avatars for YouTube and social media.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Upload & Controls */}
        <section className="card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
          <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Upload size={20} /> Editor</h3>
          
          <div style={{ width: '100%', height: '120px', border: '2px dashed var(--border-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', background: 'var(--bg-dark)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Click to upload profile photo</span>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
          </div>

          {imgObj && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Zoom Size</label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3.0" 
                  step="0.05"
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Horizontal Offset</label>
                  <input type="range" min="-300" max="300" value={xOffset} onChange={(e) => setXOffset(parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Vertical Offset</label>
                  <input type="range" min="-300" max="300" value={yOffset} onChange={(e) => setYOffset(parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
                </div>
              </div>
              
              <button onClick={handleDownload} style={{ padding: '15px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                <Download size={18} /> Export Profile Avatar (PNG)
              </button>
            </div>
          )}
        </section>

        {/* Circular Preview */}
        <section className="card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Crop size={20} /> Circular margins preview</h3>
          {imageSrc ? (
            <div style={{ position: 'relative', width: '260px', height: '260px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--glow-primary)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            </div>
          ) : (
            <div style={{ width: '260px', height: '260px', borderRadius: '50%', background: 'var(--bg-dark)', border: '4px dashed var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Users size={48} style={{ color: 'var(--text-muted)' }} />
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
