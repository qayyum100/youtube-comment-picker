import React from 'react';
import { Monitor, Smartphone, Square, Layout } from 'lucide-react';

export default function AspectRatioSelector({ aspectRatio, onChangeAspectRatio, fitMode, onChangeFitMode, outputFormat, onChangeOutputFormat }) {
  const ratios = [
    { id: '16:9', label: '16:9', desc: 'YouTube', icon: Monitor },
    { id: '9:16', label: '9:16', desc: 'Shorts / Reels', icon: Smartphone },
    { id: '1:1', label: '1:1', desc: 'Square', icon: Square }
  ];

  const fitModes = [
    { id: 'cover', label: 'Cover' },
    { id: 'contain', label: 'Contain' },
    { id: 'crop', label: 'Center Crop' }
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: '10px'
      }}>
        <Layout size={16} color="var(--primary)" /> Aspect Ratio & Framing
      </label>

      {/* Ratios Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
        {ratios.map(r => {
          const Icon = r.icon;
          const isActive = aspectRatio === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onChangeAspectRatio(r.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 8px',
                borderRadius: 'var(--radius-sm)',
                border: isActive ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: isActive ? 'var(--primary-light)' : 'var(--bg-secondary)',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={20} style={{ marginBottom: '4px' }} />
              <span style={{ fontSize: '13px', fontWeight: '700' }}>{r.label}</span>
              <span style={{ fontSize: '11px', color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}>{r.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Frame Fit Modes */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Fit Mode:</span>
        {fitModes.map(fm => (
          <button
            key={fm.id}
            type="button"
            onClick={() => onChangeFitMode(fm.id)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '600',
              borderRadius: 'var(--radius-xs)',
              border: fitMode === fm.id ? '1px solid var(--primary)' : '1px solid var(--border)',
              background: fitMode === fm.id ? 'var(--primary)' : 'var(--surface)',
              color: fitMode === fm.id ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {fm.label}
          </button>
        ))}
      </div>

      {/* Output Format Selector */}
      {onChangeOutputFormat && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Format:</span>
          {['mp4', 'webm'].map(fmt => (
            <button
              key={fmt}
              type="button"
              onClick={() => onChangeOutputFormat(fmt)}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '700',
                borderRadius: 'var(--radius-xs)',
                border: (outputFormat || 'mp4') === fmt ? '1px solid var(--primary)' : '1px solid var(--border)',
                background: (outputFormat || 'mp4') === fmt ? 'var(--primary-light)' : 'var(--surface)',
                color: (outputFormat || 'mp4') === fmt ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {fmt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
