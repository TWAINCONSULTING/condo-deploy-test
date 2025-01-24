import React from 'react';
import { Activity, Info } from 'lucide-react';
import { Card } from '../ui/Card';
import { PieChart } from './PieChart';
import { Tooltip } from '../ui/Tooltip';

const stats = [ 
  { type: 'Nettside', count: 5, color: 'rgb(187, 222, 251)' }, // blue-100
  { type: 'App', count: 2, color: 'rgb(100, 181, 246)' }, // blue-300
  { type: 'Informasjon', count: 1, color: 'rgb(30, 136, 229)' }, //blue-600
  { type: 'Chatbot', count: 1, color: 'rgb(13, 71, 161)' } // blue-900
];

const total = stats.reduce((sum, stat) => sum + stat.count, 0);

export function IncidentStats() {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">Statistikk</h2>
          </div>
          <Tooltip content="Dette er eksempeldata for å vise hvordan statistikken vil se ut. I en produksjonsversjon vil dette vise faktiske rapporterte problemer.">
            <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-help" />
          </Tooltip>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative">
            <PieChart data={stats} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{total}</div>
                <div className="text-sm text-gray-900">totalt</div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 mb-2">
            {stats.map((stat) => (
              <div key={stat.type} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{stat.type}</span>
                  <span className="font-medium">{stat.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${(stat.count / total) * 100}%`,
                      backgroundColor: stat.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}