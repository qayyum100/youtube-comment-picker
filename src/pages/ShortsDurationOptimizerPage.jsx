import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Clock, PlaySquare } from 'lucide-react';

export default function ShortsDurationOptimizerPage() {
  const [seconds, setSeconds] = useState(30);

  const getRecommendation = (sec) => {
    if (sec <= 15) return { rating: 'Ideal for Looping memes & quick jokes', retention: '130% Average Percentage Viewed' };
    if (sec <= 30) return { rating: 'Sweet spot for How-To & Quick Tips', retention: '90% Average Percentage Viewed' };
    if (sec <= 45) return { rating: 'Good for mini-storytelling & breakdowns', retention: '75% Average Percentage Viewed' };
    return { rating: 'Long-form Short — High risk of viewer dropoff', retention: '55% Average Percentage Viewed' };
  };

  const rec = getRecommendation(seconds);

  return (
    <>
      <SeoHead pageType="tool" title="Shorts Duration Optimizer — Find Ideal Video Length" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Shorts Duration Optimizer
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Optimize your Short's exact video duration (15s, 30s, 60s) for maximum retention & looping.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Target Short Duration: {seconds} seconds</label>
              <input
                type="range"
                min="5"
                max="60"
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px' }}>{rec.rating}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Projected Retention: <strong>{rec.retention}</strong></div>
            </div>
          </div>

          <FaqSection customFaqs={toolFaqs.shortsDurationOptimizer || []} title="Frequently Asked Questions — Shorts Duration" />
        </div>
      </main>
    </>
  );
}
