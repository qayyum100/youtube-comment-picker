import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Type } from 'lucide-react';

export default function CharacterCounterPage() {
  const [text, setText] = useState('');

  return (
    <>
      <SeoHead pageType="tool" title="Character Counter — Audit YouTube Title & Description Limits" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Character Counter</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Track character counts against YouTube's 100-char Title and 5,000-char Description limits.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <textarea
              rows={6}
              placeholder="Type or paste text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', marginBottom: '16px' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '12px' }}>
                <div style={{ fontSize: '20px', fontWeight: '800' }}>{text.length}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Characters</div>
              </div>
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '12px' }}>
                <div style={{ fontSize: '20px', fontWeight: '800' }}>{100 - text.length}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Title Limit Left (100)</div>
              </div>
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '12px' }}>
                <div style={{ fontSize: '20px', fontWeight: '800' }}>{5000 - text.length}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Desc Limit Left (5000)</div>
              </div>
            </div>
          </div>
          <FaqSection faqs={toolFaqs['seo-checker'] || []} />
        </div>
      </main>
    </>
  );
}
