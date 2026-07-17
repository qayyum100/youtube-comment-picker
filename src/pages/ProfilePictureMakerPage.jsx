import React, { useRef, useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Upload, Download, Crop, Users } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

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
    <div className="page-wrapper">
      <SEO 
        title="Free YouTube Profile Picture Maker | Avatar Resizer & Cropper"
        description="Design and crop custom circular YouTube avatars instantly. Upload your picture, adjust zoom/alignments, preview circular margins, and download PNG avatars."
        url="/youtube-profile-picture-maker"
      />

      <div className="page-hero">
        <h1>YouTube Profile Picture Maker</h1>
        <p>Crop, zoom, and export clean circular profile avatars for YouTube and social media.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Upload & Controls */}
        <div className="card card-lg" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', margin: 0 }}><Upload size={16} style={{ color: 'var(--primary)' }} /> Upload & Editor</h3>
          
          <div style={{ width: '100%', height: '120px', border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', background: 'var(--bg-secondary)' }}
          >
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Click to upload profile photo</span>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
          </div>

          {imgObj && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="field-label" style={{ marginBottom: '8px' }}>Zoom Size</label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3.0" 
                  step="0.05"
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
                />
              </div>
              <div className="grid-cols-2" style={{ gap: '16px' }}>
                <div>
                  <label className="field-label">Horizontal Offset</label>
                  <input type="range" min="-300" max="300" value={xOffset} onChange={(e) => setXOffset(parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }} />
                </div>
                <div>
                  <label className="field-label">Vertical Offset</label>
                  <input type="range" min="-300" max="300" value={yOffset} onChange={(e) => setYOffset(parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }} />
                </div>
              </div>
              
              <button onClick={handleDownload} className="btn btn-primary">
                <Download size={16} /> Export Profile Avatar (PNG)
              </button>
            </div>
          )}
        </div>

        {/* Circular Preview */}
        <div className="card card-lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', alignSelf: 'flex-start', margin: '0 0 20px 0' }}><Crop size={16} style={{ color: 'var(--primary)' }} /> Circular Preview</h3>
          {imageSrc ? (
            <div style={{ position: 'relative', width: '240px', height: '240px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary)' }}>
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            </div>
          ) : (
            <div style={{ width: '240px', height: '240px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '3px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Users size={44} style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
            </div>
          )}
        </div>

      </div>

      <FaqSection 
        faqsData={toolFaqs.profilePictureMaker}
        customTitle="YouTube Profile Picture Maker FAQs"
        customDescription="Learn how to design the perfect YouTube channel logo and profile image."
      />
    </div>
  );
}
