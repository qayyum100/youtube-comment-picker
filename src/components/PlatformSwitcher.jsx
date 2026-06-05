import React from 'react';
import { Youtube, Instagram } from 'lucide-react';

export default function PlatformSwitcher({ platform, setPlatform }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 30px' }}>
      <div className="switch-container">
        <button
          type="button"
          className={`switch-btn ${platform === 'youtube' ? 'active' : ''}`}
          onClick={() => setPlatform('youtube')}
          id="btn-platform-youtube"
        >
          <Youtube size={18} color={platform === 'youtube' ? '#fff' : '#ef4444'} />
          YouTube Video Comments
        </button>
        <button
          type="button"
          className={`switch-btn ${platform === 'instagram' ? 'active' : ''}`}
          onClick={() => setPlatform('instagram')}
          id="btn-platform-instagram"
        >
          <Instagram size={18} color={platform === 'instagram' ? '#fff' : '#ec4899'} />
          Instagram Posts & Reels
        </button>
      </div>
    </div>
  );
}
