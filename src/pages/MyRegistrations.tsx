import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ClipboardList, Calendar, MapPin, Clock, Download, User, Mail, Phone, X } from 'lucide-react';
import { sampleEvents } from '@/data/events';
import {getAllRegistrations,cancelRegistration} from '@/services/registrationcheckApi'
import { fetchEventById } from '@/services/eventApi';
import { promises } from 'dns';
interface Registration {
  _id: string;
  registrationId: string;
  event: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}
export interface Event  {
  image: string
  _id: string;
  title: string;
  description: string;
  Date: string; 
  Time: string;
  venue: string;
 category: string,
  host:string;
}

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
   const [events, setEvents] = useState<Record<string, Event>>({});

  useEffect(() => {
  const fetchRegistrations = async () => {
    try {
      const res = await getAllRegistrations();
      const regs = res.registrations;
      setRegistrations(regs);

      const eventMap: Record<string, Event> = {};

      await Promise.all(
        regs.map(async (r: Registration) => {
          if (!eventMap[r.event]) {
            const ev = await fetchEventById(r.event);
            eventMap[r.event] = ev;
          }
        })
      );

      setEvents(eventMap);
    } catch (err) {
      console.error(err);
    }
  };

  fetchRegistrations();
}, []);


  
  const handleCancelRegistration = async(registrationId: string) => {
      try {
    await cancelRegistration(registrationId);

    setRegistrations((prev) =>
      prev.filter((r) => r.registrationId !== registrationId)
    );
  } catch (err) {
    console.error(err);
  }
  };

  const handleDownload = (registration: Registration) => {
    
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-primary" />
            My Registrations
          </h1>
          <p className="text-muted-foreground mt-1">View, download, or cancel your event registrations</p>
        </div>

        {registrations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">You haven't registered for any events yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Browse events and register to see them here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {registrations.map((registration) => {
              const event = events[registration.event];

              if (!event) return null;

              return (
                <Card key={registration.event} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Event Image */}
                      <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Registration Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                                {registration.registrationId}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg text-foreground mb-3">
                              {event.title}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>{event.Date}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{event.Time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{event.venue}</span>
                              </div>
                            </div>

                            <div className="border-t border-border mt-4 pt-4">
                              
                            </div>
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Registration</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel your registration for "{event.title}"? 
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Registration</AlertDialogCancel>
                                  <AlertDialogAction
                                   onClick={() => handleCancelRegistration(registration._id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Cancel Registration
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
