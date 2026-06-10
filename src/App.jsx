import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import CommentPickerPage from './pages/CommentPickerPage';
import ThumbnailDownloaderPage from './pages/ThumbnailDownloaderPage';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyModal from './components/PrivacyModal';
import TermsModal from './components/TermsModal';
import DisclaimerModal from './components/DisclaimerModal';
import { Download, Gift, BookOpen, Sun, Moon } from 'lucide-react';

function Navigation() {
  const location = useLocation();

  const navLinkStyle = (path) => ({
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: location.pathname === path ? '#ffffff' : 'var(--text-secondary)',
    backgroundColor: location.pathname === path ? 'var(--brand-indigo)' : 'transparent',
    transition: 'all 0.2s ease'
  });

  return (
    <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Link to="/" style={navLinkStyle('/')}>
        <Gift size={16} />
        Comment Picker
      </Link>
      <Link to="/thumbnail-downloader" style={navLinkStyle('/thumbnail-downloader')}>
        <Download size={16} />
        Thumbnail Downloader
      </Link>
      <Link to="/blogs" style={navLinkStyle(location.pathname.startsWith('/blog') ? location.pathname : '/blogs')}>
        <BookOpen size={16} />
        Blogs
      </Link>
    </nav>
  );
}

export default function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Shared Premium Header */}
        <header style={{
          borderBottom: '1px solid var(--border-dark)',
          padding: '16px 0',
          backgroundColor: 'var(--bg-card)',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/images/app_logo.png" alt="Youtube Comment Picker Logo" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--brand-indigo)' }}>
                Youtube Comment Picker
              </span>
            </Link>

            {/* Navigation links & Theme Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Navigation />
              <button 
                onClick={toggleTheme} 
                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-dark)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <Routes>
          <Route path="/" element={<CommentPickerPage />} />
          <Route path="/thumbnail-downloader" element={<ThumbnailDownloaderPage />} />
          <Route path="/blogs" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>

        {/* Shared Footer */}
        <footer style={{
          borderTop: '1px solid var(--border-dark)',
          padding: '24px 0',
          backgroundColor: 'var(--bg-panel)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginTop: 'auto'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <span>© 2026 Youtube Comment Picker. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Link to="/blogs" style={{ color: 'inherit', textDecoration: 'none' }}>Blogs</Link>
              <span style={{ cursor: 'pointer' }} onClick={() => setShowDisclaimer(true)}>Disclaimer</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setShowPrivacy(true)}>Privacy Policy</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setShowTerms(true)}>Terms of Service</span>
            </div>
          </div>
        </footer>

        {/* Modals */}
        {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
        {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
        {showDisclaimer && <DisclaimerModal onClose={() => setShowDisclaimer(false)} />}

      </div>
    </BrowserRouter>
  );
}
