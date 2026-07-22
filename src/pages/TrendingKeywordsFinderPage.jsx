import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Flame, TrendingUp, Sparkles } from 'lucide-react';

export default function TrendingKeywordsFinderPage() {
  const [niche, setNiche] = useState('gaming');

  const trendingMap = {
    gaming: ['gta 6 gameplay trailer', 'palworld best base', 'helldivers 2 solo guide', 'fortnite season 2 secrets'],
    tech: ['ai agents tutorial', 'm3 max macbook review', 'best camera 2026', 'chatgpt 5 leaks'],
    finance: ['stock market crash 2026', 'crypto bull run strategy', 'passive income ideas', 'high yield savings accounts']
  };

  const list = trendingMap[niche] || trendingMap.gaming;

  return (
    <>
      <SeoHead pageType="tool" title="Trending Keywords Finder — Discover Breakout Search Topics" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Trending Keywords Finder
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Discover real-time breakout search terms trending across YouTube algorithms.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Select Niche</label>
              <select value={niche} onChange={(e) => setNiche(e.target.value)} style={{ padding: '10px', width: '100%', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <option value="gaming">Gaming</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {list.map((kw, idx) => (
                <div key={idx} style={{ padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600' }}>🔥 {kw}</span>
                  <span style={{ fontSize: '13px', color: 'var(--success)', fontWeight: '700' }}>Breakout (+340%)</span>
                </div>
              ))}
            </div>
          </div>

          <FaqSection customFaqs={toolFaqs.trendingKeywordsFinder || []} title="Frequently Asked Questions — Trending Keywords" />
        </div>
      </main>
    </>
  );
}
