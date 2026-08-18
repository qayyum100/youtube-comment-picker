import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { FileText, Sparkles, Copy, Check, Download, Clock } from 'lucide-react';

export default function AiVideoOutlineGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [targetLength, setTargetLength] = useState('10min');
  const [outline, setOutline] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('/api/ai/outline-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, length: targetLength })
      });
      const data = await response.json();
      if (data.outline) setOutline(data.outline);
      else generateFallback();
    } catch (err) {
      generateFallback();
    } finally {
      setLoading(false);
    }
  };

  const generateFallback = () => {
    setOutline([
      {
        section: '1. Viral Hook & Core Premise',
        timestamp: '0:00 - 0:45',
        purpose: 'Grab viewer attention within the first 5 seconds and state the core value proposition.',
        bullets: [
          'State the main problem viewers face regarding ' + topic,
          'Show proof or result preview of solving this problem',
          'Quick teaser of key secret revealed later in the video'
        ]
      },
      {
        section: '2. Context & Background Setup',
        timestamp: '0:45 - 2:30',
        purpose: 'Establish authority and explain why traditional methods fail.',
        bullets: [
          'Why most advice on ' + topic + ' is outdated',
          'The core framework we will cover today'
        ]
      },
      {
        section: '3. Step-by-Step Blueprint',
        timestamp: '2:30 - 7:15',
        purpose: 'Deliver maximum actionable value with step 1, step 2, and step 3.',
        bullets: [
          'Step 1: Setup foundation & essential tools',
          'Step 2: Core execution & optimization strategy',
          'Step 3: Advanced secret tip for 10x efficiency'
        ]
      },
      {
        section: '4. Critical Mistakes to Avoid',
        timestamp: '7:15 - 9:00',
        purpose: 'Increase retention by highlighting common pitfalls.',
        bullets: [
          'Mistake #1: Skipping proper planning',
          'Mistake #2: Ignoring analytics feedback'
        ]
      },
      {
        section: '5. Actionable Summary & CTA',
        timestamp: '9:00 - 10:00',
        purpose: 'Smooth transition into end-screen CTA to watch next video.',
        bullets: [
          'Quick 15-second recap of main steps',
          'Call to action: Click recommended video on screen'
        ]
      }
    ]);
  };

  const handleCopy = () => {
    if (!outline) return;
    const text = outline.map(item => `${item.section} (${item.timestamp})\nPurpose: ${item.purpose}\n` + item.bullets.map(b => `  - ${b}`).join('\n')).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI Video Outline Generator — Structure Viral Content" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>🥇 AI Video Outline Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate structured, high-retention video blueprints and talking points for any topic.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Video Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. How to Monetize a Small YouTube Channel in 2026"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px' }}
                    required
                  />
                </div>

                <div style={{ width: '180px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Video Length</label>
                  <select
                    value={targetLength}
                    onChange={(e) => setTargetLength(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '14px' }}
                  >
                    <option value="5min">5 Minutes (Short)</option>
                    <option value="10min">10 Minutes (Standard)</option>
                    <option value="20min">20+ Minutes (Deep Dive)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '14px', fontSize: '15px', fontWeight: '600' }}>
                <FileText size={18} style={{ marginRight: '8px' }} /> {loading ? 'Building Blueprint...' : 'Generate Video Outline'}
              </button>
            </form>

            {outline && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)' }}>Structured Content Blueprint</h3>
                  <button onClick={handleCopy} className="btn btn-sm btn-primary">
                    {copied ? <Check size={14} style={{ marginRight: '4px' }} /> : <Copy size={14} style={{ marginRight: '4px' }} />}
                    {copied ? 'Copied Outline' : 'Copy Plaintext'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {outline.map((sec, i) => (
                    <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '18px', background: 'var(--bg-secondary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>{sec.section}</h4>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', background: 'var(--bg)', padding: '4px 10px', borderRadius: '12px', border: '1px solid var(--border)', fontWeight: '600' }}>
                          <Clock size={12} /> {sec.timestamp}
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', fontStyle: 'italic' }}>
                        🎯 Purpose: {sec.purpose}
                      </p>
                      <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
                        {sec.bullets.map((b, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <FaqSection faqs={toolFaqs['title-generator'] || []} />
        </div>
      </main>
    </>
  );
}
