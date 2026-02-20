import { Metadata } from 'next'
import WrappedClient from './WrappedClient'

export const metadata: Metadata = {
  title: 'IndoBase Wrapped 2025',
  description:
    'In 2025, developers around the world shipped faster, scaled further, and built things we never imagined. Here is what you accomplished on IndoBase.',
  openGraph: {
    title: 'IndoBase Wrapped 2025',
    description:
      'In 2025, developers around the world shipped faster, scaled further, and built things we never imagined. Here is what you accomplished on IndoBase.',
    url: 'https://indobase.com/wrapped',
    siteName: 'IndoBase',
    images: [
      {
        url: '/images/wrapped/wrapped-og.png',
        width: 1200,
        height: 630,
        alt: 'IndoBase Wrapped 2025',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndoBase Wrapped 2025',
    description:
      'In 2025, developers around the world shipped faster, scaled further, and built things we never imagined. Here is what you accomplished on IndoBase.',
    images: ['/images/wrapped/wrapped-og.png'],
  },
}

export default function IndoBaseWrappedPage() {
  return <WrappedClient />
}
