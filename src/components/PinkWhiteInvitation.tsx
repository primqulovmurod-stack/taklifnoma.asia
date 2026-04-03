'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CreditCard, ChevronDown, Volume2, VolumeX, Heart, MailOpen } from 'lucide-react';

interface PinkWhiteInvitationProps {
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
}

const pinkText = "bg-clip-text text-transparent bg-gradient-to-b from-[#AD1457] via-[#D81B60] to-[#AD1457]";
const pinkGradient = "bg-gradient-to-br from-[#AD1457] via-[#D81B60] to-[#C2185B]";

export default function PinkWhiteInvitation({
  groomName = "Kenjabek",
  brideName = "Safiya",
  date = "24 - APREL - 2026",
  time = "19:00",
  locationName = "Demir (Asr)",
  locationAddress = "Sho'rchi tumani",
  locationUrl = "https://maps.google.com",
  imageUrl = "https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg",
  musicUrl = "/assets/die_with_a_smile.mp3",
  cardNumber = "9860 1234 5678 1234",
  cardName = "MUROD P."
}: PinkWhiteInvitationProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isOpened) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      setIsPlaying(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const targetDate = new Date().toISOString(); // Placeholder for countdown calculation

  return (
    <div className="min-h-screen bg-[#FDF2F5] text-gray-900 font-sans overflow-x-hidden selection:bg-[#D81B60]/20 relative flex justify-center">
      <div className="w-full max-w-[500px] bg-white min-h-screen relative shadow-[0_0_100px_rgba(219,112,147,0.1)]">
        <audio ref={audioRef} src={musicUrl} loop />

        <AnimatePresence>
          {!isOpened && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-start pt-24 bg-white p-6">
              <div className="text-center space-y-12 relative z-10">
                <div className="w-40 h-40 border border-[#D81B60] rounded-full flex items-center justify-center mx-auto relative">
                    <h1 className={`text-5xl font-serif italic ${pinkText}`}>{groomName[0]} & {brideName[0]}</h1>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 border border-[#D81B60]/30 rounded-full text-[#AD1457]">
                        <Heart size={18} fill="currentColor" />
                    </div>
                </div>
                <div className="space-y-8">
                  <p className="text-[11px] tracking-[0.8em] font-bold text-[#AD1457]/70 uppercase">Taklifnoma Asia</p>
                  <button onClick={handleOpen} className="group flex flex-col items-center gap-6">
                      <div className="w-24 h-24 rounded-full border border-[#D81B60]/40 flex items-center justify-center bg-white shadow-sm">
                          <MailOpen className="w-10 h-10 text-[#AD1457]" strokeWidth={1} />
                      </div>
                      <span className="text-[13px] font-bold tracking-[0.6em] text-[#AD1457] uppercase">Ochish</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        <main className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
          <section className="py-24 text-center px-4 space-y-16">
              <h1 className="flex flex-col items-center gap-6">
                <span className={`text-6xl font-serif italic ${pinkText}`}>{groomName}</span>
                <span className="text-serif italic text-2xl text-pink-200/60">va</span>
                <span className={`text-6xl font-serif italic ${pinkText}`}>{brideName}</span>
              </h1>
              <p className="text-xl font-serif italic text-gray-400">Hayotimizdagi eng muhim kunimizga lutfan taklif etamiz</p>
              <div className="pt-16">
                  <div className="inline-block relative px-12 py-8 border-y border-[#D81B60]/20">
                      <p className={`text-3xl font-serif tracking-[0.4em] ${pinkText} font-bold`}>{date}</p>
                  </div>
              </div>
          </section>

          {/* Details */}
          <section className="py-24 px-6 bg-[#FFFBFC] space-y-12">
              <div className="bg-white p-12 text-center space-y-8 border border-[#D81B60]/20 shadow-2xl rounded-3xl">
                  <div className="w-20 h-20 border-2 border-[#D81B60] rounded-full flex items-center justify-center mx-auto text-[#AD1457]"><Heart size={32} /></div>
                  <div className="space-y-2">
                      <p className="text-3xl font-serif italic">{locationName}</p>
                      <p className="text-[#AD1457] text-[10px] tracking-[0.4em] font-bold uppercase">{locationAddress}</p>
                  </div>
                  <p className="text-xl text-[#AD1457] font-serif italic">Vaqti: {time}</p>
                  <a href={locationUrl} target="_blank" className="inline-block w-full h-14 bg-[#AD1457] text-white font-bold tracking-[0.3em] uppercase text-[11px] flex items-center justify-center rounded-full">Xaritada ko'rish</a>
              </div>
          </section>

          {/* Gift Section */}
          <section className="py-32 px-10 text-center space-y-16 bg-white">
             <h3 className={`text-4xl font-serif italic ${pinkText}`}>To'yona uchun</h3>
             <div className="p-10 bg-[#AD1457] rounded-[3.5rem] shadow-2xl space-y-12 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-white/5 font-serif italic text-4xl">UZCARD</div>
                <div className="relative z-10 space-y-8">
                    <div className="w-14 h-10 bg-gradient-to-tr from-[#FFB6C1] to-[#FFF] rounded-xl opacity-80" />
                    <div>
                        <p className="text-[8px] text-white/40 mb-2 font-bold tracking-widest uppercase">Karta raqami</p>
                        <p className="text-xl font-mono text-white tracking-widest">{cardNumber}</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/10 pt-6">
                        <div>
                            <p className="text-[8px] text-white/40 mb-1 font-bold tracking-widest uppercase">Egasi</p>
                            <p className="text-lg italic text-white leading-none">{cardName}</p>
                        </div>
                        <button onClick={copyToClipboard} className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase transition-all ${isCopied ? 'bg-white text-[#AD1457]' : 'bg-white/10 text-white'}`}>
                            {isCopied ? 'Nusxalandi!' : 'NUSXALASH'}
                        </button>
                    </div>
                </div>
             </div>
          </section>

          <footer className="py-32 px-6 bg-[#FFFBFC] text-center border-t border-[#D81B60]/10">
              <div className="space-y-12">
                  <p className={`text-5xl font-serif italic ${pinkText}`}>Taklifnoma Asia</p>
                  <div className="space-y-6 pt-12">
                      <p className="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase italic">O'z taklifnomangizni yarating:</p>
                      <a href="https://taklifnoma.asia" target="_blank" className="inline-block px-12 py-6 bg-[#AD1457] text-white rounded-2xl text-[11px] font-black tracking-[0.3em] uppercase shadow-xl">Taklifnoma Yaratish</a>
                  </div>
              </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
