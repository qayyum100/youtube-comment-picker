import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { DollarSign, Sliders, Info } from 'lucide-react';

export default function MoneyCalculatorPage() {
  const [views, setViews] = useState(10000);
  const [rpm, setRpm] = useState(2.5); // Default RPM $2.50
  const [country, setCountry] = useState('US');
  const [category, setCategory] = useState('Tech');

  // Simple RPM mapping based on Category and Country
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
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="YouTube Money Calculator | Estimated Channel Earnings Tool"
        description="Estimate your YouTube channel daily, monthly, and yearly earnings with our interactive calculator using RPM ranges."
        url="/youtube-money-calculator"
      />
      
      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          YouTube Money Calculator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Estimate your potential YouTube earnings based on views, country, and content category.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        
        {/* Input Card */}
        <section className="card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Sliders size={20} /> Adjust Calculator</h3>
          
          <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ color: 'var(--text-muted)' }}>Daily Video Views</label>
                  <strong style={{ fontSize: '1.2rem' }}>{views.toLocaleString()}</strong>
              </div>
              <input 
                  type="range" 
                  min="100" 
                  max="1000000" 
                  step="500"
                  value={views} 
                  onChange={(e) => setViews(Number(e.target.value))}
                  style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'var(--border-light)', outline: 'none', cursor: 'pointer' }}
              />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
              <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Audience Country</label>
                  <select 
                      value={country} 
                      onChange={(e) => setCountry(e.target.value)}
                      style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                  >
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="IN">India</option>
                      <option value="BR">Brazil</option>
                  </select>
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Video Category</label>
                  <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                  >
                      <option value="Tech">Technology</option>
                      <option value="Finance">Finance / Business</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Vlogs">Entertainment / Vlogs</option>
                      <option value="Education">Education</option>
                  </select>
              </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-dark)', padding: '15px', borderRadius: 'var(--radius-md)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem' }}><Info size={16} /> Estimated RPM</span>
              <strong style={{ color: '#10b981' }}>${rpm.toFixed(2)}</strong>
          </div>
        </section>

        {/* Results Card */}
        <section className="card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><DollarSign size={20} style={{ color: '#10b981' }} /> Estimated Earnings</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '15px' }}>
                    <div>
                        <h4 style={{ margin: 0 }}>Daily Earnings</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Based on {dailyViews.toLocaleString()} views</span>
                    </div>
                    <strong style={{ fontSize: '1.8rem', color: '#10b981' }}>${calculateEarnings(dailyViews)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '15px' }}>
                    <div>
                        <h4 style={{ margin: 0 }}>Monthly Earnings</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Based on {Math.round(monthlyViews).toLocaleString()} views</span>
                    </div>
                    <strong style={{ fontSize: '1.8rem', color: '#10b981' }}>${calculateEarnings(monthlyViews)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h4 style={{ margin: 0 }}>Yearly Earnings</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Based on {Math.round(yearlyViews).toLocaleString()} views</span>
                    </div>
                    <strong style={{ fontSize: '1.8rem', color: '#10b981' }}>${calculateEarnings(yearlyViews)}</strong>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}
