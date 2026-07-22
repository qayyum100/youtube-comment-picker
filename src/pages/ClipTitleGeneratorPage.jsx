import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ClipTitleGeneratorPage() {
  const [moment, setMoment] = useState('');
  const [titles, setTitles] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!moment.trim()) return;
    setTitles([
      `This moment broke the internet 💀 — ${moment}`,
      `Nobody expected this... 👀 #Clip`,
      `THE moment everyone is talking about: ${moment}`,
      `Wait for it... 🔥 ${moment} (Best Clip Ever)`
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Clip Title Generator — Generate YouTube Clip Titles" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Clip Title Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate viral clip titles for YouTube Clips from live stream highlights and best moments.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input type="text" placeholder="Describe the clip moment..." value={moment} onChange={(e) => setMoment(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <button type="submit" className="btn btn-primary">Generate Titles</button>
            </form>
            {titles.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {titles.map((t, i) => (
                  <div key={i} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontWeight: '600' }}>✂️ {t}</div>
                ))}
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.clipTitleGenerator || []} title="FAQs — Clip Title Generator" />
        </div>
      </main>
    </>
  );
}
