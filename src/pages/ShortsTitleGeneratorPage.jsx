import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Type, Sparkles } from 'lucide-react';

export default function ShortsTitleGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setTitles([
      `Do THIS to master ${topic} in 15 seconds! #Shorts`,
      `The 1 secret about ${topic} nobody tells you #Shorts`,
      `Stop doing ${topic} like this! #Shorts`,
      `Crazy ${topic} hack you need to try #Shorts`
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Shorts Title Generator — AI Viral Titles for Shorts" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Shorts Title Generator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate short, punchy titles tailored for fast scrolling on the YouTube Shorts shelf.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter Short concept"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Generate Titles</button>
            </form>

            {titles.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {titles.map((t, i) => (
                  <div key={i} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontWeight: '600' }}>
                    ⚡ {t}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.shortsTitleGenerator || []} title="Frequently Asked Questions — Shorts Titles" />
        </div>
      </main>
    </>
  );
}
