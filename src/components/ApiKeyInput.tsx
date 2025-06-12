
import { useEffect } from "react";

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

export const ApiKeyInput = ({ onApiKeySet, hasApiKey }: ApiKeyInputProps) => {
  // Auto-set the API key on component mount
  useEffect(() => {
    const apiKey = "AIzaSyADh4VQPgKmBMm6fIBscRIVDPurc9kAbv4";
    if (!hasApiKey) {
      onApiKeySet(apiKey);
    }
  }, [hasApiKey, onApiKeySet]);

  // Return null to hide the component completely
  return null;
};
