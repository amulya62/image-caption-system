import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white">
      <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            AI Powered Caption Generator
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            Generate Smart
            <span className="text-indigo-400"> Image Captions</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Upload any image and let AI create meaningful, context-aware
            captions instantly. Fast, accurate, and built for modern creators.
          </p>

          <div className="flex gap-4 mt-10">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition">
              Get Started
            </button>

            <button className="px-8 py-4 border border-white/20 hover:bg-white/10 rounded-xl font-semibold transition">
              Learn More
            </button>
          </div>

          <div className="flex gap-6 mt-12">
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
              <h2 className="text-3xl font-bold">99%</h2>
              <p className="text-gray-400 text-sm">Caption Accuracy</p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
              <h2 className="text-3xl font-bold">1M+</h2>
              <p className="text-gray-400 text-sm">Images Processed</p>
            </div>
          </div>
        </div>

        {/* Right Image Card */}
        <div className="mt-16 lg:mt-0">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475"
              alt="AI"
              className="w-[450px] rounded-2xl"
            />

            <div className="mt-4">
              <p className="text-gray-300 text-sm">Generated Caption</p>

              <div className="mt-2 bg-black/30 p-4 rounded-xl border border-white/10">
                <p className="text-white">
                  "A futuristic AI system analyzing visual content with deep
                  learning technology."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;