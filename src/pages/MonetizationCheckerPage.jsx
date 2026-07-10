import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function MonetizationCheckerPage() {
  const [subscribers, setSubscribers] = useState(500);
  const [watchHours, setWatchHours] = useState(2000);
  const [shortsViews, setShortsViews] = useState(5); // Millions
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
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="YouTube Monetization Checker | Channel Eligibility Tool"
        description="Check your channel Partner Program monetization readiness score. Input subscriber counts and watch time values to audit eligibility status."
        url="/youtube-monetization-checker"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Monetization Checker
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Verify your channel's Partner Program eligibility status and monetization readiness score.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleCheck} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'end', marginBottom: '30px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Subscriber Count</label>
            <input 
              type="number" 
              value={subscribers} 
              onChange={(e) => setSubscribers(Number(e.target.value))} 
              className="input-premium"
              min="0"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Watch Hours (Last 365 Days)</label>
            <input 
              type="number" 
              value={watchHours} 
              onChange={(e) => setWatchHours(Number(e.target.value))} 
              className="input-premium"
              min="0"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Shorts Views (Last 90 Days - Millions)</label>
            <input 
              type="number" 
              value={shortsViews} 
              onChange={(e) => setShortsViews(Number(e.target.value))} 
              className="input-premium"
              min="0"
            />
          </div>
          <button type="submit" style={{ gridColumn: 'span 3', padding: '15px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
            Check Monetization Status
          </button>
        </form>

        {status && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginTop: '40px' }}>
            
            {/* Status Card */}
            <div style={{ background: 'var(--bg-surface)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Readiness Score</h3>
              <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(#10b981 ${status.score}%, #3f3f46 0)` }}>
                <div style={{ position: 'absolute', width: '130px', height: '130px', background: 'var(--bg-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{status.score}%</span>
                </div>
              </div>
              <p style={{ marginTop: '20px', fontSize: '1.1rem', fontWeight: '500', color: status.isPartnerReady ? '#10b981' : '#f59e0b' }}>
                {status.isPartnerReady ? 'Ready for Partnership!' : 'In Progress'}
              </p>
            </div>

            {/* Threshold Progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span>Subscribers (Goal: 1,000)</span>
                  <strong>{status.subscribersProgress}%</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px' }}>
                  <div style={{ width: `${status.subscribersProgress}%`, height: '100%', background: '#10b981', borderRadius: '4px' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span>Watch Hours (Goal: 4,000)</span>
                  <strong>{status.hoursProgress}%</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px' }}>
                  <div style={{ width: `${status.hoursProgress}%`, height: '100%', background: '#3b82f6', borderRadius: '4px' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span>Shorts Views (Goal: 10 Million)</span>
                  <strong>{status.shortsProgress}%</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px' }}>
                  <div style={{ width: `${status.shortsProgress}%`, height: '100%', background: '#ec4899', borderRadius: '4px' }} />
                </div>
              </div>
            </div>

          </div>
        )}
      </section>
    </div>
  );
}
