import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function SubscriberGrowthAnalyzerPage() {
  const [subs, setSubs] = useState('');
  const [period, setPeriod] = useState('30');
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!subs) return;
    const subsNum = parseInt(subs.replace(/,/g, ''));
    const dailyRate = Math.round(subsNum * 0.003);
    setResult({
      dailyGrowth: `+${dailyRate.toLocaleString()} subs/day`,
      projectedMonthly: `+${(dailyRate * 30).toLocaleString()} subs/month`,
      projectedYearly: `+${(dailyRate * 365).toLocaleString()} subs/year`,
      growthGrade: dailyRate > 500 ? 'A+ (Hyper Growth)' : dailyRate > 100 ? 'B (Steady Growth)' : 'C (Needs Boost)'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Subscriber Growth Analyzer — Project YouTube Channel Growth" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Subscriber Growth Analyzer</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Project your subscriber velocity and yearly growth milestones based on current momentum.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAnalyze} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '24px' }}>
              <input type="text" placeholder="Current Subscribers (e.g. 50000)" value={subs} onChange={(e) => setSubs(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <select value={period} onChange={(e) => setPeriod(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
              <button type="submit" className="btn btn-primary">Analyze</button>
            </form>
            {result && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                {[['Daily Growth', result.dailyGrowth, 'var(--primary)'], ['Monthly Projection', result.projectedMonthly, 'var(--success)'], ['Yearly Projection', result.projectedYearly, 'var(--warning)']].map(([label, val, color]) => (
                  <div key={label} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{label}</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color }}>{val}</div>
                  </div>
                ))}
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Growth Grade</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--success)' }}>{result.growthGrade}</div>
                </div>
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.subscriberGrowthAnalyzer || []} title="FAQs — Subscriber Growth Analyzer" />
        </div>
      </main>
    </>
  );
}
