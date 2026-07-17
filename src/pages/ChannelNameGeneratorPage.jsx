import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Sparkles, Copy, User } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ChannelNameGeneratorPage() {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!niche) return;

    setLoading(true);
    setError(null);
    setNames(null);

    try {
      const response = await fetch('/api/channel-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche })
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to generate channel names');

      setNames(result.names);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <SEO 
        title="AI YouTube Channel Name Generator | Free Brand Names"
        description="Discover creative, professional, gaming, and brand YouTube channel names instantly using AI."
        url="/youtube-channel-name-generator"
      />

      <div className="page-hero">
        <h1>YouTube Channel Name Generator</h1>
        <p>Brainstorm creative and brandable channel name suggestions instantly using AI.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon">
              <User size={16} />
            </span>
            <input 
              type="text" 
              className="input-field"
              placeholder="What is your channel niche/theme (e.g. personal finance, coding guides)..." 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexShrink: 0 }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : (
              <>
                <Sparkles size={16} /> Generate Names
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            {error}
          </div>
        )}

        {names && (
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {Object.keys(names).map((category) => (
              <div key={category} className="card" style={{ padding: '20px' }}>
                <h4 style={{ margin: 0, marginBottom: '16px', textTransform: 'capitalize', fontWeight: '700', color: 'var(--primary)', fontSize: '14px' }}>{category} Names</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {names[category].map((name, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{name}</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(name)} 
                        className="copy-btn" 
                        style={{ padding: '4px', border: 'none', background: 'transparent' }}
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.channelName}
        customTitle="YouTube Channel Name Generator FAQs"
        customDescription="Learn how to pick the perfect channel name and why it matters."
      />
    </div>
  );
}
