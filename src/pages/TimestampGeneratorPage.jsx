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
    <div className="page-wrapper">
      <SEO
        title="Free YouTube Timestamp Generator | Chapter Segmentation Tool"
        description="Auto-segment video scripts or transcripts into clean, readable YouTube timestamps and chapters instantly using AI."
        url="/youtube-timestamp-generator"
      />

      <div className="page-hero">
        <h1>YouTube Timestamp Generator</h1>
        <p>Auto-segment scripts or transcripts into readable YouTube chapters instantly using AI.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="transcript-input" className="field-label">Paste Script or Video Transcript</label>
            <textarea
              id="transcript-input"
              className="input-textarea"
              rows={8}
              placeholder="Paste video script text or raw transcription speech text here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            <Sparkles size={16} />
            {loading ? 'Segmenting Chapters...' : 'Generate Timestamps'}
          </button>
        </form>

        {error && <div className="alert alert-error" style={{ marginTop: '16px' }}>{error}</div>}

        {timestamps.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                <FileText size={18} style={{ color: 'var(--primary)' }} /> Generated Chapters
              </h3>
              <button onClick={copyTimestamps} className="copy-btn">
                <Copy size={14} /> Copy Chapters
              </button>
            </div>

            <div className="result-card">
              {timestamps.map((t, idx) => (
                <div key={idx} style={{
                  padding: '8px 0',
                  borderBottom: idx === timestamps.length - 1 ? 'none' : '1px solid var(--border)',
                  display: 'flex',
                  gap: '16px',
                }}>
                  <span style={{ color: 'var(--primary)', fontWeight: '700', whiteSpace: 'nowrap' }}>{t.time}</span>
                  <span style={{ color: 'var(--text-primary)' }}>{t.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FaqSection
        faqsData={toolFaqs.timestampGenerator}
        customTitle="YouTube Timestamp Generator FAQs"
        customDescription="Learn how to properly format and use timestamps to improve your video SEO and retention."
      />
    </div>
  );
}
