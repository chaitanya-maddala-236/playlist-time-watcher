
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, ExternalLink } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

export const ApiKeyInput = ({ onApiKeySet, hasApiKey }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  if (hasApiKey) {
    return (
      <Card className="bg-green-500/10 backdrop-blur-lg border-green-500/20 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-green-400">
            <Key className="h-4 w-4" />
            <span className="text-sm font-medium">API Key configured successfully!</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Key className="h-5 w-5" />
          YouTube API Key Required
        </CardTitle>
        <CardDescription className="text-gray-300">
          To analyze playlists, you need a YouTube Data API v3 key.{" "}
          <a 
            href="https://developers.google.com/youtube/v3/getting-started" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
          >
            Get one here <ExternalLink className="h-3 w-3" />
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter your YouTube API key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
          />
          <Button 
            type="submit" 
            disabled={!apiKey.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Set API Key
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
