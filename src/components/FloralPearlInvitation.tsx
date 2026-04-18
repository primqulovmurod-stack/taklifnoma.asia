'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronDown, 
  Volume2, 
  VolumeX,
  Heart,
  MailOpen,
  Music
} from 'lucide-react';

interface FloralPearlInvitationProps {
  groomName?: string;
  brideName?: string;
  date?: string;
  time?: string;
  locationName?: string;
  locationAddress?: string;
  locationUrl?: string;
  musicUrl?: string;
  isPreview?: boolean;
  isMuted?: boolean;
}

export default function FloralPearlInvitation({
  groomName = "Mardonbek",
  brideName = "Gulnoza",
  date = "24 - MAY - 2026",
  time = "18:00",
  locationName = "TANTANA",
  locationAddress = "Kattaqo'rg'on shahri",
  locationUrl = "https://maps.google.com",
  musicUrl = "/assets/die_with_a_smile.mp3",
  isPreview = false,
  isMuted = false
}: FloralPearlInvitationProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPreview) return;
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpened, isPreview]);

  const handleOpen = () => {
    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      setIsPlaying(true);
    }
  };

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

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  // Date parsing
  const dateParts = date.split(' - ');
  const day = dateParts[0] || "24";
  const month = dateParts[1] || "MAY";
  const year = dateParts[2] || "2026";

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-gray-800 font-sans overflow-x-hidden selection:bg-[#E2C285]/20 relative">
      <audio ref={audioRef} src={musicUrl} loop />

      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }} />

      {isOpened && (
        <button 
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 p-4 bg-white/40 backdrop-blur-xl border border-[#E2C285]/40 rounded-full shadow-xl text-[#B45309] hover:scale-110 transition-all active:scale-95"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      )}

      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 overflow-hidden"
            style={{
              backgroundImage: 'url("/assets/floral-pearl.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay for readability if needed, but here we want the "Open" UI */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="relative z-10 text-center space-y-12"
            >
              <div className="space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/40 flex items-center justify-center p-4 backdrop-blur-sm bg-white/5 shadow-2xl mx-auto"
                >
                  <div className="text-center">
                    <h2 className="text-6xl md:text-8xl font-serif italic text-white drop-shadow-2xl">
                      {groomName[0]} <span className="text-3xl md:text-4xl">&</span> {brideName[0]}
                    </h2>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <p className="text-xs tracking-[0.6em] uppercase font-bold text-white drop-shadow-lg">
                  TO'YIMIZGA TAKLIF ETAMIZ
                </p>
                
                <motion.button 
                  onClick={handleOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex flex-col items-center gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center group-hover:bg-white/40 transition-all duration-500 shadow-2xl">
                    <MailOpen className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.4em] text-white uppercase group-hover:tracking-[0.6em] transition-all duration-500">
                    TAKLIFNOMANI OCHISH
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`transition-all duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section with the Floral Frame */}
        <section className="relative min-h-[110vh] w-full flex flex-col items-center justify-start pt-32 px-4 md:px-6 overflow-hidden">
          {/* Main Frame Image - Vertical aspect like the original */}
          <div className="absolute inset-0 z-0">
             <img 
               src="/assets/floral-pearl.png" 
               alt="Floral Frame" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={isOpened ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
            className="relative z-10 text-center space-y-8 md:space-y-12 max-w-4xl pt-10"
          >
            <div className="space-y-6">
               <span className="text-[10px] md:text-sm tracking-[0.6em] md:tracking-[0.8em] font-bold text-[#8B5E3C] uppercase block">
                  OILALARIMIZ BILAN BIRGA
               </span>
               <div className="w-12 h-px bg-[#D4AF37]/50 mx-auto" />
            </div>

            <h1 className="flex flex-col items-center justify-center gap-4 md:gap-8">
               <span className="text-5xl md:text-8xl font-serif italic text-[#6B4423] drop-shadow-sm">{groomName}</span>
               <div className="flex items-center gap-4 w-full justify-center">
                  <div className="h-px w-8 md:w-20 bg-[#D4AF37]/30" />
                  <span className="text-serif italic text-2xl md:text-4xl text-[#B45309]">va</span>
                  <div className="h-px w-8 md:w-20 bg-[#D4AF37]/30" />
               </div>
               <span className="text-5xl md:text-8xl font-serif italic text-[#6B4423] drop-shadow-sm">{brideName}</span>
            </h1>

            <div className="space-y-4 pt-8">
               <p className="text-base md:text-xl font-serif italic tracking-wide max-w-md mx-auto text-[#8B5E3C] leading-relaxed">
                 Bizning hayotimizdagi eng muhim va unutilmas kunda yonimizda bo'lishingizdan bag'oyatda xursandmiz.
               </p>
            </div>

            <div className="pt-8 flex flex-col items-center gap-4">
               <div className="px-10 py-4 border-y border-[#D4AF37]/30">
                  <p className="text-2xl md:text-4xl font-serif tracking-[0.2em] font-bold text-[#6B4423]">
                    {day} . {month} . {year}
                  </p>
               </div>
               <p className="text-sm tracking-[0.4em] font-bold text-[#8B5E3C] uppercase">{time} DA</p>
            </div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="pt-20 opacity-40 text-[#8B5E3C]"
            >
               <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        </section>

        {/* Date Section */}
        <section className="py-24 md:py-48 px-4 bg-white relative">
           <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <motion.div {...fadeIn} className="space-y-6 mb-16">
                 <div className="w-20 h-px bg-[#D4AF37] mx-auto opacity-30" />
                 <h2 className="text-4xl md:text-6xl font-serif italic text-[#6B4423]">Kutib Qolamiz</h2>
                 <p className="text-xs tracking-[0.3em] font-bold text-[#8B5E3C] uppercase">SAVE THE DATE</p>
              </motion.div>

              <motion.div 
                {...fadeIn}
                className="w-full max-w-lg p-8 md:p-12 rounded-[3rem] bg-[#FEFCF7] border border-[#F3E8D2] shadow-2xl relative overflow-hidden"
              >
                {/* Decorative Flowers in corners */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                  <img src="/assets/floral-pearl.png" className="w-full h-full object-cover rounded-full rotate-90" />
                </div>
                <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 pointer-events-none">
                  <img src="/assets/floral-pearl.png" className="w-full h-full object-cover rounded-full -rotate-90" />
                </div>

                <div className="text-center mb-8 pb-4 border-b border-[#D4AF37]/10">
                  <h3 className="text-2xl md:text-3xl font-serif italic text-[#6B4423]">{month} {year}</h3>
                </div>
                
                <div className="grid grid-cols-7 gap-4 text-center text-[10px] font-bold text-[#B45309] opacity-60 mb-8 tracking-widest uppercase">
                  <span>YA</span><span>DU</span><span>SE</span><span>CH</span><span>PA</span><span>JU</span><span>SH</span>
                </div>
                
                <div className="grid grid-cols-7 gap-y-6 text-center">
                  {/* Simplistic calendar logic for display */}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div key={i} className="relative py-2">
                       {i + 1 === parseInt(day) ? (
                         <div className="relative inline-flex items-center justify-center w-10 h-10 mx-auto">
                            <div className="absolute inset-0 bg-[#E2C285]/20 rounded-full scale-110 animate-pulse" />
                            <div className="absolute inset-0 border border-[#E2C285]/50 rounded-full" />
                            <span className="text-[#6B4423] font-bold text-lg relative z-10">{i + 1}</span>
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[#D4AF37]">
                               <Heart size={14} fill="currentColor" />
                            </div>
                         </div>
                       ) : (
                         <span className="opacity-40 text-[#8B5E3C]">{i + 1}</span>
                       )}
                    </div>
                  ))}
                </div>
              </motion.div>
           </div>
        </section>

        {/* Location Section */}
        <section className="py-24 md:py-48 px-6 bg-[#FEFCF7] relative">
           <div className="max-w-3xl mx-auto">
              <motion.div {...fadeIn} className="text-center mb-20 space-y-6">
                 <h2 className="text-4xl md:text-6xl font-serif italic text-[#6B4423]">To'yxona Manzili</h2>
                 <div className="w-24 h-px bg-[#D4AF37] mx-auto opacity-30" />
              </motion.div>

              <motion.div 
                {...fadeIn}
                className="bg-white p-10 md:p-20 text-center space-y-12 shadow-2xl rounded-3xl border border-[#F3E8D2]"
              >
                <div className="w-20 h-20 border border-[#D4AF37]/50 rounded-full flex items-center justify-center mx-auto text-[#B45309]">
                   <MapPin size={32} strokeWidth={1} />
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <p className="text-3xl md:text-5xl font-serif italic text-[#6B4423]">{locationName}</p>
                      <p className="text-xs tracking-[0.4em] font-bold text-[#8B5E3C] uppercase">{locationAddress}</p>
                   </div>
                   
                   <p className="text-lg md:text-xl text-[#B45309] font-serif italic lowercase tracking-widest">
                      {day} {month} — {time}
                   </p>
                </div>

                <div className="pt-8">
                   <a 
                      href={locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 px-12 py-5 bg-[#B45309] text-white rounded-full text-xs font-bold tracking-[0.3em] uppercase shadow-2xl hover:bg-[#8B5E3C] transition-all"
                   >
                      <MapPin size={18} />
                      XARITADA KO'RISH
                   </a>
                </div>
              </motion.div>
           </div>
        </section>

        {/* Footer */}
        <footer className="py-32 px-6 bg-white text-center border-t border-[#F3E8D2]">
           <div className="space-y-12">
              <div className="space-y-4">
                 <p className="text-lg font-serif italic text-[#8B5E3C]">
                   Tashrifingiz biz uchun qadrlidir.
                 </p>
                 <h4 className="text-4xl md:text-6xl font-serif italic text-[#6B4423]">
                    {groomName} <span className="text-2xl opacity-50">&</span> {brideName}
                 </h4>
              </div>

              <div className="pt-24 border-t border-[#F3E8D2] max-w-sm mx-auto space-y-8">
                <div className="space-y-2">
                   <p className="text-[10px] tracking-[0.8em] font-bold text-[#B45309] uppercase">TAKLIFNOMA.ASIA</p>
                </div>
                <a href="https://taklifnoma.asia" target="_blank" className="inline-block px-8 py-4 border border-[#B45309]/30 text-[#B45309] rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#B45309] hover:text-white transition-all">
                  O'Z TAKLIFNOMANGIZNI YARATING
                </a>
              </div>
           </div>
        </footer>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:wght@300;400;700&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .font-sans {
          font-family: 'Montserrat', sans-serif;
        }

        body {
          background-color: #FFFDF9;
        }
      `}</style>
    </div>
  );
}
