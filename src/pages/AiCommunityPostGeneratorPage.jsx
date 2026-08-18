import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { MessageSquare, Sparkles, Copy, Check, ThumbsUp, Heart, MessageCircle } from 'lucide-react';

export default function AiCommunityPostGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [postType, setPostType] = useState('hype');
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('/api/ai/community-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, type: postType })
      });
      const data = await response.json();
      if (data.posts && data.posts.length > 0) {
        setPost(data.posts[0]);
      } else {
        generateFallback();
      }
    } catch (err) {
      generateFallback();
    } finally {
      setLoading(false);
    }
  };

  const generateFallback = () => {
    if (postType === 'hype') {
      setPost({
        content: `🚨 NEW VIDEO DROPPING TOMORROW! 🚨\n\nWe're diving deep into ${topic}. Drop a comment below with your biggest question and I might answer it live during the premier! 👇\n\nWhat topic should we tackle next week?`,
        pollOptions: ['Deep Dive Tutorial', 'Behind-the-Scenes Q&A', 'Case Study breakdown', 'Live Stream Q&A']
      });
    } else if (postType === 'poll') {
      setPost({
        content: `🤔 QUICK QUESTION FOR THE COMMUNITY!\n\nRegarding ${topic}, what is your single biggest hurdle right now? Vote below so I can craft our next video around what you need most! 👇`,
        pollOptions: ['Getting started / Planning', 'Consistency & Time', 'Technical setup & editing', 'Scaling & monetization']
      });
    } else {
      setPost({
        content: `🎉 MILESTONE UPDATE & THANK YOU!\n\nHuge shoutout to all of you supporting our recent updates on ${topic}! Creating this content for you has been an absolute blast. Drop your favorite emoji below if you've been here since day one! 🔥🙌`,
        pollOptions: null
      });
    }
  };

  const handleCopy = () => {
    if (!post) return;
    let fullText = post.content;
    if (post.pollOptions && post.pollOptions.length > 0) {
      fullText += '\n\nPoll Options:\n' + post.pollOptions.map((opt, i) => `${i + 1}. ${opt}`).join('\n');
    }
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI Community Post Generator — Draft Viral Updates" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>🥇 AI Community Post Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Draft high-engagement YouTube Community tab updates, polls, and video hype announcements in seconds.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Post Strategy / Type</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'hype', label: '🔥 New Video Hype' },
                    { id: 'poll', label: '📊 Audience Poll' },
                    { id: 'appreciation', label: '🎉 Creator Milestone' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPostType(t.id)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        background: postType === t.id ? 'var(--primary)' : 'var(--bg)',
                        color: postType === t.id ? '#fff' : 'var(--text-primary)',
                        border: postType === t.id ? '1px solid var(--primary)' : '1px solid var(--border)'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Topic or Announcement Focus</label>
                <input
                  type="text"
                  placeholder="e.g. 'New Video on SEO Strategies' or '10K Subscribers Thank You'"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px' }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '14px', fontSize: '15px', fontWeight: '600' }}>
                <Sparkles size={18} style={{ marginRight: '8px' }} /> {loading ? 'Drafting Post...' : 'Generate Community Post'}
              </button>
            </form>

            {post && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)' }}>YouTube Community Tab Preview</h3>
                  <button onClick={handleCopy} className="btn btn-sm btn-primary" style={{ fontSize: '13px' }}>
                    {copied ? <Check size={14} style={{ marginRight: '4px' }} /> : <Copy size={14} style={{ marginRight: '4px' }} />}
                    {copied ? 'Copied Post!' : 'Copy to Clipboard'}
                  </button>
                </div>

                {/* Mock YouTube Community Post Box */}
                <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', background: 'var(--bg)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-[#ff0000, #cc0000]', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                      YT
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '15px' }}>Your YouTube Channel</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Just now • Public</div>
                    </div>
                  </div>

                  <p style={{ fontSize: '15px', lineHeight: '1.6', whiteSpace: 'pre-wrap', marginBottom: '16px' }}>
                    {post.content}
                  </p>

                  {post.pollOptions && post.pollOptions.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      {post.pollOptions.map((opt, i) => (
                        <div key={i} style={{ border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-secondary)', fontSize: '14px', fontWeight: '500', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{opt}</span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>0%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--border)', paddingTop: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><ThumbsUp size={16} /> 1.2K</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><Heart size={16} /> 480</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><MessageCircle size={16} /> 94 Comments</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <FaqSection faqs={toolFaqs['community-post-generator'] || []} />
        </div>
      </main>
    </>
  );
}
