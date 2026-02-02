import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { EventsGrid } from '@/components/EventsGrid';
import { fetchAllEvents } from '@/services/eventApi';
import type { Event } from '@/data/events';

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchAllEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      {loading ? (
        <p className="text-center mt-10">Loading events...</p>
      ) : (
        <EventsGrid events={events} />
      )}
    </div>
  );
};

export default Index;
