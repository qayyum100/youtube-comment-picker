import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlatformSwitcher({ platform }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 40px' }}>
      <div className="liquid-glass" style={{ 
        display: 'inline-flex',
        padding: '6px',
        borderRadius: 'var(--radius-full)',
        gap: '8px'
      }}>
        <PlatformButton 
          currentPlatform={platform} 
          targetPlatform="youtube" 
          to="/youtube-comment-picker" 
          icon={<Youtube size={18} color={platform === 'youtube' ? '#fff' : '#ef4444'} />} 
          label="YouTube" 
        />
        <PlatformButton 
          currentPlatform={platform} 
          targetPlatform="instagram" 
          to="/instagram-comment-picker" 
          icon={<Instagram size={18} color={platform === 'instagram' ? '#fff' : '#ec4899'} />} 
          label="Instagram" 
        />
        <PlatformButton 
          currentPlatform={platform} 
          targetPlatform="tiktok" 
          to="/tiktok-comment-picker" 
          icon={<Music size={18} color={platform === 'tiktok' ? '#fff' : '#00f2fe'} />} 
          label="TikTok" 
        />
      </div>
    </div>
  );
}

function PlatformButton({ currentPlatform, targetPlatform, to, icon, label }) {
  const isActive = currentPlatform === targetPlatform;

  return (
    <Link to={to} style={{ textDecoration: 'none', position: 'relative' }}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: '10px 20px',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '500',
          color: isActive ? '#fff' : 'var(--text-secondary)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {icon}
        {label}
      </motion.div>
      {isActive && (
        <motion.div
          layoutId="activePlatformBackground"
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--glow-primary)',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 4px 15px var(--glow-primary)',
            zIndex: 0
          }}
        />
      )}
    </Link>
  );
}
