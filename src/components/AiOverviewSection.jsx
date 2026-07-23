import React from 'react';
import { HelpCircle, CheckCircle2, ListOrdered, Sparkles } from 'lucide-react';

export default function AiOverviewSection({ toolName, definition, steps, takeaways, keywords }) {
  return (
    <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Direct Definition Box (AI Overview Answer Snippet Target) */}
      <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--primary)', background: 'var(--bg-secondary)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} style={{ color: 'var(--primary)' }} />
          What is {toolName}?
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '15px', margin: 0 }}>
          {definition}
        </p>
      </div>

      {/* 2. Step-by-Step How-To (AI Overview List Target) */}
      {steps && steps.length > 0 && (
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ListOrdered size={18} style={{ color: 'var(--primary)' }} />
            How to Use {toolName} in 3 Simple Steps
          </h3>
          <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {steps.map((step, idx) => (
              <li key={idx} style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '14px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{step.title}:</strong> {step.description}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* 3. Key Features & Takeaways */}
      {takeaways && takeaways.length > 0 && (
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} style={{ color: 'var(--primary)' }} />
            Key Benefits for YouTube Creators
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {takeaways.map((item, idx) => (
              <div key={idx} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>{item.headline}</strong>
                {item.detail}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Target Keyword Tags */}
      {keywords && keywords.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
          {keywords.map((kw, idx) => (
            <span key={idx} className="badge badge-secondary" style={{ fontSize: '11px', textTransform: 'lowercase' }}>
              #{kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
