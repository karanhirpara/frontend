import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Heart, Users, Ticket, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { fetchEventById } from '@/services/eventApi';
import { RegistrationModal } from '@/components/RegistrationModal';
import {Event} from "@/data/events";
import { useEffect } from 'react';
import {registerForEvent,checkEventRegistration,cancelRegistration} from '@/services/registrationcheckApi'
import { a } from 'vitest/dist/chunks/suite.d.FvehnV49.js';
export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
 
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    console.log(id);
    if (!id) return;
    fetchEventById(id).then(setEvent).catch(console.error);
  }, [id]);
  
 useEffect(() => {
   console.log(id);
  const checkRegistrationStatus = async () => {
    try {
      const check = await checkEventRegistration(id);
       console.log(check);
      if (check.registered) {
        console.log("User is already registered");
        setIsRegistrationOpen(false); // user already registered, close registration
      } else {
        setIsRegistrationOpen(true); // user not registered, allow registration
      }
    } catch (err: any) {
      console.error(err);
      setIsRegistrationOpen(false); // on error, disable registration
    }
  };

  
    checkRegistrationStatus();
  
},[id]);

  const handleregistration = async() => {
    
    try {
    // 1. Check if the user is already registered
    const check = await checkEventRegistration(id);

    if (check.registered) {
      alert("You are already registered for this event.");
      return;
    }

    // 2. Register the user if not already registered
    const result = await registerForEvent(id);
    alert("Registration successful!");
    
    // Optional: update state/UI after successful registration
    setIsRegistrationOpen(false);

    return result;
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Registration failed.");
    setIsRegistrationOpen(false);
  }

  }
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
                <span>{event.Date}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>{event.Time}</span>
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
              <h2 className="text-xl font-semibold mb-4">category</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{event.category}</Badge>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6 space-y-6">
              
              
              {!isRegistrationOpen ? (
          <Button className="w-full" size="lg" disabled>
              Already Registered
           </Button>
          ) : (
           <Button
            className="w-full"
            size="lg"
            onClick={() => handleregistration()}
            >
                 Register Now
           </Button>
           )}

            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
