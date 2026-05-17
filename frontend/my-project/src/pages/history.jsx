import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const History = () => {
  const [items,  setItems]  = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("captionHistory") || "[]");
      setItems(stored);
    } catch (_) { setItems([]); }
  }, []);

  const deleteItem = (id) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    localStorage.setItem("captionHistory", JSON.stringify(next));
  };

  const clearAll = () => {
    setItems([]);
    localStorage.removeItem("captionHistory");
  };

  const filtered = items.filter((i) =>
    (i.primaryCaption || "").toLowerCase().includes(search.toLowerCase()) ||
    (i.style || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white flex">

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen glass-dark border-r border-white/8 p-6 fixed top-0 left-0 z-30">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-lg font-bold gradient-text">CaptionAI</span>
        </Link>

        <nav className="flex flex-col gap-1 flex-1">
          {[
            { to: "/dashboard", label: "Dashboard", icon: <><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={2}/><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth={2}/><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth={2}/><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth={2}/></> },
            { to: "/history",   label: "History",   active: true, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
            { to: "/about",     label: "About",     icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
          ].map(({ to, label, icon, active }) => (
            <Link key={to} to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30" : "text-gray-400 hover:text-white hover:bg-white/8"
              }`}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/8 pt-5">
          <Link to="/" className="text-xs text-gray-500 hover:text-gray-300 transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Caption History</h1>
            <p className="text-gray-400 text-sm mt-1">{items.length} image{items.length !== 1 ? "s" : ""} captioned</p>
          </div>
          <div className="flex gap-3">
            {items.length > 0 && (
              <button onClick={clearAll}
                className="text-sm px-4 py-2 rounded-xl glass-dark border border-red-500/30 text-red-400 hover:bg-red-500/10 transition">
                Clear All
              </button>
            )}
            <Link to="/dashboard"
              className="text-sm px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-lg shadow-indigo-500/25">
              + New Caption
            </Link>
          </div>
        </div>

        {/* Search */}
        {items.length > 0 && (
          <div className="mb-6 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search captions or styles…"
              className="w-full pl-11 pr-4 py-3 rounded-xl glass-dark text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-white/8"
            />
          </div>
        )}

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 animate-float">
              <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No history yet</h2>
            <p className="text-gray-400 text-sm mb-6">Go to the dashboard and generate your first caption!</p>
            <Link to="/dashboard" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition shadow-lg shadow-indigo-500/25">
              Go to Dashboard
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-16">No results matching "{search}"</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <div key={item.id} className="glass rounded-2xl overflow-hidden hover-lift group animate-fade-in">
                {/* Thumbnail */}
                {item.imagePreview && (
                  <div className="h-44 overflow-hidden bg-black/30">
                    <img src={item.imagePreview} alt="captioned" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}

                <div className="p-4">
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 text-xs rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{item.style}</span>
                      <span className="px-2 py-0.5 text-xs rounded-lg glass-dark text-gray-400">{item.language}</span>
                    </div>
                    <button onClick={() => deleteItem(item.id)}
                      className="w-7 h-7 rounded-lg glass-dark flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 text-gray-500 transition opacity-0 group-hover:opacity-100">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm text-gray-200 leading-relaxed line-clamp-3 mb-3">
                    "{item.primaryCaption}"
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString()} · {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(item.primaryCaption)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
