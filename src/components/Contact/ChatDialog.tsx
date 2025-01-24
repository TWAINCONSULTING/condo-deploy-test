import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { Card } from '../ui/Card';
import { ChatMessage } from './ChatMessage';
import { CommentForm } from '../Forum/CommentForm';
import { format, isToday, isYesterday } from 'date-fns';
import { nb } from 'date-fns/locale';
import type { ChatThread } from '../../types/chat';

interface ChatDialogProps {
  thread: ChatThread;
  onClose: () => void;
}

function formatMessageDate(date: Date): string {
  if (isToday(date)) {
    return 'I dag';
  }
  if (isYesterday(date)) {
    return 'I går';
  }
  return format(date, "d. MMMM yyyy", { locale: nb });
}

function groupMessagesByDate(messages: ChatThread['messages']) {
  const groups: { [key: string]: ChatThread['messages'] } = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp);
    const dateKey = format(date, 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
  });

  return Object.entries(groups).map(([date, messages]) => ({
    date: new Date(date),
    messages
  }));
}

export function ChatDialog({ thread, onClose }: ChatDialogProps) {
  const [newMessage, setNewMessage] = useState('');
  const messageGroups = groupMessagesByDate(thread.messages);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Send message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 bg-white rounded-t-2xl border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{thread.subject}</h3>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                thread.status === 'Besvart' 
                  ? 'bg-green-50 text-green-600' 
                  : 'bg-yellow-50 text-yellow-600'
              }`}>
                {thread.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messageGroups.map(({ date, messages }) => (
            <div key={date.toISOString()} className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
                  {formatMessageDate(date)}
                </div>
              </div>
              {messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-b-2xl border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Skriv en melding..."
              className="flex-1 px-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}