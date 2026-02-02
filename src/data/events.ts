import {fetchAllEvents } from '../services/eventApi';
export interface Event {
  _id: string;
  title: string;
  description: string;
  Date: string; 
  Time: string;
  venue: string;
  image: string;
  category: string;
}

export const sampleEvents: Event[] = [
  {
    _id: '1',
    title: 'Governance Under Fire: Legal Duties Every NDIS Leader Must Know',
    description: 'An important seminar on legal obligations for NDIS leaders.',
    Date: 'Thu, Feb 12',
    Time: '12:30 PM GMT+5:30',
    venue: 'Online',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
    category: 'Business',
  },
  {
    _id: '2',
    title: 'Governance Under Fire: Legal Duties Every NDIS Leader Must Know',
    description: 'An important seminar on legal obligations for NDIS leaders.',
    Date: 'Thu, Feb 12',
    Time: '12:30 PM GMT+5:30',
    venue: 'Online',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
    category: 'Business',
  },
  {
    _id: '3',
    title: 'Governance Under Fire: Legal Duties Every NDIS Leader Must Know',
    description: 'An important seminar on legal obligations for NDIS leaders.',
    Date: 'Thu, Feb 12',
    Time: '12:30 PM GMT+5:30',
    venue: 'Online',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
    category: 'Business',
  }
];
