import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { blogs } from '../data/blogs';
import { ArrowLeft, Calendar, Clock, Users, Tag } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return <Navigate to="/blogs" />;
  }

  // Related posts: same category, exclude current
  const related = blogs
    .filter(b => b.category === blog.category && b.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <SeoHead pageType="blog-post" blogData={blog} />

      <main style={{ flexGrow: 1, padding: '40px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <Link to="/blogs" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'var(--brand-indigo)',
            textDecoration: 'none',
            fontWeight: '600',
            marginBottom: '32px'
          }}>
            <ArrowLeft size={18} />
            Back to all resources
          </Link>

          <article className="animate-fade-in">
            <header style={{ marginBottom: '40px' }}>

              {/* Category Badge */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(99,102,241,0.12)',
                  color: 'var(--brand-indigo)',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  <Tag size={13} />
                  {blog.category}
                </span>
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} /> {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} /> {blog.readTime}
                </span>
                {blog.lastUpdated && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Updated: {new Date(blog.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </div>
              
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.2', marginBottom: '24px' }}>
                {blog.title}
              </h1>

              <div style={{ 
                height: '300px', 
                backgroundColor: 'var(--bg-dark)', 
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-dark)',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                overflow: 'hidden'
              }}>
                {blog.image ? (
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    width="800" 
                    height="300" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <span style={{ fontSize: '1.2rem' }}>{blog.title}</span>
                )}
              </div>
            </header>

            <div 
              style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-secondary)' }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            
            <style>{`
              article h2 {
                color: var(--text-primary);
                font-size: 1.8rem;
                margin-top: 40px;
                margin-bottom: 16px;
                font-weight: 700;
              }
              article h3 {
                color: var(--text-primary);
                font-size: 1.4rem;
                margin-top: 32px;
                margin-bottom: 12px;
                font-weight: 600;
              }
              article h4 {
                color: var(--text-primary);
                font-size: 1.2rem;
                margin-top: 24px;
                margin-bottom: 8px;
                font-weight: 600;
              }
              article p {
                margin-bottom: 20px;
              }
              article ul, article ol {
                margin-bottom: 24px;
                padding-left: 24px;
              }
              article li {
                margin-bottom: 8px;
              }
              article strong {
                color: var(--text-primary);
              }
              article code {
                background: var(--bg-surface);
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 0.9em;
                font-family: monospace;
              }
            `}</style>
          </article>

          {/* Author Bio */}
          {blog.author && (
            <div style={{ 
              marginTop: '56px',
              padding: '28px 32px',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-dark)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px'
            }}>
              <div style={{ 
                width: '56px', height: '56px', borderRadius: '50%', 
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <Users size={24} color="white" />
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Written by
                </p>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {blog.author}
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {blog.authorBio || 'The YouTube Creator Tools editorial team publishes guides, tutorials, and tips to help content creators grow their channels effectively.'}
                </p>
              </div>
            </div>
          )}

          {/* Related Posts */}
          {related.length > 0 && (
            <section style={{ marginTop: '56px', borderTop: '1px solid var(--border-dark)', paddingTop: '40px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '24px' }}>
                Related Articles
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {related.map(post => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      style={{
                        background: 'var(--bg-panel)',
                        border: '1px solid var(--border-dark)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        transition: 'transform 0.15s, box-shadow 0.15s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      {post.image && (
                        <div style={{ height: '100px', overflow: 'hidden', background: 'var(--bg-dark)' }}>
                          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                        </div>
                      )}
                      <div style={{ padding: '16px' }}>
                        <p style={{ margin: '0 0 6px 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.readTime}</p>
                        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to Blog */}
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <Link
              to="/blogs"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--border-dark)', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '600', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-panel)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <ArrowLeft size={16} />
              Browse All Guides
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
