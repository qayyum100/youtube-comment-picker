import React, { useState } from 'react';
import { Film, Type, Layout, Sliders, Scissors, Play, Download, Sparkles } from 'lucide-react';
import YouTubePlayer from './YouTubePlayer';
import ClipTimeline from './ClipTimeline';
import TimeInput from './TimeInput';
import AspectRatioSelector from './AspectRatioSelector';
import CaptionEditor from './CaptionEditor';
import VideoCanvas from './VideoCanvas';

export default function ClipEditor({
  metadata,
  startTimeSec,
  endTimeSec,
  currentTimeSec,
  onChangeStart,
  onChangeEnd,
  onSeek,
  onTimeUpdate,
  isPreviewing,
  onPreviewClip,
  onPreviewEnd,
  aspectRatio,
  onChangeAspectRatio,
  fitMode,
  onChangeFitMode,
  captionEnabled,
  onToggleCaptionEnabled,
  captionText,
  onChangeCaptionText,
  captionSettings,
  onChangeCaptionSettings,
  onCreateClip,
  onCanvasRef
}) {
  const [activeTool, setActiveTool] = useState('video'); // 'video' | 'captions' | 'layout'

  // Frame container dimensions preview
  let frameWidth = '100%';
  let frameAspectRatio = '16/9';
  if (aspectRatio === '9:16') {
    frameWidth = '340px';
    frameAspectRatio = '9/16';
  } else if (aspectRatio === '1:1') {
    frameWidth = '480px';
    frameAspectRatio = '1/1';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Studio Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '12px 20px',
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Scissors size={20} color="var(--primary)" />
          <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
            Clip Editor Studio
          </span>
          <span style={{
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--primary)',
            background: 'var(--primary-light)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)'
          }}>
            {aspectRatio} Format
          </span>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onCreateClip}
          style={{
            padding: '10px 24px',
            fontSize: '15px',
            fontWeight: '700',
            gap: '8px',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <Download size={18} /> Create Clip
        </button>
      </div>

      {/* Main Studio 3-Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 340px',
        gap: '20px',
        alignItems: 'start'
      }} className="studio-container">
        
        {/* LEFT SIDEBAR: Tools Navigation */}
        <div className="card" style={{
          padding: '12px 6px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'center'
        }}>
          {[
            { id: 'video', label: 'Video', icon: Film },
            { id: 'captions', label: 'Captions', icon: Type },
            { id: 'layout', label: 'Layout', icon: Layout }
          ].map(tool => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(tool.id)}
                style={{
                  width: '100%',
                  padding: '12px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '12px',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={20} />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* CENTER: Framed Video Preview */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          border: '1px solid var(--border)',
          minHeight: '440px'
        }}>
          <div style={{
            position: 'relative',
            width: frameWidth,
            maxWidth: '100%',
            aspectRatio: frameAspectRatio,
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundColor: '#000',
            boxShadow: 'var(--shadow-xl)',
            border: '2px solid var(--border-strong)',
            transition: 'all 0.25s ease-out'
          }}>
            {/* Embedded YouTube Player */}
            <YouTubePlayer
              videoId={metadata.videoId}
              onTimeUpdate={onTimeUpdate}
              isPreviewing={isPreviewing}
              startTimeSec={startTimeSec}
              endTimeSec={endTimeSec}
              onPreviewEnd={onPreviewEnd}
            />

            {/* Captions Overlay directly over video player preview */}
            {captionEnabled && captionText && (
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: captionSettings.position === 'top' ? '12%' : captionSettings.position === 'center' ? '45%' : '78%',
                display: 'flex',
                justifyContent: captionSettings.alignment === 'left' ? 'flex-start' : captionSettings.alignment === 'right' ? 'flex-end' : 'center',
                padding: '0 16px',
                pointerEvents: 'none',
                zIndex: 20
              }}>
                <span style={{
                  fontFamily: captionSettings.fontFamily || 'Inter, sans-serif',
                  fontSize: `${captionSettings.fontSize || 20}px`,
                  fontWeight: captionSettings.fontWeight || '700',
                  color: captionSettings.textColor || '#FFFFFF',
                  backgroundColor: captionSettings.bgColor || 'rgba(0, 0, 0, 0.4)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: captionSettings.alignment || 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  maxWidth: '90%',
                  lineHeight: 1.3
                }}>
                  {captionText}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR: Selected Tool Settings */}
        <div className="card" style={{ padding: '20px' }}>
          {activeTool === 'layout' || activeTool === 'video' ? (
            <AspectRatioSelector
              aspectRatio={aspectRatio}
              onChangeAspectRatio={onChangeAspectRatio}
              fitMode={fitMode}
              onChangeFitMode={onChangeFitMode}
            />
          ) : null}

          {activeTool === 'captions' || activeTool === 'video' ? (
            <CaptionEditor
              enabled={captionEnabled}
              onToggleEnabled={onToggleCaptionEnabled}
              captionText={captionText}
              onChangeCaptionText={onChangeCaptionText}
              captionSettings={captionSettings}
              onChangeCaptionSettings={onChangeCaptionSettings}
            />
          ) : null}
        </div>
      </div>

      {/* BOTTOM: Timeline & Time Inputs */}
      <TimeInput
        startTimeSec={startTimeSec}
        endTimeSec={endTimeSec}
        totalDurationSec={metadata.durationSec}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
        onPreviewClip={onPreviewClip}
        isPreviewing={isPreviewing}
      />

      <ClipTimeline
        totalDurationSec={metadata.durationSec}
        startTimeSec={startTimeSec}
        endTimeSec={endTimeSec}
        currentTimeSec={currentTimeSec}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
        onSeek={onSeek}
      />

      {/* Off-screen Canvas frame recorder */}
      <VideoCanvas
        aspectRatio={aspectRatio}
        fitMode={fitMode}
        captionEnabled={captionEnabled}
        captionText={captionText}
        captionSettings={captionSettings}
        thumbnailUrl={metadata.thumbnailUrl}
        videoTitle={metadata.title}
        onCanvasRef={onCanvasRef}
      />
    </div>
  );
}
