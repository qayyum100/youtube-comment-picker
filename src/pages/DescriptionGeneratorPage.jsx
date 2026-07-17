import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Sparkles, Copy } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function DescriptionGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setError(null);
    setDescription('');

    try {
      const response = await fetch('/api/ai/description-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, title })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to generate description');

      setDescription(result.description);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
  };

  return (
    <div className="page-wrapper">
      <SEO
        title="AI YouTube Description Generator | Free SEO Descriptions"
        description="Generate SEO-optimized YouTube descriptions with chapters, call to action, and hashtags automatically using AI."
        url="/youtube-description-generator"
      />

      <div className="page-hero">
        <h1>AI YouTube Description Generator</h1>
        <p>Generate SEO-optimized descriptions with keywords, timestamps, and social CTAs instantly.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-cols-2" style={{ gap: '16px' }}>
            <div>
              <label htmlFor="desc-title" className="field-label">Video Title (Optional)</label>
              <input
                id="desc-title"
                type="text"
                className="input-field"
                placeholder="e.g. How to Bake Sourdough Bread"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="desc-topic" className="field-label">What is the video about? (Topic/Keywords)</label>
              <input
                id="desc-topic"
                type="text"
                className="input-field"
                placeholder="e.g. step by step sourdough guide, baking tips"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary">
            <Sparkles size={16} /> {loading ? 'Writing SEO Description...' : 'Generate Description'}
          </button>
        </form>

        {error && <div className="alert alert-error" style={{ marginTop: '16px' }}>{error}</div>}

        {description && (
          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>Generated Description</h3>
              <button onClick={copyToClipboard} className="copy-btn">
                <Copy size={14} /> Copy Description
              </button>
            </div>
            <textarea
              value={description}
              readOnly
              className="input-textarea"
              style={{ height: '350px', fontFamily: 'monospace', fontSize: '14px' }}
            />
          </div>
        )}
      </div>

      <FaqSection
        faqsData={toolFaqs.descriptionGenerator}
        customTitle="YouTube Description Generator FAQs"
        customDescription="Learn how to write SEO-optimized YouTube descriptions that increase your video views and search rankings."
      />
    </div>
  );
}
