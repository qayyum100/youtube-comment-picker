import React from 'react';
import { ShieldCheck, EyeOff, HardDrive, HelpCircle } from 'lucide-react';

export default function EeatGrid() {
  return (
    <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-dark)', paddingTop: '40px', paddingBottom: '60px' }} className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Security & Transparency Framework</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
          This Picker is built following strict E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) industry standards.
        </p>
      </div>

      <div className="eeat-grid">
        {/* Card 1: Unbiased Randomness */}
        <div className="card-premium">
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(236, 72, 153, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <ShieldCheck size={20} color="#ec4899" />
          </div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Unbiased Cryptographic Rolls</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
            Winner selections are calculated using JavaScript's cryptographically secure pseudo-random number generator API 
            (<code>window.crypto.getRandomValues</code>), guaranteeing unbiased drawing chance for every participant.
          </p>
        </div>

        {/* Card 2: Zero Password Collection */}
        <div className="card-premium">
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(249, 115, 22, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <EyeOff size={20} color="#f97316" />
          </div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No OAuth or Passwords Needed</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
            We prioritize creator security. This platform never asks you to log in with your social accounts, 
            nor does it request write scopes, passwords, or session cookies, keeping your channels safe from hijacking.
          </p>
        </div>

        {/* Card 3: Browser-Bound Storage */}
        <div className="card-premium">
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <HardDrive size={20} color="#3b82f6" />
          </div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Local-Storage Bound</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
            All draw histories, custom prize designations, and configuration parameters are cached inside your browser's local sandbox. 
            We do not transmit user entries to external analytics databases.
          </p>
        </div>
      </div>

      {/* FAQ Grid */}
      <div style={{ marginTop: '50px' }}>
        <h3 style={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '24px' }}>Raffle Picker Knowledge Base</h3>
        <div className="grid-cols-2">
          <div style={{ border: '1px solid var(--border-dark)', padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: '#0d0d0f' }}>
            <h4 style={{ fontSize: '1rem', color: '#ec4899', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <HelpCircle size={16} />
              How do I use keyword filters?
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Simply enter a required word or hashtag (e.g. <code>#giveaway</code>) into the filter panel. Comments that do not contain this precise string will be ignored from the final drawing.
            </p>
          </div>
          <div style={{ border: '1px solid var(--border-dark)', padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: '#0d0d0f' }}>
            <h4 style={{ fontSize: '1rem', color: '#f97316', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <HelpCircle size={16} />
              What is the difference between Fair and Boost modes?
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              <strong>Fair Mode</strong> registers exactly one entry per user handle (filtering out duplicate comments). <strong>Boost Mode</strong> allows a user's comments to count multiple times, acting as extra lottery tickets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
