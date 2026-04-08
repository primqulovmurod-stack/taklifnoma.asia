'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard, Volume2, VolumeX, Heart, MailOpen } from 'lucide-react';

interface WatchDesignInvitationProps {
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

export default function WatchDesignInvitation({
  groomName = "Xurshidbek",
  brideName = "Mohinur",
  date = "20 Iyun 2026",
  time = "18:00",
  locationName = "Oqsaroy Koshonasi",
  locationAddress = "Surxondaryo viloyati, Sho'rchi tumani",
  imageUrl = "https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg",
  musicUrl = "/assets/die_with_a_smile.mp3",
  cardNumber = "9860 1234 5678 9012",
  cardName = "MUROD P.",
  isPreview = false
}: WatchDesignInvitationProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleUnlock = () => {
    setIsUnlocked(true);
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
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-x-hidden antialiased" style={{ background: 'radial-gradient(circle at center, #1a1410 0%, #000000 100%)' }}>
      <audio ref={audioRef} src={musicUrl} loop />

      <AnimatePresence>
        {!isUnlocked && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-16">
                <h2 className="text-[#D4AF37] text-[10px] tracking-[1.2em] font-bold uppercase block">Taklifnoma Asia</h2>
                <div className="w-48 h-48 border border-[#D4AF37]/20 rounded-full flex flex-col items-center justify-center">
                    <div className="text-4xl font-serif italic">{groomName[0]} & {brideName[0]}</div>
                    <button onClick={handleUnlock} className="mt-6 text-[9px] tracking-[0.5em] text-[#D4AF37] uppercase">Ochish</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`transition-opacity duration-2000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
        <div className="fixed top-8 right-8 z-50">
            <button onClick={() => {
              if (audioRef.current) {
                if (isPlaying) audioRef.current.pause();
                else audioRef.current.play();
                setIsPlaying(!isPlaying);
              }
            }} className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-[#D4AF37]">
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
        </div>

        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center space-y-12 pt-20">
            <div className="space-y-4">
                <span className="text-[9px] tracking-[0.6em] text-[#D4AF37] font-bold uppercase block">Abadiyatning Boshlanishi</span>
                <h1 className="text-6xl md:text-8xl font-serif italic text-white">{groomName} <br /> <span className="text-[#D4AF37] opacity-60">&</span> <br /> {brideName}</h1>
            </div>
            <p className="text-white/40 text-sm tracking-widest font-light italic leading-relaxed">Har bir soniya biz uchun qadrlidir.</p>
        </section>

        <section className="py-32 px-10 text-center space-y-8 bg-white/5 backdrop-blur-md">
            <p className="text-[#D4AF37] text-[10px] tracking-[1em] font-bold uppercase">Sana</p>
            <h2 className="text-5xl font-serif text-white italic">{date}</h2>
            <p className="text-xl font-serif text-[#D4AF37] opacity-60 tracking-[0.3em]">Soat: {time}</p>
        </section>

        <section className="py-32 px-10 text-center space-y-12">
            <MapPin className="text-[#D4AF37] mx-auto w-12 h-12" />
            <h3 className="text-4xl font-serif italic">{locationName}</h3>
            <p className="text-white/40 text-sm">{locationAddress}</p>
            <a href="#" className="inline-block px-12 py-5 bg-[#D4AF37] text-black font-bold text-[10px] tracking-widest uppercase rounded-full">Xaritada ko'rish</a>
        </section>

        {/* Gift Section */}
        <section className="py-40 px-10 text-center space-y-16">
            <div className="space-y-4">
                <h2 className="text-4xl font-serif italic text-[#D4AF37]">To'yona uchun</h2>
                <p className="text-white/40 text-sm italic font-light leading-relaxed">Agarda bizni masofadan turib tabriklamoqchi bo'lsangiz:</p>
            </div>
            <div className="bg-gradient-to-br from-neutral-900 to-black p-12 rounded-[3.5rem] border border-white/5 text-left relative overflow-hidden shadow-2xl mx-auto max-w-sm">
                <div className="absolute top-0 right-0 p-8 text-white/5 italic text-4xl">PLATINUM</div>
                <div className="relative z-10 space-y-12">
                    <div className="w-14 h-11 bg-gradient-to-tr from-[#D4AF37] to-white/20 rounded-xl" />
                    <div className="space-y-8">
                        <div>
                            <p className="text-[8px] text-white/20 mb-2 font-bold tracking-widest uppercase">Karta raqami</p>
                            <p className="text-xl font-mono text-white tracking-widest">{cardNumber}</p>
                        </div>
                        <div className="flex justify-between items-end border-t border-white/5 pt-6">
                            <div>
                                <p className="text-[8px] text-white/20 mb-1 font-bold tracking-widest uppercase">Egasi</p>
                                <p className="text-lg italic text-[#D4AF37]">{cardName || groomName}</p>
                            </div>
                            <button onClick={copyToClipboard} className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase transition-all ${isCopied ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-white border border-white/10'}`}>
                                {isCopied ? 'Nusxalandi!' : 'NUSXALASH'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer className="py-32 px-10 text-center border-t border-white/5 space-y-12">
            <h2 className="text-5xl font-serif italic text-[#D4AF37]">Taklifnoma Asia</h2>
            <div className="space-y-8 pt-12">
                <p className="text-[11px] text-white/20 font-bold tracking-widest uppercase italic">O'z taklifnomangizni yarating:</p>
                <a href="https://taklifnoma.asia" target="_blank" className="inline-block px-12 py-5 bg-white text-black font-black tracking-widest uppercase rounded-2xl shadow-xl hover:bg-[#D4AF37] transition-all">Taklifnoma Yaratish</a>
            </div>
            <div className="pt-20 opacity-20">
                <p className="text-[8px] tracking-[0.4em] uppercase font-black italic">© 2026 Baxtli Lahzalar Maskani</p>
            </div>
        </footer>
      </main>
    </div>
  );
}
