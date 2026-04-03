'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  ChevronDown, 
  Volume2, 
  VolumeX,
  Heart,
  Music,
  MailOpen
} from 'lucide-react';

interface GoldClassicInvitationProps {
  groomName?: string;
  brideName?: string;
  date?: string;
  time?: string;
  locationName?: string;
  locationAddress?: string;
  locationUrl?: string;
  imageUrl?: string;
  musicUrl?: string;
}

export default function GoldClassicInvitation({
  groomName = "Kenjabek",
  brideName = "Safiya",
  date = "24 - APREL - 2026",
  time = "19:00",
  locationName = "Demir (Asr)",
  locationAddress = "Sho'rchi tumani",
  locationUrl = "https://maps.google.com",
  imageUrl = "https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg",
  musicUrl = "https://www.learningcontainer.com/wp-content/uploads/2020/02/Sample-MP3-File.mp3"
}: GoldClassicInvitationProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scrollni bloklash (Taklifnoma ochilmaguncha)
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpened]);

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

  const handleOpen = () => {
    setIsOpened(true);
    // Sahifani eng tepaga qaytarish
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      setIsPlaying(true);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: "easeOut" } as any
  };

  const goldGradient = "bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#DAA520]";
  const goldText = "bg-clip-text text-transparent bg-gradient-to-b from-[#D4AF37] via-[#F9E29C] to-[#B8860B]";

  const GoldOrnament = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center justify-center gap-4 py-12 ${className}`}>
        <div className="h-[0.5px] w-12 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        <div className="relative group">
            <div className="absolute inset-0 bg-[#D4AF37] blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-[#D4AF37] relative z-10">
                <path d="M20 0L24 10L34 10L26 15L29 20L20 16L11 20L14 15L6 10L16 10L20 0Z" fill="currentColor" className="opacity-80" />
                <path d="M0 10C5 10 10 5 20 5C30 5 35 10 40 10" stroke="currentColor" strokeWidth="0.5" />
                <path d="M0 10C5 10 10 15 20 15C30 15 35 10 40 10" stroke="currentColor" strokeWidth="0.5" />
            </svg>
        </div>
        <div className="h-[0.5px] w-12 md:w-32 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent" />
    </div>
  );

  const dateParts = date.split(' - ');
  const day = parseInt(dateParts[0]) || 24;
  const monthName = dateParts[1] || "APREL";
  const year = dateParts[2] || "2026";

  const monthMap: { [key: string]: number } = {
    "YANVAR": 0, "FEVRAL": 1, "MART": 2, "APREL": 3, "MAY": 4, "IYUN": 5,
    "IYUL": 6, "AVGUST": 7, "SENTYABR": 8, "OKTYABR": 9, "NOYABR": 10, "DEKABR": 11
  };

  const targetDate = new Date(
    parseInt(year),
    monthMap[monthName.toUpperCase()] || 3,
    day,
    parseInt(time.split(':')[0]) || 19,
    parseInt(time.split(':')[1]) || 0
  ).toISOString();

  const firstDayOfMonth = new Date(
    parseInt(year),
    monthMap[monthName.toUpperCase()] || 3,
    1
  ).getDay();

  const daysInMonth = new Date(
    parseInt(year),
    (monthMap[monthName.toUpperCase()] || 3) + 1,
    0
  ).getDate();

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#D4AF37]/20 relative flex justify-center">
      <div className="w-full max-w-[500px] bg-[#0A0A0A] min-h-screen relative shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        <audio ref={audioRef} src={musicUrl} loop />

        {/* Decorative Background Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0" 
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }} />

        {/* Floating Music Button */}
        {isOpened && (
          <button 
            onClick={toggleMusic}
            className="fixed top-6 right-6 z-50 p-4 bg-black/40 backdrop-blur-xl border border-[#D4AF37]/40 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.2)] text-[#D4AF37] hover:scale-110 transition-all active:scale-95"
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        )}

        {/* Splash Screen */}
        <AnimatePresence>
          {!isOpened && (
            <div className={`absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#0F0F0F] p-6 overflow-hidden ${isOpened ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{ transition: 'opacity 1s ease-in-out' }}>
              <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/20 blur-[120px] rounded-full" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#B8860B]/20 blur-[120px] rounded-full" />
              </div>

              <div className="text-center space-y-20 relative z-10">
                <div className="relative">
                  <div className="w-40 h-40 border border-[#D4AF37] rounded-full flex items-center justify-center mx-auto relative">
                      <div className="w-[112%] h-[112%] border border-[#D4AF37]/30 rounded-full absolute" 
                           style={{ borderStyle: 'dashed' }} />
                      <div className="w-[105%] h-[105%] border border-[#D4AF37]/50 rounded-full absolute" />
                      <h1 className={`text-5xl font-serif italic ${goldText}`}>
                          {groomName[0]} <span className="text-3xl align-middle font-serif">&</span> {brideName[0]}
                      </h1>
                      
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0F0F0F] px-4 py-1 border border-[#D4AF37]/30 rounded-full text-[#D4AF37]">
                          <Heart size={18} fill="currentColor" />
                      </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <p className="text-[11px] tracking-[0.8em] uppercase font-bold text-[#D4AF37]/80">TO'YIMIZGA TAKLIF ETAMIZ</p>
                  <GoldOrnament className="py-2" />
                  <div className="flex flex-col items-center gap-10">
                      <button 
                          onClick={handleOpen}
                          className="group relative flex flex-col items-center gap-6 hover:scale-105 transition-transform"
                      >
                          <div className="relative w-24 h-24 mb-2">
                               <div className="absolute inset-[-4px] border border-[#D4AF37]/20 rounded-full animate-pulse" />
                               <div className="absolute inset-0 bg-[#D4AF37] blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-700" />
                               
                               <div className="relative w-full h-full rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-black shadow-[0_0_50px_rgba(212,175,55,0.2)] group-hover:border-[#D4AF37] transition-all duration-500 overflow-hidden">
                                   <MailOpen className="w-10 h-10 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                               </div>
                          </div>

                          <div className="space-y-3 flex flex-col items-center">
                              <span className="text-[13px] font-bold tracking-[0.6em] text-[#D4AF37] uppercase">
                                  TAKLIFNOMANI OCHISH
                              </span>
                          </div>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        <main className={`transition-all duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
          <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            <div className="absolute inset-0">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "linear" }}
                src={imageUrl} 
                alt="Wedding Theme" 
                className="w-full h-full object-cover grayscale brightness-[0.4]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0A0A0A]" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-screen" />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-center px-4 space-y-12"
            >
              <div className="space-y-4">
                  <span className="text-[11px] tracking-[1em] font-bold text-[#D4AF37] uppercase block">OILALARIMIZ BILAN BIRGA</span>
                  <div className="w-12 h-px bg-[#D4AF37]/50 mx-auto" />
              </div>

              <h1 className="flex flex-col items-center justify-center gap-6">
                <span className={`text-6xl font-serif italic drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] ${goldText}`}>{groomName}</span>
                <span className="text-serif italic text-3xl text-white/40">va</span>
                <span className={`text-6xl font-serif italic drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] ${goldText}`}>{brideName}</span>
              </h1>

              <p className="text-xl font-serif italic tracking-wide text-white/80 leading-relaxed shadow-sm">
                  Sizni hayotimizdagi eng muhim kun - <br />nikoh kechamizga lutfan taklif etamiz
              </p>

              <div className="pt-20">
                  <div className="inline-block relative px-12 py-6 border-y border-[#D4AF37]/40">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />
                      <p className={`text-2xl font-serif tracking-[0.4em] uppercase ${goldText} font-bold`}>{date}</p>
                  </div>
              </div>
            </motion.div>
          </section>

          <section className="py-32 px-6 bg-[#0F0F0F] relative overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col items-center">
              <motion.div {...fadeIn} className="text-center mb-24 space-y-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
                      <span className="text-[#D4AF37] text-xs tracking-[0.6em] font-bold uppercase">Wedding Day</span>
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
                  </div>
                  <h2 className={`text-4xl font-serif italic tracking-tight ${goldText}`}>Sanani Eslab Qoling</h2>
                  <GoldOrnament />
              </motion.div>

              <motion.div 
                {...fadeIn}
                className="w-full max-w-sm bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-[#D4AF37]/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative"
              >
                <div className="text-center mb-10 pb-6 border-b border-[#D4AF37]/10">
                  <h3 className={`text-2xl font-serif italic ${goldText} font-bold`}>{monthName} {year}</h3>
                </div>
                
                <div className="grid grid-cols-7 gap-2 text-center text-[9px] font-bold text-[#D4AF37] opacity-60 mb-8 tracking-widest">
                  <span>YA</span><span>DU</span><span>SE</span><span>CH</span><span>PA</span><span>JU</span><span>SH</span>
                </div>
                
                <div className="grid grid-cols-7 gap-y-4 text-center items-center">
                  {[...Array(firstDayOfMonth)].map((_, i) => (
                    <div key={`empty-${i}`} className="py-2" />
                  ))}

                  {[...Array(daysInMonth)].map((_, i) => (
                    <div key={i} className="relative py-2">
                      {i + 1 === day ? (
                        <div className="relative inline-flex items-center justify-center w-10 h-10">
                          <motion.div 
                            initial={{ scale: 0, rotate: -45 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            className={`absolute inset-0 ${goldGradient} rounded-xl shadow-lg shadow-[#D4AF37]/40`}
                          />
                          <span className="text-black font-bold text-base relative z-10">{i + 1}</span>
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[#D4AF37] drop-shadow-md">
                              <Heart size={14} fill="currentColor" />
                          </div>
                        </div>
                      ) : (
                        <span className="opacity-40 text-sm font-medium text-white">{i + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-32 px-6 bg-[#0A0A0A] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
               <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] rounded-full" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
              <motion.div {...fadeIn} className="text-center mb-16 space-y-4">
                 <span className="text-[#D4AF37] text-[10px] tracking-[0.8em] font-bold uppercase">EVENT DETAILS</span>
                 <h2 className={`text-4xl font-serif italic ${goldText}`}>Nikoh Marosimi</h2>
                 <GoldOrnament />
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                className="bg-white/5 backdrop-blur-md p-10 text-center space-y-10 border border-[#D4AF37]/20 shadow-2xl rounded-3xl group"
              >
                  <div className="w-20 h-20 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#D4AF37] relative">
                      <div className="absolute inset-1 border border-[#D4AF37]/30 rounded-full animate-ping" />
                      <MapPin size={32} />
                  </div>

                  <div className="space-y-6">
                      <div className="space-y-2">
                          <p className={`text-3xl font-serif italic text-white`}>{locationName}</p>
                          <p className="text-[#D4AF37] text-[10px] tracking-[0.4em] font-bold uppercase">{locationAddress}</p>
                      </div>
                      
                      <div className="w-16 h-px bg-[#D4AF37]/30 mx-auto" />
                      
                      <p className="text-xl text-white/70 font-serif italic tracking-wide">
                          {date}, JUMA <br />
                          <span className="text-[#D4AF37] font-bold mt-2 inline-block uppercase text-sm tracking-[0.2em]">VAQT {time}</span>
                      </p>
                  </div>

                  <div className="pt-4">
                      <a 
                          href={locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full h-14 gold-shimmer text-black font-bold tracking-[0.3em] uppercase text-[11px] shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-3 rounded-full active:scale-95`}
                      >
                          <MapPin size={18} />
                          XARITANI KO'RISH
                      </a>
                  </div>
              </motion.div>
            </div>
          </section>

          <section className="py-32 px-6 bg-[#060606] text-white overflow-hidden relative">
            <div className="max-w-5xl mx-auto text-center space-y-20 relative z-10">
              <motion.div {...fadeIn} className="space-y-6">
                <span className="text-[#D4AF37] text-xs tracking-[0.8em] font-bold uppercase opacity-80">QANCHA VAQT QOLDI?</span>
                <h2 className={`text-4xl font-serif italic ${goldText}`}>Baxtli Kunimizgacha</h2>
                <GoldOrnament />
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                  <CountdownItem label="KUN" date={targetDate} type="days" />
                  <CountdownItem label="SOAT" date={targetDate} type="hours" />
                  <CountdownItem label="DAQIQA" date={targetDate} type="minutes" />
                  <CountdownItem label="SONIYA" date={targetDate} type="seconds" />
              </div>
            </div>
          </section>

          <section className="py-32 px-6 bg-[#0F0F0F] relative overflow-hidden">
             <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
                <motion.div {...fadeIn} className="space-y-4">
                  <span className="text-[#D4AF37] text-xs tracking-[0.6em] font-bold uppercase">TO'YONA UCHUN</span>
                  <h2 className={`text-4xl font-serif italic ${goldText}`}>Wedding Gift</h2>
                  <GoldOrnament />
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="max-w-[320px] mx-auto aspect-[1.586/1] bg-[#0A0A0A] p-6 text-white text-left relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-2xl border border-[#D4AF37]/30 group"
                >
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                   
                   <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                         <div className={`w-12 h-8 ${goldGradient} rounded shadow-xl relative overflow-hidden`}>
                             <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.5)_50%,transparent_75%)] bg-[length:10px_10px]" />
                         </div>
                         <div className="text-right">
                             <span className="text-[8px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase block">UZCARD / HUMO</span>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <div className="space-y-1">
                            <p className="text-[7px] font-bold tracking-[0.3em] text-[#D4AF37]/60 uppercase">KARTA RAQAMI</p>
                            <p className="text-lg font-mono tracking-[0.1em] text-white/95">9860 6004 0356 5382</p>
                         </div>
                         <div className="flex justify-between items-end border-t border-white/5 pt-3">
                            <div className="flex-1 min-w-0">
                               <p className="text-[7px] font-bold tracking-[0.3em] text-[#D4AF37]/60 uppercase mb-1">KARTA EGASI</p>
                               <p className="text-base font-serif italic text-white/90 truncate">{groomName}</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <button 
                      onClick={() => {
                          navigator.clipboard.writeText("9860600403565382");
                          alert("Nusxalandi!");
                      }}
                      className="absolute top-4 right-2 p-2 text-[#D4AF37]/60 hover:text-[#D4AF37] rounded-full transition-all"
                   >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                   </button>
                </motion.div>
                <p className="text-base text-white/40 font-serif italic tracking-wide">"Sizning tashrifingiz biz uchun eng ulug' to'yonadir"</p>
             </div>
          </section>

          <footer className="py-32 px-6 bg-[#0A0A0A] text-center relative border-t border-[#D4AF37]/10">
            <div className="space-y-12">
              <div className="space-y-4">
                 <p className="text-lg font-serif italic text-white/30">Minnatdorchilik va sevgi bilan,</p>
                 <div className={`text-5xl font-serif italic ${goldText}`}>{groomName} va {brideName}</div>
              </div>
              
              <GoldOrnament />
              
              <div className="pt-20 border-t border-white/5 max-w-xs mx-auto space-y-8">
                <div className="space-y-2">
                  <p className="text-[10px] tracking-[0.8em] font-bold text-[#D4AF37] uppercase">VIRTUAL TAKLIFNOMA</p>
                  <div className="h-px w-16 bg-[#D4AF37]/30 mx-auto" />
                </div>

                <div className="space-y-3">
                  <p className="text-[9px] text-gray-600 uppercase tracking-[0.4em]">Buyurtma qilish uchun:</p>
                  <a href="tel:+998915930833" className={`text-xl font-medium ${goldText} font-sans`}>+998 91 593 08 33</a>
                </div>

                <div>
                  <a 
                    href="https://t.me/taklifnomaai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-block text-[10px] font-bold tracking-[0.3em] text-black gold-shimmer px-8 py-4 rounded-full shadow-lg active:scale-95`}
                  >
                    TELEGRAM BUYURTMA
                  </a>
                </div>
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

          @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
          }

          .gold-shimmer {
              background: linear-gradient(90deg, #B8860B 25%, #FFD700 50%, #DAA520 75%);
              background-size: 200% auto;
              animation: shimmer 5s infinite linear;
          }
        `}</style>
      </div>
    </div>
  );
}

const CountdownItem = ({ label, date, type }: { label: string, date: string, type: string }) => {
    const [value, setValue] = useState(0);
    const goldText = "bg-clip-text text-transparent bg-gradient-to-b from-[#D4AF37] via-[#F9E29C] to-[#B8860B]";

    useEffect(() => {
        const target = new Date(date).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;
            
            let val = 0;
            if (type === 'days') val = Math.floor(distance / (1000 * 60 * 60 * 24));
            else if (type === 'hours') val = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            else if (type === 'minutes') val = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            else if (type === 'seconds') val = Math.floor((distance % (1000 * 60)) / 1000);
            
            setValue(val >= 0 ? val : 0);
        }, 1000);
        return () => clearInterval(interval);
    }, [date, type]);

    return (
        <div className="relative p-6 bg-white/5 border border-[#D4AF37]/10 group rounded-2xl backdrop-blur-sm shadow-2xl flex flex-col items-center">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/30" />
            
            <div className={`text-4xl font-serif font-bold mb-2 ${goldText}`}>
                {String(value).padStart(2, '0')}
            </div>
            <div className="text-[10px] tracking-[0.4em] font-bold text-white/40 uppercase">{label}</div>
        </div>
    );
};
