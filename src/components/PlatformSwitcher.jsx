import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Music } from 'lucide-react';

export default function PlatformSwitcher({ platform }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 32px' }}>
      <div className="segmented-control" role="tablist" aria-label="Platform selection">
        <PlatformButton
          currentPlatform={platform}
          targetPlatform="youtube"
          to="/youtube-comment-picker"
          icon={<Youtube size={16} />}
          label="YouTube"
        />
        <PlatformButton
          currentPlatform={platform}
          targetPlatform="instagram"
          to="/instagram-comment-picker"
          icon={<Instagram size={16} />}
          label="Instagram"
        />
        <PlatformButton
          currentPlatform={platform}
          targetPlatform="tiktok"
          to="/tiktok-comment-picker"
          icon={<Music size={16} />}
          label="TikTok"
        />
      </div>
    </div>
  );
}

function PlatformButton({ currentPlatform, targetPlatform, to, icon, label }) {
  const isActive = currentPlatform === targetPlatform;

  return (
    <Link
      to={to}
      role="tab"
      aria-selected={isActive}
      style={{ textDecoration: 'none' }}
    >
      <div className={`segmented-btn ${isActive ? 'active' : ''}`}>
        {icon}
        {label}
      </div>
    </Link>
  );
}
