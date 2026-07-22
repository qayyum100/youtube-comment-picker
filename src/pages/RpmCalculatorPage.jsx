import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { DollarSign, Eye, Award } from 'lucide-react';

export default function RpmCalculatorPage() {
  const [totalViews, setTotalViews] = useState(100000);
  const [totalRevenue, setTotalRevenue] = useState(450);

  const rpm = totalViews > 0 ? ((totalRevenue / totalViews) * 1000).toFixed(2) : 0;

  return (
    <>
      <SeoHead pageType="tool" title="YouTube RPM Calculator — Revenue Per Mille Estimator" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube RPM Calculator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Calculate Revenue Per Mille (RPM) — your actual earnings per 1,000 total video views.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Total Video Views</label>
                <input
                  type="number"
                  value={totalViews}
                  onChange={(e) => setTotalViews(Math.max(0, parseInt(e.target.value) || 0))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Total Net Creator Earnings ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={totalRevenue}
                  onChange={(e) => setTotalRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Your Calculated Net RPM</div>
              <div style={{ fontSize: '48px', fontWeight: '800', color: 'var(--success)', lineHeight: '1' }}>
                ${rpm}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                per 1,000 total views
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
