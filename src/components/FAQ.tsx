
import { Card, CardContent } from "@/components/ui/card";

export const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto mt-24 mb-16">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-6">
        <Card className="bg-white/5 backdrop-blur border-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-3">How accurate are the time calculations?</h3>
            <p className="text-gray-300 leading-relaxed">
              Our calculator provides highly accurate results by fetching exact video durations from YouTube's API. 
              The calculations account for precise playback speeds and provide results within seconds of accuracy.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur border-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-3">Can I analyze private playlists?</h3>
            <p className="text-gray-300 leading-relaxed">
              Currently, our tool only works with public YouTube playlists. Private or unlisted playlists 
              cannot be accessed due to YouTube's privacy restrictions and API limitations.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur border-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-3">What's the optimal playback speed for learning?</h3>
            <p className="text-gray-300 leading-relaxed">
              Research suggests that 1.25x to 1.5x speed is optimal for most learners, maintaining comprehension 
              while saving time. However, this varies by content complexity and individual preference. Start with 1.25x and adjust based on your comfort level.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur border-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-3">Is there a limit to playlist size?</h3>
            <p className="text-gray-300 leading-relaxed">
              Our tool can handle playlists of any size, from small collections to large courses with hundreds of videos. 
              Analysis time may vary slightly with very large playlists, but results remain accurate regardless of size.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
