import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Search, Sparkles, BookOpen, Clock, AlertCircle } from 'lucide-react';
import FaqSection from '../components/FaqSection';

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
    <div className="page-wrapper">
      <SEO 
        title="AI YouTube Video Summarizer | Summarize YouTube Video instantly"
        description="Summarize any YouTube video instantly. Get key takeaways, study outlines, important timestamps, and action items using AI."
        url="/youtube-video-summarizer"
      />

      <div className="page-hero">
        <h1>AI YouTube Video Summarizer</h1>
        <p>Get instant key takeaways and detailed bullet outlines using AI.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        <form onSubmit={handleSummarize} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              className="input-field"
              placeholder="Paste YouTube Video URL here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
            <select 
              value={format} 
              onChange={(e) => setFormat(e.target.value)}
              className="select-field"
              style={{ width: '180px' }}
            >
              <option value="bullet">Bullet Outline</option>
              <option value="paragraph">Paragraph Summary</option>
              <option value="notes">Student Notes Format</option>
            </select>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <span className="btn-spinner" role="status" aria-label="Loading" />
              ) : (
                <>
                  <Sparkles size={16} /> Summarize
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            {error}
          </div>
        )}

        {summary && (
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Quick Takeaway */}
            <div className="card" style={{ padding: '24px', borderColor: 'rgba(99, 102, 241, 0.2)', background: 'rgba(99, 102, 241, 0.05)' }}>
              <h4 style={{ margin: 0, marginBottom: '8px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700' }}>
                <Sparkles size={16} /> Quick Takeaway
              </h4>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '15px', lineHeight: '1.6' }}>{summary.shortSummary}</p>
            </div>

            <div className="grid-cols-2" style={{ gap: '24px' }}>
              
              {/* Detailed Breakdown */}
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ margin: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  <BookOpen size={16} style={{ color: 'var(--primary)' }} /> Detailed Breakdown
                </h4>
                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '13px' }}>
                  {typeof summary.detailedSummary === 'string' ? (
                     <p style={{ margin: 0 }}>{summary.detailedSummary}</p>
                  ) : (
                     <ul style={{ paddingLeft: '20px', margin: 0 }}>
                       {summary.detailedSummary?.map((point, idx) => <li key={idx} style={{ marginBottom: '8px' }}>{point}</li>)}
                     </ul>
                  )}
                </div>
              </div>

              {/* Key Takeaways & Action Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="card" style={{ padding: '24px' }}>
                  <h4 style={{ margin: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    <Clock size={16} style={{ color: 'var(--primary)' }} /> Key Takeaways
                  </h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', margin: 0, fontSize: '13px', lineHeight: '1.6' }}>
                    {summary.keyPoints?.map((item, idx) => <li key={idx} style={{ marginBottom: '6px' }}>{item}</li>)}
                  </ul>
                </div>
                
                {summary.actionItems && summary.actionItems.length > 0 && (
                  <div className="card" style={{ padding: '24px' }}>
                    <h4 style={{ margin: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--success)' }}>
                      <AlertCircle size={16} /> Action Items
                    </h4>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', margin: 0, fontSize: '13px', lineHeight: '1.6' }}>
                      {summary.actionItems.map((item, idx) => <li key={idx} style={{ marginBottom: '6px' }}>{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}
      </div>

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
