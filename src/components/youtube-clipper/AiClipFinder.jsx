import React, { useState, useEffect } from 'react';
import { Sparkles, X, Clock, Check, ArrowRight } from 'lucide-react';
import { formatTime } from './YouTubeVideoInfo';

export default function AiClipFinder({
  metadata,
  onSelectMoment,
  onClose
}) {
  const [loading, setLoading] = useState(true);
  const [moments, setMoments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMoments() {
      if (!metadata) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/youtube/suggest-clips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            videoTitle: metadata.title,
            durationSec: metadata.durationSec
          })
        });
        const data = await response.json();
        if (data && data.moments) {
          setMoments(data.moments);
        }
      } catch (err) {
        console.error('AI Clip finder error:', err);
        setError('Failed to load AI suggested moments.');
      } finally {
        setLoading(false);
      }
    }

    fetchMoments();
  }, [metadata]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="card card-lg" style={{
        width: '100%',
        maxWidth: '640px',
        maxHeight: '85vh',
        overflowY: 'auto',
        position: 'relative',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={22} color="#8B5CF6" />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              ✨ AI Best Moments Finder
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 16px auto' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
              Analyzing video transcript & detecting high-engagement clip moments...
            </p>
          </div>
        ) : error ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--error)' }}>
            {error}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              AI evaluated key engagement hooks from <strong>"{metadata.title}"</strong>:
            </p>

            {moments.map((m, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                    {m.title}
                  </h4>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    fontSize: '12px',
                    fontWeight: '700',
                    whiteSpace: 'nowrap'
                  }}>
                    {m.startTime} → {m.endTime} ({m.duration || `${m.endSec - m.startSec}s`})
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic' }}>
                  <strong>AI Reasoning:</strong> "{m.reasoning}"
                </p>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    onSelectMoment(m.startSec, m.endSec);
                    onClose();
                  }}
                  style={{
                    alignSelf: 'flex-end',
                    padding: '6px 16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    gap: '6px'
                  }}
                >
                  Use This Clip <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
