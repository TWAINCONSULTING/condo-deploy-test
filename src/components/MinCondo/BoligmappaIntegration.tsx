import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Card } from '../ui/Card';

export function BoligmappaIntegration() {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Lightbulb className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Boligmappa</h2>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-blue-700">
            Vi jobber med å koble opp mot Boligmappa for enkel tilgang til boligens dokumentasjon. 
            Dette vil gi deg:
          </p>
          <ul className="mt-4 space-y-2 text-blue-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              Automatisk import av all boligdokumentasjon
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              Oversikt over utført vedlikehold og oppgraderinger
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              Sertifikater og kontrollrapporter samlet på ett sted
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-600">
            Integrasjonen vil være tilgjengelig i løpet av kort tid.
          </p>
        </div>
      </div>
    </Card>
  );
}