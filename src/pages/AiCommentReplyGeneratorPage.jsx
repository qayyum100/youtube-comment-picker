import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function AiCommentReplyGeneratorPage() {
  const [comment, setComment] = useState('');
  const [replies, setReplies] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!comment) return;
    setReplies([
      'Appreciate you watching! Glad this was helpful. 🙌',
      'Great question! I expand on that point further in the video description below. 👇',
      'Thanks so much for the feedback! What topic would you like to see next?'
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI Comment Reply Generator — Engage Audience Faster" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>AI Comment Reply Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Generate smart, authentic responses to viewer comments to boost community engagement.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Paste viewer comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <MessageSquare size={18} style={{ marginRight: '8px' }} /> Generate Replies
              </button>
            </form>

            {replies && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>Suggested Replies</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {replies.map((r, i) => (
                    <div key={i} style={{ padding: '12px', borderRadius: '6px', background: 'var(--bg)', fontSize: '14px' }}>{r}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['comment-analyzer'] || []} />
        </div>
      </main>
    </>
  );
}
