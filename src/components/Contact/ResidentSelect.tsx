import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/Input';

interface Resident {
  id: string;
  name: string;
  apartment: string;
  avatar?: string;
}

interface ResidentSelectProps {
  selectedResidents: string[];
  onChange: (residents: string[]) => void;
}

// Mock data - replace with real data from your backend
const residents: Resident[] = [
  { id: '1', name: 'Ole Hansen', apartment: '1A' },
  { id: '2', name: 'Kari Nilsen', apartment: '2B' },
  { id: '3', name: 'Per Olsen', apartment: '3C' },
];

export function ResidentSelect({ selectedResidents, onChange }: ResidentSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredResidents = residents.filter(resident =>
    !selectedResidents.includes(resident.id) &&
    (resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     resident.apartment.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelect = (residentId: string) => {
    onChange([...selectedResidents, residentId]);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const handleRemove = (residentId: string) => {
    onChange(selectedResidents.filter(id => id !== residentId));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Velg mottakere
      </label>

      <div className="relative">
        <div className="min-h-[42px] p-1.5 rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <div className="flex flex-wrap gap-2">
            {selectedResidents.map(id => {
              const resident = residents.find(r => r.id === id);
              if (!resident) return null;
              
              return (
                <span 
                  key={resident.id}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
                >
                  <span>{resident.name} ({resident.apartment})</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(resident.id)}
                    className="p-0.5 hover:bg-blue-100 rounded"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder={selectedResidents.length === 0 ? "Søk etter naboer..." : ""}
              className="flex-1 min-w-[120px] border-0 p-0 focus:ring-0 text-sm"
            />
          </div>
        </div>

        {isDropdownOpen && searchQuery && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg">
            {filteredResidents.length > 0 ? (
              <div className="py-1">
                {filteredResidents.map(resident => (
                  <button
                    key={resident.id}
                    type="button"
                    onClick={() => handleSelect(resident.id)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  >
                    <div className="font-medium">{resident.name}</div>
                    <div className="text-sm text-gray-500">Leilighet {resident.apartment}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                Ingen naboer funnet
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}