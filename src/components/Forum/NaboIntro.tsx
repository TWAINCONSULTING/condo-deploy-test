import React from 'react';
import { MessageSquare, ShoppingBag, Calendar, MapPin } from 'lucide-react';

interface NaboIntroProps {
  onFeatureClick: (type: 'discussion' | 'marketplace' | 'event' | 'recommendations') => void;
}

const features = [
  {
    icon: MessageSquare,
    title: 'Diskusjoner',
    type: 'discussion' as const
  },
  {
    icon: ShoppingBag,
    title: 'Markedsplass',
    type: 'marketplace' as const
  },
  {
    icon: Calendar,
    title: 'Arrangementer',
    type: 'event' as const
  },
  {
    icon: MapPin,
    title: 'Anbefalinger',
    type: 'recommendations' as const
  }
];

export function NaboIntro({ onFeatureClick }: NaboIntroProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map(({ icon: Icon, title, type }) => (
        <button
          key={title}
          onClick={() => onFeatureClick(type)}
          className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group text-left w-full"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-condo-light rounded-lg">
              <Icon className="h-5 w-5 text-condo-dark" />
            </div>
            <div className="font-medium text-gray-900">{title}</div>
          </div>
        </button>
      ))}
    </div>
  );
}