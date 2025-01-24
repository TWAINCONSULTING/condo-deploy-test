import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../ui/Button';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { value: 'all', label: 'Alle' },
  { value: 'popular', label: 'Populære' },
  { value: 'launched', label: 'Lansert' },
  { value: 'coming', label: 'Kommer' }
];

export function FilterBar({ searchQuery, onSearchChange, selectedFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Søk etter forslag..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border focus:ring-1 focus:ring-blue500 focus:border-blue-500 text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <Button
            key={filter.value}
            variant={selectedFilter === filter.value ? 'primary' : 'outline'}
            onClick={() => onFilterChange(filter.value)}
            size="sm"
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}