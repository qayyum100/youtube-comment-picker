import React, { useState } from 'react';
import { Search, Youtube, AlertCircle } from 'lucide-react';

export default function YouTubeUrlInput({ onAnalyze, loading }) {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateUrl = (input) => {
    if (!input.trim()) {
      return 'Please enter a valid YouTube URL.';
    }

    const lower = input.toLowerCase();

    // Check non-youtube platforms
    if (lower.includes('tiktok.com') || lower.includes('instagram.com') || lower.includes('vimeo.com') || lower.includes('facebook.com') || lower.includes('twitter.com')) {
      return 'Only YouTube videos are supported.';
    }

    // Check valid YouTube URL format
    const ytReg = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = input.match(ytReg);

    if (!match || !match[2] || match[2].length !== 11) {
      return 'Please enter a valid YouTube URL.';
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateUrl(url);
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError('');
    onAnalyze(url);
  };

  return (
    <div className="card card-lg" style={{ marginBottom: '32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          borderRadius: 'var(--radius-full)',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '12px'
        }}>
          <Youtube size={16} /> YouTube Video Clipper
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
          YouTube Video Clipper
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Paste a YouTube video URL, select the moment you want, and create a clip.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: '1 1 300px' }}>
            <span className="input-group-icon">
              <Youtube size={18} color="var(--primary)" />
            </span>
            <input
              type="text"
              className="input-field"
              placeholder="Paste YouTube URL..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (validationError) setValidationError('');
              }}
              style={{ fontSize: '15px', paddingLeft: '42px' }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ padding: '0 28px', minWidth: '160px', height: '48px' }}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: '16px', height: '16px', borderTopColor: '#fff' }} />
                Analyzing...
              </>
            ) : (
              <>
                <Search size={18} /> Analyze Video
              </>
            )}
          </button>
        </div>

        {validationError && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '12px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--error-light)',
            color: 'var(--error)',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <AlertCircle size={16} />
            <span>{validationError}</span>
          </div>
        )}
      </form>
    </div>
  );
}
