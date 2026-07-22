import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { FileText, Sparkles } from 'lucide-react';

export default function ShortsCaptionGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [captions, setCaptions] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setCaptions([
      `Wait till the end to see what happens with ${topic}! 👀👇 #Shorts`,
      `Did you know this about ${topic}? Comment your thoughts below! 💬 #Shorts`,
      `Share this with someone who needs to hear about ${topic}! 🔥 #Shorts`
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Shorts Caption Generator — Generate Viral Short Captions" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Shorts Caption Generator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Create engaging YouTube Shorts description captions with calls-to-action to boost comments.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter Short topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Generate Captions</button>
            </form>

            {captions.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {captions.map((c, i) => (
                  <div key={i} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '14px' }}>
                    📝 {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.shortsCaptionGenerator || []} title="Frequently Asked Questions — Shorts Captions" />
        </div>
      </main>
    </>
  );
}
