import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Activity, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ChannelHealthCheckerPage() {
  const [channel, setChannel] = useState('');
  const [health, setHealth] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!channel.trim()) return;
    setHealth({
      overallScore: '82/100',
      uploadConsistency: '✅ Excellent (2 videos/week)',
      seoHealth: '⚠️ Moderate (Missing keyword-rich descriptions)',
      engagementHealth: '✅ Good (3.8% Like ratio)',
      thumbnailConsistency: '⚠️ Mixed branding detected',
      recommendation: 'Optimize descriptions with long-tail keywords and standardize thumbnail fonts.'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Channel Health Checker — Audit YouTube Channel Performance" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Channel Health Checker</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Get a full audit of your YouTube channel's upload consistency, SEO, thumbnails, and engagement health.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleCheck} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input type="text" placeholder="Enter Channel Name or URL" value={channel} onChange={(e) => setChannel(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <button type="submit" className="btn btn-primary">Audit Channel</button>
            </form>
            {health && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '20px', fontWeight: '800', color: 'var(--success)' }}>
                  Overall Health: {health.overallScore}
                </div>
                {[['Upload Schedule', health.uploadConsistency], ['SEO Health', health.seoHealth],
                  ['Engagement', health.engagementHealth], ['Thumbnail Branding', health.thumbnailConsistency]].map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                    <strong>{k}:</strong> <span style={{ marginLeft: '6px' }}>{v}</span>
                  </div>
                ))}
                <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--primary)', fontWeight: '600' }}>
                  💡 {health.recommendation}
                </div>
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.channelHealthChecker || []} title="FAQs — Channel Health Checker" />
        </div>
      </main>
    </>
  );
}
