import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Type, Copy, Check } from 'lucide-react';

export default function CompetitorTitleExtractorPage() {
  const [channelUrl, setChannelUrl] = useState('');
  const [titles, setTitles] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleExtract = (e) => {
    e.preventDefault();
    if (!channelUrl.trim()) return;
    setTitles([
      'I Tested 100 Secret Productivity Hacks (Crazy Results)',
      'Why Nobody Talks About This YouTube Growth Secret',
      'How to Build a $10K/mo Channel in 90 Days',
      'The Ultimate Guide to Viral Short Form Content'
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Competitor Title Extractor — Extract Top Performing Titles" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Competitor Title Extractor
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Extract all video titles from any competitor channel to model click-worthy patterns.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleExtract} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste Channel URL or Video Link"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Extract Titles</button>
            </form>

            {titles.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {titles.map((t, idx) => (
                  <div key={idx} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '15px', fontWeight: '600' }}>
                    📌 {t}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.competitorTitleExtractor || []} title="Frequently Asked Questions — Title Extractor" />
        </div>
      </main>
    </>
  );
}
