import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { MousePointer, BarChart2, TrendingUp, HelpCircle } from 'lucide-react';

export default function CtrCalculatorPage() {
  const [impressions, setImpressions] = useState(10000);
  const [clicks, setClicks] = useState(650);

  const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : 0;

  const getBenchmark = (val) => {
    const num = parseFloat(val);
    if (num < 2) return { label: 'Low', color: '#EF4444', advice: 'Try redesigning your thumbnail with high-contrast text and bright focal elements.' };
    if (num <= 6) return { label: 'Average (Good)', color: '#F59E0B', advice: 'Solid performance! Fine-tune title curiosity gaps to boost CTR above 7%.' };
    if (num <= 10) return { label: 'High Performance', color: '#10B981', advice: 'Excellent! YouTube algorithm will widely push this video to home feeds.' };
    return { label: 'Viral Tier 🔥', color: '#8B5CF6', advice: 'Outstanding packaging! This thumbnail/title combo has massive click potential.' };
  };

  const benchmark = getBenchmark(ctr);

  return (
    <>
      <SeoHead pageType="tool" title="YouTube CTR Calculator — Calculate Click-Through Rate" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube CTR Calculator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Calculate your Click-Through Rate (CTR) and see how it compares to YouTube algorithm benchmarks.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Total Impressions</label>
                <input
                  type="number"
                  value={impressions}
                  onChange={(e) => setImpressions(Math.max(0, parseInt(e.target.value) || 0))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Total Clicks / Views from Impressions</label>
                <input
                  type="number"
                  value={clicks}
                  onChange={(e) => setClicks(Math.max(0, parseInt(e.target.value) || 0))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Calculated CTR</div>
              <div style={{ fontSize: '48px', fontWeight: '800', color: benchmark.color, lineHeight: '1' }}>
                {ctr}%
              </div>
              <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: `${benchmark.color}20`, color: benchmark.color, fontWeight: '700', fontSize: '14px', marginTop: '12px' }}>
                {benchmark.label}
              </div>

              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '16px', marginBottom: 0 }}>
                💡 <strong>Benchmark Analysis:</strong> {benchmark.advice}
              </p>
            </div>
          </div>

          <FaqSection customFaqs={toolFaqs.ctrCalculator} title="Frequently Asked Questions — YouTube CTR" />
        </div>
      </main>
    </>
  );
}
