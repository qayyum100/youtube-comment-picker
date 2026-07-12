import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Sparkles, Copy, FileText } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function TimestampGeneratorPage() {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [timestamps, setTimestamps] = useState([]);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!transcript) return;

    setLoading(true);
    setError(null);
    setTimestamps([]);

    try {
      const response = await fetch('/api/timestamps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to generate timestamps');

      setTimestamps(result.timestamps || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyTimestamps = () => {
    const text = timestamps.map(t => `${t.time} ${t.title}`).join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free YouTube Timestamp Generator | Chapter Segmentation Tool"
        description="Auto-segment video scripts or transcripts into clean, readable YouTube timestamps and chapters instantly using AI."
        url="/youtube-timestamp-generator"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Timestamp Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Auto-segment scripts or transcripts into readable YouTube chapters instantly using AI.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Paste Script or Video Transcript</label>
            <textarea 
              rows={8}
              placeholder="Paste video script text or raw transcription speech text here..." 
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              style={{ width: '100%', padding: '15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem', resize: 'vertical' }}
              required
            />
          </div>

          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} /> {loading ? 'Segmenting Chapters...' : 'Generate Timestamps'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {timestamps.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><FileText /> Generated Chapters</h3>
              <button onClick={copyTimestamps} style={{ padding: '8px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                <Copy size={16} /> Copy Chapters
              </button>
            </div>
            
            <div style={{ background: 'var(--bg-dark)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontFamily: 'monospace' }}>
              {timestamps.map((t, idx) => (
                <div key={idx} style={{ padding: '8px 0', borderBottom: idx === timestamps.length - 1 ? 'none' : '1px solid var(--border-light)', display: 'flex', gap: '20px' }}>
                  <span style={{ color: 'var(--glow-primary)', fontWeight: 'bold' }}>{t.time}</span>
                  <span style={{ color: 'var(--text-primary)' }}>{t.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.timestampGenerator}
        customTitle="YouTube Timestamp Generator FAQs"
        customDescription="Learn how to properly format and use timestamps to improve your video SEO and retention."
      />
    </div>
  );
}
