import React, { useState, useEffect } from 'react';
import PlatformSwitcher from '../components/PlatformSwitcher';
import MediaFetcher from '../components/MediaFetcher';
import FilterDashboard from '../components/FilterDashboard';
import DrawingDesk from '../components/DrawingDesk';
import CertificateModal from '../components/CertificateModal';
import CompetitorContent from '../components/CompetitorContent';
import SeoHead from '../components/SeoHead';
import { AlertCircle } from 'lucide-react';

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

  // Initialize filters from localStorage or default
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem('draw_filters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing filters from local storage', e);
      }
    }
    return {
      keyword: '',
      minTags: 0,
      minLikes: 0,
      excludeList: '',
      duplicateMode: 'fair',
      subscribersOnly: false,
      firstCommentBonus: false
    };
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

    if (filters.keyword.trim()) {
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

    if (filters.excludeList.trim()) {
      const blacklist = filters.excludeList
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

      <main style={{ flexGrow: 1, padding: '40px 0' }}>
        <div className="container">

          {/* Welcome Banner */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }} className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', lineHeight: '1.2', textTransform: 'capitalize' }}>
              {platform === 'youtube' ? 'YouTube Comment Random Picker' : `${platform} Comment Picker`} - <span style={{ color: 'var(--brand-indigo)' }}>Random Winner Generator</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              The premier lottery & drawing suite for giveaways. Unbiased, fast, and secure. Run verification certs instantly.
            </p>
          </div>

          <PlatformSwitcher platform={platform} />

          {apiError && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.85rem'
            }} className="animate-fade-in">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <div>
                <strong>System Notice:</strong> {apiError}
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
            />
          )}

          <CompetitorContent />

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
