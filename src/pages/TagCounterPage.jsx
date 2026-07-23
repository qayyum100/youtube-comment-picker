import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Tag } from 'lucide-react';

export default function TagCounterPage() {
  const [tags, setTags] = useState('');

  const tagList = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const charCount = tags.length;

  return (
    <>
      <SeoHead pageType="tool" title="Tag Counter — Audit 500-Character Tag Limit" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Tag Counter</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Count tags and stay within YouTube's 500-character tag box limit.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <textarea
              rows={4}
              placeholder="Paste comma-separated tags (e.g. youtube, video seo, content creator)..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', marginBottom: '16px' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'center' }}>
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '12px' }}>
                <div style={{ fontSize: '20px', fontWeight: '800' }}>{tagList.length}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Tags</div>
              </div>
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '12px' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: charCount > 500 ? '#EF4444' : 'var(--text-primary)' }}>{charCount} / 500</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Characters Used</div>
              </div>
            </div>
          </div>
          <FaqSection faqs={toolFaqs['tag-extractor'] || []} />
        </div>
      </main>
    </>
  );
}
