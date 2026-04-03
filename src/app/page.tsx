import { headers } from 'next/headers';
import { Metadata } from 'next';
import InvitationWrapper from './InvitationWrapper';
import LandingPage from '@/components/landing/LandingPage';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = (headersList.get('host') || '').toLowerCase();
  
  const isLanding = 
    host.includes('taklifnoma.asia') || 
    host.includes('www.taklifnoma.asia') || 
    host.includes('taklifnoma-asia.vercel.app') ||
    host.includes('localhost');

  if (isLanding) {
    return {
      title: "Taklifnoma.Asia — Zamonaviy Virtual Taklifnomalar",
      description: "O'zbekistondagi eng chiroyli va interaktiv virtual taklifnomalar xizmati.",
      openGraph: {
        title: "Taklifnoma.Asia — Virtual Taklifnomalar",
        description: "Biz bilan baxtli kuningizni yanada go'zal qiling!",
        images: ['/assets/og-preview.jpg'],
      }
    };
  }

  return {
    title: "Nikoh to'yi taklifnomasi",
    description: "Bizning baxtli kunimizga lutfan taklif etamiz!",
    openGraph: {
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
  
  const isMainLanding = 
    host.includes('taklifnoma.asia') || 
    host.includes('www.taklifnoma.asia') ||
    host.includes('taklifnoma-asia.vercel.app') ||
    host.includes('localhost');
  
  const isInvitation = !isMainLanding && (
    host.includes('vercel.app') || 
    host.includes('pink') || 
    host.includes('gold') || 
    host.includes('white') || 
    host.includes('kenjabek') || 
    host.includes('rolex') || 
    host.includes('xurshid') || 
    host.includes('mohinur') ||
    !!params.theme
  );

  if (isInvitation) {
    return <InvitationWrapper initialHost={host} />;
  }

  return <LandingPage />;
}
