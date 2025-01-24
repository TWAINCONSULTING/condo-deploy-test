import React, { useState } from 'react';
import { X, MessageSquare, ShoppingBag, Calendar, MapPin } from 'lucide-react';
import { PostType, NewPost } from '../../types/forum';
import { MarketplaceForm } from './PostForms/MarketplaceForm';
import { DiscussionForm } from './PostForms/DiscussionForm';
import { RecommendationsForm } from './PostForms/RecommendationsForm';
import { EventForm } from './PostForms/EventForm';

interface NewPostDialogProps {
  type: PostType;
  onClose: () => void;
  onSubmit: (post: NewPost) => void;
}

const postTypes = [
  { 
    value: 'discussion', 
    label: 'Diskusjon',
    icon: MessageSquare,
    color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
    description: 'Start en diskusjon med naboene dine om alt fra vedlikehold til sosiale arrangementer.'
  },
  { 
    value: 'marketplace', 
    label: 'Markedsplass',
    icon: ShoppingBag,
    color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100',
    description: 'Kjøp, selg eller gi bort ting til naboene dine. En enkel måte å dele ressurser på.'
  },
  { 
    value: 'event', 
    label: 'Arrangement',
    icon: Calendar,
    color: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
    description: 'Del arrangementer og aktiviteter med naboene, fra dugnader til sosiale sammenkomster.'
  },
  { 
    value: 'recommendations', 
    label: 'Anbefalinger',
    icon: MapPin,
    color: 'text-amber-600 bg-amber-50 hover:bg-amber-100',
    description: 'Del dine beste tips om restauranter, butikker og tjenester i nærområdet.'
  }
] as const;

const formTitles: Record<PostType, string> = {
  discussion: 'Start diskusjon',
  marketplace: 'Ny annonse',
  event: 'Opprett arrangement',
  recommendations: 'Del anbefaling'
};

export function NewPostDialog({ type: initialType, onClose, onSubmit }: NewPostDialogProps) {
  const [type, setType] = useState<PostType>(initialType);
  const selectedType = postTypes.find(t => t.value === type);

  const handleSubmit = (post: NewPost) => {
    onSubmit(post);
    onClose();
  };

  const FormComponent = {
    discussion: DiscussionForm,
    marketplace: MarketplaceForm,
    event: EventForm,
    recommendations: RecommendationsForm
  }[type];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8">
        <div className="sticky top-0 bg-white border-b z-10 rounded-t-xl">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{formTitles[type]}</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {postTypes.map(({ value, label, icon: Icon, color }) => (
                <button
                  key={value}
                  onClick={() => setType(value)}
                  className={`
                    flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                    ${value === type ? color : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>

            {selectedType && (
              <p className="mt-5 text-sm text-gray-600 text-center">
                {selectedType.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <FormComponent onSubmit={handleSubmit} onCancel={onClose} type={type} />
        </div>
      </div>
    </div>
  );
}