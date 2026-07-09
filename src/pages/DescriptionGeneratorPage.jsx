import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Type, Sparkles, Copy } from 'lucide-react';

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
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="AI YouTube Description Generator | Free SEO Descriptions"
        description="Generate SEO-optimized YouTube descriptions with chapters, call to action, and hashtags automatically using AI."
        url="/youtube-description-generator"
      />
      
      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI YouTube Description Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Generate SEO-optimized descriptions with keywords, timestamps, and social CTAs instantly.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Video Title (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. How to Bake Sourdough Bread" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                  />
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>What is the video about? (Topic/Keywords)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. step by step sourdough guide, baking tips, sourdough starter" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                    required
                  />
              </div>
          </div>
          
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} /> {loading ? 'Writing SEO Description...' : 'Generate Description'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {description && (
          <div style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0 }}>Generated Description</h3>
                <button onClick={copyToClipboard} style={{ padding: '8px 15px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                     <Copy size={16} /> Copy Description
                </button>
            </div>
            <textarea 
                value={description}
                readOnly
                style={{ width: '100%', height: '350px', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-dark)', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.95rem', resize: 'vertical', lineHeight: '1.6' }}
            />
          </div>
        )}
      </section>
    </div>
  );
}
