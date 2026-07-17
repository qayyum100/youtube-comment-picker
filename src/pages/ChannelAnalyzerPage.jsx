import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Users, Video, Eye, DollarSign, TrendingUp, Globe } from 'lucide-react';
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
        growthScore: Math.min(100, Math.round((views / 1000000) + (subs / 50000)))
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

  const metrics = data ? [
    { label: 'Subscribers', value: formatNumber(data.subscriberCount), icon: <Users size={20} />, color: 'var(--primary)', bgColor: 'var(--primary-light)' },
    { label: 'Total Views', value: formatNumber(data.viewCount), icon: <Eye size={20} />, color: 'var(--info)', bgColor: 'var(--info-light)' },
    { label: 'Total Videos', value: formatNumber(data.videoCount), icon: <Video size={20} />, color: 'var(--warning)', bgColor: 'var(--warning-light)' },
    { label: 'Est. Monthly Earnings', value: `$${data.minMonthlyEarnings} – $${data.maxMonthlyEarnings}`, icon: <DollarSign size={20} />, color: 'var(--success)', bgColor: 'var(--success-light)' },
  ] : [];

  return (
    <div className="page-wrapper">
      <SEO
        title="YouTube Channel Analyzer | Free Channel Audit & Analytics Tool"
        description="Analyze any YouTube channel handle or URL. Get instant subscriber count, engagement metrics, average views, and estimated earnings."
        url="/youtube-channel-analyzer"
      />

      {/* Hero */}
      <div className="page-hero">
        <h1>YouTube Channel Analyzer</h1>
        <p>Audit any YouTube channel instantly. Track stats, growth, and estimated earnings.</p>
      </div>

      {/* Input */}
      <div className="card card-lg" style={{ marginBottom: '24px' }}>
        <form onSubmit={handleAnalyze} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon"><Search size={16} /></span>
            <input
              type="text"
              className="input-field"
              placeholder="Enter YouTube Channel URL or @handle..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              aria-label="YouTube channel URL or handle"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexShrink: 0 }}>
            {loading ? <span className="btn-spinner" /> : 'Analyze Channel'}
          </button>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>

          {/* Channel Profile */}
          <div className="card card-lg">
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              {data.thumbnails?.high?.url && (
                <img
                  src={data.thumbnails.high.url}
                  alt={data.title}
                  className="avatar"
                  style={{ width: '80px', height: '80px', flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                  {data.title}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5', maxWidth: '600px' }}>
                  {data.description}
                </p>
                {data.country && (
                  <span className="badge badge-neutral" style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Globe size={12} /> {data.country}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid-cols-4">
            {metrics.map((m, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon" style={{ background: m.bgColor, color: m.color }}>
                  {m.icon}
                </div>
                <div>
                  <div className="stat-label">{m.label}</div>
                  <div className="stat-value" style={{ fontSize: '20px', marginTop: '4px' }}>{m.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Engagement Stats */}
          <div className="card card-lg">
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Engagement Statistics
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: 'Avg. Views per Video', value: formatNumber(data.avgViewsPerVideo) },
                { label: 'Engagement Rate', value: `${data.engagementRate}%` },
                { label: 'Growth Score', value: `${data.growthScore} / 100`, accent: true },
              ].map((row, i) => (
                <div key={i} className="result-row">
                  <span className="result-label">{row.label}</span>
                  <span className="result-value" style={row.accent ? { color: 'var(--primary)' } : {}}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <FaqSection
        faqsData={toolFaqs.channelAnalyzer}
        customTitle="YouTube Channel Analyzer FAQs"
        customDescription="Learn how to analyze any YouTube channel and understand what metrics matter most for growth."
      />
    </div>
  );
}
