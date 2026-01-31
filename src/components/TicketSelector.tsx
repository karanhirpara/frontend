import { useState } from 'react';
import { Ticket, Minus, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  perks?: string[];
}

interface TicketSelectorProps {
  eventPrice: string;
  onSelect: (tickets: { [key: string]: number }) => void;
}

export function TicketSelector({ eventPrice, onSelect }: TicketSelectorProps) {
  const isFreeEvent = eventPrice === 'Free';
  
  const ticketTypes: TicketType[] = isFreeEvent
    ? [
        {
          id: 'general',
          name: 'General Admission',
          price: 0,
          description: 'Free entry to the event',
          available: 100,
          perks: ['Event access', 'Digital certificate'],
        },
      ]
    : [
        {
          id: 'early-bird',
          name: 'Early Bird',
          price: parseFloat(eventPrice.replace('$', '')) * 0.7,
          description: 'Limited early bird pricing',
          available: 5,
          perks: ['Event access', 'Priority seating', 'Event swag'],
        },
        {
          id: 'general',
          name: 'General Admission',
          price: parseFloat(eventPrice.replace('$', '')),
          description: 'Standard entry ticket',
          available: 50,
          perks: ['Event access', 'Digital certificate'],
        },
        {
          id: 'vip',
          name: 'VIP Access',
          price: parseFloat(eventPrice.replace('$', '')) * 2,
          description: 'Premium experience with exclusive perks',
          available: 10,
          perks: ['Event access', 'Priority seating', 'Meet & greet', 'Exclusive merchandise', 'Backstage access'],
        },
      ];

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    ticketTypes.reduce((acc, t) => ({ ...acc, [t.id]: 0 }), {})
  );

  const updateQuantity = (ticketId: string, delta: number) => {
    const ticket = ticketTypes.find((t) => t.id === ticketId);
    if (!ticket) return;

    setQuantities((prev) => {
      const newQty = Math.max(0, Math.min(prev[ticketId] + delta, ticket.available));
      const updated = { ...prev, [ticketId]: newQty };
      onSelect(updated);
      return updated;
    });
  };

  const totalAmount = ticketTypes.reduce(
    (sum, t) => sum + t.price * quantities[t.id],
    0
  );

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Ticket className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Select Tickets</h3>
      </div>

      <div className="space-y-3">
        {ticketTypes.map((ticket) => (
          <div
            key={ticket.id}
            className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">{ticket.name}</h4>
                  {ticket.available <= 10 && (
                    <Badge variant="secondary" className="text-xs bg-destructive/10 text-destructive">
                      {ticket.available} left
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
              </div>
              <p className="font-bold text-foreground">
                {ticket.price === 0 ? 'Free' : `$${ticket.price.toFixed(2)}`}
              </p>
            </div>

            {ticket.perks && (
              <div className="flex flex-wrap gap-2 mb-3">
                {ticket.perks.map((perk) => (
                  <span
                    key={perk}
                    className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground flex items-center gap-1"
                  >
                    <Check className="h-3 w-3 text-primary" />
                    {perk}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(ticket.id, -1)}
                disabled={quantities[ticket.id] === 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{quantities[ticket.id]}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(ticket.id, 1)}
                disabled={quantities[ticket.id] >= ticket.available}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {totalTickets > 0 && (
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-muted-foreground">Tickets ({totalTickets})</span>
            <span className="font-medium">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm mb-3">
            <span className="text-muted-foreground">Fees</span>
            <span className="font-medium">${(totalAmount * 0.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">${(totalAmount * 1.05).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
