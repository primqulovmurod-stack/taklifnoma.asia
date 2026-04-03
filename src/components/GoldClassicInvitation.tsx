'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CreditCard, ChevronDown, Volume2, VolumeX, Heart, MailOpen } from 'lucide-react';

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
  cardNumber?: string;
  cardName?: string;
}

const goldText = "bg-clip-text text-transparent bg-gradient-to-b from-[#D4AF37] via-[#F9E29C] to-[#B8860B]";

export default function GoldClassicInvitation({
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
}: GoldClassicInvitationProps) {
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

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative flex justify-center">
      <div className="w-full max-w-[500px] bg-[#0A0A0A] min-h-screen relative shadow-2xl">
        <audio ref={audioRef} src={musicUrl} loop />

        <AnimatePresence>
          {!isOpened && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#0F0F0F] p-6">
              <div className="text-center space-y-20 relative z-10">
                <div className="w-40 h-40 border border-[#D4AF37] rounded-full flex items-center justify-center mx-auto relative">
                    <h1 className={`text-5xl font-serif italic ${goldText}`}>{groomName[0]} <span className="text-3xl">&</span> {brideName[0]}</h1>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0F0F0F] px-4 py-1 border border-[#D4AF37]/30 rounded-full text-[#D4AF37]">
                        <Heart size={18} fill="currentColor" />
                    </div>
                </div>
                <div className="space-y-8">
                  <p className="text-[11px] tracking-[0.8em] font-bold text-[#D4AF37]/80 italic uppercase">Taklifnoma Asia</p>
                  <button onClick={handleOpen} className="group flex flex-col items-center gap-6">
                      <div className="w-24 h-24 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-black shadow-2xl">
                          <MailOpen className="w-10 h-10 text-[#D4AF37]" strokeWidth={1} />
                      </div>
                      <span className="text-[13px] font-bold tracking-[0.6em] text-[#D4AF37] uppercase">Ochish</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        <main className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
          <div className="fixed top-8 right-8 z-50">
              <button onClick={() => {
                if (audioRef.current) {
                  if (isPlaying) audioRef.current.pause();
                  else audioRef.current.play();
                  setIsPlaying(!isPlaying);
                }
              }} className="w-12 h-12 bg-black/40 backdrop-blur-xl border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-[#D4AF37]">
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>
          </div>

          <section className="relative h-screen flex flex-col items-center justify-center text-center space-y-12">
            <h1 className="flex flex-col items-center gap-6">
              <span className={`text-6xl font-serif italic ${goldText}`}>{groomName}</span>
              <span className="text-3xl text-white/40">va</span>
              <span className={`text-6xl font-serif italic ${goldText}`}>{brideName}</span>
            </h1>
            <div className="w-12 h-px bg-[#D4AF37]/40 mx-auto" />
            <p className="text-xl font-serif italic text-white/80">Sizni nikoh oqshomimizga lutfan taklif etamiz</p>
            <div className="pt-20">
                <div className="inline-block relative px-12 py-6 border-y border-[#D4AF37]/40 text-center">
                    <p className={`text-2xl font-serif tracking-[0.4em] uppercase ${goldText} font-bold`}>{date}</p>
                </div>
            </div>
          </section>

          <section className="py-32 px-10 bg-white/5 backdrop-blur-md text-center space-y-12 border-y border-white/5">
              <MapPin className="text-[#D4AF37] mx-auto" size={32} />
              <h3 className={`text-3xl font-serif italic ${goldText}`}>{locationName}</h3>
              <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed italic">{locationAddress}</p>
              <a href={locationUrl} target="_blank" className="inline-block px-12 py-5 bg-[#D4AF37] text-black font-bold text-[10px] tracking-widest uppercase rounded-full shadow-2xl">Xaritada ko'rish</a>
          </section>

          {/* Gift Section */}
          <section className="py-32 px-10 text-center space-y-16">
             <h2 className={`text-4xl font-serif italic ${goldText}`}>To'yona uchun</h2>
             <div className="p-10 bg-[#0A0A0A] rounded-[3.5rem] shadow-2xl border border-[#D4AF37]/30 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-white/5 italic text-4xl">UZCARD</div>
                <div className="relative z-10 space-y-10">
                    <div className="w-14 h-10 bg-[#D4AF37] rounded-xl shadow-lg" />
                    <div>
                        <p className="text-[8px] text-[#D4AF37]/60 mb-2 font-bold uppercase tracking-widest">Karta raqami</p>
                        <p className="text-xl font-mono text-white tracking-widest">{cardNumber}</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6">
                        <div>
                            <p className="text-[8px] text-[#D4AF37]/60 mb-1 font-bold uppercase tracking-widest">Karta egasi</p>
                            <p className="text-lg italic text-white leading-none">{cardName || groomName}</p>
                        </div>
                        <button onClick={copyToClipboard} className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase transition-all ${isCopied ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-white border border-white/10'}`}>
                            {isCopied ? 'Nusxalandi!' : 'NUSXALASH'}
                        </button>
                    </div>
                </div>
             </div>
          </section>

          <footer className="py-32 px-10 text-center border-t border-white/5 space-y-16 bg-black">
              <div className="space-y-6">
                  <p className={`text-4xl font-serif italic ${goldText}`}>Taklifnoma Asia</p>
                  <p className="text-[10px] text-white/40 font-bold tracking-[0.5em] uppercase italic">Baxtli lahzalar maskani</p>
              </div>
              <div className="space-y-8 pt-12">
                  <p className="text-[11px] text-white/20 font-bold tracking-widest uppercase italic">O'z taklifnomangizni yarating:</p>
                  <a href="https://taklifnoma.asia" target="_blank" className="inline-block px-12 py-6 bg-white text-black rounded-2xl text-[11px] font-black tracking-widest uppercase shadow-xl hover:bg-[#D4AF37] transition-all">Taklifnoma Yaratish</a>
              </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
