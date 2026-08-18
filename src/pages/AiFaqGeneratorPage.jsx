import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { HelpCircle, Sparkles, Copy, Check } from 'lucide-react';

export default function AiFaqGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [faqs, setFaqs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('/api/ai/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await response.json();
      if (data.faqs && data.faqs.length > 0) setFaqs(data.faqs);
      else generateFallback();
    } catch (err) {
      generateFallback();
    } finally {
      setLoading(false);
    }
  };

  const generateFallback = () => {
    setFaqs([
      { q: `How long does it take to see results with ${topic}?`, a: `Most creators notice significant improvements within 14 to 30 days of consistent execution.` },
      { q: `Do I need paid software or expensive equipment for ${topic}?`, a: `No! Built-in browser features and free tools are more than sufficient to get started.` },
      { q: `What is the biggest mistake creators make with ${topic}?`, a: `Skipping early research and rushing execution without inspecting audience interest first.` },
      { q: `Is this strategy suitable for small YouTube channels?`, a: `Absolutely. Small channels benefit even more because it targets low-competition search queries.` }
    ]);
  };

  const handleCopy = () => {
    if (!faqs) return;
    const formattedText = "❓ FREQUENTLY ASKED QUESTIONS:\n\n" + faqs.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI FAQ Generator — Generate Video & Description FAQs" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>🥇 AI FAQ Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate high-search-intent Q&A blocks for video descriptions, pinned comments, and website landing pages.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter your video topic (e.g. YouTube Monetization, Video Editing Tips)..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, minWidth: '260px', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px' }}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0 28px', fontSize: '15px', fontWeight: '600' }}>
                <HelpCircle size={18} style={{ marginRight: '8px' }} /> {loading ? 'Generating FAQs...' : 'Generate Q&A Block'}
              </button>
            </form>

            {faqs && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>Description Q&A Block</h3>
                  <button onClick={handleCopy} className="btn btn-sm btn-primary">
                    {copied ? <Check size={14} style={{ marginRight: '4px' }} /> : <Copy size={14} style={{ marginRight: '4px' }} />}
                    {copied ? 'Copied Q&A' : 'Copy Description Block'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {faqs.map((f, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                      <strong style={{ display: 'block', fontSize: '15px', marginBottom: '6px', color: 'var(--text-primary)' }}>❓ Q: {f.q}</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>💡 A: {f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <FaqSection faqs={toolFaqs['description-generator'] || []} />
        </div>
      </main>
    </>
  );
}
