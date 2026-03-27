'use client';

import React, { useState, useEffect } from 'react';
import RolexLuxuryInvitation from '@/components/RolexLuxuryInvitation';
import PinkLuxuryInvitation from '@/components/PinkLuxuryInvitation';
import WatchDesignInvitation from '@/components/WatchDesignInvitation';
import GoldClassicInvitation from '@/components/GoldClassicInvitation';
import GoldWhiteInvitation from '@/components/GoldWhiteInvitation';

interface InvitationWrapperProps {
  initialHost: string;
}

export default function InvitationWrapper({ initialHost }: InvitationWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'rolex' | 'pink' | 'watch' | 'goldclassic' | 'goldwhite'>(
    initialHost.includes('pink') ? 'pink' : 
    initialHost.includes('watch') ? 'watch' : 
    initialHost.includes('goldclassic') ? 'goldclassic' : 'goldwhite'
  );

  useEffect(() => {
    setMounted(true);
    const search = window.location.search.replace(/%3D/gi, '=');
    const params = new URLSearchParams(search);
    const themeParam = params.get('theme');
    
    if (themeParam === 'pink' || window.location.hostname.includes('pink')) {
      setTheme('pink');
    } else if (themeParam === 'watch' || window.location.hostname.includes('watch')) {
      setTheme('watch');
    } else if (themeParam === 'goldwhite' || window.location.hostname.includes('goldwhite') || window.location.hostname.includes('gold-white') || window.location.hostname.includes('white')) {
      setTheme('goldwhite');
    } else if (themeParam === 'goldclassic' || window.location.hostname.includes('goldclassic')) {
      setTheme('goldclassic');
    } else {
      setTheme('goldwhite');
    }
  }, []);

  if (!mounted) return null;

  if (theme === 'pink') {
    return (
      <PinkLuxuryInvitation 
        groomName="Xurshidbek"
        brideName="Mohinur"
        musicUrl="/assets/die_with_a_smile.mp3"
      />
    );
  }

  if (theme === 'watch') {
    return (
      <div className="bg-black min-h-screen">
        <WatchDesignInvitation 
          groomName="Xurshid"
          brideName="Mohinur"
          date="20 Iyun 2026"
          time="18:00"
          locationName="Oqsaroy Koshonasi"
          locationAddress="Sho'rchi tumani"
          imageUrl="https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg"
          musicUrl="/assets/die_with_a_smile.mp3"
        />
      </div>
    );
  }

  if (theme === 'goldclassic') {
    return (
      <GoldClassicInvitation 
        groomName="Kenjabek"
        brideName="Safiya"
        date="24 - APREL - 2026"
        time="19:00"
        locationName="Demir (Asr)"
        locationAddress="Jizzax Shahar"
        locationLink="https://www.google.com/maps/place/ASR+Wedding+Hall/@40.1490597,67.8229612,20.75z/data=!4m6!3m5!1s0x38b2969244164953:0xcf441bf7b030ea16!8m2!3d40.1490952!4d67.8228464!16s%2Fg%2F11h9w32rg7!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
        imageUrl="https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg"
        musicUrl="/assets/die_with_a_smile.mp3"
      />
    );
  }

  if (theme === 'goldwhite') {
    return (
      <GoldWhiteInvitation 
        groomName="Kenjabek"
        brideName="Safiya"
        date="24 - APREL - 2026"
        time="19:00"
        locationName="Demir (Asr)"
        locationAddress="Sho'rchi tumani"
        locationLink="https://www.google.com/maps/place/ASR+Wedding+Hall/@40.1490597,67.8229612,20.75z/data=!4m6!3m5!1s0x38b2969244164953:0xcf441bf7b030ea16!8m2!3d40.1490952!4d67.8228464!16s%2Fg%2F11h9w32rg7!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
        imageUrl="https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg"
        musicUrl="/assets/die_with_a_smile.mp3"
      />
    );
  }

  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      <RolexLuxuryInvitation 
        groomName="Xurshidbek"
        brideName="Mohinur"
        date="20 Iyun 2026"
        time="18:00"
        locationName="Oqsaroy Koshonasi"
        locationAddress="Surxondaryo viloyati, Sho'rchi tumani"
        imageUrl="https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg"
        musicUrl="/assets/die_with_a_smile.mp3"
      />
    </div>
  );
}

