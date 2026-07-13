import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { blogs } from '../data/blogs';
import { BookOpen, Calendar, Clock, Users } from 'lucide-react';

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];
  const filtered = activeCategory === 'All' ? blogs : blogs.filter(b => b.category === activeCategory);

  return (
    <>
      <SeoHead pageType="blog" />

      <main style={{ flexGrow: 1, padding: '40px 0' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }} className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', lineHeight: '1.2' }}>
              Creator <span style={{ color: 'var(--brand-indigo)' }}>Resources &amp; Guides</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 28px auto' }}>
              Master the art of social media growth. Learn how to run viral giveaways, optimize your thumbnails, and build an engaged audience.
            </p>

            {/* Category Filter */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    border: activeCategory === cat ? '1.5px solid var(--brand-indigo)' : '1.5px solid var(--border-dark)',
                    background: activeCategory === cat ? 'rgba(99,102,241,0.12)' : 'var(--bg-panel)',
                    color: activeCategory === cat ? 'var(--brand-indigo)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '24px' 
          }} className="animate-fade-in">
            {filtered.map((blog) => (
              <Link 
                to={`/blog/${blog.slug}`} 
                key={blog.id}
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
              >
                <div className="card-premium" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px', 
                  width: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
                }}
                >
                  <div style={{ 
                    backgroundColor: 'var(--bg-dark)', 
                    height: '160px', 
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-indigo)',
                    overflow: 'hidden'
                  }}>
                    {blog.image ? (
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        width="320" 
                        height="160" 
                        loading="lazy" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <BookOpen size={48} opacity={0.5} />
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '14px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {blog.readTime}
                    </span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)', lineHeight: '1.35', marginTop: 0 }}>
                      {blog.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.55', margin: 0 }}>
                      {blog.excerpt}
                    </p>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-dark)' }}>
                    <span style={{ 
                      backgroundColor: 'rgba(99,102,241,0.12)', 
                      color: 'var(--brand-indigo)', 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '0.72rem',
                      fontWeight: '600'
                    }}>
                      {blog.category}
                    </span>
                    {blog.author && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Users size={12} />
                        {blog.author}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <BookOpen size={48} opacity={0.3} style={{ marginBottom: '16px' }} />
              <p>No articles found in this category yet.</p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
