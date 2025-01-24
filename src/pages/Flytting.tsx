import React, { useState } from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { MoveInContent } from '../components/Moving/MoveInContent';
import { MoveOutContent } from '../components/Moving/MoveOutContent';
import { Home, LogOut } from 'lucide-react';
import { sectionIntros } from '../data/sectionIntros';

export default function Flytting() {
  const [selectedSection, setSelectedSection] = useState<'in' | 'out' | null>(null);

  if (selectedSection) {
    return (
      <PageWrapper>
        <div className="w-full space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-logo mb-2">
              {selectedSection === 'in' ? 'Flytte inn' : 'Flytte ut'}
            </h1>
          </div>
          {selectedSection === 'in' ? <MoveInContent /> : <MoveOutContent />}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="text-center mb-8">
      </div>

      <div className="w-full">
        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => setSelectedSection('in')}
            className="flex flex-col items-center gap-6 p-8 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
          >
            <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
              <Home className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Jeg har flyttet inn</h2>
          </button>

          <button
            onClick={() => setSelectedSection('out')}
            className="flex flex-col items-center gap-6 p-8 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
          >
            <div className="p-4 bg-red-50 rounded-full group-hover:bg-red-100 transition-colors">
              <LogOut className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold">Jeg skal flytte ut</h2>
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}