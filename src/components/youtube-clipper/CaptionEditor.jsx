import React from 'react';
import { Type, Sparkles, Sliders } from 'lucide-react';

export const CAPTION_PRESETS = {
  minimal: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 20,
    textColor: '#FFFFFF',
    bgColor: 'rgba(0, 0, 0, 0.4)',
    position: 'bottom',
    alignment: 'center',
    fontWeight: '600'
  },
  bold: {
    fontFamily: 'Impact, sans-serif',
    fontSize: 26,
    textColor: '#FACC15',
    bgColor: '#000000',
    position: 'bottom',
    alignment: 'center',
    fontWeight: '800'
  },
  social: {
    fontFamily: 'Outfit, sans-serif',
    fontSize: 22,
    textColor: '#FFFFFF',
    bgColor: 'rgba(79, 110, 247, 0.9)',
    position: 'center',
    alignment: 'center',
    fontWeight: '700'
  },
  karaoke: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 24,
    textColor: '#22C55E',
    bgColor: 'rgba(15, 23, 42, 0.85)',
    position: 'bottom',
    alignment: 'center',
    fontWeight: '800'
  }
};

export default function CaptionEditor({
  enabled,
  onToggleEnabled,
  captionText,
  onChangeCaptionText,
  captionSettings,
  onChangeCaptionSettings
}) {
  const applyPreset = (presetKey) => {
    if (CAPTION_PRESETS[presetKey]) {
      onChangeCaptionSettings({
        ...captionSettings,
        ...CAPTION_PRESETS[presetKey]
      });
    }
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Enable Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        padding: '12px 16px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Type size={18} color="var(--primary)" />
          <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Enable Captions
          </span>
        </div>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onToggleEnabled(e.target.checked)}
          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }}
        />
      </div>

      {enabled && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Subtitle Text Input */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Caption Text Overlay
            </label>
            <textarea
              className="input-field"
              rows={2}
              value={captionText}
              onChange={(e) => onChangeCaptionText(e.target.value)}
              placeholder="Enter caption text to display over video..."
              style={{ fontSize: '14px', resize: 'vertical' }}
            />
          </div>

          {/* Preset Style Buttons */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              <Sparkles size={13} color="#8B5CF6" /> Preset Styles
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {[
                { key: 'minimal', label: 'Minimal' },
                { key: 'bold', label: 'Bold' },
                { key: 'social', label: 'Social' },
                { key: 'karaoke', label: 'Karaoke' }
              ].map(p => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => applyPreset(p.key)}
                  style={{
                    padding: '6px 4px',
                    fontSize: '11px',
                    fontWeight: '700',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {/* Text Color */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Text Color
              </label>
              <input
                type="color"
                value={captionSettings.textColor || '#FFFFFF'}
                onChange={(e) => onChangeCaptionSettings({ ...captionSettings, textColor: e.target.value })}
                style={{ width: '100%', height: '32px', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', padding: '2px' }}
              />
            </div>

            {/* Background Color */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Background
              </label>
              <select
                value={captionSettings.bgColor}
                onChange={(e) => onChangeCaptionSettings({ ...captionSettings, bgColor: e.target.value })}
                className="input-field"
                style={{ padding: '4px 8px', fontSize: '12px', height: '32px' }}
              >
                <option value="transparent">Transparent</option>
                <option value="rgba(0, 0, 0, 0.4)">Semi Dark</option>
                <option value="#000000">Solid Black</option>
                <option value="rgba(79, 110, 247, 0.9)">Brand Blue</option>
              </select>
            </div>

            {/* Position */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Position
              </label>
              <select
                value={captionSettings.position}
                onChange={(e) => onChangeCaptionSettings({ ...captionSettings, position: e.target.value })}
                className="input-field"
                style={{ padding: '4px 8px', fontSize: '12px', height: '32px' }}
              >
                <option value="top">Top</option>
                <option value="center">Center</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Font Size ({captionSettings.fontSize || 20}px)
              </label>
              <input
                type="range"
                min={14}
                max={36}
                value={captionSettings.fontSize || 20}
                onChange={(e) => onChangeCaptionSettings({ ...captionSettings, fontSize: parseInt(e.target.value, 10) })}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
