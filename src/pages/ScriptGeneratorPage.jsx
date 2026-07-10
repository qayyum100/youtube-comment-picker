import React, { useState } from 'react';
import SEO from '../components/SEO';
import { FileText, Sparkles, Copy, Download } from 'lucide-react';

export default function ScriptGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [length, setLength] = useState('5 minutes');
  const [style, setStyle] = useState('Educational');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setError(null);
    setScript(null);

    try {
      const response = await fetch('/api/script-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, length, style })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to generate script');

      setScript(result.script);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyScript = () => {
    if (!script) return;
    const text = `Hook:\n${script.hook}\n\nIntroduction:\n${script.intro}\n\nBody:\n${script.body?.join('\n')}\n\nCTA:\n${script.cta}\n\nOutro:\n${script.outro}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="AI YouTube Video Script Generator | Write Scripts Online"
        description="Write highly engaging, structured YouTube video scripts using AI. Generate hooks, main points, visual outlines, CTAs, and outros."
        url="/youtube-script-generator"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI YouTube Script Generator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Generate custom scripts with visual outline suggestions instantly.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Video Topic</label>
              <input 
                type="text" 
                placeholder="e.g. History of Bitcoin, 5 Cooking Hacks" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Target Length</label>
              <select 
                value={length} 
                onChange={(e) => setLength(e.target.value)}
                style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <option value="1 minute (Short)">1 minute</option>
                <option value="5 minutes">5 minutes</option>
                <option value="10 minutes">10 minutes</option>
                <option value="20 minutes">20 minutes</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Script Style / Tone</label>
              <select 
                value={style} 
                onChange={(e) => setStyle(e.target.value)}
                style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <option value="Educational">Educational</option>
                <option value="Storytelling">Storytelling</option>
                <option value="High Energy">High Energy</option>
                <option value="Sarcastic">Sarcastic / Fun</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} /> {loading ? 'Writing Script...' : 'Generate Full Script'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {script && (
          <div style={{ marginTop: '45px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><FileText /> Video Script</h3>
              <button onClick={copyScript} style={{ padding: '8px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                <Copy size={16} /> Copy Script
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', background: 'var(--bg-dark)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div>
                <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.05em' }}>[0:00 - 0:10] HOOK:</span>
                <p style={{ margin: '5px 0 0 0', fontStyle: 'italic', color: 'var(--text-primary)' }}>{script.hook}</p>
              </div>
              
              <div>
                <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.05em' }}>INTRODUCTION:</span>
                <p style={{ margin: '5px 0 0 0', color: 'var(--text-primary)' }}>{script.intro}</p>
              </div>

              <div>
                <span style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.05em' }}>BODY SECTION:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
                  {script.body?.map((section, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-surface)', padding: '15px', borderRadius: 'var(--radius-sm)' }}>
                       <p style={{ margin: 0 }}>{section}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.05em' }}>CALL TO ACTION (CTA):</span>
                  <p style={{ margin: '5px 0 0 0' }}>{script.cta}</p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.05em' }}>OUTRO / END CARD:</span>
                  <p style={{ margin: '5px 0 0 0' }}>{script.outro}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
