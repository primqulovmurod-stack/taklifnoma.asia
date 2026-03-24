'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { LockScreen } from '@/components/luxury/LockScreen';
import { HeroSection } from '@/components/luxury/HeroSection';
import { CalendarSection } from '@/components/luxury/CalendarSection';
import { VenueSection } from '@/components/luxury/VenueSection';
import { CountdownSection } from '@/components/luxury/CountdownSection';
import { GiftSection } from '@/components/luxury/GiftSection';

export default function LuxuryInvitation() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Disable scrolling while locked
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isUnlocked]);

  // Prevent hydration mismatch for body scroll style lock
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <div className="bg-white min-h-[100svh] selection:bg-purple-200 font-sans text-[#0F172A]">
      <AnimatePresence>
        {!isUnlocked && <LockScreen onUnlock={() => setIsUnlocked(true)} />}
      </AnimatePresence>

      <main 
        className={`relative w-full ${isUnlocked ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'} transition-opacity duration-1000 delay-500`}
      >
        <HeroSection />
        <CalendarSection />
        <VenueSection />
        <CountdownSection />
        <GiftSection />
        
        <footer className="py-12 md:py-24 bg-[#F8FAFC] text-center border-t border-purple-50 flex flex-col items-center justify-center space-y-4 md:space-y-6 font-sans px-4">
          <div className="w-12 h-[3px] bg-primary rounded-full" />
          <p className="text-2xl md:text-4xl font-black text-[#0F172A] tracking-tight">
            Xurshidbek <span className="text-primary">&amp;</span> Mohinur
          </p>
          <p className="text-xs md:text-sm font-bold text-[#64748B]">
            Eng baxtli kunimizda biz bilan bo'ling
          </p>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 w-full max-w-sm flex flex-col items-center gap-3 md:gap-4">
            <a href="https://taklifnoma.ai" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:text-[#6B21A8] transition-colors bg-purple-100 px-6 py-2 rounded-full border border-purple-200">
              taklifnoma.ai orqali yaratildi
            </a>
            <a href="tel:+998915930833" className="text-[11px] font-bold text-[#64748B] hover:text-[#0F172A] uppercase tracking-widest transition-colors mt-2">
              taklifnoma buyurtma qilish: +998 91 593 08 33
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
