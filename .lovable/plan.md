
# Implementation Plan: Simplified Ticketing System

## Overview
This plan simplifies the ticketing flow to one ticket per user, removes pricing options, adds a "My Tickets" navigation link to the user menu, and displays registered users in the admin event management dashboard.

---

## Changes Summary

### 1. Remove Quantity Selection (One Ticket Per User)
The current `TicketSelector` component allows users to select multiple tickets with +/- buttons. This will be replaced with a simple single-ticket selection.

**Files to modify:**
- `src/components/TicketSelector.tsx` - Replace quantity controls with a simple checkbox/card selection for one ticket

### 2. Remove Pricing Options
All pricing tiers (Early Bird, General, VIP) will be removed. Events will only have "General Admission" as a single free ticket type.

**Files to modify:**
- `src/components/TicketSelector.tsx` - Remove tiered pricing logic
- `src/pages/EventDetail.tsx` - Remove "Ticket Information" pricing section showing Early Bird/VIP prices

### 3. Ticket Contains Full User Info + Ticket ID
The ticket already stores user information. This will be enhanced to ensure it displays prominently in the "My Tickets" section.

**Current data structure (already in place):**
```typescript
interface Registration {
  ticketId: string;      // e.g., "TKT-A1B2C3D4"
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registeredAt: string;
}
```

### 4. Add "My Tickets" Link to User Menu
The Tickets icon in the header menu currently does nothing. It will be linked to the `/my-tickets` route.

**Files to modify:**
- `src/components/Header.tsx` - Make the Tickets menu item navigate to `/my-tickets`
- `src/App.tsx` - Confirm `/my-tickets` route exists (already present)

### 5. My Tickets Page with Download Option
The `MyTickets.tsx` page already exists with download functionality. No major changes needed - just ensure it works correctly with the simplified flow.

### 6. Admin Dashboard Shows Registered Users Inside Each Event
The Admin Dashboard already has a collapsible section showing registered attendees with their ticket ID, name, email, and phone. This is already implemented and working.

---

## Technical Details

### File 1: `src/components/TicketSelector.tsx`
**Current state:** Multi-ticket selection with quantity +/- controls and price tiers
**New state:** Single ticket confirmation card with "Register for this event" option

Changes:
- Remove `quantities` state and `updateQuantity` function
- Remove Early Bird, General, VIP tiers
- Show a single "General Admission - Free" ticket option
- Add a selected state (boolean) instead of quantity
- Remove pricing calculations and fees display

### File 2: `src/components/RegistrationModal.tsx`
**Current state:** Uses `selectedTickets` object with quantities
**New state:** Uses boolean `ticketSelected` state

Changes:
- Simplify `selectedTickets` from object to boolean
- Remove `totalTickets` calculation (always 1)
- Update validation logic for single ticket

### File 3: `src/pages/EventDetail.tsx`
**Current state:** Shows pricing tiers (Early Bird, General, VIP)
**New state:** Shows single "Free Admission" info

Changes:
- Remove the "Ticket Information" section with multiple price tiers
- Keep simple "Free" display in sidebar

### File 4: `src/components/Header.tsx`
**Current state:** Tickets menu item has no navigation
**New state:** Navigates to `/my-tickets`

Changes:
- Add `onClick={() => navigate('/my-tickets')}` to the Tickets dropdown item
- Also make the Ticket icon button in nav bar navigate to `/my-tickets`

---

## User Flow After Implementation

1. **User visits event page** → Sees "Free" badge, clicks "Register Now"
2. **Registration modal opens** → Shows single "General Admission - Free" ticket card
3. **User confirms ticket** → Proceeds to enter personal details (name, email, phone)
4. **Registration complete** → Ticket ID generated (e.g., TKT-A1B2C3D4)
5. **User accesses "My Tickets"** → Sees ticket with all info + download button
6. **Admin views dashboard** → Expands event to see list of registered attendees with full details

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/TicketSelector.tsx` | Modify - simplify to single ticket |
| `src/components/RegistrationModal.tsx` | Modify - update for single ticket flow |
| `src/pages/EventDetail.tsx` | Modify - remove pricing tiers section |
| `src/components/Header.tsx` | Modify - add My Tickets navigation |

No new files needed - all functionality exists, just needs simplification.
