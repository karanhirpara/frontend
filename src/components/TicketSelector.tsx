import { useState } from 'react';
import { Ticket, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TicketSelectorProps {
  onSelect: (selected: boolean) => void;
}

export function TicketSelector({ onSelect }: TicketSelectorProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    const newValue = !isSelected;
    setIsSelected(newValue);
    onSelect(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Ticket className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Select Your Ticket</h3>
      </div>

      <div
        onClick={handleSelect}
        className={`border rounded-lg p-4 cursor-pointer transition-all ${
          isSelected
            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
            : 'border-border hover:border-primary/50'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-foreground">General Admission</h4>
              <Badge className="bg-primary/20 text-primary">Free</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Free entry to the event - one ticket per person
            </p>
          </div>
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-primary border-primary'
                : 'border-muted-foreground'
            }`}
          >
            {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {['Event access', 'Digital ticket', 'Email confirmation'].map((perk) => (
            <span
              key={perk}
              className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground flex items-center gap-1"
            >
              <Check className="h-3 w-3 text-primary" />
              {perk}
            </span>
          ))}
        </div>
      </div>

      {isSelected && (
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between items-center font-medium">
            <span>Total</span>
            <span className="text-primary">Free</span>
          </div>
        </div>
      )}
    </div>
  );
}
