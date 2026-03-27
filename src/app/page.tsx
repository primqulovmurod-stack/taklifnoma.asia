import { headers } from 'next/headers';
import { Metadata } from 'next';
import InvitationWrapper from './InvitationWrapper';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  if (host.includes('pink')) {
    return {
      title: "Xurshidbek & Mohinur - Nikoh to'yi (Pink Edition)",
      description: "Bizning baxtli kunimizga lutfan taklif etamiz!",
      openGraph: {
        title: "Xurshidbek & Mohinur - Nikoh to'yi",
        description: "Eng baxtli kunimizda biz bilan bo'ling!",
        images: ['/assets/floral.png'],
      }
    };
  }

  // Kenjabek & Safiya
  if (host.includes('gold') || host.includes('white') || host.includes('rus') || host.includes('kenjabek') || host.includes('localhost')) {
    return {
      title: "Kenjabek & Safiya - Nikoh to'yi",
      description: "Bizning baxtli kunimizga lutfan taklif etamiz!",
      openGraph: {
        title: "Kenjabek & Safiya - Nikoh to'yi",
        description: "Eng baxtli kunimizda biz bilan bo'ling!",
        images: ['/assets/og-preview.jpg'],
      }
    };
  }

  // Original Rolex (specific match)
  if (host.includes('rolex') || host.includes('xurshid')) {
    return {
      title: "Xurshid & Mohinur - Nikoh to'yi",
      description: "Sizni eng baxtli kunimizga lutfan taklif etamiz!",
      openGraph: {
        title: "Xurshid & Mohinur - Nikoh to'yi",
        description: "Eng baxtli kunimizda biz bilan bo'ling!",
        images: ['/assets/og-preview.jpg'],
      }
    };
  }

  // Global Fallback
  return {
    title: "Virtual Taklifnoma",
    description: "Sizni eng baxtli kunimizga lutfan taklif etamiz!",
    openGraph: {
      images: ['/assets/og-preview.jpg'],
    }
  };
}

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get('host') || '';

  return <InvitationWrapper initialHost={host} />;
}
