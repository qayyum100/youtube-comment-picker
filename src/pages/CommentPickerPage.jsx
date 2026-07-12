import React, { useState, useEffect } from 'react';
import PlatformSwitcher from '../components/PlatformSwitcher';
import MediaFetcher from '../components/MediaFetcher';
import FilterDashboard from '../components/FilterDashboard';
import DrawingDesk from '../components/DrawingDesk';
import CertificateModal from '../components/CertificateModal';
import CompetitorContent from '../components/CompetitorContent';
import FaqSection from '../components/FaqSection';
import SeoHead from '../components/SeoHead';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommentPickerPage({ defaultPlatform = 'youtube' }) {
  const [platform, setPlatform] = useState(defaultPlatform);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    setPlatform(defaultPlatform);
  }, [defaultPlatform]);

  // Winners and standby alternates
  const [winners, setWinners] = useState([]);
  const [standbys, setStandbys] = useState([]);

  // Modal certificate state
  const [activeCertificate, setActiveCertificate] = useState(null);

  // History state
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('draw_history');
    return saved ? JSON.parse(saved) : [];
  });

  const handleDrawComplete = (drawnWinners) => {
    if (drawnWinners.length === 0) return;
    setHistory(prev => {
      const next = [
        {
          id: Math.random().toString(36).substring(2, 9),
          date: new Date().toISOString(),
          platform,
          winners: drawnWinners.map(w => ({ author: w.author, prize: w.prizeTag || 'Winner', serial: w.serialCode }))
        },
        ...prev
      ].slice(0, 50);
      localStorage.setItem('draw_history', JSON.stringify(next));
      return next;
    });
  };

  // Initialize filters from localStorage or default
  const [filters, setFilters] = useState(() => {
    const defaultFilters = {
      keyword: '',
      minTags: 0,
      minLikes: 0,
      excludeList: '',
      duplicateMode: 'fair',
      subscribersOnly: false,
      firstCommentBonus: false
    };
    const saved = localStorage.getItem('draw_filters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultFilters, ...parsed };
      } catch (e) {
        console.error('Error parsing filters from local storage', e);
      }
    }
    return defaultFilters;
  });

  // Save filters to local storage
  useEffect(() => {
    localStorage.setItem('draw_filters', JSON.stringify(filters));
  }, [filters]);

  // Reset page state on platform switch
  useEffect(() => {
    setComments([]);
    setWinners([]);
    setStandbys([]);
    setApiError('');
  }, [platform]);

  // Fetch comments from Vercel Portable Proxy API
  const handleFetchComments = async (url, isMockOnly) => {
    setIsLoading(true);
    setApiError('');
    setComments([]);
    setWinners([]);
    setStandbys([]);

    try {
      let endpoint = '/api/youtube/comments';
      if (platform === 'instagram') endpoint = '/api/instagram/comments';
      if (platform === 'tiktok') endpoint = '/api/tiktok/comments';
      
      const encodedUrl = encodeURIComponent(url);

      const response = await fetch(`${endpoint}?url=${encodedUrl}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to capture comments from backend');
      }

      const data = await response.json();

      setComments(data.comments || []);
      setIsSimulated(data.simulated || false);
      if (data.error) {
        setApiError(data.error);
      }
    } catch (err) {
      console.error(err);
      setApiError(err.message || 'Network connectivity error. Running in offline sandbox.');
    } finally {
      setIsLoading(false);
    }
  };

  // Algorithmic Filters Implementation
  const getFilteredComments = () => {
    if (!comments || comments.length === 0) return [];

    let result = [...comments];

    if ((filters.keyword || '').trim()) {
      const query = filters.keyword.toLowerCase().trim();
      result = result.filter(c => {
        const text = c.text || '';
        return text.toLowerCase().includes(query);
      });
    }

    if (filters.minTags > 0) {
      result = result.filter(c => {
        const text = c.text || '';
        const matches = text.match(/@[a-zA-Z0-9_\.]+/g);
        const count = matches ? matches.length : 0;
        return count >= filters.minTags;
      });
    }

    if (filters.minLikes > 0) {
      result = result.filter(c => (c.likes || 0) >= filters.minLikes);
    }

    if ((filters.excludeList || '').trim()) {
      const blacklist = (filters.excludeList || '')
        .toLowerCase()
        .split(/[\n,]+/)
        .map(term => term.trim())
        .filter(term => term.length > 0);

      result = result.filter(c => {
        const textLower = (c.text || '').toLowerCase();
        const authorLower = (c.author || '').toLowerCase();

        return !blacklist.some(term => {
          if (term.startsWith('@')) {
            const cleanTerm = term.replace('@', '');
            const cleanAuthor = authorLower.replace('@', '');
            return cleanAuthor === cleanTerm;
          }
          return authorLower.includes(term) || textLower.includes(term);
        });
      });
    }

    if (filters.subscribersOnly) {
      result = result.filter(c => c.isSubscribed !== false);
    }

    if (filters.duplicateMode === 'fair') {
      const seenAuthors = new Set();
      result = result.filter(c => {
        const author = (c.author || '').toLowerCase().trim();
        if (!author || seenAuthors.has(author)) {
          return false;
        }
        seenAuthors.add(author);
        return true;
      });
    }

    // First Commenter Bonus
    if (filters.firstCommentBonus && result.length > 0) {
      let oldest = result[0];
      let oldestDate = new Date(oldest.timestamp).getTime();
      for (let i = 1; i < result.length; i++) {
        const d = new Date(result[i].timestamp).getTime();
        if (d < oldestDate) {
          oldestDate = d;
          oldest = result[i];
        }
      }
      for (let i = 0; i < 5; i++) {
        result.push({ ...oldest, id: `${oldest.id}_bonus_${i}`, isBonus: true });
      }
    }

    return result;
  };

  const filteredComments = getFilteredComments();

  return (
    <>
      <SeoHead pageType="picker" platform={platform} />

      <main style={{ flexGrow: 1, padding: '60px 0' }}>
        <div className="container">

          {/* Welcome Banner */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <motion.h1 
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ 
                fontSize: '3rem', 
                fontWeight: '600', 
                marginBottom: '16px', 
                lineHeight: '1.2', 
                textTransform: 'capitalize',
                background: 'linear-gradient(90deg, var(--text-primary), var(--glow-primary), var(--text-primary))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              {platform === 'youtube' ? 'Comment Picker for YouTube & YouTube Giveaway Picker' : `${platform} Comment Picker`}
            </motion.h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', letterSpacing: '-0.01em' }}>
              The premium comment picker for youtube and giveaway picker youtube. Unbiased, fast, and secure random comment picker youtube tool.
            </p>
          </motion.div>

          <PlatformSwitcher platform={platform} />

          {apiError && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="liquid-glass"
              style={{
                borderColor: 'var(--glow-error)',
                padding: '16px 20px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.9rem',
                color: 'var(--text-primary)'
              }}
            >
              <AlertCircle size={20} color="var(--glow-error)" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--glow-error)' }}>System Notice:</strong> {apiError}
              </div>
            </motion.div>
          )}

          <MediaFetcher
            platform={platform}
            onFetch={handleFetchComments}
            isLoading={isLoading}
            isSimulated={isSimulated}
            totalComments={comments.length}
          />

          {comments.length > 0 && (
            <FilterDashboard
              filters={filters}
              setFilters={setFilters}
              totalComments={comments.length}
              filteredCount={filteredComments.length}
            />
          )}

          {comments.length > 0 && (
            <DrawingDesk
              comments={comments}
              filteredComments={filteredComments}
              winners={winners}
              setWinners={setWinners}
              standbys={standbys}
              setStandbys={setStandbys}
              onGenerateCertificate={setActiveCertificate}
              onDrawComplete={handleDrawComplete}
            />
          )}

          <CompetitorContent />
          
          <FaqSection />

          {history.length > 0 && (
            <motion.section 
              className="liquid-glass"
              style={{ marginTop: '48px', padding: '32px', borderRadius: 'var(--radius-xl)' }}
            >
              <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                📜 Drawn Winner History
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {history.map((run) => (
                  <div key={run.id} style={{ background: 'var(--glass-bg-base)', padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', border: '1px solid var(--border-light)' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {new Date(run.date).toLocaleString()} • Platform: <strong style={{ textTransform: 'capitalize' }}>{run.platform}</strong>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                        {run.winners.map((w, idx) => (
                          <span key={idx} style={{ padding: '6px 12px', background: 'var(--bg-dark)', border: '1px solid var(--border-light)', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                            🏆 <strong>{w.author}</strong> ({w.prize})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

        </div>
      </main>

      {activeCertificate && (
        <CertificateModal
          winner={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}
    </>
  );
}
