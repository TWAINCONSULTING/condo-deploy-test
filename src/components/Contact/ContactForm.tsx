import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { RecipientSelect } from './RecipientSelect';
import { ResidentSelect } from './ResidentSelect';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ContactFormProps {
  onExpand?: (expanded: boolean) => void;
  expanded?: boolean;
}

export function ContactForm({ onExpand, expanded = false }: ContactFormProps) {
  const [recipient, setRecipient] = useState<string | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedResidents, setSelectedResidents] = useState<string[]>([]);

  const handleRecipientChange = (value: string | null) => {
    if (value === recipient) {
      // Clicking the same recipient - collapse
      setRecipient(null);
      setSubject('');
      setMessage('');
      setSelectedResidents([]);
      onExpand?.(false);
    } else {
      // New recipient selected - expand
      setRecipient(value);
      onExpand?.(!!value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message sent:', {
      recipient,
      subject,
      message,
      selectedResidents
    });
    
    // Reset form
    setRecipient(null);
    setSubject('');
    setMessage('');
    setSelectedResidents([]);
    onExpand?.(false);
  };

  // Set initial expansion state based on expanded prop
  useEffect(() => {
    if (expanded && !recipient) {
      setRecipient('board');
    }
  }, [expanded]);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100" data-contact-form>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-semibold">Send melding</h2>
        </div>

        <div className="space-y-6">
          <RecipientSelect value={recipient} onChange={handleRecipientChange} />

          {recipient && (
            <>
              {recipient === 'resident' && (
                <ResidentSelect
                  selectedResidents={selectedResidents}
                  onChange={setSelectedResidents}
                />
              )}

              <Input
                label="Emne"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Skriv emnet for henvendelsen"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Melding
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Skriv din melding her..."
                  className="w-full h-20 px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={recipient === 'resident' && selectedResidents.length === 0}
                >
                  Send melding
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
}