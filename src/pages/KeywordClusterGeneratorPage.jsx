import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Layers, Network } from 'lucide-react';

export default function KeywordClusterGeneratorPage() {
  const [pillar, setPillar] = useState('');
  const [clusters, setClusters] = useState(null);

  const handleCluster = (e) => {
    e.preventDefault();
    if (!pillar.trim()) return;
    setClusters([
      { subtopic: 'Beginner Guides', keywords: [`${pillar} for beginners`, `${pillar} 101`, `how to start ${pillar}`] },
      { subtopic: 'Advanced Strategies', keywords: [`advanced ${pillar} tips`, `${pillar} mistakes to avoid`, `${pillar} case study`] }
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Keyword Cluster Generator — Build Content Pillars" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Keyword Cluster Generator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Build topic clusters and video hub architectures to establish topical authority on YouTube.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleCluster} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter core pillar topic (e.g. 'YouTube Monetization')"
                value={pillar}
                onChange={(e) => setPillar(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Generate Clusters</button>
            </form>

            {clusters && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {clusters.map((cluster, i) => (
                  <div key={i} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '700', marginBottom: '8px', color: 'var(--primary)' }}>🌐 Cluster: {cluster.subtopic}</div>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                      {cluster.keywords.map(k => <li key={k}>{k}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.keywordClusterGenerator || []} title="Frequently Asked Questions — Keyword Clusters" />
        </div>
      </main>
    </>
  );
}
