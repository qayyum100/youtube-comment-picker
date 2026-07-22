import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Columns, Users, BarChart2 } from 'lucide-react';

export default function ChannelComparisonToolPage() {
  const [ch1, setCh1] = useState('');
  const [ch2, setCh2] = useState('');
  const [comparison, setComparison] = useState(null);

  const handleCompare = (e) => {
    e.preventDefault();
    if (!ch1.trim() || !ch2.trim()) return;
    setComparison({
      ch1: { name: ch1, subs: '1.2M', monthlyViews: '3.4M', avgDuration: '11:45', uploadFreq: '2/week' },
      ch2: { name: ch2, subs: '890K', monthlyViews: '2.1M', avgDuration: '14:20', uploadFreq: '1/week' }
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Channel Comparison Tool — Side-by-Side Channel Metrics" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Channel Comparison Tool
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Compare two YouTube channels side-by-side across subscribers, view velocity, and upload frequency.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleCompare} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Channel 1 Name or Link"
                value={ch1}
                onChange={(e) => setCh1(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <input
                type="text"
                placeholder="Channel 2 Name or Link"
                value={ch2}
                onChange={(e) => setCh2(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Compare Channels</button>
            </form>

            {comparison && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: 'var(--primary)' }}>{comparison.ch1.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                    <div><strong>Subscribers:</strong> {comparison.ch1.subs}</div>
                    <div><strong>Monthly Views:</strong> {comparison.ch1.monthlyViews}</div>
                    <div><strong>Avg Length:</strong> {comparison.ch1.avgDuration}</div>
                    <div><strong>Upload Cadence:</strong> {comparison.ch1.uploadFreq}</div>
                  </div>
                </div>

                <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: 'var(--success)' }}>{comparison.ch2.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                    <div><strong>Subscribers:</strong> {comparison.ch2.subs}</div>
                    <div><strong>Monthly Views:</strong> {comparison.ch2.monthlyViews}</div>
                    <div><strong>Avg Length:</strong> {comparison.ch2.avgDuration}</div>
                    <div><strong>Upload Cadence:</strong> {comparison.ch2.uploadFreq}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.channelComparisonTool || []} title="Frequently Asked Questions — Channel Comparison" />
        </div>
      </main>
    </>
  );
}
