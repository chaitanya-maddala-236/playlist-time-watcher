import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Clock, Play, Youtube, Calculator, Zap, Settings, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { youtubeService, type AnalysisResult } from "@/services/youtubeService";
import { ApiKeyInput } from "@/components/ApiKeyInput";

const Index = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [startVideo, setStartVideo] = useState("1");
  const [endVideo, setEndVideo] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState("1");
  const [customSpeed, setCustomSpeed] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const { toast } = useToast();

  const handleApiKeySet = (apiKey: string) => {
    youtubeService.setApiKey(apiKey);
    setHasApiKey(true);
  };

  const handleAnalyze = async () => {
    if (!hasApiKey) {
      toast({
        title: "API Key Required",
        description: "Please wait for API key to be configured.",
        variant: "destructive",
      });
      return;
    }

    if (!playlistUrl.trim()) {
      toast({
        title: "Please enter a playlist URL",
        description: "You need to provide a YouTube playlist URL to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const speed = customSpeed ? parseFloat(customSpeed) : parseFloat(playbackSpeed);
      const analysisResult = await youtubeService.analyzePlaylist(
        playlistUrl,
        parseInt(startVideo) || 1,
        endVideo ? parseInt(endVideo) : undefined,
        speed
      );
      
      setResults(analysisResult);
      toast({
        title: "Analysis Complete!",
        description: "Your playlist duration has been calculated.",
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze playlist",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const calculateAdjustedTime = (duration: string, speed: number) => {
    // Parse duration string (e.g., "12h 45m" or "45m")
    const hourMatch = duration.match(/(\d+)h/);
    const minuteMatch = duration.match(/(\d+)m/);
    
    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
    
    const totalMinutes = hours * 60 + minutes;
    const adjustedMinutes = Math.round(totalMinutes / speed);
    const newHours = Math.floor(adjustedMinutes / 60);
    const newMins = adjustedMinutes % 60;
    
    return newHours > 0 ? `${newHours}h ${newMins}m` : `${newMins}m`;
  };

  const currentSpeed = customSpeed ? parseFloat(customSpeed) : parseFloat(playbackSpeed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(156,146,172,0.1),transparent)]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hidden API Key Configuration */}
        <ApiKeyInput onApiKeySet={handleApiKeySet} hasApiKey={hasApiKey} />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl shadow-2xl">
              <Timer className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Playlist Time Analyzer
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate the total watch time of YouTube playlists with custom speed settings. 
            Perfect for planning your learning schedule and optimizing study time.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Input Card */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Calculator className="h-6 w-6" />
                </div>
                Playlist Analysis
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Enter your YouTube playlist URL and customize your analysis settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Playlist URL Input */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
                  YouTube Playlist URL
                </label>
                <Input
                  placeholder="https://www.youtube.com/playlist?list=..."
                  value={playlistUrl}
                  onChange={(e) => setPlaylistUrl(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400 h-12 text-lg"
                />
              </div>

              {/* Range Settings */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
                  Video Range Selection
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Start Video #
                    </label>
                    <Input
                      type="number"
                      placeholder="1"
                      value={startVideo}
                      onChange={(e) => setStartVideo(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      End Video # (optional)
                    </label>
                    <Input
                      type="number"
                      placeholder="Last video"
                      value={endVideo}
                      onChange={(e) => setEndVideo(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                </div>

                {/* Quick Range Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Quick Range Selection
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStartVideo("1");
                        setEndVideo("10");
                      }}
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-400"
                    >
                      First 10
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStartVideo("1");
                        setEndVideo("25");
                      }}
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-400"
                    >
                      First 25
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStartVideo("1");
                        setEndVideo("50");
                      }}
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-400"
                    >
                      First 50
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStartVideo("1");
                        setEndVideo("");
                      }}
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-400"
                    >
                      All Videos
                    </Button>
                  </div>
                </div>
              </div>

              {/* Speed Settings */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-200 uppercase tracking-wide flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Playback Speed Configuration
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Preset Speed
                    </label>
                    <Select value={playbackSpeed} onValueChange={(value) => {
                      setPlaybackSpeed(value);
                      setCustomSpeed("");
                    }}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20 text-white">
                        <SelectItem value="0.5" className="text-white hover:bg-slate-700 focus:bg-slate-700">0.5x (Slower)</SelectItem>
                        <SelectItem value="0.75" className="text-white hover:bg-slate-700 focus:bg-slate-700">0.75x</SelectItem>
                        <SelectItem value="1" className="text-white hover:bg-slate-700 focus:bg-slate-700">1x (Normal)</SelectItem>
                        <SelectItem value="1.25" className="text-white hover:bg-slate-700 focus:bg-slate-700">1.25x</SelectItem>
                        <SelectItem value="1.5" className="text-white hover:bg-slate-700 focus:bg-slate-700">1.5x</SelectItem>
                        <SelectItem value="2" className="text-white hover:bg-slate-700 focus:bg-slate-700">2x (Faster)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Custom Speed (e.g., 1.75)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.1"
                      max="10"
                      placeholder="Enter custom speed"
                      value={customSpeed}
                      onChange={(e) => {
                        setCustomSpeed(e.target.value);
                        setPlaybackSpeed("");
                      }}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                </div>
                {(customSpeed || playbackSpeed !== "1") && (
                  <div className="text-center p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                    <span className="text-purple-200 font-medium">
                      Current Speed: {currentSpeed}x
                    </span>
                  </div>
                )}
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !hasApiKey}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Analyzing Playlist...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6" />
                    Analyze Playlist
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Card */}
          {results && (
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                    <Clock className="h-6 w-6" />
                  </div>
                  Analysis Results
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Duration breakdown for your selected playlist range
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Playlist Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-xl text-white">Playlist Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-gray-300">Title:</span>
                        <span className="text-white font-medium truncate ml-2">{results.playlistTitle}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-gray-300">Channel:</span>
                        <span className="text-white font-medium">{results.channelName}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-gray-300">Total Videos:</span>
                        <span className="text-white font-medium">{results.totalVideos}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-gray-300">Analyzed Range:</span>
                        <span className="text-white font-medium">{results.analyzedRange}</span>
                      </div>
                    </div>
                  </div>

                  {/* Duration Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-xl text-white">Duration Analysis</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-gray-300">Videos to Watch:</span>
                        <span className="text-white font-medium">{results.videoCount}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-gray-300">Original Duration:</span>
                        <span className="text-white font-medium">{results.originalDuration}</span>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                        <span className="text-gray-200">At {currentSpeed}x Speed:</span>
                        <span className="text-green-400 font-bold text-2xl">{results.adjustedDuration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Speed Comparison */}
                <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2 text-lg">
                    <Play className="h-5 w-5" />
                    Speed Comparison
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {["1", "1.25", "1.5", "2"].map((speed) => (
                      <div key={speed} className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div className="text-gray-300 text-lg font-medium">{speed}x</div>
                        <div className="text-white font-bold text-xl mt-1">
                          {calculateAdjustedTime(results.originalDuration, parseFloat(speed))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <Clock className="h-16 w-16 mx-auto mb-6 text-purple-400" />
                <h3 className="font-bold text-white mb-3 text-xl">Smart Time Planning</h3>
                <p className="text-gray-300">
                  Plan your study sessions with precise time calculations and speed adjustments
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <Zap className="h-16 w-16 mx-auto mb-6 text-pink-400" />
                <h3 className="font-bold text-white mb-3 text-xl">Custom Speed Control</h3>
                <p className="text-gray-300">
                  Use preset speeds or set your own custom playback rate for optimal learning
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <Calculator className="h-16 w-16 mx-auto mb-6 text-blue-400" />
                <h3 className="font-bold text-white mb-3 text-xl">Flexible Range Selection</h3>
                <p className="text-gray-300">
                  Analyze specific portions of playlists with quick presets or custom ranges
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
