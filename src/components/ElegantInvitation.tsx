'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { InvitationContent } from '@/lib/types';
import { CreditCard, MapPin, Heart, Volume2, VolumeX } from 'lucide-react';

interface ElegantInvitationProps {
  content: InvitationContent;
  isPreview?: boolean;
}

export const ElegantInvitation: React.FC<ElegantInvitationProps> = ({ content, isPreview }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { groomName, brideName, date, time, locationName, imageUrl, locationUrl, musicUrl, locationAddress, cardNumber, cardName } = content;

  const handleUnlock = () => {
    setIsUnlocked(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      setIsPlaying(true);
    }
  };

  const copyToClipboard = () => {
    if (cardNumber) {
      navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAF9F6] overflow-x-hidden selection:bg-[#C5A021]/30">
      <audio ref={audioRef} src={musicUrl || "/assets/die_with_a_smile.mp3"} loop />

      {/* Lock Screen */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0C0C0C]">
             <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center px-12">
               <div className="relative w-40 h-40 mb-16 mx-auto bg-[#1A1A1A] rounded-full flex flex-col items-center justify-center border border-[#C5A021]/50 shadow-2xl">
                  <div className="text-white text-5xl font-serif italic">{groomName[0]} <span className="text-[#C5A021]">&</span> {brideName[0]}</div>
                  <button onClick={handleUnlock} className="mt-4 text-[#C5A021] text-[8px] tracking-[0.4em] uppercase">Ochish</button>
               </div>
               <h2 className="text-[#C5A021] text-[10px] tracking-[0.8em] font-bold uppercase">Taklifnoma Asia</h2>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-md mx-auto relative bg-[#FAF9F6] min-h-screen shadow-2xl overflow-hidden">
        {/* Nav */}
        <div className="absolute top-8 right-8 z-50">
            <button onClick={toggleMusic} className="w-12 h-12 bg-white/40 backdrop-blur-lg rounded-full flex items-center justify-center shadow-lg text-[#C5A021]">
              {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        </div>

        <section className="relative h-screen w-full flex flex-col justify-end pb-32">
          <div className="absolute inset-0">
            <Image src={imageUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000"} alt="Hero" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
          <div className="relative z-10 px-10 text-center space-y-8 text-white">
              <h1 className="text-6xl font-serif leading-tight">{groomName} <br /> <span className="text-[#C5A021] text-4xl italic lowercase">&</span> <br /> {brideName}</h1>
              <div className="w-12 h-px bg-[#C5A021] mx-auto" />
              <p className="text-white/60 text-[10px] tracking-[0.8em] uppercase font-bold">Taklifnoma Asia</p>
          </div>
        </section>

        <section className="py-32 px-10 text-center bg-white space-y-12">
            <Heart className="text-[#C5A021] mx-auto" size={32} />
            <p className="text-xl font-serif italic text-gray-800 leading-relaxed">Nikoh kechamizga lutfan taklif etamiz</p>
            <div className="text-4xl font-serif text-gray-900 border-y border-black/5 py-8">{date}</div>
            <p className="text-sm tracking-[0.3em] font-bold uppercase opacity-40">Soat {time}</p>
        </section>

        <section className="py-32 px-10 bg-[#FAF9F6] text-center space-y-12">
            <div className="space-y-4">
                <MapPin className="text-[#C5A021] mx-auto" size={32} />
                <h3 className="text-3xl font-serif text-gray-900">{locationName}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{locationAddress}</p>
            </div>
            <a href={locationUrl} target="_blank" className="inline-block px-12 py-5 bg-[#C5A021] text-white rounded-full text-[10px] font-bold tracking-widest uppercase">Xarritaga o'tish</a>
        </section>

        {/* Gift Section */}
        <section className="py-32 px-10 text-center space-y-16 bg-white">
             <h3 className="text-4xl font-serif italic text-[#C5A021]">To'yona uchun</h3>
             <div className="p-10 bg-black rounded-[3rem] shadow-2xl space-y-12 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-white/5 font-serif italic text-4xl">HUMO</div>
                <div className="relative z-10 space-y-8">
                    <div className="w-14 h-10 bg-[#D4AF37] rounded-xl" />
                    <div>
                        <p className="text-[8px] text-white/20 mb-2 font-bold tracking-widest uppercase">Karta raqami</p>
                        <p className="text-xl font-mono text-white tracking-widest">{cardNumber}</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6">
                        <div>
                            <p className="text-[8px] text-white/20 mb-1 font-bold tracking-widest uppercase">Egasi</p>
                            <p className="text-lg italic text-white">{cardName || groomName}</p>
                        </div>
                        <button onClick={copyToClipboard} className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase transition-all ${isCopied ? 'bg-[#C5A021] text-white' : 'bg-white/10 text-white'}`}>
                            {isCopied ? 'NUSXALANDI!' : 'NUSXALASH'}
                        </button>
                    </div>
                </div>
             </div>
        </section>

        <footer className="py-32 px-10 text-center border-t border-black/5 bg-[#FAF9F6]">
            <div className="space-y-12">
                <p className="text-4xl italic text-gray-800">Taklifnoma Asia</p>
                <div className="space-y-6 pt-12">
                    <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">O'z taklifnomangizga ega bo'ling:</p>
                    <a href="https://taklifnoma.asia" target="_blank" className="inline-block px-10 py-5 bg-black text-white rounded-2xl text-[11px] font-black tracking-widest uppercase shadow-xl">Taklifnoma Yaratish</a>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
};
