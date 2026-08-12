import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { webStories } from '../data/stories';
import { Sparkles, PlusCircle, Layers, Calendar, User, ArrowRight, Share2 } from 'lucide-react';

export default function WebStoriesIndexPage() {
  const [storiesList, setStoriesList] = useState(webStories);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State for User Created Story
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Growth & SEO');
  const [newCoverImage, setNewCoverImage] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newStep1, setNewStep1] = useState('');
  const [newStep2, setNewStep2] = useState('');

  const handleCreateStory = (e) => {
    e.preventDefault();
    if (!newTitle || !newSummary) return;

    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newStory = {
      id: slug,
      slug: slug,
      title: newTitle,
      subtitle: newSummary.slice(0, 50) + '...',
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      author: 'YouTube Creator Suite',
      category: newCategory,
      coverImage: newCoverImage || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
      summary: newSummary,
      pages: [
        {
          id: 1,
          title: 'Introduction & Key Concept',
          heading: 'Overview',
          image: newCoverImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
          text: newStep1 || newSummary,
          ctaText: 'Try YouTube Tools',
          ctaLink: '/youtube-comment-picker'
        },
        {
          id: 2,
          title: 'Actionable Steps & Results',
          heading: 'Implementation',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
          text: newStep2 || 'Apply these proven creator practices to expand your reach on Google Discover and YouTube feeds.',
          ctaText: 'Explore Creator Suite',
          ctaLink: '/'
        }
      ]
    };

    setStoriesList([newStory, ...storiesList]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewSummary('');
    setNewCoverImage('');
    setNewStep1('');
    setNewStep2('');
  };

  // Structured Data Collection for Index Page
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Visual Web Stories for YouTube Creators",
    "itemListElement": storiesList.map((story, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.youtubecommentpickerthumbnaildownload.online/web-stories/${story.slug}`,
      "name": story.title
    }))
  };

  return (
    <div className="page-wrapper">
      <SEO
        title="Visual Web Stories — Google Discover Feed & Creator Guides"
        description="Explore bite-sized visual web stories designed for Google Discover and feeds. Quick tips on YouTube growth, Comment Pickers, Shorts retention, and YouTube SEO."
        url="/web-stories"
        schema={listSchema}
      />

      <div className="container" style={{ paddingBottom: '60px' }}>
        {/* Header Hero Banner */}
        <div style={{ textAlign: 'center', margin: '20px 0 40px 0' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: 'var(--radius-full)',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '14px'
          }}>
            <Sparkles size={16} /> Google Discover & Feed Visual Stories
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)' }}>
            Visual Web Stories Feed
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '640px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            Bite-sized, tappable visual stories optimized for Google Discover, mobile feeds, and fast reading. Master YouTube giveaways, Shorts retention, and search ranking.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ padding: '12px 24px', fontSize: '15px', fontWeight: '700', gap: '8px', boxShadow: 'var(--shadow-md)' }}
          >
            <PlusCircle size={18} /> Post a New Web Story
          </button>
        </div>

        {/* Web Stories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {storiesList.map((story) => (
            <div key={story.id} className="card" style={{
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '1px solid var(--border)'
            }}>
              {/* Cover Card Image Frame */}
              <div style={{
                position: 'relative',
                height: '340px',
                backgroundImage: `url(${story.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)'
                }} />

                <span style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  {story.category}
                </span>

                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', color: '#fff' }}>
                  <span style={{ fontSize: '11px', opacity: 0.8, display: 'block', marginBottom: '4px' }}>
                    {story.pages.length} Slides • {story.publishedAt}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', lineHeight: 1.3, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    {story.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'space-between' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {story.summary}
                </p>

                <Link
                  to={`/web-stories/${story.slug}`}
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '14px',
                    fontWeight: '700'
                  }}
                >
                  View Web Story <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Create Web Story Modal */}
        {showCreateModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div className="card card-lg" style={{ width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  ✨ Post a Google Discover Web Story
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateStory} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    Story Title
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. 5 Secrets to Double Your YouTube Engagement"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    Category
                  </label>
                  <select
                    className="input-field"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option value="Giveaways & Growth">Giveaways & Growth</option>
                    <option value="Shorts & Reels">Shorts & Reels</option>
                    <option value="YouTube SEO">YouTube SEO</option>
                    <option value="Creator Monetization">Creator Monetization</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    Cover Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="https://images.unsplash.com/..."
                    value={newCoverImage}
                    onChange={(e) => setNewCoverImage(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    Story Summary / Excerpt
                  </label>
                  <textarea
                    className="input-field"
                    rows={2}
                    placeholder="Brief description for Google Discover preview..."
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    Slide 1 Content
                  </label>
                  <textarea
                    className="input-field"
                    rows={2}
                    placeholder="First slide message..."
                    value={newStep1}
                    onChange={(e) => setNewStep1(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    Slide 2 Content
                  </label>
                  <textarea
                    className="input-field"
                    rows={2}
                    placeholder="Second slide takeaway..."
                    value={newStep2}
                    onChange={(e) => setNewStep2(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Publish Web Story
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
