'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CreditCard, ChevronDown, Volume2, VolumeX, Heart, MailOpen, Copy } from 'lucide-react';

interface GoldClassicWhiteInvitationProps {
  groomName?: string;
  brideName?: string;
  date?: string;
  time?: string;
  locationName?: string;
  locationAddress?: string;
  locationUrl?: string;
  imageUrl?: string;
  musicUrl?: string;
  cardNumber?: string;
  cardName?: string;
  isPreview?: boolean;
  isMuted?: boolean;
  showGift?: boolean;
  description?: string;
}

const goldText = "bg-clip-text text-transparent bg-gradient-to-b from-[#D4AF37] via-[#F9E29C] to-[#B8860B]";

export default function GoldClassicWhiteInvitation({
  groomName = "Kenjabek",
  brideName = "Safiya",
  date = "24 - APREL - 2026",
  time = "19:00",
  locationName = "Demir (Asr)",
  locationAddress = "Sho'rchi tumani",
  locationUrl = "https://maps.google.com",
  imageUrl = "https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  musicUrl = "/assets/die_with_a_smile.mp3",
  cardNumber = "9860 1234 5678 1234",
  cardName = "Kenjabek",
  isPreview = false,
  isMuted = false,
  showGift = false,
  description = "Sizni nikoh oqshomimizga lutfan taklif etamiz"
}: GoldClassicWhiteInvitationProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isOpened && !isPreview) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpened, isPreview]);

  const handleOpen = () => {
    setIsOpened(true);
    if (!isPreview) window.scrollTo({ top: 0, behavior: 'instant' });
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      setIsPlaying(true);
    }
  };

  const copyToClipboard = () => {
    if (!cardNumber) return;
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen bg-white text-[#1A1A1A] font-sans relative flex justify-center ${isPreview ? 'h-full overflow-hidden' : 'overflow-x-hidden'}`}>
      <div className={`w-full max-w-[500px] bg-white relative shadow-2xl ${isPreview ? 'h-full' : 'min-h-screen'} ${isOpened && isPreview ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        {musicUrl && <audio ref={audioRef} src={musicUrl} loop muted={isMuted} />}

        <AnimatePresence>
          {!isOpened && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-white p-6 text-center overflow-hidden"
            >
              <div className="space-y-16 md:space-y-24 w-full flex flex-col items-center">
                <div className="w-40 h-40 border border-[#D4AF37] rounded-full flex items-center justify-center relative">
                    <h1 className={`text-5xl font-serif italic ${goldText}`}>
                      {groomName?.[0] || 'K'} <span className="text-3xl text-black/30">&</span> {brideName?.[0] || 'K'}
                    </h1>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 border border-[#D4AF37]/30 rounded-full text-[#D4AF37]">
                        <Heart size={18} fill="currentColor" />
                    </div>
                </div>
                <div className="space-y-8 flex flex-col items-center">
                  <p className="text-[11px] tracking-[0.8em] font-bold text-[#D4AF37] italic uppercase">Taklifnoma Asia</p>
                  <button onClick={handleOpen} className="group flex flex-col items-center gap-6 outline-none">
                      <div className="w-24 h-24 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-white shadow-xl group-active:scale-95 transition-transform">
                          <MailOpen className="w-10 h-10 text-[#D4AF37]" strokeWidth={1} />
                      </div>
                      <span className="text-[13px] font-bold tracking-[0.6em] text-[#D4AF37] uppercase">Ochish</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
          <div className="fixed top-8 right-8 z-50">
              <button 
                onClick={() => {
                  if (audioRef.current) {
                    if (isPlaying) audioRef.current.pause();
                    else audioRef.current.play();
                    setIsPlaying(!isPlaying);
                  }
                }} 
                className={`w-12 h-12 bg-white/80 backdrop-blur-xl border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37] shadow-xl ${isPreview ? 'scale-75' : ''}`}
              >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>
          </div>

          <section className={`relative ${isPreview ? 'min-h-[600px]' : 'min-h-screen'} flex flex-col items-center justify-center text-center space-y-12 py-20`}>
            <h1 className="flex flex-col items-center gap-6">
              <span className={`text-5xl md:text-6xl font-serif italic ${goldText}`}>{groomName || "Kuyov"}</span>
              <span className="text-2xl md:text-3xl text-black/20">va</span>
              <span className={`text-5xl md:text-6xl font-serif italic ${goldText}`}>{brideName || "Kelin"}</span>
            </h1>
            <div className="w-12 h-px bg-[#D4AF37]/40 mx-auto" />
            <p className={`text-[13px] md:text-base font-serif italic text-black/70 whitespace-pre-line break-words px-2 max-w-[95%] mx-auto leading-relaxed tracking-tight`}>
              {description}
            </p>
            <div className="pt-10 md:pt-20">
                <div className="inline-block relative px-12 py-6 border-y border-[#D4AF37]/40 text-center">
                    <p className={`text-xl md:text-2xl font-serif tracking-[0.4em] uppercase ${goldText} font-bold`}>{date}</p>
                </div>
            </div>
          </section>

          <section className="py-32 px-10 bg-black/5 backdrop-blur-md text-center space-y-12 border-y border-black/5">
              <MapPin className="text-[#D4AF37] mx-auto" size={32} />
              <h3 className={`text-3xl font-serif italic ${goldText}`}>{locationName}</h3>
              <p className="text-xs text-black/40 uppercase tracking-widest leading-relaxed italic">{locationAddress}</p>
              {(() => {
                   const mapsUrl = locationUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${locationName || ''} ${locationAddress || ''}`.trim())}`;
                   return (
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-5 bg-[#D4AF37] text-white font-bold text-[10px] tracking-widest uppercase rounded-full shadow-2xl">Xaritada ko'rish</a>
                   );
              })()}
          </section>

          {/* Gift Section */}
          {showGift && (
            <section className={`relative w-full ${isPreview ? 'py-12' : 'py-32'} bg-white flex flex-col items-center justify-center overflow-hidden font-sans`}>
               <h2 className={`text-4xl font-serif italic mb-16 ${goldText}`}>To'yona uchun</h2>
               
               <div className={`w-full ${isPreview ? 'max-w-[320px]' : 'max-w-lg'} px-4 relative z-10`}>
                  <div className="group w-full aspect-[1.58/1] bg-gradient-to-br from-white to-[#F5F5F5] rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-[#D4AF37]/30 text-left relative overflow-hidden flex flex-col justify-between p-5 md:p-10 transition-transform duration-300 hover:scale-[1.02]">
                    {/* Glass Gloss Effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-[#D4AF37]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                    
                    {/* Top Row: Chip & Label */}
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="w-10 h-7 md:w-14 md:h-10 bg-gradient-to-br from-[#F9E29C] via-[#D4AF37] to-[#B8860B] rounded-lg shadow-[0_5px_15px_rgba(212,175,55,0.3)] relative overflow-hidden">
                          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '4px 100%' }} />
                      </div>
                      <div className="px-3 py-1 bg-black/5 border border-black/10 rounded-full backdrop-blur-md">
                          <p className="text-[7px] md:text-[9px] text-[#D4AF37] font-black uppercase tracking-widest">GIFT CARD</p>
                      </div>
                    </div>

                    {/* Center Row: Card Number */}
                    <div className="relative z-10 text-left">
                        <p className="text-base md:text-xl font-mono text-black tracking-[0.1em] whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                          {cardNumber}
                        </p>
                    </div>

                    {/* Bottom Row: Name & Button */}
                    <div className="relative z-10 flex justify-between items-end border-t border-black/5 pt-4">
                        <div className="space-y-1">
                            <p className="text-[10px] md:text-xs font-bold text-black/80 uppercase tracking-wide">{cardName || groomName}</p>
                        </div>
                        <button 
                          onClick={copyToClipboard} 
                          className={`flex items-center gap-2 px-4 md:px-7 py-2 md:py-3.5 rounded-full text-[9px] md:text-[11px] font-black uppercase transition-all duration-300 transform active:scale-95 shadow-md ${
                            isCopied 
                              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white scale-105' 
                              : 'bg-black/5 text-[#D4AF37] border border-[#D4AF37]/20 hover:bg-black/10'
                          }`}
                        >
                          <Copy size={isPreview ? 12 : 16} />
                          {isCopied ? 'Nusxalandi!' : 'Nusxa'}
                        </button>
                    </div>
                  </div>
               </div>
            </section>
          )}

           <footer className="py-32 px-10 text-center border-t border-black/5 space-y-16 bg-[#FAFAFA]">
               <div className="space-y-6">
                   <p className={`text-4xl font-serif italic ${goldText}`}>Taklifnoma Asia</p>
                   <p className="text-[10px] text-black/40 font-bold tracking-[0.5em] uppercase italic">Baxtli lahzalar maskani</p>
               </div>
               <div className="space-y-8 pt-12">
                   <p className="text-[11px] text-black/10 font-bold tracking-widest uppercase italic font-sans">O'z taklifnomangizni yarating:</p>
                   <a href="https://taklifnoma.asia" target="_blank" className="inline-block px-12 py-6 bg-black text-white rounded-2xl text-[11px] font-black tracking-widest uppercase shadow-xl hover:bg-[#D4AF37] transition-all">Taklifnoma Yaratish</a>
               </div>
           </footer>
        </main>
      </div>
    </div>
  );
}
