import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ChannelNicheFinderPage() {
  const [keywords, setKeywords] = useState('');
  const [niches, setNiches] = useState([]);

  const handleFind = (e) => {
    e.preventDefault();
    if (!keywords.trim()) return;
    setNiches([
      { niche: 'AI Productivity Tools', competition: 'Medium', opportunity: 'Very High', cpm: '$18-$32' },
      { niche: 'Beginner Side Hustles', competition: 'High', opportunity: 'High', cpm: '$12-$22' },
      { niche: 'Software Tutorials', competition: 'Medium', opportunity: 'High', cpm: '$20-$40' }
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Channel Niche Finder — Discover Profitable YouTube Niches" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Channel Niche Finder</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Discover profitable, low-competition YouTube niches with high CPM potential for new and growing channels.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleFind} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input type="text" placeholder="Enter your interests or skills (e.g. 'tech, finance, fitness')" value={keywords} onChange={(e) => setKeywords(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <button type="submit" className="btn btn-primary">Find Niches</button>
            </form>
            {niches.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {niches.map((n, i) => (
                  <div key={i} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div><strong style={{ fontSize: '16px' }}>🎯 {n.niche}</strong></div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                      <span>Competition: <strong>{n.competition}</strong></span>
                      <span>Opportunity: <strong style={{ color: 'var(--success)' }}>{n.opportunity}</strong></span>
                      <span>CPM: <strong style={{ color: 'var(--warning)' }}>{n.cpm}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.channelNicheFinder || []} title="FAQs — Channel Niche Finder" />
        </div>
      </main>
    </>
  );
}
