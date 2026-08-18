import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { MessageSquare, Sparkles, Copy, Check, ThumbsUp, Star } from 'lucide-react';

export default function AiCommentReplyGeneratorPage() {
  const [comment, setComment] = useState('');
  const [tone, setTone] = useState('Appreciative');
  const [replies, setReplies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const tones = ['Appreciative', 'Helpful & Informative', 'Witty & Engaging', 'Question Back', 'Promotional'];

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('/api/ai/comment-replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, tone })
      });
      const data = await response.json();
      setReplies(data.replies || getFallbackReplies());
    } catch (err) {
      setReplies(getFallbackReplies());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackReplies = () => {
    if (tone === 'Witty & Engaging') {
      return [
        `Haha thanks! Glad you made it to the end of the video before the algorithm caught us! 😄`,
        `That is the real secret right there! Shhh don't tell the comment section 😉`,
        `100%! If this helped, wait until you see next week's drop! 🚀`
      ];
    }
    return [
      `Appreciate you watching! Really glad this breakdown was helpful for you. 🙌`,
      `Great question! I expanded on that point further in the video description below. Check it out! 👇`,
      `Thanks so much for the feedback! What topic would you like to see us tackle next?`
    ];
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI Comment Reply Generator — Engage Audience Faster" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>🥇 AI Comment Reply Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate smart, authentic responses to viewer comments to boost community engagement & channel authority.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Select Reply Tone</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {tones.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        background: tone === t ? 'var(--primary)' : 'var(--bg)',
                        color: tone === t ? '#fff' : 'var(--text-primary)',
                        border: tone === t ? '1px solid var(--primary)' : '1px solid var(--border)'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Viewer Comment</label>
                <textarea
                  rows={3}
                  placeholder="Paste viewer comment here (e.g. 'Loved the tip at 3:15, but how do I set this up on mobile?')"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px' }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '14px', fontSize: '15px', fontWeight: '600' }}>
                <MessageSquare size={18} style={{ marginRight: '8px' }} /> {loading ? 'Generating Replies...' : 'Generate 3 Smart Replies'}
              </button>
            </form>

            {replies && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '16px' }}>Suggested Reply Options</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {replies.map((reply, i) => (
                    <div key={i} style={{ border: '1px solid var(--border)', background: 'var(--bg)', padding: '16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                      <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5', flex: 1 }}>{reply}</p>
                      <button
                        onClick={() => handleCopy(reply, i)}
                        className="btn btn-sm btn-outline"
                        style={{ flexShrink: 0, fontSize: '13px' }}
                      >
                        {copiedIndex === i ? <Check size={14} style={{ marginRight: '4px', color: 'green' }} /> : <Copy size={14} style={{ marginRight: '4px' }} />}
                        {copiedIndex === i ? 'Copied' : 'Copy'}
                      </button>
                    </div>
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
