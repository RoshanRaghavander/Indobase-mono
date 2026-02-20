import type { Metadata } from 'next'
import { getStaticEvents } from '~/lib/events'
import { EventClientRenderer } from '~/components/Events/new/EventClientRenderer'

export const metadata: Metadata = {
  title: 'View all IndoBase events and meetups.',
  description:
    'Find all the upcoming events, webinars and meetups hosted by indobase and its community.',
}

export default async function EventsPage() {
  // This needs to be server-side as we use FS api.
  const { upcomingEvents, onDemandEvents } = await getStaticEvents()

  return <EventClientRenderer staticEvents={upcomingEvents} onDemandEvents={onDemandEvents} />
}
