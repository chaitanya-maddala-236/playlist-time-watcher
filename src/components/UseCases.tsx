
import { Users, Target, BookOpen, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const UseCases = () => {
  return (
    <div className="max-w-6xl mx-auto mt-24 mb-16">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Perfect for Every Learning Scenario
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-blue-400" />
            <h3 className="font-bold text-white mb-3">Students</h3>
            <p className="text-gray-300 text-sm">
              Optimize study time for online courses, lectures, and educational content
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <h3 className="font-bold text-white mb-3">Professionals</h3>
            <p className="text-gray-300 text-sm">
              Plan training sessions and skill development with precise time management
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-400" />
            <h3 className="font-bold text-white mb-3">Educators</h3>
            <p className="text-gray-300 text-sm">
              Create structured lesson plans and assign appropriate viewing times
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="font-bold text-white mb-3">Content Creators</h3>
            <p className="text-gray-300 text-sm">
              Analyze competitor content and plan your own video series effectively
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
