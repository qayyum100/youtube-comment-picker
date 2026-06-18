import React, { useState } from 'react';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <details 
      style={{
        background: 'var(--bg-panel)',
        borderRadius: '16px',
        padding: '16px 24px',
        border: '1px solid var(--border-dark)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        width: '100%',
        marginBottom: '16px'
      }}
      open={isOpen}
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
      }}
    >
      <summary style={{
        fontSize: '1.2rem',
        fontWeight: '700',
        cursor: 'pointer',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>{question}</div>
        <span style={{ fontSize: '1.5rem', fontWeight: '300', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>+</span>
      </summary>
      {isOpen && (
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '16px', fontSize: '1.05rem' }}>
          {answer}
        </div>
      )}
    </details>
  );
}

export default function CompetitorContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '48px', paddingBottom: '48px' }}>
      
      {/* Content Sections */}
      <section className="grid-cols-2" style={{ alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Random Comment Picker for Youtube</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Our YouTube Random Comment Picker offers a simple and efficient method to select a random winner from all comments (first 500) on your YouTube video. Perfect for determining winners in YouTube giveaways, promotions, sweepstakes, or contests.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            All you need to do is input your YouTube video link, choose filters and settings, retrieve comments, and begin the raffle to select a random winner. The best part is, the YouTube Random Comment Picker is available for you to use at no cost! It works with both standard YouTube videos and YouTube Shorts, so you can use it for giveaways on any type of video content.
          </p>
        </div>
      </section>

      <section className="grid-cols-2" style={{ alignItems: 'center', direction: 'rtl' }}>
        <div style={{ direction: 'ltr' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>How do I select a winner for a YouTube giveaway contest?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Selecting a winner for a YouTube giveaway contest is easy with our YouTube Random Comment Picker. Simply follow these steps:</p>
          <ul style={{ color: 'var(--text-secondary)', paddingLeft: '24px', lineHeight: 1.8 }}>
            <li>Find the URL of your YouTube video</li>
            <li>Enter the URL of your YouTube video into the YouTube Random Comment Picker search bar</li>
            <li>Select filters and settings for your YouTube giveaway contest</li>
            <li>Retrieve comments from your YouTube video</li>
            <li>Start the raffle to select a random winner</li>
          </ul>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '32px' }}>Features</h2>
        <div className="grid-cols-2" style={{ gap: '24px' }}>
          <div className="card-premium">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Unique Authors</h3>
            <p style={{ color: 'var(--text-secondary)' }}>The Unique Authors filter (no duplicate users) allows you to select a random winner from all unique authors who commented on your YouTube video. This is perfect for giveaways, promotions, sweepstakes, and contests where you want to ensure that each participant only has one entry.</p>
          </div>
          <div className="card-premium">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Include Replies</h3>
            <p style={{ color: 'var(--text-secondary)' }}>The Include Replies filter allows you to select a random winner from all comments and replies on your YouTube video.</p>
          </div>
          <div className="card-premium">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Number of Winners</h3>
            <p style={{ color: 'var(--text-secondary)' }}>The Number of Winners filter allows you to select multiple winners from all comments on your YouTube video. Instead of running a single draw, you can run multiple draws to select multiple winners. Select up to 50!</p>
          </div>
          <div className="card-premium">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Text Search</h3>
            <p style={{ color: 'var(--text-secondary)' }}>The Text Search filter allows you to select a random winner from all comments on your YouTube video that contain a specific word or phrase. You can even use hash tags, links, and emojis! 🔥</p>
          </div>
        </div>
      </section>

      {/* More Content Sections */}
      <section className="grid-cols-2" style={{ alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Benefits of Using a YouTube Comment Picker</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Utilizing a YouTube Comment Picker has many benefits for content creators and businesses. It streamlines the process of conducting fair and impartial giveaways or contests, enhances audience engagement, and incentivizes viewers to participate in the community. By automating winner selection, you not only save time but also provide transparency to your audience, which can lead to increased trust and channel growth.
          </p>
        </div>
      </section>

      <section className="grid-cols-2" style={{ alignItems: 'center', direction: 'rtl' }}>
        <div style={{ direction: 'ltr' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Tips for Conducting Effective YouTube Giveaways</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>A successful YouTube giveaway can significantly boost your channel's interaction rates. Here are some tips for conducting effective YouTube giveaways:</p>
          <ul style={{ color: 'var(--text-secondary)', paddingLeft: '24px', lineHeight: 1.8, marginBottom: '16px' }}>
            <li>Start by defining clear rules and a compelling prize</li>
            <li>Promote your giveaway across multiple platforms to maximize reach</li>
            <li>Ensure a fair selection process by using our reliable YouTube Random Comment Picker</li>
            <li>Engage with your audience during the giveaway to maintain excitement</li>
            <li>Consider a follow-up video announcing winners to bolster community trust and connections</li>
          </ul>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            It might even help to tell your audience to use specific words or emojis in their comments. This will help you filter comments and select winners based on specific criteria.
          </p>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>How to prevent cheating in YouTube giveaways</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Cheating in YouTube giveaways is a common concern for content creators and businesses. Cheating on YouTube giveaways can take many forms, including:</p>
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '24px', lineHeight: 1.8, marginBottom: '16px' }}>
          <li>Using multiple accounts to submit multiple entries in the giveaway</li>
          <li>Using bots to submit multiple entries in the giveaway or spam comments</li>
          <li>Asking friends or family members to submit multiple entries in the giveaway</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)' }}>
          If you are concerned about cheating, you can use the Unique Authors filter to select a random winner from all unique authors who commented on your YouTube video. This will ensure that each participant only has one entry in the giveaway.
        </p>
      </section>

      {/* FAQ Section */}
      <section style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '32px' }}>Frequently Asked Questions</h2>
        <FAQItem 
          question="What is YouTube Comment Picker?" 
          answer="YouTube Comment Picker is a web app that helps you scale engagement with your YouTube audience. It's the ultimate YouTube comment management tool for giveaways." 
        />
        <FAQItem 
          question="How does it work?" 
          answer="YouTube Comment Picker connects to your YouTube channel via the official API. You set up rules that match specific text or use filters, and we randomly select a winner based on your criteria securely." 
        />
        <FAQItem 
          question="How is YouTube Comment Picker different from YouTube Studio's built-in tools?" 
          answer="YouTube Studio lets you moderate comments manually — one at a time. YouTube Comment Picker adds automation on top: keyword rules, filtering, and true cryptographic randomness to select winners fairly." 
        />
        <FAQItem 
          question="Is it safe?" 
          answer="Absolutely. We use official YouTube APIs and OAuth 2.0 for secure authentication. We don't store your password, and all drawing algorithms run fairly and securely in your browser." 
        />
      </section>

    </div>
  );
}
