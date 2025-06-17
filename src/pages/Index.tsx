
import { useState } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { youtubeService } from "@/services/youtubeService";
import { HeroSection } from "@/components/HeroSection";
import { EducationalContent } from "@/components/EducationalContent";
import { PlaylistCalculator } from "@/components/PlaylistCalculator";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCases } from "@/components/UseCases";
import { FeaturesHighlight } from "@/components/FeaturesHighlight";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [hasApiKey, setHasApiKey] = useState(false);

  const handleApiKeySet = (apiKey: string) => {
    youtubeService.setApiKey(apiKey);
    setHasApiKey(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(156,146,172,0.1),transparent)]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <ApiKeyInput onApiKeySet={handleApiKeySet} hasApiKey={hasApiKey} />

        <HeroSection />
        <EducationalContent />
        <PlaylistCalculator hasApiKey={hasApiKey} />
        <HowItWorks />
        <UseCases />
        <FeaturesHighlight />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
