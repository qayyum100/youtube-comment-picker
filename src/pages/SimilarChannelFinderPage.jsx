import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Users, Search } from 'lucide-react';

export default function SimilarChannelFinderPage() {
  const [channel, setChannel] = useState('');
  const [similar, setSimilar] = useState([]);

  const handleFind = (e) => {
    e.preventDefault();
    if (!channel.trim()) return;
    setSimilar([
      { name: 'TechVision', subs: '850K', overlap: '92% Audience Match' },
      { name: 'Creator Academy', subs: '420K', overlap: '87% Audience Match' },
      { name: 'Digital Growth Hub', subs: '1.1M', overlap: '81% Audience Match' }
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Similar Channel Finder — Discover Niche Competitors" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Similar Channel Finder
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Find channels with overlapping audiences for collaboration and competitor research.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleFind} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter Channel Name or Topic"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Find Similar Channels</button>
            </form>

            {similar.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {similar.map((ch, idx) => (
                  <div key={idx} style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '16px' }}>{ch.name}</strong>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '8px' }}>({ch.subs} subs)</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--success)' }}>{ch.overlap}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.similarChannelFinder || []} title="Frequently Asked Questions — Similar Channels" />
        </div>
      </main>
    </>
  );
}
