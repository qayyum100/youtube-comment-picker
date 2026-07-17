import React, { useState, useEffect } from 'react';
import { Link2, Sparkles, Database, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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
    } else if (platform === 'instagram') {
      const isIg = /instagram\.com/i.test(inputUrl);
      if (!isIg) return 'Please enter a valid Instagram post or reel URL';
    } else if (platform === 'tiktok') {
      const isTt = /tiktok\.com/i.test(inputUrl);
      if (!isTt) return 'Please enter a valid TikTok video URL';
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
    const demoUrl = platform === 'youtube'
      ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      : platform === 'instagram'
        ? 'https://www.instagram.com/p/C7X-xyz123/'
        : 'https://www.tiktok.com/@tiktok/video/1234567890';
    setUrl(demoUrl);
    onFetch(demoUrl, true);
  };

  const placeholder = platform === 'youtube'
    ? 'e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    : platform === 'instagram'
      ? 'e.g. https://www.instagram.com/p/C7X-xyz123/'
      : 'e.g. https://www.tiktok.com/@username/video/123';

  const description = platform === 'youtube'
    ? 'Paste any public YouTube video link or Shorts URL to extract participants.'
    : platform === 'instagram'
      ? 'Paste any public Instagram post, TV, or Reel URL to capture comments.'
      : 'Paste any public TikTok video URL to fetch comments.';

  return (
    <div className="card card-lg" style={{ marginBottom: '24px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '6px',
          }}>
            <Link2 size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            Fetch Comments
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            {description}
          </p>
        </div>

        {/* Status badge */}
        <AnimatePresence>
          {totalComments > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className={isSimulated ? 'badge badge-warning' : 'badge badge-success'}
            >
              {isSimulated ? <Sparkles size={12} /> : <Database size={12} />}
              {isSimulated ? 'SANDBOX' : 'LIVE'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon">
              <Link2 size={16} />
            </span>
            <input
              type="text"
              className={`input-field ${error ? 'error' : ''}`}
              placeholder={placeholder}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              id="input-media-url"
              disabled={isLoading}
              aria-label="Video URL"
              aria-invalid={!!error}
              aria-describedby={error ? 'url-error' : undefined}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ minWidth: '140px', flexShrink: 0 }}
            disabled={isLoading || !url}
            id="btn-fetch-comments"
          >
            {isLoading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : 'Fetch Comments'}
          </button>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              id="url-error"
              role="alert"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="alert alert-error"
              style={{ overflow: 'hidden' }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border)',
          marginTop: '4px',
        }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            No API credentials? Try our sandbox demo instead:
          </span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleLoadDemo}
            disabled={isLoading}
            id="btn-load-sandbox"
          >
            <Sparkles size={14} style={{ color: 'var(--warning)' }} />
            Load Demo
          </button>
        </div>
      </form>
    </div>
  );
}
