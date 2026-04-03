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
  MailOpen,
  Send
} from 'lucide-react';

interface GoldWhiteInvitationProps {
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

const goldText = "bg-clip-text text-transparent bg-gradient-to-b from-[#B8860B] via-[#FFD700] to-[#B8860B]";
const goldGradient = "bg-gradient-to-br from-[#B8860B] via-[#FFD700] to-[#DAA520]";

export default function GoldWhiteInvitation({
  groomName = "Kenjabek",
  brideName = "Safiya",
  date = "24 - APREL - 2026",
  time = "19:00",
  locationName = "Demir (Asr)",
  locationAddress = "Jizzax Shahar",
  locationUrl = "https://maps.google.com",
  imageUrl = "https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg",
  musicUrl = "https://www.learningcontainer.com/wp-content/uploads/2020/02/Sample-MP3-File.mp3"
}: GoldWhiteInvitationProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText("9860600403565382");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: "easeOut" } as any
  };

  const GoldOrnament = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
        <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        <div className="relative group">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-[#D4AF37] relative z-10 transition-transform duration-700 group-hover:rotate-180">
                <path d="M20 0L24 10L34 10L26 15L29 20L20 16L11 20L14 15L6 10L16 10L20 0Z" fill="currentColor" className="opacity-80" />
            </svg>
        </div>
        <div className="h-[0.5px] w-12 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent" />
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
    <div className={`min-h-screen bg-[#F9F9F9] text-gray-900 font-sans overflow-x-hidden selection:bg-[#D4AF37]/20 relative flex justify-center ${!isOpened ? 'h-screen overflow-y-hidden' : ''}`}>
      <div className={`w-full max-w-[500px] bg-white min-h-screen relative shadow-[0_0_100px_rgba(0,0,0,0.05)] ${!isOpened ? 'h-screen overflow-hidden' : ''}`}>
        <audio ref={audioRef} loop preload="auto">
          <source src={musicUrl || "/assets/die_with_a_smile.mp3"} type="audio/mpeg" />
          Sizning brauzeringiz audio elementini qo'llab-quvvatlamaydi.
        </audio>

        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }} />

        {isOpened && (
          <button 
            onClick={toggleMusic}
            className="fixed top-6 right-6 z-50 p-4 bg-white/40 backdrop-blur-xl border border-[#D4AF37]/40 rounded-full shadow-lg text-[#D4AF37] active:scale-95"
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        )}

        <AnimatePresence>
          {!isOpened && (
            <div className={`absolute inset-0 z-[100] flex flex-col items-center justify-start pt-12 bg-white p-6 overflow-hidden ${isOpened ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{ transition: 'opacity 1s ease-in-out' }}>
              <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/20 blur-[120px] rounded-full" />
              </div>

              <div className="text-center space-y-12 relative z-10 flex flex-col items-center">
                <div className="mb-12">
                   <p className="text-[10px] tracking-[0.4em] font-bold text-[#B8962E] uppercase whitespace-nowrap">V I R T U A L &nbsp; T A K L I F N O M A</p>
                   <div className="h-px w-12 bg-[#B8962E]/20 mx-auto mt-2" />
                </div>

                <div className="space-y-8 order-1">
                  <p className="text-[11px] tracking-[0.8em] uppercase font-bold text-[#D4AF37]/80">TO'YIMIZGA TAKLIF ETAMIZ</p>
                  <GoldOrnament className="py-2" />
                </div>

                <div className="relative order-2">
                  <div className="w-40 h-40 border border-[#D4AF37] rounded-full flex items-center justify-center mx-auto relative">
                      <div className="w-[112%] h-[112%] border border-[#D4AF37]/30 rounded-full absolute" 
                           style={{ borderStyle: 'dashed' }} />
                      <h1 className={`text-5xl font-serif italic ${goldText}`}>
                          {groomName[0]} <span className="text-3xl align-middle font-serif text-gray-300">&</span> {brideName[0]}
                      </h1>
                      
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 border border-[#D4AF37]/30 rounded-full text-[#D4AF37]">
                          <Heart size={18} fill="currentColor" />
                      </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-10 pt-10 order-3">
                    <button 
                        onClick={handleOpen}
                        className="group relative flex flex-col items-center gap-6 hover:scale-105 transition-transform"
                    >
                        <div className="relative w-24 h-24 mb-2">
                             <div className="absolute inset-[-4px] border border-[#D4AF37]/20 rounded-full animate-pulse" />
                             <div className="relative w-full h-full rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-white shadow-sm group-hover:border-[#B8860B] transition-all duration-500 overflow-hidden">
                                 <MailOpen className="w-10 h-10 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                             </div>
                        </div>
                        <p className="text-[10px] tracking-[0.4em] font-medium text-[#D4AF37]/60 uppercase whitespace-nowrap">Taklifnomani ochish</p>
                    </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        <main className={`transition-all duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
          <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-24 bg-white">
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
                <span className={`text-6xl font-serif italic ${goldText}`}>{groomName}</span>
                <span className="text-serif italic text-3xl text-gray-300">va</span>
                <span className={`text-6xl font-serif italic ${goldText}`}>{brideName}</span>
              </h1>

              <p className="text-xl font-serif italic tracking-wide text-gray-600 leading-relaxed shadow-sm">
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

          <section className="py-32 px-6 bg-[#FAFAFA] relative overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col items-center">
              <motion.div {...fadeIn} className="text-center mb-20 space-y-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-12 h-px bg-[#D4AF37]" />
                      <span className="text-[#D4AF37] text-xs tracking-[0.6em] font-bold uppercase">Wedding Day</span>
                      <div className="w-12 h-px bg-[#D4AF37]" />
                  </div>
                  <h2 className={`text-4xl font-serif italic tracking-tight ${goldText}`}>Sanani Eslab Qoling</h2>
                  <GoldOrnament />
              </motion.div>

              <motion.div 
                {...fadeIn}
                className="w-full max-w-sm bg-white p-8 rounded-3xl border border-[#D4AF37]/20 shadow-sm relative"
              >
                <div className="text-center mb-10 pb-6 border-b border-[#D4AF37]/10">
                  <h3 className={`text-2xl font-serif italic ${goldText} font-bold`}>{monthName} {year}</h3>
                </div>
                
                <div className="grid grid-cols-7 gap-2 text-center text-[9px] font-bold text-[#D4AF37] opacity-60 mb-8 tracking-widest">
                  <span>YA</span><span>DU</span><span>SE</span><span>CH</span><span>PA</span><span>JU</span><span>SH</span>
                </div>
                
                <div className="grid grid-cols-7 gap-y-6 text-center items-center">
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
                            className={`absolute inset-0 ${goldGradient} rounded-xl shadow-lg shadow-[#D4AF37]/30`}
                          />
                          <span className="text-black font-bold text-base relative z-10">{i + 1}</span>
                        </div>
                      ) : (
                        <span className="opacity-40 text-sm font-medium text-gray-400">{i + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-32 px-6 bg-white relative overflow-hidden">
            <div className="max-w-3xl mx-auto relative z-10 text-center">
              <motion.div {...fadeIn} className="mb-16 space-y-4">
                 <span className="text-[#D4AF37] text-[10px] tracking-[0.8em] font-bold uppercase">EVENT DETAILS</span>
                 <h2 className={`text-4xl font-serif italic ${goldText}`}>Nikoh Marosimi</h2>
                 <GoldOrnament />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white p-12 text-center space-y-12 border border-[#D4AF37]/20 shadow-2xl rounded-3xl group"
              >
                  <div className="w-20 h-20 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#D4AF37] relative">
                      <div className="absolute inset-1 border border-[#D4AF37]/30 rounded-full animate-ping" />
                      <MapPin size={32} />
                  </div>

                  <div className="space-y-6">
                      <div className="space-y-2">
                          <p className={`text-3xl font-serif italic text-gray-800`}>{locationName}</p>
                          <p className="text-[#D4AF37] text-[10px] tracking-[0.4em] font-bold uppercase">{locationAddress}</p>
                      </div>
                      
                      <div className="w-16 h-px bg-[#D4AF37]/30 mx-auto" />
                      
                      <p className="text-xl text-[#D4AF37] font-serif italic tracking-wide">
                          {date}, JUMA <br />
                          <span className="text-[#D4AF37] font-bold mt-2 inline-block">VAQT {time}</span>
                      </p>
                  </div>

                  <div className="pt-8">
                      <a 
                          href={locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full h-14 gold-shimmer text-black font-bold tracking-[0.3em] uppercase text-[11px] shadow-sm flex items-center justify-center gap-4 rounded-full active:scale-95`}
                      >
                          <MapPin size={18} />
                          XARITANI KO'RISH
                      </a>
                  </div>
              </motion.div>
            </div>
          </section>

          <section className="py-32 px-6 bg-white relative overflow-hidden text-center">
            <motion.div {...fadeIn} className="space-y-6">
              <span className="text-[#D4AF37] text-xs tracking-[0.8em] font-bold uppercase opacity-80">QANCHA VAQT QOLDI?</span>
              <h2 className={`text-4xl font-serif italic ${goldText}`}>Baxtli Kunimizgacha</h2>
              <GoldOrnament />
            </motion.div>

            <div className="grid grid-cols-2 gap-6 mt-16 max-w-sm mx-auto">
                <CountdownItem label="KUN" date={targetDate} type="days" />
                <CountdownItem label="SOAT" date={targetDate} type="hours" />
                <CountdownItem label="DAQIQA" date={targetDate} type="minutes" />
                <CountdownItem label="SONIYA" date={targetDate} type="seconds" />
            </div>
          </section>

          <section className="py-32 px-10 text-center space-y-16 bg-white relative">
             <div className="space-y-6">
                <p className="text-[#B8962E] text-[10px] tracking-[0.4em] uppercase font-bold">To'yona uchun</p>
                <h3 className={`text-4xl font-serif italic ${goldText}`}>Tashrif Buyura Olmasangiz...</h3>
                <p className="text-sm text-gray-400 font-serif italic max-w-[280px] mx-auto leading-relaxed">
                  "Agarda bizni masofadan turib tabriklamoqchi bo'lsangiz, quyidagi karda raqami orqali o'z sovg'angizni yuborishingiz mumkin."
                </p>
             </div>

             <motion.div 
              whileHover={{ y: -10, rotate: -1 }}
              className="group relative p-12 bg-gradient-to-br from-[#1A1A1A] to-[#000000] rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden text-left max-w-sm mx-auto"
             >
                <div className="absolute top-0 right-0 p-12 text-5xl opacity-5 font-serif italic text-white uppercase tracking-tighter">HUMO</div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#B8962E]/15 rounded-full blur-[80px]" />

                <div className="relative z-10 space-y-12">
                  <div className="flex justify-between items-center">
                     <div className="w-14 h-11 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#DAA520] rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" />
                     <div className="text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase">HUMO</div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                        <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">KARTA EGASI</p>
                        <p className="text-2xl font-serif text-white tracking-[0.1em] uppercase">{groomName}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">KARTA RAQAMI</p>
                        <p className="text-xl font-mono text-white tracking-[0.05em] font-light whitespace-nowrap">9860 6004 0356 5382</p>
                    </div>
                  </div>

                  <button 
                    onClick={copyToClipboard}
                    className={`w-full py-6 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 shadow-2xl flex items-center justify-center gap-2 ${isCopied ? 'bg-[#B8962E] text-white' : 'bg-white text-black hover:bg-[#B8962E] hover:text-white'}`}
                  >
                    <CreditCard size={16} />
                    {isCopied ? 'NUSXALANDI!' : 'KARTANI KO\'CHIRISH'}
                  </button>
                </div>
             </motion.div>
          </section>

          <footer className="py-24 bg-white text-center relative border-t border-gray-50">
            <div className="max-w-md mx-auto px-6 space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.4em] font-bold text-[#B8962E] uppercase whitespace-nowrap">V I R T U A L &nbsp; T A K L I F N O M A</p>
                <div className="h-px w-20 bg-[#B8962E]/20 mx-auto" />
              </div>

              <div className="space-y-6">
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.4em]">BUYURTMA QILISH UCHUN:</p>
                <a href="tel:+998915930833" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#B8962E] via-[#EAD0A8] to-[#B8962E]">
                  +998 91 593 08 33
                </a>
              </div>

              <div>
                <a 
                  href="https://t.me/taklifnoma_asia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-[11px] font-bold tracking-[0.2em] text-white bg-gradient-to-r from-[#B8962E] to-[#8C7122] px-10 py-5 rounded-2xl shadow-xl shadow-[#B8962E]/30 hover:brightness-110 active:scale-95 transition-all uppercase"
                >
                  TELEGRAM BUYURTMA
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
        <div className="relative p-6 bg-white border border-[#D4AF37]/20 rounded-2xl flex flex-col items-center">
            <div className={`text-4xl font-serif font-bold mb-2 ${goldText}`}>
                {String(value).padStart(2, '0')}
            </div>
            <div className="text-[10px] tracking-[0.3em] font-bold text-gray-400 uppercase">{label}</div>
        </div>
    );
};
