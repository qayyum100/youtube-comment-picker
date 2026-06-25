import React, { useState, useRef } from 'react';
import {
  Trophy, ShieldCheck, RefreshCw, Copy, Check,
  Award, Calendar, Sparkles, ThumbsUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ─── helpers ─────────────────────────────────────────────────────────────────

function generateSerial() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'CERT-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function fireConfetti() {
  try {
    const fn =
      typeof confetti === 'function'
        ? confetti
        : confetti?.default;
    if (typeof fn === 'function') {
      fn({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#ec4899', '#f97316', '#ff0000', '#fb7185', '#fbbf24'],
      });
    }
  } catch (e) {
    console.warn('Confetti skipped:', e);
  }
}

function formatDate(ts) {
  if (!ts) return '—';
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return '—';
  }
}

function RaffleWheel({ isDrawing, winnerName }) {
  const [rotation, setRotation] = useState(0);

  React.useEffect(() => {
    if (isDrawing) {
      setRotation(prev => prev + 1800 + Math.floor(Math.random() * 360));
    }
  }, [isDrawing]);

  const wheelStyle = {
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    background: `conic-gradient(
      #4f46e5 0deg 30deg, #ec4899 30deg 60deg, 
      #f97316 60deg 90deg, #8b5cf6 90deg 120deg, 
      #14b8a6 120deg 150deg, #f43f5e 150deg 180deg, 
      #4f46e5 180deg 210deg, #ec4899 210deg 240deg, 
      #f97316 240deg 270deg, #8b5cf6 270deg 300deg, 
      #14b8a6 300deg 330deg, #f43f5e 330deg 360deg
    )`,
    transition: 'transform 2.5s cubic-bezier(0.25, 1, 0.5, 1)',
    transform: `rotate(${rotation}deg)`,
    margin: '0 auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    border: '4px solid #fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
      <div style={{ position: 'relative', width: '250px', margin: '0 auto' }}>
        <div style={{ 
          position: 'absolute', 
          top: '-15px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 0, 
          height: 0, 
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderTop: '25px solid var(--text-primary)',
          zIndex: 10
        }} />
        <div style={wheelStyle}>
          <div style={{
            background: 'var(--bg-panel)',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <span style={{ fontSize: '2rem' }}>🎰</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '16px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--brand-indigo)' }}>
        {isDrawing ? "Spinning..." : winnerName ? `Landed on: ${winnerName}!` : ""}
      </div>
    </div>
  );
}

// ─── component ───────────────────────────────────────────────────────────────

export default function DrawingDesk({
  comments,
  filteredComments,
  winners,
  setWinners,
  standbys,
  setStandbys,
  onGenerateCertificate,
}) {
  const [numWinners,  setNumWinners]  = useState(1);
  const [numStandbys, setNumStandbys] = useState(0);
  const [isDrawing,   setIsDrawing]   = useState(false);
  const [shufflingName, setShufflingName] = useState('');
  const [copiedId,    setCopiedId]    = useState(null);
  const [reRollingSlot, setReRollingSlot] = useState(null); // {type,index}
  const [reRollingName, setReRollingName] = useState('');

  // ── EXPORT CSV ─────────────────────────────────────────────────────────────
  const handleExportCSV = () => {
    const dataToExport = (winners.length > 0 || standbys.length > 0) 
      ? [...winners, ...standbys] 
      : filteredComments;

    if (dataToExport.length === 0) return;

    const headers = ['Platform', 'Author', 'Timestamp', 'Likes', 'Comment', 'Prize/Role', 'SerialCode'];
    const rows = dataToExport.map(item => [
      item.platform || 'unknown',
      item.author,
      new Date(item.timestamp).toISOString(),
      item.likes || 0,
      `"${(item.text || '').replace(/"/g, '""')}"`,
      item.prizeTag || 'Participant',
      item.serialCode || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `giveaway_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // keep a cancellable ref so we can abort if needed
  const timerRef = useRef(null);

  // ── DRAW ───────────────────────────────────────────────────────────────────
  const commenceDrawing = () => {
    if (filteredComments.length === 0) return;

    // ✅ Capture ALL live values RIGHT NOW before any async work
    const pool          = [...filteredComments];
    const wCount        = numWinners;
    const sCount        = numStandbys;

    setIsDrawing(true);
    setWinners([]);
    setStandbys([]);

    // fast-shuffle display
    const interval = setInterval(() => {
      setShufflingName(pool[Math.floor(Math.random() * pool.length)].author);
    }, 65);

    timerRef.current = setTimeout(() => {
      clearInterval(interval);

      // ✅ Use captured snapshots — no stale closure
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const total    = wCount + sCount;

      const drawnWinners  = [];
      const drawnStandbys = [];

      for (let i = 0; i < Math.min(shuffled.length, wCount); i++) {
        drawnWinners.push({
          ...shuffled[i],
          prizeTag:   i === 0 ? 'Grand Prize' : `Winner #${i + 1}`,
          serialCode: generateSerial(),
        });
      }
      for (let i = wCount; i < Math.min(shuffled.length, total); i++) {
        drawnStandbys.push({
          ...shuffled[i],
          prizeTag:   `Backup #${i - wCount + 1}`,
          serialCode: generateSerial(),
        });
      }

      // ✅ Set state AFTER building arrays (not inside a separate function)
      setWinners(drawnWinners);
      setStandbys(drawnStandbys);
      setIsDrawing(false);
      setShufflingName('');

      fireConfetti();
    }, 2500);
  };

  // ── RE-ROLL ────────────────────────────────────────────────────────────────
  const handleReRoll = (type, index) => {
    const usedIds = new Set([
      ...winners.map(w => w.id),
      ...standbys.map(s => s.id),
    ]);
    const eligible = filteredComments.filter(c => !usedIds.has(c.id));
    if (eligible.length === 0) {
      alert('No other eligible comments left in the pool!');
      return;
    }

    setReRollingSlot({ type, index });
    const interval = setInterval(() => {
      setReRollingName(eligible[Math.floor(Math.random() * eligible.length)].author);
    }, 65);

    setTimeout(() => {
      clearInterval(interval);
      setReRollingSlot(null);
      const chosen = {
        ...eligible[Math.floor(Math.random() * eligible.length)],
        prizeTag:   type === 'winner' ? winners[index].prizeTag : standbys[index].prizeTag,
        serialCode: generateSerial(),
      };
      if (type === 'winner') {
        const next = [...winners]; next[index] = chosen; setWinners(next);
      } else {
        const next = [...standbys]; next[index] = chosen; setStandbys(next);
      }
    }, 1000);
  };

  // ── PRIZE TAG ──────────────────────────────────────────────────────────────
  const handlePrizeTagChange = (type, index, tag) => {
    if (type === 'winner') {
      const next = [...winners]; next[index] = { ...next[index], prizeTag: tag }; setWinners(next);
    } else {
      const next = [...standbys]; next[index] = { ...next[index], prizeTag: tag }; setStandbys(next);
    }
  };

  // ── COPY POST ──────────────────────────────────────────────────────────────
  const handleCopyPost = (item) => {
    const text =
      `🏆 Giveaway Winner Alert! 🏆\n\n` +
      `Congratulations to ${item.author} for winning "${item.prizeTag || 'the Prize'}"!\n` +
      `Verification Serial: ${item.serialCode}\n\n` +
      `Thank you everyone for participating! 🎉`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const hasResults = winners.length > 0 || standbys.length > 0;

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="card-premium active-border animate-fade-in" style={{ marginBottom: '24px', minHeight: '400px' }}>

      {/* ── title ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={20} style={{ color: 'var(--brand-indigo)' }} />
          High-Fidelity Drawing Desk
        </h2>
        
        {/* CSV Export Button */}
        <button 
          onClick={handleExportCSV} 
          className="btn-secondary" 
          disabled={filteredComments.length === 0 || isDrawing}
          style={{ padding: '6px 12px', fontSize: '0.85rem' }}
        >
          Download CSV
        </button>
      </div>

      {/* ── config bar ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        backgroundColor: 'var(--bg-input)',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-dark)',
        marginBottom: '20px',
      }}>
        {/* winners stepper */}
        <StepperField
          label="Primary Winners (1-10)"
          value={numWinners}
          min={1} max={10}
          disabled={isDrawing || comments.length === 0}
          onChange={setNumWinners}
        />

        {/* standbys stepper */}
        <StepperField
          label="Standby Alternates (0-5)"
          value={numStandbys}
          min={0} max={5}
          disabled={isDrawing || comments.length === 0}
          onChange={setNumStandbys}
        />

        {/* draw button */}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button
            id="btn-draw"
            type="button"
            className="btn-primary"
            onClick={commenceDrawing}
            disabled={isDrawing || filteredComments.length === 0}
            style={{ width: '100%', height: '46px' }}
          >
            {isDrawing
              ? <><RefreshCw size={15} style={{ animation: 'spin 0.8s linear infinite' }} /> Drawing…</>
              : <><Sparkles size={15} /> Commence Drawing</>}
          </button>
        </div>
      </div>

      {/* empty-pool notice */}
      {filteredComments.length === 0 && comments.length > 0 && (
        <p style={{ textAlign: 'center', color: '#f97316', fontSize: '0.85rem', padding: '8px 0' }}>
          No comments match your filters — adjust them to draw.
        </p>
      )}

      {/* ── shuffler ── */}
      {(isDrawing || (hasResults && winners.length > 0)) && (
        <div className="animate-fade-in" style={{ marginBottom: '20px' }}>
          <RaffleWheel 
            isDrawing={isDrawing} 
            winnerName={hasResults && !isDrawing ? winners[0]?.author : null} 
          />
        </div>
      )}

      {/* ── results ── */}
      {hasResults && !isDrawing && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* winners */}
          {winners.length > 0 && (
            <ResultSection
              title="PRIMARY WINNERS"
              titleColor="var(--brand-indigo)"
              icon={<Trophy size={15} />}
              items={winners}
              type="winner"
              reRollingSlot={reRollingSlot}
              reRollingName={reRollingName}
              copiedId={copiedId}
              onReRoll={handleReRoll}
              onCopy={handleCopyPost}
              onCertificate={onGenerateCertificate}
              onPrizeTagChange={handlePrizeTagChange}
              accentColor="var(--brand-indigo)"
            />
          )}

          {/* standbys */}
          {standbys.length > 0 && (
            <ResultSection
              title="STANDBY ALTERNATIVES"
              titleColor="var(--text-secondary)"
              icon={<ShieldCheck size={15} />}
              items={standbys}
              type="standby"
              reRollingSlot={reRollingSlot}
              reRollingName={reRollingName}
              copiedId={copiedId}
              onReRoll={handleReRoll}
              onCopy={handleCopyPost}
              onCertificate={onGenerateCertificate}
              onPrizeTagChange={handlePrizeTagChange}
              accentColor="var(--text-secondary)"
            />
          )}
        </div>
      )}
    </div>
  );
}

// ─── sub-components ───────────────────────────────────────────────────────────

function StepperField({ label, value, min, max, disabled, onChange }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onChange(v => Math.max(min, v - 1))}
          disabled={disabled}
          style={{ padding: '5px 12px', fontSize: '1.1rem', borderRadius: 'var(--radius-sm)', lineHeight: 1 }}
        >−</button>
        <span style={{ fontSize: '1.25rem', fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>{value}</span>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onChange(v => Math.min(max, v + 1))}
          disabled={disabled}
          style={{ padding: '5px 12px', fontSize: '1.1rem', borderRadius: 'var(--radius-sm)', lineHeight: 1 }}
        >+</button>
      </div>
    </div>
  );
}

function ResultSection({
  title, titleColor, icon, items, type,
  reRollingSlot, reRollingName, copiedId,
  onReRoll, onCopy, onCertificate, onPrizeTagChange, accentColor,
}) {
  return (
    <div>
      <h3 style={{
        fontSize: '0.9rem', letterSpacing: '0.08em',
        color: titleColor, display: 'flex', alignItems: 'center',
        gap: '6px', marginBottom: '12px',
      }}>
        {icon} {title}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item, idx) => {
          const isRollingThis =
            reRollingSlot?.type === type && reRollingSlot?.index === idx;

          return (
            <div
              key={item.id || idx}
              className={`winner-card ${type === 'winner' ? 'is-winner' : 'is-standby'}`}
            >
              {isRollingThis ? (
                /* rolling placeholder */
                <div style={{
                  minHeight: '72px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '10px',
                  color: accentColor, fontWeight: 600,
                }}>
                  <RefreshCw size={18} style={{ animation: 'spin 0.7s linear infinite' }} />
                  Re-rolling: {reRollingName}
                </div>
              ) : (
                /* normal card */
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px',
                }}>
                  {/* ── left: user info ── */}
                  <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '240px' }}>
                    <img
                      src={item.authorAvatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(item.author)}`}
                      alt={item.author}
                      onError={e => {
                        e.currentTarget.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(item.author)}`;
                      }}
                      style={{
                        width: '44px', height: '44px',
                        borderRadius: '50%',
                        border: `2px solid ${accentColor}44`,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>
                          {item.author}
                        </span>
                        <span style={{
                          fontSize: '0.72rem', color: 'var(--text-muted)',
                          display: 'flex', alignItems: 'center', gap: '3px',
                        }}>
                          <ThumbsUp size={9} /> {item.likes ?? 0}
                        </span>
                      </div>

                      <p style={{
                        fontSize: '0.84rem', color: 'var(--text-secondary)',
                        marginTop: '4px', fontStyle: 'italic',
                        wordBreak: 'break-word',
                      }}>
                        "{item.text}"
                      </p>

                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        marginTop: '6px', fontSize: '0.68rem', color: 'var(--text-muted)',
                        flexWrap: 'wrap',
                      }}>
                        <Calendar size={9} />
                        {formatDate(item.timestamp)}
                        <span>•</span>
                        <span style={{ color: accentColor, fontFamily: 'monospace' }}>
                          {item.serialCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── right: controls ── */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '210px', flexShrink: 0 }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        {type === 'winner' ? 'Prize Tag' : 'Backup Label'}
                      </label>
                      <input
                        type="text"
                        className="input-premium"
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                        value={item.prizeTag || ''}
                        onChange={e => onPrizeTagChange(type, idx, e.target.value)}
                        placeholder={type === 'winner' ? 'e.g. Grand Prize' : 'e.g. Backup #1'}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => onReRoll(type, idx)}
                        style={{ padding: '6px 8px', flex: 1, fontSize: '0.73rem',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                        title="Re-roll this slot"
                      >
                        <RefreshCw size={11} /> Re-roll
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => onCopy(item)}
                        style={{ padding: '6px 8px', flex: 1, fontSize: '0.73rem',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                        title="Copy congratulations text"
                      >
                        {copiedId === item.id
                          ? <><Check size={11} color="#10b981" /> Copied</>
                          : <><Copy size={11} /> Copy</>}
                      </button>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => onCertificate(item)}
                        style={{ padding: '6px 10px', flex: 1.4, fontSize: '0.73rem',
                                 boxShadow: 'none',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                        title="Generate certificate"
                      >
                        <Award size={11} /> Cert
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
