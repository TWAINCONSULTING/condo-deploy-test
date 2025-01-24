import React, { useState } from 'react';
import { MessageCircle, Calendar, Check } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { LikeButton } from './LikeButton';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import { categoryLabels } from '../../constants/forum';
import { useEventStore } from '../../stores/useEventStore';
import type { ForumPost as ForumPostType } from '../../types/forum';

interface ForumPostProps {
  post: ForumPostType;
  onVote: (id: string) => void;
  onComment: (id: string) => void;
}

export function ForumPost({ post, onVote, onComment }: ForumPostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const categoryInfo = categoryLabels[post.category];
  const isEvent = post.category === 'event' && post.eventDate;
  const { addEvent, removeEvent, isEventAdded } = useEventStore();
  const isAdded = isEventAdded(post.id);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id);
      setNewComment('');
    }
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    onVote(post.id);
  };

  const handleToggleEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.eventDate && post.eventTime) {
      if (isAdded) {
        removeEvent(post.id);
      } else {
        addEvent({
          id: post.id,
          title: post.title,
          date: post.eventDate,
          time: post.eventTime,
          highlight: true
        });
      }
    }
  };

  return (
    <article 
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white rounded-xl border p-6 lg:hover:border-blue-500 transition-colors cursor-pointer active:bg-gray-50 lg:active:bg-white"
    >
      <div className="space-y-4">
        {/* Header section with title and metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isEvent && (
              <div className="flex-shrink-0">
                <div className="bg-condo-dark text-condo-light px-2 py-1 rounded-lg text-center min-w-[20px]">
                  <div className="text-xs font-medium">
                    {format(new Date(post.eventDate), 'MMM', { locale: nb }).toUpperCase()}
                  </div>
                  <div className="text-xl font-bold">
                    {format(new Date(post.eventDate), 'd')}
                  </div>
                </div>
              </div>
            )}
            <div>
              <h3 className="font-semibold">{post.title}</h3>
              {isEvent && (
                <button
                  onClick={handleToggleEvent}
                  className={`
                    flex items-center gap-1 text-sm mt-1 transition-colors
                    ${isAdded 
                      ? 'text-red-600 hover:text-red-700' 
                      : 'text-condo-dark hover:text-condo-med'
                    }
                  `}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Lagt til i kommende hendelser</span>
                    </>
                  ) : (
                    <>
                      <span>Legg til i kommende hendelser</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryInfo.classes}`}>
            {categoryInfo.label}
          </span>
        </div>

        {/* Rest of the component remains the same */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-900">{post.authorName}</span>
          {post.authorId && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                {post.authorId === 'condo' ? 'Condo' : 'Bruker'}
              </span>
            </>
          )}
        </div>

        <div className="pl-0">
          <p className="text-gray-600 mb-4">{post.content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LikeButton 
                likes={post.likes}
                hasLiked={post.hasLiked}
                onClick={handleVote}
              />
              <div className="flex items-center gap-1 text-gray-500">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments?.length || 0} kommentarer</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { 
                addSuffix: true,
                locale: nb 
              })}
            </div>
          </div>

          {isExpanded && post.comments && (
            <div className="mt-4 pt-4 border-t space-y-4">
              {post.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onLike={(commentId) => console.log('Like comment:', commentId)}
                />
              ))}
              <CommentForm
                value={newComment}
                onChange={setNewComment}
                onSubmit={handleSubmitComment}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}