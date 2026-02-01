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
import type { Registration } from '@/components/RegistrationModal';

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('registrations');
    if (stored) {
      setRegistrations(JSON.parse(stored));
    }
  }, []);

  const getEventDetails = (eventId: string) => {
    return sampleEvents.find(e => e.id === eventId);
  };

  const handleCancelRegistration = (registrationId: string) => {
    const updatedRegistrations = registrations.filter(r => r.registrationId !== registrationId);
    setRegistrations(updatedRegistrations);
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
  };

  const handleDownload = (registration: Registration) => {
    const event = getEventDetails(registration.eventId);
    if (!event) return;

    const ticketContent = `
╔══════════════════════════════════════════════════════════════╗
║                     EVENT REGISTRATION                        ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Registration ID: ${registration.registrationId.padEnd(39)}║
║                                                               ║
╠══════════════════════════════════════════════════════════════╣
║  EVENT DETAILS                                                ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Event: ${event.title.substring(0, 50).padEnd(50)}║
║  Date: ${event.date.padEnd(51)}║
║  Time: ${event.time.padEnd(51)}║
║  Venue: ${event.venue.substring(0, 49).padEnd(49)}║
║                                                               ║
╠══════════════════════════════════════════════════════════════╣
║  ATTENDEE INFORMATION                                         ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Name: ${(registration.firstName + ' ' + registration.lastName).padEnd(51)}║
║  Email: ${registration.email.padEnd(50)}║
║  Phone: ${(registration.phone || 'Not provided').padEnd(50)}║
║                                                               ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Registered: ${new Date(registration.registeredAt).toLocaleString().padEnd(44)}║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝

Please present this registration at the event entrance.
Thank you for registering!
    `;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registration-${registration.registrationId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
              const event = getEventDetails(registration.eventId);
              if (!event) return null;

              return (
                <Card key={registration.registrationId} className="overflow-hidden">
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
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{event.venue}</span>
                              </div>
                            </div>

                            <div className="border-t border-border mt-4 pt-4">
                              <p className="text-xs text-muted-foreground mb-2">Attendee Info</p>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>{registration.firstName} {registration.lastName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span className="truncate">{registration.email}</span>
                                </div>
                                {registration.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{registration.phone}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(registration)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            
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
                                    onClick={() => handleCancelRegistration(registration.registrationId)}
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
