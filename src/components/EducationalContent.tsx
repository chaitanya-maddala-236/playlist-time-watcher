
import { BookOpen, Target, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const EducationalContent = () => {
  return (
    <div className="max-w-6xl mx-auto mb-16">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Master Your Learning Schedule with Smart Time Planning
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Efficient Learning</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Research shows that adjusting playback speed can improve retention rates by up to 25% while 
              reducing study time. Our calculator helps you find the perfect balance between speed and comprehension.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Goal Setting</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Set realistic learning goals by knowing exactly how much time you need. Plan your study sessions 
              around your schedule and stick to deadlines with precise time calculations.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Productivity Boost</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Maximize your productivity by optimizing video consumption. Whether you're studying for exams or 
              learning new skills, time management is key to success.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
