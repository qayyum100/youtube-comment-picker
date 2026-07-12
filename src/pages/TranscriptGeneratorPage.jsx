import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, FileText, Download, Copy, Languages } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function TranscriptGeneratorPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/transcript?url=${encodeURIComponent(url)}`);
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to fetch transcript');

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyTranscript = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.fullText);
  };

  const downloadTXT = () => {
    if (!data) return;
    const blob = new Blob([data.fullText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transcript_${data.videoId}.txt`;
    link.click();
  };

  const downloadSRT = () => {
    if (!data) return;
    const srtContent = data.transcript.map((t, idx) => {
      const start = t.start || 0;
      const end = start + (t.duration || 2.0);

      const formatTime = (secs) => {
        const hrs = Math.floor(secs / 3600).toString().padStart(2, '0');
        const mins = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
        const s = Math.floor(secs % 60).toString().padStart(2, '0');
        const ms = Math.floor((secs % 1) * 1000).toString().padStart(3, '0');
        return `${hrs}:${mins}:${s},${ms}`;
      };

      return `${idx + 1}\n${formatTime(start)} --> ${formatTime(end)}\n${t.text}\n`;
    }).join('\n');

    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `subtitles_${data.videoId}.srt`;
    link.click();
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free YouTube Transcript Generator | Download Subtitles & SRT"
        description="Generate, translate, and download transcripts from any YouTube video instantly. Download captions in TXT or SRT formats using AI."
        url="/youtube-transcript-generator"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Free YouTube Transcript Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Generate and download YouTube video transcripts instantly using AI.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Paste YouTube Video URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Generating...' : 'Generate Transcript'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {data && (
          <div style={{ marginTop: '45px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
              <h3 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><FileText /> Transcript Output</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={copyTranscript} style={{ padding: '8px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                  <Copy size={16} /> Copy
                </button>
                <button onClick={downloadTXT} style={{ padding: '8px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                  <Download size={16} /> TXT
                </button>
                <button onClick={downloadSRT} style={{ padding: '8px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                  <Download size={16} /> SRT (Subtitles)
                </button>
              </div>
            </div>

            {data.simulated && (
              <div style={{ marginBottom: '20px', padding: '10px 15px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>
                ⚠ Direct captions track unavailable. Auto-generated high-fidelity AI transcript from metadata.
              </div>
            )}

            <div style={{ maxHeight: '400px', overflowY: 'auto', background: 'var(--bg-dark)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              {data.transcript.map((line, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'monospace', color: 'var(--glow-primary)', fontWeight: 'bold', width: '50px', flexShrink: 0 }}>{line.time}</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{line.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.transcriptGenerator}
        customTitle="YouTube Transcript Generator FAQs"
        customDescription="Learn how to extract YouTube video transcripts and use them for SEO and content repurposing."
      />
    </div>
  );
}
