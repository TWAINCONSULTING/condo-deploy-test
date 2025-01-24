import React, { useState } from 'react';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Comment } from '../Forum/Comment';
import { CommentForm } from '../Forum/CommentForm';
import type { Feature } from '../../types/features';

interface FeatureCardProps {
  feature: Feature;
  onVote: (id: string) => void;
  onComment: (id: string) => void;
}

const statusColors = {
  'PRODUKSJON': 'bg-green-100 text-green-700',
  'KOMMER': 'bg-blue-100 text-blue-700',
  'UNDER_VURDERING': 'bg-yellow-100 text-yellow-700'
};

const statusLabels = {
  'PRODUKSJON': 'I produksjon',
  'KOMMER': 'Kommer',
  'UNDER_VURDERING': 'Under vurdering'
};

// Mock comments for each feature
const getFeatureComments = (featureId: string) => {
  switch (featureId) {
    case '1': // BankID og Vipps
      return [
        {
          id: '1-1',
          content: 'Dette vil gjøre betalingsprosessen mye enklere!',
          authorName: 'Ingrid Bakken',
          createdAt: '2024-03-19T15:30:00Z',
          likes: 8,
          hasLiked: false
        },
        {
          id: '1-2',
          content: 'Veldig bra forslag. Vipps er jo noe alle bruker.',
          authorName: 'Magnus Solberg',
          createdAt: '2024-03-19T16:00:00Z',
          likes: 5,
          hasLiked: true
        },
        {
          id: '1-3',
          content: 'Dette har jeg ventet på lenge!',
          authorName: 'Sofie Dahl',
          createdAt: '2024-03-19T16:30:00Z',
          likes: 3,
          hasLiked: false
        }
      ];
    case '2': // Boligmappa
      return [
        {
          id: '2-1',
          content: 'Smart løsning for å holde oversikt over dokumentasjonen.',
          authorName: 'Henrik Berntsen',
          createdAt: '2024-02-27T14:00:00Z',
          likes: 4,
          hasLiked: false
        }
      ];
    case '3': // Vedlikeholdspåminnelser
      return [
        {
          id: '3-1',
          content: 'Fungerer veldig bra! Mye enklere å huske vedlikehold nå.',
          authorName: 'Kristine Moe',
          createdAt: '2024-01-18T13:00:00Z',
          likes: 6,
          hasLiked: true
        },
        {
          id: '3-2',
          content: 'Kunne påminnelsene vært mer tilpassbare?',
          authorName: 'Anders Haugen',
          createdAt: '2024-01-19T09:00:00Z',
          likes: 2,
          hasLiked: false
        }
      ];
    case '4': // Varslingsinnstillinger
      return [
        {
          id: '4-1',
          content: 'Veldig nyttig å kunne velge mellom ulike varslingstyper.',
          authorName: 'Emma Strand',
          createdAt: '2024-03-19T10:00:00Z',
          likes: 3,
          hasLiked: false
        }
      ];
    case '5': // Beboerforum
      return [
        {
          id: '5-1',
          content: 'Dette gjør det mye enklere å holde kontakt med naboene!',
          authorName: 'Marte Johansen',
          createdAt: '2024-03-19T12:00:00Z',
          likes: 7,
          hasLiked: false
        },
        {
          id: '5-2',
          content: 'Flott med egen seksjon for sosiale arrangementer.',
          authorName: 'Thomas Berg',
          createdAt: '2024-03-19T13:30:00Z',
          likes: 4,
          hasLiked: true
        }
      ];
    case '6': // Energiovervåking
      return [
        {
          id: '6-1',
          content: 'Veldig nyttig å kunne følge med på forbruket!',
          authorName: 'Julie Nilsen',
          createdAt: '2024-02-18T14:00:00Z',
          likes: 5,
          hasLiked: false
        },
        {
          id: '6-2',
          content: 'Sparetipsene er faktisk veldig nyttige.',
          authorName: 'Lars Hagen',
          createdAt: '2024-02-19T09:30:00Z',
          likes: 3,
          hasLiked: true
        }
      ];
    default:
      return [];
  }
};

export function FeatureCard({ feature, onVote, onComment }: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const comments = getFeatureComments(feature.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(feature.id);
      setNewComment('');
    }
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onVote(feature.id);
  };

  return (
    <article 
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white rounded-xl border p-6 hover:border-blue-500 transition-colors cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center min-w-[100px]">
          <div className="text-xl font-bold text-blue-900">{feature.votes}</div>
          <div className="text-xs text-blue-600 whitespace-nowrap">stemmer</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="font-semibold">{feature.title}</h3>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[feature.status]}`}>
              {statusLabels[feature.status]}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm mb-3">
            <span className="font-medium text-gray-900">{feature.author.name}</span>
            <span className="text-gray-400">•</span>
            <span className={`${
              feature.author.role === 'Condo' 
                ? 'text-blue-600' 
                : 'text-gray-600'
            }`}>
              {feature.author.role}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{feature.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleVote}
                className={`
                  flex items-center gap-1 text-sm transition-colors
                  ${feature.hasVoted 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-blue-600'
                  }
                `}
              >
                <ThumbsUp className="h-4 w-4" fill={feature.hasVoted ? 'currentColor' : 'none'} />
                <span>Stem på forslag</span>
              </button>
              <div className="flex items-center gap-1 text-gray-500">
                <MessageSquare className="h-4 w-4" />
                <span>{feature.comments} kommentarer</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(feature.createdAt), { 
                addSuffix: true,
                locale: nb 
              })}
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t space-y-4">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onLike={() => console.log('Like comment:', comment.id)}
                />
              ))}
              <CommentForm
                value={newComment}
                onChange={setNewComment}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}