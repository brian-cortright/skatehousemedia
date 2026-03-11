import { Metadata } from 'next';
import EventsPageClient from '@/components/EventsPage/EventsPage';

export const metadata: Metadata = {
  title: 'SkateHouseMedia | Events Calendar',
  description: 'Upcoming skateboarding events, competitions, and community meetups around the globe.',
};

export default function EventsPage() {
  return <EventsPageClient />;
}
