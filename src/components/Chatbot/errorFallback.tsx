import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ErrorFallbackProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorFallback({ message, onRetry }: ErrorFallbackProps) {
  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg border p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-gray-600">{message}</p>
          <div className="mt-3 flex gap-2">
            {onRetry && (
              <Button
                size="sm"
                variant="outline"
                onClick={onRetry}
              >
                Prøv igjen
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => window.location.href = '/kontakt'}
            >
              Kontakt styret
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

	
