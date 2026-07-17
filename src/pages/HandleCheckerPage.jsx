import React, { useState } from 'react';
import SEO from '../components/SEO';
import { CheckCircle, XCircle, RefreshCw, AtSign } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function HandleCheckerPage() {
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!handle) return;

    setLoading(true);
    setError(null);
    setStatus(null);

    const cleanHandle = handle.replace('@', '').trim();

    try {
      const response = await fetch(`/api/youtube/channel?url=${encodeURIComponent(`@${cleanHandle}`)}`);
      const result = await response.json();

      if (response.status === 404) {
        setStatus({
          available: true,
          handle: cleanHandle,
          alternatives: [
            `${cleanHandle}Official`,
            `The${cleanHandle}`,
            `${cleanHandle}HQ`,
            `Real${cleanHandle}`,
            `${cleanHandle}Videos`
          ]
        });
      } else if (response.ok) {
        setStatus({
          available: false,
          handle: cleanHandle,
          channel: result,
          alternatives: [
            `${cleanHandle}Official`,
            `The${cleanHandle}`,
            `${cleanHandle}HQ`,
            `Real${cleanHandle}`,
            `${cleanHandle}Videos`
          ]
        });
      } else {
        throw new Error(result.error || 'Failed to check handle');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <SEO 
        title="YouTube Handle Checker | Free @Handle Availability Tool"
        description="Verify if a YouTube handle is available. Generate alternative handle ideas instantly if your desired username is taken."
        url="/youtube-handle-checker"
      />

      <div className="page-hero">
        <h1>YouTube Handle Checker</h1>
        <p>Check @handle availability and automatically generate custom name alternatives.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleCheck} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon" style={{ fontWeight: '700', fontSize: '15px' }}>@</span>
            <input 
              type="text" 
              className="input-field"
              placeholder="Enter desired handle (e.g. techcreator)..." 
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexShrink: 0 }}>
            {loading ? (
              <span className="btn-spinner" role="status" aria-label="Loading" />
            ) : 'Check Availability'}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            {error}
          </div>
        )}

        {status && (
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Availability Status */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '20px 24px', borderRadius: 'var(--radius-md)',
              background: status.available ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)',
              border: `1px solid ${status.available ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`
            }}>
              {status.available ? (
                <>
                  <CheckCircle size={32} style={{ color: 'var(--success)', flexShrink: 0 }} />
                  <div>
                    <h3 style={{ color: 'var(--success)', margin: 0, fontSize: '18px', fontWeight: '700' }}>Handle Available!</h3>
                    <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}><strong>@{status.handle}</strong> is ready to claim on YouTube.</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={32} style={{ color: 'var(--error)', flexShrink: 0 }} />
                  <div>
                    <h3 style={{ color: 'var(--error)', margin: 0, fontSize: '18px', fontWeight: '700' }}>Handle Taken</h3>
                    <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}><strong>@{status.handle}</strong> is currently claimed by <strong>{status.channel?.title || 'another channel'}</strong>.</p>
                  </div>
                </>
              )}
            </div>

            {/* Alternatives */}
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ margin: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
                <RefreshCw size={15} style={{ color: 'var(--primary)' }} /> Alternative Handle Ideas
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {status.alternatives.map((alt, idx) => (
                  <span key={idx} className="tag" style={{ color: 'var(--primary)', borderColor: 'rgba(79,110,247,0.2)', background: 'var(--primary-light)', fontSize: '13px', padding: '6px 14px' }}>
                    @{alt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.handleChecker}
        customTitle="YouTube Handle Checker FAQs"
        customDescription="Learn everything you need to know about choosing and checking your YouTube handle."
      />
    </div>
  );
}
