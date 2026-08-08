import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Scissors } from 'lucide-react';
import { formatTime } from './YouTubeVideoInfo';

export default function ClipTimeline({
  totalDurationSec,
  startTimeSec,
  endTimeSec,
  currentTimeSec,
  onChangeStart,
  onChangeEnd,
  onSeek
}) {
  const timelineRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1); // 1x, 2x, 5x, 10x
  const [dragging, setDragging] = useState(null); // 'start' | 'end' | 'playhead'

  const duration = Math.max(totalDurationSec || 300, 1);

  const getPercent = (sec) => {
    return Math.min(100, Math.max(0, (sec / duration) * 100));
  };

  const getSecFromPercent = (pct) => {
    return (pct / 100) * duration;
  };

  const handlePointerDown = (type) => (e) => {
    e.stopPropagation();
    setDragging(type);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!dragging || !timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = (offsetX / rect.width) * 100;
      const sec = Math.round(getSecFromPercent(pct));

      if (dragging === 'start') {
        if (sec >= 0 && sec < endTimeSec - 1) {
          onChangeStart(sec);
        }
      } else if (dragging === 'end') {
        if (sec > startTimeSec + 1 && sec <= duration) {
          onChangeEnd(sec);
        }
      } else if (dragging === 'playhead') {
        if (sec >= 0 && sec <= duration && onSeek) {
          onSeek(sec);
        }
      }
    };

    const handlePointerUp = () => {
      if (dragging) setDragging(null);
    };

    if (dragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [dragging, startTimeSec, endTimeSec, duration]);

  const startPct = getPercent(startTimeSec);
  const endPct = getPercent(endTimeSec);
  const currentPct = getPercent(currentTimeSec);

  // Time markers ticks
  const tickCount = 6 * zoomLevel;
  const ticks = Array.from({ length: tickCount + 1 }).map((_, i) => {
    const sec = (duration / tickCount) * i;
    return {
      sec,
      label: formatTime(sec),
      pct: (i / tickCount) * 100
    };
  });

  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 20px',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: '24px'
    }}>
      {/* Top Timeline Bar Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
          <Scissors size={16} color="var(--primary)" />
          <span>Clip Trimmer Timeline</span>
        </div>

        {/* Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>Zoom:</span>
          {[1, 2, 5, 10].map(level => (
            <button
              key={level}
              type="button"
              onClick={() => setZoomLevel(level)}
              style={{
                padding: '3px 8px',
                fontSize: '11px',
                fontWeight: '700',
                borderRadius: '4px',
                border: '1px solid var(--border)',
                background: zoomLevel === level ? 'var(--primary)' : 'var(--bg-secondary)',
                color: zoomLevel === level ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {level}x
            </button>
          ))}
        </div>
      </div>

      {/* Visual Timeline Track */}
      <div style={{ overflowX: zoomLevel > 1 ? 'auto' : 'visible', paddingBottom: '8px' }}>
        <div
          ref={timelineRef}
          onClick={(e) => {
            if (!timelineRef.current) return;
            const rect = timelineRef.current.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            const sec = Math.round(getSecFromPercent(pct));
            if (onSeek) onSeek(sec);
          }}
          style={{
            position: 'relative',
            height: '48px',
            width: `${100 * zoomLevel}%`,
            minWidth: '100%',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            userSelect: 'none',
            border: '1px solid var(--border-strong)'
          }}
        >
          {/* Selected Region */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${startPct}%`,
            width: `${Math.max(0, endPct - startPct)}%`,
            backgroundColor: 'var(--primary-light)',
            borderLeft: '2px solid var(--primary)',
            borderRight: '2px solid var(--primary)',
            boxSizing: 'border-box'
          }} />

          {/* Start Handle */}
          <div
            onMouseDown={handlePointerDown('start')}
            onTouchStart={handlePointerDown('start')}
            style={{
              position: 'absolute',
              top: '-4px',
              bottom: '-4px',
              left: `${startPct}%`,
              width: '16px',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--primary)',
              borderRadius: '4px',
              cursor: 'ew-resize',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ width: '2px', height: '16px', backgroundColor: '#fff', borderRadius: '1px' }} />
          </div>

          {/* End Handle */}
          <div
            onMouseDown={handlePointerDown('end')}
            onTouchStart={handlePointerDown('end')}
            style={{
              position: 'absolute',
              top: '-4px',
              bottom: '-4px',
              left: `${endPct}%`,
              width: '16px',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--primary)',
              borderRadius: '4px',
              cursor: 'ew-resize',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ width: '2px', height: '16px', backgroundColor: '#fff', borderRadius: '1px' }} />
          </div>

          {/* Playhead Scrubber Indicator */}
          <div
            onMouseDown={handlePointerDown('playhead')}
            onTouchStart={handlePointerDown('playhead')}
            style={{
              position: 'absolute',
              top: '-8px',
              bottom: '-8px',
              left: `${currentPct}%`,
              width: '4px',
              transform: 'translateX(-50%)',
              backgroundColor: '#EF4444',
              zIndex: 12,
              cursor: 'pointer'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '12px',
              height: '12px',
              backgroundColor: '#EF4444',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(239, 68, 68, 0.6)'
            }} />
          </div>
        </div>

        {/* Timestamp Ticks */}
        <div style={{
          position: 'relative',
          height: '24px',
          width: `${100 * zoomLevel}%`,
          marginTop: '6px'
        }}>
          {ticks.map((t, idx) => (
            <span
              key={idx}
              style={{
                position: 'absolute',
                left: `${t.pct}%`,
                transform: 'translateX(-50%)',
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--text-muted)'
              }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
