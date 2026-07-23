import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { FileText, Sparkles } from 'lucide-react';

export default function AiVideoOutlineGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic) return;
    setOutline([
      '1. Hook & Premise (0:00 - 0:45) — Grab attention with the core problem.',
      '2. Context & Background (0:45 - 2:15) — Establish authority and importance.',
      '3. Core Strategy / Actionable Steps (2:15 - 7:30) — Step-by-step breakdown.',
      '4. Common Pitfalls & Mistakes (7:30 - 9:30) — What viewers must avoid.',
      '5. Summary & CTA (9:30 - 10:15) — Final recommendation and subscribe pitch.'
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI Video Outline Generator — Structure Viral Content" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>AI Video Outline Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Generate structured, high-retention video blueprints for any topic.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter your video topic (e.g. How to Start a YouTube Channel)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                <Sparkles size={18} style={{ marginRight: '8px' }} /> Outline
              </button>
            </form>

            {outline && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>Generated Blueprint</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {outline.map((item, i) => (
                    <div key={i} style={{ padding: '8px 12px', borderRadius: '6px', background: 'var(--bg)', fontSize: '14px' }}>{item}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['title-generator'] || []} />
        </div>
      </main>
    </>
  );
}
