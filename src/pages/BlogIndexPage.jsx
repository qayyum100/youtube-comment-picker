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
      <main style={{ flexGrow: 1 }}>
        <div className="page-wrapper">
          
          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)', lineHeight: '1.2' }}>
              Creator Resources &amp; Guides
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '560px', margin: '0 auto 28px auto', lineHeight: '1.7' }}>
              Master the art of social media growth. Learn how to run viral giveaways, optimize your thumbnails, and build an engaged audience.
            </p>

            {/* Category Filter */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={activeCategory === cat ? 'btn btn-primary' : 'btn btn-ghost'}
                  style={{ fontSize: '13px', padding: '7px 16px' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filtered.map((blog) => (
              <Link 
                to={`/blog/${blog.slug}`} 
                key={blog.id}
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
              >
                <div 
                  className="card"
                  style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', padding: '0', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
                >
                  {/* Thumbnail */}
                  <div style={{ backgroundColor: 'var(--bg-secondary)', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', overflow: 'hidden' }}>
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} width="320" height="160" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <BookOpen size={40} style={{ opacity: 0.3 }} />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div style={{ padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {blog.readTime}
                      </span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <h2 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)', lineHeight: '1.35', margin: '0 0 8px 0' }}>
                        {blog.title}
                      </h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.55', margin: 0 }}>
                        {blog.excerpt}
                      </p>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
                      <span className="badge badge-primary" style={{ fontSize: '11px' }}>{blog.category}</span>
                      {blog.author && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                          <Users size={11} /> {blog.author}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <BookOpen size={48} style={{ opacity: 0.25, marginBottom: '16px' }} />
              <p>No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
