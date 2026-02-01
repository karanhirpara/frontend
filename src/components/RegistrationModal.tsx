import { useState } from 'react';
import { X, User, Mail, Phone, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { TicketSelector } from './TicketSelector';
import type { Event } from '@/data/events';

interface RegistrationModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onRegister?: (registration: Registration) => void;
}

export interface Registration {
  ticketId: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registeredAt: string;
}

type Step = 'tickets' | 'details' | 'confirmation';

function generateTicketId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'TKT-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function RegistrationModal({ event, isOpen, onClose, onRegister }: RegistrationModalProps) {
  const [step, setStep] = useState<Step>('tickets');
  const [ticketSelected, setTicketSelected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agreeTerms: false,
  });

  const handleNext = () => {
    if (step === 'tickets' && ticketSelected) {
      setStep('details');
    } else if (step === 'details') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    const ticketId = generateTicketId();
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setGeneratedTicketId(ticketId);
      
      const registration: Registration = {
        ticketId,
        eventId: event.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        registeredAt: new Date().toISOString(),
      };
      
      // Store registration in localStorage
      const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      localStorage.setItem('registrations', JSON.stringify([...existingRegistrations, registration]));
      
      onRegister?.(registration);
      setStep('confirmation');
    }, 1500);
  };

  const handleClose = () => {
    setStep('tickets');
    setTicketSelected(false);
    setGeneratedTicketId('');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', agreeTerms: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Register for Event</h2>
            <p className="text-sm text-muted-foreground line-clamp-1">{event.title}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Steps */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-center gap-2 p-4 border-b border-border">
            {['tickets', 'details'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s
                      ? 'bg-primary text-primary-foreground'
                      : ['tickets', 'details'].indexOf(step) > i
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {['tickets', 'details'].indexOf(step) > i ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 1 && <div className="w-12 h-0.5 bg-muted mx-1" />}
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {step === 'tickets' && (
            <TicketSelector onSelect={setTicketSelected} />
          )}

          {step === 'details' && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Your Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeTerms: checked as boolean })
                  }
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the Terms of Service and Privacy Policy. I consent to receive event
                  updates via email.
                </Label>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Registration Successful!</h3>
              <p className="text-muted-foreground mb-6">
                You're registered for {event.title}. A confirmation email has been sent to your email address.
              </p>

              <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Ticket ID:</span>{' '}
                  <span className="font-mono font-bold text-primary">{generatedTicketId}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Name:</span>{' '}
                  <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Email:</span>{' '}
                  <span className="font-medium">{formData.email}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Event:</span>{' '}
                  <span className="font-medium">{event.title}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Date:</span>{' '}
                  <span className="font-medium">{event.date}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Time:</span>{' '}
                  <span className="font-medium">{event.time}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Venue:</span>{' '}
                  <span className="font-medium">{event.venue}</span>
                </p>
              </div>

              <Button className="mt-6" onClick={handleClose}>
                Done
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'confirmation' && (
          <div className="sticky bottom-0 bg-background border-t border-border p-4 flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (step === 'details') setStep('tickets');
                else handleClose();
              }}
            >
              {step === 'tickets' ? 'Cancel' : 'Back'}
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (step === 'tickets' && !ticketSelected) ||
                (step === 'details' && (!formData.firstName || !formData.email || !formData.agreeTerms)) ||
                isProcessing
              }
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : step === 'tickets' ? (
                'Continue'
              ) : (
                'Complete Registration'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
