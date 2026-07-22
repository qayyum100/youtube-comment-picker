import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function CardsCtaGeneratorPage() {
  const [videoType, setVideoType] = useState('tutorial');
  const [ctas, setCtas] = useState([]);

  const ctaMap = {
    tutorial: [
      { type: 'Card', timing: '40%', text: 'Link to related tutorial playlist', icon: '🃏' },
      { type: 'Card', timing: '70%', text: 'Poll: "Was this helpful?"', icon: '📊' },
      { type: 'End Screen CTA', timing: 'Final 20s', text: 'Subscribe + Best for viewer video', icon: '✅' }
    ],
    review: [
      { type: 'Card', timing: '30%', text: 'Link to buying guide article', icon: '🔗' },
      { type: 'Card', timing: '60%', text: 'Compare to alternative product (video)', icon: '📺' },
      { type: 'End Screen CTA', timing: 'Final 20s', text: 'Subscribe + Latest upload', icon: '✅' }
    ],
    vlog: [
      { type: 'Card', timing: '50%', text: 'Previous vlog episode', icon: '🎬' },
      { type: 'End Screen CTA', timing: 'Final 20s', text: 'Subscribe + Featured playlist', icon: '✅' }
    ]
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setCtas(ctaMap[videoType] || ctaMap.tutorial);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Cards & CTA Generator — YouTube Cards Strategy Planner" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Cards & CTA Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate a card and CTA strategy with exact timestamps to maximize clicks and channel watch time.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <select value={videoType} onChange={(e) => setVideoType(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <option value="tutorial">Tutorial / How-To</option>
                <option value="review">Product Review</option>
                <option value="vlog">Vlog / Lifestyle</option>
              </select>
              <button type="submit" className="btn btn-primary">Generate CTA Plan</button>
            </form>
            {ctas.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ctas.map((c, i) => (
                  <div key={i} style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <span style={{ fontWeight: '700' }}>{c.icon} {c.type}</span>
                    <span style={{ marginLeft: '8px', color: 'var(--primary)', fontSize: '13px', fontWeight: '600' }}>@ {c.timing}</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.cardsCtaGenerator || []} title="FAQs — Cards & CTA Generator" />
        </div>
      </main>
    </>
  );
}
