import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      right: '24px',
      backgroundColor: 'var(--glass-bg-base)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: 'var(--glass-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px 24px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      boxShadow: 'var(--glass-shadow)',
      zIndex: 9999,
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: '1 1 min-content' }}>
        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          onClick={handleAccept}
          className="liquid-glass"
          style={{
            padding: '8px 24px',
            backgroundColor: 'var(--glow-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
