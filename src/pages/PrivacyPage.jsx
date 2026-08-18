import React from 'react';
import SeoHead from '../components/SeoHead';
import { Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <>
      <SeoHead
        customTitle="Privacy Policy — YouTube Giveaway Picker Suite"
        customDescription="Official privacy policy for YouTube Giveaway Picker & Creator Tools. Learn how we handle YouTube API data, browser cookies, and protect user privacy."
        canonicalUrl="/privacy"
      />
      <main className="page-wrapper" style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>Privacy Policy</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Last updated: January 2026. Your privacy and data security are fundamental to our tools.
            </p>
          </div>

          <div className="card" style={{ padding: '32px', marginBottom: '32px', lineHeight: '1.7', fontSize: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--primary)' }}>
              <Shield size={24} />
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>1. Information We Do Not Collect</h2>
            </div>
            <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
              We do not collect, store, or sell any personal identifying information. You are never required to log in, create an account, or grant OAuth permission tokens to use any tool on YouTube Giveaway Picker.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--primary)' }}>
              <Eye size={24} />
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>2. How YouTube & Third-Party Data is Handled</h2>
            </div>
            <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
              When you paste a YouTube video URL or channel link into our tools:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
              <li>The public YouTube Data API v3 fetches video comments and metadata strictly in real time.</li>
              <li>Data is processed in-memory for your active giveaway or analysis session.</li>
              <li>No comment logs or user profiles are saved to server databases.</li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--primary)' }}>
              <Lock size={24} />
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>3. Browser Local Storage & Advertising</h2>
            </div>
            <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
              We use standard browser `localStorage` solely to preserve your tool settings (such as dark mode preferences or giveaway keyword filters). We use Google AdSense to serve non-intrusive advertisements to keep our suite 100% free. Google AdSense may use cookies to serve ads based on prior visits.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--primary)' }}>
              <FileText size={24} />
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>4. Third-Party Platform Disclaimer</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              YouTube Giveaway Picker is an independent creator utility suite. We are not affiliated with, endorsed by, or sponsored by Google LLC, YouTube, Meta, or Instagram. All YouTube trademarks belong to Google LLC.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
