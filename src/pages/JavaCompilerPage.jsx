import React, { useState, useRef, useCallback } from 'react';
import SEO from '../components/SEO';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Code2,
  ChevronRight,
  Trash2,
  Download,
  Upload,
  BookOpen,
  Zap,
  AlertCircle,
  CheckCircle2,
  Clock,
  Cpu,
} from 'lucide-react';

/* ── Default starter code ── */
const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Let's do some basic calculations
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("Sum of 1 to 10 = " + sum);
        
        // String manipulation
        String message = "Java Online Compiler";
        System.out.println("Length: " + message.length());
        System.out.println("Uppercase: " + message.toUpperCase());
    }
}`;

/* ── Code snippet templates ── */
const TEMPLATES = [
  {
    id: 'hello',
    label: 'Hello World',
    icon: '👋',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    id: 'fibonacci',
    label: 'Fibonacci',
    icon: '🔢',
    code: `public class Main {
    public static void main(String[] args) {
        int n = 10;
        System.out.println("Fibonacci series up to " + n + " terms:");
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            System.out.print(a + " ");
            int temp = a + b;
            a = b;
            b = temp;
        }
        System.out.println();
    }
}`,
  },
  {
    id: 'sorting',
    label: 'Bubble Sort',
    icon: '🔃',
    code: `public class Main {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.print("Before: ");
        for (int x : arr) System.out.print(x + " ");
        bubbleSort(arr);
        System.out.print("\\nAfter:  ");
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}`,
  },
  {
    id: 'oop',
    label: 'OOP Example',
    icon: '🏗️',
    code: `public class Main {
    static class Animal {
        private String name;
        private String sound;

        public Animal(String name, String sound) {
            this.name = name;
            this.sound = sound;
        }

        public void speak() {
            System.out.println(name + " says: " + sound);
        }

        public String getName() { return name; }
    }

    static class Dog extends Animal {
        public Dog(String name) {
            super(name, "Woof!");
        }

        public void fetch() {
            System.out.println(getName() + " fetches the ball!");
        }
    }

    public static void main(String[] args) {
        Animal cat = new Animal("Cat", "Meow!");
        Dog dog = new Dog("Buddy");
        
        cat.speak();
        dog.speak();
        dog.fetch();
    }
}`,
  },
  {
    id: 'recursion',
    label: 'Recursion',
    icon: '🔄',
    code: `public class Main {
    static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    static int power(int base, int exp) {
        if (exp == 0) return 1;
        return base * power(base, exp - 1);
    }

    public static void main(String[] args) {
        System.out.println("Factorials:");
        for (int i = 1; i <= 8; i++) {
            System.out.println(i + "! = " + factorial(i));
        }
        System.out.println("\\n2^10 = " + power(2, 10));
    }
}`,
  },
  {
    id: 'collections',
    label: 'Collections',
    icon: '📦',
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // ArrayList
        List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry", "Date"));
        System.out.println("Fruits: " + fruits);
        fruits.sort(Comparator.naturalOrder());
        System.out.println("Sorted: " + fruits);

        // HashMap
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        
        System.out.println("\\nScores:");
        scores.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .forEach(e -> System.out.println("  " + e.getKey() + ": " + e.getValue()));
    }
}`,
  },
];

/* ── Simple Java syntax highlighter ── */
const KEYWORDS = new Set([
  'public','private','protected','static','final','class','interface',
  'extends','implements','new','return','void','int','long','double',
  'float','boolean','char','byte','short','String','for','while',
  'do','if','else','switch','case','break','continue','import',
  'package','try','catch','finally','throw','throws','null','true',
  'false','this','super','instanceof','abstract','synchronized','enum',
]);

function highlightJava(code) {
  const lines = code.split('\n');
  return lines.map((line, lineIdx) => {
    const parts = [];
    let i = 0;

    while (i < line.length) {
      // Single-line comment
      if (line[i] === '/' && line[i + 1] === '/') {
        parts.push(<span key={`c${i}`} style={{ color: '#5c6370' }}>{line.slice(i)}</span>);
        i = line.length;
        continue;
      }
      // String literal
      if (line[i] === '"') {
        let j = i + 1;
        while (j < line.length && !(line[j] === '"' && line[j-1] !== '\\')) j++;
        parts.push(<span key={`s${i}`} style={{ color: '#98c379' }}>{line.slice(i, j + 1)}</span>);
        i = j + 1;
        continue;
      }
      // Number
      if (/\d/.test(line[i]) && (i === 0 || /\W/.test(line[i-1]))) {
        let j = i;
        while (j < line.length && /[\d.]/.test(line[j])) j++;
        parts.push(<span key={`n${i}`} style={{ color: '#d19a66' }}>{line.slice(i, j)}</span>);
        i = j;
        continue;
      }
      // Identifier / keyword
      if (/[a-zA-Z_$]/.test(line[i])) {
        let j = i;
        while (j < line.length && /\w/.test(line[j])) j++;
        const word = line.slice(i, j);
        if (KEYWORDS.has(word)) {
          parts.push(<span key={`k${i}`} style={{ color: '#c678dd' }}>{word}</span>);
        } else if (/^[A-Z]/.test(word)) {
          parts.push(<span key={`t${i}`} style={{ color: '#e5c07b' }}>{word}</span>);
        } else {
          parts.push(<span key={`i${i}`}>{word}</span>);
        }
        i = j;
        continue;
      }
      // Punctuation
      if ('{}()[];,'.includes(line[i])) {
        parts.push(<span key={`p${i}`} style={{ color: '#abb2bf' }}>{line[i]}</span>);
      } else {
        parts.push(<span key={`x${i}`}>{line[i]}</span>);
      }
      i++;
    }

    return (
      <div key={lineIdx} style={{ display: 'flex', minHeight: '1.7em' }}>
        <span style={{
          display: 'inline-block', width: '40px', minWidth: '40px',
          textAlign: 'right', paddingRight: '12px', color: '#4b5263',
          userSelect: 'none', fontFamily: 'inherit', fontSize: 'inherit',
        }}>{lineIdx + 1}</span>
        <span style={{ flex: 1, fontFamily: 'inherit', fontSize: 'inherit' }}>{parts}</span>
      </div>
    );
  });
}

/* ── Status badge ── */
function StatusBadge({ status }) {
  const configs = {
    success:       { icon: CheckCircle2, label: 'Success',       color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
    compile_error: { icon: AlertCircle,  label: 'Compile Error', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
    runtime_error: { icon: AlertCircle,  label: 'Runtime Error', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  };
  const cfg = configs[status];
  if (!cfg) return null;
  const Icon = cfg.icon;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:'5px',
      padding:'3px 10px', borderRadius:'9999px',
      background: cfg.bg, color: cfg.color,
      fontSize:'12px', fontWeight:'600',
    }}>
      <Icon size={13}/>{cfg.label}
    </span>
  );
}

/* ── Toolbar icon button ── */
function ToolbarBtn({ onClick, title, icon: Icon, label, color }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        padding: '5px 9px', borderRadius: '6px',
        border: '1px solid var(--border)', background: 'transparent',
        color: color || 'var(--text-muted)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '4px',
        fontSize: '12px', fontWeight: '500',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-tertiary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = color || 'var(--text-muted)'; }}
    >
      <Icon size={13}/>{label && <span>{label}</span>}
    </button>
  );
}

export default function JavaCompilerPage() {
  const [code, setCode]           = useState(DEFAULT_CODE);
  const [stdin, setStdin]         = useState('');
  const [showStdin, setShowStdin] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState(null);
  const [apiError, setApiError]   = useState(null);
  const [copied, setCopied]       = useState(false);
  const [copiedOut, setCopiedOut] = useState(false);
  const [activeTab, setActiveTab] = useState('output');
  const [execTime, setExecTime]   = useState(null);
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  const syncScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const handleRun = async () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    setApiError(null);
    setResult(null);
    const t0 = Date.now();
    try {
      const res = await fetch('/api/compile/java', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, stdin }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Compilation failed');
      setResult(data);
      setExecTime(Date.now() - t0);
      setActiveTab(data.status === 'compile_error' ? 'error' : 'output');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const next = code.slice(0, start) + '    ' + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 4; });
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
    }
  };

  const copyCode = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const copyOutput = () => {
    navigator.clipboard.writeText(result?.stdout || result?.stderr || '');
    setCopiedOut(true); setTimeout(() => setCopiedOut(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Main.java'; a.click();
    URL.revokeObjectURL(url);
  };

  const uploadCode = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.java,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => setCode(ev.target.result);
      reader.readAsText(file);
    };
    input.click();
  };

  const outputText = result?.stdout || (result?.status === 'success' ? '' : '');
  const errorText  = result?.compileOutput || result?.stderr || '';
  const hasOutput  = !!outputText;
  const hasError   = !!errorText;

  const panelStyle = {
    background: '#1a1d27',
    color: '#abb2bf',
    fontFamily: '"Fira Code","JetBrains Mono","Cascadia Code",monospace',
    fontSize: '13.5px',
    lineHeight: '1.7',
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 60px' }}>
      <SEO
        title="Java Online Compiler – Write, Run & Test Java Code Free"
        description="Compile and run Java code online for free. No setup needed. Supports Java 17+, OOP, collections, algorithms, and more. Instant output in your browser."
        url="/java-compiler"
      />

      {/* ── Hero ── */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: 'var(--primary-light)', color: 'var(--primary)',
          padding: '5px 14px', borderRadius: '9999px',
          fontSize: '12px', fontWeight: '700', letterSpacing: '0.04em',
          marginBottom: '14px', textTransform: 'uppercase',
        }}>
          <Cpu size={13}/> Online Java Compiler
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: '800', marginBottom: '10px', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          Java Online Compiler
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '520px', margin: '0 auto', lineHeight: '1.6' }}>
          Write, compile, and execute Java code directly in your browser — instant results, no setup required.
        </p>
      </div>

      {/* ── Template chips ── */}
      <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'20px', alignItems:'center' }}>
        <span style={{ fontSize:'13px', fontWeight:'600', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'5px' }}>
          <BookOpen size={13}/> Templates:
        </span>
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => { setCode(t.code); setResult(null); setApiError(null); }}
            style={{
              display:'inline-flex', alignItems:'center', gap:'5px',
              padding:'5px 13px', borderRadius:'9999px',
              border:'1px solid var(--border)', background:'var(--surface)',
              color:'var(--text-secondary)', fontSize:'12px', fontWeight:'500',
              cursor:'pointer', transition:'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary)'; e.currentTarget.style.color='var(--primary)'; e.currentTarget.style.background='var(--primary-light)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-secondary)'; e.currentTarget.style.background='var(--surface)'; }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Two-panel layout ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'18px', alignItems:'start' }}>

        {/* ════ LEFT: EDITOR ════ */}
        <div style={{ border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', overflow:'hidden', boxShadow:'var(--shadow-md)' }}>

          {/* Editor header bar */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{ display:'flex', gap:'5px' }}>
                {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => <div key={i} style={{ width:'11px', height:'11px', borderRadius:'50%', background:c }}/>)}
              </div>
              <span style={{ fontSize:'13px', fontWeight:'600', color:'var(--text-secondary)', display:'flex', alignItems:'center', gap:'5px' }}>
                <Code2 size={13}/> Main.java
              </span>
            </div>
            <div style={{ display:'flex', gap:'4px' }}>
              <ToolbarBtn onClick={uploadCode} title="Upload .java file" icon={Upload} label="Upload"/>
              <ToolbarBtn onClick={downloadCode} title="Download as Main.java" icon={Download} label="Save"/>
              <ToolbarBtn onClick={copyCode} title="Copy code" icon={copied ? Check : Copy} label={copied ? 'Copied!' : 'Copy'} color={copied ? '#22c55e' : undefined}/>
              <ToolbarBtn onClick={() => { setCode(''); setResult(null); setApiError(null); }} title="Clear editor" icon={Trash2}/>
            </div>
          </div>

          {/* Code editor (highlight overlay + transparent textarea) */}
          <div style={{ position:'relative', height:'460px', overflow:'hidden' }}>
            <pre
              ref={highlightRef}
              aria-hidden="true"
              style={{
                ...panelStyle,
                position:'absolute', inset:0, margin:0,
                padding:'14px 14px 14px 0',
                overflow:'auto', whiteSpace:'pre',
                pointerEvents:'none', userSelect:'none',
              }}
            >
              {highlightJava(code)}
            </pre>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={syncScroll}
              spellCheck={false}
              autoCapitalize="none"
              autoComplete="off"
              aria-label="Java code editor"
              style={{
                position:'absolute', inset:0,
                margin:0, padding:'14px 14px 14px 54px',
                ...panelStyle,
                background:'transparent',
                color:'transparent',
                caretColor:'#528bff',
                border:'none', outline:'none',
                resize:'none', overflow:'auto',
                whiteSpace:'pre', overflowWrap:'normal',
                tabSize:4, zIndex:2,
              }}
            />
          </div>

          {/* stdin section */}
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', background:'#141720' }}>
            <button
              onClick={() => setShowStdin(!showStdin)}
              style={{
                width:'100%', padding:'9px 14px',
                background:'none', border:'none', cursor:'pointer',
                color:'#6b7280', fontSize:'13px', fontWeight:'500',
                display:'flex', alignItems:'center', gap:'5px', textAlign:'left',
              }}
            >
              <ChevronRight size={14} style={{ transform: showStdin ? 'rotate(90deg)' : 'none', transition:'0.2s' }}/>
              Standard Input (stdin)
            </button>
            {showStdin && (
              <textarea
                value={stdin}
                onChange={e => setStdin(e.target.value)}
                placeholder="Enter input for your program here..."
                rows={3}
                style={{
                  width:'100%', padding:'10px 14px',
                  fontFamily:'"Fira Code",monospace', fontSize:'13px',
                  background:'#141720', border:'none', borderTop:'1px solid rgba(255,255,255,0.06)',
                  color:'#abb2bf', outline:'none', resize:'vertical',
                  display:'block',
                }}
              />
            )}
          </div>

          {/* Run button */}
          <div style={{ padding:'14px', background:'var(--bg-secondary)', borderTop:'1px solid var(--border)', display:'flex', gap:'10px', alignItems:'center' }}>
            <button
              onClick={handleRun}
              disabled={loading || !code.trim()}
              className="btn btn-primary"
              style={{ flex:1, fontSize:'15px', fontWeight:'700', height:'46px' }}
            >
              {loading ? (
                <><span className="btn-spinner" role="status" aria-label="Compiling"/> Compiling...</>
              ) : (
                <><Play size={16} fill="currentColor"/> Run Code <span style={{ fontSize:'11px', opacity:0.65, fontWeight:'400', marginLeft:'2px' }}>Ctrl+↵</span></>
              )}
            </button>
            <button
              onClick={() => { setResult(null); setApiError(null); setExecTime(null); }}
              className="btn btn-ghost"
              title="Clear output"
              style={{ height:'46px', width:'46px', padding:0 }}
            >
              <RotateCcw size={16}/>
            </button>
          </div>
        </div>

        {/* ════ RIGHT: OUTPUT ════ */}
        <div style={{ border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', overflow:'hidden', boxShadow:'var(--shadow-md)' }}>

          {/* Output header bar */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ display:'flex', gap:'5px' }}>
                {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => <div key={i} style={{ width:'11px', height:'11px', borderRadius:'50%', background:c }}/>)}
              </div>
              <span style={{ fontSize:'13px', fontWeight:'600', color:'var(--text-secondary)', display:'flex', alignItems:'center', gap:'5px', marginLeft:'6px' }}>
                <Terminal size={13}/> Output
              </span>
              {result && <StatusBadge status={result.status}/>}
            </div>
            <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
              {execTime !== null && (
                <span style={{ fontSize:'12px', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'4px' }}>
                  <Zap size={11}/> {execTime}ms
                </span>
              )}
              {result && (
                <ToolbarBtn
                  onClick={copyOutput}
                  title="Copy output"
                  icon={copiedOut ? Check : Copy}
                  label={copiedOut ? 'Copied!' : 'Copy'}
                  color={copiedOut ? '#22c55e' : undefined}
                />
              )}
            </div>
          </div>

          {/* Tab strip (only when there's content) */}
          {result && (
            <div style={{ display:'flex', background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)', padding:'0 14px' }}>
              {[
                { id:'output', label:'Output' },
                ...(hasError ? [{ id:'error', label: result.status === 'compile_error' ? 'Compile Errors' : 'Runtime Errors', badge: true }] : []),
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    padding:'8px 12px', border:'none', background:'transparent',
                    cursor:'pointer', fontSize:'13px', fontWeight:'600',
                    color: activeTab === t.id ? 'var(--primary)' : 'var(--text-muted)',
                    borderBottom: activeTab === t.id ? '2px solid var(--primary)' : '2px solid transparent',
                    marginBottom:'-1px', transition:'all 0.15s', display:'flex', alignItems:'center', gap:'5px',
                  }}
                >
                  {t.label}
                  {t.badge && <span style={{ padding:'1px 6px', borderRadius:'9999px', background:'rgba(239,68,68,0.15)', color:'#ef4444', fontSize:'11px' }}>!</span>}
                </button>
              ))}
            </div>
          )}

          {/* Output content area */}
          <div style={{ height:'460px', overflow:'auto', position:'relative', ...panelStyle, background:'#1a1d27' }}>
            {!result && !apiError && !loading && (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:'14px', color:'#4b5263' }}>
                <Terminal size={44} style={{ opacity:0.3 }}/>
                <div style={{ textAlign:'center' }}>
                  <p style={{ color:'#6b7280', fontWeight:'600', marginBottom:'5px', fontFamily:'var(--font-main)' }}>No output yet</p>
                  <p style={{ fontSize:'13px', fontFamily:'var(--font-main)', color:'#4b5263' }}>
                    Click <strong style={{ color:'#abb2bf' }}>Run Code</strong> or press{' '}
                    <kbd style={{ padding:'2px 7px', borderRadius:'4px', border:'1px solid #2d3748', background:'#1e293b', fontSize:'12px', color:'#abb2bf', fontFamily:'monospace' }}>Ctrl+Enter</kbd>
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:'14px', color:'#6b7280' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', border:'3px solid #2d3748', borderTopColor:'#528bff', animation:'spin 0.8s linear infinite' }}/>
                <p style={{ fontSize:'14px', fontWeight:'500', fontFamily:'var(--font-main)' }}>Compiling & running your code...</p>
              </div>
            )}

            {apiError && !loading && (
              <div style={{ padding:'20px' }}>
                <div style={{
                  display:'flex', gap:'10px', alignItems:'flex-start',
                  padding:'14px 16px', borderRadius:'8px',
                  background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.25)', color:'#ef4444',
                }}>
                  <AlertCircle size={16} style={{ flexShrink:0, marginTop:'2px' }}/>
                  <span style={{ fontSize:'13px', lineHeight:'1.5', fontFamily:'var(--font-main)' }}>{apiError}</span>
                </div>
              </div>
            )}

            {result && !loading && activeTab === 'output' && (
              <pre style={{ margin:0, padding:'18px', ...panelStyle, background:'transparent', color: hasOutput ? '#98c379' : '#4b5263', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>
                {hasOutput ? outputText : <em style={{ fontStyle:'italic', color:'#4b5263' }}>(No console output)</em>}
              </pre>
            )}

            {result && !loading && activeTab === 'error' && (
              <pre style={{ margin:0, padding:'18px', ...panelStyle, background:'transparent', color:'#ef4444', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>
                {errorText || <em style={{ fontStyle:'italic', color:'#4b5263' }}>(No errors)</em>}
              </pre>
            )}
          </div>

          {/* Footer metadata */}
          {result && (
            <div style={{ padding:'9px 14px', background:'var(--bg-secondary)', borderTop:'1px solid var(--border)', display:'flex', gap:'16px', flexWrap:'wrap', fontSize:'12px', color:'var(--text-muted)' }}>
              {result.language && <span>Runtime: <strong style={{ color:'var(--text-secondary)' }}>{result.language} {result.version}</strong></span>}
              {result.exitCode !== null && result.exitCode !== undefined && (
                <span>Exit code: <strong style={{ color: result.exitCode === 0 ? '#22c55e' : '#ef4444' }}>{result.exitCode}</strong></span>
              )}
              {execTime !== null && <span>Elapsed: <strong style={{ color:'var(--text-secondary)' }}>{execTime}ms</strong></span>}
            </div>
          )}
        </div>
      </div>

      {/* ── Keyboard shortcuts strip ── */}
      <div style={{ marginTop:'20px', display:'flex', gap:'18px', justifyContent:'center', flexWrap:'wrap' }}>
        {[
          { key:'Ctrl+Enter', action:'Run code' },
          { key:'Tab', action:'Indent 4 spaces' },
          { key:'Ctrl+A', action:'Select all' },
        ].map(s => (
          <div key={s.key} style={{ display:'flex', alignItems:'center', gap:'7px', fontSize:'13px', color:'var(--text-muted)' }}>
            <kbd style={{ padding:'3px 8px', borderRadius:'5px', border:'1px solid var(--border)', background:'var(--bg-secondary)', fontSize:'12px', fontFamily:'monospace', color:'var(--text-secondary)' }}>{s.key}</kbd>
            {s.action}
          </div>
        ))}
      </div>

      {/* ── Feature cards ── */}
      <div className="grid-cols-3" style={{ marginTop:'40px', gap:'16px' }}>
        {[
          { icon:'⚡', title:'Instant Compilation', desc:'Your code runs on a secure cloud sandbox with Java 17+ support. Results appear within seconds.' },
          { icon:'🔒', title:'Secure & Sandboxed', desc:'Every execution is isolated. No code is stored on our servers — your work stays private.' },
          { icon:'📥', title:'stdin Support', desc:'Provide standard input to programs that use Scanner or BufferedReader for interactive testing.' },
          { icon:'📚', title:'6 Starter Templates', desc:'Jump-start with Hello World, Fibonacci, Sorting, OOP, Recursion, and Collections examples.' },
          { icon:'💾', title:'Save & Upload', desc:'Download your code as a .java file or upload existing files directly into the editor.' },
          { icon:'🎨', title:'Syntax Highlighting', desc:'Real-time syntax highlighting with color-coded keywords, strings, numbers, and class names.' },
        ].map(f => (
          <div key={f.title} className="card" style={{ padding:'22px 18px', textAlign:'center' }}>
            <div style={{ fontSize:'26px', marginBottom:'8px' }}>{f.icon}</div>
            <h3 style={{ fontSize:'14px', fontWeight:'700', marginBottom:'7px', color:'var(--text-primary)' }}>{f.title}</h3>
            <p style={{ fontSize:'13px', color:'var(--text-secondary)', lineHeight:'1.55' }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .java-compiler-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
