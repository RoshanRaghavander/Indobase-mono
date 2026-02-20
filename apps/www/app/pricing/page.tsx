import type { Metadata } from 'next'
import PricingContent from './PricingContent'

export const metadata: Metadata = {
  title: 'Pricing & Fees | IndoBase',
  description:
    'Explore IndoBase fees and pricing information. Find our competitive pricing Plans, with no hidden pricing. We have a generous Free Plan for those getting started, and Pay As You Go for those scaling up.',
  openGraph: {
    title: 'Pricing & Fees | IndoBase',
    description:
      'Explore IndoBase fees and pricing information. Find our competitive pricing Plans, with no hidden pricing. We have a generous Free Plan for those getting started, and Pay As You Go for those scaling up.',
    url: 'https://indobase.com/pricing',
    images: [
      {
        url: 'https://indobase.com/images/og/indobase-og.png',
      },
    ],
  },
}

export default function PricingPage() {
  return <PricingContent />
}
