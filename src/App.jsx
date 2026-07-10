import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PrivacyModal from './components/PrivacyModal';
import TermsModal from './components/TermsModal';
import DisclaimerModal from './components/DisclaimerModal';
import { Download, Gift, BookOpen, Sun, Moon, Menu, X } from 'lucide-react';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CommentPickerPage = lazy(() => import('./pages/CommentPickerPage'));
const ThumbnailDownloaderPage = lazy(() => import('./pages/ThumbnailDownloaderPage'));
const TagExtractorPage = lazy(() => import('./pages/TagExtractorPage'));
const SEOCheckerPage = lazy(() => import('./pages/SEOCheckerPage'));
const ChannelAnalyzerPage = lazy(() => import('./pages/ChannelAnalyzerPage'));
const TitleGeneratorPage = lazy(() => import('./pages/TitleGeneratorPage'));
const DescriptionGeneratorPage = lazy(() => import('./pages/DescriptionGeneratorPage'));
const HashtagGeneratorPage = lazy(() => import('./pages/HashtagGeneratorPage'));
const MoneyCalculatorPage = lazy(() => import('./pages/MoneyCalculatorPage'));
const CommentAnalyzerPage = lazy(() => import('./pages/CommentAnalyzerPage'));

// New Phase 2 Pages
const TranscriptGeneratorPage = lazy(() => import('./pages/TranscriptGeneratorPage'));
const VideoSummarizerPage = lazy(() => import('./pages/VideoSummarizerPage'));
const ThumbnailAnalyzerPage = lazy(() => import('./pages/ThumbnailAnalyzerPage'));
const ThumbnailGeneratorPage = lazy(() => import('./pages/ThumbnailGeneratorPage'));
const ShortsIdeaGeneratorPage = lazy(() => import('./pages/ShortsIdeaGeneratorPage'));
const ScriptGeneratorPage = lazy(() => import('./pages/ScriptGeneratorPage'));
const HookGeneratorPage = lazy(() => import('./pages/HookGeneratorPage'));
const VideoIdeasGeneratorPage = lazy(() => import('./pages/VideoIdeasGeneratorPage'));
const ChannelNameGeneratorPage = lazy(() => import('./pages/ChannelNameGeneratorPage'));
const HandleCheckerPage = lazy(() => import('./pages/HandleCheckerPage'));
const BannerMakerPage = lazy(() => import('./pages/BannerMakerPage'));
const ProfilePictureMakerPage = lazy(() => import('./pages/ProfilePictureMakerPage'));
const TimestampGeneratorPage = lazy(() => import('./pages/TimestampGeneratorPage'));
const PlaylistAnalyzerPage = lazy(() => import('./pages/PlaylistAnalyzerPage'));
const WatchTimeCalculatorPage = lazy(() => import('./pages/WatchTimeCalculatorPage'));
const MonetizationCheckerPage = lazy(() => import('./pages/MonetizationCheckerPage'));
const RankTrackerPage = lazy(() => import('./pages/RankTrackerPage'));
const QRCodeGeneratorPage = lazy(() => import('./pages/QRCodeGeneratorPage'));
const EmbedGeneratorPage = lazy(() => import('./pages/EmbedGeneratorPage'));
const KeywordToolPage = lazy(() => import('./pages/KeywordToolPage'));

const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

import CookieConsent from './components/CookieConsent';

function Navigation({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  const navLinkStyle = (path) => ({
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: location.pathname === path ? '#ffffff' : 'var(--text-secondary)',
    backgroundColor: location.pathname === path ? 'var(--glow-primary)' : 'transparent',
    transition: 'all var(--transition-liquid)',
    position: 'relative',
    overflow: 'hidden'
  });

  return (
    <nav className={`nav-container ${isMobileMenuOpen ? 'open' : ''}`}>
      <Link to="/youtube-comment-picker" style={navLinkStyle('/youtube-comment-picker')} className="liquid-glass hover:scale-105 transition-transform">
        <Gift size={16} />
        Tools
      </Link>
      <Link to="/youtube-seo-checker" style={navLinkStyle('/youtube-seo-checker')} className="liquid-glass hover:scale-105 transition-transform">
        <Download size={16} />
        SEO
      </Link>
      <Link to="/blogs" style={navLinkStyle(location.pathname.startsWith('/blog') ? location.pathname : '/blogs')} className="liquid-glass hover:scale-105 transition-transform">
        <BookOpen size={16} />
        Blogs
      </Link>
    </nav>
  );
}

// Global Cursor Interaction logic
function CursorGlowTracker() {
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return null;
}

function AnimatedRoutes() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 148px)' }}>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}><div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--glow-primary)', filter: 'blur(10px)' }} /></div>}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tools" element={<DashboardPage />} />
          <Route path="/youtube-comment-picker" element={<CommentPickerPage defaultPlatform="youtube" />} />
          <Route path="/instagram-comment-picker" element={<CommentPickerPage defaultPlatform="instagram" />} />
          <Route path="/tiktok-comment-picker" element={<CommentPickerPage defaultPlatform="tiktok" />} />
          <Route path="/thumbnail-downloader" element={<ThumbnailDownloaderPage />} />
          <Route path="/youtube-tag-extractor" element={<TagExtractorPage />} />
          <Route path="/youtube-seo-checker" element={<SEOCheckerPage />} />
          <Route path="/youtube-channel-analyzer" element={<ChannelAnalyzerPage />} />
          <Route path="/youtube-title-generator" element={<TitleGeneratorPage />} />
          <Route path="/youtube-description-generator" element={<DescriptionGeneratorPage />} />
          <Route path="/youtube-hashtag-generator" element={<HashtagGeneratorPage />} />
          <Route path="/youtube-money-calculator" element={<MoneyCalculatorPage />} />
          <Route path="/youtube-comment-analyzer" element={<CommentAnalyzerPage />} />

          {/* Phase 2 Routes */}
          <Route path="/youtube-transcript-generator" element={<TranscriptGeneratorPage />} />
          <Route path="/youtube-video-summarizer" element={<VideoSummarizerPage />} />
          <Route path="/youtube-thumbnail-analyzer" element={<ThumbnailAnalyzerPage />} />
          <Route path="/youtube-thumbnail-generator" element={<ThumbnailGeneratorPage />} />
          <Route path="/youtube-shorts-idea-generator" element={<ShortsIdeaGeneratorPage />} />
          <Route path="/youtube-script-generator" element={<ScriptGeneratorPage />} />
          <Route path="/youtube-hook-generator" element={<HookGeneratorPage />} />
          <Route path="/youtube-video-ideas-generator" element={<VideoIdeasGeneratorPage />} />
          <Route path="/youtube-channel-name-generator" element={<ChannelNameGeneratorPage />} />
          <Route path="/youtube-handle-checker" element={<HandleCheckerPage />} />
          <Route path="/youtube-banner-maker" element={<BannerMakerPage />} />
          <Route path="/youtube-profile-picture-maker" element={<ProfilePictureMakerPage />} />
          <Route path="/youtube-timestamp-generator" element={<TimestampGeneratorPage />} />
          <Route path="/youtube-playlist-analyzer" element={<PlaylistAnalyzerPage />} />
          <Route path="/youtube-watch-time-calculator" element={<WatchTimeCalculatorPage />} />
          <Route path="/youtube-monetization-checker" element={<MonetizationCheckerPage />} />
          <Route path="/youtube-rank-tracker" element={<RankTrackerPage />} />
          <Route path="/youtube-qr-code-generator" element={<QRCodeGeneratorPage />} />
          <Route path="/youtube-embed-generator" element={<EmbedGeneratorPage />} />
          <Route path="/youtube-keyword-tool" element={<KeywordToolPage />} />

          <Route path="/blogs" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

// FloatingParticles removed — caused scroll jank (15 fixed blurred blobs force GPU repaints on every scroll)

export default function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <CursorGlowTracker />
      
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        
        {/* Shared Premium Header */}
        <header className="liquid-glass" style={{
          padding: '16px 0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderRadius: 0,
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          overflow: 'visible'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src="/images/app_logo_56.webp" 
                srcSet="/images/app_logo_32.webp 32w, /images/app_logo_56.webp 56w, /images/app_logo_128.webp 128w"
                sizes="32px"
                width="32"
                height="32"
                alt="Youtube Comment Picker Logo" 
                style={{ width: '32px', height: '32px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: 'transform 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <span style={{ fontSize: '1.2rem', fontWeight: '600', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                Youtube Comment Picker
              </span>
            </Link>

            {/* Navigation links & Theme Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
              <button 
                onClick={toggleTheme} 
                className="liquid-glass"
                style={{
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button 
                className="mobile-menu-btn liquid-glass"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
                style={{ border: 'none', borderRadius: 'var(--radius-sm)' }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <AnimatedRoutes />

        {/* Shared Footer */}
        <footer className="liquid-glass" style={{
          padding: '24px 0',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          marginTop: 'auto',
          borderRadius: 0,
          borderBottom: 'none',
          borderLeft: 'none',
          borderRight: 'none'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <span>© 2026 Youtube Comment Picker. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontWeight: '500' }}>
              <Link to="/about" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>About</Link>
              <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Contact</Link>
              <Link to="/blogs" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Blogs</Link>
              <span role="button" tabIndex={0} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setShowDisclaimer(true)} onKeyDown={(e) => e.key === 'Enter' && setShowDisclaimer(true)}>Disclaimer</span>
              <span role="button" tabIndex={0} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setShowPrivacy(true)} onKeyDown={(e) => e.key === 'Enter' && setShowPrivacy(true)}>Privacy Policy</span>
              <span role="button" tabIndex={0} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setShowTerms(true)} onKeyDown={(e) => e.key === 'Enter' && setShowTerms(true)}>Terms of Service</span>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <AnimatePresence>
          {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
          {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
          {showDisclaimer && <DisclaimerModal onClose={() => setShowDisclaimer(false)} />}
        </AnimatePresence>

        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}
