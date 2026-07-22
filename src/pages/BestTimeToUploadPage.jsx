import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Clock, Calendar, Sparkles } from 'lucide-react';

export default function BestTimeToUploadPage() {
  const [niche, setNiche] = useState('gaming');
  const [region, setRegion] = useState('US');
  const [timezone, setTimezone] = useState('EST');

  const scheduleData = {
    gaming: {
      bestDays: ['Friday', 'Saturday', 'Sunday'],
      bestTimes: '2:00 PM – 5:00 PM',
      tip: 'Gaming audiences are most active in late afternoons and weekends.'
    },
    tech: {
      bestDays: ['Tuesday', 'Wednesday', 'Thursday'],
      bestTimes: '11:00 AM – 2:00 PM',
      tip: 'Tech enthusiasts browse mid-day during work/school breaks.'
    },
    education: {
      bestDays: ['Monday', 'Tuesday', 'Wednesday'],
      bestTimes: '3:00 PM – 6:00 PM',
      tip: 'Educational content performs well early in the week after school/work.'
    },
    entertainment: {
      bestDays: ['Thursday', 'Friday', 'Saturday'],
      bestTimes: '3:00 PM – 7:00 PM',
      tip: 'Upload right before evening leisure hours for maximum impulse clicks.'
    },
    finance: {
      bestDays: ['Monday', 'Tuesday', 'Thursday'],
      bestTimes: '8:00 AM – 11:00 AM',
      tip: 'Financial content trends early morning as viewers prepare for market open.'
    }
  };

  const selected = scheduleData[niche] || scheduleData.gaming;

  return (
    <>
      <SeoHead pageType="tool" title="YouTube Best Time to Upload Calculator — Optimize Upload Schedule" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              YouTube Best Time to Upload Calculator
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Find the optimal posting window for your channel to maximize initial 2-hour velocity and CTR.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Channel Niche</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                >
                  <option value="gaming">Gaming & Esports</option>
                  <option value="tech">Tech & Gadgets</option>
                  <option value="education">Education & How-To</option>
                  <option value="entertainment">Vlogs & Entertainment</option>
                  <option value="finance">Finance & Business</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Audience Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                >
                  <option value="US">North America (US/CA)</option>
                  <option value="EU">Europe (UK/DE/FR)</option>
                  <option value="ASIA">Asia Pacific (IN/JP/AU)</option>
                  <option value="LATAM">Latin America (BR/MX)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Your Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                >
                  <option value="EST">EST (UTC-5)</option>
                  <option value="PST">PST (UTC-8)</option>
                  <option value="GMT">GMT / UTC</option>
                  <option value="IST">IST (UTC+5:30)</option>
                </select>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--primary)' }}>
                <Sparkles size={20} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Recommended Upload Window ({region} - {timezone})</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="card" style={{ padding: '16px', background: 'var(--surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '4px' }}>
                    <Calendar size={16} /> Best Days
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '700' }}>{selected.bestDays.join(', ')}</div>
                </div>

                <div className="card" style={{ padding: '16px', background: 'var(--surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '4px' }}>
                    <Clock size={16} /> Optimal Upload Time
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--success)' }}>{selected.bestTimes}</div>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
                💡 <strong>Pro Tip:</strong> {selected.tip}
              </p>
            </div>
          </div>

          <FaqSection customFaqs={toolFaqs.bestTimeToUpload} title="Frequently Asked Questions — Upload Times" />
        </div>
      </main>
    </>
  );
}
