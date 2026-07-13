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
    icon: <ShieldCheck size={28} />,
    color: '#10b981',
    title: 'Privacy First',
    description: 'We never ask for your passwords or OAuth tokens. Every tool runs in your browser using only public APIs. Your viewers\' data never touches our servers.',
  },
  {
    icon: <Zap size={28} />,
    color: '#f59e0b',
    title: 'Built for Speed',
    description: 'Every tool is designed to return results in seconds, not minutes. We use optimized API batching and client-side processing to keep wait times minimal.',
  },
  {
    icon: <CheckCircle2 size={28} />,
    color: '#6366f1',
    title: 'Verifiable Fairness',
    description: 'Our random picker uses window.crypto.getRandomValues() — a cryptographically secure algorithm — so every giveaway draw is statistically provable and tamper-proof.',
  },
  {
    icon: <BookOpen size={28} />,
    color: '#ec4899',
    title: 'Continuously Updated',
    description: 'YouTube\'s API and policies change frequently. Our team monitors platform updates and ships fixes within 48 hours of any breaking changes to keep all tools functional.',
  },
];

const tools = [
  { icon: <Youtube size={20} />, name: 'YouTube Comment Picker', path: '/youtube-comment-picker' },
  { icon: <Instagram size={20} />, name: 'Instagram Comment Picker', path: '/instagram-comment-picker' },
  { icon: <Hash size={20} />, name: 'YouTube Tag Extractor', path: '/youtube-tag-extractor' },
  { icon: <Star size={20} />, name: 'Channel Analyzer', path: '/youtube-channel-analyzer' },
  { icon: <Globe size={20} />, name: 'Thumbnail Downloader', path: '/thumbnail-downloader' },
  { icon: <Users size={20} />, name: 'SEO Checker', path: '/youtube-seo-checker' },
];

export default function AboutPage() {
  return (
    <main style={{ padding: '40px 0', maxWidth: '900px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '0 0 16px 0', color: 'var(--text-primary)', lineHeight: 1.2 }}>
          About YouTube Comment Picker
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '650px', margin: '0 auto 32px auto' }}>
          We are a team of developers and content creators who built the tools we always wished existed — free, fast, privacy-respecting utilities for the YouTube creator community.
        </p>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
          {stats.map((stat, i) => (
            <div key={i} className="liquid-glass" style={{ padding: '24px 16px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="liquid-glass" style={{ padding: '40px', borderRadius: 'var(--radius-xl)', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: 0, marginBottom: '16px' }}>
          Our Story
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          YouTube Comment Picker was started after we experienced firsthand how painful it is to run a fair giveaway without the right tools. The existing options were either unreliable, littered with ads, or required handing over YouTube account credentials — which is a massive security risk no creator should accept.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          We built our comment picker from the ground up using the official YouTube Data API v3, with one non-negotiable rule: <strong style={{ color: 'var(--text-primary)' }}>we never request login access to your account</strong>. All you need is the public video URL. The tool fetches publicly available comment data and processes it entirely inside your browser.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 0 }}>
          Since then, we have expanded to 35+ tools covering every aspect of YouTube channel management — from SEO and analytics to AI-powered content generation and thumbnail design. Every single tool remains free and requires no account registration.
        </p>
      </section>

      {/* Core Values */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '24px' }}>
          Our Core Values
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {values.map((v, i) => (
            <div key={i} className="liquid-glass" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${v.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                {v.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.65', margin: 0 }}>
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="liquid-glass" style={{ padding: '40px', borderRadius: 'var(--radius-xl)', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: 0, marginBottom: '16px' }}>
          How Our Tools Work
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          All of our tools are built around a strict "read-only, public data only" principle. We access YouTube's Data API v3 exclusively for operations that a logged-out user could perform manually in a browser — reading public comments, viewing public channel statistics, and fetching publicly available video metadata.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          For our random winner selection, we use <code style={{ background: 'var(--bg-surface)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>window.crypto.getRandomValues()</code> — the same cryptographic random number generator used in banking and online gambling software. This ensures that every draw is statistically fair and cannot be predicted or manipulated, even by us.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 0 }}>
          Our AI-powered tools (title generators, description writers, script tools) are powered by the Google Gemini API. These calls go through our secure backend server — your prompts are never stored or used for training purposes beyond the current session.
        </p>
      </section>

      {/* Tools Grid */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Our Most Used Tools
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', marginTop: 0 }}>
          Explore our full suite of free YouTube creator tools.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
          {tools.map((tool, i) => (
            <Link
              key={i}
              to={tool.path}
              className="liquid-glass"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: '500', transition: 'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ color: 'var(--glow-primary)' }}>{tool.icon}</span>
              {tool.name}
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '16px' }}>
          <Link to="/" style={{ color: 'var(--glow-primary)', fontWeight: '600', textDecoration: 'none' }}>
            View all 35+ tools →
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="liquid-glass" style={{ padding: '40px', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
        <Mail size={40} style={{ color: 'var(--glow-primary)', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: 0, marginBottom: '12px' }}>
          Get in Touch
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 24px auto' }}>
          Have a feature request, found a bug, or want to discuss a partnership? We read every message and typically respond within 24 hours.
        </p>
        <Link
          to="/contact"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'var(--gradient-primary)', color: 'white', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }}
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}
