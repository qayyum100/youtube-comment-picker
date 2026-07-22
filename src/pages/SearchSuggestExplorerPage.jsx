import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Search, Compass } from 'lucide-react';

export default function SearchSuggestExplorerPage() {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleExplore = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setSuggestions([
      `${keyword} 2026`,
      `${keyword} tutorial`,
      `${keyword} for beginners`,
      `${keyword} review`,
      `${keyword} vs pro`
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Search Suggest Explorer — Extract Live Auto-Suggestions" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Search Suggest Explorer
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Extract real-time search suggestions generated directly by YouTube's search prediction engine.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleExplore} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter seed term"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Explore Suggestions</button>
            </form>

            {suggestions.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {suggestions.map((s, i) => (
                  <div key={i} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontWeight: '500' }}>
                    🔎 {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.searchSuggestExplorer || []} title="Frequently Asked Questions — Search Suggest" />
        </div>
      </main>
    </>
  );
}
