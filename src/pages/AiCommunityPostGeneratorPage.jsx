import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function AiCommunityPostGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [post, setPost] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic) return;
    setPost(`🚨 NEW VIDEO DROPPING TOMORROW! 🚨\n\nWe're diving deep into ${topic}. Drop a comment below with your biggest question and I might answer it in the video!\n\n👇 Vote in the poll below: Which topic should we tackle next week?`);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI Community Post Generator — Draft Engaging Updates" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>AI Community Post Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Generate high-converting YouTube Community tab posts and polls.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Topic or announcement idea..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                <Sparkles size={18} style={{ marginRight: '8px' }} /> Draft Post
              </button>
            </form>

            {post && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>Community Tab Draft</h3>
                <pre style={{ background: 'var(--bg)', padding: '14px', borderRadius: '6px', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {post}
                </pre>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['community-post-generator'] || []} />
        </div>
      </main>
    </>
  );
}
