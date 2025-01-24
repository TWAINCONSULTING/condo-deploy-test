import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { CHATBOT_CONFIG } from './config';
import { useChatbotScripts } from './useChatbotScripts';
import { ErrorFallback } from './errorFallback';

export function ExternalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { scriptLoaded, retry } = useChatbotScripts();

  useEffect(() => {
    let retries = 0;
    const maxRetries = 10;
    const retryInterval = 500;

    const initializeChatbase = () => {
      if (!window.chatbase) {
        // Initialize chatbase queue
        const queue: any[] = [];
        window.chatbase = function(...args: any[]) {
          if (!window.chatbase.q) {
            window.chatbase.q = queue;
          }
          return window.chatbase.q.push(args);
        };
      }
    };

    const configureChatbase = () => {
      try {
        if (window.chatbase && typeof window.chatbase === 'function') {
          window.chatbase('setConfig', {
            chatbotId: CHATBOT_CONFIG.id,
            domain: CHATBOT_CONFIG.domain,
            language: CHATBOT_CONFIG.language,
            theme: CHATBOT_CONFIG.theme
          });
          return true;
        }
        return false;
      } catch (err) {
        console.error('Chatbase configuration error:', err);
        return false;
      }
    };

    const checkChatbaseReady = () => {
      if (configureChatbase()) {
        console.log('Chatbase initialized successfully');
      } else if (retries < maxRetries) {
        retries++;
        setTimeout(checkChatbaseReady, retryInterval);
      } else {
        console.error('Chatbase initialization timed out');
        setError('Kunne ikke initialisere chatboten');
      }
    };

    if (scriptLoaded) {
      initializeChatbase();
      checkChatbaseReady();
    }

    return () => {
      retries = maxRetries; // Stop retrying on unmount
    };
  }, [scriptLoaded]);

  const handleClick = () => {
    try {
      if (window.chatbase && typeof window.chatbase === 'function') {
        window.chatbase('open');
        setIsOpen(true);
      }
    } catch (err) {
      console.error('Error opening chatbot:', err);
      setError('Kunne ikke åpne chatboten');
    }
  };

  if (error) {
    return <ErrorFallback message={error} onRetry={retry} />;
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 rounded-full h-12 w-12 bg-white text-blue-600 p-0 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
      aria-label="Åpne chat"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}