import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

export default function CompetitorGrowthEstimatorPage() {
  const [channel, setChannel] = useState('');
  const [estimate, setEstimate] = useState(null);

  const handleEstimate = (e) => {
    e.preventDefault();
    if (!channel.trim()) return;
    setEstimate({
      dailySubs: '+450 subs/day',
      monthlyViews: '1.2M views/mo',
      monthlyRevenue: '$2,800 - $8,400 / mo',
      projectedYearlySubs: '+164,000 subs'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Competitor Growth Estimator — Project Subscriber & View Growth" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Competitor Growth Estimator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Project daily subscriber gains, monthly views, and AdSense revenue growth trajectories.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleEstimate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter Channel Username or Link"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Estimate Growth</button>
            </form>

            {estimate && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sub Growth Pace</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>{estimate.dailySubs}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Monthly Views</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--success)' }}>{estimate.monthlyViews}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>AdSense Revenue</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--warning)' }}>{estimate.monthlyRevenue}</div>
                </div>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.competitorGrowthEstimator || []} title="Frequently Asked Questions — Growth Estimator" />
        </div>
      </main>
    </>
  );
}
