import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Flame, TrendingUp } from 'lucide-react';

export default function ShortsTrendFinderPage() {
  const [niche, setNiche] = useState('all');

  const trends = [
    { title: 'POV: You tried the new AI feature', format: 'POV Meme', viralScore: '98/100' },
    { title: '3 Mistakes everyone makes in 2026', format: 'Educational Listicle', viralScore: '94/100' },
    { title: 'Wait for the unexpected ending...', format: 'Suspense Challenge', viralScore: '91/100' }
  ];

  return (
    <>
      <SeoHead pageType="tool" title="Shorts Trend Finder — Discover Viral Shorts Formats" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Shorts Trend Finder
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Discover trending audio, viral formats, and challenge concepts on YouTube Shorts.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {trends.map((t, idx) => (
                <div key={idx} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '16px' }}>🔥 {t.title}</strong>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Format: {t.format}</div>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--success)' }}>{t.viralScore}</span>
                </div>
              ))}
            </div>
          </div>

          <FaqSection customFaqs={toolFaqs.shortsTrendFinder || []} title="Frequently Asked Questions — Shorts Trends" />
        </div>
      </main>
    </>
  );
}
