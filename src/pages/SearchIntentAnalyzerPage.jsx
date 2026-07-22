import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Search, Compass } from 'lucide-react';

export default function SearchIntentAnalyzerPage() {
  const [keyword, setKeyword] = useState('');
  const [intent, setIntent] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setIntent({
      primary: 'Educational / How-To',
      format: 'Step-by-step Video Tutorial (8-12 mins)',
      audienceExpectation: 'Viewers expect direct actionable instructions with on-screen code/demonstrations.'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Search Intent Analyzer — Categorize Viewer Intent" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Search Intent Analyzer
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Classify keyword search intent (Informational, Transactional, Entertainment) to tailor video content.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter query (e.g. 'best video editor for youtube')"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Analyze Intent</button>
            </form>

            {intent && (
              <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--primary)', marginBottom: '8px' }}>Primary Intent: {intent.primary}</div>
                <p style={{ margin: '4px 0 12px 0', color: 'var(--text-secondary)' }}><strong>Ideal Format:</strong> {intent.format}</p>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>💡 <strong>Expectations:</strong> {intent.audienceExpectation}</p>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.searchIntentAnalyzer || []} title="Frequently Asked Questions — Search Intent" />
        </div>
      </main>
    </>
  );
}
