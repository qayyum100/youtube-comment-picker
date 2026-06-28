import React, { useState, useEffect } from 'react';
import { Link2, Sparkles, Database, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    // Use a placeholder URL for mock load
    const demoUrl = platform === 'youtube' 
      ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
      : platform === 'instagram'
        ? 'https://www.instagram.com/p/C7X-xyz123/'
        : 'https://www.tiktok.com/@tiktok/video/1234567890';
    setUrl(demoUrl);
    onFetch(demoUrl, true);
  };

  return (
    <motion.div 
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="liquid-glass" 
      style={{ 
        marginBottom: '32px', 
        padding: '32px',
        borderRadius: 'var(--radius-xl)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: '600' }}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link2 size={24} style={{ color: 'var(--glow-primary)' }} />
            </motion.div>
            Media Stream Fetcher
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '6px' }}>
            {platform === 'youtube' 
              ? 'Paste any public YouTube video link or Shorts URL to extract participants.' 
              : platform === 'instagram'
                ? 'Paste any public Instagram post, TV, or Reel URL to capture comments.'
                : 'Paste any public TikTok video URL to fetch comments.'}
          </p>
        </div>

        {/* Sync Mode Badge */}
        <AnimatePresence>
          {totalComments > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: isSimulated ? 'rgba(249, 115, 22, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                border: `1px solid ${isSimulated ? 'rgba(249, 115, 22, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                color: isSimulated ? '#f97316' : '#10b981',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)'
              }}>
              {isSimulated ? <Sparkles size={14} /> : <Database size={14} />}
              {isSimulated ? 'SANDBOX SIMULATED' : 'LIVE FETCH CONNECTED'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexGrow: 1, minWidth: '250px' }}>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="input-premium"
              placeholder={platform === 'youtube' 
                ? 'e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
                : platform === 'instagram'
                  ? 'e.g. https://www.instagram.com/p/C7X-xyz123/'
                  : 'e.g. https://www.tiktok.com/@username/video/123'
              }
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              id="input-media-url"
              disabled={isLoading}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 8px 30px var(--glow-primary)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="liquid-glass"
            style={{
              padding: '16px 32px',
              border: 'none',
              background: 'var(--glow-primary)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: isLoading || !url ? 'not-allowed' : 'pointer',
              opacity: isLoading || !url ? 0.6 : 1,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '160px'
            }}
            disabled={isLoading || !url}
            id="btn-fetch-comments"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
              />
            ) : 'Fetch Comments'}
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ color: '#ef4444', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border-bottom)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            No credentials set in workspace env? Try our sandbox demo generator instead:
          </span>
          <motion.button
            whileHover={{ scale: 1.02, background: 'var(--glass-bg-hover)' }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="liquid-glass"
            onClick={handleLoadDemo}
            disabled={isLoading}
            id="btn-load-sandbox"
            style={{ 
              padding: '10px 20px', 
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              color: 'var(--text-primary)'
            }}
          >
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Sparkles size={16} style={{ color: '#f97316' }} />
            </motion.div>
            Load Sandbox Demo
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
