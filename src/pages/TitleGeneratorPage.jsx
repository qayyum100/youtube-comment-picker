import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Type, Sparkles, Copy } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function TitleGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('');
  const [tone, setTone] = useState('Exciting');
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setError(null);
    setTitles([]);

    try {
      const response = await fetch('/api/ai/title-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category, tone })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to generate titles');

      setTitles(result.titles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyTitle = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="page-wrapper">
      <SEO
        title="AI YouTube Title Generator | Free Viral Titles"
        description="Generate viral YouTube video titles with AI. Optimize for CTR and SEO instantly."
        url="/youtube-title-generator"
      />

      <div className="page-hero">
        <h1>AI YouTube Title Generator</h1>
        <p>Generate click-worthy, viral YouTube titles that rank higher.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label htmlFor="title-topic" className="field-label">Video Topic</label>
              <div className="input-group">
                <span className="input-group-icon"><Type size={16} /></span>
                <input
                  id="title-topic"
                  type="text"
                  className="input-field"
                  placeholder="e.g. How to make money online"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="title-category" className="field-label">Category</label>
              <select id="title-category" value={category} onChange={(e) => setCategory(e.target.value)} className="select-field">
                <option value="">General</option>
                <option value="Gaming">Gaming</option>
                <option value="Tech">Tech</option>
                <option value="Vlog">Vlog</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div>
              <label htmlFor="title-tone" className="field-label">Tone</label>
              <select id="title-tone" value={tone} onChange={(e) => setTone(e.target.value)} className="select-field">
                <option value="Exciting">Exciting</option>
                <option value="Educational">Educational</option>
                <option value="Clickbait">Clickbait (Safe)</option>
                <option value="Mystery">Mystery</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary">
            <Sparkles size={16} /> {loading ? 'Generating AI Titles...' : 'Generate 10 Viral Titles'}
          </button>
        </form>

        {error && <div className="alert alert-error" style={{ marginTop: '16px' }}>{error}</div>}

        {titles.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>Generated Titles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {titles.map((t, idx) => (
                <div key={idx} className="card card-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>{t.title}</h4>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                      <span>SEO: <strong style={{ color: t.seoScore > 80 ? 'var(--success)' : 'var(--warning)' }}>{t.seoScore}</strong></span>
                      <span>CTR: <strong style={{ color: t.ctrScore > 80 ? 'var(--success)' : 'var(--warning)' }}>{t.ctrScore}</strong></span>
                      <span>Emotion: <strong>{t.emotionScore}</strong></span>
                    </div>
                  </div>
                  <button onClick={() => copyTitle(t.title)} className="copy-btn" title="Copy Title">
                    <Copy size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FaqSection
        faqsData={toolFaqs.titleGenerator}
        customTitle="YouTube Title Generator FAQs"
        customDescription="Learn more about writing clickable YouTube titles and how our AI generator works."
      />
    </div>
  );
}
