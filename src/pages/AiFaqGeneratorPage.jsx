import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { HelpCircle, Sparkles } from 'lucide-react';

export default function AiFaqGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [faqs, setFaqs] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic) return;
    setFaqs([
      { q: `How long does it take to see results with ${topic}?`, a: 'Most creators report noticeable improvements within 14-30 days of consistent execution.' },
      { q: `Do I need expensive software for ${topic}?`, a: 'No, free tools and built-in browser features are more than sufficient to get started.' }
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI FAQ Generator — Generate Video & Description FAQs" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>AI FAQ Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Generate relevant Q&A pairs for video descriptions and pinned comments.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Video topic..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                <HelpCircle size={18} style={{ marginRight: '8px' }} /> Generate FAQs
              </button>
            </form>

            {faqs && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>Description Q&A Block</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {faqs.map((f, i) => (
                    <div key={i} style={{ background: 'var(--bg)', padding: '12px', borderRadius: '6px' }}>
                      <strong style={{ display: 'block', marginBottom: '4px' }}>Q: {f.q}</strong>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>A: {f.a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['description-generator'] || []} />
        </div>
      </main>
    </>
  );
}
