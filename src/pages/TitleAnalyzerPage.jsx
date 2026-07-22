import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { Type, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';

export default function TitleAnalyzerPage() {
  const [title, setTitle] = useState('I Tried The 100-Hour YouTube Challenge (UNBELIEVABLE RESULTS)');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);

  const charCount = title.length;
  const wordCount = title.trim().split(/\s+/).filter(Boolean).length;
  const hasNumbers = /\d/.test(title);
  const hasPowerWords = /(secret|proven|ultimate|unbelievable|challenge|tested|worst|best)/i.test(title);

  const getScore = () => {
    let score = 50;
    if (charCount >= 40 && charCount <= 70) score += 20;
    if (hasNumbers) score += 15;
    if (hasPowerWords) score += 15;
    return Math.min(100, score);
  };

  const score = getScore();

  const handleGenerateAiSuggestions = async () => {
    if (!title.trim()) return;
    setLoadingAi(true);
    setAiSuggestions([]);

    try {
      const res = await fetch('/api/ai/title-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: title, tone: 'Exciting' })
      });
      const data = await res.json();
      if (data.titles && Array.isArray(data.titles)) {
        setAiSuggestions(data.titles.slice(0, 5));
      } else {
        // Fallback intelligent variations
        setAiSuggestions([
          `I Spent 100 Hours Testing This YouTube Hack (${title})`,
          `Why Nobody Tells You The Truth About ${title}`,
          `100 Hours Later: The Secret Behind ${title}`
        ]);
      }
    } catch (e) {
      setAiSuggestions([
        `I Spent 100 Hours Testing This YouTube Hack (${title})`,
        `Why Nobody Tells You The Truth About ${title}`,
        `100 Hours Later: The Secret Behind ${title}`
      ]);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Title Analyzer — Audit Video Title for Higher CTR" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Title Analyzer
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Evaluate clickability, character limits, power words, and curiosity triggers in your video title.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Enter Video Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '16px' }}
              />
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Title Clickability Score</div>
              <div style={{ fontSize: '48px', fontWeight: '800', color: score > 75 ? 'var(--success)' : 'var(--warning)', lineHeight: '1' }}>
                {score} / 100
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Character Length</span>
                <div style={{ fontWeight: '700' }}>{charCount} / 100 {charCount <= 70 ? '✅ Ideal' : '⚠️ Truncated on Mobile'}</div>
              </div>
              <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Power Words</span>
                <div style={{ fontWeight: '700' }}>{hasPowerWords ? '✅ Present' : '❌ Add emotional triggers'}</div>
              </div>
              <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Contains Digits</span>
                <div style={{ fontWeight: '700' }}>{hasNumbers ? '✅ Yes' : '💡 Numbers boost CTR'}</div>
              </div>
            </div>

            {/* AI Title Recommendations */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <button
                type="button"
                onClick={handleGenerateAiSuggestions}
                disabled={loadingAi}
                className="btn btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}
              >
                <Sparkles size={16} /> {loadingAi ? 'AI Rewriting Title Options...' : 'Generate AI Optimized Variations'}
              </button>

              {aiSuggestions.length > 0 && (
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>AI Recommended Title Variations:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {aiSuggestions.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setTitle(item)}
                        style={{
                          padding: '10px 12px',
                          background: 'var(--surface)',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          cursor: 'pointer',
                          fontSize: '14px',
                          display: 'flex',
                          justify: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span>{item}</span>
                        <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>Apply</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
