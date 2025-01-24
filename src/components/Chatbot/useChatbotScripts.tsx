import { useState, useEffect } from 'react';
import { CHATBOT_CONFIG } from './config';

export function useChatbotScripts() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeScripts = () => {
    setError(null);
    setScriptLoaded(false);

    try {
      // Remove any existing script
      const existingScript = document.getElementById(CHATBOT_CONFIG.id);
      if (existingScript) {
        existingScript.remove();
      }

      // Create new script
      const script = document.createElement('script');
      script.src = CHATBOT_CONFIG.scriptUrl;
      script.id = CHATBOT_CONFIG.id;
      script.setAttribute('domain', CHATBOT_CONFIG.domain);
      script.setAttribute('defer', 'true');
      script.setAttribute('crossorigin', 'anonymous');

      script.onload = () => {
        console.log('Chatbot script loaded successfully');
        setScriptLoaded(true);
      };

      script.onerror = (e) => {
        console.error('Error loading chatbot script:', e);
        setError('Kunne ikke laste chatbot. Vennligst prøv igjen senere.');
        setScriptLoaded(false);
      };

      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        setScriptLoaded(false);
      };
    } catch (err) {
      console.error('Error initializing chatbot script:', err);
      setError('En feil oppstod ved lasting av chatbot.');
      return () => {};
    }
  };

  useEffect(() => {
    return initializeScripts();
  }, []);

  return {
    scriptLoaded,
    error,
    retry: initializeScripts
  };
}