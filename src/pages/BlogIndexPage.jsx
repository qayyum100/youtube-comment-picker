import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { blogs } from '../data/blogs';
import { BookOpen, Calendar, Clock } from 'lucide-react';

export default function BlogIndexPage() {
  return (
    <>
      <SeoHead pageType="blog" />

      <main style={{ flexGrow: 1, padding: '40px 0' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }} className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', lineHeight: '1.2' }}>
              Creator <span style={{ color: 'var(--brand-indigo)' }}>Resources & Guides</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              Master the art of social media growth. Learn how to run viral giveaways, optimize your thumbnails, and build an engaged audience.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '24px' 
          }} className="animate-fade-in">
            {blogs.map((blog) => (
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
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
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
                  
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} /> {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {blog.readTime}
                    </span>
                  </div>

                  <div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                      {blog.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      {blog.excerpt}
                    </p>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      backgroundColor: 'var(--brand-indigo)', 
                      color: 'white', 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {blog.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
