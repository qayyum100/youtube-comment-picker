import React, { useEffect, useRef } from 'react';

export default function VideoCanvas({
  aspectRatio,
  fitMode,
  captionEnabled,
  captionText,
  captionSettings,
  thumbnailUrl,
  videoTitle,
  onCanvasRef
}) {
  const canvasRef = useRef(null);

  // Dimensions based on aspect ratio
  let width = 1280;
  let height = 720;

  if (aspectRatio === '9:16') {
    width = 720;
    height = 1280;
  } else if (aspectRatio === '1:1') {
    width = 720;
    height = 720;
  }

  useEffect(() => {
    if (onCanvasRef && canvasRef.current) {
      onCanvasRef(canvasRef.current);
    }
  }, [onCanvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    let animationFrameId;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = thumbnailUrl || '';

    const render = () => {
      // Background fill
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, width, height);

      // Draw background / thumbnail according to fit mode
      if (img.complete && img.naturalWidth > 0) {
        if (fitMode === 'cover') {
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const canvasRatio = width / height;
          let drawW, drawH, drawX, drawY;

          if (imgRatio > canvasRatio) {
            drawH = height;
            drawW = height * imgRatio;
            drawX = (width - drawW) / 2;
            drawY = 0;
          } else {
            drawW = width;
            drawH = width / imgRatio;
            drawX = 0;
            drawY = (height - drawH) / 2;
          }
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
        } else if (fitMode === 'contain') {
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const canvasRatio = width / height;
          let drawW, drawH, drawX, drawY;

          if (imgRatio > canvasRatio) {
            drawW = width;
            drawH = width / imgRatio;
            drawX = 0;
            drawY = (height - drawH) / 2;
          } else {
            drawH = height;
            drawW = height * imgRatio;
            drawX = (width - drawW) / 2;
            drawY = 0;
          }
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
        } else {
          // Center crop
          const sWidth = Math.min(img.naturalWidth, img.naturalHeight * (width / height));
          const sHeight = Math.min(img.naturalHeight, img.naturalWidth * (height / width));
          const sx = (img.naturalWidth - sWidth) / 2;
          const sy = (img.naturalHeight - sHeight) / 2;
          ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
        }
      }

      // Draw Captions Overlay
      if (captionEnabled && captionText) {
        const fontSz = (captionSettings.fontSize || 20) * (height / 600);
        ctx.font = `${captionSettings.fontWeight || '700'} ${fontSz}px ${captionSettings.fontFamily || 'sans-serif'}`;
        ctx.textAlign = captionSettings.alignment || 'center';
        ctx.textBaseline = 'middle';

        const padding = fontSz * 0.4;
        const textMetrics = ctx.measureText(captionText);
        const textWidth = textMetrics.width;
        const textHeight = fontSz * 1.2;

        let posX = width / 2;
        if (captionSettings.alignment === 'left') posX = width * 0.1;
        if (captionSettings.alignment === 'right') posX = width * 0.9;

        let posY = height * 0.82;
        if (captionSettings.position === 'top') posY = height * 0.15;
        if (captionSettings.position === 'center') posY = height * 0.5;

        // Background pill behind caption
        if (captionSettings.bgColor && captionSettings.bgColor !== 'transparent') {
          ctx.fillStyle = captionSettings.bgColor;
          const bgX = posX - (textWidth / 2) - padding;
          const bgY = posY - (textHeight / 2) - (padding / 2);
          const bgW = textWidth + (padding * 2);
          const bgH = textHeight + padding;
          const radius = 8;

          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(bgX, bgY, bgW, bgH, radius) : ctx.fillRect(bgX, bgY, bgW, bgH);
          ctx.fill();
        }

        // Draw Caption Text
        ctx.fillStyle = captionSettings.textColor || '#FFFFFF';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 6;
        ctx.fillText(captionText, posX, posY);
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height, aspectRatio, fitMode, captionEnabled, captionText, captionSettings, thumbnailUrl]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'none' // Canvas renders off-screen for recording engine
      }}
    />
  );
}
