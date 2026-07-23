import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Code } from 'lucide-react';

export default function MarkdownToDescriptionConverterPage() {
  const [md, setMd] = useState('');
  const [desc, setDesc] = useState('');

  const handleConvert = (e) => {
    e.preventDefault();
    let converted = md
      .replace(/^# (.*$)/gim, '📌 $1')
      .replace(/^## (.*$)/gim, '🔹 $1')
      .replace(/^### (.*$)/gim, '▪️ $1')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1');
    setDesc(converted);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Markdown to Description Converter — Format YouTube Text" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Markdown to Description Converter</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Convert Markdown notes into clean, emoji-formatted YouTube descriptions.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleConvert} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <textarea
                rows={5}
                placeholder="Paste Markdown text..."
                value={md}
                onChange={(e) => setMd(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Code size={18} style={{ marginRight: '8px' }} /> Convert Markdown
              </button>
            </form>

            {desc && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>YouTube Description Format</h3>
                <pre style={{ background: 'var(--bg)', padding: '14px', borderRadius: '6px', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {desc}
                </pre>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['description-generator'] || []} />
        </div>
      </main>
    </>
  );
}
