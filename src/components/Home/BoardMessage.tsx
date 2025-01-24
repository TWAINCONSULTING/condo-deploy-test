import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Calendar, Info } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

interface BoardMessageProps {
  message?: {
    title: string;
    content: string;
    date: string;
  };
}

export function BoardMessage({ message }: BoardMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
      const height = contentRef.current.scrollHeight;
      const numberOfLines = Math.ceil(height / lineHeight);
      setNeedsExpansion(numberOfLines > 6);
    }
  }, [message]);

  if (!message) {
    return (
      <div className="bg-white border border-condo-dark rounded-none sm:rounded-xl shadow-md h-[150px] sm:h-[200px] flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500">
          <AlertCircle className="h-5 w-5" />
          <span className="text-xs sm:text-sm">Ingen melding fra styret</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-condo-dark/50 rounded-none sm:rounded-xl shadow-md flex flex-col">
      <div className="p-4 sm:p-6 flex-1">
        <div className="flex items-start gap-3 mb-3 sm:mb-6">
          <div className="hidden sm:flex p-2 bg-condo-light rounded-lg">
            <AlertCircle className="h-5 w-5 text-condo-dark" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-xs sm:text-lg font-medium text-gray-900">Melding fra styret</h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs sm:text-sm font-medium bg-condo-light text-condo-dark rounded-full">
                  Viktig
                </span>
                <Tooltip content={
                  <div className="whitespace-pre-line">
                    Styret kan enkelt feste viktige beskjeder alle beboerne bør se.
                    {'\n\n'}
                    Meldingen velger du fra 'Sist Nytt' seksjonen under. Trykk pin-ikonet for å feste.
                  </div>
                }>
                  <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
                </Tooltip>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 mt-1">
              <span>{message.date}</span>
            </div>
          </div>
        </div>

        <div className={`relative ${!isExpanded && needsExpansion ? 'max-h-[7em] overflow-hidden' : ''}`}>
          <div 
            ref={contentRef}
            className={`text-sm sm:text-base text-gray-900 ${!isExpanded && needsExpansion ? 'line-clamp-3' : ''}`}
          >
            <strong className="block mb-2">{message.title}</strong>
            <div>{message.content}</div>
          </div>
          {!isExpanded && needsExpansion && (
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        <div className="flex sm:hidden justify-end mt-2">
          <div className="text-[10px] text-gray-500">
            {message.date}
          </div>
        </div>
      </div>

      {needsExpansion && (
        <div className="p-2 border-t border-gray-200">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-1 text-xs text-gray-600 hover:text-gray-900"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>Vis mindre</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>Vis mer</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}