import React from 'react';
import { Zap } from 'lucide-react';
import { Card } from '../ui/Card';

export function EnergyInfo() {
  return (
    <Card className="h-full">
      <div className="p-6 h-full">
        <h2 className="text-xl font-semibold mb-6">Strømforbruk</h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Zap className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium">Strømleverandør</h3>
              <p className="text-gray-600">Tibber</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Forbruk siste 30 dager</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="text-2xl font-semibold">458 kWh</div>
              <div className="text-sm text-gray-600 mt-1">
                Estimert kostnad: 687 kr
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}