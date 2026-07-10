import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Sliders, Clock, DollarSign, Award } from 'lucide-react';

export default function WatchTimeCalculatorPage() {
  const [views, setViews] = useState(10000);
  const [avgDurationMin, setAvgDurationMin] = useState(5);

  const watchHours = Math.round((views * avgDurationMin) / 60);
  const monetizationProgress = Math.min(100, ((watchHours / 4000) * 100).toFixed(1));

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="YouTube Watch Time Calculator | Monetization Estimator Tool"
        description="Calculate your YouTube channel watch hours based on views and average video durations. Monitor Partner Program monetization thresholds."
        url="/youtube-watch-time-calculator"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Watch Time Calculator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Estimate total watch hours and track monetization progress for your channel.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        
        {/* Editor */}
        <section className="card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Sliders size={20} /> Adjust Metrics</h3>
          
          <div style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ color: 'var(--text-muted)' }}>Video Views</label>
              <strong style={{ fontSize: '1.2rem' }}>{views.toLocaleString()}</strong>
            </div>
            <input 
              type="range" 
              min="100" 
              max="500000" 
              step="500"
              value={views} 
              onChange={(e) => setViews(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ color: 'var(--text-muted)' }}>Average View Duration (Minutes)</label>
              <strong style={{ fontSize: '1.2rem' }}>{avgDurationMin} min</strong>
            </div>
            <input 
              type="range" 
              min="1" 
              max="60" 
              step="1"
              value={avgDurationMin} 
              onChange={(e) => setAvgDurationMin(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </section>

        {/* Results */}
        <section className="card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Clock size={20} /> Calculated Watch Time</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '15px' }}>
              <div>
                <h4 style={{ margin: 0 }}>Total Watch Hours</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target: 4,000 hours</span>
              </div>
              <strong style={{ fontSize: '2rem', color: '#10b981' }}>{watchHours.toLocaleString()} Hrs</strong>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                <span>Monetization Target Progress</span>
                <strong>{monetizationProgress}%</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px' }}>
                <div style={{ width: `${monetizationProgress}%`, height: '100%', background: 'var(--gradient-primary)', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
