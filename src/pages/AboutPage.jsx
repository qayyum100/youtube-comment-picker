import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Users, Zap, Globe, BookOpen,
  Youtube, Instagram, Hash, Star, CheckCircle2, Mail
} from 'lucide-react';

const stats = [
  { value: '50,000+', label: 'Creators Served' },
  { value: '35+', label: 'Free Tools' },
  { value: '2M+', label: 'Comments Processed' },
  { value: '100%', label: 'Free, Always' },
];

const values = [
  {
    icon: <ShieldCheck size={24} />,
    color: 'var(--success)',
    bg: 'rgba(16,185,129,0.08)',
    title: 'Privacy First',
    description: 'We never ask for your passwords or OAuth tokens. Every tool runs in your browser using only public APIs. Your viewers\' data never touches our servers.',
  },
  {
    icon: <Zap size={24} />,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    title: 'Built for Speed',
    description: 'Every tool is designed to return results in seconds, not minutes. We use optimized API batching and client-side processing to keep wait times minimal.',
  },
  {
    icon: <CheckCircle2 size={24} />,
    color: 'var(--primary)',
    bg: 'var(--primary-light)',
    title: 'Verifiable Fairness',
    description: 'Our random picker uses window.crypto.getRandomValues() — a cryptographically secure algorithm — so every giveaway draw is statistically provable and tamper-proof.',
  },
  {
    icon: <BookOpen size={24} />,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.08)',
    title: 'Continuously Updated',
    description: 'YouTube\'s API and policies change frequently. Our team monitors platform updates and ships fixes within 48 hours of any breaking changes to keep all tools functional.',
  },
];

const tools = [
  { icon: <Youtube size={18} />, name: 'YouTube Comment Picker', path: '/youtube-comment-picker' },
  { icon: <Instagram size={18} />, name: 'Instagram Comment Picker', path: '/instagram-comment-picker' },
  { icon: <Hash size={18} />, name: 'YouTube Tag Extractor', path: '/youtube-tag-extractor' },
  { icon: <Star size={18} />, name: 'Channel Analyzer', path: '/youtube-channel-analyzer' },
  { icon: <Globe size={18} />, name: 'Thumbnail Downloader', path: '/thumbnail-downloader' },
  { icon: <Users size={18} />, name: 'SEO Checker', path: '/youtube-seo-checker' },
];

export default function AboutPage() {
  return (
    <main className="page-wrapper" style={{ maxWidth: '900px' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0 0 16px 0', color: 'var(--text-primary)', lineHeight: 1.2 }}>
          About YouTube Comment Picker
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '620px', margin: '0 auto 36px auto' }}>
          We are a team of developers and content creators who built the tools we always wished existed — free, fast, privacy-respecting utilities for the YouTube creator community.
        </p>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
          {stats.map((stat, i) => (
            <div key={i} className="card" style={{ padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '500' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="card card-lg" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: 0, marginBottom: '16px' }}>Our Story</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          YouTube Comment Picker was started after we experienced firsthand how painful it is to run a fair giveaway without the right tools. The existing options were either unreliable, littered with ads, or required handing over YouTube account credentials — which is a massive security risk no creator should accept.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          We built our comment picker from the ground up using the official YouTube Data API v3, with one non-negotiable rule: <strong style={{ color: 'var(--text-primary)' }}>we never request login access to your account</strong>. All you need is the public video URL.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 0 }}>
          Since then, we have expanded to 35+ tools covering every aspect of YouTube channel management — from SEO and analytics to AI-powered content generation and thumbnail design. Every single tool remains free and requires no account registration.
        </p>
      </section>

      {/* Core Values */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px' }}>Our Core Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {values.map((v, i) => (
            <div key={i} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{v.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.65', margin: 0 }}>{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="card card-lg" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: 0, marginBottom: '16px' }}>How Our Tools Work</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          All of our tools are built around a strict "read-only, public data only" principle. We access YouTube's Data API v3 exclusively for operations that a logged-out user could perform manually in a browser — reading public comments, viewing public channel statistics, and fetching publicly available video metadata.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          For our random winner selection, we use <code style={{ background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em', color: 'var(--primary)' }}>window.crypto.getRandomValues()</code> — the same cryptographic random number generator used in banking and online gambling software.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 0 }}>
          Our AI-powered tools are powered by the Google Gemini API. These calls go through our secure backend server — your prompts are never stored or used for training purposes beyond the current session.
        </p>
      </section>

      {/* Tools Grid */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>Our Most Used Tools</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', marginTop: '4px', fontSize: '14px' }}>Explore our full suite of free YouTube creator tools.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {tools.map((tool, i) => (
            <Link
              key={i}
              to={tool.path}
              className="card card-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: '600', fontSize: '14px', transition: 'transform 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ color: 'var(--primary)', flexShrink: 0 }}>{tool.icon}</span>
              {tool.name}
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '16px' }}>
          <Link to="/" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>
            View all 35+ tools →
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="card card-lg" style={{ textAlign: 'center' }}>
        <Mail size={36} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: 0, marginBottom: '12px' }}>Get in Touch</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '460px', margin: '0 auto 24px auto', fontSize: '14px' }}>
          Have a feature request, found a bug, or want to discuss a partnership? We read every message and typically respond within 24 hours.
        </p>
        <Link to="/contact" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
          Contact Us
        </Link>
      </section>
    </main>
  );
}
