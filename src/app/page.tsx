import { headers } from 'next/headers';
import { Metadata } from 'next';
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
