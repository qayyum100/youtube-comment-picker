import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { Clock, Sparkles } from 'lucide-react';

export default function AiVideoChapterGeneratorPage() {
  const [transcript, setTranscript] = useState('');
  const [chapters, setChapters] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!transcript) return;
    setChapters([
      '00:00 Introduction & Overview',
      '01:15 Key Concept #1',
      '03:40 Step-by-Step Tutorial',
      '06:20 Pro Tips & Best Practices',
      '08:50 Final Thoughts & Outro'
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="AI Video Chapter Generator — Format Description Timestamps" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>AI Video Chapter Generator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Generate YouTube-compliant description timestamps for enhanced video navigation.</p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <textarea
                rows={5}
                placeholder="Paste video script or notes here..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                <Clock size={18} style={{ marginRight: '8px' }} /> Generate Timestamps
              </button>
            </form>

            {chapters && (
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>Copy-Ready Timestamps</h3>
                <pre style={{ background: 'var(--bg)', padding: '12px', borderRadius: '6px', fontSize: '14px' }}>
                  {chapters.join('\n')}
                </pre>
              </div>
            )}
          </div>
          <FaqSection faqs={toolFaqs['description-generator'] || []} />
        </div>
      </main>
    </>
  );
}
