import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ReportConfirmationDialogProps {
  recipient: string;
  onClose: () => void;
}

export function ReportConfirmationDialog({ recipient, onClose }: ReportConfirmationDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Problemet er meldt videre</h3>
              <p className="text-gray-600">
                Problemet er meldt videre til {recipient}. Du vil få en melding i appen når henvendelsen er behandlet.
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