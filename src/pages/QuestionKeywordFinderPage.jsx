import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import { HelpCircle, Search } from 'lucide-react';

export default function QuestionKeywordFinderPage() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleFind = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setQuestions([
      `How to start with ${topic}?`,
      `Why is ${topic} so popular?`,
      `What is the best ${topic} in 2026?`,
      `Can you make money with ${topic}?`,
      `Where to learn ${topic} for free?`
    ]);
  };

  return (
    <>
      <SeoHead pageType="tool" title="Question Keyword Finder — Uncover Viewer Questions" />
      <main style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              Question Keyword Finder
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Extract question-based queries (How, Why, What, Can) that viewers search to get featured answers.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleFind} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Enter topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)' }}
              />
              <button type="submit" className="btn btn-primary">Find Questions</button>
            </form>

            {questions.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {questions.map((q, idx) => (
                  <div key={idx} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    ❓ {q}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FaqSection customFaqs={toolFaqs.questionKeywordFinder || []} title="Frequently Asked Questions — Question Keywords" />
        </div>
      </main>
    </>
  );
}
