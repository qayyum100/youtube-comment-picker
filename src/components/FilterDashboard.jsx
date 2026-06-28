import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, UserCheck, RefreshCw, Hash, Users, ThumbsUp, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilterDashboard({ filters, setFilters, totalComments, filteredCount }) {
  const [isOpen, setIsOpen] = useState(true);

  // Compute number of active filters
  const activeFiltersCount = [
    (filters?.keyword || '').trim() !== '',
    (filters?.minTags || 0) > 0,
    (filters?.minLikes || 0) > 0,
    (filters?.excludeList || '').trim() !== ''
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
      duplicateMode: 'fair',
      subscribersOnly: false,
      firstCommentBonus: false
    });
  };

  return (
    <motion.section 
      layout
      className="liquid-glass" 
      style={{ marginBottom: '32px', padding: '24px', borderRadius: 'var(--radius-xl)' }}
      aria-labelledby="filter-dashboard-title"
    >
      {/* Header Accordion Trigger */}
      <motion.div 
        layout="position"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          cursor: 'pointer',
          userSelect: 'none',
          paddingBottom: isOpen ? '16px' : '0',
          borderBottom: isOpen ? '1px solid var(--glass-border-bottom)' : 'none'
        }}
        role="button"
        aria-expanded={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <SlidersHorizontal size={22} style={{ color: 'var(--glow-primary)' }} />
          </motion.div>
          <h2 id="filter-dashboard-title" style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>Advanced Algorithmic Filters</h2>
          <AnimatePresence>
            {activeFiltersCount > 0 && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  backgroundColor: 'rgba(100, 150, 255, 0.15)',
                  border: '1px solid rgba(100, 150, 255, 0.3)',
                  color: 'var(--glow-primary)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                Active: {activeFiltersCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {totalComments > 0 && (
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Pool: <strong style={{ color: 'var(--glow-primary)' }}>{filteredCount}</strong> / {totalComments}
            </span>
          )}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown size={20} color="var(--text-secondary)" />
          </motion.div>
        </div>
      </motion.div>

      {/* Filter Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="grid-cols-2" style={{ gap: '32px' }}>
                
                {/* Left Column: Duplicate Mode and Keyword Hurdle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Duplicate Entry Mode */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      Duplicate Control Mode
                    </label>
                    <div className="liquid-glass" style={{ width: '100%', display: 'flex', padding: '6px', borderRadius: 'var(--radius-full)', gap: '4px' }}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => handleFilterChange('duplicateMode', 'fair')}
                        style={{ 
                          flexGrow: 1, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '8px', 
                          padding: '10px', 
                          borderRadius: 'var(--radius-full)', 
                          border: 'none', 
                          background: filters.duplicateMode === 'fair' ? 'var(--glow-primary)' : 'transparent',
                          color: filters.duplicateMode === 'fair' ? '#fff' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-liquid)',
                          fontWeight: '500'
                        }}
                      >
                        <UserCheck size={16} />
                        Fair Mode
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => handleFilterChange('duplicateMode', 'boost')}
                        style={{ 
                          flexGrow: 1, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '8px', 
                          padding: '10px', 
                          borderRadius: 'var(--radius-full)', 
                          border: 'none', 
                          background: filters.duplicateMode === 'boost' ? 'var(--glow-primary)' : 'transparent',
                          color: filters.duplicateMode === 'boost' ? '#fff' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-liquid)',
                          fontWeight: '500'
                        }}
                      >
                        <RefreshCw size={14} />
                        Boost Mode
                      </motion.button>
                    </div>
                  </div>

                  {/* Subscribers Only */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      <UserCheck size={16} style={{ color: 'var(--glow-primary)' }} />
                      Subscribers Only
                    </label>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="liquid-glass" 
                      style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderRadius: 'var(--radius-md)' }}
                    >
                      <input
                        type="checkbox"
                        id="filter-subscribers"
                        checked={filters.subscribersOnly}
                        onChange={(e) => handleFilterChange('subscribersOnly', e.target.checked)}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--glow-primary)', cursor: 'pointer' }}
                      />
                      <label htmlFor="filter-subscribers" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', cursor: 'pointer', flexGrow: 1 }}>
                        Require public channel subscription
                      </label>
                    </motion.div>
                  </div>

                  {/* Keyword / Hashtag filter */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      <Hash size={16} style={{ color: 'var(--glow-primary)' }} />
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
                  </div>

                  {/* First Commenter Bonus */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      <Users size={16} style={{ color: 'var(--glow-primary)' }} />
                      First Commenter Bonus
                    </label>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="liquid-glass" 
                      style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderRadius: 'var(--radius-md)' }}
                    >
                      <input
                        type="checkbox"
                        id="filter-first-comment"
                        checked={filters.firstCommentBonus}
                        onChange={(e) => handleFilterChange('firstCommentBonus', e.target.checked)}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--glow-primary)', cursor: 'pointer' }}
                      />
                      <label htmlFor="filter-first-comment" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', cursor: 'pointer', flexGrow: 1 }}>
                        Grant +5 entries to the earliest commenter
                      </label>
                    </motion.div>
                  </div>
                </div>

                {/* Right Column: Tags, Likes, and Exclusions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  <div className="grid-cols-2" style={{ gap: '24px' }}>
                    {/* Min Tag Count */}
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        <Users size={16} style={{ color: 'var(--glow-primary)' }} />
                        Min @Tags
                      </label>
                      <div className="liquid-glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px', borderRadius: 'var(--radius-md)' }}>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => handleFilterChange('minTags', Math.max(0, filters.minTags - 1))}
                          style={{ padding: '10px 16px', fontSize: '1.2rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--glass-bg-hover)', color: 'var(--text-primary)', cursor: 'pointer' }}
                        >-</motion.button>
                        <span style={{ fontSize: '1.2rem', fontWeight: '600', width: '40px', textAlign: 'center', color: 'var(--text-primary)' }}>
                          {filters.minTags}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => handleFilterChange('minTags', Math.min(5, filters.minTags + 1))}
                          style={{ padding: '10px 16px', fontSize: '1.2rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--glass-bg-hover)', color: 'var(--text-primary)', cursor: 'pointer' }}
                        >+</motion.button>
                      </div>
                    </div>

                    {/* Min Likes Count */}
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        <ThumbsUp size={16} style={{ color: 'var(--glow-primary)' }} />
                        Min Likes
                      </label>
                      <input
                        type="number"
                        className="input-premium"
                        min="0"
                        value={filters.minLikes}
                        onChange={(e) => handleFilterChange('minLikes', Math.max(0, parseInt(e.target.value) || 0))}
                        id="filter-min-likes"
                      />
                    </div>
                  </div>

                  {/* Exclusion Lists */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      <ShieldAlert size={16} style={{ color: 'var(--glow-primary)' }} />
                      Exclusion & Spam Filter
                    </label>
                    <textarea
                      className="input-premium"
                      rows={5}
                      placeholder="Exclude words or usernames (comma or newline separated, e.g. spam, bot, @competitor)"
                      value={filters.excludeList}
                      onChange={(e) => handleFilterChange('excludeList', e.target.value)}
                      id="filter-exclude-list"
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                </div>

              </div>

              {/* Action Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--glass-border-bottom)', paddingTop: '24px', marginTop: '8px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleResetFilters}
                  className="liquid-glass"
                  style={{ padding: '12px 24px', fontSize: '0.9rem', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: '500' }}
                >
                  Reset All Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
