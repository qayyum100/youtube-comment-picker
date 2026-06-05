import React, { useRef, useEffect, useState } from 'react';
import { X, Download, ShieldCheck, User } from 'lucide-react';

export default function CertificateModal({ winner, onClose }) {
  const canvasRef = useRef(null);
  const [hostHandle, setHostHandle] = useState('@mychannel');

  // Wrap text helper to draw text across multiple lines on canvas
  const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    const lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Limit to 3 lines to fit beautifully without overlapping
    const maxLines = 3;
    for (let i = 0; i < Math.min(lines.length, maxLines); i++) {
      let displayLine = lines[i].trim();
      if (i === maxLines - 1 && lines.length > maxLines) {
        displayLine += '...';
      }
      context.fillText(displayLine, x, currentY);
      currentY += lineHeight;
    }
  };

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1080;

    canvas.width = width;
    canvas.height = height;

    // 1. Draw premium background gradient (Instagram-style pink/orange or YouTube-style red/black)
    const backgroundGrad = ctx.createLinearGradient(0, 0, width, height);
    if (winner.platform === 'youtube') {
      backgroundGrad.addColorStop(0, '#121214');
      backgroundGrad.addColorStop(0.5, '#ef4444');
      backgroundGrad.addColorStop(1, '#580c0c');
    } else {
      backgroundGrad.addColorStop(0, '#833ab4');
      backgroundGrad.addColorStop(0.4, '#e1306c');
      backgroundGrad.addColorStop(0.7, '#fd1d1d');
      backgroundGrad.addColorStop(1, '#fcb045');
    }
    ctx.fillStyle = backgroundGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative ring overlay
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 450, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 380, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Draw frosted glass content container
    const padding = 70;
    const cardX = padding;
    const cardY = padding;
    const cardW = width - padding * 2;
    const cardH = height - padding * 2;
    const cardR = 36;

    // Container shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 50;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 24;

    // Dark-tinted frosted fill
    ctx.fillStyle = 'rgba(12, 12, 16, 0.85)';
    ctx.beginPath();
    ctx.moveTo(cardX + cardR, cardY);
    ctx.lineTo(cardX + cardW - cardR, cardY);
    ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + cardR);
    ctx.lineTo(cardX + cardW, cardY + cardH - cardR);
    ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - cardR, cardY + cardH);
    ctx.lineTo(cardX + cardR, cardY + cardH);
    ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - cardR);
    ctx.lineTo(cardX, cardY + cardR);
    ctx.quadraticCurveTo(cardX, cardY, cardX + cardR, cardY);
    ctx.closePath();
    ctx.fill();

    // Reset shadow for text drawing
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Thin elegant border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 3. Drawing Headers
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Platform tag
    ctx.font = 'bold 32px Outfit';
    ctx.fillStyle = winner.platform === 'youtube' ? '#ef4444' : '#f472b6';
    ctx.fillText(winner.platform === 'youtube' ? 'YOUTUBE VERIFICATION' : 'INSTAGRAM VERIFICATION', width / 2, cardY + 70);

    // Title
    ctx.font = 'bold 64px Outfit';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('WINNER CERTIFICATE', width / 2, cardY + 120);

    // Glowing separator
    const lineGrad = ctx.createLinearGradient(cardX + 150, 0, cardX + cardW - 150, 0);
    lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    lineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
    lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cardX + 150, cardY + 220);
    ctx.lineTo(cardX + cardW - 150, cardY + 220);
    ctx.stroke();

    // 4. Winner Username & Icon
    ctx.font = 'bold 76px Outfit';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(winner.author, width / 2, cardY + 270);

    ctx.font = '100px sans-serif';
    ctx.fillText('🏆', width / 2, cardY + 380);

    // 5. Prize Category
    ctx.font = '600 28px Outfit';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillText('AWARDED PRIZE', width / 2, cardY + 510);

    ctx.font = 'bold 54px Outfit';
    const textGrad = ctx.createLinearGradient(cardX + 200, 0, cardX + cardW - 200, 0);
    textGrad.addColorStop(0, '#ec4899');
    textGrad.addColorStop(1, '#f97316');
    ctx.fillStyle = textGrad;
    ctx.fillText(winner.prizeTag ? winner.prizeTag.toUpperCase() : 'WINNER', width / 2, cardY + 550);

    // 6. Winner Comment Text
    ctx.font = 'italic 32px Inter';
    ctx.fillStyle = '#e4e4e7';
    wrapText(ctx, `"${winner.text}"`, width / 2, cardY + 655, cardW - 180, 48);

    // 7. Footer details: serial, Host, Date
    ctx.font = 'bold 28px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillText(`VERIFICATION CODE: ${winner.serialCode}`, width / 2, cardY + cardH - 145);

    ctx.font = '600 28px Outfit';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`HOSTED BY: ${hostHandle}`, width / 2, cardY + cardH - 95);

    ctx.font = '24px Inter';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    const dateStr = winner.timestamp ? new Date(winner.timestamp).toLocaleString() : new Date().toLocaleString();
    ctx.fillText(`DRAWN ON: ${dateStr}`, width / 2, cardY + cardH - 50);
  };

  useEffect(() => {
    // Redraw whenever winner, host handle changes
    drawCertificate();
  }, [winner, hostHandle]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `certificate_${winner.author.replace('@', '')}_${winner.serialCode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      backdropFilter: 'blur(8px)',
      overflowY: 'auto'
    }}>
      <div 
        className="glass-panel" 
        style={{
          width: '100%',
          maxWidth: '520px',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'color 0.2s'
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={22} className="text-gradient" />
          <h3 style={{ fontSize: '1.25rem' }}>Winner Certificate Generator</h3>
        </div>

        {/* Canvas Render Display */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#08080a',
          borderRadius: 'var(--radius-md)',
          padding: '10px',
          border: '1px solid var(--border-dark)',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.6)'
        }}>
          <canvas 
            ref={canvasRef} 
            style={{
              width: '100%',
              maxWidth: '380px',
              height: 'auto',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          />
        </div>

        {/* Host Input & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
              <User size={12} />
              Host Username / Brand Handle
            </label>
            <input
              type="text"
              className="input-premium"
              value={hostHandle}
              onChange={(e) => setHostHandle(e.target.value)}
              placeholder="e.g. @yourbrandname"
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Redraws the certificate in real-time with your handle.
            </p>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={handleDownload}
            style={{ width: '100%', marginTop: '8px' }}
          >
            <Download size={18} />
            Download PNG Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
