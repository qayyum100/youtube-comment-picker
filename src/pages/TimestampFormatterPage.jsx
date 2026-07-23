import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Clock } from 'lucide-react';

export default function TimestampFormatterPage() {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');

  const handleFormat = (e) => {
    e.preventDefault();
    const lines = input.split('\n').map(line => {
      const match = line.match(/^(\d{1,2}:\d{2})\s*(.*)$/);
      if (match) return `${match[1]} - ${match[2]}`;
      return line;
    });
    setFormatted(lines.join('\n'));
  };

  return (
    <>
      <SeoHead pageType="tool" title="Timestamp Formatter — Clean Video Chapter Formatting" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Timestamp Formatter</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Format raw timestamp notes into YouTube-recognized chapter lists.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleFormat} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <textarea
                rows={5}
                placeholder="Paste timestamps (e.g. 0:00 intro)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Clock size={18} style={{ marginRight: '8px' }} /> Format Timestamps
              </button>
            </form>

            {formatted && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>YouTube Chapter List</h3>
                <pre style={{ background: 'var(--bg)', padding: '14px', borderRadius: '6px', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {formatted}
                </pre>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['timestamp-generator'] || []} />
        </div>
      </main>
    </>
  );
}
