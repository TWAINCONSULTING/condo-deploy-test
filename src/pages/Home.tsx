import React from 'react';
import { HeroSection } from '../components/Home/HeroSection';
import { NewsSection } from '../components/Home/NewsSection';
import { WeatherWidget } from '../components/Home/WeatherWidget';
import { EventsSection } from '../components/Home/EventsSection';
import { DocumentsSection } from '../components/Home/DocumentsSection';
import { BoardMessage } from '../components/Home/BoardMessage';
import { NewsFeed } from '../components/Home/NewsFeed';
import { usePinnedMessage } from '../hooks/usePinnedMessage';

export default function Home() {
  const { pinnedMessage, handlePinMessage } = usePinnedMessage();

  return (
    <div className="space-y-4 relative z-0 pb-4 sm:mx-0">
      <HeroSection />
      <div className="grid lg:grid-cols-7 gap-4">
        <div className="lg:col-span-4 space-y-4">
          <div className="sm:px-0 px-4">
            <BoardMessage message={pinnedMessage} />
          </div>
          <EventsSection />
          {/* Show WeatherWidget before NewsSection only on phone view */}
          <div className="lg:hidden">
            <WeatherWidget />
          </div>
          <NewsSection 
            onPinNews={handlePinMessage} 
            pinnedMessageId={pinnedMessage?.id}
          />
        </div>
        <div className="lg:col-span-3 space-y-4">
          {/* Hide WeatherWidget on phone view, show on larger screens */}
          <div className="hidden lg:block">
            <WeatherWidget />
          </div>
          <div className="m-4">
            <DocumentsSection />
          </div>
          <NewsFeed />
        </div>
      </div>
    </div>
  );
}