import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function MembershipPerksGeneratorPage() {
  const [niche, setNiche] = useState('');
  const [tiers, setTiers] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!niche.trim()) return;
    setTiers([
      { name: '☁️ Supporter ($1.99/mo)', perks: ['Member badge', 'Exclusive emoji pack', 'Early access to community posts'] },
      { name: '⭐ Fan ($4.99/mo)', perks: ['All Supporter perks', `Monthly ${niche} Q&A live access`, 'Members-only Discord channel'] },
      { name: '👑 VIP ($9.99/mo)', perks: ['All Fan perks', `Private 1-on-1 ${niche} feedback session`, 'Shoutout in monthly video'] }
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Membership Perks Generator — YouTube Channel Membership Ideas" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Membership Perks Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Generate compelling YouTube membership tier names, perks, and pricing for your channel membership.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input type="text" placeholder="Your channel niche (e.g. 'fitness coaching')" value={niche} onChange={(e) => setNiche(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }} />
              <button type="submit" className="btn btn-primary">Generate Tiers</button>
            </form>
            {tiers.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tiers.map((t, i) => (
                  <div key={i} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <strong style={{ fontSize: '16px' }}>{t.name}</strong>
                    <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                      {t.perks.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          <FaqSection customFaqs={toolFaqs.membershipPerksGenerator || []} title="FAQs — Membership Perks Generator" />
        </div>
      </main>
    </>
  );
}
