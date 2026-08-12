import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { webStories } from '../data/stories';
import { ChevronLeft, ChevronRight, Share2, Sparkles, Eye, Clock, User, ArrowLeft, Play, Pause } from 'lucide-react';

export default function WebStoryViewerPage() {
  const { slug } = useParams();
  const storyIndex = webStories.findIndex(s => s.slug === slug);
  const story = storyIndex !== -1 ? webStories[storyIndex] : webStories[0];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const currentPage = story.pages[currentPageIndex] || story.pages[0];
  const totalPages = story.pages.length;

  // Auto slide timer (5 seconds per slide)
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentPageIndex < totalPages - 1) {
              setCurrentPageIndex(c => c + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + 2; // updates every 100ms -> 5000ms total
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentPageIndex, totalPages]);

  // Reset progress when page index changes
  useEffect(() => {
    setProgress(0);
  }, [currentPageIndex]);

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.summary,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Story link copied to clipboard!');
    }
  };

  // Structured Data (JSON-LD) for Google Web Story discovery & Google Search indexing
  const storySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": story.title,
    "description": story.summary,
    "image": [story.coverImage, currentPage.image],
    "datePublished": story.publishedAt,
    "dateModified": story.updatedAt,
    "author": {
      "@type": "Organization",
      "name": story.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "YouTube Comment Picker",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.youtubecommentpickerthumbnaildownload.online/images/app_logo_128.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.youtubecommentpickerthumbnaildownload.online/web-stories/${story.slug}`
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 10px' }}>
      <SEO
        title={`${story.title} — Web Story`}
        description={story.summary}
        url={`/web-stories/${story.slug}`}
        image={story.coverImage}
        type="article"
        schema={storySchema}
      />

      {/* Back Navigation & Header controls */}
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Link to="/web-stories" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} /> All Stories
        </Link>
        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
          {story.category}
        </span>
      </div>

      {/* Modern Phone Container / Story Slide Frame */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        height: '740px',
        maxHeight: '85vh',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xl)',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '3px solid var(--border-strong)'
      }}>
        {/* Background Image Layer */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${currentPage.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.4s ease-in-out',
          zIndex: 1
        }}>
          {/* Gradient Overlay for Text Legibility */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.92) 100%)'
          }} />
        </div>

        {/* Top Progress Bars & Header Controls */}
        <div style={{ position: 'relative', zIndex: 10, padding: '16px 16px 0 16px' }}>
          {/* Progress Indicators */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
            {story.pages.map((_, idx) => (
              <div key={idx} style={{ flex: 1, height: '3px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  width: idx < currentPageIndex ? '100%' : idx === currentPageIndex ? `${progress}%` : '0%',
                  transition: idx === currentPageIndex ? 'width 0.1s linear' : 'none'
                }} />
              </div>
            ))}
          </div>

          {/* Story Author & Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/images/app_logo_56.webp" alt="Logo" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: '700', display: 'block', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  {story.author}
                </span>
                <span style={{ fontSize: '10px', opacity: 0.8 }}>
                  Slide {currentPageIndex + 1} of {totalPages}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                type="button"
                onClick={handleShare}
                style={{ background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tap Target Zones for Navigation */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '30%',
          zIndex: 5,
          cursor: currentPageIndex > 0 ? 'pointer' : 'default'
        }} onClick={handlePrev} />

        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '70%',
          zIndex: 5,
          cursor: currentPageIndex < totalPages - 1 ? 'pointer' : 'default'
        }} onClick={handleNext} />

        {/* Bottom Content Card */}
        <div style={{ position: 'relative', zIndex: 10, padding: '24px 20px 32px 20px', color: '#fff' }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '12px',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            fontSize: '11px',
            fontWeight: '700',
            marginBottom: '10px'
          }}>
            {currentPage.heading}
          </span>

          <h2 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.25', marginBottom: '10px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {currentPage.title}
          </h2>

          <p style={{ fontSize: '14px', lineHeight: '1.5', opacity: 0.95, marginBottom: '20px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
            {currentPage.text}
          </p>

          {/* CTA Link Button */}
          {currentPage.ctaLink && (
            <Link
              to={currentPage.ctaLink}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '12px 20px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                fontWeight: '700',
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                transition: 'transform 0.15s ease'
              }}
            >
              <Sparkles size={16} color="var(--primary)" />
              {currentPage.ctaText || 'Learn More'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
