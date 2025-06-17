
import { Timer, Users, Star, TrendingUp, Target } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center items-center gap-3 mb-6">
        <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl shadow-2xl">
          <Timer className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          YouTube Playlist Time Calculator
        </h1>
      </div>
      <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
        The ultimate tool for students, professionals, and content creators to optimize their learning time. 
        Calculate exact watch times for YouTube playlists with custom playback speeds and smart time management features.
      </p>
      
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-400">500K+</div>
          <div className="text-gray-300">Playlists Analyzed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-pink-400">2M+</div>
          <div className="text-gray-300">Hours Calculated</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400">95%</div>
          <div className="text-gray-300">Time Saved</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">100K+</div>
          <div className="text-gray-300">Happy Users</div>
        </div>
      </div>
    </div>
  );
};
