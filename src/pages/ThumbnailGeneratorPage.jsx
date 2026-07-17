import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Type, Sparkles, Palette } from 'lucide-react';
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
      const response = await fetch('/api/ai/title-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: `Thumbnail concepts for: ${topic}`, category: `Style: ${style}, Category: ${category}`, tone: 'Professional' })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to generate concepts');
      
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
    <div className="page-wrapper">
      <SEO 
        title="AI YouTube Thumbnail Generator | Free Design Concepts Tool"
        description="Generate high-converting YouTube thumbnail design concepts, layout ideas, text overlays, and color palettes using AI."
        url="/youtube-thumbnail-generator"
      />

      <div className="page-hero">
        <h1>AI YouTube Thumbnail Generator</h1>
        <p>Generate design layouts, overlay texts, and aesthetic color palettes using AI.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label htmlFor="thumb-topic" className="field-label">Video Topic / Title</label>
              <input 
                id="thumb-topic"
                type="text" 
                className="input-field"
                placeholder="e.g. 10 Secret Python Tips" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="thumb-category" className="field-label">Category</label>
              <select 
                id="thumb-category"
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="select-field"
              >
                <option value="Tech">Tech</option>
                <option value="Education">Education</option>
                <option value="Vlog">Vlogs</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
            <div>
              <label htmlFor="thumb-style" className="field-label">Style</label>
              <select 
                id="thumb-style"
                value={style} 
                onChange={(e) => setStyle(e.target.value)}
                className="select-field"
              >
                <option value="Bold Modern">Bold Modern</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Neon Gaming">Neon Gaming</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <Sparkles size={16} /> Generate Thumbnail Concept
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            {error}
          </div>
        )}

        {concepts && (
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* Visual Setup */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ margin: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                <Palette size={16} style={{ color: 'var(--primary)' }} /> Layout & Assets
              </h4>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Composition Rule:</span>
                <p style={{ marginTop: '4px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>{concepts.composition}</p>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Visual Elements:</span>
                <ul style={{ paddingLeft: '20px', marginTop: '4px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
                  {concepts.elements.map((el, i) => <li key={i}>{el}</li>)}
                </ul>
              </div>
              <div>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Color Palette:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {concepts.colors.map((color, i) => (
                    <span key={i} className="tag">{color}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Copy overlays */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ margin: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                <Type size={16} style={{ color: 'var(--primary)' }} /> Suggested Overlay Copy
              </h4>
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', borderLeft: '4px solid var(--primary)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Primary CTR Copy:</span>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: '700', marginTop: '4px', color: 'var(--text-primary)' }}>{concepts.titleText}</p>
              </div>
              <div>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Alternative Hooks:</span>
                <ul style={{ paddingLeft: '20px', marginTop: '4px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
                  {concepts.alternatives.map((alt, i) => <li key={i} style={{ marginBottom: '6px' }}>{alt}</li>)}
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.thumbnailGenerator}
        customTitle="YouTube Thumbnail Generator FAQs"
        customDescription="Learn how to create stunning AI-generated YouTube thumbnails that maximize your Click-Through Rate."
      />
    </div>
  );
}
