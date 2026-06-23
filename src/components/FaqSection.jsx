import React, { useState } from 'react';
import { faqs } from '../data/faqs';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(faqs.map(f => f.category))];

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ marginTop: '60px', marginBottom: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }} className="animate-fade-in">
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Everything you need to know about our YouTube Random Comment Picker and Giveaway tools. We've compiled the most common questions to help you run fair and secure drawings.
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }} className="animate-fade-in">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: activeCategory === cat ? '1px solid var(--brand-indigo)' : '1px solid var(--border-dark)',
              background: activeCategory === cat ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-panel)',
              color: activeCategory === cat ? 'var(--brand-indigo)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              fontSize: '0.9rem'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              style={{
                background: 'var(--bg-panel)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: isOpen ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                animationDelay: `${index * 0.05}s`
              }}
              className="animate-fade-in"
            >
              <button
                onClick={() => toggleAccordion(index)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 24px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, paddingRight: '16px' }}>
                  <MessageCircleQuestion size={20} style={{ color: 'var(--brand-indigo)', flexShrink: 0 }} />
                  {faq.question}
                </span>
                <ChevronDown 
                  size={20} 
                  style={{ 
                    color: 'var(--text-muted)', 
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0
                  }} 
                />
              </button>
              
              <div 
                style={{
                  maxHeight: isOpen ? '400px' : '0',
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div style={{
                  padding: '0 24px 24px 56px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
