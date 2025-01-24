import React, { useState } from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { SystemStatus } from '../components/ReportProblem/SystemStatus';
import { ReportForm } from '../components/ReportProblem/ReportForm';
import { IncidentHistory } from '../components/ReportProblem/IncidentHistory';
import { sectionIntros } from '../data/sectionIntros';

export default function ReportProblem() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <PageWrapper intro={sectionIntros.reportProblem}>
      <div className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-8">
            <ReportForm 
              onTypeSelect={setSelectedType} 
              selectedType={selectedType}
            />
            {!selectedType && <IncidentHistory />}
          </div>

          {/* Right column */}
          <SystemStatus />
        </div>

        {/* Full width incident history when type is selected */}
        {selectedType && <IncidentHistory />}
      </div>
    </PageWrapper>
  );
}