import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import type { NewFeature } from '../../types/features';

interface NewFeatureDialogProps {
  onClose: () => void;
  onSubmit: (feature: NewFeature) => void;
}

const categories = [
  { value: 'functionality', label: 'Funksjonalitet' },
  { value: 'ui', label: 'Brukergrensesnitt' },
  { value: 'integration', label: 'Integrasjon' },
  { value: 'other', label: 'Annet' }
];

export function NewFeatureDialog({ onClose, onSubmit }: NewFeatureDialogProps) {
  const [form, setForm] = useState<NewFeature>({
    title: '',
    description: '',
    category: 'functionality'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Send inn forslag</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tittel
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Kort og beskrivende tittel"
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Beskrivelse
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              placeholder="Beskriv forslaget ditt i detalj..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>Avbryt</Button>
            <Button type="submit">Send inn</Button>
          </div>
        </form>
      </div>
    </div>
  );
}