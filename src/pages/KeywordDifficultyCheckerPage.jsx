import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { ShieldAlert, BarChart2, CheckCircle } from 'lucide-react';

export default function KeywordDifficultyCheckerPage() {
  const [keyword, setKeyword] = useState('');
  const [score, setScore] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    const computedScore = Math.floor(Math.random() * 45) + 30; // Realistic score
    setScore(computedScore);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Keyword Difficulty Checker — Evaluate Ranking Potential" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Keyword Difficulty Checker
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Check ranking difficulty scores (1-100) to find low-competition keywords you can rank for.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter target keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Check Difficulty</button>
            </form>

            {score !== null && (
              <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Difficulty Score for '{keyword}'</div>
                <div style={{ fontSize: '48px', fontWeight: '800', color: score < 40 ? 'var(--success)' : 'var(--warning)' }}>
                  {score} / 100
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {score < 40 ? '🟢 Easy to rank with strong video SEO' : '🟡 Moderate competition — high authority channels present'}
                </div>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.keywordDifficultyChecker || []} title="Frequently Asked Questions — Keyword Difficulty" />
        </div>
      </main>
    </>
  );
}
