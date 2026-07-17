import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Sparkles, Copy, Quote } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function HookGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState([]);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setError(null);
    setHooks([]);

    try {
      const response = await fetch('/api/ai/title-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: `First 5 seconds video hooks about: ${topic}`, 
          category: "Shocking, Curiosity, Question, Story hooks", 
          tone: "Curious and viral" 
        })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to generate hooks');

      const hookTypes = ['Curiosity Hook', 'Question Hook', 'Shock Hook', 'Story Hook', 'Value Hook'];
      const formattedHooks = (result.titles || []).slice(0, 5).map((t, idx) => ({
        type: hookTypes[idx] || 'Curiosity Hook',
        text: t.title,
        viralScore: t.ctrScore || 85
      }));

      setHooks(formattedHooks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyHook = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="page-wrapper">
      <SEO 
        title="Free YouTube Hook Generator | First 5 Seconds Hooks"
        description="Create high-retaining YouTube hooks. Generate curiosity, shock, question, and story hook templates with retention score analyses."
        url="/youtube-hook-generator"
      />

      <div className="page-hero">
        <h1>YouTube Hook Generator</h1>
        <p>Generate click-worthy and high-retaining introductory hooks for your videos and shorts.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon">
              <Quote size={16} />
            </span>
            <input 
              type="text" 
              className="input-field"
              placeholder="What is your video topic? (e.g. waking up at 5am)..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flexShrink: 0 }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <Sparkles size={16} /> Generate Hooks
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            {error}
          </div>
        )}

        {hooks.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)' }}>High-Retaining Hooks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {hooks.map((hook, idx) => (
                <div key={idx} className="card card-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <span className="badge badge-primary" style={{ fontSize: '11px', padding: '3px 8px', textTransform: 'uppercase', marginBottom: '4px' }}>{hook.type}</span>
                    <h4 style={{ fontSize: '15px', margin: '6px 0', fontWeight: '600', color: 'var(--text-primary)' }}>"{hook.text}"</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Retention Score: <strong style={{ color: 'var(--success)' }}>{hook.viralScore}%</strong></span>
                  </div>
                  <button onClick={() => copyHook(hook.text)} className="copy-btn">
                    <Copy size={13} /> Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.hookGenerator}
        customTitle="YouTube Hook Generator FAQs"
        customDescription="Learn how to write irresistible YouTube opening lines that dramatically boost audience retention."
      />
    </div>
  );
}
