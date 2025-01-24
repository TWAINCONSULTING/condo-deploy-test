import React from 'react';
import { Card } from '../ui/Card';
import { Lightbulb } from 'lucide-react';

interface MovingPartnersProps {
  type: 'moveIn' | 'moveOut';
}

export function MovingPartners({ type }: MovingPartnersProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Lightbulb className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Samarbeidspartnere</h2>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-blue-700">
            Her vil du snart få tilgang til eksklusive rabatter og fordeler hos våre samarbeidspartnere.
          </p>
        </div>
      </div>
    </Card>
  );
}