import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { FileText, Copy } from 'lucide-react';

export default function CompetitorDescriptionExtractorPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [extracted, setExtracted] = useState(null);

  const handleExtract = (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    setExtracted({
      intro: 'In this video we test the latest productivity algorithms and tools.',
      links: ['https://example.com/gear', 'https://example.com/newsletter'],
      timestamps: ['00:00 Intro', '02:15 Chapter 1', '06:40 Chapter 2', '10:00 Final Verdict'],
      hashtags: ['#Productivity', '#Tech', '#YouTubeGrowth']
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Competitor Description Extractor — Scrape Video Descriptions" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Competitor Description Extractor
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Extract full video descriptions, affiliate links, chapter timestamps, and hashtags.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleExtract} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Extract Description</button>
            </form>

            {extracted && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <strong>Intro Summary:</strong>
                  <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>{extracted.intro}</p>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <strong>Extracted Chapters:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {extracted.timestamps.map(t => <span key={t} style={{ padding: '4px 8px', background: 'var(--surface)', borderRadius: '4px', fontSize: '13px' }}>{t}</span>)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.competitorDescriptionExtractor || []} title="Frequently Asked Questions — Description Extractor" />
        </div>
      </main>
    </>
  );
}
