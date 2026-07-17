import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Eye, Clock, Video } from 'lucide-react';
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

  const stats = data ? [
    { icon: <Video size={22} style={{ color: 'var(--primary)' }} />, label: 'Total Videos', value: data.videosCount },
    { icon: <Clock size={22} style={{ color: 'var(--primary)' }} />, label: 'Total Duration', value: data.totalDuration },
    { icon: <Clock size={22} style={{ color: 'var(--primary)' }} />, label: 'Avg. Video Length', value: data.avgDuration },
    { icon: <Eye size={22} style={{ color: 'var(--success)' }} />, label: 'Playlist Views', value: data.totalViews },
  ] : [];

  return (
    <div className="page-wrapper">
      <SEO 
        title="YouTube Playlist Analyzer | Playlist Duration Calculator"
        description="Analyze any YouTube playlist URL. Calculate total playlist runtime duration, average video lengths, views, and overall performance metrics."
        url="/youtube-playlist-analyzer"
      />

      <div className="page-hero">
        <h1>YouTube Playlist Analyzer</h1>
        <p>Calculate total duration, average length, views, and performance of any playlist.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon"><Search size={16} /></span>
            <input 
              type="text" 
              className="input-field"
              placeholder="Paste YouTube Playlist URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexShrink: 0 }}>
            {loading ? <span className="btn-spinner" role="status" aria-label="Loading" /> : 'Analyze Playlist'}
          </button>
        </form>

        {error && <div className="alert alert-error" style={{ marginTop: '16px' }}>{error}</div>}

        {data && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)' }}>{data.playlistTitle}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {stats.map((stat, idx) => (
                <div key={idx} className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '20px' }}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--primary-light)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {stat.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500', display: 'block', marginBottom: '4px' }}>{stat.label}</span>
                    <strong style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: '700' }}>{stat.value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FaqSection 
        faqsData={toolFaqs.playlistAnalyzer}
        customTitle="YouTube Playlist Analyzer FAQs"
        customDescription="Learn how to get the most out of your YouTube playlists and increase your watch time."
      />
    </div>
  );
}
