import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Users, Video, Eye, DollarSign, TrendingUp } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function ChannelAnalyzerPage() {
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
      const response = await fetch(`/api/youtube/channel?url=${encodeURIComponent(url)}`);
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Failed to fetch channel data');
      
      // Perform manual calculations
      const subs = parseInt(result.subscriberCount) || 0;
      const views = parseInt(result.viewCount) || 0;
      const videosCount = parseInt(result.videoCount) || 0;
      
      const avgViewsPerVideo = videosCount > 0 ? Math.round(views / videosCount) : 0;
      const engagementRate = subs > 0 ? ((avgViewsPerVideo / subs) * 100).toFixed(2) : '0.00';
      
      // Estimated earnings (using RPM range $0.50 - $4.00 per 1000 views)
      const monthlyViews = views / 24; // Simple estimate
      const minMonthlyEarnings = Math.round((monthlyViews * 0.5) / 1000);
      const maxMonthlyEarnings = Math.round((monthlyViews * 4.0) / 1000);

      setData({
        ...result,
        avgViewsPerVideo,
        engagementRate,
        minMonthlyEarnings,
        maxMonthlyEarnings,
        growthScore: Math.min(100, Math.round((views / 1000000) + (subs / 50000))) // Simple mock growth score
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="YouTube Channel Analyzer | Free Channel Audit & Analytics Tool"
        description="Analyze any YouTube channel handle or URL. Get instant subscriber count, engagement metrics, average views, and estimated earnings."
        url="/youtube-channel-analyzer"
      />
      
      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Channel Analyzer
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Audit any YouTube channel instantly. Track stats, growth, and estimated earnings.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Enter YouTube Channel URL or @handle..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Analyzing...' : 'Analyze Channel'}
          </button>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {data && (
          <div style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
              {data.thumbnails?.high?.url && (
                <img src={data.thumbnails.high.url} alt={data.title} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--glow-primary)' }} />
              )}
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '5px' }}>{data.title}</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '600px' }}>{data.description}</p>
                {data.country && <span style={{ display: 'inline-block', marginTop: '10px', padding: '4px 10px', background: 'var(--bg-dark)', borderRadius: '12px', fontSize: '0.85rem' }}>Country: {data.country}</span>}
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Users size={32} style={{ color: 'var(--glow-primary)' }} />
                    <div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Subscribers</span>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatNumber(data.subscriberCount)}</h4>
                    </div>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Eye size={32} style={{ color: 'var(--glow-primary)' }} />
                    <div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Views</span>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatNumber(data.viewCount)}</h4>
                    </div>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Video size={32} style={{ color: 'var(--glow-primary)' }} />
                    <div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Videos</span>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatNumber(data.videoCount)}</h4>
                    </div>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <DollarSign size={32} style={{ color: '#10b981' }} />
                    <div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Est. Monthly Earnings</span>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#10b981' }}>${data.minMonthlyEarnings} - ${data.maxMonthlyEarnings}</h4>
                    </div>
                </div>
            </div>

            {/* Calculations Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <h4 style={{ marginBottom: '15px', fontWeight: '600' }}>Engagement Statistics</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Avg. Views per Video:</span>
                        <strong>{formatNumber(data.avgViewsPerVideo)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Engagement Rate:</span>
                        <strong>{data.engagementRate}%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Growth Score:</span>
                        <strong style={{ color: 'var(--glow-primary)' }}>{data.growthScore}/100</strong>
                    </div>
                </div>
            </div>
          </div>
        )}
      </section>

      <FaqSection 
        faqsData={toolFaqs.channelAnalyzer}
        customTitle="YouTube Channel Analyzer FAQs"
        customDescription="Learn how to analyze any YouTube channel and understand what metrics matter most for growth."
      />
    </div>
  );
}
