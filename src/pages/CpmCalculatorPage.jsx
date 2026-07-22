import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { DollarSign, PieChart, TrendingUp } from 'lucide-react';

export default function CpmCalculatorPage() {
  const [adImpressions, setAdImpressions] = useState(50000);
  const [cpmRate, setCpmRate] = useState(8.50);

  const grossEarnings = (adImpressions / 1000) * cpmRate;
  const creatorEarnings = grossEarnings * 0.55; // 55% YouTube Partner Program revenue share

  return (
    <>
      <SeoHead pageType="tool" title="YouTube CPM Calculator — Estimate Gross Ad Revenue" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube CPM Calculator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Calculate gross advertising cost per mille (CPM) and creator net AdSense payouts.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Monetized Ad Impressions</label>
                <input
                  type="number"
                  value={adImpressions}
                  onChange={(e) => setAdImpressions(Math.max(0, parseInt(e.target.value) || 0))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Estimated CPM ($)</label>
                <input
                  type="number"
                  step="0.1"
                  value={cpmRate}
                  onChange={(e) => setCpmRate(Math.max(0, parseFloat(e.target.value) || 0))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="card" style={{ padding: '20px', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Gross Ad Revenue (Advertiser Spend)</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  ${grossEarnings.toFixed(2)}
                </div>
              </div>

              <div className="card" style={{ padding: '20px', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Creator Net Revenue (55% Share)</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--success)' }}>
                  ${creatorEarnings.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
