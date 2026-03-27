import GoldClassicInvitation from '@/components/GoldClassicInvitation';

<<<<<<< HEAD
export const metadata = {
  title: "Kenjabek & Sofiya - Nikoh to'yi",
  description: "Bizning baxtli kunimizga lutfan taklif etamiz!",
};

export default function GoldClassicPage() {
  return (
    <GoldClassicInvitation 
      groomName="Kenjabek"
      brideName="Sofiya"
      date="24 - APREL - 2026"
      time="19:00"
      locationName="Demir (Asr)"
      locationAddress="Jizzax Shahar"
      locationLink="https://www.google.com/maps/place/ASR+Wedding+Hall/@40.1490597,67.8229612,20.75z/data=!4m6!3m5!1s0x38b2969244164953:0xcf441bf7b030ea16!8m2!3d40.1490952!4d67.8228464!16s%2Fg%2F11h9w32rg7!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
      imageUrl="https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg"
      musicUrl="/assets/die_with_a_smile.mp3"
    />
  );
=======
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
>>>>>>> main
}
