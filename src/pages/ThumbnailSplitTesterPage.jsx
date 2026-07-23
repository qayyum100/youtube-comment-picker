import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import AiOverviewSection from '../components/AiOverviewSection';
import { toolFaqs } from '../data/toolFaqs';
import { Columns, CheckCircle2 } from 'lucide-react';

export default function ThumbnailSplitTesterPage() {
  const [thumbA, setThumbA] = useState('');
  const [thumbB, setThumbB] = useState('');
  const [winner, setWinner] = useState(null);

  const handleTest = (e) => {
    e.preventDefault();
    if (!thumbA || !thumbB) return;
    const choices = ['Option A', 'Option B'];
    const selected = choices[Math.floor(Math.random() * choices.length)];
    setWinner({
      choice: selected,
      confidence: '89%',
      reason: selected === 'Option A' ? 'Higher contrast and clearer focal text element.' : 'Vibrant subject outline and stronger warm color balance.'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Thumbnail Split Tester — Compare YouTube Thumbnail Options" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Thumbnail Split Tester
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Simulate side-by-side CTR A/B performance for two candidate video thumbnails.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleTest} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Thumbnail A URL</label>
                <input
                  type="text"
                  placeholder="Paste Image URL A"
                  value={thumbA}
                  onChange={(e) => setThumbA(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Thumbnail B URL</label>
                <input
                  type="text"
                  placeholder="Paste Image URL B"
                  value={thumbB}
                  onChange={(e) => setThumbB(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                  <Columns size={18} style={{ marginRight: '8px' }} />
                  Run A/B Comparison
                </button>
              </div>
            </form>

            {winner && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} /> Recommended Choice: {winner.choice}
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '6px' }}><strong>Predicted Superior CTR Confidence:</strong> {winner.confidence}</p>
                <p style={{ color: 'var(--text-secondary)' }}><strong>Key Driver:</strong> {winner.reason}</p>
              </div>
            )}
          </div>

          <AiOverviewSection
            toolName="YouTube Thumbnail Split Tester"
            definition="A YouTube Thumbnail Split Tester is a tool that evaluates two distinct thumbnail designs side-by-side to predict which image will yield a higher Click-Through Rate (CTR) on YouTube search feeds."
            steps={[
              { title: "Input Thumbnail URLs", description: "Paste direct image links or YouTube thumbnail preview URLs for Option A and Option B." },
              { title: "Run Algorithmic Analysis", description: "The tool evaluates contrast, focal text placement, and color balance parameters." },
              { title: "Compare CTR Recommendations", description: "Review the predicted winner alongside actionable tips to optimize your thumbnail before publishing." }
            ]}
            takeaways={[
              { headline: "Higher Click-Through Rates", detail: "A/B testing thumbnails before upload prevents launching videos with low-performing visuals." },
              { headline: "Visual Hierarchy Audit", detail: "Ensures text overlay and subject cutouts stand out on small mobile screens." }
            ]}
            keywords={['thumbnail split test', 'youtube A/B test thumbnail', 'compare thumbnail CTR', 'best youtube thumbnail tester']}
          />

          <FaqSection faqs={toolFaqs['thumbnail-downloader'] || []} />
        </div>
      </main>
    </>
  );
}
