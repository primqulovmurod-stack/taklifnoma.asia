'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, Navigation, Clock, Calendar, CreditCard, ChevronDown, Volume2, VolumeX, Heart } from 'lucide-react';

interface RolexLuxuryInvitationProps {
  groomName?: string;
  brideName?: string;
  date?: string;
  time?: string;
  locationName?: string;
  locationAddress?: string;
  imageUrl?: string;
  musicUrl?: string;
  cardNumber?: string;
  cardName?: string;
  isPreview?: boolean;
}

export default function RolexLuxuryInvitation({
  groomName = "Xurshidbek",
  brideName = "Mohinur",
  date = "20 Iyun 2026",
  time = "18:00",
  locationName = "Oqsaroy Koshonasi",
  locationAddress = "Surxondaryo viloyati, Sho'rchi tumani",
  imageUrl = "https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg",
  musicUrl = "/assets/die_with_a_smile.mp3",
  cardNumber = "9860 1234 5678 1234",
  cardName = "FALONCHI P.",
  isPreview = false
}: RolexLuxuryInvitationProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Autoplay blocked'));
      }
    }
  }, [musicUrl]);

  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isUnlocked]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleUnlock = () => {
    setIsUnlocked(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-white text-[#212121] selection:bg-[#006039]/10 font-sans overflow-x-hidden">
      <audio ref={audioRef} src={musicUrl} loop crossOrigin="anonymous" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#006039] px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="w-24" />
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mb-1">
             <span className="text-[10px] text-white font-serif italic">{groomName[0]}{brideName[0]}</span>
          </div>
          <span className="text-[10px] tracking-[0.3em] font-bold text-white uppercase block leading-none">Nikoh</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleMusic} 
            className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-700 ${
                isPlaying ? 'bg-[#006039] shadow-lg shadow-[#006039]/20 scale-110' : 'bg-gray-100'
            }`}
          >
            {/* Animated Ring */}
            {isPlaying && (
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-30" />
            )}
            
            <div className={`relative z-10 ${isPlaying ? 'text-white' : 'text-gray-400'}`}>
                {isPlaying ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                        <Volume2 size={20} />
                    </motion.div>
                ) : (
                    <VolumeX size={20} />
                )}
            </div>
            
            {/* Visualizer Lines */}
            {isPlaying && (
                <div className="absolute -bottom-1 flex gap-0.5 items-end h-2">
                    {[1, 2, 3, 4].map(i => (
                        <motion.div 
                            key={i}
                            animate={{ height: [4, 8, 4] }}
                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                            className="w-0.5 bg-white rounded-full"
                        />
                    ))}
                </div>
            )}
          </button>
        </div>
      </nav>

      {/* Lock Screen */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f8f8f8]">
             <motion.div className="text-center space-y-12">
                <div className="relative inline-block px-6 xs:px-12 py-12 xs:py-16 bg-white shadow-2xl rounded-sm border border-black/5 mx-4">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#006039] rounded-full flex items-center justify-center border-4 border-[#f8f8f8] shadow-xl">
                      <span className="text-xl text-white font-serif italic">{groomName[0]}{brideName[0]}</span>
                   </div>
                   <h2 className="text-2xl xs:text-3xl font-serif tracking-tighter italic mb-2">{groomName} & {brideName}</h2>
                   <div className="w-12 h-px bg-[#a37e2c] mx-auto mb-6 xs:mb-8" />
                   <p className="text-[10px] tracking-[0.4em] font-bold text-[#006039] mb-10 xs:mb-12 uppercase">Taklifnoma Asia</p>
                   <button onClick={handleUnlock} className="w-full h-14 bg-[#006039] text-white text-[10px] xs:text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-[#004e2e] transition-all flex items-center justify-center gap-3 px-6 xs:px-8 group">
                     Ochish <ChevronDown className="group-hover:translate-y-1 transition-transform" />
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className={`transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
        <section className="relative h-screen w-full flex items-center justify-center pt-20 px-4 md:px-6 overflow-hidden bg-[#006039]">
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, 100]) }} className="absolute inset-0 z-0">
            <img src={imageUrl} alt="Hero" className="absolute inset-0 w-full h-full object-cover brightness-50" />
          </motion.div>
          <div className="relative z-10 text-center text-white space-y-8">
             <h1 className="text-4xl xs:text-5xl md:text-8xl font-serif leading-tight italic">{groomName} & {brideName}</h1>
             <p className="text-sm md:text-xl font-light tracking-widest max-w-xl mx-auto px-4 opacity-80 leading-relaxed">Ushbu lahzalarning har bir soniyasi - abadiylikka daxldor. Bizning eng baxtli kunimizda birga bo'ling.</p>
          </div>
        </section>

        {/* Date/Location/Card/Footer as per user request */}
        <section className="py-24 px-6 bg-white text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-12">
               <span className="text-[#006039] text-[10px] tracking-[0.6em] font-bold uppercase block">Tantana Sanasi</span>
               <h2 className="text-5xl md:text-7xl font-serif italic">{date}</h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
                   <InfoBox label="Sana" value={date} />
                   <InfoBox label="Vaqt" value={time} />
                   <InfoBox label="Manzil" value={locationName} />
                   <InfoBox label="Turi" value="Nikoh Oqshomi" />
               </div>
            </motion.div>
        </section>

        {/* Map */}
        <section className="py-24 px-4 bg-[#f8f8f8] text-center">
           <div className="max-w-4xl mx-auto space-y-8">
              <h3 className="text-3xl font-serif italic">{locationName}</h3>
              <p className="text-black/50 text-sm tracking-wide">{locationAddress}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 max-w-lg mx-auto">
                 <a href="#" className="h-14 bg-[#006039] text-white text-[10px] font-bold tracking-widest uppercase flex items-center justify-center rounded-sm">GOOGLE XARITA</a>
                 <a href="#" className="h-14 border border-black/10 text-[#212121] text-[10px] font-bold tracking-widest uppercase flex items-center justify-center rounded-sm">YANDEX XARITA</a>
              </div>
           </div>
        </section>

        {/* Dynamic Card Section */}
        <section className="py-32 px-6 bg-white text-center">
           <motion.div {...fadeIn} className="max-w-2xl mx-auto space-y-12">
              <h2 className="text-4xl font-serif italic">To'yona uchun</h2>
              <p className="text-black/50 text-sm italic tracking-widest font-light">Agarda bizni masofadan turib tabriklamoqchi bo'lsangiz, quyidagi karta raqami orqali o'z sovg'angizni yuborishingiz mumkin.</p>
              
              <div className="bg-[#006039] p-8 md:p-12 text-white text-left relative overflow-hidden shadow-2xl rounded-sm">
                 <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><CreditCard size={120} /></div>
                 <div className="relative z-10 space-y-8">
                    <div className="flex justify-between items-start">
                       <div className="w-12 h-8 bg-gradient-to-tr from-[#a37e2c] to-[#ebd4a5] rounded-md" />
                       <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">UZCARD / HUMO</p>
                    </div>
                    <div>
                       <p className="text-[8px] tracking-[0.2em] opacity-40 mb-2 uppercase">Karta raqami</p>
                       <p className="text-xl xs:text-2xl font-mono tracking-widest">{cardNumber}</p>
                    </div>
                    <div className="flex flex-col xs:flex-row justify-between items-center gap-6 pt-4 border-t border-white/10">
                       <div>
                          <p className="text-[8px] tracking-[0.2em] opacity-40 mb-1 uppercase">Egasi</p>
                          <p className="text-lg font-serif italic">{cardName}</p>
                       </div>
                       <button onClick={copyToClipboard} className={`w-full xs:w-auto px-8 py-4 text-[10px] font-black tracking-widest uppercase transition-all ${isCopied ? 'bg-white text-[#006039]' : 'border border-white/30 text-white hover:bg-white/10'}`}>
                          {isCopied ? 'NUSXALANDI!' : 'NUSXALASH'}
                       </button>
                    </div>
                 </div>
              </div>
           </motion.div>
        </section>

        {/* Footer Branding */}
        <footer className="py-32 px-6 bg-white border-t border-black/5 text-center space-y-12">
            <div className="space-y-6">
                <p className="text-4xl font-serif italic text-gray-800">Taklifnoma Asia</p>
                <p className="text-[10px] tracking-[0.6em] text-[#006039] font-black uppercase">Baxtli lahzalar maskani</p>
            </div>
            <div className="space-y-6 pt-12">
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest italic">O'z taklifnomangizni yarating:</p>
                <a 
                  href="https://taklifnoma.asia" 
                  className="inline-block px-12 py-6 bg-[#006039] text-white text-[11px] font-black tracking-[0.3em] uppercase hover:scale-105 transition-all shadow-xl shadow-[#006039]/20"
                >
                   Taklifnoma Yaratish
                </a>
            </div>
        </footer>
      </main>
    </div>
  );
}

function InfoBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-8 border border-black/5 text-center space-y-2">
       <p className="text-[9px] font-bold tracking-widest text-black/30 uppercase">{label}</p>
       <p className="text-xl font-serif text-[#006039]">{value}</p>
    </div>
  );
}
