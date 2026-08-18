import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Share2, Sparkles, Copy, Check, Twitter, Linkedin, Video, Mail, Instagram } from 'lucide-react';

export default function AiContentRepurposerPage() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [repurposed, setRepurposed] = useState(null);
  const [activeTab, setActiveTab] = useState('tweet');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('/api/ai/content-repurposer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, title })
      });
      const data = await response.json();
      if (data.repurposed) setRepurposed(data.repurposed);
      else generateFallback();
    } catch (err) {
      generateFallback();
    } finally {
      setLoading(false);
    }
  };

  const generateFallback = () => {
    setRepurposed({
      tweet: `🚀 Quick insight from our latest breakdown "${title || 'YouTube Strategy'}":\n\n${text.slice(0, 180)}...\n\nWhat are your thoughts on this approach? 👇 #ContentCreator #YouTube`,
      linkedin: `💡 Key Learnings on Video Optimization:\n\n${text.slice(0, 260)}\n\nHere are 3 quick rules to follow:\n1. Focus on immediate audience value\n2. Maintain consistent visual branding\n3. Optimize description for search\n\nHow do you structure your content strategy?`,
      shortsHook: `Did you know that ${text.slice(0, 90)}? Here is the 1-minute breakdown on how to leverage this right now!`,
      newsletter: `Hey Creators!\n\nIn today's newsletter issue, we break down: ${title || 'Content Optimization'}.\n\n${text.slice(0, 350)}\n\nKeep creating,\n- Your Channel Team`,
      igCaption: `✨ NEW POST ✨\n\n${title || 'Creator Insights'}\n\n${text.slice(0, 220)}\n\nDouble tap if this resonated with you! ❤️ Save this post for later 📌`
    });
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    { id: 'tweet', label: 'X / Twitter', icon: Twitter },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { id: 'shortsHook', label: 'Shorts / TikTok Script', icon: Video },
    { id: 'newsletter', label: 'Newsletter Email', icon: Mail },
    { id: 'igCaption', label: 'Instagram Caption', icon: Instagram }
  ];

  return (
    <>
      <SeoHead pageType="tool" title="AI Content Repurposer — Turn Videos into Social Posts" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>🥇 AI Content Repurposer</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Turn video transcripts and scripts into X threads, LinkedIn posts, Shorts scripts, newsletters & IG captions.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Video Title (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 10 YouTube SEO Hacks to Double Your Views"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Video Script / Excerpt / Transcript</label>
                <textarea
                  rows={5}
                  placeholder="Paste your video transcript or key notes..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px' }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '14px', fontSize: '15px', fontWeight: '600' }}>
                <Share2 size={18} style={{ marginRight: '8px' }} /> {loading ? 'Repurposing Content...' : 'Repurpose Across 5 Platforms'}
              </button>
            </form>

            {repurposed && (
              <div>
                {/* Platform Tabs */}
                <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {platforms.map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActiveTab(p.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          background: activeTab === p.id ? 'var(--primary)' : 'var(--bg)',
                          color: activeTab === p.id ? '#fff' : 'var(--text-primary)',
                          border: activeTab === p.id ? '1px solid var(--primary)' : '1px solid var(--border)'
                        }}
                      >
                        <Icon size={14} /> {p.label}
                      </button>
                    );
                  })}
                </div>

                {/* Content Area */}
                <div style={{ border: '1px solid var(--border)', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>
                      Formatted Output for {platforms.find(p => p.id === activeTab)?.label}
                    </h4>
                    <button onClick={() => handleCopy(repurposed[activeTab])} className="btn btn-sm btn-primary">
                      {copied ? <Check size={14} style={{ marginRight: '4px' }} /> : <Copy size={14} style={{ marginRight: '4px' }} />}
                      {copied ? 'Copied' : 'Copy Post'}
                    </button>
                  </div>
                  <pre style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', fontSize: '14px', whiteSpace: 'pre-wrap', lineHeight: '1.6', margin: 0, border: '1px solid var(--border)' }}>
                    {repurposed[activeTab]}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <FaqSection faqs={toolFaqs['script-generator'] || []} />
        </div>
      </main>
    </>
  );
}
