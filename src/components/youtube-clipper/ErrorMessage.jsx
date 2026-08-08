import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="card card-lg" style={{
      maxWidth: '560px',
      margin: '30px auto',
      textAlign: 'center',
      borderLeft: '4px solid var(--error)',
      padding: '24px'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'var(--error-light)',
        color: 'var(--error)',
        marginBottom: '16px'
      }}>
        <AlertTriangle size={24} />
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
        Unable to process clip
      </h3>

      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onRetry}
          style={{ padding: '8px 20px', fontSize: '14px', gap: '8px', margin: '0 auto' }}
        >
          <RefreshCw size={15} /> Try Again
        </button>
      )}
    </div>
  );
}
