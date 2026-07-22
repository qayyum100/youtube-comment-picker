import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { TrendingUp, BarChart2, Sparkles } from 'lucide-react';

export default function ShortsPerformancePredictorPage() {
  const [retention, setRetention] = useState(85);
  const [swipeAway, setSwipeAway] = useState(20);
  const [prediction, setPrediction] = useState(null);

  const handlePredict = (e) => {
    e.preventDefault();
    const viewsMin = Math.round((retention * 1000) / (swipeAway / 10 + 1));
    setPrediction({
      projectedViews: `${(viewsMin * 10).toLocaleString()} - ${(viewsMin * 50).toLocaleString()} views`,
      viralPotential: retention > 100 ? '🔥 Extremely High (Viral Shelf Guaranteed)' : '🟢 High Performance',
      recommendation: swipeAway > 25 ? '⚠️ High swipe-away rate (>25%). Strengthen initial 1-second visual hook.' : '✅ Low swipe-away rate. Algorithm will seed to wider test pools.'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Shorts Performance Predictor — Forecast Viral Potential" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Shorts Performance Predictor
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Forecast view velocity and algorithm seeding based on retention % and swipe-away rates.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handlePredict} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Average Retention %: {retention}%</label>
                <input
                  type="range"
                  min="30"
                  max="150"
                  value={retention}
                  onChange={(e) => setRetention(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Swiped Away %: {swipeAway}%</label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={swipeAway}
                  onChange={(e) => setSwipeAway(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Predict Performance</button>
              </div>
            </form>

            {prediction && (
              <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px' }}>Estimated Views: {prediction.projectedViews}</div>
                <div style={{ color: 'var(--success)', fontWeight: '700', marginBottom: '8px' }}>{prediction.viralPotential}</div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>💡 {prediction.recommendation}</p>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.shortsPerformancePredictor || []} title="Frequently Asked Questions — Shorts Performance" />
        </div>
      </main>
    </>
  );
}
