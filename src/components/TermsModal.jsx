import React from 'react';
import { X, FileText } from 'lucide-react';

export default function TermsModal({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-title"
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
              <FileText size={18} style={{ color: 'var(--primary)' }} />
            </div>
            <h2 id="terms-title" className="modal-title">Terms of Service</h2>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-icon"
            aria-label="Close terms of service"
            style={{ border: 'none', color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '14px' }}>
          {[
            {
              title: '1. Acceptance of Terms',
              body: 'By accessing and using this Free Giveaway Tool, you accept and agree to be bound by the terms and provision of this agreement.',
            },
            {
              title: '2. Description of Service',
              body: 'We provide a free utility to fetch and randomly select comments from public social media posts. The service is provided "as is" without warranty of any kind.',
            },
            {
              title: '3. User Responsibilities',
              body: 'You agree to use this tool only for lawful purposes. You are solely responsible for ensuring your giveaways comply with local laws and the terms of service of the respective social media platforms (YouTube, Instagram, etc.).',
            },
            {
              title: '4. Limitation of Liability',
              body: 'We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including issues with API connectivity or un-fetched comments.',
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
