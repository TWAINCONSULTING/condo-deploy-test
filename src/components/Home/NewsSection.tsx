import React, { useState } from 'react';
import { Bell, Plus, ArrowRight } from 'lucide-react';
import { NewNewsDialog } from './NewNewsDialog';
import { useUserRole } from '../../hooks/useUserRole';
import { useNewsSection } from '../../hooks/useNewsSection';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Link } from 'react-router-dom';

interface NewsSectionProps {
  onPinNews?: (news: { id: string; title: string; content: string; date: string }) => void;
  pinnedMessageId?: string;
}

export function NewsSection({ onPinNews, pinnedMessageId }: NewsSectionProps) {
  const [showNewNewsDialog, setShowNewNewsDialog] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const { role } = useUserRole();
  const { news, loading, handlePin } = useNewsSection();
  const isBoard = role === 'board';

  const handleNewNews = async (data: { title: string; content: string }) => {
    setShowNewNewsDialog(false);
  };

  const handlePinClick = async (item: any) => {
    if (!onPinNews) return;
    await handlePin(item.id);
    onPinNews(item);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-none sm:rounded-xl border-t border-b sm:border sm:shadow-md px-2 sm:px-0">
        <div className="p-6">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Get visible news based on screen size and showAllMobile state
  const visibleNews = showAllMobile ? news : news.slice(0, 4);

  return (
    <div className="sm:bg-white sm:rounded-xl sm:border-t border-b sm:border sm:shadow-md px-0">
      <div className="p-2 sm:p-6">
        <div className="p-3 flex items-center justify-between sm:mb-6">
          <div className="flex items-center sm:gap-3">
            <div className="hidden sm:flex sm:p-2 bg-condo-dark rounded-lg">
              <Bell className="h-5 w-5 text-condo-light" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold">Siste nytt</h2>
          </div>
          {isBoard && (
            <button 
              onClick={() => setShowNewNewsDialog(true)}
              className="flex items-center gap-1 px-2 sm:px-4 py-2 sm:py-1 sm:py-2 bg-condo-light rounded-lg hover:bg-condo-med transition-colors text-condo-dark"
            >
              <Plus className="w-4 h-4 sm:w-4 font-extrabold sm:font-medium" />
              <span className="hidden sm:inline text-sm">Legg til nyhet</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-gray-100">
          {visibleNews.map((item) => {
            const isPinned = item.is_pinned;

            return (
              <article
                key={item.id}
                className={`p-2 sm:p-4 sm:pl-0 hover:bg-gray-50 transition-colors ${isPinned ? 'border-l-4 -ml-2 pl-5 border-condo-dark' : ''}`}
              >
                <div className="sm:flex sm:items-start sm:justify-between sm:gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-sm sm:text-base">{item.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{item.content}</p>
                  </div>
                  <div className="flex justify-end sm:justify-start mt-2 sm:mt-0">
                    <div className="text-xs sm:text-sm text-gray-500 sm:mt-0">
                      {item.date}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Show "Vis mer" button on mobile only when there are more than 4 items */}
        {news.length > 4 && (
          <div className="sm:hidden flex justify-end mt-4">
            <Link 
              to="/" 
              className="flex items-center gap-1 mt-2 text-xs text-condo-dark hover:text-condo-med transition-colors"
            >
              <span>Les flere poster fra styret</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </div>

      {showNewNewsDialog && (
        <NewNewsDialog
          onClose={() => setShowNewNewsDialog(false)}
          onSubmit={handleNewNews}
        />
      )}
    </div>
  );
}