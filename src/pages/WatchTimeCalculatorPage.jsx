import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Sliders, Clock } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function WatchTimeCalculatorPage() {
  const [views, setViews] = useState(10000);
  const [avgDurationMin, setAvgDurationMin] = useState(5);

  const watchHours = Math.round((views * avgDurationMin) / 60);
  const monetizationProgress = Math.min(100, ((watchHours / 4000) * 100).toFixed(1));

  return (
    <div className="page-wrapper">
      <SEO 
        title="YouTube Watch Time Calculator | Monetization Estimator Tool"
        description="Calculate your YouTube channel watch hours based on views and average video durations. Monitor Partner Program monetization thresholds."
        url="/youtube-watch-time-calculator"
      />

      <div className="page-hero">
        <h1>YouTube Watch Time Calculator</h1>
        <p>Estimate total watch hours and track monetization progress for your channel.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Editor */}
        <div className="card card-lg">
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
            <Sliders size={18} style={{ color: 'var(--primary)' }} /> Adjust Metrics
          </h3>
          
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label className="field-label">Video Views</label>
              <strong style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: '700' }}>{views.toLocaleString()}</strong>
            </div>
            <input 
              type="range" 
              min="100" 
              max="500000" 
              step="500"
              value={views} 
              onChange={(e) => setViews(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label className="field-label">Average View Duration</label>
              <strong style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: '700' }}>{avgDurationMin} min</strong>
            </div>
            <input 
              type="range" 
              min="1" 
              max="60" 
              step="1"
              value={avgDurationMin} 
              onChange={(e) => setAvgDurationMin(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>
        </div>

        {/* Results */}
        <div className="card card-lg" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
            <Clock size={18} style={{ color: 'var(--primary)' }} /> Calculated Watch Time
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Total Watch Hours</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>Target: 4,000 hours</span>
              </div>
              <strong style={{ fontSize: '28px', color: 'var(--success)', fontWeight: '800' }}>{watchHours.toLocaleString()} hrs</strong>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Monetization Target Progress</span>
                <strong style={{ color: 'var(--text-primary)' }}>{monetizationProgress}%</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${monetizationProgress}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      <FaqSection 
        faqsData={toolFaqs.watchTimeCalculator}
        customTitle="YouTube Watch Time Calculator FAQs"
        customDescription="Understand how YouTube's 4,000 watch hours monetization threshold works and how to reach it faster."
      />
    </div>
  );
}
