import React from 'react';
import { CheckCircle, Activity } from 'lucide-react';
import { Card } from '../ui/Card';
import { UptimeBar } from '../ui/UptimeBar';
import { IncidentStats } from './IncidentStats';

export function SystemStatus() {
  return (
    <div className="space-y-8">
      {/* System Status Card */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 mt-2">Systemstatus</h2>
                <p className="text-green-600">Ingen rapporterte problemer</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <UptimeBar days={90} uptime={100} />
            <div className="text-sm text-gray-600">
              Sist oppdatert: {new Date().toLocaleTimeString('no')}
            </div>
          </div>
        </div>
      </Card>
      {/* Statistics Card */}
      <IncidentStats />
    </div>
  );
}