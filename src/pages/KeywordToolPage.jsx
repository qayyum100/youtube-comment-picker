import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  Copy, 
  Tag, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Video, 
  FileText, 
  Check, 
  Filter, 
  Globe, 
  Languages, 
  Settings2, 
  AlertCircle,
  X,
  Target,
  BarChart2,
  List,
  Smartphone,
  Eye,
  Activity,
  DollarSign,
  UploadCloud,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  HelpCircle,
  MousePointerClick,
  PieChart,
  Users
} from 'lucide-react';
import SEO from '../components/SEO';



// --- COMPONENTS ---

const Sparkline = React.memo(({ data, color }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 24;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
});

// Reusable Table Component to dry up code
const KeywordTable = ({ data, selectedKws, toggleSelect, handleSelectAll, handleOpenAiArchitect }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mt-4">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800/80">
        <tr>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-12">
            <input 
              type="checkbox" 
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
              checked={selectedKws.length === data.length && data.length > 0}
              onChange={() => handleSelectAll(data)}
            />
          </th>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume & Trend</th>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Velocity</th>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ranking Odds & Auth</th>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clickstream (CPS/CTR)</th>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROAS (10k)</th>
          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {data.length === 0 ? (
          <tr><td colSpan="8" className="px-6 py-12 text-center text-gray-500">No keywords match your filters.</td></tr>
        ) : data.map((kw) => {
          const isUp = kw.trendHistory[kw.trendHistory.length-1] > kw.trendHistory[0];
          const sparkColor = isUp ? '#22c55e' : '#f59e0b';
          const adsense10k = (kw.estimatedRPM * 10).toFixed(2);
          
          return (
            <tr key={kw.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedKws.includes(kw.id) ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
              <td className="px-4 py-4 whitespace-nowrap">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
                  checked={selectedKws.includes(kw.id)}
                  onChange={() => toggleSelect(kw.id)}
                />
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{kw.keyword}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full w-max font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    {kw.intent}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 dark:text-gray-100">{kw.searchVolume.toLocaleString()}</span>
                    {kw.isTrending && (
                      <span className="text-[10px] uppercase font-bold text-red-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Trending
                      </span>
                    )}
                  </div>
                  <Sparkline data={kw.trendHistory} color={sparkColor} />
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {kw.viewVelocity === 'High' && <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>}
                  {kw.viewVelocity === 'Medium' && <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>}
                  {kw.viewVelocity === 'Low' && <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>}
                  <span className={`text-sm font-semibold ${kw.viewVelocity === 'High' ? 'text-green-600 dark:text-green-400' : kw.viewVelocity === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500'}`}>
                    {kw.viewVelocity}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex flex-col gap-1 w-36 relative group">
                  <div className="flex justify-between text-xs font-medium">
                    <span className={kw.difficultyScore > 75 ? 'text-red-500' : kw.difficultyScore > 40 ? 'text-amber-500' : 'text-green-500'}>
                      {kw.difficultyScore}/100
                    </span>
                    <span className="text-gray-500 underline decoration-dashed cursor-help">
                      {kw.difficultyScore > 75 ? 'Hard' : kw.difficultyScore > 40 ? 'Medium' : 'Easy'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${kw.difficultyScore > 75 ? 'bg-red-500' : kw.difficultyScore > 40 ? 'bg-amber-500' : 'bg-green-500'}`} 
                      style={{ width: `${kw.difficultyScore}%` }}
                    ></div>
                  </div>
                  {/* VidIQ Benchmark Tooltip */}
                  <div className="absolute top-full left-0 mt-2 w-56 bg-gray-900 text-white rounded-lg shadow-xl p-3 text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                    <p className="font-bold mb-2 flex items-center gap-1"><Users className="w-3 h-3"/> Top Ranking Channels:</p>
                    <div className="space-y-1.5">
                      {kw.topChannels.map((c, i) => (
                        <div key={i} className="flex justify-between text-[11px]">
                          <span className="font-medium text-gray-300">#{i+1} {c.name}</span>
                          <span className="text-indigo-400">{c.subs} subs</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                 <div className="flex flex-col gap-0.5">
                   <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                     <MousePointerClick className="w-4 h-4 text-indigo-500" /> {kw.cps} CPS
                   </div>
                   <div className="flex items-center gap-1.5 text-xs text-gray-500">
                     <PieChart className="w-3 h-3" /> {kw.ctr}% CTR
                   </div>
                 </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                 <div className="flex flex-col">
                   <span className="text-sm font-bold text-green-600 dark:text-green-400">${adsense10k}</span>
                   <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                     Affiliate: 
                     <span className={`font-semibold ${kw.affiliateViability === 'High' ? 'text-indigo-500' : kw.affiliateViability === 'Medium' ? 'text-amber-500' : 'text-gray-400'}`}>
                       {kw.affiliateViability}
                     </span>
                   </span>
                 </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                <button 
                  onClick={() => handleOpenAiArchitect(kw.keyword)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-md text-sm font-medium transition-colors"
                >
                  <Sparkles className="w-4 h-4" /> AI Architect
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default function KeywordToolPage() {
  // Tabs
  const [activeTab, setActiveTab] = useState('keyword'); // 'keyword' | 'competitor'
  const [searchInput, setSearchInput] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const searchContainerRef = useRef(null);
  
  // Filters State
  const [region, setRegion] = useState('Global');
  const [language, setLanguage] = useState('English');
  const [volumeRange, setVolumeRange] = useState([0, 200000]);
  const [diffRange, setDiffRange] = useState([0, 100]);
  
  // Table & Data State
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedKws, setSelectedKws] = useState([]);
  const [seedScore, setSeedScore] = useState(0); // TubeBuddy Score Gauge
  const [searchResults, setSearchResults] = useState([]);
  const [questionResults, setQuestionResults] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [error, setError] = useState(null);
  
  // Competitor State
  const [compType, setCompType] = useState('none');
  const [extractedTags, setExtractedTags] = useState([]);
  
  // Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState('titles'); // 'titles'|'description'|'chapters'|'shorts'|'serp'|'seo'
  const [activeKeywordForAi, setActiveKeywordForAi] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponseData, setAiResponseData] = useState(null);

  // SERP / SEO Studio State
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [seoStudioTitle, setSeoStudioTitle] = useState('');
  const [seoStudioDesc, setSeoStudioDesc] = useState('');

  // Derived filtered data
  const filteredKeywords = useMemo(() => {
    return searchResults.filter(kw => {
      const matchVol = kw.searchVolume >= volumeRange[0] && kw.searchVolume <= volumeRange[1];
      const matchDiff = kw.difficultyScore >= diffRange[0] && kw.difficultyScore <= diffRange[1];
      return matchVol && matchDiff;
    });
  }, [searchResults, volumeRange, diffRange]);

  const filteredQuestions = useMemo(() => {
    return questionResults.filter(kw => {
      const matchVol = kw.searchVolume >= volumeRange[0] && kw.searchVolume <= volumeRange[1];
      const matchDiff = kw.difficultyScore >= diffRange[0] && kw.difficultyScore <= diffRange[1];
      return matchVol && matchDiff;
    });
  }, [questionResults, volumeRange, diffRange]);

  // Click outside listener for autocomplete
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handlers
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setShowAutocomplete(false);
    setLoading(true);
    setError(null);
    setSelectedKws([]);
    
    try {
      if (activeTab === 'keyword') {
        const response = await fetch('/api/keyword-research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keyword: searchInput })
        });
        const result = await response.json();
        
        if (!response.ok) throw new Error(result.error || 'Failed to fetch keywords');
        
        const suggestionsData = result.data?.suggestions || [];
        const longtailData = result.data?.longtail || [];
        const clustersData = result.data?.clusters || [];
        
        // Helper map to use dynamic data from AI
        const mapper = (kw, indexOffset) => ({
          id: indexOffset,
          keyword: kw.keyword,
          intent: kw.intent || 'Informational',
          searchVolume: kw.searchVolume || 0,
          difficultyScore: kw.difficultyScore || 50,
          estimatedRPM: kw.cpc ? parseFloat((kw.cpc * 1.8).toFixed(2)) : 0,
          affiliateViability: (kw.cpc && kw.cpc > 2.5) ? 'High' : (kw.cpc && kw.cpc > 1.0) ? 'Medium' : 'Low',
          viewVelocity: kw.viewVelocity || (kw.trend?.includes('📈') ? 'High' : kw.trend?.includes('📉') ? 'Low' : 'Medium'),
          trendHistory: kw.trendHistory || Array.from({ length: 12 }, () => 50),
          isTrending: kw.trend?.includes('📈') || false,
          region,
          lang: language,
          cps: kw.cps || 1.0,
          ctr: kw.ctr || 50,
          topChannels: kw.topChannels || []
        });

        const mappedSuggestions = suggestionsData.map((item, idx) => mapper(item, idx + 1));
        const mappedLongtails = longtailData.map((item, idx) => mapper(item, idx + 100));
        
        setSearchResults(mappedSuggestions);
        setQuestionResults(mappedLongtails);
        setClusters(clustersData);
        
        // Calculate dynamic overall score
        if (mappedSuggestions.length > 0) {
          const avgDiff = mappedSuggestions.reduce((acc, curr) => acc + curr.difficultyScore, 0) / mappedSuggestions.length;
          setSeedScore(Math.floor(100 - avgDiff));
        } else {
          setSeedScore(55);
        }
        
        setHasSearched(true);
      } else {
        // Competitor Mode
        const isVideo = searchInput.includes('watch?v=') || searchInput.includes('youtu.be/');
        if (isVideo) {
          const response = await fetch(`/api/youtube/video?url=${encodeURIComponent(searchInput)}`);
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || 'Failed to fetch competitor video details');
          
          setExtractedTags(result.tags || []);
          setCompType('video');
        } else {
          const response = await fetch(`/api/youtube/channel-tags?url=${encodeURIComponent(searchInput)}`);
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || 'Failed to fetch competitor channel tags');
          
          setExtractedTags(result.tags || []);
          setCompType('channel');
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while communicating with backend APIs.');
    } finally {
      setLoading(false);
    }
  };

  const selectAutocompleteTerm = (term) => {
    setSearchInput(term);
    setShowAutocomplete(false);
    // Auto-trigger search
    handleSearch({ preventDefault: () => {} });
  };

  const handleSelectAll = useCallback((dataset) => {
    const datasetIds = dataset.map(d => d.id);
    const allSelected = datasetIds.every(id => selectedKws.includes(id));
    if (allSelected) {
      setSelectedKws(selectedKws.filter(id => !datasetIds.includes(id)));
    } else {
      const newSelected = [...new Set([...selectedKws, ...datasetIds])];
      setSelectedKws(newSelected);
    }
  }, [selectedKws]);

  const toggleSelect = useCallback((id) => {
    setSelectedKws(prev => prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]);
  }, []);

  const handleOpenAiArchitect = async (keywordString) => {
    const targetKeyword = keywordString || (selectedKws.length > 0 ? searchResults.find(k => k.id === selectedKws[0])?.keyword || 'Selected Keywords' : 'Selected Keywords');
    setActiveKeywordForAi(targetKeyword);
    setIsAiModalOpen(true);
    setActiveAiTab('titles');
    setAiLoading(true);
    setAiResponseData(null);
    setThumbnailPreview(null);
    
    try {
      // 1. Fetch AI Titles
      const titleRes = await fetch('/api/ai/title-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: targetKeyword, category: 'Education', tone: 'Engaging' })
      });
      const titleData = await titleRes.json();
      
      // 2. Fetch AI Outline (Chapters)
      const outlineRes = await fetch('/api/ai/outline-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: [targetKeyword] })
      });
      const outlineData = await outlineRes.json();

      // 3. Fetch AI Description
      const descRes = await fetch('/api/ai/description-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: targetKeyword, title: titleData?.titles?.[0]?.title || '' })
      });
      const descData = await descRes.json();

      // 4. Fetch AI Shorts Ideas
      const shortsRes = await fetch('/api/shorts-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: 'YouTube Video', topic: targetKeyword })
      });
      const shortsData = await shortsRes.json();

      const stitchedResponse = {
        titles: titleData?.titles?.map(t => t.title) || [
          `How to Master ${targetKeyword}`,
          `The Secret of ${targetKeyword} Revealed`,
          `Ultimate ${targetKeyword} Blueprint`
        ],
        description: descData?.description || `SEO description optimized for ${targetKeyword}.`,
        chapters: outlineData?.data ? [
          { time: "0:00", text: outlineData.data.hook || "Video Hook" },
          { time: "0:30", text: outlineData.data.introduction || "Introduction" },
          ...(outlineData.data.corePoints?.map((pt, idx) => ({ time: `${idx + 1}:00`, text: pt })) || []),
          { time: `${(outlineData.data.corePoints?.length || 0) + 1}:00`, text: outlineData.data.callToAction || "Outro & CTA" }
        ] : [
          { time: "0:00", text: "Introduction" },
          { time: "1:30", text: "Core Concepts" },
          { time: "4:00", text: "Step-by-Step Tutorial" },
          { time: "8:30", text: "Final Call to Action" }
        ],
        shortsHooks: shortsData?.ideas?.map(idea => idea.hook) || [
          `This ${targetKeyword} tip will blow your mind.`,
          `Stop doing ${targetKeyword} the wrong way!`,
          `Check out this free tool for ${targetKeyword}.`
        ],
        shortsSeries: shortsData?.ideas?.map((idea, idx) => ({
          part: `Part ${idx + 1}`,
          title: idea.title,
          format: "Fast-paced screen record"
        })) || [
          { part: "Part 1", title: `Getting Started with ${targetKeyword}`, format: "Fast-paced screen record" },
          { part: "Part 2", title: `Pro tips for ${targetKeyword}`, format: "Quick talking head" }
        ]
      };

      setAiResponseData(stitchedResponse);
      setSeoStudioTitle(stitchedResponse.titles[0]);
      setSeoStudioDesc(stitchedResponse.description);
    } catch (err) {
      console.error(err);
      // Fallback object so modal doesn't break if API key is missing
      setAiResponseData({
        titles: [`Struggling with ${targetKeyword}? Try this!`, `Complete ${targetKeyword} Blueprint 2026`],
        description: `This video breaks down everything you need to know about ${targetKeyword}.`,
        chapters: [{ time: "0:00", text: "Introduction" }],
        shortsHooks: [`Why most creators fail at ${targetKeyword}.`],
        shortsSeries: [{ part: "Part 1", title: `Starting ${targetKeyword}`, format: "Voiceover" }]
      });
    } finally {
      setAiLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleThumbnailUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // SEO Studio Live Calculation
  const getSeoScore = () => {
    let score = 30; // base score
    if (seoStudioTitle.length > 20 && seoStudioTitle.length <= 65) score += 20;
    if (seoStudioTitle.toLowerCase().includes(activeKeywordForAi.toLowerCase())) score += 25;
    if (seoStudioDesc.toLowerCase().includes(activeKeywordForAi.toLowerCase())) score += 15;
    if (seoStudioDesc.length > 100) score += 10;
    return score;
  };

  const schemaObject = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YouTube Keyword Tool & Competitor SEO Suite",
    "url": "https://youtubecommentpickerthumbnaildownload.online/youtube-keyword-tool",
    "applicationCategory": "SEO Application",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Tag Extractor",
      "Trend Sparklines",
      "AI Title Architect",
      "Content Gap Analysis",
      "Live SERP Preview",
      "Clickstream Data Metrics"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans pb-32 flex flex-col xl:flex-row">
      <SEO title="YouTube Keyword & Competitor SEO Tool" url="/youtube-keyword-tool" schema={schemaObject} />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ultimate YouTube SEO Intelligence
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400 mx-auto">
            Clickstream data, clustering matrices, and interactive SEO studio simulators all in one.
          </p>
        </div>

        {/* High-Signal Definitional Hero Content for AI Overviews */}
        <section className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-3">What is the YouTube Keyword Tool?</h2>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
            The YouTube Keyword Tool is a free SEO web application that generates real-time long-tail search suggestions, extracts competitor video tags, and tracks 12-month historical search volume trends directly from YouTube's search database to help creators optimize video visibility.
          </p>
        </section>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-visible border border-gray-200 dark:border-gray-700">
          
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button 
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold flex justify-center items-center gap-1.5 sm:gap-2 transition-colors ${activeTab === 'keyword' ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
              onClick={() => { setActiveTab('keyword'); setHasSearched(false); setCompType('none'); }}
            >
              <Search className="w-4 h-4" /> Keyword Brainstorming
            </button>
            <button 
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold flex justify-center items-center gap-1.5 sm:gap-2 transition-colors ${activeTab === 'competitor' ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
              onClick={() => { setActiveTab('competitor'); setHasSearched(false); setCompType('none'); }}
            >
              <Target className="w-4 h-4" /> Competitor Gap Analysis
            </button>
          </div>

          <div className="p-6">
            {/* Search Input w/ Autocomplete */}
            <div className="relative mb-6" ref={searchContainerRef}>
              <form onSubmit={handleSearch}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {activeTab === 'keyword' ? <Search className="h-5 w-5 text-gray-400" /> : <Globe className="h-5 w-5 text-gray-400" />}
                </div>
                <input
                  type="text"
                  className="block w-full pl-9 sm:pl-10 pr-24 sm:pr-32 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base transition-shadow shadow-sm"
                  placeholder={activeTab === 'keyword' ? "Enter seed keyword (e.g. faceless channel)..." : "Paste YouTube Video or Channel URL..."}
                  value={searchInput}
                  onChange={async (e) => {
                    const val = e.target.value;
                    setSearchInput(val);
                    if (activeTab === 'keyword' && val.length > 2) {
                      setShowAutocomplete(true);
                      try {
                        const res = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(val)}`);
                        const data = await res.json();
                        if (data && data[1]) {
                          setAutocompleteSuggestions(data[1].slice(0, 5).map(term => ({ term, relevance: 'Suggested', score: 90 })));
                        }
                      } catch(e) {
                         // fallback silently
                      }
                    } else {
                      setShowAutocomplete(false);
                    }
                  }}
                  onFocus={() => {
                    if (searchInput.length > 2 && activeTab === 'keyword') setShowAutocomplete(true);
                  }}
                />
                <div className="absolute inset-y-0 right-1.5 sm:right-2 flex items-center">
                  <button type="submit" disabled={loading} className="inline-flex items-center px-3 sm:px-6 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-semibold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
                    {loading ? 'Analyzing...' : 'Analyze'}
                  </button>
                </div>
              </form>
              {error && (
                <div className="alert alert-error mt-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* YouTube Native Autocomplete Dropdown */}
              {showAutocomplete && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-30 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Algorithmic Suggestions
                  </div>
                  <ul className="max-h-64 overflow-y-auto py-1">
                    {autocompleteSuggestions.map((item, i) => (
                      <li 
                        key={i} 
                        onClick={() => selectAutocompleteTerm(item.term)}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <Search className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                          <span className="font-medium text-gray-800 dark:text-gray-200">{item.term}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Keyword View Content */}
            {activeTab === 'keyword' && hasSearched && (
              <div className="animate-in fade-in duration-500">
                
                {/* TubeBuddy Style Overview & VidIQ Clustering */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Score Gauge */}
                  <div className="bg-white dark:bg-gray-800/80 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Overall Seed Score</h3>
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100 dark:text-gray-800" />
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="351" strokeDashoffset={351 - (351 * seedScore) / 100} className={seedScore > 70 ? 'text-green-500' : seedScore > 40 ? 'text-amber-500' : 'text-red-500'} style={{ transition: "stroke-dashoffset 1s ease-out" }} />
                      </svg>
                      <span className={`absolute text-3xl font-extrabold ${seedScore > 70 ? 'text-green-500' : seedScore > 40 ? 'text-amber-500' : 'text-red-500'}`}>{seedScore}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Score vs Competition</p>
                  </div>

                  {/* VidIQ Matrix */}
                  <div className="md:col-span-2 bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-indigo-900 dark:text-indigo-200">
                      <Layers className="w-5 h-5" /> Long-Tail Clusters Matrix
                    </h3>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400 mb-4">Secondary groupings highly correlated with your seed keyword based on platform clickstreams.</p>
                    <div className="flex flex-wrap gap-2">
                      {clusters.map((cluster, i) => (
                        <button key={i} className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 rounded-lg text-sm font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors shadow-sm">
                          {cluster}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <List className="w-5 h-5 text-indigo-500" /> Top Suggested Phrases
                  </h2>
                </div>
                <KeywordTable 
                  data={filteredKeywords} 
                  selectedKws={selectedKws} 
                  toggleSelect={toggleSelect} 
                  handleSelectAll={handleSelectAll} 
                  handleOpenAiArchitect={handleOpenAiArchitect} 
                />

                <div className="mt-12 mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-500" /> Massive Question Engine
                  </h2>
                  <p className="text-sm text-gray-500">High-volume questions actively typed into YouTube and Google related to your seed term.</p>
                </div>
                <KeywordTable 
                  data={filteredQuestions} 
                  selectedKws={selectedKws} 
                  toggleSelect={toggleSelect} 
                  handleSelectAll={handleSelectAll} 
                  handleOpenAiArchitect={handleOpenAiArchitect} 
                />
              </div>
            )}
            
            {/* Competitor Gap Analysis */}
            {activeTab === 'competitor' && (compType === 'video' || compType === 'channel') && (
              <div className="animate-in fade-in">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {compType === 'video' ? 'Competitor Video Tag Extractor' : 'Competitor Channel Tag & SEO Analyzer'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Here are the keywords and tags extracted directly from the target competitor URL metadata:
                  </p>
                  {extractedTags.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No tags were found for this URL.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {extractedTags.map((t, i) => (
                        <span 
                          key={i} 
                          onClick={() => { setSearchInput(t); handleSearch({ preventDefault: () => {} }); }}
                          className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold hover:border-indigo-500 cursor-pointer transition-colors"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Structural Q&A Architecture (PAA Boxes) */}
        <section className="mt-16 mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">How do I find low competition keywords for YouTube?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                To find low competition keywords for YouTube, enter a broad seed topic into our tool and adjust the Difficulty slider below 40. The table will filter out saturated keywords, revealing highly targeted, long-tail phrases that small channels can easily rank for based on current algorithm data.
              </p>
            </article>
            <article className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">How do I extract hidden tags from a competitor's YouTube video?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Extract hidden tags from any competitor by following these steps:
              </p>
              <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-2 space-y-1">
                <li>Copy the target YouTube video URL.</li>
                <li>Navigate to the "Competitor Gap Analysis" tab.</li>
                <li>Paste the URL into the search bar.</li>
                <li>Click Analyze to view and copy the hidden metadata.</li>
              </ol>
            </article>
            <article className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Is there a free tool to see YouTube search volume trends?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Yes, this application is a completely free tool that displays YouTube search volume trends. Our data table automatically generates 12-month historical sparkline graphs for every query, allowing you to instantly identify whether a topic is steadily evergreen or experiencing a short-term viral spike.
              </p>
            </article>
            <article className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">How does the YouTube keyword difficulty score work?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                The YouTube keyword difficulty score is calculated by analyzing the top-ranking videos for a specific query. It measures the average subscriber count, view velocity, and channel authority currently dominating the search results. A score above 75 indicates high authority competition, while below 40 indicates low competition.
              </p>
            </article>
          </div>
        </section>

        {/* Internal Entity Linking Footer */}
        <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 pb-16">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Explore More Creator Tools</h2>
          <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <li>
              <a href="/youtube-comment-picker" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> YouTube Comment Picker Tool
              </a>
            </li>
            <li>
              <a href="/youtube-thumbnail-downloader" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" /> YouTube Thumbnail Downloader
              </a>
            </li>
            <li>
              <a href="/youtube-tag-extractor" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                <Tag className="w-4 h-4" /> YouTube Video Tag & Metadata Extractor
              </a>
            </li>
          </ul>
        </nav>

      </div>

      {/* TubeBuddy Workflow Checklist Sidebar */}
      <div className="w-full xl:w-[320px] bg-white dark:bg-gray-800 border-t xl:border-t-0 xl:border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto shrink-0 self-stretch">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
          <CheckCircle2 className="w-5 h-5 text-indigo-500" /> Upload Checklist
        </h3>
        <div className="space-y-4">
          {["Target Keyword in Title", "Keyword in first 200 chars of desc", "Added at least 5 relevant tags", "Custom Thumbnail Uploaded", "Added to 1+ Playlist", "End Screen & Cards Added", "Pinned Comment added", "Hearted a viewer comment"].map((task, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors leading-snug">{task}</span>
            </label>
          ))}
        </div>
        <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900 rounded-xl">
          <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium">Keep this checklist handy while uploading to maximize initial algorithm distribution.</p>
        </div>
      </div>

      {/* Bulk Action Toolbar */}
      <div className={`fixed bottom-0 left-0 right-0 p-6 flex justify-center pointer-events-none transition-transform duration-500 z-40 ${selectedKws.length > 0 ? 'translate-y-0' : 'translate-y-32'}`}>
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center gap-6 pointer-events-auto">
          <div className="flex items-center gap-3 pr-6 border-r border-gray-200 dark:border-gray-700">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm">{selectedKws.length}</div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Selected</span>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-md transition-colors" onClick={() => handleOpenAiArchitect(null)}>
            <Sparkles className="w-4 h-4" /> Bulk AI Outliner
          </button>
        </div>
      </div>

      {/* AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600"><Sparkles className="w-5 h-5" /></div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Video Architect</h2>
                  <p className="text-xs text-gray-500 font-medium">Target: <span className="text-indigo-500">"{activeKeywordForAi}"</span></p>
                </div>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex overflow-x-auto no-scrollbar px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              {['titles', 'description', 'chapters', 'shorts', 'serp', 'seo'].map((tab) => (
                <button 
                  key={tab}
                  className={`whitespace-nowrap py-4 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeAiTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveAiTab(tab)}
                >
                  {tab === 'titles' && <><List className="w-4 h-4" /> AI Titles</>}
                  {tab === 'description' && <><FileText className="w-4 h-4" /> Description</>}
                  {tab === 'chapters' && <><Video className="w-4 h-4" /> Chapters</>}
                  {tab === 'shorts' && <><Smartphone className="w-4 h-4" /> Shorts</>}
                  {tab === 'serp' && <><Eye className="w-4 h-4" /> SERP Preview</>}
                  {tab === 'seo' && <><Settings2 className="w-4 h-4" /> SEO Studio</>}
                </button>
              ))}
            </div>

            <div className="p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900/30 flex-1">
              
              {aiLoading && (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                  <Sparkles className="w-8 h-8 mb-2 text-indigo-500 animate-spin" />
                  <p className="font-medium">Gemini AI is structuring your outlines...</p>
                </div>
              )}

              {!aiLoading && aiResponseData && (
                <>
                  {activeAiTab === 'titles' && (
                    <div className="space-y-3">
                      {aiResponseData.titles.map((t, i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center justify-between group">
                          <span>{t}</span>
                          <button 
                            onClick={() => copyToClipboard(t)}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeAiTab === 'description' && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative">
                      <button 
                        onClick={() => copyToClipboard(aiResponseData.description)}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                        {aiResponseData.description}
                      </pre>
                    </div>
                  )}

                  {activeAiTab === 'chapters' && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="space-y-3">
                        {aiResponseData.chapters.map((ch, i) => (
                          <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-md text-sm">{ch.time}</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">{ch.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeAiTab === 'shorts' && (
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <Smartphone className="w-5 h-5 text-indigo-500" /> High-Retention Shorts Hooks
                        </h4>
                        <div className="space-y-3">
                          {aiResponseData.shortsHooks.map((h, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300">
                              "{h}"
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <Layers className="w-5 h-5 text-indigo-500" /> 5-Part Series split outline
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {aiResponseData.shortsSeries.map((s, i) => (
                            <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/30">
                              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{s.part}</span>
                              <h5 className="font-bold text-gray-900 dark:text-white mt-1 mb-2">{s.title}</h5>
                              <p className="text-xs text-gray-500">{s.format}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeAiTab === 'serp' && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center h-64 text-gray-500">
                      <Eye className="w-8 h-8 mb-2 text-indigo-500" />
                      <p className="font-medium text-gray-700 dark:text-gray-300">SERP Simulator is active.</p>
                      <p className="text-xs text-gray-400 mt-1">Preview how your video snippet registers visually on modern platforms.</p>
                    </div>
                  )}

                  {activeAiTab === 'seo' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-4">
                         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Draft Title</label>
                           <input type="text" value={seoStudioTitle} onChange={(e) => setSeoStudioTitle(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-gray-100" />
                           <div className="flex justify-between mt-2 text-xs text-gray-500">
                             <span>Target length: 20-65 chars</span>
                             <span className={seoStudioTitle.length > 65 ? 'text-red-500' : 'text-green-500'}>{seoStudioTitle.length} chars</span>
                           </div>
                         </div>
                         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Draft Description</label>
                           <textarea rows="5" value={seoStudioDesc} onChange={(e) => setSeoStudioDesc(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-gray-100"></textarea>
                         </div>
                      </div>
                      <div>
                        <div className="bg-indigo-600 text-white p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-lg sticky top-0">
                           <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-indigo-200">Live SEO Score</h3>
                           <span className="text-5xl font-black">{getSeoScore()}<span className="text-2xl text-indigo-300">/100</span></span>
                           <ul className="mt-6 text-left text-xs space-y-2 text-indigo-100 w-full">
                             <li className="flex items-center gap-2"><CheckCircle2 className={`w-4 h-4 ${seoStudioTitle.toLowerCase().includes(activeKeywordForAi.toLowerCase()) ? 'text-green-300' : 'text-indigo-400 opacity-50'}`}/> Target keyword in title</li>
                             <li className="flex items-center gap-2"><CheckCircle2 className={`w-4 h-4 ${seoStudioDesc.toLowerCase().includes(activeKeywordForAi.toLowerCase()) ? 'text-green-300' : 'text-indigo-400 opacity-50'}`}/> Target keyword in description</li>
                             <li className="flex items-center gap-2"><CheckCircle2 className={`w-4 h-4 ${seoStudioTitle.length > 20 && seoStudioTitle.length <= 65 ? 'text-green-300' : 'text-indigo-400 opacity-50'}`}/> Title length optimized</li>
                           </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
