import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Clock, Calendar } from 'lucide-react';

export default function ShortsUploadTimeCalculatorPage() {
  const [timezone, setTimezone] = useState('EST');

  return (
    <>
      <SeoHead pageType="tool" title="Shorts Upload Time Calculator — Best Hours to Post Shorts" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Shorts Upload Time Calculator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Find the highest traffic hours for publishing YouTube Shorts to get into the Shorts Feed faster.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Your Timezone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)} style={{ padding: '10px', width: '100%', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
                <option value="GMT">GMT (Greenwich Mean Time)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Weekdays Peak (Mon - Fri)</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--success)' }}>12:00 PM – 3:00 PM</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Weekends Peak (Sat - Sun)</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>9:00 AM – 11:00 AM</div>
              </div>
            </div>
          </div>

          <FaqSection customFaqs={toolFaqs.shortsUploadTimeCalculator || []} title="Frequently Asked Questions — Shorts Upload Times" />
        </div>
      </main>
    </>
  );
}
