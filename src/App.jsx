import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PrivacyModal from './components/PrivacyModal';
import TermsModal from './components/TermsModal';
import DisclaimerModal from './components/DisclaimerModal';
import { Download, Gift, BookOpen, Sun, Moon, Menu, X } from 'lucide-react';

const CommentPickerPage = lazy(() => import('./pages/CommentPickerPage'));
const ThumbnailDownloaderPage = lazy(() => import('./pages/ThumbnailDownloaderPage'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

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
        Comment Picker
      </Link>
      <Link to="/thumbnail-downloader" style={navLinkStyle('/thumbnail-downloader')} className="liquid-glass hover:scale-105 transition-transform">
        <Download size={16} />
        Thumbnail Downloader
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

const pageVariants = {
  initial: { opacity: 0, scale: 0.96, filter: 'blur(10px)' },
  in: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  out: { opacity: 0, scale: 1.04, filter: 'blur(10px)' }
};

const pageTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 148px)' }}
      >
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}><motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--glow-primary)', filter: 'blur(10px)' }} /></div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<CommentPickerPage defaultPlatform="youtube" />} />
            <Route path="/youtube-comment-picker" element={<CommentPickerPage defaultPlatform="youtube" />} />
            <Route path="/instagram-comment-picker" element={<CommentPickerPage defaultPlatform="instagram" />} />
            <Route path="/tiktok-comment-picker" element={<CommentPickerPage defaultPlatform="tiktok" />} />
            <Route path="/thumbnail-downloader" element={<ThumbnailDownloaderPage />} />
            <Route path="/blogs" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 15 });
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.2,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'var(--glow-primary)' : 'var(--glow-success)',
            filter: 'blur(80px)',
          }}
        />
      ))}
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
      <CursorGlowTracker />
      <FloatingParticles />
      
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
          borderRight: 'none'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <motion.img 
                whileHover={{ scale: 1.1, rotate: 5 }}
                src="/images/app_logo_56.webp" 
                srcSet="/images/app_logo_32.webp 32w, /images/app_logo_56.webp 56w, /images/app_logo_128.webp 128w"
                sizes="32px"
                width="32"
                height="32"
                alt="Youtube Comment Picker Logo" 
                style={{ width: '32px', height: '32px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} 
              />
              <span style={{ fontSize: '1.2rem', fontWeight: '600', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                Youtube Comment Picker
              </span>
            </Link>

            {/* Navigation links & Theme Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
                }}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>
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

      </div>
    </BrowserRouter>
  );
}
