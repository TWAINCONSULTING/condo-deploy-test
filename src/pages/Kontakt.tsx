import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageWrapper } from '../components/ui/PageWrapper';
import { ContactForm } from '../components/Contact/ContactForm';
import { ContactInfo } from '../components/Contact/ContactInfo';
import { ChatHistory } from '../components/Contact/ChatHistory';
import { sectionIntros } from '../data/sectionIntros';

export default function Kontakt() {
  const [searchParams] = useSearchParams();
  const recipient = searchParams.get('recipient');
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  useEffect(() => {
    if (recipient) {
      setIsFormExpanded(true);
    }
  }, [recipient]);

  return (
    <PageWrapper intro={sectionIntros.kontakt}>
      <div className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-8">
            <ContactForm 
              onExpand={setIsFormExpanded}
              expanded={isFormExpanded}
            />
            {!isFormExpanded && <ChatHistory />}
          </div>

          {/* Right column */}
          <ContactInfo />
        </div>

        {/* Full-width chat history when the form is expanded */}
        {isFormExpanded && <ChatHistory />}
      </div>
    </PageWrapper>
  );
}