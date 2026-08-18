import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { FileText, Copy, Check, Layout, Sparkles } from 'lucide-react';

export default function DescriptionFormatterPage() {
  const [desc, setDesc] = useState('');
  const [subscribeLink, setSubscribeLink] = useState('https://youtube.com/@YourChannel?sub_confirmation=1');
  const [websiteLink, setWebsiteLink] = useState('https://yourwebsite.com');
  const [template, setTemplate] = useState('standard');
  const [formatted, setFormatted] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = (e) => {
    e.preventDefault();
    if (!desc.trim()) return;

    let output = '';
    if (template === 'standard') {
      output = `📌 ABOUT THIS VIDEO:\n${desc}\n\n---------------------------------------\n🔔 SUBSCRIBE FOR MORE: ${subscribeLink}\n🌐 VISIT OUR WEBSITE: ${websiteLink}\n\n---------------------------------------\n💬 CONNECT WITH US ON SOCIAL:\n• Twitter/X: https://x.com/YourChannel\n• Instagram: https://instagram.com/YourChannel\n\n---------------------------------------\n#YouTube #ContentCreator #ViralVideo`;
    } else if (template === 'course') {
      output = `📚 VIDEO CHAPTERS & SUMMARY:\n${desc}\n\n=======================================\n🎓 RESOURCE LINKS & TOOLS:\n• Official Website: ${websiteLink}\n• Subscribe to Channel: ${subscribeLink}\n\n=======================================\n⚠️ DISCLAIMER: Links included in this description might be affiliate links.`;
    } else {
      output = `🚀 QUICK SUMMARY:\n${desc}\n\n👇 LINK IN BIO & RESOURCES:\n👉 Channel Sub: ${subscribeLink}\n👉 Main Site: ${websiteLink}\n\n#Shorts #Trending #Viral`;
    }

    setFormatted(output);
  };

  const handleCopy = () => {
    if (!formatted) return;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Description Formatter — Structure Video Descriptions" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>🥇 Description Formatter</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Clean up raw notes into professional, high-converting YouTube descriptions with emoji headers, social links & dividers.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', marginBottom: '32px' }}>
            <form onSubmit={handleFormat} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Select Description Template</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'standard', label: 'Standard YouTube Video' },
                    { id: 'course', label: 'Tutorial / Resource Heavy' },
                    { id: 'minimal', label: 'Minimal / Shorts Style' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTemplate(t.id)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        background: template === t.id ? 'var(--primary)' : 'var(--bg)',
                        color: template === t.id ? '#fff' : 'var(--text-primary)',
                        border: template === t.id ? '1px solid var(--primary)' : '1px solid var(--border)'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Raw Description / Video Summary</label>
                <textarea
                  rows={5}
                  placeholder="Paste your raw video text or summary notes..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Subscribe Link</label>
                  <input
                    type="text"
                    value={subscribeLink}
                    onChange={(e) => setSubscribeLink(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Website Link</label>
                  <input
                    type="text"
                    value={websiteLink}
                    onChange={(e) => setWebsiteLink(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '14px' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '15px', fontWeight: '600' }}>
                <FileText size={18} style={{ marginRight: '8px' }} /> Format YouTube Description
              </button>
            </form>

            {formatted && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>Structured YouTube Output</h3>
                    <span style={{ fontSize: '12px', color: formatted.length > 5000 ? 'red' : 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px' }}>
                      {formatted.length} / 5,000 chars
                    </span>
                  </div>
                  <button onClick={handleCopy} className="btn btn-sm btn-primary">
                    {copied ? <Check size={14} style={{ marginRight: '4px' }} /> : <Copy size={14} style={{ marginRight: '4px' }} />}
                    {copied ? 'Copied' : 'Copy Description'}
                  </button>
                </div>

                <pre style={{ background: 'var(--bg)', padding: '18px', borderRadius: '10px', fontSize: '14px', whiteSpace: 'pre-wrap', lineHeight: '1.6', border: '1px solid var(--border)', margin: 0 }}>
                  {formatted}
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
