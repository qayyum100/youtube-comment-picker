import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function ShortsHookAnalyzerPage() {
  const [hook, setHook] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!hook.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai/shorts-hook-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hook })
      });
      const data = await response.json();
      setAnalysis(data.analysis || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SeoHead pageType="tool" title="Shorts Hook Analyzer — Audit First 3 Seconds Retention" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Shorts Hook Analyzer
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Evaluate the first 3-second visual and spoken hook of your Short to prevent swipe-aways.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter spoken opening line (e.g. 'Stop doing this mistake...')"
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">
                {loading ? 'Analyzing...' : 'Analyze Hook'}
              </button>
            </form>

            {analysis && (
              <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--success)', marginBottom: '8px' }}>Hook Score: {analysis.score}</div>
                <p style={{ margin: '4px 0', color: 'var(--text-secondary)' }}><strong>Curiosity Level:</strong> {analysis.curiosityGap}</p>
                <p style={{ margin: '4px 0', color: 'var(--text-secondary)' }}><strong>Length:</strong> {analysis.wordCount}</p>
                <p style={{ margin: '8px 0 0 0', color: 'var(--text-primary)', fontWeight: '600' }}>💡 {analysis.verdict}</p>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.shortsHookAnalyzer || []} title="Frequently Asked Questions — Shorts Hooks" />
        </div>
      </main>
    </>
  );
}
