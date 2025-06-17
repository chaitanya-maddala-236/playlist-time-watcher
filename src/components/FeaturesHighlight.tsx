
import { Clock, Zap, Calculator, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturesHighlight = () => {
  return (
    <div className="max-w-6xl mx-auto mt-24">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Advanced Features for Optimal Learning
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
          <CardContent className="p-8 text-center">
            <Clock className="h-16 w-16 mx-auto mb-6 text-purple-400" />
            <h3 className="font-bold text-white mb-4 text-xl">Smart Time Planning</h3>
            <ul className="text-gray-300 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                Precise duration calculations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                Multiple speed comparisons
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                Schedule optimization
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
          <CardContent className="p-8 text-center">
            <Zap className="h-16 w-16 mx-auto mb-6 text-pink-400" />
            <h3 className="font-bold text-white mb-4 text-xl">Flexible Speed Control</h3>
            <ul className="text-gray-300 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                Custom playback speeds
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                Preset speed options
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                Real-time adjustments
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
          <CardContent className="p-8 text-center">
            <Calculator className="h-16 w-16 mx-auto mb-6 text-blue-400" />
            <h3 className="font-bold text-white mb-4 text-xl">Advanced Analytics</h3>
            <ul className="text-gray-300 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                Detailed playlist insights
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                Range-based analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                Comprehensive reporting
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
