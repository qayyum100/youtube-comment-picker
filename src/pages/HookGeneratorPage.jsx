import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Sparkles, Copy, AlertCircle, Quote } from 'lucide-react';
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
      // Re-use titles logic to generate Hooks JSON directly from Gemini
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

      // Map generated titles into formatted hooks
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
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="Free YouTube Hook Generator | First 5 Seconds Hooks"
        description="Create high-retaining YouTube hooks. Generate curiosity, shock, question, and story hook templates with retention score analyses."
        url="/youtube-hook-generator"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Hook Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Generate click-worthy and high-retaining introductory hooks for your videos and shorts.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Quote size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="What is your video topic? (e.g. waking up at 5am)..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} /> {loading ? 'Drafting Hooks...' : 'Generate Hooks'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {hooks.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ marginBottom: '20px' }}>High-Retaining Hooks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {hooks.map((hook, idx) => (
                <div key={idx} style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--glow-primary)', fontWeight: 'bold', textTransform: 'uppercase' }}>{hook.type}</span>
                    <h4 style={{ fontSize: '1.2rem', margin: '5px 0', fontWeight: 'normal' }}>"{hook.text}"</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Retention Score: <strong style={{ color: '#10b981' }}>{hook.viralScore}%</strong></span>
                  </div>
                  <button onClick={() => copyHook(hook.text)} style={{ padding: '10px 15px', background: 'var(--bg-dark)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Copy size={16} /> Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.hookGenerator}
        customTitle="YouTube Hook Generator FAQs"
        customDescription="Learn how to write irresistible YouTube opening lines that dramatically boost audience retention."
      />
    </div>
  );
}
