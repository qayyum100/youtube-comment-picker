import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function LiveStreamTitleGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai/livestream-titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await response.json();
      setTitles(data.titles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SeoHead pageType="tool" title="Live Stream Title Generator — Viral YouTube Live Titles" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Live Stream Title Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate attention-grabbing YouTube Live stream titles that drive real-time viewer traffic.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input type="text" placeholder="Stream Topic (e.g. 'React coding session')" value={topic} onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <button type="submit" className="btn btn-primary">
                {loading ? 'Generating...' : 'Generate Titles'}
              </button>
            </form>
            {titles.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {titles.map((t, i) => (
                  <div key={i} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontWeight: '600' }}>📡 {t}</div>
                ))}
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.liveStreamTitleGenerator || []} title="FAQs — Live Stream Title Generator" />
        </div>
      </main>
    </>
  );
}
