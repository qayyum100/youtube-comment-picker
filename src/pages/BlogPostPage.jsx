import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { blogs } from '../data/blogs';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

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
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} /> {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} /> {blog.readTime}
                </span>
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
                  <span style={{ fontSize: '1.2rem' }}>Featured Image Placeholder</span>
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
              article ul {
                margin-bottom: 24px;
                padding-left: 24px;
              }
              article li {
                margin-bottom: 8px;
              }
              article strong {
                color: var(--text-primary);
              }
            `}</style>
          </article>

        </div>
      </main>
    </>
  );
}
