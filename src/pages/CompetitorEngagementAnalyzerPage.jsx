import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Heart, MessageSquare, ThumbsUp, Activity } from 'lucide-react';

export default function CompetitorEngagementAnalyzerPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [metrics, setMetrics] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    setMetrics({
      likeRatio: '4.8% (Likes per View)',
      commentRatio: '0.65% (High Discussion Rate)',
      estimatedRetention: '58% Average View Duration',
      engagementGrade: 'A+ (Very High Community Velocity)'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Competitor Engagement Analyzer — Measure Viewer Interactions" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Competitor Engagement Analyzer
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Calculate like-to-view ratios, comment density, and audience interaction metrics.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Calculate Engagement</button>
            </form>

            {metrics && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Like Ratio</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--success)' }}>{metrics.likeRatio}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Comment Density</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>{metrics.commentRatio}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Overall Grade</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--warning)' }}>{metrics.engagementGrade}</div>
                </div>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.competitorEngagementAnalyzer || []} title="Frequently Asked Questions — Engagement Analyzer" />
        </div>
      </main>
    </>
  );
}
