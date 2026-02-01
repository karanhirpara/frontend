import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Calendar, MapPin, Clock, ChevronDown, Users, User, Mail, Phone, Ticket } from 'lucide-react';
import { sampleEvents, type Event } from '@/data/events';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import type { Registration } from '@/components/RegistrationModal';

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  category: string;
  image: string;
}

const initialFormData: EventFormData = {
  title: '',
  description: '',
  date: '',
  time: '',
  venue: '',
  price: 'Free',
  category: 'Business',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
};

const categories = ['Business', 'Finance', 'Education', 'Technology', 'Music', 'Networking', 'Arts', 'Sports'];

export default function AdminDashboard() {
  const { isAdmin } = useUser();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const stored = localStorage.getItem('registrations');
    if (stored) {
      setRegistrations(JSON.parse(stored));
    }
  }, []);

  const getEventRegistrations = (eventId: string) => {
    return registrations.filter(r => r.eventId === eventId);
  };

  const toggleEventExpanded = (eventId: string) => {
    setExpandedEvents(prev => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.date || !formData.venue) return;

    if (editingId) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingId
            ? { ...event, ...formData }
            : event
        )
      );
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...formData,
      };
      setEvents((prev) => [newEvent, ...prev]);
    }

    setFormData(initialFormData);
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      price: event.price,
      category: event.category,
      image: event.image,
    });
    setEditingId(event.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const openCreateDialog = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setIsDialogOpen(true);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Event Management</h1>
            <p className="text-muted-foreground mt-1">Create, edit, and manage your events</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit Event' : 'Create New Event'}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter event title"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your event"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      placeholder="e.g., Sat, Feb 15"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      placeholder="e.g., 6:00 PM"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="venue">Venue *</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => handleInputChange('venue', e.target.value)}
                    placeholder="Enter venue name or 'Online'"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="Enter image URL"
                  />
                </div>

                <Button onClick={handleSubmit} className="w-full mt-4">
                  {editingId ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Events List */}
        <div className="grid gap-4">
          {events.map((event) => {
            const eventRegistrations = getEventRegistrations(event.id);
            const isExpanded = expandedEvents.has(event.id);

            return (
              <Card key={event.id} className="animate-fade-in">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{event.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.venue}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-medium text-foreground">Free</span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                          {event.category}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {eventRegistrations.length} registered
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(event)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Registered Users Section */}
                  <Collapsible open={isExpanded} onOpenChange={() => toggleEventExpanded(event.id)}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-4 justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          View Registered Attendees ({eventRegistrations.length})
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      {eventRegistrations.length === 0 ? (
                        <div className="text-center py-4 text-muted-foreground text-sm">
                          No registrations yet
                        </div>
                      ) : (
                        <div className="border border-border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="text-left p-3 font-medium">Ticket ID</th>
                                <th className="text-left p-3 font-medium">Name</th>
                                <th className="text-left p-3 font-medium">Email</th>
                                <th className="text-left p-3 font-medium">Phone</th>
                                <th className="text-left p-3 font-medium">Registered</th>
                              </tr>
                            </thead>
                            <tbody>
                              {eventRegistrations.map((reg) => (
                                <tr key={reg.ticketId} className="border-t border-border">
                                  <td className="p-3">
                                    <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                      {reg.ticketId}
                                    </span>
                                  </td>
                                  <td className="p-3">
                                    <div className="flex items-center gap-2">
                                      <User className="h-4 w-4 text-muted-foreground" />
                                      {reg.firstName} {reg.lastName}
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      {reg.email}
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-muted-foreground" />
                                      {reg.phone || '-'}
                                    </div>
                                  </td>
                                  <td className="p-3 text-muted-foreground">
                                    {new Date(reg.registeredAt).toLocaleDateString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            );
          })}

          {events.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No events yet. Create your first event!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
