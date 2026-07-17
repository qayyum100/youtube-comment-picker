import React from 'react';
import { ShieldCheck, EyeOff, HardDrive } from 'lucide-react';

export default function EeatGrid() {
  const trustCards = [
    {
      icon: <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />,
      title: 'Unbiased Cryptographic Rolls',
      description: (
        <>
          Winner selections are calculated using JavaScript's cryptographically secure
          pseudo-random number generator API (<code style={{ fontFamily: 'monospace', fontSize: '12px', background: 'var(--bg-tertiary)', padding: '1px 5px', borderRadius: '4px' }}>window.crypto.getRandomValues</code>),
          guaranteeing unbiased drawing chance for every participant.
        </>
      ),
    },
    {
      icon: <EyeOff size={20} style={{ color: 'var(--primary)' }} />,
      title: 'No OAuth or Passwords Needed',
      description: 'We prioritize creator security. This platform never asks you to log in with your social accounts, nor does it request write scopes, passwords, or session cookies, keeping your channels safe from hijacking.',
    },
    {
      icon: <HardDrive size={20} style={{ color: 'var(--primary)' }} />,
      title: 'Local-Storage Bound',
      description: 'All draw histories, custom prize designations, and configuration parameters are cached inside your browser\'s local sandbox. We do not transmit user entries to external analytics databases.',
    },
  ];

  return (
    <div style={{ marginTop: '48px', borderTop: '1px solid var(--border)', paddingTop: '48px', paddingBottom: '48px' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 className="section-heading" style={{ marginBottom: '10px' }}>
          Security & Transparency Framework
        </h2>
        <p className="section-subheading" style={{ maxWidth: '580px', margin: '0 auto' }}>
          Built following strict E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) industry standards.
        </p>
      </div>

      {/* Cards */}
      <div className="grid-cols-3">
        {trustCards.map((item, i) => (
          <div key={i} className="card" style={{ padding: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Knowledge Base */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', textAlign: 'center', marginBottom: '24px', color: 'var(--text-primary)' }}>
          Raffle Picker Knowledge Base
        </h3>
        <div className="grid-cols-2">
          <div style={{
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--primary)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              How do I use keyword filters?
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
              Simply enter a required word or hashtag (e.g.{' '}
              <code style={{ fontFamily: 'monospace', fontSize: '12px', background: 'var(--bg-tertiary)', padding: '1px 5px', borderRadius: '4px' }}>#giveaway</code>)
              into the filter panel. Comments that do not contain this precise string will be ignored from the final drawing.
            </p>
          </div>
          <div style={{
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--primary)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              What is the difference between Fair and Boost modes?
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
              <strong>Fair Mode</strong> registers exactly one entry per user handle (filtering out duplicate comments).{' '}
              <strong>Boost Mode</strong> allows a user's comments to count multiple times, acting as extra lottery tickets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
