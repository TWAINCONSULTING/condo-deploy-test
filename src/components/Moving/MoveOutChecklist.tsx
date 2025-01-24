import React, { useState } from 'react';
import { Check, CheckCircle, X, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUserRole } from '../../hooks/useUserRole';

interface ChecklistItem {
  id: string;
  label: string;
  tip: string;
  checked: boolean;
}

interface TipsDialogProps {
  items: ChecklistItem[];
  onClose: () => void;
}

interface ConfirmationDialogProps {
  onClose: () => void;
}

interface EditItemDialogProps {
  item?: ChecklistItem;
  onSave: (item: Omit<ChecklistItem, 'checked'>) => void;
  onClose: () => void;
}

function TipsDialog({ items, onClose }: TipsDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Nyttige tips</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="space-y-1">
              <h3 className="font-medium">{item.label}</h3>
              <p className="text-gray-600">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditItemDialog({ item, onSave, onClose }: EditItemDialogProps) {
  const [label, setLabel] = useState(item?.label || '');
  const [tip, setTip] = useState(item?.tip || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (label.trim() && tip.trim()) {
      onSave({
        id: item?.id || crypto.randomUUID(),
        label: label.trim(),
        tip: tip.trim()
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {item ? 'Rediger oppgave' : 'Legg til oppgave'}
          </h2>
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
              Oppgave
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tips
            </label>
            <textarea
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 min-h-[100px]"
              placeholder="Legg til et nyttig tips for hvordan oppgaven utføres..."
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose}>
              Avbryt
            </Button>
            <Button type="submit">
              {item ? 'Lagre' : 'Legg til'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmationDialog({ onClose }: ConfirmationDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Takk for bekreftelsen</h3>
              <p className="text-gray-600">
                Vi har mottatt din bekreftelse på utflytting. Ta kontakt med styret hvis du har spørsmål.
              </p>
            </div>
            <Button onClick={onClose} className="mt-2">
              Lukk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultItems: ChecklistItem[] = [
  { 
    id: '1', 
    label: 'Rydde og rengjøre leilighet og bod', 
    tip: 'Tøm og vask grundig alle rom og boder.',
    checked: false 
  },
  { 
    id: '2', 
    label: 'Bestille flyttevask', 
    tip: 'Kontakt renholdsbyrå for profesjonell vask.',
    checked: false 
  },
  { 
    id: '3', 
    label: 'Levere alle nøkler til styret', 
    tip: 'Legg frem alle nøkler som hører til seksjonen. Disse skal overføres til neste eier ved overtakelse.',
    checked: false 
  },
  { 
    id: '4', 
    label: 'Melde adresseendring', 
    tip: 'Oppdater adresse hos Posten og Folkeregisteret.',
    checked: false 
  },
  { 
    id: '5', 
    label: 'Lese av strøm', 
    tip: 'Les av de fem første sifrene på måleren og rapporter til strømleverandøren',
    checked: false 
  },
  { 
    id: '6', 
    label: 'Overlevere parkeringsbrikke/portåpner', 
    tip: 'Returner til neste eier eller overlever til styret.',
    checked: false 
  }
];

interface MoveOutChecklistProps {
  showTips: boolean;
  onCloseTips: () => void;
  showAddItem: boolean;
  onCloseAddItem: () => void;
}

export function MoveOutChecklist({ 
  showTips, 
  onCloseTips,
  showAddItem,
  onCloseAddItem
}: MoveOutChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(defaultItems);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | undefined>();
  const { role } = useUserRole();

  const isBoard = role === 'board';

  const handleToggle = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSubmit = () => {
    console.log('Checklist submitted:', items);
    setShowConfirmation(true);
  };

  const handleSaveItem = (itemData: Omit<ChecklistItem, 'checked'>) => {
    if (editingItem) {
      // Update existing item
      setItems(items.map(item => 
        item.id === itemData.id ? { ...itemData, checked: item.checked } : item
      ));
    } else {
      // Add new item
      setItems([...items, { ...itemData, checked: false }]);
    }
    setEditingItem(undefined);
    onCloseAddItem();
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const allChecked = items.every(item => item.checked);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-2">
            <button
              onClick={() => handleToggle(item.id)}
              className={`
                flex-1 flex items-center gap-3 p-3 rounded-lg border transition-colors text-left
                ${item.checked 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                }
              `}
            >
              <div className={`
                w-5 h-5 rounded border flex items-center justify-center flex-shrink-0
                ${item.checked 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300'
                }
              `}>
                {item.checked && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className={item.checked ? 'line-through text-gray-500' : ''}>
                {item.label}
              </span>
            </button>
            {isBoard && (
              <div className="flex gap-1">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!allChecked}
        className="w-full"
      >
        Send inn bekreftelse
      </Button>

      {!allChecked && (
        <p className="text-sm text-gray-500 text-center">
          Fullfør alle punktene på sjekklisten for å sende inn bekreftelse
        </p>
      )}

      {showConfirmation && (
        <ConfirmationDialog onClose={() => setShowConfirmation(false)} />
      )}

      {showTips && (
        <TipsDialog items={items} onClose={onCloseTips} />
      )}

      {(showAddItem || editingItem) && (
        <EditItemDialog
          item={editingItem}
          onSave={handleSaveItem}
          onClose={() => {
            setEditingItem(undefined);
            onCloseAddItem();
          }}
        />
      )}
    </div>
  );
}