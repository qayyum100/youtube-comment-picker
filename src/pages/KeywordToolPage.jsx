import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Search, Sparkles, Copy, Tag, TrendingUp, TrendingDown, Minus, Download, Save, Folder, Plus, X, Video, FileText, Check } from 'lucide-react';
import FaqSection from '../components/FaqSection';
import { toolFaqs } from '../data/toolFaqs';

export default function KeywordToolPage() {
  const [activeTab, setActiveTab] = useState('keyword'); // 'keyword' or 'competitor'
  const [inputValue, setInputValue] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [competitorTags, setCompetitorTags] = useState(null);
  const [error, setError] = useState(null);

  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [savedProjects, setSavedProjects] = useState({});
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  
  const [outlineModalData, setOutlineModalData] = useState(null);
  const [loadingOutline, setLoadingOutline] = useState(false);

  const [titlesModalData, setTitlesModalData] = useState(null);
  const [loadingTitles, setLoadingTitles] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('yt_keyword_projects');
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  const saveToLocalStorage = (projects) => {
    localStorage.setItem('yt_keyword_projects', JSON.stringify(projects));
    setSavedProjects(projects);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue) return;

    setLoading(true);
    setError(null);
    setResults(null);
    setCompetitorTags(null);
    setSelectedKeywords([]);

    try {
      if (activeTab === 'keyword') {
        const response = await fetch('/api/keyword-research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keyword: inputValue })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Failed to fetch keywords');
        setResults(result.data);
      } else {
        const response = await fetch(`/api/youtube/channel-tags?url=${encodeURIComponent(inputValue)}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Failed to fetch competitor tags');
        setCompetitorTags(result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (kw) => {
    if (selectedKeywords.includes(kw)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== kw));
    } else {
      setSelectedKeywords([...selectedKeywords, kw]);
    }
  };

  const selectAll = (keywordsList) => {
    const allKws = keywordsList.map(k => k.keyword || k);
    const allSelected = allKws.every(k => selectedKeywords.includes(k));
    if (allSelected) {
      setSelectedKeywords(selectedKeywords.filter(k => !allKws.includes(k)));
    } else {
      const newSelections = new Set([...selectedKeywords, ...allKws]);
      setSelectedKeywords(Array.from(newSelections));
    }
  };

  const exportToCSV = () => {
    if (selectedKeywords.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8,Keyword\n" + selectedKeywords.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "keywords_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateVideoOutline = async () => {
    if (selectedKeywords.length === 0) return;
    setLoadingOutline(true);
    setOutlineModalData(null);
    try {
      const response = await fetch('/api/ai/outline-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: selectedKeywords })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setOutlineModalData(result.data);
    } catch (err) {
      alert("Failed to generate outline: " + err.message);
    } finally {
      setLoadingOutline(false);
    }
  };

  const generateTitlesForKeyword = async (keyword) => {
    setLoadingTitles(true);
    setTitlesModalData(null);
    try {
      const response = await fetch('/api/ai/title-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: keyword })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setTitlesModalData({ keyword, titles: result.data.titles || result.data });
    } catch (err) {
      alert("Failed to generate titles: " + err.message);
    } finally {
      setLoadingTitles(false);
    }
  };

  const handleSaveToProject = () => {
    if (!newProjectName.trim() || selectedKeywords.length === 0) return;
    const currentList = savedProjects[newProjectName] || [];
    const updatedList = Array.from(new Set([...currentList, ...selectedKeywords]));
    
    saveToLocalStorage({
      ...savedProjects,
      [newProjectName]: updatedList
    });
    setNewProjectName('');
    setIsProjectModalOpen(false);
    alert('Saved successfully!');
  };

  const renderTrendIcon = (trend) => {
    if (!trend) return <Minus size={14} style={{ color: 'var(--text-muted)' }} />;
    if (trend.includes('+') || trend.includes('📈')) return <TrendingUp size={14} style={{ color: 'var(--success)' }} />;
    if (trend.includes('-') || trend.includes('📉')) return <TrendingDown size={14} style={{ color: 'var(--danger)' }} />;
    return <Minus size={14} style={{ color: 'var(--text-muted)' }} />;
  };

  const getIntentColor = (intent) => {
    if (!intent) return 'var(--border)';
    const i = intent.toLowerCase();
    if (i.includes('info')) return '#3b82f6';
    if (i.includes('commercial')) return '#eab308';
    if (i.includes('trans')) return '#22c55e';
    return 'var(--border)';
  };

  const DataTable = ({ items, title }) => (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden', marginBottom: '24px' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{title}</h3>
        <button onClick={() => selectAll(items)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
          Select All
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 20px', width: '40px' }}></th>
              <th style={{ padding: '12px 20px' }}>Keyword</th>
              <th style={{ padding: '12px 20px' }}>Intent</th>
              <th style={{ padding: '12px 20px' }}>Volume</th>
              <th style={{ padding: '12px 20px' }}>Difficulty</th>
              <th style={{ padding: '12px 20px' }}>CPC</th>
              <th style={{ padding: '12px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s', background: selectedKeywords.includes(item.keyword) ? 'rgba(var(--primary-rgb), 0.05)' : 'transparent' }}>
                <td style={{ padding: '12px 20px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedKeywords.includes(item.keyword)}
                    onChange={() => toggleSelection(item.keyword)}
                    style={{ cursor: 'pointer', accentColor: 'var(--primary)', width: '16px', height: '16px' }}
                  />
                </td>
                <td style={{ padding: '12px 20px', fontWeight: '500', color: 'var(--text-primary)' }}>{item.keyword}</td>
                <td style={{ padding: '12px 20px' }}>
                  {item.intent && (
                    <span style={{ 
                      fontSize: '11px', padding: '2px 8px', borderRadius: '12px', 
                      background: `${getIntentColor(item.intent)}20`, 
                      color: getIntentColor(item.intent), fontWeight: '600'
                    }}>
                      {item.intent}
                    </span>
                  )}
                </td>
                <td style={{ padding: '12px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: '600' }}>{item.searchVolume?.toLocaleString() || '-'}</span>
                    {renderTrendIcon(item.trend)}
                  </div>
                </td>
                <td style={{ padding: '12px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden', minWidth: '60px' }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${item.difficultyScore || 0}%`, 
                        background: (item.difficultyScore > 75) ? 'var(--danger)' : (item.difficultyScore > 40) ? '#eab308' : 'var(--success)'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>{item.difficultyScore || 0}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 20px', color: 'var(--success)', fontWeight: '500' }}>
                  {item.cpc ? `$${item.cpc.toFixed(2)}` : '-'}
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                  <button onClick={() => generateTitlesForKeyword(item.keyword)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', gap: '6px' }}>
                    <Sparkles size={12} /> Titles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper" style={{ position: 'relative' }}>
      <SEO 
        title="Advanced YouTube Keyword Tool | Intelligence & Gap Analysis"
        description="Research search volume, competition, longtail variations, and AI-driven video outlines to rank your videos higher."
        url="/youtube-keyword-tool"
      />

      <div className="page-hero">
        <h1>YouTube Keyword Intelligence</h1>
        <p>Discover high-volume keywords, scrape competitor tags, and generate AI video outlines instantly.</p>
      </div>

      <div className="card card-lg" style={{ marginBottom: '40px' }}>
        
        {/* TABS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <button 
            className={`btn ${activeTab === 'keyword' ? 'btn-primary' : 'btn-secondary'}`} 
            onClick={() => { setActiveTab('keyword'); setInputValue(''); }}
          >
            <Search size={16} /> Keyword Brainstorming
          </button>
          <button 
            className={`btn ${activeTab === 'competitor' ? 'btn-primary' : 'btn-secondary'}`} 
            onClick={() => { setActiveTab('competitor'); setInputValue(''); }}
          >
            <Tag size={16} /> Competitor Gap Analysis
          </button>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <span className="input-group-icon"><Search size={16} /></span>
            <input 
              type="text" 
              className="input-field"
              placeholder={activeTab === 'keyword' ? "Enter target keyword (e.g. passive income 2026)..." : "Enter Competitor YouTube Channel URL..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexShrink: 0 }}>
            {loading ? <span className="btn-spinner" role="status" aria-label="Loading" /> : <> <Sparkles size={16} /> Analyze </>}
          </button>
        </form>

        {error && <div className="alert alert-error" style={{ marginTop: '16px' }}>{error}</div>}

        {/* RESULTS FOR KEYWORDS */}
        {results && activeTab === 'keyword' && (
          <div style={{ marginTop: '32px' }}>
            <DataTable title="Top Suggestions" items={results.suggestions} />
            <DataTable title="Long-Tail Variations" items={results.longtail} />
          </div>
        )}

        {/* RESULTS FOR COMPETITOR */}
        {competitorTags && activeTab === 'competitor' && (
          <div style={{ marginTop: '32px' }}>
             <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, marginBottom: '16px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={20} style={{ color: 'var(--primary)' }} /> Top Competitor Themes
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {competitorTags.topKeywords?.map((tag, idx) => (
                    <span key={idx} style={{ padding: '6px 12px', background: 'var(--primary)', color: '#fff', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <h4 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '16px' }}>All Extracted Tags</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {competitorTags.tags?.map((tag, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => toggleSelection(tag)}
                      style={{ 
                        padding: '6px 12px', 
                        background: selectedKeywords.includes(tag) ? 'var(--primary)' : 'var(--bg-card)', 
                        color: selectedKeywords.includes(tag) ? '#fff' : 'var(--text-primary)', 
                        border: '1px solid var(--border)', 
                        borderRadius: '20px', 
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {tag} {selectedKeywords.includes(tag) && <Check size={12} style={{ marginLeft: '4px' }} />}
                    </button>
                  ))}
                </div>
             </div>
          </div>
        )}
      </div>

      {/* SAVED PROJECTS PANEL */}
      <div className="card" style={{ marginBottom: '40px' }}>
         <h3 style={{ margin: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Folder size={18} style={{ color: 'var(--primary)' }} /> Saved Projects
         </h3>
         {Object.keys(savedProjects).length === 0 ? (
           <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No saved projects yet. Select keywords above and save them to a collection.</p>
         ) : (
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
             {Object.entries(savedProjects).map(([name, kws]) => (
               <div key={name} style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                 <h4 style={{ margin: 0, marginBottom: '8px', fontSize: '15px' }}>{name}</h4>
                 <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>{kws.length} keywords</p>
                 <div style={{ display: 'flex', gap: '8px' }}>
                   <button onClick={() => {
                     navigator.clipboard.writeText(kws.join(', '));
                     alert('Copied!');
                   }} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '12px', flex: 1 }}>Copy All</button>
                   <button onClick={() => {
                     const newProjects = { ...savedProjects };
                     delete newProjects[name];
                     saveToLocalStorage(newProjects);
                   }} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '12px', color: 'var(--danger)' }}><X size={14} /></button>
                 </div>
               </div>
             ))}
           </div>
         )}
      </div>

      {/* FLOATING ACTION BAR */}
      {selectedKeywords.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          padding: '12px 24px',
          borderRadius: '100px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          zIndex: 100,
          animation: 'slideUp 0.3s ease-out forwards'
        }}>
          <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{selectedKeywords.length} Selected</span>
          <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>
          <button onClick={exportToCSV} className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '13px' }}><Download size={14} /> Export CSV</button>
          <button onClick={() => setIsProjectModalOpen(true)} className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '13px' }}><Save size={14} /> Save</button>
          <button onClick={generateVideoOutline} disabled={loadingOutline} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '13px' }}>
            {loadingOutline ? <span className="btn-spinner" /> : <><Video size={14} /> AI Outline</>}
          </button>
        </div>
      )}

      {/* MODALS */}
      {isProjectModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
            <h3 style={{ marginTop: 0 }}>Save to Project</h3>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Finance Channel Ideas" 
              value={newProjectName} 
              onChange={e => setNewProjectName(e.target.value)}
              style={{ marginBottom: '16px', width: '100%' }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setIsProjectModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveToProject}>Save</button>
            </div>
          </div>
        </div>
      )}

      {outlineModalData && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setOutlineModalData(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={24} style={{ color: 'var(--primary)' }}/> AI Video Outline</h2>
            
            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', marginTop: '20px', border: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '8px', marginTop: 0 }}>Suggested Title</h4>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{outlineModalData.title}</p>
            </div>
            
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>1. The Hook (0:00 - 0:15)</h4>
              <p style={{ margin: 0, lineHeight: 1.6 }}>{outlineModalData.hook}</p>
              
              <h4 style={{ color: 'var(--primary)', marginBottom: '8px', marginTop: '20px' }}>2. Introduction</h4>
              <p style={{ margin: 0, lineHeight: 1.6 }}>{outlineModalData.introduction}</p>

              <h4 style={{ color: 'var(--primary)', marginBottom: '8px', marginTop: '20px' }}>3. Core Points</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.6 }}>
                {outlineModalData.corePoints?.map((pt, i) => <li key={i} style={{ marginBottom: '8px' }}>{pt}</li>)}
              </ul>

              <h4 style={{ color: 'var(--primary)', marginBottom: '8px', marginTop: '20px' }}>4. Call to Action (Outro)</h4>
              <p style={{ margin: 0, lineHeight: 1.6 }}>{outlineModalData.callToAction}</p>
            </div>
          </div>
        </div>
      )}

      {titlesModalData && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setTitlesModalData(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            <h3 style={{ marginTop: 0 }}>Titles for: "{titlesModalData.keyword}"</h3>
            <ul style={{ paddingLeft: '20px', marginTop: '20px', lineHeight: 1.6 }}>
              {Array.isArray(titlesModalData.titles) 
                ? titlesModalData.titles.map((t, i) => <li key={i} style={{ marginBottom: '12px', fontWeight: '500' }}>{t}</li>)
                : <li>{JSON.stringify(titlesModalData.titles)}</li>
              }
            </ul>
          </div>
        </div>
      )}

      <FaqSection 
        faqsData={toolFaqs.keywordTool}
        customTitle="YouTube Keyword Tool FAQs"
        customDescription="Learn how to find and use the best YouTube keywords to rank your videos higher."
      />
    </div>
  );
}
