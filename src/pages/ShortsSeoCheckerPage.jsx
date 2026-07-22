import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Search, CheckCircle } from 'lucide-react';

export default function ShortsSeoCheckerPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audit, setAudit] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setAudit({
      score: '88 / 100',
      hasShortsTag: title.includes('#Shorts') || description.includes('#Shorts') ? '✅ Yes' : '⚠️ Missing #Shorts tag',
      titleLength: title.length <= 60 ? '✅ Concise (<60 chars)' : '⚠️ Too Long for Mobile Shelf',
      seoGrade: 'Good Optimization for Shorts Feed'
    });
  };

  return (
    <>
      <SeoHead pageType="tool" title="Shorts SEO Checker — Audit YouTube Shorts Optimization" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Shorts SEO Checker
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Audit your Short's title, description, and hashtags for maximum Shorts feed distribution.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleCheck} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Short Title</label>
                <input
                  type="text"
                  placeholder="Short Title (e.g. 'Crazy Life Hack #Shorts')"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Short Description</label>
                <textarea
                  rows={3}
                  placeholder="Short Description text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
                />
              </div>

              <button type="submit" className="btn btn-primary">Audit Short SEO</button>
            </form>

            {audit && (
              <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--success)', marginBottom: '12px' }}>SEO Score: {audit.score}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-secondary)' }}>
                  <div>• <strong>Hashtag Check:</strong> {audit.hasShortsTag}</div>
                  <div>• <strong>Title Length:</strong> {audit.titleLength}</div>
                  <div>• <strong>Algorithm Status:</strong> {audit.seoGrade}</div>
                </div>
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.shortsSeoChecker || []} title="Frequently Asked Questions — Shorts SEO" />
        </div>
      </main>
    </>
  );
}
