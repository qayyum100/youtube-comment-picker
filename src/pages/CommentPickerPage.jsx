import React, { useState, useEffect } from 'react';
import PlatformSwitcher from '../components/PlatformSwitcher';
import MediaFetcher from '../components/MediaFetcher';
import FilterDashboard from '../components/FilterDashboard';
import DrawingDesk from '../components/DrawingDesk';
import CertificateModal from '../components/CertificateModal';
import CompetitorContent from '../components/CompetitorContent';
import FaqSection from '../components/FaqSection';
import SeoHead from '../components/SeoHead';
import { AlertCircle, Trophy } from 'lucide-react';
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

      <main style={{ flexGrow: 1, padding: '48px 0' }}>
        <div className="container">

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '12px',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              textTransform: 'capitalize',
            }}>
              {platform === 'youtube'
                ? 'Comment Picker for YouTube & YouTube Giveaway Picker'
                : `${platform} Comment Picker`}
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '16px',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}>
              The premium comment picker for youtube and giveaway picker youtube. Unbiased, fast, and secure random comment picker youtube tool.
            </p>
          </div>

          <PlatformSwitcher platform={platform} />

          {/* API Error */}
          {apiError && (
            <div className="alert alert-error" style={{ marginBottom: '20px' }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <div>
                <strong>Notice:</strong> {apiError}
              </div>
            </div>
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

          {/* Draw History */}
          {history.length > 0 && (
            <section className="card card-lg" style={{ marginTop: '48px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-primary)',
              }}>
                <Trophy size={20} style={{ color: 'var(--primary)' }} />
                Draw History
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {history.map((run) => (
                  <div
                    key={run.id}
                    style={{
                      background: 'var(--bg-secondary)',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: '500' }}>
                      {new Date(run.date).toLocaleString()} · Platform:{' '}
                      <span style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>{run.platform}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {run.winners.map((w, idx) => (
                        <span key={idx} className="badge badge-primary" style={{ fontSize: '13px', padding: '5px 12px' }}>
                          🏆 <strong>{w.author}</strong> ({w.prize})
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
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
