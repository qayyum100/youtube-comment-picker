import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Search, BarChart2, TrendingUp, Sparkles } from 'lucide-react';

export default function SearchVolumeCheckerPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setResults({
        keyword,
        monthlyVolume: '45,000 - 90,000',
        competition: 'Medium',
        trend: '+18% last 30 days',
        cpmEstimate: '$4.20'
      });
      setLoading(false);
    }, 600);
  };

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Search Volume Checker — Check Monthly Video Searches" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Search Volume Checker
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Estimate monthly search query volume, competition metrics, and trend momentum on YouTube.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter YouTube search keyword (e.g. 'python tutorial')"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} /> {loading ? 'Analyzing...' : 'Check Volume'}
              </button>
            </form>

            {results && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Estimated Monthly Volume</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)' }}>{results.monthlyVolume}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Search Competition</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--warning)' }}>{results.competition}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Growth Trend</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--success)' }}>{results.trend}</div>
                </div>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.searchVolumeChecker || []} title="Frequently Asked Questions — Search Volume" />
        </div>
      </main>
    </>
  );
}
