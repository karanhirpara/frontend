import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { EventsGrid } from '@/components/EventsGrid';
import { sampleEvents } from '@/data/events';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <EventsGrid events={sampleEvents} />
    </div>
  );
};

export default Index;
