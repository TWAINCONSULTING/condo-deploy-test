import React from 'react';
import { ThumbsUp } from 'lucide-react';

interface LikeButtonProps {
  likes: number;
  hasLiked: boolean;
  onClick: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md';
}

export function LikeButton({ likes, hasLiked, onClick, size = 'md' }: LikeButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-1.5 active:scale-95 transition-all
        ${hasLiked ? 'text-blue-600' : 'text-gray-500 lg:hover:text-blue-600'}
        ${size === 'sm' ? 'text-xs' : 'text-sm'}
      `}
    >
      <ThumbsUp className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      <span>{likes}</span>
      <span>Likt</span>
    </button>
  );
}