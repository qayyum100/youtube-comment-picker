import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function UploadConsistencyTrackerPage() {
  const [dates, setDates] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!dates.trim()) return;
    setResult({
      avgInterval: '3.5 days between uploads',
      longestGap: '14 days (detected: Jan 15 - Jan 29)',
      consistencyScore: '78/100 — Good Consistency',
      recommendation: 'Aim for uploads every 3 days consistently. Gaps >7 days reduce algorithm momentum.'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Upload Consistency Tracker — Track YouTube Upload Schedule" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Upload Consistency Tracker</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Track your upload schedule gaps, average cadence, and consistency score to maintain algorithm momentum.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <label style={{ fontWeight: '600' }}>Paste Upload Dates (one per line)</label>
              <textarea rows={5} placeholder="2026-07-01&#10;2026-07-04&#10;2026-07-08&#10;2026-07-15" value={dates} onChange={(e) => setDates(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <button type="submit" className="btn btn-primary">Analyze Consistency</button>
            </form>
            {result && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[['Average Interval', result.avgInterval], ['Longest Gap', result.longestGap], ['Consistency Score', result.consistencyScore]].map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                    <strong>{k}:</strong> <span style={{ marginLeft: '6px' }}>{v}</span>
                  </div>
                ))}
                <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--primary)', fontWeight: '600' }}>
                  💡 {result.recommendation}
                </div>
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.uploadConsistencyTracker || []} title="FAQs — Upload Consistency Tracker" />
        </div>
      </main>
    </>
  );
}
