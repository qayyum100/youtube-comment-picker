import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Code } from 'lucide-react';

export default function HtmlToPlainTextConverterPage() {
  const [html, setHtml] = useState('');
  const [plain, setPlain] = useState('');

  const handleStrip = (e) => {
    e.preventDefault();
    const temp = document.createElement('div');
    temp.innerHTML = html;
    setPlain(temp.textContent || temp.innerText || '');
  };

  return (
    <>
      <SeoHead pageType="tool" title="HTML to Plain Text Converter — Strip Tags for Description" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>HTML to Plain Text Converter</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Strip HTML tags from blog posts or emails to create clean video descriptions.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleStrip} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <textarea
                rows={5}
                placeholder="Paste HTML code..."
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Code size={18} style={{ marginRight: '8px' }} /> Strip HTML
              </button>
            </form>

            {plain && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>Plain Text Output</h3>
                <pre style={{ background: 'var(--bg)', padding: '14px', borderRadius: '6px', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {plain}
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
