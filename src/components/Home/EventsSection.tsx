import React from 'react';
import { Info, ArrowRight } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { useEventStore } from '../../stores/useEventStore';
import { Link } from 'react-router-dom';

export function EventsSection() {
  const { events } = useEventStore();

  // Combine hardcoded and user-added events
  const allEvents = [
    {
      title: 'Styremøte',
      date: '01',
      month: 'MAR',
      time: '18:00 - 20:00'
    },
    {
      title: 'Generalforsamling',
      date: '21',
      month: 'MAR',
      time: '19:00 - 21:00'
    },
    {
      title: 'Dugnad',
      date: '10',
      month: 'MAI',
      time: '19:00 - 21:00'
    },
    ...events.map(event => ({
      title: event.title,
      date: new Date(event.date).getDate().toString(),
      month: new Date(event.date).toLocaleString('no', { month: 'short' }).toUpperCase(),
      time: event.time,
      highlight: event.highlight
    }))
  ].sort((a, b) => {
    const dateA = new Date(`${a.month} ${a.date}`);
    const dateB = new Date(`${b.month} ${b.date}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Only show first four events
  const visibleEvents = allEvents.slice(0, 4);

  return (
    <div className="sm:bg-white sm:rounded-xl sm:border-t sm:border-b sm:border sm:shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Kommende hendelser</h2>
          <Tooltip content={
            <div className="whitespace-pre-line">
              Blå bokser er hendelser arrangert av styret.
              Lilla bokser er påmeldte hendelser arrangert av nabolaget.
            </div>
          }>
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
          </Tooltip>
        </div>

        <div className="grid md:grid-cols-2 ml-2 sm:ml-0 gap-3">
          {visibleEvents.map((event, index) => (
            <div key={`${event.title}-${index}`} className="flex items-center sm:gap-2 gap-4">
              <div id="eventSectionDateBox" className={`${
                event.highlight 
                  ? 'bg-condo-light text-condo-dark' 
                  : 'bg-condo-dark text-condo-light'
              } px-3 py-1.5 rounded-lg text-center min-h-[45px] min-w-[50px] sm:min-w-[55px]`}>
                <div className="text-xs font-medium">{event.month}</div>
                <div className="text-base sm:text-xl font-bold">{event.date}</div>
              </div>
              <div>
                <div className={`text-sm sm:text-base font-medium ${
                  event.highlight ? 'text-purple-900' : 'text-gray-900'
                }`}>
                  {event.title}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">{event.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <Link 
            to="/naboen" 
            className="flex items-center gap-1 text-xs text-condo-dark hover:text-condo-med transition-colors"
          >
            <span>Finn flere arrangementer</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}