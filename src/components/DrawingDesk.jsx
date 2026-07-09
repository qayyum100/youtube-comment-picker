import React, { useState, useRef } from 'react';
import {
  Trophy, ShieldCheck, RefreshCw, Copy, Check,
  Award, Calendar, Sparkles, ThumbsUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div style={{ textAlign: 'center', marginBottom: '24px', position: 'relative' }}>
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
        <motion.div 
          animate={{ rotate: rotation }}
          transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
          style={{
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: `conic-gradient(
              var(--glow-primary) 0deg 30deg, #ec4899 30deg 60deg, 
              #f97316 60deg 90deg, #8b5cf6 90deg 120deg, 
              #14b8a6 120deg 150deg, #f43f5e 150deg 180deg, 
              var(--glow-primary) 180deg 210deg, #ec4899 210deg 240deg, 
              #f97316 240deg 270deg, #8b5cf6 270deg 300deg, 
              #14b8a6 300deg 330deg, #f43f5e 330deg 360deg
            )`,
            margin: '0 auto',
            boxShadow: '0 10px 35px rgba(0,0,0,0.2)',
            border: '4px solid var(--glass-border-top)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="liquid-glass" style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '2.5rem' }}>🎰</span>
          </div>
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div 
          key={isDrawing ? 'spinning' : winnerName ? 'winner' : 'idle'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{ marginTop: '20px', fontSize: '1.25rem', fontWeight: '600', color: 'var(--glow-primary)' }}
        >
          {isDrawing ? "Spinning..." : winnerName ? `Landed on: ${winnerName}!` : ""}
        </motion.div>
      </AnimatePresence>
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
  onDrawComplete,
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
      if (typeof onDrawComplete === 'function') {
        onDrawComplete(drawnWinners);
      }
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="liquid-glass" 
      style={{ marginBottom: '32px', minHeight: '400px', padding: '32px', borderRadius: 'var(--radius-xl)' }}
    >
      {/* ── title ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: '600' }}>
          <Trophy size={24} style={{ color: 'var(--glow-primary)' }} />
          High-Fidelity Drawing Desk
        </h2>
        
        {/* CSV Export Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportCSV} 
          className="liquid-glass" 
          disabled={filteredComments.length === 0 || isDrawing}
          style={{ padding: '10px 20px', fontSize: '0.9rem', color: 'var(--text-primary)', border: 'none', cursor: filteredComments.length === 0 || isDrawing ? 'not-allowed' : 'pointer', opacity: filteredComments.length === 0 || isDrawing ? 0.6 : 1 }}
        >
          Download CSV
        </motion.button>
      </div>

      {/* ── config bar ── */}
      <div className="liquid-glass" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '32px',
        border: 'none',
        background: 'var(--glass-bg-base)'
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
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 8px 25px var(--glow-primary)' }}
            whileTap={{ scale: 0.98 }}
            id="btn-draw"
            type="button"
            className="liquid-glass"
            onClick={commenceDrawing}
            disabled={isDrawing || filteredComments.length === 0}
            style={{ 
              width: '100%', 
              height: '48px', 
              border: 'none', 
              background: 'var(--glow-primary)', 
              color: '#fff', 
              fontWeight: '600', 
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: isDrawing || filteredComments.length === 0 ? 'not-allowed' : 'pointer',
              opacity: isDrawing || filteredComments.length === 0 ? 0.6 : 1
            }}
          >
            {isDrawing
              ? <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><RefreshCw size={18} /></motion.div> Drawing…</>
              : <><Sparkles size={18} /> Commence Drawing</>}
          </motion.button>
        </div>
      </div>

      {/* empty-pool notice */}
      <AnimatePresence>
        {filteredComments.length === 0 && comments.length > 0 && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ textAlign: 'center', color: '#f97316', fontSize: '0.9rem', padding: '12px 0' }}
          >
            No comments match your filters — adjust them to draw.
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── shuffler ── */}
      <AnimatePresence>
        {(isDrawing || (hasResults && winners.length > 0)) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ marginBottom: '32px' }}
          >
            <RaffleWheel 
              isDrawing={isDrawing} 
              winnerName={hasResults && !isDrawing ? winners[0]?.author : null} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── results ── */}
      <AnimatePresence>
        {hasResults && !isDrawing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {/* winners */}
            {winners.length > 0 && (
              <ResultSection
                title="PRIMARY WINNERS"
                titleColor="var(--glow-primary)"
                icon={<Trophy size={18} />}
                items={winners}
                type="winner"
                reRollingSlot={reRollingSlot}
                reRollingName={reRollingName}
                copiedId={copiedId}
                onReRoll={handleReRoll}
                onCopy={handleCopyPost}
                onCertificate={onGenerateCertificate}
                onPrizeTagChange={handlePrizeTagChange}
                accentColor="var(--glow-primary)"
              />
            )}

            {/* standbys */}
            {standbys.length > 0 && (
              <ResultSection
                title="STANDBY ALTERNATIVES"
                titleColor="var(--text-secondary)"
                icon={<ShieldCheck size={18} />}
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── sub-components ───────────────────────────────────────────────────────────

function StepperField({ label, value, min, max, disabled, onChange }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '500' }}>
        {label}
      </label>
      <div className="liquid-glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '6px', borderRadius: 'var(--radius-md)', background: 'transparent' }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => onChange(v => Math.max(min, v - 1))}
          disabled={disabled}
          style={{ padding: '8px 16px', fontSize: '1.2rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--glass-bg-hover)', color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer' }}
        >−</motion.button>
        <span style={{ fontSize: '1.25rem', fontWeight: '600', minWidth: '30px', textAlign: 'center', color: 'var(--text-primary)' }}>{value}</span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => onChange(v => Math.min(max, v + 1))}
          disabled={disabled}
          style={{ padding: '8px 16px', fontSize: '1.2rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--glass-bg-hover)', color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer' }}
        >+</motion.button>
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
        fontSize: '1rem', letterSpacing: '0.05em',
        color: titleColor, display: 'flex', alignItems: 'center',
        gap: '8px', marginBottom: '16px', fontWeight: '600'
      }}>
        {icon} {title}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence>
          {items.map((item, idx) => {
            const isRollingThis =
              reRollingSlot?.type === type && reRollingSlot?.index === idx;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={item.id || idx}
                className="liquid-glass"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  border: type === 'winner' ? `1px solid ${accentColor}` : 'var(--glass-border)',
                  boxShadow: type === 'winner' ? `0 8px 32px ${accentColor}33` : 'var(--glass-shadow)',
                }}
                whileHover={{ scale: 1.01, translateY: -2 }}
              >
                {isRollingThis ? (
                  /* rolling placeholder */
                  <div style={{
                    minHeight: '80px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '12px',
                    color: titleColor, fontWeight: 600, fontSize: '1.1rem'
                  }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <RefreshCw size={20} />
                    </motion.div>
                    Re-rolling: {reRollingName}
                  </div>
                ) : (
                  /* normal card */
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px',
                  }}>
                    {/* ── left: user info ── */}
                    <div style={{ display: 'flex', gap: '16px', flex: 1, minWidth: '240px' }}>
                      <img
                        src={item.authorAvatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(item.author)}`}
                        alt={item.author}
                        width="56"
                        height="56"
                        loading="lazy"
                        onError={e => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(item.author)}`;
                        }}
                        style={{
                          width: '56px', height: '56px',
                          borderRadius: '50%',
                          border: `2px solid ${titleColor}`,
                          flexShrink: 0,
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                            {item.author}
                          </span>
                          <span style={{
                            fontSize: '0.8rem', color: 'var(--text-muted)',
                            display: 'flex', alignItems: 'center', gap: '4px',
                            background: 'var(--glass-bg-hover)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)'
                          }}>
                            <ThumbsUp size={12} /> {item.likes ?? 0}
                          </span>
                        </div>

                        <p style={{
                          fontSize: '0.95rem', color: 'var(--text-secondary)',
                          marginTop: '8px', fontStyle: 'italic',
                          wordBreak: 'break-word',
                          lineHeight: 1.4
                        }}>
                          "{item.text}"
                        </p>

                        <div style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)',
                          flexWrap: 'wrap',
                        }}>
                          <Calendar size={12} />
                          {formatDate(item.timestamp)}
                          <span>•</span>
                          <span style={{ color: titleColor, fontFamily: 'monospace', fontWeight: '500' }}>
                            {item.serialCode}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ── right: controls ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '220px', flexShrink: 0 }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                          {type === 'winner' ? 'Prize Tag' : 'Backup Label'}
                        </label>
                        <input
                          type="text"
                          className="input-premium"
                          style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                          value={item.prizeTag || ''}
                          onChange={e => onPrizeTagChange(type, idx, e.target.value)}
                          placeholder={type === 'winner' ? 'e.g. Grand Prize' : 'e.g. Backup #1'}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          className="liquid-glass"
                          onClick={() => onReRoll(type, idx)}
                          style={{ padding: '8px 10px', flex: 1, fontSize: '0.8rem',
                                   display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                          title="Re-roll this slot"
                        >
                          <RefreshCw size={14} /> Re-roll
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          className="liquid-glass"
                          onClick={() => onCopy(item)}
                          style={{ padding: '8px 10px', flex: 1, fontSize: '0.8rem',
                                   display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                          title="Copy congratulations text"
                        >
                          {copiedId === item.id
                            ? <><Check size={14} color="#10b981" /> Copied</>
                            : <><Copy size={14} /> Copy</>}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          className="liquid-glass"
                          onClick={() => onCertificate(item)}
                          style={{ padding: '8px 12px', flex: 1.2, fontSize: '0.8rem',
                                   display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: 'none', background: 'var(--glow-primary)', color: '#fff', cursor: 'pointer' }}
                          title="Generate certificate"
                        >
                          <Award size={14} /> Cert
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
