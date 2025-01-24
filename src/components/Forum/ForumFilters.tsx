import React from 'react';
import { Filter, Plus, Bell } from 'lucide-react';
import type { ForumFilter } from '../../types/forum';
import { Tooltip } from '../ui/Tooltip';

interface ForumFiltersProps {
  filters: ForumFilter;
  onFilterChange: (filters: ForumFilter) => void;
  onNewPost: () => void;
}

export function ForumFilters({ filters, onFilterChange, onNewPost }: ForumFiltersProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center">
        <button
          onClick={onNewPost}
          className="ml-1 px-4 py-2 bg-purple-200 text-purple-600 hover:bg-purple-300 hover:text-purple-700 rounded-lg inline-flex items-center gap-2 whitespace-nowrap transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          Ny post
        </button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <span className="text-sm text-gray-500">Filtrer:</span>
        </div>

        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ 
            ...filters, 
            category: e.target.value as any
          })}
          className="text-sm text-gray-600 py-1.5 px-3 focus:outline-none bg-gray-50"
        >
          <option value="">Alle kategorier</option>
          <option value="marketplace">Markedsplass</option>
          <option value="discussion">Diskusjon</option>
          <option value="event">Arrangement</option>
          <option value="recommendations">Anbefalinger</option>
        </select>

        <select
          value={filters.scope}
          onChange={(e) => onFilterChange({ 
            ...filters, 
            scope: e.target.value as any
          })}
          className="text-sm text-gray-600 py-1.5 px-3 focus:outline-none bg-gray-50"
        >
          <option value="">Alle områder</option>
          <option value="building">Digitalgården</option>
          <option value="area">Området</option>
        </select>

        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            onFilterChange({ 
              ...filters, 
              sortBy: sortBy as any,
              sortOrder: sortOrder as any
            });
          }}
          className="text-sm text-gray-600 py-1.5 px-3 focus:outline-none bg-gray-50"
        >
          <option value="trending-desc">Trender nå</option>
          <option value="date-desc">Nyeste først</option>
          <option value="date-asc">Eldste først</option>
          <option value="likes-desc">Mest likt</option>
          <option value="likes-asc">Minst likt</option>
        </select>
      </div>

      <div className="ml-auto">
        <Tooltip content="Muligheten for å opprette og redigere varsler vil bli tilgjengelig.">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-5 w-5 text-gray-400" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}