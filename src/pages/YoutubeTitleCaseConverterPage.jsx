import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Type } from 'lucide-react';

export default function YoutubeTitleCaseConverterPage() {
  const [input, setInput] = useState('');
  const [converted, setConverted] = useState('');

  const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleConvert = (e) => {
    e.preventDefault();
    setConverted(toTitleCase(input));
  };

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Title Case Converter — Format Video Titles" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>YouTube Title Case Converter</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Convert video titles to Title Case, UPPERCASE, or sentence case instantly.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleConvert} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter title (e.g. how to grow youtube channel fast)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Type size={18} style={{ marginRight: '8px' }} /> Convert to Title Case
              </button>
            </form>

            {converted && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>Formatted Title</h3>
                <div style={{ fontSize: '18px', fontWeight: '700' }}>{converted}</div>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['title-generator'] || []} />
        </div>
      </main>
    </>
  );
}
