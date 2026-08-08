import React from 'react';
import { Film, CheckCircle2 } from 'lucide-react';

export default function ProcessingProgress({ statusStep, progressPercent }) {
  const steps = [
    { label: 'Preparing your clip...', minPct: 0 },
    { label: 'Creating clip...', minPct: 35 },
    { label: 'Finalizing...', minPct: 75 },
    { label: 'Your clip is ready!', minPct: 100 }
  ];

  return (
    <div className="card card-lg" style={{
      maxWidth: '560px',
      margin: '40px auto',
      textAlign: 'center',
      padding: '40px 32px'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-light)',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px auto'
      }}>
        <Film size={32} />
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
        {statusStep || 'Preparing your clip...'}
      </h2>

      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
        Synthesizing high quality clip frames and aspect ratio layout...
      </p>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '10px',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        marginBottom: '12px'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          backgroundColor: 'var(--primary)',
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.2s ease-out'
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>
        <span>{statusStep}</span>
        <span>{Math.round(progressPercent)}%</span>
      </div>

      {/* Step Indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '32px',
        paddingTop: '20px',
        borderTop: '1px solid var(--border)'
      }}>
        {steps.map((st, i) => {
          const isDone = progressPercent >= st.minPct;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: isDone ? 'var(--primary)' : 'var(--bg-tertiary)',
                color: isDone ? '#fff' : 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isDone ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: isDone ? '700' : '500',
                color: isDone ? 'var(--text-primary)' : 'var(--text-muted)',
                maxWidth: '90px'
              }}>
                {st.label.replace('...', '')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
