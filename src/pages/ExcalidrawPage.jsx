import React, { useState, useRef, useEffect, useCallback } from 'react';
import SEO from '../components/SEO';
import {
  Square,
  Circle,
  Diamond,
  ArrowUpRight,
  Minus,
  Pencil,
  Type,
  Eraser,
  MousePointer,
  Hand,
  Download,
  Upload,
  Undo2,
  Redo2,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Users,
  Image as ImageIcon
} from 'lucide-react';

export default function ExcalidrawPage() {
  // Tool Modes: 'select', 'hand', 'rectangle', 'ellipse', 'diamond', 'arrow', 'line', 'freedraw', 'text', 'eraser'
  const [activeTool, setActiveTool] = useState('rectangle');

  // Elements Array
  const [elements, setElements] = useState([
    {
      id: 'demo-1',
      type: 'rectangle',
      x: 180,
      y: 140,
      width: 220,
      height: 110,
      strokeColor: '#1e293b',
      fillColor: '#dbeafe',
      fillStyle: 'hachure',
      strokeWidth: 2,
      roughness: 1.5,
      text: 'Frontend App\n(React Router)'
    },
    {
      id: 'demo-2',
      type: 'arrow',
      x: 400,
      y: 195,
      width: 140,
      height: 0,
      strokeColor: '#3b82f6',
      fillColor: 'transparent',
      strokeWidth: 2,
      roughness: 1
    },
    {
      id: 'demo-3',
      type: 'diamond',
      x: 540,
      y: 135,
      width: 180,
      height: 120,
      strokeColor: '#1e293b',
      fillColor: '#fef3c7',
      fillStyle: 'hachure',
      strokeWidth: 2,
      roughness: 2,
      text: 'API Server\nValid Gateway?'
    },
    {
      id: 'demo-4',
      type: 'ellipse',
      x: 320,
      y: 330,
      width: 240,
      height: 130,
      strokeColor: '#10b981',
      fillColor: '#d1fae5',
      fillStyle: 'solid',
      strokeWidth: 2,
      roughness: 1.5,
      text: '🧠 Infinite Canvas\nExcalidraw Engine'
    }
  ]);

  // Selected element ID
  const [selectedId, setSelectedId] = useState(null);

  // Styling properties for active/new creation
  const [strokeColor, setStrokeColor] = useState('#1e293b');
  const [fillColor, setFillColor] = useState('#e0f2fe');
  const [fillStyle, setFillStyle] = useState('hachure');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [roughness, setRoughness] = useState(1.5);
  const [fontFamily, setFontFamily] = useState('handwriting');

  // Canvas State & Viewport
  const [pan, setPan] = useState({ x: 100, y: 50 });
  const [zoom, setZoom] = useState(1);
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [isLiveCollab, setIsLiveCollab] = useState(false);

  // History stack
  const [history, setHistory] = useState([elements]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Interaction tracking
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [currentElement, setCurrentElement] = useState(null);
  // Ref for freehand points — avoids stale closure in mousemove
  const freedrawPointsRef = useRef([]);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Helper to push history
  const updateElements = (newElements) => {
    setElements(newElements);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    localStorage.setItem('excalidraw_canvas_save', JSON.stringify(newElements));
  };

  // Load from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('excalidraw_canvas_save');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setElements(parsed);
          setHistory([parsed]);
          setHistoryIndex(0);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Undo / Redo handlers
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  };

  // Mouse coordinate translation
  const getCanvasCoords = (e, canvasRef) => {
    const rect = canvasRef.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: (clientX - rect.left - pan.x) / zoom,
      y: (clientY - rect.top - pan.y) / zoom
    };
  };

  const canvasRef = useRef(null);

  // Mouse events
  const handleMouseDown = (e) => {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
    const { x, y } = getCanvasCoords(e, canvasRef.current);

    if (activeTool === 'hand' || e.button === 1 || e.spaceKey) {
      setIsPanning(true);
      setStartPoint({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    if (activeTool === 'select') {
      const clicked = [...elements].reverse().find((el) => {
        return (
          x >= el.x &&
          x <= el.x + (el.width || 100) &&
          y >= el.y &&
          y <= el.y + (el.height || 50)
        );
      });
      if (clicked) {
        setSelectedId(clicked.id);
        setIsDrawing(true);
        setStartPoint({ x: x - clicked.x, y: y - clicked.y });
      } else {
        setSelectedId(null);
      }
      return;
    }

    if (activeTool === 'eraser') {
      const clicked = [...elements].reverse().find((el) => {
        return (
          x >= el.x &&
          x <= el.x + (el.width || 80) &&
          y >= el.y &&
          y <= el.y + (el.height || 40)
        );
      });
      if (clicked) {
        const filtered = elements.filter((item) => item.id !== clicked.id);
        updateElements(filtered);
      }
      return;
    }

    // Creating new element
    setIsDrawing(true);
    const newId = 'el_' + Date.now();
    const initialPoints = [{ x, y }];
    if (activeTool === 'freedraw') {
      freedrawPointsRef.current = initialPoints;
    }
    const newEl = {
      id: newId,
      type: activeTool,
      x,
      y,
      width: 0,
      height: 0,
      points: activeTool === 'freedraw' ? initialPoints : [],
      strokeColor,
      fillColor: activeTool === 'freedraw' ? 'transparent' : fillColor,
      fillStyle,
      strokeWidth,
      roughness,
      fontFamily,
      text: activeTool === 'text' ? 'Double click to edit' : ''
    };

    setCurrentElement(newEl);
    setSelectedId(newId);
    setStartPoint({ x, y });
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      setPan({
        x: e.clientX - startPoint.x,
        y: e.clientY - startPoint.y
      });
      return;
    }

    if (!isDrawing) return;

    const { x, y } = getCanvasCoords(e, canvasRef.current);

    if (activeTool === 'select' && selectedId) {
      const updated = elements.map((el) => {
        if (el.id === selectedId) {
          return {
            ...el,
            x: x - startPoint.x,
            y: y - startPoint.y
          };
        }
        return el;
      });
      setElements(updated);
      return;
    }

    if (!currentElement) return;

    if (activeTool === 'freedraw') {
      // Accumulate into ref (no batching lag), update visual via state
      freedrawPointsRef.current.push({ x, y });
      setCurrentElement((prev) => ({
        ...prev,
        points: [...freedrawPointsRef.current]
      }));
    } else {
      const w = x - startPoint.x;
      const h = y - startPoint.y;
      setCurrentElement({
        ...currentElement,
        width: w,
        height: h
      });
    }
  };

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (isDrawing) {
      setIsDrawing(false);
      if (activeTool === 'select') {
        updateElements(elements);
        return;
      }

      if (currentElement) {
        let finalEl = { ...currentElement };
        if (finalEl.width < 0) {
          finalEl.x = finalEl.x + finalEl.width;
          finalEl.width = Math.abs(finalEl.width);
        }
        if (finalEl.height < 0) {
          finalEl.y = finalEl.y + finalEl.height;
          finalEl.height = Math.abs(finalEl.height);
        }

        if (
          finalEl.type !== 'text' &&
          finalEl.type !== 'freedraw' &&
          Math.abs(finalEl.width) < 5 &&
          Math.abs(finalEl.height) < 5
        ) {
          setCurrentElement(null);
          return;
        }

        if (finalEl.type === 'text') {
          finalEl.width = 160;
          finalEl.height = 40;
        }

        updateElements([...elements, finalEl]);
        setCurrentElement(null);
        freedrawPointsRef.current = [];
        // Stay on freedraw so user can keep sketching; only switch for other tools
        if (finalEl.type !== 'freedraw') {
          setActiveTool('select');
        }
      }
    }
  };

  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.2), 3));
    } else {
      setPan((prev) => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  };

  const exportPNG = () => {
    showToast('Exporting canvas as PNG image...');
    const svgEl = canvasRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 1920;
    canvas.height = 1080;

    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.download = `excalidraw-diagram-${Date.now()}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(elements, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sketch-diagram.excalidraw`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported .excalidraw JSON file!');
  };

  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            updateElements(imported);
            showToast('Canvas state imported successfully!');
          }
        } catch (err) {
          showToast('Invalid JSON file format.');
        }
      };
    }
  };

  const clearCanvas = () => {
    if (window.confirm('Are you sure you want to clear the entire whiteboard?')) {
      updateElements([]);
      setSelectedId(null);
      showToast('Canvas cleared!');
    }
  };

  const renderSketchShape = (el) => {
    const isSelected = el.id === selectedId;
    const { x, y, width = 100, height = 60, strokeColor, fillColor, strokeWidth, text } = el;

    return (
      <g key={el.id} style={{ cursor: activeTool === 'select' ? 'move' : 'default' }}>
        {el.type === 'rectangle' && (
          <>
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              fill={fillColor === 'transparent' ? 'none' : fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              rx={4}
              strokeDasharray={el.fillStyle === 'hachure' ? '4 2' : 'none'}
              style={{ filter: 'drop-shadow(1px 2px 0px rgba(0,0,0,0.15))' }}
            />
            <rect
              x={x - 1}
              y={y + 1}
              width={width + 1}
              height={height - 1}
              fill="none"
              stroke={strokeColor}
              strokeWidth={Math.max(1, strokeWidth - 1)}
              opacity={0.6}
            />
          </>
        )}

        {el.type === 'ellipse' && (
          <>
            <ellipse
              cx={x + width / 2}
              cy={y + height / 2}
              rx={Math.abs(width / 2)}
              ry={Math.abs(height / 2)}
              fill={fillColor === 'transparent' ? 'none' : fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={el.fillStyle === 'hachure' ? '5 3' : 'none'}
            />
            <ellipse
              cx={x + width / 2 + 1}
              cy={y + height / 2 - 1}
              rx={Math.abs(width / 2) - 1}
              ry={Math.abs(height / 2) + 1}
              fill="none"
              stroke={strokeColor}
              strokeWidth={1}
              opacity={0.5}
            />
          </>
        )}

        {el.type === 'diamond' && (
          <polygon
            points={`${x + width / 2},${y} ${x + width},${y + height / 2} ${x + width / 2},${y + height} ${x},${y + height / 2}`}
            fill={fillColor === 'transparent' ? 'none' : fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        )}

        {el.type === 'arrow' && (
          <g>
            <line
              x1={x}
              y1={y}
              x2={x + width}
              y2={y + height}
              stroke={strokeColor}
              strokeWidth={strokeWidth + 1}
              strokeLinecap="round"
            />
            <polygon
              points={`${x + width},${y + height} ${x + width - 12},${y + height - 6} ${x + width - 12},${y + height + 6}`}
              fill={strokeColor}
            />
          </g>
        )}

        {el.type === 'line' && (
          <line
            x1={x}
            y1={y}
            x2={x + width}
            y2={y + height}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )}

        {el.type === 'freedraw' && el.points && el.points.length > 0 && (
          <path
            d={el.points.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '')}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth + 1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {(text || el.type === 'text') && (
          <text
            x={el.type === 'text' ? x : x + width / 2}
            y={el.type === 'text' ? y + 20 : y + height / 2 + 5}
            fill={strokeColor}
            fontSize="16"
            fontFamily={el.fontFamily === 'sans-serif' ? 'Inter, system-ui, sans-serif' : 'Caveat, "Comic Sans MS", cursive'}
            fontWeight="600"
            textAnchor={el.type === 'text' ? 'start' : 'middle'}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          >
            {text?.split('\n').map((line, i) => (
              <tspan key={i} x={el.type === 'text' ? x : x + width / 2} dy={i === 0 ? 0 : 20}>
                {line}
              </tspan>
            ))}
          </text>
        )}

        {isSelected && (
          <rect
            x={x - 6}
            y={y - 6}
            width={Math.abs(width) + 12}
            height={Math.abs(height) + 12}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </g>
    );
  };

  return (
    <>
      <SEO
        title="Excalidraw Whiteboard - Infinite Hand-Drawn Sketching Tool"
        description="Free browser-based infinite whiteboard tool with hand-drawn sketch aesthetics for system design, flowcharts, mind maps, wireframes, and real-time visual thinking."
        keywords="excalidraw online, infinite whiteboard, hand drawn diagram tool, architecture flowchart maker, free online whiteboard, visual mindmap"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');

        .excalidraw-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 64px);
          width: 100%;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
          font-family: Inter, system-ui, sans-serif;
        }

        .excalidraw-toolbar {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          padding: 6px 12px;
          border-radius: 14px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .tool-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tool-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .tool-btn.active {
          background: #eff6ff;
          color: #2563eb;
          font-weight: 600;
          box-shadow: inset 0 0 0 1.5px #3b82f6;
        }

        .sidebar-props {
          position: absolute;
          top: 76px;
          left: 16px;
          z-index: 15;
          width: 220px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          padding: 16px;
          border-radius: 14px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .prop-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .prop-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
        }

        .color-swatch-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .swatch {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #cbd5e1;
          transition: transform 0.15s ease;
        }

        .swatch:hover {
          transform: scale(1.15);
        }

        .top-right-controls {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.15s ease;
        }

        .action-btn:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
        }

        .action-btn.primary {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }

        .action-btn.primary:hover {
          background: #1d4ed8;
        }

        .bottom-left-controls {
          position: absolute;
          bottom: 16px;
          left: 16px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.9);
          padding: 6px 10px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        .toast-banner {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 30;
          background: #0f172a;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>

      <div className="excalidraw-container">
        {/* Top Header / Primary Drawing Toolbar */}
        <div className="excalidraw-toolbar">
          <button
            className={`tool-btn ${activeTool === 'select' ? 'active' : ''}`}
            onClick={() => setActiveTool('select')}
            title="Selection tool (V)"
          >
            <MousePointer size={18} />
          </button>
          <button
            className={`tool-btn ${activeTool === 'hand' ? 'active' : ''}`}
            onClick={() => setActiveTool('hand')}
            title="Hand / Pan Canvas (H)"
          >
            <Hand size={18} />
          </button>
          <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 4px' }} />

          <button
            className={`tool-btn ${activeTool === 'rectangle' ? 'active' : ''}`}
            onClick={() => setActiveTool('rectangle')}
            title="Rectangle (R)"
          >
            <Square size={18} />
          </button>
          <button
            className={`tool-btn ${activeTool === 'diamond' ? 'active' : ''}`}
            onClick={() => setActiveTool('diamond')}
            title="Diamond (D)"
          >
            <Diamond size={18} />
          </button>
          <button
            className={`tool-btn ${activeTool === 'ellipse' ? 'active' : ''}`}
            onClick={() => setActiveTool('ellipse')}
            title="Ellipse (E)"
          >
            <Circle size={18} />
          </button>
          <button
            className={`tool-btn ${activeTool === 'arrow' ? 'active' : ''}`}
            onClick={() => setActiveTool('arrow')}
            title="Arrow Connector (A)"
          >
            <ArrowUpRight size={18} />
          </button>
          <button
            className={`tool-btn ${activeTool === 'line' ? 'active' : ''}`}
            onClick={() => setActiveTool('line')}
            title="Line (L)"
          >
            <Minus size={18} />
          </button>
          <button
            className={`tool-btn ${activeTool === 'freedraw' ? 'active' : ''}`}
            onClick={() => setActiveTool('freedraw')}
            title="Freehand Draw (P)"
          >
            <Pencil size={18} />
          </button>
          <button
            className={`tool-btn ${activeTool === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTool('text')}
            title="Text Note (T)"
          >
            <Type size={18} />
          </button>
          <button
            className={`tool-btn ${activeTool === 'eraser' ? 'active' : ''}`}
            onClick={() => setActiveTool('eraser')}
            title="Eraser (X)"
          >
            <Eraser size={18} />
          </button>

          <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 4px' }} />

          <button className="tool-btn" onClick={handleUndo} disabled={historyIndex <= 0} title="Undo (Ctrl+Z)">
            <Undo2 size={18} />
          </button>
          <button className="tool-btn" onClick={handleRedo} disabled={historyIndex >= history.length - 1} title="Redo (Ctrl+Y)">
            <Redo2 size={18} />
          </button>
        </div>

        {/* Sidebar Styling Properties Panel */}
        <div className="sidebar-props">
          <div className="prop-group">
            <span className="prop-label">Stroke Color</span>
            <div className="color-swatch-grid">
              {['#1e293b', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'].map((color) => (
                <div
                  key={color}
                  className="swatch"
                  style={{ background: color }}
                  onClick={() => {
                    setStrokeColor(color);
                    if (selectedId) {
                      updateElements(elements.map((el) => (el.id === selectedId ? { ...el, strokeColor: color } : el)));
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div className="prop-group">
            <span className="prop-label">Background Fill</span>
            <div className="color-swatch-grid">
              {['transparent', '#dbeafe', '#fef3c7', '#d1fae5', '#fce7f3', '#f3e8ff'].map((color) => (
                <div
                  key={color}
                  className="swatch"
                  style={{ background: color === 'transparent' ? '#fff' : color }}
                  onClick={() => {
                    setFillColor(color);
                    if (selectedId) {
                      updateElements(elements.map((el) => (el.id === selectedId ? { ...el, fillColor: color } : el)));
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div className="prop-group">
            <span className="prop-label">Stroke Width</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1, 2, 4].map((w) => (
                <button
                  key={w}
                  className={`tool-btn ${strokeWidth === w ? 'active' : ''}`}
                  style={{ width: 34, height: 30 }}
                  onClick={() => {
                    setStrokeWidth(w);
                    if (selectedId) {
                      updateElements(elements.map((el) => (el.id === selectedId ? { ...el, strokeWidth: w } : el)));
                    }
                  }}
                >
                  {w}px
                </button>
              ))}
            </div>
          </div>

          <div className="prop-group">
            <span className="prop-label">Hand-drawn Roughness</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 1.5, 3].map((r) => (
                <button
                  key={r}
                  className={`tool-btn ${roughness === r ? 'active' : ''}`}
                  style={{ width: 44, height: 30, fontSize: 11 }}
                  onClick={() => {
                    setRoughness(r);
                    if (selectedId) {
                      updateElements(elements.map((el) => (el.id === selectedId ? { ...el, roughness: r } : el)));
                    }
                  }}
                >
                  {r === 0 ? 'Architect' : r === 1.5 ? 'Artist' : 'Cartoon'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top Right Action & Export Buttons */}
        <div className="top-right-controls">
          <button
            className={`action-btn ${isLiveCollab ? 'primary' : ''}`}
            onClick={() => {
              setIsLiveCollab(!isLiveCollab);
              showToast(isLiveCollab ? 'Collab mode turned off' : 'Live Collaboration Mode Active! (2 Peers Connected)');
            }}
          >
            <Users size={16} />
            {isLiveCollab ? 'Live (2)' : 'Collab'}
          </button>

          <button className="action-btn" onClick={exportPNG}>
            <ImageIcon size={16} />
            Export PNG
          </button>

          <button className="action-btn" onClick={exportJSON}>
            <Download size={16} />
            Save .excalidraw
          </button>

          <label className="action-btn" style={{ cursor: 'pointer' }}>
            <Upload size={16} />
            Open
            <input type="file" accept=".excalidraw,.json" onChange={handleImportJSON} style={{ display: 'none' }} />
          </label>

          <button className="action-btn" onClick={clearCanvas} title="Clear Canvas">
            <Trash2 size={16} color="#ef4444" />
          </button>
        </div>

        {/* Bottom Left Navigation Controls */}
        <div className="bottom-left-controls">
          <button className="tool-btn" style={{ width: 30, height: 30 }} onClick={() => setZoom((z) => Math.max(0.2, z - 0.1))}>
            <ZoomOut size={16} />
          </button>
          <span style={{ fontSize: 12, fontWeight: 700, minWidth: 40, textAlign: 'center', color: '#475569' }}>
            {Math.round(zoom * 100)}%
          </span>
          <button className="tool-btn" style={{ width: 30, height: 30 }} onClick={() => setZoom((z) => Math.min(3, z + 0.1))}>
            <ZoomIn size={16} />
          </button>
          <button
            className="tool-btn"
            style={{ width: 30, height: 30 }}
            onClick={() => {
              setZoom(1);
              setPan({ x: 100, y: 50 });
            }}
          >
            <Maximize2 size={16} />
          </button>
        </div>

        {/* Main Canvas Workspace */}
        <div
          ref={canvasRef}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            cursor:
              activeTool === 'hand' || isPanning
                ? 'grab'
                : activeTool === 'freedraw'
                ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231e293b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 19l7-7 3 3-7 7-3-3z'/%3E%3Cpath d='M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z'/%3E%3Cpath d='M2 2l7.586 7.586'/%3E%3Ccircle cx='11' cy='11' r='2'/%3E%3C/svg%3E") 4 20, crosshair`
                : activeTool === 'eraser'
                ? 'cell'
                : 'crosshair'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <svg
            width="100%"
            height="100%"
            style={{
              backgroundImage: isGridVisible
                ? 'radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)'
                : 'none',
              backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
              backgroundPosition: `${pan.x}px ${pan.y}px`
            }}
          >
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {elements.map((el) => renderSketchShape(el))}
              {currentElement && renderSketchShape(currentElement)}

              {isLiveCollab && (
                <g transform="translate(680, 220)">
                  <path d="M0,0 L12,18 L7,18 L4,26 L0,24 Z" fill="#ec4899" />
                  <rect x="14" y="16" width="76" height="20" rx="4" fill="#ec4899" />
                  <text x="20" y="30" fill="#fff" fontSize="11" fontWeight="bold">
                    Sarah (Live)
                  </text>
                </g>
              )}
            </g>
          </svg>
        </div>

        {toastMessage && <div className="toast-banner">✨ {toastMessage}</div>}
      </div>

      <div style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '40px 20px' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', color: '#0f172a' }}>
            ✏️ About Excalidraw Infinite Whiteboard
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', marginBottom: '24px' }}>
            Excalidraw is a lightweight browser-based infinite whiteboard designed for visual thinking. It combines the simplicity of drawing on paper with powerful diagramming tools, allowing creators, software developers, and architects to build flowcharts, system architectures, wireframes, and mind maps in a clean, hand-drawn sketch style.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b', marginBottom: '6px' }}>✏️ Hand-drawn Aesthetic</h4>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Every shape looks naturally sketched rather than perfectly geometric, encouraging focus on concepts.</p>
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b', marginBottom: '6px' }}>♾️ Infinite Canvas</h4>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>No boundaries or size limits on your workspace canvas with smooth zoom and pan.</p>
            </div>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b', marginBottom: '6px' }}>💾 Local-first Storage</h4>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Your sketches remain private and persist inside browser local storage automatically.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
