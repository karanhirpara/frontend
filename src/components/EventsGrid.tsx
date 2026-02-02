import { EventCard } from './EventCard';
import type { Event, } from '@/data/events';

interface EventsGridProps {
  events: Event[];
  title?: string;
}

export function EventsGrid({ events, title = 'Events in Ahmedabad' }: EventsGridProps) {

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold text-foreground mb-8">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
