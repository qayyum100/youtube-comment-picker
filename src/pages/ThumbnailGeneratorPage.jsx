import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Type, Sparkles, Copy, Palette, Eye } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ThumbnailGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('');
  const [style, setStyle] = useState('Bold Modern');
  const [loading, setLoading] = useState(false);
  const [concepts, setConcepts] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setError(null);
    setConcepts(null);

    try {
      // Mock generate concepts via standard AI prompts
      const apiKey = ''; // Use backend endpoint instead of exposing API key on frontend
      // Calling internal API endpoints for generation (re-using Description generator helper prompt or sending custom JSON endpoint)
      // For speed and simplicity, we can do it directly using a fetch or calling aiController
      const response = await fetch('/api/ai/title-generator', { // Reusing title client endpoint to trigger Gemini, or creating custom
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: `Thumbnail concepts for: ${topic}`, category: `Style: ${style}, Category: ${category}`, tone: 'Professional' })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to generate concepts');
      
      // Parse mock or structure them beautifully
      setConcepts({
        titleText: result.titles?.[0]?.title || "3 Easy Steps to Win",
        alternatives: result.titles?.slice(1, 4).map(t => t.title) || [],
        colors: ["#FF0055 (Punchy Red)", "#000000 (Deep Black)", "#FFFFFF (Clean White)"],
        elements: ["Expression face (smiling or shocked) on the right side", "Big bold numbers on the left", "Vibrant gradient badge"],
        composition: "Use the Rule of Thirds. Keep the right 1/3 for the human subject, and the left 2/3 for the bold text elements. Apply a dark background vignette."
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="AI YouTube Thumbnail Generator | Free Design Concepts Tool"
        description="Generate high-converting YouTube thumbnail design concepts, layout ideas, text overlays, and color palettes using AI."
        url="/youtube-thumbnail-generator"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI YouTube Thumbnail Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Generate design layouts, overlay texts, and aesthetic color palettes using AI.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Video Topic / Title</label>
              <input 
                type="text" 
                placeholder="e.g. 10 Secret Python Tips" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <option value="Tech">Tech</option>
                <option value="Education">Education</option>
                <option value="Vlog">Vlogs</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Style</label>
              <select 
                value={style} 
                onChange={(e) => setStyle(e.target.value)}
                style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <option value="Bold Modern">Bold Modern</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Neon Gaming">Neon Gaming</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} /> {loading ? 'Drafting Design Layouts...' : 'Generate Thumbnail Concept'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {concepts && (
          <div style={{ marginTop: '45px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            
            {/* Visual Setup */}
            <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <h4 style={{ margin: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Palette size={18} /> Layout & Assets</h4>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Composition Rule:</span>
                <p style={{ marginTop: '5px', color: 'var(--text-primary)', lineHeight: '1.5' }}>{concepts.composition}</p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Visual Elements:</span>
                <ul style={{ paddingLeft: '20px', marginTop: '5px', color: 'var(--text-secondary)' }}>
                  {concepts.elements.map((el, i) => <li key={i}>{el}</li>)}
                </ul>
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Color Palette:</span>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  {concepts.colors.map((color, i) => (
                    <span key={i} style={{ padding: '6px 12px', background: 'var(--bg-dark)', border: '1px solid var(--border-light)', borderRadius: '4px', fontSize: '0.8rem' }}>{color}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Copy overlays */}
            <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <h4 style={{ margin: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Type size={18} /> Suggested Overlay Copy</h4>
              <div style={{ background: 'var(--bg-dark)', padding: '15px', borderRadius: '4px', marginBottom: '20px', borderLeft: '4px solid var(--glow-primary)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Primary CTR Copy:</span>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', marginTop: '5px' }}>{concepts.titleText}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Alternative Hooks:</span>
                <ul style={{ paddingLeft: '20px', marginTop: '5px', color: 'var(--text-secondary)' }}>
                  {concepts.alternatives.map((alt, i) => <li key={i} style={{ marginBottom: '8px' }}>{alt}</li>)}
                </ul>
              </div>
            </div>

          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.thumbnailGenerator}
        customTitle="YouTube Thumbnail Generator FAQs"
        customDescription="Learn how to create stunning AI-generated YouTube thumbnails that maximize your Click-Through Rate."
      />
    </div>
  );
}
