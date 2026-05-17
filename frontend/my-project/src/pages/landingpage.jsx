import React from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─── Feature card data ──────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    ),
    title: "Instant Upload",
    desc:  "Drag & drop or click to upload any image. Supports JPG, PNG, WEBP.",
    color: "from-indigo-500 to-violet-600",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    title: "AI Analysis",
    desc:  "BLIP model analyzes your image and generates multiple caption variants.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    ),
    title: "Copy & Save",
    desc:  "Copy captions instantly, download results, and view your full history.",
    color: "from-purple-500 to-pink-600",
  },
];

/* ─── Steps ──────────────────────────────────────────────────────────────── */
const STEPS = [
  { num: "01", title: "Upload Your Image", desc: "Select an image from your device or drag it into the upload zone." },
  { num: "02", title: "Choose a Style",    desc: "Pick from Descriptive, Creative, Concise, or SEO-Friendly modes." },
  { num: "03", title: "Generate Caption",  desc: "Our AI model instantly returns multiple caption variants." },
  { num: "04", title: "Copy & Share",      desc: "Copy your favourite caption and use it anywhere you need." },
];

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "99%",  label: "Caption Accuracy" },
  { value: "1 M+", label: "Images Processed" },
  { value: "<2s",  label: "Average Speed" },
  { value: "4",    label: "Caption Styles" },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="flex-1 max-w-2xl animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-6 text-sm text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Powered by BLIP + FastAPI
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Generate Smart
              <br />
              <span className="gradient-text">Image Captions</span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Upload any image and let our AI create meaningful, context-aware captions
              instantly — descriptive, creative, concise, or SEO-ready.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <button
                id="hero-get-started"
                onClick={() => navigate("/signup")}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition shadow-xl shadow-indigo-500/30 hover-lift"
              >
                Get Started — Free
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-4 border border-white/20 hover:bg-white/8 rounded-xl font-semibold transition"
              >
                Try Dashboard →
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
              {STATS.map(({ value, label }) => (
                <div key={label} className="glass rounded-2xl p-4 text-center hover-lift">
                  <p className="text-2xl font-bold gradient-text">{value}</p>
                  <p className="text-gray-400 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — demo card */}
          <div className="flex-1 max-w-sm lg:max-w-md animate-float">
            <div className="glass rounded-3xl p-5 shadow-2xl shadow-indigo-900/40 animate-glow">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600"
                alt="AI demo"
                className="w-full rounded-2xl object-cover max-h-64"
              />
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-indigo-400 font-semibold uppercase tracking-widest">AI Caption</span>
                  <span className="text-xs text-gray-500">just now</span>
                </div>
                <div className="glass-dark rounded-xl p-3 border-l-4 border-indigo-500">
                  <p className="text-sm text-gray-100 leading-relaxed">
                    "A futuristic circuit board with glowing components, representing advanced AI technology."
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["Descriptive", "Creative", "Concise"].map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">Everything You Need</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              A complete pipeline from image upload to caption generation, powered by state-of-the-art AI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, title, desc, color }) => (
              <div key={title} className="glass rounded-3xl p-8 hover-lift group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-indigo-950/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">How It Works</h2>
            <p className="text-gray-400 mt-3">Four simple steps to your perfect caption.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="relative glass rounded-2xl p-6 hover-lift">
                <span className="text-5xl font-black text-indigo-500/20 absolute top-4 right-4">{num}</span>
                <h3 className="text-lg font-semibold mb-2 relative z-10">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 shadow-2xl shadow-indigo-900/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-violet-600/10 pointer-events-none" />
            <h2 className="text-4xl font-extrabold mb-4 relative z-10">
              Ready to Caption Your Images?
            </h2>
            <p className="text-gray-300 mb-8 relative z-10">
              Create your free account and start generating AI captions in seconds.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition shadow-xl shadow-indigo-500/30 hover-lift"
              >
                Create Free Account
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-4 border border-white/20 hover:bg-white/8 rounded-xl font-semibold transition"
              >
                Open Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;