import { headers } from 'next/headers';
import { Metadata } from 'next';
import { GiftSection } from '@/components/luxury/GiftSection';
import { RSVPSection } from '@/components/luxury/RSVPSection';
import { LockScreen } from '@/components/luxury/LockScreen';
import InvitationWrapper from './InvitationWrapper';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const isPink = host.includes('pink');

  if (isPink) {
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

  if (host.includes('gold') || host.includes('white') || host.includes('rus') || host.includes('localhost')) {
    return {
      title: "Кенжабек и София - Свадебное приглашение",
      description: "Приглашаем вас на наш самый счастливый день!",
      openGraph: {
        title: "Кенжабек и София - Свадебное приглашение",
        description: "Будьте с нами в наш самый счастливый день!",
        images: ['/assets/og-preview.jpg'],
      }
    };
  }

  return {
    title: "Xurshid & Mohinur - Nikoh to'yi",
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
