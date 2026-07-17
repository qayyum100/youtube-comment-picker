import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Smartphone, Sparkles, Copy, Scissors } from 'lucide-react';
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
    <div className="page-wrapper">
      <SEO 
        title="AI YouTube Shorts Idea Generator | Free Shorts Planner"
        description="Generate 50 viral YouTube Shorts ideas, caption recommendations, first-sentence hook templates, and tags using AI."
        url="/youtube-shorts-idea-generator"
      />

      <div className="page-hero">
        <h1>YouTube Shorts Idea Generator</h1>
        <p>Plan viral YouTube Shorts and vertical scripts instantly with AI.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-cols-2" style={{ gap: '16px' }}>
            <div>
              <label htmlFor="shorts-niche" className="field-label">Channel Niche</label>
              <input 
                id="shorts-niche"
                type="text" 
                className="input-field"
                placeholder="e.g. Cooking, Tech, Finance" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="shorts-topic" className="field-label">Specific Topic (Optional)</label>
              <input 
                id="shorts-topic"
                type="text" 
                className="input-field"
                placeholder="e.g. Fast dinner ideas, Python coding" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <Sparkles size={16} /> Generate Shorts Ideas
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
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <Scissors size={18} style={{ color: 'var(--primary)' }} /> Generated Ideas
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ideas.map((idea, idx) => (
                <div key={idx} className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>{idea.title}</h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="badge badge-success">Viral Score: {idea.viralScore}</span>
                      <span className="badge badge-neutral">Difficulty: {idea.difficulty}</span>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>First Sentence Hook:</span>
                    <p style={{ margin: 0, marginTop: '4px', fontStyle: 'italic', fontSize: '14px', color: 'var(--text-primary)' }}>"{idea.hook}"</p>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Caption & Description:</span>
                    <p style={{ margin: 0, marginTop: '4px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{idea.caption}</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {idea.hashtags?.map((tag, i) => (
                        <span key={i} className="tag" style={{ color: 'var(--primary)', borderColor: 'rgba(79,110,247,0.15)', background: 'var(--primary-light)' }}>{tag}</span>
                      ))}
                    </div>
                    <button 
                      onClick={() => copyToClipboard(`${idea.title}\n\nHook: ${idea.hook}\nCaption: ${idea.caption}\nHashtags: ${idea.hashtags?.join(' ')}`)} 
                      className="copy-btn"
                    >
                      <Copy size={13} /> Copy Concept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.shortsIdeas}
        customTitle="YouTube Shorts Idea Generator FAQs"
        customDescription="Learn how to generate viral ideas and concepts for YouTube Shorts."
      />
    </div>
  );
}
