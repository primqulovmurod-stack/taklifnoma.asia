'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { LockScreen } from '@/components/luxury/LockScreen';
import { HeroSection } from '@/components/luxury/HeroSection';
import { CalendarSection } from '@/components/luxury/CalendarSection';
import { VenueSection } from '@/components/luxury/VenueSection';
import { CountdownSection } from '@/components/luxury/CountdownSection';
import { GiftSection } from '@/components/luxury/GiftSection';

interface PinkLuxuryInvitationProps {
  musicUrl?: string;
  groomName?: string;
  brideName?: string;
  cardNumber?: string;
  cardName?: string;
}

export default function PinkLuxuryInvitation({
  musicUrl = "/assets/die_with_a_smile.mp3",
  groomName = "Xurshidbek",
  brideName = "Mohinur",
  cardNumber,
  cardName
}: PinkLuxuryInvitationProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Disable scrolling while locked
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isUnlocked]);

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <div className="bg-white min-h-[100svh] selection:bg-purple-200 font-sans text-[#0F172A]">
      <audio ref={audioRef} src={musicUrl} loop />
      <AnimatePresence>
        {!isUnlocked && (
          <LockScreen 
            onUnlock={() => {
              setIsUnlocked(true);
              // Sahifani eng tepaga qaytarish
              window.scrollTo({ top: 0, behavior: 'instant' });
              
              if (audioRef.current) {
                audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
              }
            }} 
          />
        )}
      </AnimatePresence>

      <main 
        className={`relative w-full ${isUnlocked ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'} transition-opacity duration-1000 delay-500`}
      >
        <HeroSection />
        <CalendarSection />
        <VenueSection />
        <CountdownSection />
        <GiftSection cardNumber={cardNumber} cardName={cardName} />
        
        <footer className="py-12 md:py-24 bg-[#F8FAFC] text-center border-t border-purple-50 flex flex-col items-center justify-center space-y-4 md:space-y-6 font-sans px-4">
          <div className="w-12 h-[3px] bg-purple-600 rounded-full" />
          <p 
            className="text-3xl md:text-5xl font-medium text-[#0F172A] tracking-wider italic"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {groomName} <span className="text-purple-300 font-light mx-1" style={{ fontFamily: 'var(--font-playfair)' }}>&amp;</span> {brideName}
          </p>
          <p className="text-xs md:text-sm font-bold text-[#64748B]">
            Eng baxtli kunimizda biz bilan bo'ling
          </p>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 w-full max-w-sm flex flex-col items-center gap-3 md:gap-4">
            <p className="text-[10px] md:text-sm font-bold text-[#64748B] uppercase tracking-widest italic">
              Taklifnoma Asia orqali yaratildi
            </p>
            <a href="https://taklifnoma.asia" target="_blank" rel="noopener noreferrer" className="text-sm font-black text-white bg-purple-600 hover:bg-purple-700 transition-all px-8 py-4 rounded-2xl shadow-xl shadow-purple-200 uppercase tracking-widest">
              Taklifnoma Yaratish
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
