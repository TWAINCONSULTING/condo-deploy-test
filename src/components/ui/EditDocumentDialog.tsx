import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';

interface EditDocumentDialogProps {
  documentName: string;
  category?: string;
  categories?: Array<{ value: string; label: string }>;
  onClose: () => void;
  onDelete: () => void;
  onSave: (data: { name: string; category?: string }) => void;
}

export function EditDocumentDialog({ 
  documentName, 
  category,
  categories,
  onClose, 
  onDelete, 
  onSave 
}: EditDocumentDialogProps) {
  const [newName, setNewName] = useState(documentName);
  const [newCategory, setNewCategory] = useState(category);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (newName.trim()) {
      onSave({ 
        name: newName.trim(),
        ...(categories && { category: newCategory })
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Rediger dokument</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {!showDeleteConfirm ? (
            <>
              <Input
                label="Dokumentnavn"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              
              {categories && (
                <Select
                  label="Kategori"
                  value={newCategory}
                  onChange={setNewCategory}
                  options={categories}
                />
              )}
              
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="!text-red-600 hover:!bg-red-50"
                >
                  Slett
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Avbryt
                  </Button>
                  <Button onClick={handleSave}>
                    Lagre
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-gray-700">
                Er du sikker på at du vil slette denne filen?
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                  Nei
                </Button>
                <Button 
                  onClick={onDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Ja
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}