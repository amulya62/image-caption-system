import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

/* ── helpers ─────────────────────────────────────────────────────────────── */
const STYLES   = ["Descriptive", "Creative", "Concise", "SEO Friendly"];
const LANGS    = ["English", "Spanish", "French", "German", "Hindi"];
const API_URL  = "/_/backend/api/caption";

function saveToHistory(entry) {
  try {
    const prev = JSON.parse(localStorage.getItem("captionHistory") || "[]");
    const next = [entry, ...prev].slice(0, 12); // keep last 12
    localStorage.setItem("captionHistory", JSON.stringify(next));
  } catch (_) {}
}

/* ── Sidebar nav item ────────────────────────────────────────────────────── */
const SideItem = ({ icon, label, to, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
        : "text-gray-400 hover:text-white hover:bg-white/8"
    }`}
  >
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {icon}
    </svg>
    {label}
  </Link>
);

/* ── Caption result card ─────────────────────────────────────────────────── */
const CaptionCard = ({ label, text, color }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={`glass rounded-2xl p-5 border-l-4 ${color} animate-fade-in`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</span>
        <button
          onClick={copy}
          className="text-xs px-3 py-1.5 glass-dark rounded-lg hover:bg-white/15 transition flex items-center gap-1.5"
        >
          {copied ? (
            <><svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-green-400">Copied!</span></>
          ) : (
            <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
          )}
        </button>
      </div>
      <p className="text-gray-100 leading-relaxed">{text}</p>
    </div>
  );
};

/* ── Dashboard ───────────────────────────────────────────────────────────── */
const Dashboard = () => {
  const [imageFile,    setImageFile]    = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [style,        setStyle]        = useState("Descriptive");
  const [language,     setLanguage]     = useState("English");
  const [loading,      setLoading]      = useState(false);
  const [result,       setResult]       = useState(null);
  const [error,        setError]        = useState("");
  const [dragActive,   setDragActive]   = useState(false);
  const [apiStatus,    setApiStatus]    = useState("checking"); // "checking" | "online" | "offline"
  const fileRef = useRef(null);

  /* ── Check backend health on mount ───────────────────────────────────────── */
  React.useEffect(() => {
    fetch("/_/backend/api/health")
      .then((r) => r.ok ? setApiStatus("online") : setApiStatus("offline"))
      .catch(() => setApiStatus("offline"));
  }, []);

  /* ── File handling ─────────────────────────────────────────────────────── */
  const loadFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, WEBP, AVIF, GIF, BMP).");
      return;
    }
    setImageFile(file);
    setResult(null);
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e) => { if (e.target.files?.[0]) loadFile(e.target.files[0]); };
  const onDrop       = (e)  => { e.preventDefault(); setDragActive(false); loadFile(e.dataTransfer.files?.[0]); };
  const onDragOver   = (e)  => { e.preventDefault(); setDragActive(true); };
  const onDragLeave  = ()   => setDragActive(false);

  /* ── Generate caption ──────────────────────────────────────────────────── */
  const generate = async () => {
    if (!imageFile) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const fd = new FormData();
      fd.append("file",     imageFile);
      fd.append("style",    style.toLowerCase().replace(" ", "_"));
      fd.append("language", language);

      // ── Step 1: network call ─────────────────────────────────────────────
      let res;
      try {
        res = await fetch(API_URL, { method: "POST", body: fd });
      } catch (_networkErr) {
        setApiStatus("offline");
        throw new Error(
          "Cannot connect to the backend. Make sure the FastAPI server is running:\n" +
          "  cd backend  →  uvicorn main:app --reload --port 8000"
        );
      }

      // ── Step 2: parse JSON safely ────────────────────────────────────────
      let data;
      try {
        data = await res.json();
      } catch (_parseErr) {
        throw new Error(
          `Server returned an unreadable response (HTTP ${res.status}). ` +
          "The backend may still be loading the BLIP model — wait a moment and try again."
        );
      }

      if (!res.ok) throw new Error(data.detail || `Server error (HTTP ${res.status})`);

      setApiStatus("online");
      setResult(data);
      // Save to history
      saveToHistory({
        id:              Date.now(),
        imagePreview,
        primaryCaption:  data.primary_caption,
        styledCaption:   data.styled_caption,
        detailedCaption: data.detailed_caption,
        style,
        language,
        timestamp:       new Date().toISOString(),
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setImageFile(null); setImagePreview(null); setResult(null); setError(""); };

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white flex">

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen glass-dark border-r border-white/8 p-6 fixed top-0 left-0 z-30">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-lg font-bold gradient-text">CaptionAI</span>
        </Link>

        <nav className="flex flex-col gap-1 flex-1">
          <SideItem active to="/dashboard" label="Dashboard"
            icon={<><rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/><rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/><rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/><rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></>}
          />
          <SideItem to="/history" label="History"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
          />
          <SideItem to="/about" label="About"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
          />
        </nav>

        <div className="border-t border-white/8 pt-5 mt-5">
          <Link to="/" className="text-xs text-gray-500 hover:text-gray-300 transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-10">
        {/* Header row */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Generate Caption</h1>
            <p className="text-gray-400 text-sm mt-1">Upload an image and get AI-powered captions instantly.</p>
          </div>
          <Link to="/history" className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition glass px-4 py-2 rounded-xl">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            History
          </Link>
        </div>

        {/* ── API Status Banner ─────────────────────────────────────────── */}
        {apiStatus === "offline" && (
          <div className="mb-6 glass rounded-2xl p-4 border border-amber-500/30 bg-amber-500/8 flex items-start gap-3 animate-fade-in">
            <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-amber-300 font-semibold text-sm">Backend not running</p>
              <p className="text-amber-400/80 text-xs mt-1">
                Start the FastAPI server first:&nbsp;
                <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-300">
                  cd backend → uvicorn main:app --reload --port 8000
                </code>
              </p>
            </div>
          </div>
        )}
        {apiStatus === "checking" && (
          <div className="mb-6 glass rounded-2xl p-3 border border-white/10 flex items-center gap-3 animate-fade-in text-sm text-gray-400">
            <svg className="animate-spin w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Checking backend connection…
          </div>
        )}
        {apiStatus === "online" && (
          <div className="mb-4 flex items-center gap-2 text-xs text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Backend connected · BLIP model ready
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* ── Upload zone ────────────────────────────────────────────── */}
          <div
            id="upload-zone"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => !imagePreview && fileRef.current?.click()}
            className={`relative glass rounded-3xl overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-300 min-h-80 border-2 border-dashed ${
              dragActive ? "drag-active border-indigo-500" : "border-white/15 hover:border-indigo-500/50"
            }`}
          >
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain max-h-96 rounded-3xl" />
                <button
                  onClick={(e) => { e.stopPropagation(); reset(); }}
                  className="absolute top-4 right-4 w-9 h-9 glass-dark rounded-xl flex items-center justify-center hover:bg-white/20 transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {imageFile && (
                  <div className="absolute bottom-4 left-4 glass-dark rounded-xl px-3 py-1.5 text-xs text-gray-300">
                    {imageFile.name} · {(imageFile.size / 1024).toFixed(0)} KB
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 p-10 text-center pointer-events-none">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center animate-float">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Drop your image here</p>
                  <p className="text-gray-400 text-sm mt-1">or click to browse — JPG, PNG, WEBP, AVIF &amp; more</p>
                </div>
                <span className="px-4 py-2 glass-dark rounded-xl text-sm text-indigo-400 border border-indigo-500/30 pointer-events-auto cursor-pointer"
                  onClick={() => fileRef.current?.click()}>
                  Browse File
                </span>
              </div>
            )}
            <input ref={fileRef} type="file" id="imageUpload" accept="image/*" className="hidden" onChange={onFileChange} />
          </div>

          {/* ── Settings + Generate ─────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-5">Caption Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Caption Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {STYLES.map((s) => (
                      <button key={s} onClick={() => setStyle(s)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition ${
                          style === s
                            ? "bg-indigo-600/25 border-indigo-500/60 text-indigo-300"
                            : "glass-dark border-white/10 text-gray-400 hover:text-white"
                        }`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                  >
                    {LANGS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <button
              id="generate-btn"
              onClick={generate}
              disabled={!imageFile || loading}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3 shadow-xl ${
                !imageFile || loading
                  ? "bg-slate-800 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/30 hover-lift"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing Image…
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Caption
                </>
              )}
            </button>

            {/* Loading skeleton */}
            {loading && (
              <div className="glass rounded-2xl p-5 space-y-3 animate-fade-in">
                <div className="shimmer-bg h-4 w-24 rounded-lg" />
                <div className="shimmer-bg h-4 rounded-lg" />
                <div className="shimmer-bg h-4 w-3/4 rounded-lg" />
              </div>
            )}
          </div>
        </div>

        {/* ── Error ──────────────────────────────────────────────────────── */}
        {error && (
          <div className="mt-6 glass rounded-2xl p-4 border border-red-500/30 bg-red-500/10 text-red-300 text-sm flex items-start gap-3 animate-fade-in">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* ── Results ────────────────────────────────────────────────────── */}
        {result && (
          <div className="mt-8 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Generated Captions</h2>
              <span className="text-xs text-gray-500 glass px-3 py-1 rounded-full">
                {result.style} · {result.language}
              </span>
            </div>
            <CaptionCard label="Primary Caption"   text={result.primary_caption}   color="border-indigo-500" />
            <CaptionCard label={`${result.style} Style`} text={result.styled_caption}    color="border-violet-500" />
            <CaptionCard label="Creative Variant"   text={result.detailed_caption}  color="border-purple-500" />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
