'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CreditCard, MailOpen, Volume2, VolumeX, Heart } from 'lucide-react';

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
  cardNumber?: string;
  cardName?: string;
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
  musicUrl = "/assets/die_with_a_smile.mp3",
  cardNumber = "9860 6004 0356 5382",
  cardName = "MUROD P."
}: GoldWhiteInvitationProps) {
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

  const dateParts = date.split(' - ');
  const day = parseInt(dateParts[0]) || 24;
  const monthName = dateParts[1] || "APREL";
  const year = dateParts[2] || "2026";

  return (
    <div className={`min-h-screen bg-[#F9F9F9] text-gray-900 font-sans overflow-x-hidden selection:bg-[#D4AF37]/20 relative flex justify-center ${!isOpened ? 'h-screen overflow-y-hidden' : ''}`}>
      <div className={`w-full max-w-[500px] bg-white min-h-screen relative shadow-[0_0_100px_rgba(0,0,0,0.05)]`}>
        <audio ref={audioRef} src={musicUrl} loop />

        <AnimatePresence>
          {!isOpened && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-start pt-12 bg-white p-6">
              <div className="text-center space-y-12 relative flex flex-col items-center">
                <div className="mb-12">
                   <p className="text-[10px] tracking-[0.4em] font-bold text-[#B8962E] uppercase">T A K L I F N O M A &nbsp; A S I A</p>
                </div>
                <div className="w-40 h-40 border border-[#D4AF37] rounded-full flex items-center justify-center relative">
                    <h1 className={`text-5xl font-serif italic ${goldText}`}>{groomName[0]} & {brideName[0]}</h1>
                </div>
                <button onClick={handleOpen} className="group flex flex-col items-center gap-6 mt-12">
                    <div className="w-24 h-24 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-white shadow-sm">
                        <MailOpen className="w-10 h-10 text-[#D4AF37]" strokeWidth={1} />
                    </div>
                    <p className="text-[10px] tracking-[0.4em] font-medium text-[#D4AF37]/60 uppercase">Ochish</p>
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>

        <main className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
          <section className="py-24 text-center px-4 space-y-12">
              <h1 className="flex flex-col items-center gap-6">
                <span className={`text-6xl font-serif italic ${goldText}`}>{groomName}</span>
                <span className="text-3xl text-gray-300">&</span>
                <span className={`text-6xl font-serif italic ${goldText}`}>{brideName}</span>
              </h1>
              <p className="text-xl font-serif italic text-gray-600">Nikoh kechamizga lutfan taklif etamiz</p>
              <div className="pt-20">
                  <div className="inline-block px-12 py-6 border-y border-[#D4AF37]/40">
                      <p className={`text-2xl font-serif tracking-[0.4em] uppercase ${goldText} font-bold`}>{date}</p>
                  </div>
              </div>
          </section>

          {/* Details */}
          <section className="py-24 px-6 space-y-12 text-center bg-[#FAFAFA]">
              <div className="bg-white p-12 border border-[#D4AF37]/20 rounded-3xl shadow-xl space-y-8">
                  <div className="w-16 h-16 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#D4AF37]"><MapPin size={28} /></div>
                  <div className="space-y-2">
                      <p className="text-3xl font-serif italic">{locationName}</p>
                      <p className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-bold">{locationAddress}</p>
                  </div>
                  <a href={locationUrl} target="_blank" className="inline-block w-full py-5 bg-black text-white rounded-full text-[10px] font-bold tracking-widest uppercase">Xarritadan Ko'rish</a>
              </div>
          </section>

          {/* Card */}
          <section className="py-32 px-10 text-center space-y-16 bg-white">
             <h3 className={`text-4xl font-serif italic ${goldText}`}>To'yona uchun</h3>
             <div className="p-8 bg-black rounded-[3rem] shadow-2xl space-y-12 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-white/5 font-serif italic text-4xl">HUMO</div>
                <div className="space-y-8 relative z-10">
                    <div className="w-14 h-10 bg-gradient-to-tr from-[#B8860B] to-[#DAA520] rounded-xl" />
                    <div>
                        <p className="text-[8px] text-white/20 mb-2 font-bold tracking-widest uppercase">Karta raqami</p>
                        <p className="text-xl font-mono text-white tracking-widest leading-none">{cardNumber}</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6">
                        <div>
                            <p className="text-[8px] text-white/20 mb-1 font-bold tracking-widest uppercase">Egasi</p>
                            <p className="text-lg font-serif italic text-white leading-none">{cardName}</p>
                        </div>
                        <button onClick={copyToClipboard} className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase transition-all ${isCopied ? 'bg-[#D4AF37] text-white' : 'bg-white text-black'}`}>
                            {isCopied ? 'NUSXALANDI!' : 'NUSXALASH'}
                        </button>
                    </div>
                </div>
             </div>
          </section>

          <footer className="py-24 bg-white text-center border-t border-gray-50 px-6">
              <div className="space-y-12">
                  <p className="text-[10px] tracking-[0.4em] font-black text-[#B8962E] uppercase">T A K L I F N O M A &nbsp; A S I A</p>
                  <div className="space-y-4">
                      <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase italic">Xizmatdan foydalanish:</p>
                      <a href="https://taklifnoma.asia" target="_blank" className="inline-block px-10 py-5 bg-[#B8962E] text-white rounded-2xl text-[11px] font-black tracking-widest uppercase">Taklifnoma Yaratish</a>
                  </div>
              </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
