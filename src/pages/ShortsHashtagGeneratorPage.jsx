import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Hash, Sparkles } from 'lucide-react';

export default function ShortsHashtagGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai/shorts-hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await response.json();
      setHashtags(data.hashtags || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SeoHead pageType="tool" title="Shorts Hashtag Generator — Viral Hashtags for YouTube Shorts" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Shorts Hashtag Generator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate viral, high-converting hashtags optimized specifically for the YouTube Shorts feed.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter Short topic (e.g. 'fitness tips')"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">
                {loading ? 'Generating...' : 'Generate Hashtags'}
              </button>
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

          <FaqSection customFaqs={toolFaqs.shortsHashtagGenerator || []} title="Frequently Asked Questions — Shorts Hashtags" />
        </div>
      </main>
    </>
  );
}
