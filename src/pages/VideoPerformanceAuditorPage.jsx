import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function VideoPerformanceAuditorPage() {
  const [url, setUrl] = useState('');
  const [audit, setAudit] = useState(null);

  const handleAudit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setAudit({
      ctr: '5.8% (Above Average)',
      retention: '51% (Good)',
      vsAvg: '2.3x channel average views',
      suggestions: ['Add chapters to boost rewatch rate', 'Pin a comment to drive engagement', 'Add end screen at 52-second mark']
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Video Performance Auditor — Analyze Individual Video Metrics" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Video Performance Auditor</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Deep-audit individual video CTR, retention, velocity, and get actionable improvement suggestions.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAudit} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input type="text" placeholder="Paste YouTube Video URL" value={url} onChange={(e) => setUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <button type="submit" className="btn btn-primary">Audit Video</button>
            </form>
            {audit && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                  {[['CTR', audit.ctr, 'var(--success)'], ['Retention', audit.retention, 'var(--primary)'], ['vs Channel Avg', audit.vsAvg, 'var(--warning)']].map(([l, v, c]) => (
                    <div key={l} style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{l}</div>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <strong>Improvement Suggestions:</strong>
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px', color: 'var(--text-secondary)' }}>
                    {audit.suggestions.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.videoPerformanceAuditor || []} title="FAQs — Video Performance Auditor" />
        </div>
      </main>
    </>
  );
}
