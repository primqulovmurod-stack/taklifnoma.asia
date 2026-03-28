import { headers } from 'next/headers';
import { Metadata } from 'next';
import InvitationWrapper from './InvitationWrapper';
import LandingPage from '@/components/landing/LandingPage';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = (headersList.get('host') || '').toLowerCase();
  
  // Landing Page domains prioritized
  const isLanding = host.includes('taklifnoma.asia') || host.includes('taklifnoma-asia.vercel.app');

  if (isLanding) {
    return {
      title: "Taklifnoma.Asia — Zamonaviy Virtual Taklifnomalar",
      description: "O'zbekistondagi eng chiroyli va interaktiv virtual taklifnomalar xizmati. Musiqa, xarita va RSVP bilan.",
      openGraph: {
        title: "Taklifnoma.Asia — Virtual Taklifnomalar",
        description: "Biz bilan baxtli kuningizni yanada go'zal qiling!",
        images: ['/assets/og-preview.jpg'],
      }
    };
  }

  // Invitations
  const isXurshid = host.includes('xurshid') || host.includes('mohinur') || host.includes('rolex') || host.includes('watch');
  const isKenjabek = (host.includes('gold') || host.includes('white') || host.includes('pink') || host.includes('kenjabek') || host.includes('localhost')) && !isXurshid;
  
  return {
    title: isKenjabek ? "Kenjabek & Snejana - Nikoh to'yi" : "Xurshid & Mohinur - Nikoh to'yi",
    description: "Bizning baxtli kunimizga lutfan taklif etamiz!",
    openGraph: {
      title: isKenjabek ? "Kenjabek & Snejana - Nikoh to'yi" : "Xurshid & Mohinur - Nikoh to'yi",
      description: "Eng baxtli kunimizda biz bilan bo'ling!",
      images: ['/assets/og-preview.jpg'],
    }
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const headersList = await headers();
  const host = (headersList.get('host') || '').toLowerCase();
  const params = await searchParams;
  
  const isMainLanding = host.includes('taklifnoma.asia') || host.includes('taklifnoma-asia.vercel.app');
  
  const isInvitation = !isMainLanding && (
    (host.includes('vercel.app') && !host.includes('taklifnoma-asia')) || 
    host.includes('pink') || 
    host.includes('gold') || 
    host.includes('white') || 
    host.includes('kenjabek') || 
    host.includes('rolex') || 
    host.includes('xurshid') || 
    host.includes('mohinur') ||
    host.includes('localhost') ||
    !!params.theme
  );

  if (isInvitation) {
    return <InvitationWrapper initialHost={host} />;
  }

  return <LandingPage />;
}
