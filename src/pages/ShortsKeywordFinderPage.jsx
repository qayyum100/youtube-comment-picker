import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Search, Hash } from 'lucide-react';

export default function ShortsKeywordFinderPage() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setKeywords([
      `${topic} shorts`,
      `${topic} fast tutorial`,
      `best ${topic} hack`,
      `${topic} 60 seconds`,
      `${topic} reaction`
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Shorts Keyword Finder — Uncover High-Volume Shorts Search Terms" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Shorts Keyword Finder
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Find high-converting keywords searched specifically on mobile devices in the Shorts player.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter Short topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Find Keywords</button>
            </form>

            {keywords.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {keywords.map((k, i) => (
                  <div key={i} style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: '6px', fontSize: '14px' }}>
                    🔎 {k}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.shortsKeywordFinder || []} title="Frequently Asked Questions — Shorts Keywords" />
        </div>
      </main>
    </>
  );
}
