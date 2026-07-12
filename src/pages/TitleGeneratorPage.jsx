import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Type, Sparkles, Copy, AlertCircle } from 'lucide-react';
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
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="AI YouTube Title Generator | Free Viral Titles"
        description="Generate viral YouTube video titles with AI. Optimize for CTR and SEO instantly."
        url="/youtube-title-generator"
      />
      
      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI YouTube Title Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Generate click-worthy, viral YouTube titles that rank higher.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px' }}>
              <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Video Topic</label>
                  <div style={{ position: 'relative' }}>
                    <Type size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      placeholder="e.g. How to make money online" 
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                      required
                    />
                  </div>
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Category</label>
                  <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                  >
                      <option value="">General</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Tech">Tech</option>
                      <option value="Vlog">Vlog</option>
                      <option value="Education">Education</option>
                  </select>
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Tone</label>
                  <select 
                      value={tone} 
                      onChange={(e) => setTone(e.target.value)}
                      style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                  >
                      <option value="Exciting">Exciting</option>
                      <option value="Educational">Educational</option>
                      <option value="Clickbait">Clickbait (Safe)</option>
                      <option value="Mystery">Mystery</option>
                  </select>
              </div>
          </div>
          
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} /> {loading ? 'Generating AI Titles...' : 'Generate 10 Viral Titles'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {titles.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ marginBottom: '20px' }}>Generated Titles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {titles.map((t, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1, paddingRight: '20px' }}>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{t.title}</h4>
                            <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <span>SEO: <strong style={{ color: t.seoScore > 80 ? '#10b981' : '#f59e0b' }}>{t.seoScore}</strong></span>
                                <span>CTR: <strong style={{ color: t.ctrScore > 80 ? '#10b981' : '#f59e0b' }}>{t.ctrScore}</strong></span>
                                <span>Emotion: <strong>{t.emotionScore}</strong></span>
                            </div>
                        </div>
                        <button onClick={() => copyTitle(t.title)} style={{ padding: '10px', background: 'var(--bg-dark)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', cursor: 'pointer' }} title="Copy Title">
                            <Copy size={18} />
                        </button>
                    </div>
                ))}
            </div>
          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.titleGenerator}
        customTitle="YouTube Title Generator FAQs"
        customDescription="Learn more about writing clickable YouTube titles and how our AI generator works."
      />
    </div>
  );
}
