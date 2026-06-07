import React, { useState, useEffect } from 'react';
import PlatformSwitcher from './components/PlatformSwitcher';
import MediaFetcher from './components/MediaFetcher';
import FilterDashboard from './components/FilterDashboard';
import DrawingDesk from './components/DrawingDesk';
import CertificateModal from './components/CertificateModal';
import EeatGrid from './components/EeatGrid';
import SeoHead from './components/SeoHead';
import PrivacyModal from './components/PrivacyModal';
import TermsModal from './components/TermsModal';
import { Award, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function App() {
  const [platform, setPlatform] = useState('youtube');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [apiError, setApiError] = useState('');

  // Winners and standby alternates
  const [winners, setWinners] = useState([]);
  const [standbys, setStandbys] = useState([]);

  // Modal certificate state
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Privacy & Terms modal states
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

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
      duplicateMode: 'fair'
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
      const endpoint = platform === 'youtube' ? '/api/youtube/comments' : '/api/instagram/comments';
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

    // 1. Keyword / Hashtag filter
    if (filters.keyword.trim()) {
      const query = filters.keyword.toLowerCase().trim();
      result = result.filter(c => {
        const text = c.text || '';
        return text.toLowerCase().includes(query);
      });
    }

    // 2. Minimum Friend Mentions (@tags)
    if (filters.minTags > 0) {
      result = result.filter(c => {
        const text = c.text || '';
        const matches = text.match(/@[a-zA-Z0-9_\.]+/g);
        const count = matches ? matches.length : 0;
        return count >= filters.minTags;
      });
    }

    // 3. Minimum Likes requirement
    if (filters.minLikes > 0) {
      result = result.filter(c => (c.likes || 0) >= filters.minLikes);
    }

    // 4. Exclusions / Spam blacklist
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

    // 5. Duplicate Entry Mode
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

    return result;
  };

  const filteredComments = getFilteredComments();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Headless SEO Manager */}
      <SeoHead platform={platform} />

      {/* Premium Header */}
      <header style={{
        borderBottom: '1px solid var(--border-dark)',
        padding: '16px 0',
        backgroundColor: '#0a0a0c',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'var(--accent-gradient)',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: '#fff'
            }}>
              S
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: '800' }} className="text-gradient">
              Youtube Comment Picker
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main style={{ flexGrow: 1, padding: '40px 0' }}>
        <div className="container">

          {/* Welcome Banner */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }} className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', lineHeight: '1.2' }}>
              Youtube Comment Picker - <span className="text-gradient">YouTube Random Comment Picker:</span> Free Giveaway Tool
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              The premier lottery & drawing suite for giveaways. Unbiased, fast, and secure. Run verification certs instantly.
            </p>
          </div>

          {/* Platform Segment switcher */}
          <PlatformSwitcher
            platform={platform}
            setPlatform={setPlatform}
          />

          {/* Error notifications */}
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

          {/* Media Link Input */}
          <MediaFetcher
            platform={platform}
            onFetch={handleFetchComments}
            isLoading={isLoading}
            isSimulated={isSimulated}
            totalComments={comments.length}
          />

          {/* Filter Dashboard */}
          {comments.length > 0 && (
            <FilterDashboard
              filters={filters}
              setFilters={setFilters}
              totalComments={comments.length}
              filteredCount={filteredComments.length}
            />
          )}

          {/* Drawing desk */}
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

          {/* E-E-A-T Badges & Compliance Info */}
          <EeatGrid />

        </div>
      </main>

      {/* Certificate Modal Portal */}
      {activeCertificate && (
        <CertificateModal
          winner={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-dark)',
        padding: '24px 0',
        backgroundColor: '#070709',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span>© 2026 Youtube Comment Picker. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setShowPrivacy(true)}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setShowTerms(true)}>Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Privacy and Terms Modals */}
      { showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} /> }
      { showTerms && <TermsModal onClose={() => setShowTerms(false)} /> }
    </div>
  );
}

