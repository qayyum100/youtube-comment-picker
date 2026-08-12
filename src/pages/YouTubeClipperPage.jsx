import React, { useState, useRef } from 'react';
import SEO from '../components/SEO';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';
import YouTubeUrlInput from '../components/youtube-clipper/YouTubeUrlInput';
import YouTubeVideoInfo from '../components/youtube-clipper/YouTubeVideoInfo';
import ClipEditor from '../components/youtube-clipper/ClipEditor';
import ProcessingProgress from '../components/youtube-clipper/ProcessingProgress';
import ClipResult from '../components/youtube-clipper/ClipResult';
import ErrorMessage from '../components/youtube-clipper/ErrorMessage';
import AiClipFinder from '../components/youtube-clipper/AiClipFinder';

export default function YouTubeClipperPage() {
  // Main UI State: 'initial' | 'loading' | 'video_loaded' | 'editing' | 'processing' | 'completed' | 'error'
  const [uiState, setUiState] = useState('initial');
  const [error, setError] = useState(null);

  // Video & Metadata
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoMetadata, setVideoMetadata] = useState(null);

  // Timestamps
  const [startTimeSec, setStartTimeSec] = useState(0);
  const [endTimeSec, setEndTimeSec] = useState(30);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [isPreviewing, setIsPreviewing] = useState(false);

  // Studio Settings
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [fitMode, setFitMode] = useState('cover');
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [captionEnabled, setCaptionEnabled] = useState(true);
  const [captionText, setCaptionText] = useState('Watch full video on YouTube!');
  const [captionSettings, setCaptionSettings] = useState({
    fontFamily: 'Inter, sans-serif',
    fontSize: 22,
    textColor: '#FFFFFF',
    bgColor: 'rgba(0, 0, 0, 0.4)',
    position: 'bottom',
    alignment: 'center',
    fontWeight: '700'
  });

  // Processing & Results
  const [statusStep, setStatusStep] = useState('Preparing your clip...');
  const [progressPercent, setProgressPercent] = useState(0);
  const [generatedClip, setGeneratedClip] = useState(null);
  const [showAiFinderModal, setShowAiFinderModal] = useState(false);

  const canvasRef = useRef(null);

  const handleAnalyzeVideo = async (url) => {
    setYoutubeUrl(url);
    setUiState('loading');
    setError(null);

    try {
      const response = await fetch(`/api/youtube/clipper-metadata?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch YouTube video metadata');
      }

      setVideoMetadata(data);
      const totalDur = data.durationSec || 300;
      setStartTimeSec(0);
      setEndTimeSec(Math.min(30, totalDur));
      setCurrentTimeSec(0);
      setCaptionText(`"${data.title?.slice(0, 45)}..."`);
      setUiState('editing');
    } catch (err) {
      console.error('Video Analysis Error:', err);
      setError(err.message || 'Please enter a valid YouTube URL.');
      setUiState('error');
    }
  };

  const handlePreviewClip = () => {
    setIsPreviewing(!isPreviewing);
  };

  const handlePreviewEnd = () => {
    setIsPreviewing(false);
  };

  const handleSelectAiMoment = (startSec, endSec) => {
    setStartTimeSec(startSec);
    setEndTimeSec(endSec);
    setCurrentTimeSec(startSec);
  };

  // Real client-side canvas stream recording for video clip generation
  const handleCreateClip = async () => {
    setUiState('processing');
    setProgressPercent(5);
    setStatusStep('Preparing your clip...');

    await new Promise(r => setTimeout(r, 400));
    setProgressPercent(20);
    setStatusStep('Creating clip...');

    try {
      const canvas = canvasRef.current;
      const clipDurationSec = Math.max(1, endTimeSec - startTimeSec);
      
      let mediaRecorder;
      let recordedChunks = [];
      let stream;

      if (canvas && canvas.captureStream && typeof MediaRecorder !== 'undefined') {
        stream = canvas.captureStream(30);
        let mimeType = 'video/mp4';

        if (outputFormat === 'mp4') {
          if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1')) {
            mimeType = 'video/mp4;codecs=avc1';
          } else if (MediaRecorder.isTypeSupported('video/mp4')) {
            mimeType = 'video/mp4';
          } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
            mimeType = 'video/webm;codecs=vp9';
          } else {
            mimeType = 'video/webm';
          }
        } else {
          if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
            mimeType = 'video/webm;codecs=vp9';
          } else {
            mimeType = 'video/webm';
          }
        }

        mediaRecorder = new MediaRecorder(stream, { mimeType });
        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        };

        mediaRecorder.start(100);
      }

      // Simulate step progress matching frame recording duration
      const totalSteps = 20;
      const stepInterval = Math.max(100, Math.min(300, (clipDurationSec * 1000) / totalSteps));
      for (let i = 1; i <= totalSteps; i++) {
        await new Promise(r => setTimeout(r, stepInterval));
        const currentPct = 20 + (i / totalSteps) * 60;
        setProgressPercent(Math.min(80, currentPct));
      }

      setStatusStep('Finalizing...');
      setProgressPercent(90);

      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        await new Promise((resolve) => {
          mediaRecorder.onstop = resolve;
          mediaRecorder.stop();
        });
      }

      let clipBlob;
      let formatStr = outputFormat || 'mp4';
      if (recordedChunks.length > 0) {
        const recordedType = recordedChunks[0].type || '';
        formatStr = recordedType.includes('mp4') ? 'mp4' : (recordedType.includes('webm') ? 'webm' : outputFormat);
        clipBlob = new Blob(recordedChunks, { type: recordedType || `video/${formatStr}` });
      } else {
        // Fallback frame capture if MediaRecorder stream is empty
        const canvasBlob = await new Promise(res => canvas ? canvas.toBlob(res, 'image/png') : res(null));
        clipBlob = canvasBlob || new Blob([], { type: `video/${formatStr}` });
      }

      const clipUrl = URL.createObjectURL(clipBlob);
      const isImageFallback = recordedChunks.length === 0;

      setProgressPercent(100);
      setStatusStep('Your clip is ready!');

      await new Promise(r => setTimeout(r, 400));

      setGeneratedClip({
        url: clipUrl,
        blob: clipBlob,
        durationSec: clipDurationSec,
        aspectRatio,
        format: formatStr,
        isImageFallback
      });

      setUiState('completed');

    } catch (err) {
      console.error('Clip Creation Error:', err);
      setError('Browser recording failed: ' + err.message);
      setUiState('error');
    }
  };

  const handleReset = () => {
    setUiState('initial');
    setYoutubeUrl('');
    setVideoMetadata(null);
    setGeneratedClip(null);
    setError(null);
  };

  return (
    <div className="page-wrapper">
      <SEO
        title="Free YouTube Video Clipper — Clip & Create YouTube Shorts, Reels & Clips Online"
        description="Instantly clip any YouTube video online for free. Trim to exact timestamps, export in 9:16 for YouTube Shorts & TikTok, add animated captions, and download as MP4 or WebM. No software needed — works entirely in your browser."
        url="/youtube-clipper"
      />


      <div className="container" style={{ paddingBottom: '60px' }}>
        {/* Step 1: URL Input (always available unless completed or editing) */}
        {uiState !== 'editing' && uiState !== 'processing' && uiState !== 'completed' && (
          <YouTubeUrlInput
            onAnalyze={handleAnalyzeVideo}
            loading={uiState === 'loading'}
          />
        )}

        {/* Loading skeleton */}
        {uiState === 'loading' && (
          <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 20px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
              Analyzing YouTube Video...
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Fetching video metadata, thumbnails, and duration...
            </p>
          </div>
        )}

        {/* Error state */}
        {uiState === 'error' && (
          <ErrorMessage
            message={error}
            onRetry={() => setUiState('initial')}
          />
        )}

        {/* Step 2-6: Editor Studio View */}
        {(uiState === 'editing' || uiState === 'video_loaded') && videoMetadata && (
          <>
            <YouTubeVideoInfo
              metadata={videoMetadata}
              onOpenAiFinder={() => setShowAiFinderModal(true)}
            />

            <ClipEditor
              metadata={videoMetadata}
              startTimeSec={startTimeSec}
              endTimeSec={endTimeSec}
              currentTimeSec={currentTimeSec}
              onChangeStart={setStartTimeSec}
              onChangeEnd={setEndTimeSec}
              onSeek={(sec) => setCurrentTimeSec(sec)}
              onTimeUpdate={(sec) => setCurrentTimeSec(sec)}
              isPreviewing={isPreviewing}
              onPreviewClip={handlePreviewClip}
              onPreviewEnd={handlePreviewEnd}
              aspectRatio={aspectRatio}
              onChangeAspectRatio={setAspectRatio}
              fitMode={fitMode}
              onChangeFitMode={setFitMode}
              outputFormat={outputFormat}
              onChangeOutputFormat={setOutputFormat}
              captionEnabled={captionEnabled}
              onToggleCaptionEnabled={setCaptionEnabled}
              captionText={captionText}
              onChangeCaptionText={setCaptionText}
              captionSettings={captionSettings}
              onChangeCaptionSettings={setCaptionSettings}
              onCreateClip={handleCreateClip}
              onCanvasRef={(c) => { canvasRef.current = c; }}
            />
          </>
        )}

        {/* Video Canvas engine — mounted inside ClipEditor; canvasRef bubbles up via onCanvasRef */}

        {/* Step 7: Processing Progress State */}
        {uiState === 'processing' && (
          <ProcessingProgress
            statusStep={statusStep}
            progressPercent={progressPercent}
          />
        )}

        {/* Download Result Card State */}
        {uiState === 'completed' && generatedClip && (
          <ClipResult
            clipUrl={generatedClip.url}
            clipBlob={generatedClip.blob}
            durationSec={generatedClip.durationSec}
            aspectRatio={generatedClip.aspectRatio}
            format={generatedClip.format}
            isImageFallback={generatedClip.isImageFallback}
            onEditClip={() => setUiState('editing')}
            onReset={handleReset}
          />
        )}

        {/* Optional AI Clip Finder Modal */}
        {showAiFinderModal && videoMetadata && (
          <AiClipFinder
            metadata={videoMetadata}
            onSelectMoment={handleSelectAiMoment}
            onClose={() => setShowAiFinderModal(false)}
          />
        )}

        {/* FAQ Section */}
        <div style={{ marginTop: '60px' }}>
          <FaqSection faqs={toolFaqs.youtubeClipper || []} />
        </div>

        {/* SEO Content Block */}
        {(uiState === 'initial' || uiState === 'error') && (
          <div style={{ marginTop: '60px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>
              The Easiest Way to Clip YouTube Videos Online — Free
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.8, maxWidth: '760px', margin: '0 auto 36px auto', textAlign: 'center' }}>
              Our free YouTube Video Clipper lets you extract any moment from any YouTube video and export it as a shareable short-form clip — no account, no download, no watermark. Perfect for content creators, social media managers, and anyone repurposing long-form YouTube content into viral Shorts, Reels, or TikTok videos.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { emoji: '✂️', title: 'Precise Timeline Trimmer', desc: 'Drag the start and end handles on the visual timeline to select the exact clip segment you want. Supports second-level precision.' },
                { emoji: '📐', title: '9:16 Shorts & Reels Format', desc: 'Instantly reframe your clip to vertical 9:16 for YouTube Shorts, TikTok, and Instagram Reels — or keep it in 16:9 or 1:1.' },
                { emoji: '💬', title: 'Animated Caption Overlays', desc: 'Add bold text captions with custom fonts, colors, and positions. Choose from Minimal, Bold, Social, or Karaoke presets.' },
                { emoji: '🤖', title: 'AI Best Moments Finder', desc: 'Let AI analyze your video and automatically suggest the highest-engagement clip moments — hooks, climaxes, and key takeaways.' },
                { emoji: '📥', title: 'MP4 & WebM Export', desc: 'Download your clip directly in MP4 or WebM format with no watermark. 100% browser-based — nothing is uploaded to our servers.' },
                { emoji: '🎨', title: 'Aspect Ratio & Fit Modes', desc: 'Cover, Contain, or Center Crop — control exactly how your original 16:9 video fills the vertical or square frame.' }
              ].map((f, i) => (
                <div key={i} style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ fontSize: '28px' }}>{f.emoji}</div>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{f.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
