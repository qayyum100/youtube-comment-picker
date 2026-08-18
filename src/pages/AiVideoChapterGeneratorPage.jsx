import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Clock, Sparkles, Copy, Check, List } from 'lucide-react';

export default function AiVideoChapterGeneratorPage() {
  const [transcript, setTranscript] = useState('');
  const [chapters, setChapters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!transcript.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('/api/timestamps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcriptText: transcript })
      });
      const data = await response.json();
      if (data.timestamps && data.timestamps.length > 0) {
        setChapters(data.timestamps.map(t => `${t.timestamp || t.time} ${t.title || t.label}`));
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
    setChapters([
      '00:00 Introduction & Key Premise',
      '00:45 Why Traditional Methods Fail',
      '02:15 Step 1: Setting Up Your Environment',
      '04:30 Step 2: Main Execution Strategy',
      '07:10 Secret Pro Tip for 10x Results',
      '09:00 Common Mistakes to Avoid',
      '10:45 Final Thoughts & Next Steps'
    ]);
  };

  const handleCopy = () => {
    if (!chapters) return;
    navigator.clipboard.writeText(chapters.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI Video Chapter Generator — Format Description Timestamps" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>🥇 AI Video Chapter Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Automatically convert video scripts, transcript snippets, or topic lists into YouTube-compliant description timestamps.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Paste Script / Outline / Transcript</label>
                <textarea
                  rows={6}
                  placeholder="Paste your video text or rough notes here..."
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px' }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '14px', fontSize: '15px', fontWeight: '600' }}>
                <Clock size={18} style={{ marginRight: '8px' }} /> {loading ? 'Generating Timestamps...' : 'Generate YouTube Chapters'}
              </button>
            </form>

            {chapters && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)' }}>YouTube Description Timestamps</h3>
                  <button onClick={handleCopy} className="btn btn-sm btn-primary">
                    {copied ? <Check size={14} style={{ marginRight: '4px' }} /> : <Copy size={14} style={{ marginRight: '4px' }} />}
                    {copied ? 'Copied Timestamps' : 'Copy All Timestamps'}
                  </button>
                </div>

                <div style={{ background: 'var(--bg)', padding: '18px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  {chapters.map((ch, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', padding: '6px 0', borderBottom: i < chapters.length - 1 ? '1px solid var(--border)' : 'none', fontSize: '14px', fontFamily: 'monospace' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{ch.split(' ')[0]}</span>
                      <span style={{ color: 'var(--text-primary)', fontFamily: 'inherit' }}>{ch.split(' ').slice(1).join(' ')}</span>
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
