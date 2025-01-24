import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  highlight?: boolean;
}

interface EventStore {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
  isEventAdded: (id: string) => boolean;
}

// Initial events
const initialEvents = [
  {
    id: '2', // ID matching the forum post
    title: 'Plantebytting i bakgården',
    date: '2024-03-23',
    time: '11:00',
    highlight: true
  }
];

export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      events: initialEvents,
      addEvent: (event) => 
        set((state) => ({
          events: [...state.events, event]
        })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id)
        })),
      isEventAdded: (id) => 
        get().events.some((event) => event.id === id)
    }),
    {
      name: 'event-storage'
    }
  )
);