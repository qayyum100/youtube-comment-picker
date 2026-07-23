import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Sparkles } from 'lucide-react';

export default function AiEndScreenCtaGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [cta, setCta] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic) return;
    setCta(`"If you liked learning about ${topic}, click the video on screen right now to master the next step! Don't forget to hit subscribe!"`);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI End Screen CTA Generator — Maximize Session Time" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>AI End Screen CTA Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Generate verbal call-to-actions to direct viewers to your next video.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Topic of next recommended video..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                <Sparkles size={18} style={{ marginRight: '8px' }} /> Generate CTA
              </button>
            </form>

            {cta && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>Outro Script CTA</h3>
                <p style={{ fontStyle: 'italic', fontSize: '15px' }}>{cta}</p>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['end-screen-optimizer'] || []} />
        </div>
      </main>
    </>
  );
}
