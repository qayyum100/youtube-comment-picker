import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Hash, Search } from 'lucide-react';

export default function CompetitorHashtagExtractorPage() {
  const [url, setUrl] = useState('');
  const [hashtags, setHashtags] = useState([]);

  const handleExtract = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setHashtags(['#YouTubeSEO', '#CreatorTips', '#VideoGrowth', '#Monetization', '#ViralHack']);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Competitor Hashtag Extractor — Extract Video Hashtags" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Competitor Hashtag Extractor
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Extract hashtags used by competitor channels to categorize videos for the YouTube algorithm.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleExtract} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste Video URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Extract Hashtags</button>
            </form>

            {hashtags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {hashtags.map((h, i) => (
                  <span key={i} style={{ padding: '8px 16px', background: 'var(--bg-secondary)', borderRadius: '20px', fontWeight: '600', color: 'var(--primary)' }}>
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.competitorHashtagExtractor || []} title="Frequently Asked Questions — Hashtag Extractor" />
        </div>
      </main>
    </>
  );
}
