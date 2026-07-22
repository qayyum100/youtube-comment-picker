import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PrivacyModal from './components/PrivacyModal';
import TermsModal from './components/TermsModal';
import DisclaimerModal from './components/DisclaimerModal';
import { Sun, Moon, Menu, X } from 'lucide-react';

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
const KeywordToolPage = lazy(() => import('./pages/KeywordToolPage'));

// Priority 1 Tool Pages
const BestTimeToUploadPage = lazy(() => import('./pages/BestTimeToUploadPage'));
const CtrCalculatorPage = lazy(() => import('./pages/CtrCalculatorPage'));
const CpmCalculatorPage = lazy(() => import('./pages/CpmCalculatorPage'));
const RpmCalculatorPage = lazy(() => import('./pages/RpmCalculatorPage'));
const VideoDurationCalculatorPage = lazy(() => import('./pages/VideoDurationCalculatorPage'));
const ThumbnailDownloaderHdPage = lazy(() => import('./pages/ThumbnailDownloaderHdPage'));
const ThumbnailPreviewPage = lazy(() => import('./pages/ThumbnailPreviewPage'));
const VideoMetadataViewerPage = lazy(() => import('./pages/VideoMetadataViewerPage'));
const TitleAnalyzerPage = lazy(() => import('./pages/TitleAnalyzerPage'));
const DescriptionAnalyzerPage = lazy(() => import('./pages/DescriptionAnalyzerPage'));

// 10 Keyword SEO Tools
const SearchVolumeCheckerPage = lazy(() => import('./pages/SearchVolumeCheckerPage'));
const KeywordDifficultyCheckerPage = lazy(() => import('./pages/KeywordDifficultyCheckerPage'));
const TrendingKeywordsFinderPage = lazy(() => import('./pages/TrendingKeywordsFinderPage'));
const RelatedKeywordsGeneratorPage = lazy(() => import('./pages/RelatedKeywordsGeneratorPage'));
const SearchIntentAnalyzerPage = lazy(() => import('./pages/SearchIntentAnalyzerPage'));
const SearchSuggestExplorerPage = lazy(() => import('./pages/SearchSuggestExplorerPage'));
const AutocompleteGeneratorPage = lazy(() => import('./pages/AutocompleteGeneratorPage'));
const QuestionKeywordFinderPage = lazy(() => import('./pages/QuestionKeywordFinderPage'));
const KeywordGrouperPage = lazy(() => import('./pages/KeywordGrouperPage'));
const KeywordClusterGeneratorPage = lazy(() => import('./pages/KeywordClusterGeneratorPage'));

// 10 Competitor Analysis Tools
const CompetitorThumbnailAnalyzerPage = lazy(() => import('./pages/CompetitorThumbnailAnalyzerPage'));
const CompetitorTitleExtractorPage = lazy(() => import('./pages/CompetitorTitleExtractorPage'));
const CompetitorDescriptionExtractorPage = lazy(() => import('./pages/CompetitorDescriptionExtractorPage'));
const CompetitorHashtagExtractorPage = lazy(() => import('./pages/CompetitorHashtagExtractorPage'));
const CompetitorUploadTimeAnalyzerPage = lazy(() => import('./pages/CompetitorUploadTimeAnalyzerPage'));
const CompetitorEngagementAnalyzerPage = lazy(() => import('./pages/CompetitorEngagementAnalyzerPage'));
const CompetitorGrowthEstimatorPage = lazy(() => import('./pages/CompetitorGrowthEstimatorPage'));
const SimilarChannelFinderPage = lazy(() => import('./pages/SimilarChannelFinderPage'));
const ViralVideoFinderPage = lazy(() => import('./pages/ViralVideoFinderPage'));
const ChannelComparisonToolPage = lazy(() => import('./pages/ChannelComparisonToolPage'));

// 10 Shorts Tools
const ShortsHashtagGeneratorPage = lazy(() => import('./pages/ShortsHashtagGeneratorPage'));
const ShortsTitleGeneratorPage = lazy(() => import('./pages/ShortsTitleGeneratorPage'));
const ShortsCaptionGeneratorPage = lazy(() => import('./pages/ShortsCaptionGeneratorPage'));
const ShortsHookAnalyzerPage = lazy(() => import('./pages/ShortsHookAnalyzerPage'));
const ShortsTrendFinderPage = lazy(() => import('./pages/ShortsTrendFinderPage'));
const ShortsDurationOptimizerPage = lazy(() => import('./pages/ShortsDurationOptimizerPage'));
const ShortsUploadTimeCalculatorPage = lazy(() => import('./pages/ShortsUploadTimeCalculatorPage'));
const ShortsSeoCheckerPage = lazy(() => import('./pages/ShortsSeoCheckerPage'));
const ShortsKeywordFinderPage = lazy(() => import('./pages/ShortsKeywordFinderPage'));
const ShortsPerformancePredictorPage = lazy(() => import('./pages/ShortsPerformancePredictorPage'));

// Channel Audit Tools (Priority 5)
const ChannelHealthCheckerPage = lazy(() => import('./pages/ChannelHealthCheckerPage'));
const ChannelSeoAuditorPage = lazy(() => import('./pages/ChannelSeoAuditorPage'));
const SubscriberGrowthAnalyzerPage = lazy(() => import('./pages/SubscriberGrowthAnalyzerPage'));
const VideoPerformanceAuditorPage = lazy(() => import('./pages/VideoPerformanceAuditorPage'));
const UploadConsistencyTrackerPage = lazy(() => import('./pages/UploadConsistencyTrackerPage'));
const ChannelNicheFinderPage = lazy(() => import('./pages/ChannelNicheFinderPage'));
const ChannelRevenueEstimatorPage = lazy(() => import('./pages/ChannelRevenueEstimatorPage'));
const ChannelAgeCalculatorPage = lazy(() => import('./pages/ChannelAgeCalculatorPage'));
const ChannelScoreCalculatorPage = lazy(() => import('./pages/ChannelScoreCalculatorPage'));

// Live Stream & Community Tools (Priority 6)
const LiveStreamTitleGeneratorPage = lazy(() => import('./pages/LiveStreamTitleGeneratorPage'));
const CommunityPostGeneratorPage = lazy(() => import('./pages/CommunityPostGeneratorPage'));
const StreamScheduleBuilderPage = lazy(() => import('./pages/StreamScheduleBuilderPage'));
const ClipTitleGeneratorPage = lazy(() => import('./pages/ClipTitleGeneratorPage'));
const MembershipPerksGeneratorPage = lazy(() => import('./pages/MembershipPerksGeneratorPage'));
const EndScreenOptimizerPage = lazy(() => import('./pages/EndScreenOptimizerPage'));
const CardsCtaGeneratorPage = lazy(() => import('./pages/CardsCtaGeneratorPage'));

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

  const isActive = (path) => location.pathname === path || (path === '/blogs' && location.pathname.startsWith('/blog'));

  return (
    <nav className={`nav-container ${isMobileMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
      <Link
        to="/youtube-comment-picker"
        className={`nav-link ${isActive('/youtube-comment-picker') ? 'active' : ''}`}
      >
        Tools
      </Link>
      <Link
        to="/youtube-seo-checker"
        className={`nav-link ${isActive('/youtube-seo-checker') ? 'active' : ''}`}
      >
        SEO
      </Link>
      <Link
        to="/blogs"
        className={`nav-link ${isActive('/blogs') ? 'active' : ''}`}
      >
        Blog
      </Link>
      <Link
        to="/about"
        className={`nav-link ${isActive('/about') ? 'active' : ''}`}
      >
        About
      </Link>
    </nav>
  );
}

function AnimatedRoutes() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Suspense fallback={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          minHeight: '60vh'
        }}>
          <div className="spinner" role="status" aria-label="Loading..." />
        </div>
      }>
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

          {/* Priority 1 Tool Routes */}
          <Route path="/youtube-best-time-to-upload" element={<BestTimeToUploadPage />} />
          <Route path="/youtube-ctr-calculator" element={<CtrCalculatorPage />} />
          <Route path="/youtube-cpm-calculator" element={<CpmCalculatorPage />} />
          <Route path="/youtube-rpm-calculator" element={<RpmCalculatorPage />} />
          <Route path="/youtube-video-duration-calculator" element={<VideoDurationCalculatorPage />} />
          <Route path="/youtube-thumbnail-downloader-hd" element={<ThumbnailDownloaderHdPage />} />
          <Route path="/youtube-thumbnail-preview" element={<ThumbnailPreviewPage />} />
          <Route path="/youtube-video-metadata-viewer" element={<VideoMetadataViewerPage />} />
          <Route path="/youtube-title-analyzer" element={<TitleAnalyzerPage />} />
          <Route path="/youtube-description-analyzer" element={<DescriptionAnalyzerPage />} />

          {/* 10 Keyword SEO Tool Routes */}
          <Route path="/youtube-search-volume-checker" element={<SearchVolumeCheckerPage />} />
          <Route path="/youtube-keyword-difficulty-checker" element={<KeywordDifficultyCheckerPage />} />
          <Route path="/youtube-trending-keywords-finder" element={<TrendingKeywordsFinderPage />} />
          <Route path="/youtube-related-keywords-generator" element={<RelatedKeywordsGeneratorPage />} />
          <Route path="/youtube-search-intent-analyzer" element={<SearchIntentAnalyzerPage />} />
          <Route path="/youtube-search-suggest-explorer" element={<SearchSuggestExplorerPage />} />
          <Route path="/youtube-autocomplete-generator" element={<AutocompleteGeneratorPage />} />
          <Route path="/youtube-question-keyword-finder" element={<QuestionKeywordFinderPage />} />
          <Route path="/youtube-keyword-grouper" element={<KeywordGrouperPage />} />
          <Route path="/youtube-keyword-cluster-generator" element={<KeywordClusterGeneratorPage />} />

          {/* 10 Competitor Analysis Tool Routes */}
          <Route path="/youtube-competitor-thumbnail-analyzer" element={<CompetitorThumbnailAnalyzerPage />} />
          <Route path="/youtube-competitor-title-extractor" element={<CompetitorTitleExtractorPage />} />
          <Route path="/youtube-competitor-description-extractor" element={<CompetitorDescriptionExtractorPage />} />
          <Route path="/youtube-competitor-hashtag-extractor" element={<CompetitorHashtagExtractorPage />} />
          <Route path="/youtube-competitor-upload-time-analyzer" element={<CompetitorUploadTimeAnalyzerPage />} />
          <Route path="/youtube-competitor-engagement-analyzer" element={<CompetitorEngagementAnalyzerPage />} />
          <Route path="/youtube-competitor-growth-estimator" element={<CompetitorGrowthEstimatorPage />} />
          <Route path="/youtube-similar-channel-finder" element={<SimilarChannelFinderPage />} />
          <Route path="/youtube-viral-video-finder" element={<ViralVideoFinderPage />} />
          <Route path="/youtube-channel-comparison-tool" element={<ChannelComparisonToolPage />} />

          {/* 10 Shorts Tool Routes */}
          <Route path="/youtube-shorts-hashtag-generator" element={<ShortsHashtagGeneratorPage />} />
          <Route path="/youtube-shorts-title-generator" element={<ShortsTitleGeneratorPage />} />
          <Route path="/youtube-shorts-caption-generator" element={<ShortsCaptionGeneratorPage />} />
          <Route path="/youtube-shorts-hook-analyzer" element={<ShortsHookAnalyzerPage />} />
          <Route path="/youtube-shorts-trend-finder" element={<ShortsTrendFinderPage />} />
          <Route path="/youtube-shorts-duration-optimizer" element={<ShortsDurationOptimizerPage />} />
          <Route path="/youtube-shorts-upload-time-calculator" element={<ShortsUploadTimeCalculatorPage />} />
          <Route path="/youtube-shorts-seo-checker" element={<ShortsSeoCheckerPage />} />
          <Route path="/youtube-shorts-keyword-finder" element={<ShortsKeywordFinderPage />} />
          <Route path="/youtube-shorts-performance-predictor" element={<ShortsPerformancePredictorPage />} />

          {/* Channel Audit Tool Routes (Priority 5) */}
          <Route path="/youtube-channel-health-checker" element={<ChannelHealthCheckerPage />} />
          <Route path="/youtube-channel-seo-auditor" element={<ChannelSeoAuditorPage />} />
          <Route path="/youtube-subscriber-growth-analyzer" element={<SubscriberGrowthAnalyzerPage />} />
          <Route path="/youtube-video-performance-auditor" element={<VideoPerformanceAuditorPage />} />
          <Route path="/youtube-upload-consistency-tracker" element={<UploadConsistencyTrackerPage />} />
          <Route path="/youtube-channel-niche-finder" element={<ChannelNicheFinderPage />} />
          <Route path="/youtube-channel-revenue-estimator" element={<ChannelRevenueEstimatorPage />} />
          <Route path="/youtube-channel-age-calculator" element={<ChannelAgeCalculatorPage />} />
          <Route path="/youtube-channel-score-calculator" element={<ChannelScoreCalculatorPage />} />

          {/* Live Stream & Community Tool Routes (Priority 6) */}
          <Route path="/youtube-live-stream-title-generator" element={<LiveStreamTitleGeneratorPage />} />
          <Route path="/youtube-community-post-generator" element={<CommunityPostGeneratorPage />} />
          <Route path="/youtube-stream-schedule-builder" element={<StreamScheduleBuilderPage />} />
          <Route path="/youtube-clip-title-generator" element={<ClipTitleGeneratorPage />} />
          <Route path="/youtube-membership-perks-generator" element={<MembershipPerksGeneratorPage />} />
          <Route path="/youtube-end-screen-optimizer" element={<EndScreenOptimizerPage />} />
          <Route path="/youtube-cards-cta-generator" element={<CardsCtaGeneratorPage />} />

          <Route path="/blogs" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

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
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

        {/* ── Sticky Header ── */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <img
                src="/images/app_logo_56.webp"
                srcSet="/images/app_logo_32.webp 32w, /images/app_logo_56.webp 56w, /images/app_logo_128.webp 128w"
                sizes="32px"
                width="32"
                height="32"
                alt="Youtube Comment Picker Logo"
                style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'block' }}
              />
              <span style={{
                fontSize: '15px',
                fontWeight: '700',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}>
                Youtube Comment Picker
              </span>
            </Link>

            {/* Nav + Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

              {/* Separator */}
              <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 4px' }} aria-hidden="true" />

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-icon"
                style={{ border: '1px solid var(--border)', borderRadius: '8px', flexShrink: 0 }}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              {/* Mobile menu toggle */}
              <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                style={{ border: 'none', cursor: 'pointer', color: 'var(--text-primary)', background: 'transparent' }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </header>

        {/* ── Main Content ── */}
        <AnimatedRoutes />

        {/* ── Footer ── */}
        <footer style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          padding: '24px 0',
          marginTop: 'auto',
        }}>
          <div className="container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>
              © 2026 Youtube Comment Picker. All rights reserved.
            </span>
            <nav aria-label="Footer navigation" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
              {[
                { label: 'About', to: '/about', isLink: true },
                { label: 'Contact', to: '/contact', isLink: true },
                { label: 'Blog', to: '/blogs', isLink: true },
              ].map(item => (
                <Link
                  key={item.label}
                  to={item.to}
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    transition: 'color 0.15s, background-color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {item.label}
                </Link>
              ))}
              {[
                { label: 'Disclaimer', onClick: () => setShowDisclaimer(true) },
                { label: 'Privacy Policy', onClick: () => setShowPrivacy(true) },
                { label: 'Terms of Service', onClick: () => setShowTerms(true) },
              ].map(item => (
                <span
                  key={item.label}
                  role="button"
                  tabIndex={0}
                  onClick={item.onClick}
                  onKeyDown={e => e.key === 'Enter' && item.onClick()}
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    transition: 'color 0.15s, background-color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {item.label}
                </span>
              ))}
            </nav>
          </div>
        </footer>

        {/* ── Modals ── */}
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
