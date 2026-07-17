import React, { useState } from 'react';
import SEO from '../components/SEO';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function MonetizationCheckerPage() {
  const [subscribers, setSubscribers] = useState(500);
  const [watchHours, setWatchHours] = useState(2000);
  const [shortsViews, setShortsViews] = useState(5);
  const [status, setStatus] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();

    const isPartnerReady = (subscribers >= 1000 && watchHours >= 4000) || (subscribers >= 1000 && shortsViews >= 10);
    const score = Math.min(100, Math.round(((subscribers / 1000) * 50) + ((Math.max(watchHours / 4000, shortsViews / 10)) * 50)));

    setStatus({
      isPartnerReady,
      score,
      subscribersProgress: Math.min(100, ((subscribers / 1000) * 100).toFixed(0)),
      hoursProgress: Math.min(100, ((watchHours / 4000) * 100).toFixed(0)),
      shortsProgress: Math.min(100, ((shortsViews / 10) * 100).toFixed(0))
    });
  };

  return (
    <div className="page-wrapper">
      <SEO 
        title="YouTube Monetization Checker | Channel Eligibility Tool"
        description="Check your channel Partner Program monetization readiness score. Input subscriber counts and watch time values to audit eligibility status."
        url="/youtube-monetization-checker"
      />

      <div className="page-hero">
        <h1>YouTube Monetization Checker</h1>
        <p>Verify your channel's Partner Program eligibility status and monetization readiness score.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleCheck} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-cols-3" style={{ gap: '16px' }}>
            <div>
              <label htmlFor="mon-subs" className="field-label">Subscriber Count</label>
              <input 
                id="mon-subs"
                type="number" 
                value={subscribers} 
                onChange={(e) => setSubscribers(Number(e.target.value))} 
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="mon-hours" className="field-label">Watch Hours (Last 365 Days)</label>
              <input 
                id="mon-hours"
                type="number" 
                value={watchHours} 
                onChange={(e) => setWatchHours(Number(e.target.value))} 
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="mon-shorts" className="field-label">Shorts Views (Last 90 Days - Millions)</label>
              <input 
                id="mon-shorts"
                type="number" 
                value={shortsViews} 
                onChange={(e) => setShortsViews(Number(e.target.value))} 
                className="input-field"
                min="0"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            Check Monetization Status
          </button>
        </form>

        {status && (
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', marginTop: '32px', alignItems: 'start' }}>
            
            {/* Score Ring */}
            <div className="card" style={{ padding: '24px', textAlign: 'center', minWidth: '180px' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Readiness Score</p>
              <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(${status.isPartnerReady ? 'var(--success)' : 'var(--primary)'} ${status.score * 3.6}deg, var(--border) 0)` }}>
                <div style={{ position: 'absolute', width: '100px', height: '100px', background: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)' }}>{status.score}%</span>
                </div>
              </div>
              <p style={{ marginTop: '16px', fontSize: '13px', fontWeight: '700', color: status.isPartnerReady ? 'var(--success)' : 'var(--warning)' }}>
                {status.isPartnerReady ? '✓ Ready for Partnership!' : 'In Progress'}
              </p>
            </div>

            {/* Threshold Progress Bars */}
            <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Subscribers', goal: '1,000', progress: status.subscribersProgress, color: 'var(--success)' },
                { label: 'Watch Hours', goal: '4,000', progress: status.hoursProgress, color: 'var(--primary)' },
                { label: 'Shorts Views', goal: '10 Million', progress: status.shortsProgress, color: '#ec4899' },
              ].map((bar) => (
                <div key={bar.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{bar.label} <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>(Goal: {bar.goal})</span></span>
                    <strong style={{ color: 'var(--text-primary)' }}>{bar.progress}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${bar.progress}%`, height: '100%', background: bar.color, borderRadius: '4px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.monetizationChecker}
        customTitle="YouTube Monetization Checker FAQs"
        customDescription="Find out how to check if a channel is monetized and what it means for their earnings."
      />
    </div>
  );
}
