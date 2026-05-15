import React, { useState } from "react";

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        setCaption(""); // Reset caption when new image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        setCaption("");
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCaption = () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setCaption("A beautiful scenery with mountains and a clear sky captured during sunset.");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black px-6 py-12 text-white flex flex-col items-center">
      <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center">
        Generate Captions
      </h1>
      <p className="text-gray-400 text-center mb-10 max-w-lg">
        Upload an image below to instantly generate a descriptive, context-aware AI caption.
      </p>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Upload Section */}
        <div 
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col justify-center items-center h-96 relative border-dashed hover:bg-white/20 transition cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('imageUpload').click()}
        >
          {selectedImage ? (
            <img 
              src={selectedImage} 
              alt="Uploaded Preview" 
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="flex flex-col items-center text-center pointer-events-none">
              <svg className="w-16 h-16 text-indigo-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              <p className="text-lg font-semibold">Click or Drag & Drop Image</p>
              <p className="text-sm text-gray-400 mt-2">Supports JPG, PNG, WEBP</p>
            </div>
          )}
          
          <input 
            type="file" 
            id="imageUpload" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange}
          />
        </div>

        {/* Action & Result Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-300">Analysis Settings</h3>
            
            <div className="space-y-4">
               <div>
                  <label className="text-sm text-gray-400 block mb-2">Style</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                    <option>Descriptive</option>
                    <option>Creative</option>
                    <option>Concise</option>
                    <option>SEO Friendly</option>
                  </select>
               </div>
               
               <div>
                  <label className="text-sm text-gray-400 block mb-2">Language</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
               </div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={(e) => { e.stopPropagation(); generateCaption(); }}
              disabled={!selectedImage || isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg transition duration-300 flex justify-center items-center gap-2 
                ${(!selectedImage || isProcessing) 
                  ? 'bg-slate-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Generate Caption'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {(caption || isProcessing) && (
        <div className="w-full max-w-4xl mt-8">
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            
            <div className="flex justify-between items-start mb-4 pl-4">
              <h3 className="text-xl font-bold text-white">Generated Output</h3>
              {caption && (
                <button 
                  className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition border border-white/10"
                  onClick={() => navigator.clipboard.writeText(caption)}
                >
                  Copy
                </button>
              )}
            </div>
            
            <div className="pl-4 min-h-[80px] flex items-center">
              {isProcessing ? (
                <div className="space-y-3 w-full">
                  <div className="h-4 bg-white/10 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded animate-pulse w-1/2"></div>
                </div>
              ) : (
                <p className="text-lg text-indigo-100 leading-relaxed font-medium">
                  {caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
