import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { DollarSign, Sliders, Info } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function MoneyCalculatorPage() {
  const [views, setViews] = useState(10000);
  const [rpm, setRpm] = useState(2.5);
  const [country, setCountry] = useState('US');
  const [category, setCategory] = useState('Tech');

  const rpmEstimates = {
    Tech: { US: 6.0, UK: 4.5, IN: 1.5, DE: 5.0, BR: 1.2 },
    Finance: { US: 12.0, UK: 8.5, IN: 3.5, DE: 9.0, BR: 2.0 },
    Gaming: { US: 2.0, UK: 1.5, IN: 0.5, DE: 1.8, BR: 0.4 },
    Vlogs: { US: 3.0, UK: 2.2, IN: 0.8, DE: 2.5, BR: 0.6 },
    Education: { US: 5.0, UK: 3.8, IN: 1.2, DE: 4.2, BR: 0.9 },
  };

  useEffect(() => {
    const estRpm = rpmEstimates[category]?.[country] || 2.5;
    setRpm(estRpm);
  }, [category, country]);

  const dailyViews = views;
  const monthlyViews = dailyViews * 30.4;
  const yearlyViews = dailyViews * 365;

  const calculateEarnings = (viewsCount) => {
    return ((viewsCount * rpm) / 1000).toFixed(2);
  };

  return (
    <div className="page-wrapper">
      <SEO
        title="YouTube Money Calculator | Estimated Channel Earnings Tool"
        description="Estimate your YouTube channel daily, monthly, and yearly earnings with our interactive calculator using RPM ranges."
        url="/youtube-money-calculator"
      />

      {/* Hero */}
      <div className="page-hero">
        <h1>YouTube Money Calculator</h1>
        <p>Estimate your potential YouTube earnings based on views, country, and content category.</p>
      </div>

      <div className="grid-cols-2" style={{ marginBottom: '40px', alignItems: 'start' }}>

        {/* Input Card */}
        <div className="card card-lg">
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Sliders size={18} style={{ color: 'var(--primary)' }} />
            Adjust Calculator
          </h3>

          {/* Views Slider */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label className="field-label" style={{ margin: 0 }}>Daily Video Views</label>
              <strong style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>
                {views.toLocaleString()}
              </strong>
            </div>
            <input
              type="range"
              min="100"
              max="1000000"
              step="500"
              value={views}
              onChange={(e) => setViews(Number(e.target.value))}
              aria-label="Daily video views"
            />
          </div>

          {/* Country + Category */}
          <div className="grid-cols-2" style={{ gap: '16px', marginBottom: '20px' }}>
            <div>
              <label htmlFor="audience-country" className="field-label">Audience Country</label>
              <select
                id="audience-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="select-field"
              >
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="DE">Germany</option>
                <option value="IN">India</option>
                <option value="BR">Brazil</option>
              </select>
            </div>
            <div>
              <label htmlFor="video-category" className="field-label">Video Category</label>
              <select
                id="video-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select-field"
              >
                <option value="Tech">Technology</option>
                <option value="Finance">Finance / Business</option>
                <option value="Gaming">Gaming</option>
                <option value="Vlogs">Entertainment / Vlogs</option>
                <option value="Education">Education</option>
              </select>
            </div>
          </div>

          {/* RPM Info */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>
              <Info size={14} /> Estimated RPM
            </span>
            <strong style={{ color: 'var(--success)', fontSize: '15px' }}>${rpm.toFixed(2)}</strong>
          </div>
        </div>

        {/* Results Card */}
        <div className="card card-lg">
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <DollarSign size={18} style={{ color: 'var(--success)' }} />
            Estimated Earnings
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { label: 'Daily Earnings', sub: `${dailyViews.toLocaleString()} views`, value: `$${calculateEarnings(dailyViews)}` },
              { label: 'Monthly Earnings', sub: `${Math.round(monthlyViews).toLocaleString()} views`, value: `$${calculateEarnings(monthlyViews)}` },
              { label: 'Yearly Earnings', sub: `${Math.round(yearlyViews).toLocaleString()} views`, value: `$${calculateEarnings(yearlyViews)}` },
            ].map((row, i) => (
              <div key={i} className="result-row">
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>{row.label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Based on {row.sub}</div>
                </div>
                <strong style={{ fontSize: '22px', color: 'var(--success)', fontWeight: '700' }}>{row.value}</strong>
              </div>
            ))}
          </div>
        </div>

      </div>

      <FaqSection
        faqsData={toolFaqs.moneyCalculator}
        customTitle="YouTube Money Calculator FAQs"
        customDescription="Find out how much money YouTubers actually make and how to calculate your potential earnings."
      />
    </div>
  );
}
