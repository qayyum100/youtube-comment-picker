import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ChannelRevenueEstimatorPage() {
  const [views, setViews] = useState('');
  const [cpm, setCpm] = useState('4');
  const [result, setResult] = useState(null);

  const handleEstimate = (e) => {
    e.preventDefault();
    const v = parseInt(views.replace(/,/g, '')) || 0;
    const c = parseFloat(cpm) || 4;
    const rpm = c * 0.55;
    const monthly = (v / 1000) * rpm;
    setResult({
      estimatedRPM: `$${rpm.toFixed(2)}`,
      monthlyRevenue: `$${(monthly * 0.75).toFixed(0)} – $${(monthly * 1.25).toFixed(0)}`,
      yearlyRevenue: `$${(monthly * 0.75 * 12).toFixed(0)} – $${(monthly * 1.25 * 12).toFixed(0)}`,
      perVideo: `$${(monthly / 15).toFixed(2)} avg per video`
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Channel Revenue Estimator — Calculate YouTube AdSense Income" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Channel Revenue Estimator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Estimate your total monthly and yearly AdSense earnings based on views and niche CPM rates.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleEstimate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '24px' }}>
              <input type="text" placeholder="Monthly Views (e.g. 500000)" value={views} onChange={(e) => setViews(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>CPM Rate: ${cpm}</label>
                <input type="range" min="1" max="30" value={cpm} onChange={(e) => setCpm(e.target.value)} style={{ width: '100%' }} />
              </div>
              <button type="submit" className="btn btn-primary">Calculate</button>
            </form>
            {result && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
                {[['Est. RPM', result.estimatedRPM, 'var(--text-primary)'], ['Monthly Income', result.monthlyRevenue, 'var(--success)'], ['Yearly Income', result.yearlyRevenue, 'var(--primary)'], ['Per Video Avg', result.perVideo, 'var(--warning)']].map(([l, v, c]) => (
                  <div key={l} style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{l}</div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: c }}>{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.channelRevenueEstimator || []} title="FAQs — Channel Revenue Estimator" />
        </div>
      </main>
    </>
  );
}
