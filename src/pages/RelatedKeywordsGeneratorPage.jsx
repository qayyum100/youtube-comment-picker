import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Search, ListPlus } from 'lucide-react';

export default function RelatedKeywordsGeneratorPage() {
  const [seed, setSeed] = useState('');
  const [related, setRelated] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!seed.trim()) return;
    setRelated([
      `${seed} step by step tutorial`,
      `best ${seed} for beginners`,
      `${seed} tips and tricks 2026`,
      `how to use ${seed} fast`,
      `${seed} vs alternative`
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Related Keywords Generator — Discover LSI Keywords" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Related Keywords Generator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate semantically related LSI keywords to expand video metadata and tag variations.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter seed keyword"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Generate Related</button>
            </form>

            {related.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {related.map((item, i) => (
                  <div key={i} style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                    🔹 {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.relatedKeywordsGenerator || []} title="Frequently Asked Questions — Related Keywords" />
        </div>
      </main>
    </>
  );
}
