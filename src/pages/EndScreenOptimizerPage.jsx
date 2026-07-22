import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function EndScreenOptimizerPage() {
  const [videoLength, setVideoLength] = useState('');
  const [goal, setGoal] = useState('subscribe');
  const [plan, setPlan] = useState(null);

  const handleOptimize = (e) => {
    e.preventDefault();
    const len = parseInt(videoLength) || 0;
    const endScreenStart = Math.max(len - 20, len * 0.8);
    setPlan({
      startAt: `${Math.floor(endScreenStart / 60)}:${String(Math.round(endScreenStart % 60)).padStart(2, '0')}`,
      elements: goal === 'subscribe'
        ? ['✅ Subscribe Button (Center)', '📺 Best For Viewer Video (Right)', '📌 Latest Upload (Left)']
        : ['📺 Playlist Card (Center-Large)', '✅ Subscribe Button (Bottom-Right)', '🔗 Related Video (Left)'],
      tip: 'Fade music out at end screen start. Add a verbal CTA 5 seconds before the end screen appears.'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="End Screen Optimizer — YouTube End Screen Layout Planner" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>End Screen Optimizer</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Plan the perfect YouTube end screen layout with timing, element placement, and CTA optimization.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleOptimize} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '24px' }}>
              <input type="number" placeholder="Video Length (seconds)" value={videoLength} onChange={(e) => setVideoLength(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <select value={goal} onChange={(e) => setGoal(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <option value="subscribe">Goal: Get Subscribers</option>
                <option value="views">Goal: Increase Watch Time</option>
              </select>
              <button type="submit" className="btn btn-primary">Optimize</button>
            </form>
            {plan && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <strong>End Screen Start Time:</strong> {plan.startAt} into the video
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <strong>Recommended Elements:</strong>
                  <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    {plan.elements.map(el => <li key={el}>{el}</li>)}
                  </ul>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--primary)', fontWeight: '600' }}>
                  💡 {plan.tip}
                </div>
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.endScreenOptimizer || []} title="FAQs — End Screen Optimizer" />
        </div>
      </main>
    </>
  );
}
