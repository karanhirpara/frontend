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
import {createEvent, fetchEventByHost,deleteEventById} from '@/services/eventApi';
import { s } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';
import { set } from 'date-fns';

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  image: string;        // final image URL (or preview)
imageFile?: File;    // local upload

}

const initialFormData: EventFormData = {
  title: '',
  description: '',
  date: '',
  time: '',
  venue: '',
  category: 'Business',
  image: '',          // IMPORTANT
  imageFile: undefined
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
    console.log(events);
      const loadEvents = async () => {
        try {
          const data = await fetchEventByHost();
          console.log(data);
          setEvents(data);
        } catch (err) {
          console.error(err);
        }
      };
  
      loadEvents();
    }, []);
  useEffect(() => {
    const stored = localStorage.getItem('registrations');
    if (stored) {
      setRegistrations(JSON.parse(stored));
    }
  }, []);
  
  const getEventRegistrations = (eventId: string) => {
    console.log(eventId);
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
  const handleImageUpload = (file: File) => {
  setFormData(prev => ({
    ...prev,
    imageFile: file,
    image: URL.createObjectURL(file),
  }));
};


  const handleSubmit = async () => {
    console.log(formData);
  if (!formData.title || !formData.date || !formData.venue || !formData.imageFile) {
    return;
  }
  
  try {
    const data = new FormData();

    data.append("image", formData.imageFile); // MUST match multer
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("date", formData.date);
    data.append("time", formData.time);
    data.append("venue", formData.venue);
    data.append("category", formData.category);

    const response = await createEvent(data);

    // optional: update UI with backend response
    setEvents(prev => [response.data, ...prev]);

    setFormData(initialFormData);
    setEditingId(null);
    setIsDialogOpen(false);
  } catch (err: any) {
    console.error(err.message);
  }
};


  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.Date,
      time: event.Time,
      venue: event.venue,
      category: event.category,
      image: event.image,
    });
    setEditingId(event._id);
    setIsDialogOpen(true);
  };

  const handleDelete =async (id: string) => {
    try{
    console.log(id);
     await deleteEventById(id);
    setEvents((prev) => prev.filter((event) => event._id !== id));
    }
    catch(err){
      console.log(err);
    }
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
    <Label>Event Image</Label>

  <label
    htmlFor="event-image"
    className="relative h-48 border border-dashed border-border rounded-lg
               flex items-center justify-center cursor-pointer overflow-hidden"
  >
    {formData.imageFile ? (
      <img
        src={formData.image}
        alt="Event"
        className="absolute inset-0 w-full h-full object-cover"
      />
    ) : (
      <span className="text-sm text-muted-foreground">
        Click to upload image
      </span>
    )}
  </label>

  <input
    id="event-image"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) handleImageUpload(file);
    }}
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
            const eventRegistrations = getEventRegistrations(event._id);
            const isExpanded = expandedEvents.has(event._id);

            return (
              <Card key={event._id} className="animate-fade-in">
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
                          {event.Date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.Time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.venue}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                          {event.category}
                        </span>
                       
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(event._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Registered Users Section */}
                  
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
