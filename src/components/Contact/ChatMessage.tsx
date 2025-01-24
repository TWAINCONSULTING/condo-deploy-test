import React from 'react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Avatar } from '../ui/Avatar';

interface ChatMessageProps {
  content: string;
  author: string;
  role?: string;
  timestamp: string;
  isUser: boolean;
}

export function ChatMessage({ content, author, role, timestamp, isUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0 self-center mr-3">
          <Avatar name={author} />
        </div>
      )}
      <div className="flex flex-col max-w-[80%]">
        <div className={`rounded-2xl shadow-sm ${
          isUser 
            ? 'bg-blue-600' 
            : 'bg-white border border-gray-100'
        }`}>
          <div className={`px-4 py-2 border-b ${
            isUser 
              ? 'border-white/10' 
              : 'border-gray-100'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`font-medium text-sm ${
                isUser ? 'text-white' : 'text-gray-700'
              }`}>
                {author}
              </span>
              {role && (
                <span className={`
                  px-2 py-0.5 text-xs font-medium rounded-full
                  ${role === 'Styret'
                    ? isUser
                      ? 'bg-white/10 text-white'
                      : 'bg-blue-50 text-blue-600'
                    : isUser
                      ? 'bg-white/10 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {role}
                </span>
              )}
            </div>
          </div>
          <div className="p-4">
            <p className={isUser ? 'text-white' : 'text-gray-700'}>
              {content}
            </p>
          </div>
        </div>
        <div className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {format(new Date(timestamp), "HH:mm", { locale: nb })}
        </div>
      </div>
      {isUser && (
        <div className="flex-shrink-0 self-center ml-3">
          <Avatar name={author} />
        </div>
      )}
    </div>
  );
}