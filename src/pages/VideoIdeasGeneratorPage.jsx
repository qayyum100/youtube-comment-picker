import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Sparkles, Copy, BarChart2 } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function VideoIdeasGeneratorPage() {
  const [niche, setNiche] = useState('');
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
      const response = await fetch('/api/video-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to generate ideas');

      setIdeas(result.ideas || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="AI YouTube Video Ideas Generator | Free Video Planner"
        description="Get 100 YouTube video ideas tailored to your channel niche. Filter by competition levels, difficulty ranks, and SEO scores."
        url="/youtube-video-ideas-generator"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Video Idea Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Generate structured video ideas ranked by difficulty and SEO potential.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <BarChart2 size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Enter your channel niche (e.g. DIY Crafts, Software Development)..." 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} /> {loading ? 'Compiling Ideas...' : 'Generate Ideas'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {ideas.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ marginBottom: '20px' }}>Recommended Concepts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {ideas.map((idea, idx) => (
                <div key={idx} style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', margin: 0, color: 'var(--text-primary)' }}>{idea.title}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <div>Competition: <strong>{idea.competition}</strong></div>
                      <div>Difficulty: <strong>{idea.difficulty}</strong></div>
                      <div>Viral Index: <strong style={{ color: '#10b981' }}>{idea.viralPotential}%</strong></div>
                      <div>SEO Opportunity: <strong style={{ color: 'var(--glow-primary)' }}>{idea.seoOpportunity}%</strong></div>
                    </div>
                  </div>
                  <button onClick={() => navigator.clipboard.writeText(idea.title)} style={{ padding: '8px 12px', background: 'var(--bg-dark)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '0.85rem' }}>
                    <Copy size={14} /> Copy Title
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.videoIdeas}
        customTitle="YouTube Video Ideas Generator FAQs"
        customDescription="Find out how to come up with viral YouTube video ideas using our AI idea generator."
      />
    </div>
  );
}
