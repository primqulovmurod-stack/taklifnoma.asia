'use client';

import React, { useState, useEffect } from 'react';
import RolexLuxuryInvitation from '@/components/RolexLuxuryInvitation';
import PinkLuxuryInvitation from '@/components/PinkLuxuryInvitation';

interface InvitationWrapperProps {
  initialHost: string;
}

export default function InvitationWrapper({ initialHost }: InvitationWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [isPink, setIsPink] = useState(initialHost.includes('pink'));

  useEffect(() => {
    setMounted(true);
    // Double check on client side
    if (window.location.hostname.includes('pink')) {
      setIsPink(true);
    }
  }, []);

  if (!mounted) return null;

  if (isPink) {
    return <PinkLuxuryInvitation />;
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
        musicUrl="https://www.learningcontainer.com/wp-content/uploads/2020/02/Sample-MP3-File.mp3"
      />
    </div>
  );
}
