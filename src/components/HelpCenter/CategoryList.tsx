import React from 'react';
import { helpCategories } from '../../data/helpCategories';
import { X } from 'lucide-react';

interface CategoryListProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryList({ selectedCategory, onSelectCategory }: CategoryListProps) {
  return (
    <div className="space-y-1">
      {helpCategories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelectCategory(selectedCategory === id ? null : id)}
          className={`
            w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-left group
            ${selectedCategory === id
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
            }
          `}
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 font-medium">{label}</span>
          {selectedCategory === id && (
            <X className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
      ))}
    </div>
  );
}