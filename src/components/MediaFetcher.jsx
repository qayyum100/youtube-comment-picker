import React, { useState, useEffect } from 'react';
import { Link2, Sparkles, Database, AlertCircle } from 'lucide-react';

export default function MediaFetcher({ platform, onFetch, isLoading, isSimulated, totalComments }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  // Clear input and errors when platform changes
  useEffect(() => {
    setUrl('');
    setError('');
  }, [platform]);

  // Basic regex validation
  const validateUrl = (inputUrl) => {
    if (!inputUrl) return 'URL is required';
    
    if (platform === 'youtube') {
      const isYt = /youtube\.com|youtu\.be/i.test(inputUrl);
      if (!isYt) return 'Please enter a valid YouTube video or shorts URL';
    } else {
      const isIg = /instagram\.com/i.test(inputUrl);
      if (!isIg) return 'Please enter a valid Instagram post or reel URL';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    onFetch(url, false);
  };

  const handleLoadDemo = () => {
    setError('');
    // Use a placeholder URL for mock load
    const demoUrl = platform === 'youtube' 
      ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
      : 'https://www.instagram.com/p/C7X-xyz123/';
    setUrl(demoUrl);
    onFetch(demoUrl, true);
  };

  return (
    <div className="card-premium active-border animate-fade-in" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link2 size={20} className="text-gradient" />
            Media Stream Fetcher
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
            {platform === 'youtube' 
              ? 'Paste any public YouTube video link or Shorts URL to extract participants.' 
              : 'Paste any public Instagram post, TV, or Reel URL to capture comments.'}
          </p>
        </div>

        {/* Sync Mode Badge */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {totalComments > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: isSimulated ? 'rgba(249, 115, 22, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              border: `1px solid ${isSimulated ? 'rgba(249, 115, 22, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
              color: isSimulated ? '#f97316' : '#10b981',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}>
              {isSimulated ? <Sparkles size={12} /> : <Database size={12} />}
              {isSimulated ? 'SANDBOX SIMULATED DATA' : 'LIVE FETCH CONNECTED'}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <input
              type="text"
              className="input-premium"
              placeholder={platform === 'youtube' 
                ? 'e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
                : 'e.g. https://www.instagram.com/p/C7X-xyz123/'
              }
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              id="input-media-url"
              disabled={isLoading}
              style={{ paddingRight: '40px' }}
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !url}
            id="btn-fetch-comments"
          >
            {isLoading ? 'Syncing...' : 'Fetch Comments'}
          </button>
        </div>

        {error && (
          <div style={{ color: '#ef4444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            No credentials set in workspace env? Try our sandbox demo generator instead:
          </span>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleLoadDemo}
            disabled={isLoading}
            id="btn-load-sandbox"
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          >
            <Sparkles size={14} style={{ color: '#f97316' }} />
            Load Sandbox Demo
          </button>
        </div>
      </form>
    </div>
  );
}
