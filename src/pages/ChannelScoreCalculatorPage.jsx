import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ChannelScoreCalculatorPage() {
  const [subs, setSubs] = useState('');
  const [avgViews, setAvgViews] = useState('');
  const [videos, setVideos] = useState('');
  const [score, setScore] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const s = parseInt(subs) || 0;
    const v = parseInt(avgViews) || 0;
    const n = parseInt(videos) || 1;
    const viewRatio = (v / (s || 1)) * 100;
    const base = Math.min(100, Math.round((viewRatio * 2) + (Math.log10(n + 1) * 10)));
    setScore({
      total: `${base}/100`,
      viewRatio: `${viewRatio.toFixed(1)}% (Views per Sub)`,
      verdict: base >= 80 ? '🔥 Elite Channel Performance' : base >= 60 ? '✅ Strong Channel' : '⚠️ Needs Improvement',
      tip: viewRatio < 10 ? 'Boost titles & thumbnails to drive more clicks from existing subscribers.' : 'Focus on growing new subscribers to match strong view performance.'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Channel Score Calculator — Rate Your YouTube Channel Performance" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Channel Score Calculator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Calculate an overall performance score for your YouTube channel based on views, subscribers, and content volume.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleCalculate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <input type="number" placeholder="Total Subscribers" value={subs} onChange={(e) => setSubs(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <input type="number" placeholder="Avg Views per Video" value={avgViews} onChange={(e) => setAvgViews(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <input type="number" placeholder="Total Videos" value={videos} onChange={(e) => setVideos(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <button type="submit" className="btn btn-primary">Calculate Score</button>
            </form>
            {score && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '24px', fontWeight: '800', color: 'var(--primary)', textAlign: 'center' }}>
                  Channel Score: {score.total}
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}><strong>Verdict:</strong> {score.verdict}</div>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}><strong>View Ratio:</strong> {score.viewRatio}</div>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--primary)', fontWeight: '600' }}>💡 {score.tip}</div>
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.channelScoreCalculator || []} title="FAQs — Channel Score Calculator" />
        </div>
      </main>
    </>
  );
}
