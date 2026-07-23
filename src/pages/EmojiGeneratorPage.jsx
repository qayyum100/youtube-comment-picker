import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Smile } from 'lucide-react';

export default function EmojiGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [emojis, setEmojis] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic) return;
    setEmojis(['🔥', '⚡', '🚀', '💡', '📌', '📈', '🎯', '👇', '🚨', '🎉']);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Emoji Generator — High-CTR Emojis for Titles & Descriptions" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Emoji Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Find high-CTR emojis relevant to your video topic to boost visual engagement.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Topic or keyword (e.g. Finance, Tech, Gaming)..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                <Smile size={18} style={{ marginRight: '8px' }} /> Get Emojis
              </button>
            </form>

            {emojis && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>Recommended Emojis</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '24px' }}>
                  {emojis.map((em, i) => (
                    <span key={i} style={{ cursor: 'pointer', padding: '8px', background: 'var(--bg)', borderRadius: '6px' }} onClick={() => navigator.clipboard.writeText(em)}>
                      {em}
                    </span>
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
