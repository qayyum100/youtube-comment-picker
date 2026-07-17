import React from 'react';
import { X, Shield } from 'lucide-react';

export default function PrivacyModal({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
    >
      <div className="modal-panel animate-fade-in">
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Shield size={18} style={{ color: 'var(--primary)' }} />
            </div>
            <h2 id="privacy-title" className="modal-title">Privacy Policy</h2>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-icon"
            aria-label="Close privacy policy"
            style={{ border: 'none', color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '14px' }}>
          {[
            {
              title: '1. Information Collection',
              body: 'We do not collect, store, or process any personal data, passwords, or login tokens. All processing happens entirely in your browser or through standard, non-authenticated public APIs.',
            },
            {
              title: '2. Use of Data',
              body: 'The YouTube or Instagram URLs you provide are strictly used to fetch public comments temporarily for the giveaway draw. Once you refresh the page, all data is cleared.',
            },
            {
              title: '3. Cookies and Tracking',
              body: 'We use standard local storage to save your filter preferences (such as minimum likes or exclusion lists) to improve your experience. No tracking cookies are deployed.',
            },
            {
              title: '4. Third-Party Services',
              body: 'We interact with YouTube and Instagram public data endpoints. We are not affiliated with, endorsed by, or sponsored by Google, YouTube, Meta, or Instagram.',
            },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {section.title}
              </h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
