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
    <div className="page-wrapper">
      <SEO 
        title="AI YouTube Video Ideas Generator | Free Video Planner"
        description="Get 100 YouTube video ideas tailored to your channel niche. Filter by competition levels, difficulty ranks, and SEO scores."
        url="/youtube-video-ideas-generator"
      />

      <div className="page-hero">
        <h1>YouTube Video Idea Generator</h1>
        <p>Generate structured video ideas ranked by difficulty and SEO potential.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon">
              <BarChart2 size={16} />
            </span>
            <input 
              type="text" 
              className="input-field"
              placeholder="Enter your channel niche (e.g. DIY Crafts, Software Development)..." 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flexShrink: 0 }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <Sparkles size={16} /> Generate Ideas
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            {error}
          </div>
        )}

        {ideas.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)' }}>Recommended Concepts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {ideas.map((idea, idx) => (
                <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px', padding: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: 'var(--text-primary)', lineHeight: '1.4' }}>{idea.title}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <div>Competition: <strong style={{ color: 'var(--text-primary)' }}>{idea.competition}</strong></div>
                      <div>Difficulty: <strong style={{ color: 'var(--text-primary)' }}>{idea.difficulty}</strong></div>
                      <div>Viral Index: <strong style={{ color: 'var(--success)' }}>{idea.viralPotential}%</strong></div>
                      <div>SEO Opportunity: <strong style={{ color: 'var(--primary)' }}>{idea.seoOpportunity}%</strong></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(idea.title)} 
                    className="copy-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Copy size={13} /> Copy Title
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.videoIdeas}
        customTitle="YouTube Video Ideas Generator FAQs"
        customDescription="Find out how to come up with viral YouTube video ideas using our AI idea generator."
      />
    </div>
  );
}
