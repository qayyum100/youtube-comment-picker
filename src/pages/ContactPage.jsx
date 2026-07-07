import React from 'react';

export default function ContactPage() {
  return (
    <main className="container" style={{ padding: '40px 24px', maxWidth: '800px' }}>
      <div className="liquid-glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: 'var(--text-primary)' }}>
          Contact Us
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Have a question, feedback, or a partnership inquiry? We'd love to hear from you. Please reach out using the information below.
        </p>

        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Email Us</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              For general inquiries and support, email us at: <br/>
              <a href="mailto:support@youtubecommentpicker.com" style={{ color: 'var(--glow-primary)', textDecoration: 'none', fontWeight: '500' }}>support@youtubecommentpicker.com</a>
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', margin: '16px 0 8px 0' }}>Business Inquiries</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              For partnerships and advertising, contact: <br/>
              <a href="mailto:business@youtubecommentpicker.com" style={{ color: 'var(--glow-primary)', textDecoration: 'none', fontWeight: '500' }}>business@youtubecommentpicker.com</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
