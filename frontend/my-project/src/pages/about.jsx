import React from "react";
import { Link } from "react-router-dom";

const TECH = [
  { name: "React 19",       desc: "UI framework",          color: "from-cyan-500 to-blue-600",     icon: "⚛️" },
  { name: "Vite",           desc: "Build tool",            color: "from-yellow-500 to-orange-500", icon: "⚡" },
  { name: "Tailwind CSS",   desc: "Utility-first CSS",     color: "from-teal-500 to-cyan-600",     icon: "🎨" },
  { name: "FastAPI",        desc: "Python backend",        color: "from-green-500 to-emerald-600", icon: "🚀" },
  { name: "BLIP",           desc: "AI captioning model",   color: "from-indigo-500 to-violet-600", icon: "🤖" },
  { name: "PyTorch",        desc: "Deep learning engine",  color: "from-orange-500 to-red-600",    icon: "🔥" },
];

const FEATURES = [
  { title: "Drag & Drop Upload",    desc: "Effortlessly upload images by dragging them in or clicking to browse." },
  { title: "3 Caption Variants",    desc: "Get primary, styled, and detailed captions for every image." },
  { title: "4 Caption Styles",      desc: "Choose from Descriptive, Creative, Concise, or SEO Friendly modes." },
  { title: "Caption History",       desc: "All your generated captions are saved locally in your browser." },
  { title: "Copy to Clipboard",     desc: "Copy any caption with a single click — no hassle." },
  { title: "Real AI Model",         desc: "Powered by Salesforce BLIP running on a local FastAPI server." },
];

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white pt-24 pb-16 px-6">
    <div className="max-w-5xl mx-auto">

      {/* Hero */}
      <div className="text-center mb-16 animate-slide-up">
        <div className="inline-flex w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 items-center justify-center mb-6 shadow-2xl shadow-indigo-500/30 animate-glow mx-auto">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold mb-4 gradient-text">About CaptionAI</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          CaptionAI is a full-stack image captioning application that combines a React frontend
          with a FastAPI backend powered by the Salesforce BLIP model — turning any image into
          intelligent, context-aware captions in seconds.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link to="/dashboard"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition shadow-lg shadow-indigo-500/25 hover-lift">
            Try the App
          </Link>
          <a href="https://github.com/salesforce/BLIP" target="_blank" rel="noreferrer"
            className="px-6 py-3 glass hover:bg-white/10 rounded-xl font-semibold transition border border-white/15">
            BLIP on GitHub ↗
          </a>
        </div>
      </div>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ title, desc }) => (
            <div key={title} className="glass rounded-2xl p-5 hover-lift">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TECH.map(({ name, desc, color, icon }) => (
            <div key={name} className="glass rounded-2xl p-5 hover-lift text-center">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg`}>
                {icon}
              </div>
              <p className="font-semibold">{name}</p>
              <p className="text-gray-400 text-xs mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Architecture</h2>
        <div className="glass rounded-3xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {[
              { step: "1", label: "Browser",   detail: "React + Vite frontend",      icon: "🌐" },
              { step: "→", label: "",           detail: "HTTP POST /api/caption",     icon: "" },
              { step: "2", label: "FastAPI",    detail: "Python backend server",      icon: "⚙️" },
              { step: "→", label: "",           detail: "image → tensor",             icon: "" },
              { step: "3", label: "BLIP Model", detail: "Salesforce caption model",   icon: "🤖" },
            ].map(({ step, label, detail, icon }, i) =>
              step === "→" ? (
                <div key={i} className="text-gray-500 text-3xl hidden md:block">→</div>
              ) : (
                <div key={i} className="flex-1 text-center glass-dark rounded-2xl p-5">
                  <div className="text-3xl mb-2">{icon}</div>
                  <p className="font-bold text-white">{label}</p>
                  <p className="text-xs text-gray-400 mt-1">{detail}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center glass rounded-3xl p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-violet-600/10 pointer-events-none" />
        <h2 className="text-3xl font-bold mb-3 relative z-10">Ready to Try It?</h2>
        <p className="text-gray-300 mb-6 relative z-10">Head to the dashboard and upload your first image.</p>
        <Link to="/dashboard"
          className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition shadow-xl shadow-indigo-500/30 hover-lift relative z-10">
          Open Dashboard →
        </Link>
      </div>
    </div>
  </div>
);

export default About;
