import React from 'react';

export default function AboutPage() {
  return (
    <main className="container" style={{ padding: '40px 24px', maxWidth: '800px' }}>
      <div className="liquid-glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: 'var(--text-primary)' }}>
          About Us
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Welcome to Youtube Comment Picker! We are a dedicated platform built for creators, marketers, and community managers who want to engage with their audience in a fair and transparent way.
        </p>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>
          Our Mission
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Our mission is to simplify the process of running giveaways, contests, and sweepstakes on social media. We understand that manually picking a winner from thousands of comments is a tedious and error-prone process. We provide tools that are completely free, unbiased, and incredibly easy to use.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>
          What We Do
        </h2>
        <ul style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><strong>Random Comment Picker:</strong> Fairly select winners from YouTube, Instagram, and TikTok comments with powerful filtering options.</li>
          <li><strong>Thumbnail Downloader:</strong> Quickly grab high-quality thumbnails from any YouTube video.</li>
          <li><strong>Educational Content:</strong> We publish helpful blogs on growing your channel, engaging your audience, and running successful campaigns.</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>
          Why Trust Us?
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          We don't require your login credentials or ask for unnecessary permissions. Our tool uses official public APIs to ensure your data and your audience's privacy are always respected.
        </p>
      </div>
    </main>
  );
}
