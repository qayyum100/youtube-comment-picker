import React from 'react';
import SeoHead from '../components/SeoHead';
import { FileText, CheckCircle2, AlertCircle, Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      <SeoHead
        customTitle="Terms of Use — YouTube Giveaway Picker Suite"
        customDescription="Terms of service and usage policy for YouTube Giveaway Picker & Creator Tools."
        canonicalUrl="/terms"
      />
      <main className="page-wrapper" style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>Terms of Use</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Please read these terms carefully before using our free YouTube creator tools.
            </p>
          </div>

          <div className="card" style={{ padding: '32px', marginBottom: '32px', lineHeight: '1.7', fontSize: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--primary)' }}>
              <Scale size={24} />
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>1. Acceptable Tool Usage</h2>
            </div>
            <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
              Our YouTube comment picker, giveaway tools, and SEO utility suite are provided 100% free for individual content creators, marketing agencies, and community managers. You agree not to abuse, automatedly spam, or scrape our API endpoints.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--primary)' }}>
              <CheckCircle2 size={24} />
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>2. Giveaway Accuracy & Randomness</h2>
            </div>
            <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
              Our YouTube giveaway winner selection algorithm relies on `window.crypto.getRandomValues()` to guarantee cryptographically secure random winner generation. While we fetch all public comments available via YouTube API v3, creators are responsible for complying with YouTube's official Contest Policies & Guidelines when hosting giveaways.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--primary)' }}>
              <AlertCircle size={24} />
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>3. Disclaimer of Warranties</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              All tools are provided "as is" without warranty of any kind. We do not guarantee uninterrupted uptime or specific SEO ranking increases from using our title, tag, or description generators.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
