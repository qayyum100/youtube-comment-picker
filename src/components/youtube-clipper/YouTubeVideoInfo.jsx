import React from 'react';
import { User, Clock, Sparkles } from 'lucide-react';

export function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const mStr = mins.toString().padStart(2, '0');
  const sStr = secs.toString().padStart(2, '0');
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mStr}:${sStr}`;
  }
  return `${mStr}:${sStr}`;
}

export default function YouTubeVideoInfo({ metadata, onOpenAiFinder }) {
  if (!metadata) return null;

  const { title, channelTitle, thumbnailUrl, durationSec } = metadata;

  return (
    <div className="card" style={{ marginBottom: '24px', padding: '18px' }}>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{
          position: 'relative',
          width: '160px',
          height: '90px',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          backgroundColor: '#000',
          flexShrink: 0
        }}>
          <img
            src={thumbnailUrl}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <span style={{
            position: 'absolute',
            bottom: '6px',
            right: '6px',
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: '#fff',
            fontSize: '11px',
            fontWeight: '600',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            {formatTime(durationSec)}
          </span>
        </div>

        <div style={{ flex: 1, minWidth: '220px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
            {title}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={15} color="var(--primary)" />
              <strong>{channelTitle}</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} color="var(--text-muted)" />
              {formatTime(durationSec)} total duration
            </span>
          </div>
        </div>

        {onOpenAiFinder && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onOpenAiFinder}
            style={{
              padding: '10px 16px',
              gap: '8px',
              fontSize: '14px',
              background: 'linear-gradient(135deg, rgba(79, 110, 247, 0.12), rgba(168, 85, 247, 0.12))',
              color: 'var(--primary)',
              border: '1px solid var(--primary-ring)',
              flexShrink: 0
            }}
          >
            <Sparkles size={16} color="#8B5CF6" />
            <span>✨ Find Best Moments</span>
          </button>
        )}
      </div>
    </div>
  );
}
