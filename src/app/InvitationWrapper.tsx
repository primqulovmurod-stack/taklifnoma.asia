'use client';

import React, { useState, useEffect } from 'react';
import RolexLuxuryInvitation from '@/components/RolexLuxuryInvitation';
import PinkLuxuryInvitation from '@/components/PinkLuxuryInvitation';
import WatchDesignInvitation from '@/components/WatchDesignInvitation';
import GoldClassicInvitation from '@/components/GoldClassicInvitation';
import GoldWhiteInvitation from '@/components/GoldWhiteInvitation';
import PinkWhiteInvitation from '@/components/PinkWhiteInvitation';

interface InvitationWrapperProps {
  initialHost: string;
}

export default function InvitationWrapper({ initialHost }: InvitationWrapperProps) {
  const [mounted, setMounted] = useState(false);
  // Improved detection
  const hostLower = initialHost.toLowerCase();
  const isXurshid = hostLower.includes('xurshid') || hostLower.includes('mohinur') || hostLower.includes('rolex') || hostLower.includes('watch');
  
  const [theme, setTheme] = useState<'rolex' | 'pink' | 'watch' | 'goldclassic' | 'goldwhite'>(() => {
    if (hostLower.includes('watch')) return 'watch';
    if (hostLower.includes('goldclassic')) return 'goldclassic';
    if (hostLower.includes('goldwhite') || hostLower.includes('white')) return 'goldwhite';
    if (hostLower.includes('rolex')) return 'rolex';
    if (isXurshid) return 'rolex'; // default to rolex theme for Xurshid if no specific keyword
    if (hostLower.includes('localhost')) return 'goldwhite'; // Default to Kenjabek Gold-White locally
    return 'pink';
  });

  useEffect(() => {
    setMounted(true);
    const search = window.location.search.replace(/%3D/gi, '=').toLowerCase();
    const params = new URLSearchParams(search);
    const themeParam = params.get('theme');
    const windowHost = window.location.hostname.toLowerCase();
    const isXurshidHost = windowHost.includes('xurshid') || windowHost.includes('mohinur') || windowHost.includes('rolex') || windowHost.includes('watch');
    
    if (themeParam === 'rolex' || (windowHost.includes('rolex') && isXurshidHost)) {
      setTheme('rolex');
    } else if (themeParam === 'pink-luxury' || (windowHost.includes('pink') && isXurshidHost)) {
      setTheme('rolex'); // We'll handle pink luxury separately in the return
    } else if (themeParam === 'watch' || windowHost.includes('watch')) {
      setTheme('watch');
    } else if (themeParam === 'goldwhite' || windowHost.includes('goldwhite') || windowHost.includes('gold-white') || windowHost.includes('white')) {
      setTheme('goldwhite');
    } else if (themeParam === 'goldclassic' || windowHost.includes('goldclassic')) {
      setTheme('goldclassic');
    } else if (themeParam === 'pink' || (windowHost.includes('pink') && !isXurshidHost)) {
      setTheme('pink');
    } else if (windowHost.includes('localhost')) {
      setTheme('goldwhite');
    } else {
      setTheme('pink');
    }
  }, []);

  if (!mounted) return null;



  let content;
  // Handle Xurshid's themes
  if (isXurshid) {
    if (hostLower.includes('pink') || theme === 'pink') {
      content = <PinkLuxuryInvitation groomName="Xurshidbek" brideName="Mohinur" />;
    } else {
      content = <RolexLuxuryInvitation groomName="Xurshidbek" brideName="Mohinur" />;
    }
  } else if (theme === 'pink' || hostLower.includes('pink')) {
    content = (
      <PinkWhiteInvitation 
        groomName="Kenjabek"
        brideName="Safiya"
        date="24 - APREL - 2026"
        time="19:00"
        locationName="Demir (Asr)"
        locationAddress="Jizzax Shahar"
        locationUrl="https://www.google.com/maps/place/ASR+Wedding+Hall/@40.1490597,67.8229612,20.75z/data=!4m6!3m5!1s0x38b2969244164953:0xcf441bf7b030ea16!8m2!3d40.1490952!4d67.8228464!16s%2Fg%2F11h9w32rg7!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
        imageUrl="https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg"
        musicUrl="/assets/die_with_a_smile.mp3"
      />
    );
  } else if (theme === 'rolex' || hostLower.includes('rolex') || hostLower.includes('localhost')) {
    content = <RolexLuxuryInvitation groomName="Xurshidbek" brideName="Mohinur" />;
  } else if (theme === 'watch') {
    content = (
      <div className="bg-black">
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
  } else if (theme === 'goldclassic') {
    content = (
      <GoldClassicInvitation 
        groomName="Kenjabek"
        brideName="Safiya"
        date="24 - APREL - 2026"
        time="19:00"
        locationName="Demir (Asr)"
        locationAddress="Jizzax Shahar"
        locationUrl="https://www.google.com/maps/place/ASR+Wedding+Hall/@40.1490597,67.8229612,20.75z/data=!4m6!3m5!1s0x38b2969244164953:0xcf441bf7b030ea16!8m2!3d40.1490952!4d67.8228464!16s%2Fg%2F11h9w32rg7!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
        imageUrl="https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg"
        musicUrl="/assets/die_with_a_smile.mp3"
        cardName="Kenjabek"
      />
    );
  } else if (theme === 'goldwhite') {
    content = (
      <GoldWhiteInvitation 
        groomName="Kenjabek"
        brideName="Safiya"
        date="24 - APREL - 2026"
        time="19:00"
        locationName="Demir (Asr)"
        locationAddress="Jizzax Shahar"
        locationUrl="https://www.google.com/maps/place/ASR+Wedding+Hall/@40.1490112,67.822955,20.25z/data=!4m6!3m5!1s0x38b2969244164953:0xcf441bf7b030ea16!8m2!3d40.1490952!4d67.8228464!16s%2Fg%2F11h9w32rg7!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
        imageUrl="https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg"
        musicUrl="/assets/die_with_a_smile.mp3"
        cardName="Kenjabek"
      />
    );
  } else {
    content = (
      <div className="bg-[#f8f8f8]">
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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {content}
      </div>
    </div>
  );
}

