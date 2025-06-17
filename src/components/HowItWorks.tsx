
export const HowItWorks = () => {
  return (
    <div className="max-w-6xl mx-auto mt-24 mb-16">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        How Our YouTube Playlist Calculator Works
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">1</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Enter Playlist URL</h3>
          <p className="text-gray-300 leading-relaxed">
            Simply paste your YouTube playlist URL into our calculator. Our system automatically fetches 
            all video information including duration, titles, and metadata.
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">2</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Customize Settings</h3>
          <p className="text-gray-300 leading-relaxed">
            Set your preferred playback speed, select video ranges, and configure analysis parameters 
            to match your learning style and available time.
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Get Results</h3>
          <p className="text-gray-300 leading-relaxed">
            Receive detailed analysis including adjusted watch times, speed comparisons, and 
            comprehensive playlist information to plan your learning schedule effectively.
          </p>
        </div>
      </div>
    </div>
  );
};
