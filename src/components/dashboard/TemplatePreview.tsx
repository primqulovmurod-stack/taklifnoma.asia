'use client';

import React from 'react';
import { InvitationContent } from '@/lib/types';
import GoldWhiteInvitation from '@/components/GoldWhiteInvitation';
import { FloralInvitation } from '@/components/FloralInvitation';
import GoldClassicInvitation from '@/components/GoldClassicInvitation';
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
    id: 'rolex', 
    name: 'Rolex Luxury Edition', 
    image: 'https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg',
    style: 'Zamonaviy & Hashamatli'
  },
  { 
    id: 'pink-white', 
    name: 'Pink Romance Edition', 
    image: 'https://images.pexels.com/photos/1035665/pexels-photo-1035665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    style: 'Nozik & Romantik'
  },
  { 
    id: 'gold-white', 
    name: 'Gold & White Classic', 
    image: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    style: 'Elegant & Klassik'
  },
  { 
    id: 'luxury-dark', 
    name: 'Luxury Dark Edition', 
    image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    style: 'Modern Dark'
  },
  { 
    id: 'milliy', 
    name: 'Milliy Ornament', 
    image: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    style: 'An\'anaviy'
  },
  { 
    id: 'pink-luxury', 
    name: 'Pink Luxury Special', 
    image: 'https://images.pexels.com/photos/1035665/pexels-photo-1035665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    style: 'Pushti Premium'
  },
  { 
    id: 'goldclassic', 
    name: 'Eksklyuziv Oltin', 
    image: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    style: 'Elite Klasik'
  },
  { 
    id: 'floral', 
    name: 'Gullar Ifori', 
    image: 'https://images.pexels.com/photos/3052646/pexels-photo-3052646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    style: 'Nozik Atirgullar'
  }
];

interface TemplatePreviewProps {
  content: InvitationContent;
  readonly?: boolean;
}

export default function TemplatePreview({ content, readonly }: TemplatePreviewProps) {
  const theme = content.theme || 'gold-white';

  switch (theme) {
    case 'gold-white':
      return <GoldWhiteInvitation {...content} />;
    case 'floral':
      return <FloralInvitation content={content} />;
    case 'goldclassic':
        return <GoldClassicInvitation {...content} />;
    case 'rolex':
        return <RolexLuxuryInvitation {...content} />;
    case 'milliy':
        return <MilliyInvitation {...content} />;
    case 'pink-luxury':
        return <PinkLuxuryInvitation {...content} />;
    case 'watch-design':
        return <WatchDesignInvitation {...content} />;
    case 'elegant':
        return <ElegantInvitation content={content} />;
    case 'luxury-dark':
        return <LuxuryDarkInvitation {...content} />;
    case 'pink-white':
        return <PinkWhiteInvitation {...content} />;
    case 'stitch':
        return <StitchInvitation />;
    default:
      return <GoldWhiteInvitation {...content} />;
  }
}
