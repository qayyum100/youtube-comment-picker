import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ChannelAgeCalculatorPage() {
  const [created, setCreated] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!created) return;
    const now = new Date();
    const start = new Date(created);
    const diffMs = now - start;
    const days = Math.floor(diffMs / 86400000);
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    setResult({
      exact: `${years} years, ${months} months, ${days % 30} days`,
      totalDays: days.toLocaleString(),
      milestone: days >= 1825 ? '🏆 Legacy Channel (5+ years)' : days >= 730 ? '⭐ Established Channel (2+ years)' : days >= 365 ? '🌱 Growing Channel (1+ year)' : '🚀 New Channel (<1 year)'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Channel Age Calculator — How Old Is Your YouTube Channel" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Channel Age Calculator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Calculate exactly how old your YouTube channel is and what milestone tier you've reached.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleCalculate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: '600', display: 'block', marginBottom: '6px' }}>Channel Creation Date</label>
                <input type="date" value={created} onChange={(e) => setCreated(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button type="submit" className="btn btn-primary">Calculate Age</button>
              </div>
            </form>
            {result && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>
                  {result.milestone}
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <strong>Channel Age:</strong> {result.exact}
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <strong>Total Days Live:</strong> {result.totalDays} days
                </div>
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.channelAgeCalculator || []} title="FAQs — Channel Age Calculator" />
        </div>
      </main>
    </>
  );
}
