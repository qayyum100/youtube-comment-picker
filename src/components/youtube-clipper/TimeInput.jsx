import React from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import { formatTime } from './YouTubeVideoInfo';

export function parseSeconds(timeStr) {
  if (typeof timeStr === 'number') return timeStr;
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':').map(p => parseInt(p, 10) || 0);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    return parts[0];
  }
  return 0;
}

export default function TimeInput({
  startTimeSec,
  endTimeSec,
  totalDurationSec,
  onChangeStart,
  onChangeEnd,
  onPreviewClip,
  isPreviewing
}) {
  const clipDurationSec = Math.max(0, endTimeSec - startTimeSec);

  const handleStartTextChange = (e) => {
    const val = e.target.value;
    const secs = parseSeconds(val);
    if (!isNaN(secs) && secs >= 0 && secs <= totalDurationSec && secs < endTimeSec) {
      onChangeStart(secs);
    }
  };

  const handleEndTextChange = (e) => {
    const val = e.target.value;
    const secs = parseSeconds(val);
    if (!isNaN(secs) && secs > startTimeSec && secs <= totalDurationSec) {
      onChangeEnd(secs);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
      padding: '16px 20px',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border)',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Start Time */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Start Time
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="input-field"
              value={formatTime(startTimeSec)}
              onChange={handleStartTextChange}
              style={{
                width: '100px',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: '16px',
                padding: '6px 10px',
                color: 'var(--primary)',
                borderColor: 'var(--primary-ring)'
              }}
            />
          </div>
        </div>

        <div style={{ color: 'var(--text-muted)', fontSize: '20px', fontWeight: '300', alignSelf: 'center', paddingTop: '16px' }}>
          →
        </div>

        {/* End Time */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            End Time
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="input-field"
              value={formatTime(endTimeSec)}
              onChange={handleEndTextChange}
              style={{
                width: '100px',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: '16px',
                padding: '6px 10px',
                color: 'var(--primary)',
                borderColor: 'var(--primary-ring)'
              }}
            />
          </div>
        </div>

        {/* Duration Readout */}
        <div style={{
          padding: '6px 14px',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          alignSelf: 'flex-end'
        }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
            Duration
          </span>
          <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} color="var(--primary)" />
            {formatTime(clipDurationSec)}
          </span>
        </div>
      </div>

      {/* Preview Button */}
      <button
        type="button"
        className={`btn ${isPreviewing ? 'btn-secondary' : 'btn-primary'}`}
        onClick={onPreviewClip}
        style={{
          padding: '10px 20px',
          gap: '8px',
          fontWeight: '600',
          minWidth: '150px'
        }}
      >
        {isPreviewing ? (
          <>
            <Pause size={16} /> Previewing Clip...
          </>
        ) : (
          <>
            <Play size={16} /> Preview Clip
          </>
        )}
      </button>
    </div>
  );
}
