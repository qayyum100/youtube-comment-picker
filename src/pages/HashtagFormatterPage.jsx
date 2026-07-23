import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Hash } from 'lucide-react';

export default function HashtagFormatterPage() {
  const [input, setInput] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleFormat = (e) => {
    e.preventDefault();
    const formatted = input
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(w => w.startsWith('#') ? w : `#${w}`)
      .join(' ');
    setHashtags(formatted);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Hashtag Formatter — Sanitize Video Hashtags" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Hashtag Formatter</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Format words or tags into clean #hashtag lists for video descriptions.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleFormat} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter words or keywords (e.g. youtube, gaming, viral)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Hash size={18} style={{ marginRight: '8px' }} /> Format Hashtags
              </button>
            </form>

            {hashtags && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>Hashtag Output</h3>
                <pre style={{ background: 'var(--bg)', padding: '14px', borderRadius: '6px', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {hashtags}
                </pre>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['hashtag-generator'] || []} />
        </div>
      </main>
    </>
  );
}
