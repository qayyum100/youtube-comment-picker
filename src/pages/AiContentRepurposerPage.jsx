import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Share2, Sparkles } from 'lucide-react';

export default function AiContentRepurposerPage() {
  const [text, setText] = useState('');
  const [repurposed, setRepurposed] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!text) return;
    setRepurposed({
      tweet: `🚀 Quick insight: ${text.slice(0, 120)}... #ContentCreator #YouTube`,
      linkedin: `Key learnings on video strategy:\n\n1. ${text.slice(0, 100)}...\n\nWhat are your thoughts on this approach?`,
      shortsHook: `Did you know that ${text.slice(0, 80)}? Here's why this matters!`
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI Content Repurposer — Turn Videos into Social Posts" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>AI Content Repurposer</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Repurpose video scripts into X (Twitter) threads, LinkedIn posts, and Shorts scripts.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <textarea
                rows={4}
                placeholder="Paste video excerpt or transcript..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Share2 size={18} style={{ marginRight: '8px' }} /> Repurpose Content
              </button>
            </form>

            {repurposed && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '4px' }}>X / Twitter Post</h4>
                  <pre style={{ background: 'var(--bg)', padding: '10px', borderRadius: '6px', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{repurposed.tweet}</pre>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '4px' }}>LinkedIn Post</h4>
                  <pre style={{ background: 'var(--bg)', padding: '10px', borderRadius: '6px', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{repurposed.linkedin}</pre>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '4px' }}>Shorts Video Hook</h4>
                  <pre style={{ background: 'var(--bg)', padding: '10px', borderRadius: '6px', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{repurposed.shortsHook}</pre>
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
