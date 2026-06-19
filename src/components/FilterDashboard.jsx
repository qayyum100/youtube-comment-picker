import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, UserCheck, RefreshCw, Hash, Users, ThumbsUp, ShieldAlert } from 'lucide-react';

export default function FilterDashboard({ filters, setFilters, totalComments, filteredCount }) {
  const [isOpen, setIsOpen] = useState(true);

  // Compute number of active filters
  const activeFiltersCount = [
    filters.keyword.trim() !== '',
    filters.minTags > 0,
    filters.minLikes > 0,
    filters.excludeList.trim() !== ''
  ].filter(Boolean).length;

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      minTags: 0,
      minLikes: 0,
      excludeList: '',
      duplicateMode: 'fair'
    });
  };

  return (
    <section className="card-premium animate-fade-in" style={{ marginBottom: '24px' }} aria-labelledby="filter-dashboard-title">
      {/* Header Accordion Trigger */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          cursor: 'pointer',
          userSelect: 'none'
        }}
        role="button"
        aria-expanded={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SlidersHorizontal size={20} style={{ color: 'var(--brand-indigo)' }} />
          <h2 id="filter-dashboard-title" style={{ fontSize: '1.25rem' }}>Advanced Algorithmic Filters</h2>
          {activeFiltersCount > 0 && (
            <span style={{
              backgroundColor: '#eef2ff',
              border: '1px solid #c7d2fe',
              color: 'var(--brand-indigo)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.7rem',
              fontWeight: '600'
            }}>
              Active: {activeFiltersCount}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {totalComments > 0 && (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Pool: <strong style={{ color: 'var(--brand-indigo)' }}>{filteredCount}</strong> / {totalComments} comments
            </span>
          )}
          {isOpen ? <ChevronUp size={18} color="var(--text-secondary)" /> : <ChevronDown size={18} color="var(--text-secondary)" />}
        </div>
      </div>

      {/* Filter Body */}
      {isOpen && (
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
          <div className="grid-cols-2">
            
            {/* Left Column: Duplicate Mode and Keyword Hurdle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Duplicate Entry Mode */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Duplicate Control Mode
                </label>
                <div className="switch-container" style={{ width: '100%' }}>
                  <button
                    type="button"
                    className={`switch-btn ${filters.duplicateMode === 'fair' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('duplicateMode', 'fair')}
                    style={{ flexGrow: 1, justifyContent: 'center' }}
                  >
                    <UserCheck size={16} />
                    Fair Mode (1 Entry / User)
                  </button>
                  <button
                    type="button"
                    className={`switch-btn ${filters.duplicateMode === 'boost' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('duplicateMode', 'boost')}
                    style={{ flexGrow: 1, justifyContent: 'center' }}
                  >
                    <RefreshCw size={14} />
                    Boost Mode (Every comment counts)
                  </button>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  {filters.duplicateMode === 'fair' 
                    ? 'Evaluates only the first qualifying comment per user handle. Perfect for fair YouTube Comment Random Picker draws.' 
                    : 'Each qualifying comment is counted as a separate entry ticket, rewarding multiple comments in your YouTube Comment Random Picker giveaways.'}
                </p>
              </div>

              {/* Subscribers Only */}
              <div style={{ marginTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <UserCheck size={14} style={{ color: 'var(--brand-indigo)' }} />
                  Subscribers Only
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="filter-subscribers"
                    checked={filters.subscribersOnly}
                    onChange={(e) => handleFilterChange('subscribersOnly', e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--brand-indigo)', cursor: 'pointer' }}
                  />
                  <label htmlFor="filter-subscribers" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    Require public channel subscription
                  </label>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  A powerful feature for the YouTube Comment Random Picker. Disqualifies users who are not publicly subscribed to your channel.
                </p>
              </div>

              {/* Keyword / Hashtag filter */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <Hash size={14} style={{ color: 'var(--brand-indigo)' }} />
                  Keyword Hurdle
                </label>
                <input
                  type="text"
                  className="input-premium"
                  placeholder="e.g. #giveaway or specific word"
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange('keyword', e.target.value)}
                  id="filter-keyword"
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Leave empty to ignore, or type a required hashtag or phrase for your YouTube Comment Random Picker giveaway.
                </p>
              </div>

              {/* First Commenter Bonus */}
              <div style={{ marginTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <Users size={14} style={{ color: 'var(--brand-indigo)' }} />
                  First Commenter Bonus
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="filter-first-comment"
                    checked={filters.firstCommentBonus}
                    onChange={(e) => handleFilterChange('firstCommentBonus', e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--brand-indigo)', cursor: 'pointer' }}
                  />
                  <label htmlFor="filter-first-comment" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    Grant +5 entries to the earliest commenter
                  </label>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Reward your most dedicated fans in the YouTube Comment Random Picker by boosting the very first commenter.
                </p>
              </div>
            </div>

            {/* Right Column: Tags, Likes, and Exclusions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div className="grid-cols-2" style={{ gap: '12px' }}>
                {/* Min Tag Count */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <Users size={14} style={{ color: 'var(--brand-indigo)' }} />
                    Min Friend @Tags
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleFilterChange('minTags', Math.max(0, filters.minTags - 1))}
                      style={{ padding: '6px 12px', fontSize: '1rem', borderRadius: 'var(--radius-sm)' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>
                      {filters.minTags}
                    </span>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleFilterChange('minTags', Math.min(5, filters.minTags + 1))}
                      style={{ padding: '6px 12px', fontSize: '1rem', borderRadius: 'var(--radius-sm)' }}
                    >
                      +
                    </button>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Require mentions of friends.
                  </p>
                </div>

                {/* Min Likes Count */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <ThumbsUp size={14} style={{ color: 'var(--brand-indigo)' }} />
                    Min Likes
                  </label>
                  <input
                    type="number"
                    className="input-premium"
                    min="0"
                    value={filters.minLikes}
                    onChange={(e) => handleFilterChange('minLikes', Math.max(0, parseInt(e.target.value) || 0))}
                    id="filter-min-likes"
                    style={{ padding: '8px 12px' }}
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Min likes required.
                  </p>
                </div>
              </div>

              {/* Exclusion Lists */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <ShieldAlert size={14} style={{ color: 'var(--brand-indigo)' }} />
                  Exclusion & Spam Filter
                </label>
                <textarea
                  className="input-premium"
                  rows={2}
                  placeholder="Exclude words or usernames (comma or newline separated, e.g. spam, bot, @competitor)"
                  value={filters.excludeList}
                  onChange={(e) => handleFilterChange('excludeList', e.target.value)}
                  id="filter-exclude-list"
                  style={{ resize: 'vertical', fontSize: '0.85rem', fontFamily: 'inherit' }}
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Disqualifies usernames or comments containing these keywords.
                </p>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-dark)', paddingTop: '16px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleResetFilters}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
