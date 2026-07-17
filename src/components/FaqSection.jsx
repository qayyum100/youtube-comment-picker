import React, { useState } from 'react';
import { faqs as defaultFaqs } from '../data/faqs';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection({ faqsData, customTitle, customDescription }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const faqsToUse = faqsData || defaultFaqs;
  const categories = ['All', ...new Set(faqsToUse.map(f => f.category).filter(Boolean))];
  const hasCategories = categories.length > 1;

  const filteredFaqs = activeCategory === 'All'
    ? faqsToUse
    : faqsToUse.filter(f => f.category === activeCategory);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ marginTop: '64px', marginBottom: '64px' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="section-heading" style={{ marginBottom: '12px' }}>
          {customTitle || 'Frequently Asked Questions'}
        </h2>
        <p className="section-subheading" style={{ maxWidth: '600px', margin: '0 auto' }}>
          {customDescription || 'Everything you need to know about our comment picker for youtube, youtube giveaway picker, and youtube random comment picker tools. We also explain how youtube random comment picker works to help you run fair and secure drawings.'}
        </p>
      </div>

      {/* Category tabs */}
      {hasCategories && (
        <div className="filter-tabs" style={{ justifyContent: 'center', marginBottom: '24px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Accordion */}
      <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`accordion-item ${isOpen ? 'open' : ''}`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, paddingRight: '12px' }}>
                  <HelpCircle size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    color: 'var(--text-muted)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease-out',
                    flexShrink: 0,
                  }}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className="accordion-body"
                style={{
                  maxHeight: isOpen ? '400px' : '0',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="accordion-content">
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
