import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, FileText, Download, Copy } from 'lucide-react';
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
    <div className="page-wrapper">
      <SEO 
        title="Free YouTube Transcript Generator | Download Subtitles & SRT"
        description="Generate, translate, and download transcripts from any YouTube video instantly. Download captions in TXT or SRT formats using AI."
        url="/youtube-transcript-generator"
      />

      <div className="page-hero">
        <h1>Free YouTube Transcript Generator</h1>
        <p>Generate and download YouTube video transcripts instantly using AI.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              className="input-field"
              placeholder="Paste YouTube Video URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flexShrink: 0 }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : 'Generate Transcript'}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            {error}
          </div>
        )}

        {data && (
          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                <FileText size={18} style={{ color: 'var(--primary)' }} /> Transcript Output
              </h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button onClick={copyTranscript} className="copy-btn">
                  <Copy size={14} /> Copy
                </button>
                <button onClick={downloadTXT} className="copy-btn">
                  <Download size={14} /> TXT
                </button>
                <button onClick={downloadSRT} className="copy-btn">
                  <Download size={14} /> SRT (Subtitles)
                </button>
              </div>
            </div>

            {data.simulated && (
              <div className="alert alert-warning" style={{ marginBottom: '20px' }}>
                Direct captions track unavailable. Auto-generated high-fidelity AI transcript from metadata.
              </div>
            )}

            <div className="code-block" style={{ maxHeight: '400px', overflowY: 'auto', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              {data.transcript.map((line, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'monospace', color: 'var(--primary)', fontWeight: 'bold', width: '56px', flexShrink: 0 }}>{line.time}</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>{line.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.transcriptGenerator}
        customTitle="YouTube Transcript Generator FAQs"
        customDescription="Learn how to extract YouTube video transcripts and use them for SEO and content repurposing."
      />
    </div>
  );
}
