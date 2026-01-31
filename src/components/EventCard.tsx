import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Event } from '@/data/events';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();
  const getBadgeClass = (badge: string) => {
    switch (badge) {
      case 'just-added':
        return 'bg-foreground text-background';
      case 'promoted':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-badge-free text-primary-foreground';
    }
  };

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case 'just-added':
        return 'Just added';
      case 'promoted':
        return 'Promoted';
      default:
        return badge;
    }
  };

  return (
    <Card 
      className="group overflow-hidden border-0 shadow-none hover:shadow-md transition-shadow duration-300 animate-fade-in cursor-pointer"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
        >
          <Heart className="h-4 w-4" />
        </Button>
        {event.badge && (
          <Badge className={`absolute bottom-3 left-3 ${getBadgeClass(event.badge)}`}>
            {getBadgeLabel(event.badge)}
          </Badge>
        )}
      </div>
      <CardContent className="px-0 pt-4">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-1">
          {event.date} • {event.time}
        </p>
        <p className="text-sm text-muted-foreground mb-2">{event.venue}</p>
        <p className="text-sm font-medium text-foreground">{event.price}</p>
        {event.badge === 'promoted' && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            Promoted
            <span className="inline-block h-3 w-3 rounded-full border border-muted-foreground text-[8px] flex items-center justify-center">?</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
