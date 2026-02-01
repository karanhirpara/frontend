import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Heart, Users, Ticket, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { sampleEvents } from '@/data/events';
import { RegistrationModal } from '@/components/RegistrationModal';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  
  const event = sampleEvents.find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Event Hero */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/80 hover:bg-background"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              {event.badge && (
                <Badge className="mb-3 bg-primary text-primary-foreground">
                  {event.badge === 'just-added' ? 'Just Added' : event.badge === 'promoted' ? 'Promoted' : 'Free'}
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {event.title}
              </h1>
              <Badge variant="outline" className="text-muted-foreground">
                {event.category}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{event.venue}</span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold mb-4">About this event</h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Join us for an incredible experience! This event brings together professionals, 
                enthusiasts, and learners from all backgrounds. Whether you're looking to network, 
                learn new skills, or simply enjoy a great time, this event has something for everyone.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Don't miss out on this opportunity to connect, learn, and grow. Register now to 
                secure your spot!
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Ticket className="h-5 w-5 text-primary" />
                Ticket Information
              </h2>
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">General Admission</span>
                  <Badge className="bg-primary/20 text-primary">Free</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Free event - one ticket per person. Registration is required to attend.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Event Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">2-3 hours</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Language</p>
                  <p className="font-medium">English</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Age Restriction</p>
                  <p className="font-medium">All ages</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Refund Policy</p>
                  <p className="font-medium">Up to 7 days before</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{event.category}</Badge>
                <Badge variant="secondary">Networking</Badge>
                <Badge variant="secondary">Learning</Badge>
                <Badge variant="secondary">Professional</Badge>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6 space-y-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{event.price}</p>
                {event.price === 'Free' && (
                  <p className="text-sm text-muted-foreground">No payment required</p>
                )}
              </div>

              <Button className="w-full" size="lg" onClick={() => setIsRegistrationOpen(true)}>
                Register Now
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>245 people interested</span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Organizer</h3>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">E</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Event Organizers</p>
                    <p className="text-xs text-muted-foreground">1.2k followers</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RegistrationModal
        event={event}
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </div>
  );
}
