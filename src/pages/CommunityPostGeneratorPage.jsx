import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function CommunityPostGeneratorPage() {
  const [goal, setGoal] = useState('engagement');
  const [topic, setTopic] = useState('');
  const [post, setPost] = useState('');

  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai/community-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, type: goal })
      });
      const data = await response.json();
      setPost(data.post || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SeoHead pageType="tool" title="Community Post Generator — YouTube Community Post Ideas" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Community Post Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate viral YouTube Community tab posts that spark comments, shares, and audience connection.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontWeight: '600', display: 'block', marginBottom: '6px' }}>Post Type</label>
                  <select value={goal} onChange={(e) => setGoal(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <option value="engagement">Engagement / Hot Take</option>
                    <option value="poll">Poll Post</option>
                    <option value="announcement">Announcement</option>
                    <option value="question">Question Post</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: '600', display: 'block', marginBottom: '6px' }}>Topic</label>
                  <input type="text" placeholder="Your topic..." value={topic} onChange={(e) => setTopic(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                {loading ? 'Generating...' : 'Generate Community Post'}
              </button>
            </form>
            {post && (
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', whiteSpace: 'pre-line', fontSize: '15px', lineHeight: '1.6' }}>
                {post}
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.communityPostGenerator || []} title="FAQs — Community Post Generator" />
        </div>
      </main>
    </>
  );
}
