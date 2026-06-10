import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function DisclaimerModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="card-premium animate-fade-in" style={{
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={24} />
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ color: 'var(--brand-indigo)' }}>
            <AlertTriangle size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>Disclaimer</h2>
        </div>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '16px' }}><strong>Last Updated: June 10, 2026</strong></p>
          
          <h3 style={{ color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>Independent Tool</h3>
          <p style={{ marginBottom: '16px' }}>
            This website (Youtube Comment Picker Thumbnail Download Online) is an independent utility tool created to assist content creators. We are <strong>NOT</strong> affiliated, associated, authorized, endorsed by, or in any way officially connected with Google LLC, YouTube, Meta Platforms, Inc., Instagram, or any of their subsidiaries or affiliates.
          </p>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>Trademarks</h3>
          <p style={{ marginBottom: '16px' }}>
            The names YouTube, Instagram, and their related names, marks, emblems, and images are registered trademarks of their respective owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder of their product brand.
          </p>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>Fair Use & API Usage</h3>
          <p style={{ marginBottom: '16px' }}>
            Our tools interact with publicly available data using standard public APIs or public web protocols. We do not store, host, or claim ownership over any user comments, profile pictures, or video thumbnails generated or downloaded through our service. It is the responsibility of the user to ensure they have the right to download or use any generated content (such as thumbnails) according to the original copyright holder's licenses.
          </p>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>No Warranties</h3>
          <p style={{ marginBottom: '16px' }}>
            The information and tools provided by this website are on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or tool on the site.
          </p>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button className="btn-primary" onClick={onClose} style={{ width: '100%', padding: '12px' }}>
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
