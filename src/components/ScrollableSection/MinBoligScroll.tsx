import React, { useEffect } from 'react';
import { ScrollSection } from '../ui/ScrollSection';
import MinCondo from '../../pages/MinCondo';
import Flytting from '../../pages/Flytting';
import { useLocation } from 'react-router-dom';

export function MinBoligScroll() {
  const location = useLocation();
  const shouldAutoScroll = location.hash === '#flytting';

  return (
    <div className="space-y-8">
      <ScrollSection id="min-condo">
        <MinCondo />
      </ScrollSection>

      <ScrollSection id="flytting" autoScroll={shouldAutoScroll}>
        <Flytting />
      </ScrollSection>
    </div>
  );
}