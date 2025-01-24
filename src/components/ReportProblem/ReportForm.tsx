import React, { useState } from 'react';
import { AlertTriangle, Image as ImageIcon, Link as LinkIcon, X, Plus } from 'lucide-react';
import { Card } from '../ui/Card';
import { SelectionButtons } from './SelectionButtons';
import { ReportConfirmationDialog } from './ReportConfirmationDialog';
import { PROBLEM_TYPES } from '../../constants/reportTypes';

interface ReportFormProps {
  onTypeSelect: (type: string | null) => void;
  selectedType: string | null;
}

export function ReportForm({ onTypeSelect, selectedType }: ReportFormProps) {
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      setShowConfirmation(true);
    }
  };

  const handleClose = () => {
    setShowConfirmation(false);
    onTypeSelect(null);
    setDescription('');
    setImages([]);
    setPreviews([]);
    setLink('');
  };

  const handleTypeChange = (type: string) => {
    onTypeSelect(type === selectedType ? null : type);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);

    // Generate previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold">Rapporter et problem</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <SelectionButtons
              value={selectedType || ''}
              onChange={handleTypeChange}
              options={PROBLEM_TYPES}
              variant="problem"
            />

            {selectedType && (
              <>
                <div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 h-[192px] resize-none"
                    placeholder="Beskriv problemet i detalj..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  {previews.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-black/50 rounded-full hover:bg-black/70"
                          >
                            <X className="h-3 w-3 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="flex items-center justify-center gap-2 px-4 py-1.5 text-sm border rounded-md hover:bg-gray-50"
                    >
                      <ImageIcon className="h-4 w-4 text-gray-400" />
                      <span>Legg til bilde</span>
                    </button>

                    <div className="relative flex-1">
                      <div className="flex items-center w-full">
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <LinkIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Legg til lenke"
                            className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send rapport
                  </button>
                </div>
              </>
            )}

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </form>
        </div>
      </Card>

      {showConfirmation && (
        <ReportConfirmationDialog 
          recipient="Condo"
          onClose={handleClose}
        />
      )}
    </>
  );
}