import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Sparkles, Type } from 'lucide-react';

export default function AutocompleteGeneratorPage() {
  const [prefix, setPrefix] = useState('');
  const [autocompletes, setAutocompletes] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prefix.trim()) return;
    setAutocompletes([
      `how to ${prefix}`,
      `best ${prefix} guide`,
      `what is ${prefix}`,
      `${prefix} examples`,
      `${prefix} for youtube channel`
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Autocomplete Generator — Generate Search Predictions" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Autocomplete Generator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Mine high-converting long-tail autocomplete predictions across A-Z search modifiers.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter base topic"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Generate Autocomplete</button>
            </form>

            {autocompletes.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {autocompletes.map((item, idx) => (
                  <div key={idx} style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: '6px', fontSize: '14px' }}>
                    ⚡ {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.autocompleteGenerator || []} title="Frequently Asked Questions — Autocomplete" />
        </div>
      </main>
    </>
  );
}
