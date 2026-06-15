import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Music } from 'lucide-react';

export default function PlatformSwitcher({ platform }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 30px' }}>
      <div className="switch-container">
        <Link
          to="/youtube-comment-picker"
          className={`switch-btn ${platform === 'youtube' ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <Youtube size={18} color={platform === 'youtube' ? '#fff' : '#ef4444'} />
          YouTube
        </Link>
        <Link
          to="/instagram-comment-picker"
          className={`switch-btn ${platform === 'instagram' ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <Instagram size={18} color={platform === 'instagram' ? '#fff' : '#ec4899'} />
          Instagram
        </Link>
        <Link
          to="/tiktok-comment-picker"
          className={`switch-btn ${platform === 'tiktok' ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <Music size={18} color={platform === 'tiktok' ? '#fff' : '#00f2fe'} />
          TikTok
        </Link>
      </div>
    </div>
  );
}
