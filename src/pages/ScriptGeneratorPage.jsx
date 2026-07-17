import React, { useState } from 'react';
import SEO from '../components/SEO';
import { FileText, Sparkles, Copy } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

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
    <div className="page-wrapper">
      <SEO 
        title="AI YouTube Video Script Generator | Write Scripts Online"
        description="Write highly engaging, structured YouTube video scripts using AI. Generate hooks, main points, visual outlines, CTAs, and outros."
        url="/youtube-script-generator"
      />

      <div className="page-hero">
        <h1>AI YouTube Script Generator</h1>
        <p>Generate custom scripts with visual outline suggestions instantly.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-cols-3" style={{ gap: '16px' }}>
            <div style={{ gridColumn: 'span 1' }}>
              <label htmlFor="script-topic" className="field-label">Video Topic</label>
              <input 
                id="script-topic"
                type="text" 
                className="input-field"
                placeholder="e.g. History of Bitcoin, 5 Cooking Hacks" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="script-length" className="field-label">Target Length</label>
              <select 
                id="script-length"
                value={length} 
                onChange={(e) => setLength(e.target.value)}
                className="select-field"
              >
                <option value="1 minute (Short)">1 minute</option>
                <option value="5 minutes">5 minutes</option>
                <option value="10 minutes">10 minutes</option>
                <option value="20 minutes">20 minutes</option>
              </select>
            </div>
            <div>
              <label htmlFor="script-tone" className="field-label">Script Style / Tone</label>
              <select 
                id="script-tone"
                value={style} 
                onChange={(e) => setStyle(e.target.value)}
                className="select-field"
              >
                <option value="Educational">Educational</option>
                <option value="Storytelling">Storytelling</option>
                <option value="High Energy">High Energy</option>
                <option value="Sarcastic">Sarcastic / Fun</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <Sparkles size={16} /> Generate Full Script
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            {error}
          </div>
        )}

        {script && (
          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                <FileText size={18} style={{ color: 'var(--primary)' }} /> Video Script
              </h3>
              <button onClick={copyScript} className="copy-btn">
                <Copy size={13} /> Copy Script
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div>
                <span className="badge badge-error" style={{ fontSize: '11px', padding: '3px 8px', marginBottom: '8px' }}>[0:00 - 0:10] HOOK</span>
                <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.6' }}>{script.hook}</p>
              </div>
              
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <span className="badge badge-primary" style={{ fontSize: '11px', padding: '3px 8px', marginBottom: '8px' }}>INTRODUCTION</span>
                <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.6' }}>{script.intro}</p>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <span className="badge badge-warning" style={{ fontSize: '11px', padding: '3px 8px', marginBottom: '8px' }}>BODY SECTION</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                  {script.body?.map((section, idx) => (
                    <div key={idx} className="card" style={{ padding: '16px', background: 'var(--surface)' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{section}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid-cols-2" style={{ gap: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <div>
                  <span className="badge badge-success" style={{ fontSize: '11px', padding: '3px 8px', marginBottom: '8px' }}>CALL TO ACTION (CTA)</span>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{script.cta}</p>
                </div>
                <div>
                  <span className="badge badge-neutral" style={{ fontSize: '11px', padding: '3px 8px', marginBottom: '8px' }}>OUTRO / END CARD</span>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{script.outro}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.scriptGenerator}
        customTitle="YouTube Script Generator FAQs"
        customDescription="Find out how AI can help you write better YouTube scripts to improve watch time and viewer retention."
      />
    </div>
  );
}
