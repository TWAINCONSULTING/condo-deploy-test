import React from 'react';
import { Search } from 'lucide-react';

interface HelpCenterSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function HelpCenterSearch({ value, onChange }: HelpCenterSearchProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Søk i hjelpesenteret..."
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}