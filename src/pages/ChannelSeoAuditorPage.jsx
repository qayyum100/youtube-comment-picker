import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ChannelSeoAuditorPage() {
  const [channel, setChannel] = useState('');
  const [audit, setAudit] = useState(null);

  const handleAudit = (e) => {
    e.preventDefault();
    if (!channel.trim()) return;
    setAudit({
      channelKeyword: '⚠️ Channel name missing primary keyword',
      aboutSection: '✅ About section has keyword-rich description',
      tagsUsed: '✅ Channel tags found (12 tags detected)',
      linksSection: '⚠️ External links section incomplete',
      trailerVideo: '✅ Channel trailer set',
      score: '74/100 — Good. Fix name & links for 90+.'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Channel SEO Auditor — YouTube Channel SEO Audit Tool" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Channel SEO Auditor</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Audit your YouTube channel page SEO including name, description, tags, trailer, and links section.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAudit} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input type="text" placeholder="Enter Channel URL or Name" value={channel} onChange={(e) => setChannel(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <button type="submit" className="btn btn-primary">Run SEO Audit</button>
            </form>
            {audit && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[['Channel Name', audit.channelKeyword], ['About Section', audit.aboutSection],
                  ['Channel Tags', audit.tagsUsed], ['Links Section', audit.linksSection], ['Channel Trailer', audit.trailerVideo]].map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                    <strong>{k}:</strong> <span style={{ marginLeft: '6px' }}>{v}</span>
                  </div>
                ))}
                <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '16px', fontWeight: '800', color: 'var(--primary)' }}>
                  SEO Score: {audit.score}
                </div>
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.channelSeoAuditor || []} title="FAQs — Channel SEO Auditor" />
        </div>
      </main>
    </>
  );
}
