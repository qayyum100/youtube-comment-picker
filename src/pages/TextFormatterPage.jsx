import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Type } from 'lucide-react';

export default function TextFormatterPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleClean = (e) => {
    e.preventDefault();
    setResult(text.replace(/\s+/g, ' ').trim());
  };

  return (
    <>
      <SeoHead pageType="tool" title="Text Formatter — Clean Extra Spaces & Line Breaks" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Text Formatter</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Remove duplicate spaces, fix line breaks, and sanitize text copy.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleClean} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <textarea
                rows={5}
                placeholder="Paste text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Type size={18} style={{ marginRight: '8px' }} /> Clean & Format Text
              </button>
            </form>

            {result && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>Cleaned Result</h3>
                <p style={{ fontSize: '15px' }}>{result}</p>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['title-generator'] || []} />
        </div>
      </main>
    </>
  );
}
