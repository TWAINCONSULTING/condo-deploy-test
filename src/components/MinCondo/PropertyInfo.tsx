import React from 'react';
import { Card } from '../ui/Card';
import { Home, DollarSign, Calendar, Tag, Clock, Leaf, Ruler, Building2, Layers } from 'lucide-react';

interface PropertyDetail {
  label: string;
  value: string;
  icon: React.ElementType;
}

const propertyDetails: PropertyDetail[] = [
  { label: 'Leilighet', value: '507', icon: Home },
  { label: 'Areal', value: 'BRA: 85 m²', icon: Ruler },
  { label: 'Felleskostnader', value: '3 850 kr/mnd', icon: DollarSign },
  { label: 'Seksjonsnr.', value: '97', icon: Layers },
  { label: 'Byggeår', value: '1899', icon: Calendar },
  { label: 'Siste kjøpspris', value: '4 850 000 kr', icon: Tag },
  { label: 'Etasje', value: '5. etasje', icon: Building2 },
  { label: 'Energimerking', value: 'C', icon: Leaf },
  { label: 'Eiertid', value: 'Siden mars 2020', icon: Clock }
];

export function PropertyInfo() {
  return (
    <Card className="h-full">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Boliginformasjon</h2>
        
        <div className="grid grid-cols-3 gap-x-8 gap-y-4">
          {propertyDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">{detail.label}</div>
                  <div className="font-medium">{detail.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}