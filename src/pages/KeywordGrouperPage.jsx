import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { FolderPlus, Layers } from 'lucide-react';

export default function KeywordGrouperPage() {
  const [inputKeywords, setInputKeywords] = useState('youtube seo, youtube tags, video title tips, youtube thumbnail design');
  const [groups, setGroups] = useState(null);

  const handleGroup = (e) => {
    e.preventDefault();
    setGroups({
      'SEO & Metadata': ['youtube seo', 'youtube tags', 'video title tips'],
      'Design & Packaging': ['youtube thumbnail design']
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Keyword Grouper — Categorize Keywords by Topic" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Keyword Grouper
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Organize bulk keyword lists into logical thematic groups for channel playlists and content series.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGroup} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <textarea
                rows={4}
                value={inputKeywords}
                onChange={(e) => setInputKeywords(e.target.value)}
                placeholder="Paste comma or newline separated keywords"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Group Keywords</button>
            </form>

            {groups && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(groups).map(([cat, list]) => (
                  <div key={cat} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '700', marginBottom: '8px', color: 'var(--primary)' }}>📁 {cat}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {list.map(k => (
                        <span key={k} style={{ padding: '4px 10px', background: 'var(--surface)', borderRadius: '16px', fontSize: '13px', border: '1px solid var(--border)' }}>
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.keywordGrouper || []} title="Frequently Asked Questions — Keyword Grouper" />
        </div>
      </main>
    </>
  );
}
