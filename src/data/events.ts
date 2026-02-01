export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  badge?: 'just-added' | 'promoted' | 'free';
  category: string;
}

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Governance Under Fire: Legal Duties Every NDIS Leader Must Know',
    description: 'An important seminar on legal obligations for NDIS leaders.',
    date: 'Thu, Feb 12',
    time: '12:30 PM GMT+5:30',
    venue: 'Online',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
    badge: 'just-added',
    category: 'Business',
  },
  {
    id: '2',
    title: 'Masterclass on achieving financial freedom for working professionals',
    description: 'Learn how to achieve financial independence.',
    date: 'Sat, Feb 7',
    time: '10:00 AM',
    venue: 'Starbucks',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
    category: 'Finance',
  },
  {
    id: '3',
    title: 'Meet the Royal College of Art in Ahmedabad',
    description: 'An exclusive meet and greet with RCA representatives.',
    date: 'Fri, Feb 13',
    time: '5:00 PM',
    venue: 'Fortune Landmark Ahmedabad',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=200&fit=crop',
    category: 'Education',
  },
  {
    id: '4',
    title: 'JetLearn AI Foundations Masterclass for Kids (6-16)',
    description: 'Introduce your kids to the world of AI.',
    date: 'Sun, Feb 15',
    time: '9:30 PM GMT+5:30',
    venue: 'Live Online Class',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop',
    badge: 'promoted',
    category: 'Technology',
  },
  {
    id: '5',
    title: 'Startup Networking Mixer',
    description: 'Connect with fellow entrepreneurs and investors.',
    date: 'Mon, Feb 17',
    time: '6:00 PM',
    venue: 'Innovation Hub',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
    category: 'Networking',
  },
  {
    id: '6',
    title: 'Live Jazz Night at The Blue Room',
    description: 'An evening of smooth jazz and great vibes.',
    date: 'Sat, Feb 22',
    time: '8:00 PM',
    venue: 'The Blue Room',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=200&fit=crop',
    category: 'Music',
  },
];
