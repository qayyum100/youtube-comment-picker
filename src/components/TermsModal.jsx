import React from 'react';
import { X } from 'lucide-react';

export default function TermsModal({ onClose }) {
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
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Terms of Service</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '20px', overflowY: 'auto', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using this Free Giveaway Tool, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h3>2. Description of Service</h3>
          <p>We provide a free utility to fetch and randomly select comments from public social media posts. The service is provided "as is" without warranty of any kind.</p>
          
          <h3>3. User Responsibilities</h3>
          <p>You agree to use this tool only for lawful purposes. You are solely responsible for ensuring your giveaways comply with local laws and the terms of service of the respective social media platforms (YouTube, Instagram, etc.).</p>

          <h3>4. Limitation of Liability</h3>
          <p>We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including issues with API connectivity or un-fetched comments.</p>
        </div>
      </div>
    </div>
  );
}
