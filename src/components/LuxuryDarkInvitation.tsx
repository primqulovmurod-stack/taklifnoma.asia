'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Pause, MapPin, Navigation, CreditCard, ChevronDown } from 'lucide-react';

interface LuxuryDarkInvitationProps {
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
}

export default function LuxuryDarkInvitation({
  groomName = "Xurshidbek",
  brideName = "Mohinur",
  date = "20 Iyun 2026",
  time = "18:00",
  locationName = "Oqsaroy Koshonasi",
  locationAddress = "Surxondaryo viloyati, Sho'rchi tumani",
  imageUrl = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000",
  musicUrl = "/assets/die_with_a_smile.mp3",
  cardNumber = "9860 1234 5678 1234",
  cardName = "MUROD P."
}: LuxuryDarkInvitationProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleUnlock = () => {
    setIsUnlocked(true);
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

  return (
    <div ref={containerRef} className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-[#C5A059]/30" style={{ background: "#000" }}>
      <audio ref={audioRef} src={musicUrl} loop />

      {/* Lock Screen */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0C0C0C]">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center px-12">
               <h2 className="text-[#C5A059] text-[10px] tracking-[0.8em] font-bold uppercase mb-8">Taklifnoma Asia</h2>
               <div className="relative w-48 h-48 mb-12 mx-auto border border-[#C5A059]/20 rounded-full flex flex-col items-center justify-center">
                  <div className="text-4xl font-serif tracking-tighter italic">{groomName[0]} & {brideName[0]}</div>
                  <button onClick={handleUnlock} className="mt-4 text-[8px] tracking-[0.4em] uppercase text-[#C5A059] hover:text-white transition-colors">Ochish</button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`relative transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
        <div className="fixed top-8 right-8 z-50">
            <button onClick={toggleMusic} className="w-12 h-12 rounded-full border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/5 transition-all text-[#C5A059]">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
        </div>

        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20">
          <div className="relative z-10 text-center space-y-12 px-6">
             <div className="space-y-4">
                <p className="text-[#C5A059] text-[10px] tracking-[0.6em] uppercase font-bold">Nikoh Oqshomi</p>
                <h1 className="text-7xl md:text-9xl font-serif tracking-tighter leading-none">{groomName} <br /> <span className="text-[#C5A059] text-3xl italic">&</span> <br /> {brideName}</h1>
             </div>
             <p className="text-white/40 text-[10px] md:text-sm max-w-sm mx-auto tracking-widest font-light leading-relaxed italic">Bizning eng baxtli kunimizda birga bo'ling.</p>
          </div>
        </section>

        <section className="py-32 px-6 text-center space-y-12">
            <p className="text-[#C5A059] text-[10px] tracking-[0.5em] uppercase font-bold">Tantana Sanasi</p>
            <h2 className="text-6xl font-serif text-white/90">{date}</h2>
            <p className="text-xl opacity-40 font-serif italic">Vaqti: {time}</p>
        </section>

        <section className="py-32 px-6 bg-white/5 text-center space-y-12">
            <MapPin className="text-[#C5A059] w-12 h-12 mx-auto" />
            <h3 className="text-4xl font-serif text-white">{locationName}</h3>
            <p className="text-white/40 text-sm max-w-sm mx-auto">{locationAddress}</p>
            <a href="#" className="inline-block px-12 py-5 bg-[#C5A059] text-black font-bold text-xs tracking-[0.3em] uppercase rounded-full">Xaritadan ko'rish</a>
        </section>

        <section className="py-32 px-6 text-center space-y-16">
            <div className="space-y-4">
               <h2 className="text-4xl font-serif italic">To'yona uchun</h2>
               <p className="text-white/40 text-sm max-w-sm mx-auto italic leading-relaxed">Agarda bizni masofadan turib tabriklamoqchi bo'lsangiz, ushbu karta raqamini ishlatishingiz mumkin:</p>
            </div>
            
            <div className="relative w-full max-w-md aspect-[1.6/1] bg-gradient-to-br from-neutral-900 to-black rounded-[2.5rem] border border-white/10 p-10 shadow-2xl mx-auto text-left">
               <div className="absolute top-0 right-0 p-8 text-white/5 font-serif italic text-4xl">HUMO</div>
               <div className="relative h-full flex flex-col justify-between">
                  <div className="w-12 h-10 bg-gradient-to-tr from-[#C5A059] to-[#ebd4a5] rounded-lg" />
                  <div className="space-y-6">
                    <div>
                       <p className="text-white/20 text-[8px] uppercase tracking-widest mb-2">Karta raqami</p>
                       <p className="text-2xl font-mono text-white/90 tracking-widest">{cardNumber}</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6">
                       <div>
                          <p className="text-white/20 text-[8px] uppercase tracking-widest mb-1">Egasi</p>
                          <p className="text-lg italic text-white/80">{cardName}</p>
                       </div>
                       <button onClick={copyToClipboard} className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase transition-all ${isCopied ? 'bg-[#C5A059] text-black' : 'bg-white/5 text-white border border-white/10'}`}>
                          {isCopied ? 'Nusxalandi!' : 'NUSXALASH'}
                       </button>
                    </div>
                  </div>
               </div>
            </div>
        </section>

        <footer className="py-32 px-6 text-center border-t border-white/5 space-y-12">
            <div className="space-y-6">
                <p className="text-4xl italic text-[#C5A059]">Taklifnoma Asia</p>
                <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase font-black">Baxtli lahzalar maskani</p>
            </div>
            <div className="space-y-6 pt-12">
                <p className="text-[11px] font-bold text-white/20 uppercase tracking-widest italic">O'z taklifnomangizni yarating:</p>
                <a href="https://taklifnoma.asia" target="_blank" className="inline-block px-12 py-5 bg-[#C5A059] text-black font-black tracking-[0.3em] uppercase rounded-2xl shadow-xl shadow-[#C5A059]/10">Taklifnoma Yaratish</a>
            </div>
        </footer>
      </main>
    </div>
  );
}
