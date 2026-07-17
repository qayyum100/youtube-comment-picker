import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Slight delay so it doesn't flash on first paint
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="alertdialog"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 48px)',
        maxWidth: '680px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 9999,
        flexWrap: 'wrap',
        animation: 'fadeInUp 0.35s ease-out both',
      }}
    >
      <p style={{
        flex: '1 1 200px',
        margin: 0,
        fontSize: '13px',
        color: 'var(--text-secondary)',
        lineHeight: '1.5',
      }}>
        We use cookies to enhance your experience and analyze traffic. By clicking "Accept", you consent to our use of cookies.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={handleAccept}
          className="btn btn-primary btn-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
