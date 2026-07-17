import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, UserCheck, RefreshCw, Hash, Users, ThumbsUp, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilterDashboard({ filters, setFilters, totalComments, filteredCount }) {
  const [isOpen, setIsOpen] = useState(true);

  const activeFiltersCount = [
    (filters?.keyword || '').trim() !== '',
    (filters?.minTags || 0) > 0,
    (filters?.minLikes || 0) > 0,
    (filters?.excludeList || '').trim() !== ''
  ].filter(Boolean).length;

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
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
    <section
      className="card"
      style={{ marginBottom: '24px' }}
      aria-labelledby="filter-dashboard-title"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          padding: 0,
          paddingBottom: isOpen ? '16px' : 0,
          borderBottom: isOpen ? '1px solid var(--border)' : 'none',
          textAlign: 'left',
        }}
        aria-expanded={isOpen}
        aria-controls="filter-body"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SlidersHorizontal size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span
            id="filter-dashboard-title"
            style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}
          >
            Advanced Filters
          </span>
          <AnimatePresence>
            {activeFiltersCount > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="badge badge-primary"
              >
                {activeFiltersCount} active
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {totalComments > 0 && (
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Pool: <strong style={{ color: 'var(--primary)', fontWeight: '700' }}>{filteredCount}</strong>
              <span style={{ color: 'var(--text-muted)' }}> / {totalComments}</span>
            </span>
          )}
          <ChevronDown
            size={16}
            style={{
              color: 'var(--text-muted)',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-out',
              flexShrink: 0,
            }}
          />
        </div>
      </button>

      {/* Filter Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="filter-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="grid-cols-2" style={{ gap: '24px' }}>

                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Duplicate Mode */}
                  <div>
                    <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <RefreshCw size={14} style={{ color: 'var(--primary)' }} />
                      Entry Mode
                    </label>
                    <div className="segmented-control" style={{ width: '100%', display: 'flex' }}>
                      <button
                        type="button"
                        onClick={() => handleFilterChange('duplicateMode', 'fair')}
                        className={`segmented-btn ${filters.duplicateMode === 'fair' ? 'active' : ''}`}
                        style={{ flex: 1 }}
                      >
                        <UserCheck size={14} />
                        Fair
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFilterChange('duplicateMode', 'boost')}
                        className={`segmented-btn ${filters.duplicateMode === 'boost' ? 'active' : ''}`}
                        style={{ flex: 1 }}
                      >
                        <RefreshCw size={14} />
                        Boost
                      </button>
                    </div>
                  </div>

                  {/* Subscribers Only */}
                  <div>
                    <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <UserCheck size={14} style={{ color: 'var(--primary)' }} />
                      Subscribers Only
                    </label>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 14px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        id="filter-subscribers"
                        checked={filters.subscribersOnly}
                        onChange={(e) => handleFilterChange('subscribersOnly', e.target.checked)}
                      />
                      <span style={{ fontSize: '14px', color: 'var(--text-primary)', userSelect: 'none' }}>
                        Require public channel subscription
                      </span>
                    </label>
                  </div>

                  {/* Keyword Hurdle */}
                  <div>
                    <label htmlFor="filter-keyword" className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Hash size={14} style={{ color: 'var(--primary)' }} />
                      Keyword Filter
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. #giveaway or specific word"
                      value={filters.keyword}
                      onChange={(e) => handleFilterChange('keyword', e.target.value)}
                      id="filter-keyword"
                    />
                  </div>

                  {/* First Commenter Bonus */}
                  <div>
                    <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={14} style={{ color: 'var(--primary)' }} />
                      First Commenter Bonus
                    </label>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 14px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        id="filter-first-comment"
                        checked={filters.firstCommentBonus}
                        onChange={(e) => handleFilterChange('firstCommentBonus', e.target.checked)}
                      />
                      <span style={{ fontSize: '14px', color: 'var(--text-primary)', userSelect: 'none' }}>
                        Grant +5 entries to the earliest commenter
                      </span>
                    </label>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  <div className="grid-cols-2" style={{ gap: '16px' }}>
                    {/* Min Tags */}
                    <div>
                      <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={14} style={{ color: 'var(--primary)' }} />
                        Min @Tags
                      </label>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                      }}>
                        <button
                          type="button"
                          onClick={() => handleFilterChange('minTags', Math.max(0, filters.minTags - 1))}
                          style={{
                            padding: '12px 16px',
                            fontSize: '18px',
                            fontWeight: '600',
                            background: 'var(--bg-secondary)',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            lineHeight: 1,
                            transition: 'background 0.15s',
                          }}
                          aria-label="Decrease min tags"
                        >−</button>
                        <span style={{
                          flex: 1,
                          textAlign: 'center',
                          fontSize: '16px',
                          fontWeight: '700',
                          color: 'var(--text-primary)',
                        }}>
                          {filters.minTags}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleFilterChange('minTags', Math.min(5, filters.minTags + 1))}
                          style={{
                            padding: '12px 16px',
                            fontSize: '18px',
                            fontWeight: '600',
                            background: 'var(--bg-secondary)',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            lineHeight: 1,
                            transition: 'background 0.15s',
                          }}
                          aria-label="Increase min tags"
                        >+</button>
                      </div>
                    </div>

                    {/* Min Likes */}
                    <div>
                      <label htmlFor="filter-min-likes" className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ThumbsUp size={14} style={{ color: 'var(--primary)' }} />
                        Min Likes
                      </label>
                      <input
                        type="number"
                        className="input-field"
                        min="0"
                        value={filters.minLikes}
                        onChange={(e) => handleFilterChange('minLikes', Math.max(0, parseInt(e.target.value) || 0))}
                        id="filter-min-likes"
                      />
                    </div>
                  </div>

                  {/* Exclusion List */}
                  <div style={{ flex: 1 }}>
                    <label htmlFor="filter-exclude-list" className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldAlert size={14} style={{ color: 'var(--primary)' }} />
                      Exclusion & Spam Filter
                    </label>
                    <textarea
                      className="input-textarea"
                      rows={5}
                      placeholder="Exclude words or usernames (comma or newline separated, e.g. spam, bot, @competitor)"
                      value={filters.excludeList}
                      onChange={(e) => handleFilterChange('excludeList', e.target.value)}
                      id="filter-exclude-list"
                      style={{ minHeight: '120px', height: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                borderTop: '1px solid var(--border)',
                paddingTop: '16px',
              }}>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="btn btn-ghost btn-sm"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
