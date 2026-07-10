import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

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

    // Clean handle to remove @ symbol if typed
    const cleanHandle = handle.replace('@', '').trim();

    try {
      const response = await fetch(`/api/youtube/channel?url=${encodeURIComponent(`@${cleanHandle}`)}`);
      const result = await response.json();

      if (response.status === 404) {
        // Safe, handle is available!
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
        // Taken, channel found
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
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="YouTube Handle Checker | Free @Handle Availability Tool"
        description="Verify if a YouTube handle is available. Generate alternative handle ideas instantly if your desired username is taken."
        url="/youtube-handle-checker"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Handle Checker
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Check @handle availability and automatically generate custom name alternatives.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleCheck} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 'bold' }}>@</span>
            <input 
              type="text" 
              placeholder="Enter desired handle (e.g. techcreator)..." 
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 35px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Checking...' : 'Check Availability'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {status && (
          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Availability Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: status.available ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)', padding: '25px', borderRadius: 'var(--radius-md)', border: status.available ? '1px solid rgba(16, 185, 129, 0.1)' : '1px solid rgba(239, 68, 68, 0.1)' }}>
              {status.available ? (
                <>
                  <CheckCircle size={36} style={{ color: '#10b981' }} />
                  <div>
                    <h3 style={{ color: '#10b981', margin: 0, fontSize: '1.4rem' }}>Handle Available!</h3>
                    <p style={{ margin: 0, color: 'var(--text-muted)', marginTop: '5px' }}><strong>@{status.handle}</strong> is ready to claim on YouTube.</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={36} style={{ color: '#ef4444' }} />
                  <div>
                    <h3 style={{ color: '#ef4444', margin: 0, fontSize: '1.4rem' }}>Handle Taken</h3>
                    <p style={{ margin: 0, color: 'var(--text-muted)', marginTop: '5px' }}><strong>@{status.handle}</strong> is currently claimed by <strong>{status.channel?.title || 'another channel'}</strong>.</p>
                  </div>
                </>
              )}
            </div>

            {/* Alternatives */}
            <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <h4 style={{ margin: 0, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><RefreshCw size={16} /> Alternative Handle Ideas</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {status.alternatives.map((alt, idx) => (
                  <span key={idx} style={{ padding: '8px 12px', background: 'var(--bg-dark)', border: '1px solid var(--border-light)', borderRadius: '20px', fontSize: '0.9rem' }}>
                    @{alt}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}
      </section>
    </div>
  );
}
