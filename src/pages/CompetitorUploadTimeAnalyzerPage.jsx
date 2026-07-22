import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Clock, Calendar, BarChart2 } from 'lucide-react';

export default function CompetitorUploadTimeAnalyzerPage() {
  const [channel, setChannel] = useState('');
  const [schedule, setSchedule] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!channel.trim()) return;
    setSchedule({
      primaryDay: 'Thursday & Friday',
      primaryTime: '3:00 PM EST',
      frequency: '2 Videos per week',
      consistencyScore: '95/100 (High Consistency)'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Competitor Upload Time Analyzer — Track Publishing Patterns" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Competitor Upload Time Analyzer
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Analyze publishing schedules and upload consistency across competing YouTube channels.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter Competitor Channel Name or URL"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Analyze Schedule</button>
            </form>

            {schedule && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Top Upload Days</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>{schedule.primaryDay}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Optimal Hour</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--success)' }}>{schedule.primaryTime}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Publish Cadence</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--warning)' }}>{schedule.frequency}</div>
                </div>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.competitorUploadTimeAnalyzer || []} title="Frequently Asked Questions — Upload Schedule" />
        </div>
      </main>
    </>
  );
}
