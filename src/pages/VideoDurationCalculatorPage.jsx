import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { Clock, PlaySquare, CheckCircle } from 'lucide-react';

export default function VideoDurationCalculatorPage() {
  const [targetWatchHours, setTargetWatchHours] = useState(4000);
  const [avgViewRetentionPercent, setAvgViewRetentionPercent] = useState(45);
  const [expectedViews, setExpectedViews] = useState(10000);

  // Target total watch minutes required = targetWatchHours * 60
  // Watch minutes needed per view = (targetWatchHours * 60) / expectedViews
  // Required video length = Watch minutes needed per view / (avgViewRetentionPercent / 100)
  const totalWatchMinutesNeeded = targetWatchHours * 60;
  const watchMinutesPerView = expectedViews > 0 ? totalWatchMinutesNeeded / expectedViews : 0;
  const requiredVideoLengthMinutes = avgViewRetentionPercent > 0 ? (watchMinutesPerView / (avgViewRetentionPercent / 100)).toFixed(1) : 0;

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Video Duration Calculator — Optimize Watch Hours" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Video Duration Calculator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Calculate exact video length needed to hit your target watch hours (e.g. 4,000 YPP threshold).
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Target Watch Hours</label>
                <input
                  type="number"
                  value={targetWatchHours}
                  onChange={(e) => setTargetWatchHours(Math.max(1, parseInt(e.target.value) || 0))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Expected Total Views</label>
                <input
                  type="number"
                  value={expectedViews}
                  onChange={(e) => setExpectedViews(Math.max(1, parseInt(e.target.value) || 0))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Avg Retention (%)</label>
                <input
                  type="number"
                  value={avgViewRetentionPercent}
                  onChange={(e) => setAvgViewRetentionPercent(Math.min(100, Math.max(1, parseInt(e.target.value) || 0)))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Recommended Minimum Video Duration</div>
              <div style={{ fontSize: '48px', fontWeight: '800', color: 'var(--primary)', lineHeight: '1' }}>
                {requiredVideoLengthMinutes} mins
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                to reach {targetWatchHours.toLocaleString()} watch hours across {expectedViews.toLocaleString()} views
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
