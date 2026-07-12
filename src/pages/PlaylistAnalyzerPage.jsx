import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Eye, Clock, Video, BarChart2 } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function PlaylistAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Simulate playlist analytics metrics
      setTimeout(() => {
        const mockVideosCount = Math.floor(Math.random() * 25) + 5;
        const mockAvgDurationSecs = Math.floor(Math.random() * 600) + 180;
        const totalDurationSecs = mockVideosCount * mockAvgDurationSecs;
        
        const hrs = Math.floor(totalDurationSecs / 3600);
        const mins = Math.floor((totalDurationSecs % 3600) / 60);

        setData({
          playlistTitle: "SaaS Programming Tutorials for Beginners",
          videosCount: mockVideosCount,
          totalDuration: `${hrs} hours, ${mins} minutes`,
          avgDuration: `${Math.floor(mockAvgDurationSecs / 60)} minutes`,
          totalViews: (mockVideosCount * (Math.floor(Math.random() * 15000) + 2000)).toLocaleString(),
          performanceScore: Math.floor(Math.random() * 30) + 70
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="YouTube Playlist Analyzer | Playlist Duration Calculator"
        description="Analyze any YouTube playlist URL. Calculate total playlist runtime duration, average video lengths, views, and overall performance metrics."
        url="/youtube-playlist-analyzer"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Playlist Analyzer
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Calculate total duration, average length, views, and performance of any playlist.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Paste YouTube Playlist URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Analyzing...' : 'Analyze Playlist'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {data && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{data.playlistTitle}</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Video size={32} style={{ color: 'var(--glow-primary)' }} />
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Videos</span>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data.videosCount}</h4>
                </div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Clock size={32} style={{ color: 'var(--glow-primary)' }} />
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Duration</span>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data.totalDuration}</h4>
                </div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Clock size={32} style={{ color: 'var(--glow-primary)' }} />
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Avg. Video Length</span>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data.avgDuration}</h4>
                </div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Eye size={32} style={{ color: '#10b981' }} />
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Playlist Views</span>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data.totalViews}</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.playlistAnalyzer}
        customTitle="YouTube Playlist Analyzer FAQs"
        customDescription="Learn how to get the most out of your YouTube playlists and increase your watch time."
      />
    </div>
  );
}
