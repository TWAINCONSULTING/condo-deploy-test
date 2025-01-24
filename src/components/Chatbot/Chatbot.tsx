import React, { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { initializeChatbot, loadChatbotScript } from '../../services/chatbot';
import { ErrorFallback } from './errorFallback';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000;

    const setupChatbot = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await loadChatbotScript();
        await initializeChatbot(user?.id);
        setIsLoading(false);
      } catch (err) {
        console.error('Chatbot initialization failed:', err);
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(setupChatbot, retryDelay);
        } else {
          setError('Kunne ikke laste chatbot');
          setIsLoading(false);
        }
      }
    };

    setupChatbot();
  }, [user?.id]);

  const handleOpen = () => {
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

  const handleClose = () => {
    try {
      if (window.chatbase && typeof window.chatbase === 'function') {
        window.chatbase('close');
        setIsOpen(false);
      }
    } catch (err) {
      console.error('Error closing chatbot:', err);
      setError('Kunne ikke lukke chatboten');
    }
  };

  if (error) {
    return <ErrorFallback message={error} />;
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={`fixed bottom-4 right-4 rounded-full h-12 w-12 bg-white text-blue-600 p-0 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isLoading}
        aria-label="Åpne chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {isOpen && (
        <button
          onClick={handleClose}
          className="fixed bottom-20 right-4 rounded-full h-10 w-10 bg-white text-gray-600 p-0 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors z-50"
          aria-label="Lukk chat"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </>
  );
}