
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Clock, Play, Youtube, Calculator, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { youtubeService, type AnalysisResult } from "@/services/youtubeService";
import { ApiKeyInput } from "@/components/ApiKeyInput";

const Index = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [startVideo, setStartVideo] = useState("1");
  const [endVideo, setEndVideo] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState("1");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const { toast } = useToast();

  const handleApiKeySet = (apiKey: string) => {
    youtubeService.setApiKey(apiKey);
    setHasApiKey(true);
    toast({
      title: "API Key Set!",
      description: "You can now analyze YouTube playlists.",
    });
  };

  const handleAnalyze = async () => {
    if (!hasApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your YouTube API key first.",
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
      const analysisResult = await youtubeService.analyzePlaylist(
        playlistUrl,
        parseInt(startVideo) || 1,
        endVideo ? parseInt(endVideo) : undefined,
        parseFloat(playbackSpeed)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(156,146,172,0.1),transparent)]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-lg">
              <Youtube className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Playlist Time Analyzer
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Calculate the total watch time of YouTube playlists with custom speed settings. 
            Perfect for planning your learning schedule.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* API Key Input */}
          <ApiKeyInput onApiKeySet={handleApiKeySet} hasApiKey={hasApiKey} />

          {/* Input Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Playlist Analysis
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enter your YouTube playlist URL and customize your analysis settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Playlist URL Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">
                  YouTube Playlist URL
                </label>
                <Input
                  placeholder="https://www.youtube.com/playlist?list=..."
                  value={playlistUrl}
                  onChange={(e) => setPlaylistUrl(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              {/* Range and Speed Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
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
                  <label className="text-sm font-medium text-gray-200">
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Playback Speed
                  </label>
                  <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="0.5">0.5x (Slower)</SelectItem>
                      <SelectItem value="0.75">0.75x</SelectItem>
                      <SelectItem value="1">1x (Normal)</SelectItem>
                      <SelectItem value="1.25">1.25x</SelectItem>
                      <SelectItem value="1.5">1.5x</SelectItem>
                      <SelectItem value="2">2x (Faster)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !hasApiKey}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Analyzing Playlist...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Analyze Playlist
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Card */}
          {results && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Analysis Results
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Duration breakdown for your selected playlist range
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Playlist Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white">Playlist Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Title:</span>
                        <span className="text-white font-medium">{results.playlistTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Channel:</span>
                        <span className="text-white font-medium">{results.channelName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Videos:</span>
                        <span className="text-white font-medium">{results.totalVideos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Analyzed Range:</span>
                        <span className="text-white font-medium">{results.analyzedRange}</span>
                      </div>
                    </div>
                  </div>

                  {/* Duration Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white">Duration Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Videos to Watch:</span>
                        <span className="text-white font-medium">{results.videoCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Original Duration:</span>
                        <span className="text-white font-medium">{results.originalDuration}</span>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">At {playbackSpeed}x Speed:</span>
                        <span className="text-green-400 font-bold text-xl">{results.adjustedDuration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Speed Comparison */}
                <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Speed Comparison
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    {["1", "1.25", "1.5", "2"].map((speed) => (
                      <div key={speed} className="text-center p-2 bg-white/5 rounded">
                        <div className="text-gray-300">{speed}x</div>
                        <div className="text-white font-medium">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-200">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <h3 className="font-semibold text-white mb-2">Time Planning</h3>
                <p className="text-gray-300 text-sm">
                  Plan your study sessions with accurate time calculations
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-200">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 mx-auto mb-4 text-pink-400" />
                <h3 className="font-semibold text-white mb-2">Speed Control</h3>
                <p className="text-gray-300 text-sm">
                  See how different playback speeds affect your watch time
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-200">
              <CardContent className="p-6 text-center">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                <h3 className="font-semibold text-white mb-2">Range Selection</h3>
                <p className="text-gray-300 text-sm">
                  Analyze specific portions of playlists for targeted learning
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
