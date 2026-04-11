'use client';

import React from 'react';
import { InvitationContent } from '@/lib/types';
import GoldWhiteInvitation from '@/components/GoldWhiteInvitation';
import { FloralInvitation } from '@/components/FloralInvitation';
import GoldClassicInvitation from '@/components/GoldClassicInvitation';
import GoldClassicWhiteInvitation from '@/components/GoldClassicWhiteInvitation';
import RolexLuxuryInvitation from '@/components/RolexLuxuryInvitation';
import MilliyInvitation from '@/components/MilliyInvitation';
import WatchDesignInvitation from '@/components/WatchDesignInvitation';
import PinkLuxuryInvitation from '@/components/PinkLuxuryInvitation';
import { ElegantInvitation } from '@/components/ElegantInvitation';
import LuxuryDarkInvitation from '@/components/LuxuryDarkInvitation';
import PinkWhiteInvitation from '@/components/PinkWhiteInvitation';
import StitchInvitation from '@/components/StitchInvitation/Main';

export const templates = [
  { 
    id: 'pink-luxury', 
    name: 'Pink Luxury Special', 
    image: '/assets/pink_invite_mockup.png',
    style: 'Modern & Soft'
  },
  { 
    id: 'goldclassic', 
    name: 'Gold Classic Black', 
    image: 'https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg',
    style: 'Gold & Black'
  },
  { 
    id: 'gold-classic-white', 
    name: 'Gold Classic White', 
    image: 'https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    style: 'Gold & White'
  }
];

interface TemplatePreviewProps {
  content: InvitationContent;
  cardName?: string;
  isPreview?: boolean;
  isMuted?: boolean;
}

export default function TemplatePreview({ content, isPreview, isMuted }: TemplatePreviewProps) {
  const theme = content.theme || 'pink-luxury';

  switch (theme) {
    case 'gold-white':
      return <GoldWhiteInvitation {...content} isPreview />;
    case 'floral':
      return <FloralInvitation content={content} isPreview />;
    case 'goldclassic':
        return <GoldClassicInvitation {...content} isPreview isMuted={isMuted} />;
    case 'gold-classic-white':
        return <GoldWhiteInvitation {...content} isPreview isMuted={isMuted} />;
    case 'rolex':
        return <RolexLuxuryInvitation {...content} isPreview />;
    case 'milliy':
        return <MilliyInvitation {...content} isPreview />;
    case 'pink-luxury':
        return <PinkLuxuryInvitation {...content} isPreview isMuted={isMuted} />;
    case 'watch-design':
        return <WatchDesignInvitation {...content} isPreview />;
    case 'elegant':
        return <ElegantInvitation content={content} isPreview />;
    case 'luxury-dark':
        return <LuxuryDarkInvitation {...content} isPreview />;
    case 'pink-white':
        return <PinkWhiteInvitation {...content} isPreview />;
    case 'stitch':
        return <StitchInvitation isPreview />;
    default:
      return <GoldWhiteInvitation {...content} isPreview />;
  }
}
