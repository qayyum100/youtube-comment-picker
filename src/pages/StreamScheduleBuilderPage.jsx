import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function StreamScheduleBuilderPage() {
  const [niche, setNiche] = useState('gaming');
  const [timezone, setTimezone] = useState('EST');
  const [schedule, setSchedule] = useState(null);

  const schedules = {
    gaming: ['Tuesday 7:00 PM', 'Thursday 8:00 PM', 'Saturday 3:00 PM'],
    tech: ['Wednesday 12:00 PM', 'Friday 2:00 PM', 'Sunday 11:00 AM'],
    finance: ['Monday 6:00 PM', 'Wednesday 7:00 PM', 'Saturday 10:00 AM'],
    fitness: ['Monday 6:00 AM', 'Wednesday 6:00 AM', 'Saturday 8:00 AM']
  };

  const handleBuild = (e) => {
    e.preventDefault();
    setSchedule(schedules[niche] || schedules.tech);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Stream Schedule Builder — Build Your YouTube Live Schedule" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Stream Schedule Builder</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Build an optimized recurring live stream schedule based on niche, timezone, and peak audience hours.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleBuild} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '24px' }}>
              <select value={niche} onChange={(e) => setNiche(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <option value="gaming">Gaming</option>
                <option value="tech">Tech / Coding</option>
                <option value="finance">Finance</option>
                <option value="fitness">Fitness / Health</option>
              </select>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
                <option value="GMT">GMT</option>
              </select>
              <button type="submit" className="btn btn-primary">Build Schedule</button>
            </form>
            {schedule && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 8px 0' }}>Recommended weekly live stream slots ({timezone}):</p>
                {schedule.map((slot, i) => (
                  <div key={i} style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: '8px', fontWeight: '700', fontSize: '16px' }}>
                    📡 Stream {i + 1}: {slot} {timezone}
                  </div>
                ))}
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.streamScheduleBuilder || []} title="FAQs — Stream Schedule Builder" />
        </div>
      </main>
    </>
  );
}
