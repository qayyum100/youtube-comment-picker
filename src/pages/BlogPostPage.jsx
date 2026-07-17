import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { blogs } from '../data/blogs';
import { ArrowLeft, Calendar, Clock, Users, Tag } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return <Navigate to="/blogs" />;
  }

  const related = blogs
    .filter(b => b.category === blog.category && b.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <SeoHead pageType="blog-post" blogData={blog} />

      <main style={{ flexGrow: 1, padding: '40px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          
          <Link to="/blogs" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '6px', 
            color: 'var(--primary)', textDecoration: 'none',
            fontWeight: '600', marginBottom: '32px', fontSize: '14px'
          }}>
            <ArrowLeft size={16} /> Back to all resources
          </Link>

          <article>
            <header style={{ marginBottom: '40px' }}>
              {/* Category Badge */}
              <div style={{ marginBottom: '14px' }}>
                <span className="badge badge-primary" style={{ fontSize: '12px' }}>
                  <Tag size={11} style={{ marginRight: '4px' }} />
                  {blog.category}
                </span>
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={14} /> {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={14} /> {blog.readTime}
                </span>
                {blog.lastUpdated && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Updated: {new Date(blog.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </div>
              
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.25', marginBottom: '28px' }}>
                {blog.title}
              </h1>

              {/* Hero Image */}
              <div style={{ 
                height: '280px', backgroundColor: 'var(--bg-secondary)', 
                borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
                marginBottom: '40px', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', color: 'var(--text-muted)', overflow: 'hidden'
              }}>
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} width="800" height="280" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{blog.title}</span>
                )}
              </div>
            </header>

            <div 
              style={{ lineHeight: '1.85', fontSize: '16px', color: 'var(--text-secondary)' }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            
            <style>{`
              article h2 { color: var(--text-primary); font-size: 1.6rem; margin-top: 40px; margin-bottom: 14px; font-weight: 700; }
              article h3 { color: var(--text-primary); font-size: 1.25rem; margin-top: 28px; margin-bottom: 10px; font-weight: 600; }
              article h4 { color: var(--text-primary); font-size: 1.1rem; margin-top: 22px; margin-bottom: 8px; font-weight: 600; }
              article p { margin-bottom: 18px; }
              article ul, article ol { margin-bottom: 22px; padding-left: 24px; }
              article li { margin-bottom: 8px; }
              article strong { color: var(--text-primary); }
              article code { background: var(--bg-secondary); padding: 2px 6px; border-radius: 4px; font-size: 0.88em; font-family: monospace; color: var(--primary); border: 1px solid var(--border); }
              article a { color: var(--primary); text-decoration: none; }
              article a:hover { text-decoration: underline; }
            `}</style>
          </article>

          {/* Author Bio */}
          {blog.author && (
            <div className="card" style={{ marginTop: '48px', padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Users size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <p style={{ margin: '0 0 3px 0', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Written by</p>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{blog.author}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
                  {blog.authorBio || 'The YouTube Creator Tools editorial team publishes guides, tutorials, and tips to help content creators grow their channels effectively.'}
                </p>
              </div>
            </div>
          )}

          {/* Related Posts */}
          {related.length > 0 && (
            <section style={{ marginTop: '48px', borderTop: '1px solid var(--border)', paddingTop: '36px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px' }}>
                Related Articles
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {related.map(post => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      className="card"
                      style={{ overflow: 'hidden', padding: 0, transition: 'transform 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      {post.image && (
                        <div style={{ height: '90px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                        </div>
                      )}
                      <div style={{ padding: '14px' }}>
                        <p style={{ margin: '0 0 5px 0', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>{post.readTime}</p>
                        <h3 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.4' }}>
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
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link to="/blogs" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              <ArrowLeft size={15} /> Browse All Guides
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
