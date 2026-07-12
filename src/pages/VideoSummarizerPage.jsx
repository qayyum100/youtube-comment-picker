import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Sparkles, BookOpen, Clock, AlertCircle } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function VideoSummarizerPage() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('bullet');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      // 1. Fetch transcript first
      const transResponse = await fetch(`/api/transcript?url=${encodeURIComponent(url)}`);
      const transResult = await transResponse.json();

      if (!transResponse.ok) throw new Error(transResult.error || 'Failed to fetch transcript');

      // 2. Fetch AI summary using transcript
      const aiResponse = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transResult.fullText, format })
      });
      const aiResult = await aiResponse.json();

      if (!aiResponse.ok) throw new Error(aiResult.error || 'Failed to generate AI summary');

      setSummary(aiResult.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO 
        title="AI YouTube Video Summarizer | Summarize YouTube Video instantly"
        description="Summarize any YouTube video instantly. Get key takeaways, study outlines, important timestamps, and action items using AI."
        url="/youtube-video-summarizer"
      />

      <section className="hero-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI YouTube Video Summarizer
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          Get instant key takeaways and detailed bullet outlines using AI.
        </p>
      </section>

      <section className="tool-area card liquid-glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <form onSubmit={handleSummarize} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative', minWidth: '280px' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Paste YouTube Video URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem' }}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select 
              value={format} 
              onChange={(e) => setFormat(e.target.value)}
              style={{ padding: '15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem', cursor: 'pointer' }}
            >
              <option value="bullet">Bullet Outline</option>
              <option value="paragraph">Paragraph Summary</option>
              <option value="notes">Student Notes Format</option>
            </select>
            <button type="submit" disabled={loading} style={{ padding: '15px 30px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} /> {loading ? 'Summarizing...' : 'Summarize'}
            </button>
          </div>
        </form>

        {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

        {summary && (
          <div style={{ marginTop: '45px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Quick Takeaway */}
            <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
              <h4 style={{ margin: 0, marginBottom: '10px', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '8px' }}><Sparkles size={18} /> Quick Takeaway</h4>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>{summary.shortSummary}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
              
              {/* Detailed Breakdown */}
              <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <h4 style={{ margin: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={18} /> Detailed Breakdown</h4>
                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {typeof summary.detailedSummary === 'string' ? (
                     <p style={{ margin: 0 }}>{summary.detailedSummary}</p>
                  ) : (
                     <ul style={{ paddingLeft: '20px', margin: 0 }}>
                       {summary.detailedSummary?.map((point, idx) => <li key={idx} style={{ marginBottom: '10px' }}>{point}</li>)}
                     </ul>
                  )}
                </div>
              </div>

              {/* Key Takeaways & Action Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ margin: 0, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={18} /> Key Takeaways</h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', margin: 0 }}>
                    {summary.keyPoints?.map((item, idx) => <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>)}
                  </ul>
                </div>
                
                {summary.actionItems && summary.actionItems.length > 0 && (
                  <div style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <h4 style={{ margin: 0, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}><AlertCircle size={18} /> Action Items</h4>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', margin: 0 }}>
                      {summary.actionItems.map((item, idx) => <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}
      </section>

      <FaqSection 
        faqsData={[
          {
            question: "How do I get a summary of a YouTube video without watching it?",
            answer: "You can get an instant AI-generated summary of any YouTube video using our free Video Summarizer tool. Paste the video URL, choose your preferred summary format (bullet points or paragraph), and our AI will extract and condense the key information from the transcript in seconds."
          },
          {
            question: "Does the YouTube video summarizer work on any video?",
            answer: "Our summarizer works on any YouTube video that has closed captions or auto-generated subtitles enabled. The vast majority of English-language YouTube videos have these enabled by default. Videos without any captions cannot be summarized."
          },
          {
            question: "Can I use a YouTube video summary for my blog?",
            answer: "Yes! This is one of the most popular use cases. After summarizing a YouTube video, you can use the AI-generated text as the foundation for a blog post or article, dramatically speeding up your content creation workflow."
          }
        ]}
        customTitle="YouTube Video Summarizer FAQs"
        customDescription="Find out how to get instant AI summaries of any YouTube video to save you time."
      />
    </div>
  );
}
