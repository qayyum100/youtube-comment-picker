import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { FileText } from 'lucide-react';

export default function DescriptionFormatterPage() {
  const [desc, setDesc] = useState('');
  const [formatted, setFormatted] = useState('');

  const handleFormat = (e) => {
    e.preventDefault();
    if (!desc) return;
    setFormatted(`📌 ABOUT THIS VIDEO:\n${desc}\n\n---------------------------------------\n🔔 SUBSCRIBE FOR MORE: https://youtube.com\n🌐 VISIT WEBSITE: https://example.com`);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Description Formatter — Structure Video Descriptions" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Description Formatter</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Clean up raw text into clean, structured video descriptions with headers and links.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleFormat} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <textarea
                rows={5}
                placeholder="Paste raw video description notes..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <FileText size={18} style={{ marginRight: '8px' }} /> Format Description
              </button>
            </form>

            {formatted && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>Structured Output</h3>
                <pre style={{ background: 'var(--bg)', padding: '14px', borderRadius: '6px', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {formatted}
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
