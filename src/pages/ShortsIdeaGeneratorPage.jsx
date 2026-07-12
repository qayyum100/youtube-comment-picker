import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Smartphone, Sparkles, Copy, AlertCircle, TrendingUp, Scissors, HelpCircle } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ShortsIdeaGeneratorPage() {
  const [niche, setNiche] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!niche) return;

    setLoading(true);
    setError(null);
    setIdeas([]);

    try {
      const response = await fetch('/api/shorts-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, topic })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to generate shorts ideas');

      setIdeas(result.ideas || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="AI YouTube Shorts Idea Generator | Free Shorts Planner"
        description="Generate 50 viral YouTube Shorts ideas, caption recommendations, first-sentence hook templates, and tags using AI."
        url="/youtube-shorts-idea-generator"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Shorts Idea Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Plan viral YouTube Shorts and vertical scripts instantly with AI.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Channel Niche</label>
              <input 
                type="text" 
                placeholder="e.g. Cooking, Tech, Finance" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Specific Topic (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. Fast dinner ideas, Python coding" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} /> {loading ? 'Drafting Shorts Ideas...' : 'Generate Shorts Ideas'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {ideas.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Scissors /> Generated Ideas</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {ideas.map((idea, idx) => (
                <div key={idx} style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                    <h4 style={{ fontSize: '1.25rem', margin: 0 }}>{idea.title}</h4>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                      <span style={{ padding: '4px 8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '4px' }}>Viral Score: {idea.viralScore}</span>
                      <span style={{ padding: '4px 8px', background: 'var(--bg-dark)', borderRadius: '4px' }}>Difficulty: {idea.difficulty}</span>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>First Sentence Hook:</span>
                    <p style={{ margin: 0, marginTop: '4px', fontStyle: 'italic' }}>"{idea.hook}"</p>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Caption & Description:</span>
                    <p style={{ margin: 0, marginTop: '4px' }}>{idea.caption}</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {idea.hashtags?.map((tag, i) => (
                        <span key={i} style={{ fontSize: '0.85rem', color: 'var(--glow-primary)' }}>{tag}</span>
                      ))}
                    </div>
                    <button onClick={() => copyToClipboard(`${idea.title}\n\nHook: ${idea.hook}\nCaption: ${idea.caption}\nHashtags: ${idea.hashtags?.join(' ')}`)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Copy size={14} /> Copy Concept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.shortsIdeas}
        customTitle="YouTube Shorts Idea Generator FAQs"
        customDescription="Learn how to generate viral ideas and concepts for YouTube Shorts."
      />
    </div>
  );
}
