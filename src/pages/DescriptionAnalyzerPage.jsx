import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { FileText, CheckCircle, AlertCircle, Link, Hash, Sparkles } from 'lucide-react';

export default function DescriptionAnalyzerPage() {
  const [description, setDescription] = useState(
    `In this video, I reveal the exact step-by-step guide to grow your YouTube channel in 2026.\n\nCHAPTERS:\n00:00 - Introduction\n01:30 - YouTube Algorithm Secrets\n05:45 - High CTR Thumbnail Formula\n10:15 - Final Thoughts\n\n🔗 Links Mentioned:\nhttps://example.com/tool\n\n#YouTubeGrowth #ContentCreator #GiveawayPicker`
  );
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiEnhancedDescription, setAiEnhancedDescription] = useState('');

  const hasTimestamps = /00:\d{2}|0\d:\d{2}/.test(description);
  const hasLinks = /https?:\/\//.test(description);
  const hasHashtags = /#\w+/.test(description);
  const charCount = description.length;

  const handleEnhanceWithAi = async () => {
    if (!description.trim()) return;
    setLoadingAi(true);

    try {
      const res = await fetch('/api/ai/description-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: description.slice(0, 100) })
      });
      const data = await res.json();
      if (data.description) {
        setAiEnhancedDescription(data.description);
      } else {
        setAiEnhancedDescription(
          `${description}\n\n📌 SUBSCRIBE for more weekly YouTube growth & creator tools updates!\n🔔 Turn on post notifications to never miss an upload.`
        );
      }
    } catch (e) {
      setAiEnhancedDescription(
        `${description}\n\n📌 SUBSCRIBE for more weekly YouTube growth & creator tools updates!\n🔔 Turn on post notifications to never miss an upload.`
      );
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Description Analyzer — Audit SEO & Chapters" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Description Analyzer
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Audit your YouTube description for video chapters, links, hashtags, and SEO optimization.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Video Description Text</label>
              <textarea
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontFamily: 'monospace', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div className="card" style={{ padding: '16px', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Video Chapters / Timestamps</div>
                <div style={{ fontWeight: '700', color: hasTimestamps ? 'var(--success)' : 'var(--warning)', marginTop: '4px' }}>
                  {hasTimestamps ? '✅ Detected' : '❌ Missing Timestamps'}
                </div>
              </div>

              <div className="card" style={{ padding: '16px', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>External Links</div>
                <div style={{ fontWeight: '700', color: hasLinks ? 'var(--success)' : 'var(--warning)', marginTop: '4px' }}>
                  {hasLinks ? '✅ Detected' : '⚠️ No Links Found'}
                </div>
              </div>

              <div className="card" style={{ padding: '16px', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Hashtags Detected</div>
                <div style={{ fontWeight: '700', color: hasHashtags ? 'var(--success)' : 'var(--warning)', marginTop: '4px' }}>
                  {hasHashtags ? '✅ Present' : '⚠️ Add 3 Hashtags'}
                </div>
              </div>
            </div>

            {/* AI Enhancement Section */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <button
                type="button"
                onClick={handleEnhanceWithAi}
                disabled={loadingAi}
                className="btn btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}
              >
                <Sparkles size={16} /> {loadingAi ? 'AI Optimizing Description...' : 'Enhance Description with AI SEO'}
              </button>

              {aiEnhancedDescription && (
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700' }}>AI Enhanced Description:</div>
                    <button
                      type="button"
                      onClick={() => setDescription(aiEnhancedDescription)}
                      className="btn btn-secondary btn-sm"
                    >
                      Use This Description
                    </button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', margin: 0 }}>
                    {aiEnhancedDescription}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
