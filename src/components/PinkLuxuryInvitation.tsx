'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

import { LockScreen } from '@/components/luxury/LockScreen';
import { HeroSection } from '@/components/luxury/HeroSection';
import CountdownSection from '@/components/luxury/CountdownSection';
import { CalendarSection } from '@/components/luxury/CalendarSection';
import { VenueSection } from '@/components/luxury/VenueSection';
import { GiftSection } from '@/components/luxury/GiftSection';

interface PinkLuxuryInvitationProps {
  groomName: string;
  brideName: string;
  date?: string;
  time?: string;
  locationName?: string;
  locationAddress?: string;
  locationUrl?: string;
  imageUrl?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  musicUrl?: string;
  cardNumber?: string;
  cardName?: string;
  showGift?: boolean;
  description?: string;
  isPreview?: boolean;
  isMuted?: boolean;
}

export default function PinkLuxuryInvitation({
  groomName = "Murod",
  brideName = "Odina",
  date = "2026-04-24",
  time = "19:00",
  locationName = "Toshkent",
  locationAddress = "",
  locationUrl = "",
  imageUrl = "",
  imageUrl2 = "",
  imageUrl3 = "",
  musicUrl = "",
  cardNumber = "",
  cardName = "",
  showGift = false,
  description = "Sizni kutib qolamiz!",
  isPreview = false,
  isMuted = false
}: PinkLuxuryInvitationProps) {
  const [isUnlocked, setIsUnlocked] = useState(isPreview);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Disable scrolling while locked
  useEffect(() => {
    if (isPreview) {
      document.body.style.overflow = 'auto';
      return;
    }
    
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isUnlocked, isPreview]);

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <div 
      className={`relative min-h-[100svh] selection:bg-purple-200 font-sans text-[#0F172A] bg-cover bg-center ${isPreview ? '' : 'bg-fixed'}`}
      style={{ backgroundImage: 'url("/assets/lock-bg.png")' }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] pointer-events-none" />
      <div className="relative z-10 w-full h-full">
      {musicUrl && <audio ref={audioRef} src={musicUrl} loop muted={isMuted} />}
      <AnimatePresence>
        {!isUnlocked && (
          <LockScreen 
            groomName={groomName}
            brideName={brideName}
            onUnlock={() => {
              setIsUnlocked(true);
              // Sahifani eng tepaga qaytarish
              window.scrollTo({ top: 0, behavior: 'instant' });
              
              if (audioRef.current) {
                audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
                setIsPlaying(true);
              }
            }} 
          />
        )}
      </AnimatePresence>

      {isUnlocked && musicUrl && (
        <button 
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-[150] p-3 md:p-4 bg-white/50 backdrop-blur-xl border border-white/70 rounded-full shadow-[0_8px_30px_rgba(219,39,119,0.15)] hover:scale-110 hover:bg-white/70 active:scale-95 transition-all text-[#BE185D]"
        >
          {isPlaying ? <Volume2 size={24} strokeWidth={2.5} /> : <VolumeX size={24} strokeWidth={2.5} />}
        </button>
      )}

      <main 
        className={`relative w-full ${isUnlocked ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isUnlocked ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <HeroSection groomName={groomName} brideName={brideName} date={date} time={time} isPreview={isPreview} imageUrl={imageUrl} locationUrl={locationUrl} locationName={locationName} locationAddress={locationAddress} description={description} />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <CountdownSection weddingDate={date} isPreview={isPreview} />
          </motion.div>
          
          {/* O'rtadagi rasm bo'limi */}
          <div className={`w-full max-w-lg mx-auto px-6 ${isPreview ? 'py-4' : 'py-8 md:py-12'}`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ${isPreview ? 'h-[300px]' : 'h-[400px] md:h-[500px]'} w-full overflow-hidden shadow-2xl rounded-[2rem] md:rounded-[3rem] border-8 border-white`}
            >
              <div 
                 className="absolute inset-0 bg-cover bg-center" 
                 style={{ backgroundImage: `url("${imageUrl2 || imageUrl || "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2000&auto=format&fit=crop"}")` }} 
               />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <CalendarSection date={date} isPreview={isPreview} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <VenueSection locationName={locationName} locationAddress={locationAddress} locationUrl={locationUrl} isPreview={isPreview} />
          </motion.div>
          
          {/* Pastki rasm bo'limi (Xarita va To'yona o'rtasida) */}
          <div className={`w-full max-w-lg mx-auto px-6 ${isPreview ? 'pb-4' : 'pb-8 md:pb-12'}`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ${isPreview ? 'h-[300px]' : 'h-[400px] md:h-[500px]'} w-full overflow-hidden shadow-2xl rounded-[2rem] md:rounded-[3rem] border-8 border-white`}
            >
               <div 
                 className="absolute inset-0 bg-cover bg-center" 
                 style={{ backgroundImage: `url("${imageUrl3 || imageUrl || "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2000&auto=format&fit=crop"}")` }} 
               />
            </motion.div>
          </div>

          {showGift && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <GiftSection cardNumber={cardNumber} cardName={cardName} isPreview={isPreview} />
            </motion.div>
          )}

          <motion.footer 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="py-12 md:py-24 text-center flex flex-col items-center justify-center space-y-4 md:space-y-6 font-sans px-4"
          >
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

            <div className="mt-6 md:mt-8 pt-6 md:pt-8 w-full max-w-sm flex flex-col items-center gap-3 md:gap-4 border-t border-purple-900/10">
              <p className="text-[10px] md:text-sm font-bold text-[#64748B] uppercase tracking-widest italic">
                Taklifnoma Asia orqali yaratildi
              </p>
              <a href="https://taklifnoma.asia" target="_blank" rel="noopener noreferrer" className="text-sm font-black text-white bg-purple-600 hover:bg-purple-700 transition-all px-8 py-4 rounded-2xl shadow-xl shadow-purple-200 uppercase tracking-widest">
                Taklifnoma Yaratish
              </a>
            </div>
          </motion.footer>
        </motion.div>
      </main>
      </div>
    </div>
  );
}
