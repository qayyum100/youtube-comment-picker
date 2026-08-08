import React from 'react';
import { Download, Edit3, RefreshCw, CheckCircle, Video } from 'lucide-react';
import { formatTime } from './YouTubeVideoInfo';

export default function ClipResult({
  clipUrl,
  clipBlob,
  durationSec,
  aspectRatio,
  format,
  onEditClip,
  onReset
}) {
  const handleDownload = () => {
    if (!clipUrl) return;
    const a = document.createElement('a');
    a.href = clipUrl;
    const ext = format.includes('mp4') ? 'mp4' : 'webm';
    a.download = `youtube-clip.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="card card-lg" style={{ maxWidth: '640px', margin: '30px auto', textAlign: 'center' }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        background: 'var(--success-light)',
        color: 'var(--success)',
        borderRadius: 'var(--radius-full)',
        fontSize: '14px',
        fontWeight: '700',
        marginBottom: '16px'
      }}>
        <CheckCircle size={18} /> Your clip is ready 🎉
      </div>

      <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
        Clip Generated Successfully
      </h2>

      <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
        Preview your formatted clip below or download it immediately to share on YouTube Shorts, TikTok, or Reels.
      </p>

      {/* Created Video Clip Preview Player */}
      <div style={{
        position: 'relative',
        width: aspectRatio === '9:16' ? '280px' : aspectRatio === '1:1' ? '400px' : '100%',
        margin: '0 auto 24px auto',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xl)',
        border: '2px solid var(--border-strong)',
        backgroundColor: '#000'
      }}>
        <video
          src={clipUrl}
          controls
          autoPlay
          loop
          onLoadedMetadata={(e) => {
            if (e.target && (e.target.duration === Infinity || !isFinite(e.target.duration) || e.target.duration === 0)) {
              e.target.currentTime = 1e101;
              e.target.ontimeupdate = () => {
                e.target.ontimeupdate = null;
                e.target.currentTime = 0;
              };
            }
          }}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Metadata Badges */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '28px',
        flexWrap: 'wrap'
      }}>
        <span style={{
          padding: '6px 14px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          fontWeight: '600',
          color: 'var(--text-primary)'
        }}>
          <strong>Duration:</strong> {formatTime(durationSec)}
        </span>
        <span style={{
          padding: '6px 14px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          fontWeight: '600',
          color: 'var(--text-primary)'
        }}>
          <strong>Aspect Ratio:</strong> {aspectRatio}
        </span>
        <span style={{
          padding: '6px 14px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          fontWeight: '600',
          color: 'var(--text-primary)'
        }}>
          <strong>Format:</strong> {format.toUpperCase()}
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDownload}
          style={{ padding: '12px 28px', fontSize: '15px', fontWeight: '700', gap: '8px' }}
        >
          <Download size={18} /> Download Clip
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onEditClip}
          style={{ padding: '12px 20px', fontSize: '14px', fontWeight: '600', gap: '8px' }}
        >
          <Edit3 size={16} /> Edit Clip
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onReset}
          style={{ padding: '12px 20px', fontSize: '14px', fontWeight: '600', gap: '8px' }}
        >
          <RefreshCw size={16} /> Create Another Clip
        </button>
      </div>
    </div>
  );
}
