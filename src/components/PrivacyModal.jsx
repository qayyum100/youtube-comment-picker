import React from 'react';
import { X } from 'lucide-react';

export default function PrivacyModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff', border: '1px solid var(--border-dark)',
        borderRadius: 'var(--radius-lg)', maxWidth: '600px', width: '100%',
        maxHeight: '80vh', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{
          padding: '20px', borderBottom: '1px solid var(--border-dark)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Privacy Policy</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '20px', overflowY: 'auto', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <h3>1. Information Collection</h3>
          <p>We do not collect, store, or process any personal data, passwords, or login tokens. All processing happens entirely in your browser or through standard, non-authenticated public APIs.</p>
          
          <h3>2. Use of Data</h3>
          <p>The YouTube or Instagram URLs you provide are strictly used to fetch public comments temporarily for the giveaway draw. Once you refresh the page, all data is cleared.</p>
          
          <h3>3. Cookies and Tracking</h3>
          <p>We use standard local storage to save your filter preferences (such as minimum likes or exclusion lists) to improve your experience. No tracking cookies are deployed.</p>

          <h3>4. Third-Party Services</h3>
          <p>We interact with YouTube and Instagram public data endpoints. We are not affiliated with, endorsed by, or sponsored by Google, YouTube, Meta, or Instagram.</p>
        </div>
      </div>
    </div>
  );
}
