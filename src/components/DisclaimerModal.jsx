import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function DisclaimerModal({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="modal-panel animate-fade-in">
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--warning-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <AlertTriangle size={18} style={{ color: 'var(--warning)' }} />
            </div>
            <h2 id="disclaimer-title" className="modal-title">Disclaimer</h2>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-icon"
            aria-label="Close disclaimer"
            style={{ border: 'none', color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '14px' }}>
          <p style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
            <strong>Last Updated: June 10, 2026</strong>
          </p>

          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '20px', marginBottom: '8px' }}>Independent Tool</h3>
          <p style={{ marginBottom: '16px' }}>
            This website (Youtube Comment Picker Thumbnail Download Online) is an independent utility tool created to assist content creators. We are <strong>NOT</strong> affiliated, associated, authorized, endorsed by, or in any way officially connected with Google LLC, YouTube, Meta Platforms, Inc., Instagram, or any of their subsidiaries or affiliates.
          </p>

          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '20px', marginBottom: '8px' }}>Trademarks</h3>
          <p style={{ marginBottom: '16px' }}>
            The names YouTube, Instagram, and their related names, marks, emblems, and images are registered trademarks of their respective owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder of their product brand.
          </p>

          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '20px', marginBottom: '8px' }}>Fair Use & API Usage</h3>
          <p style={{ marginBottom: '16px' }}>
            Our tools interact with publicly available data using standard public APIs or public web protocols. We do not store, host, or claim ownership over any user comments, profile pictures, or video thumbnails generated or downloaded through our service. It is the responsibility of the user to ensure they have the right to download or use any generated content (such as thumbnails) according to the original copyright holder's licenses.
          </p>

          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '20px', marginBottom: '8px' }}>No Warranties</h3>
          <p style={{ marginBottom: '24px' }}>
            The information and tools provided by this website are on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or tool on the site.
          </p>

          <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
