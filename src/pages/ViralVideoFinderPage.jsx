import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Flame, PlaySquare } from 'lucide-react';

export default function ViralVideoFinderPage() {
  const [topic, setTopic] = useState('');
  const [viralVideos, setViralVideos] = useState([]);

  const handleFind = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setViralVideos([
      { title: 'I Tested The Secret Algorithm Multiplier (10M Views in 48 Hours)', views: '4.5M', vph: '45,000 views/hr', multiplier: '12.5x vs Avg' },
      { title: 'Why Everyone Is Quitting YouTube (The Dark Truth)', views: '2.8M', vph: '28,000 views/hr', multiplier: '8.2x vs Avg' }
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Viral Video Finder — Discover Breakout YouTube Videos" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Viral Video Finder
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Uncover outlier videos performing 5x-20x above a channel's baseline view average.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleFind} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter Niche or Keyword"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Find Outlier Videos</button>
            </form>

            {viralVideos.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {viralVideos.map((v, i) => (
                  <div key={i} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '6px' }}>🔥 {v.title}</div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                      <span><strong>Total Views:</strong> {v.views}</span>
                      <span><strong>Speed:</strong> {v.vph}</span>
                      <span style={{ color: 'var(--success)', fontWeight: '700' }}>{v.multiplier}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.viralVideoFinder || []} title="Frequently Asked Questions — Viral Videos" />
        </div>
      </main>
    </>
  );
}
