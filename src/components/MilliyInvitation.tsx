'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UzbekPatternCorner, UzbekPatternDivider, UzbekPatternBorder } from './milliy/Pattern';
import { RSVPSection } from './milliy/RSVPSection';
import { CalendarSection } from './luxury/CalendarSection';
import { MapPin, CreditCard } from 'lucide-react';

interface MilliyInvitationProps {
  groomName?: string;
  brideName?: string;
  date?: string;
  time?: string;
  locationName?: string;
  locationAddress?: string;
  musicUrl?: string;
  cardNumber?: string;
  cardName?: string;
  isPreview?: boolean;
}

export default function MilliyInvitation({
  groomName = "Xurshid",
  brideName = "Mohinur",
  date = "20 Iyun 2026",
  time = "18:00",
  locationName = '"Yagona" To\'yxonasi',
  locationAddress = "Toshkent sh., Yunusobod t., 4-mavze, 12-uy",
  musicUrl = "/assets/die_with_a_smile.mp3",
  cardNumber = "9860 1234 5678 1234",
  cardName = "MUROD P.",
  isPreview = false
}: MilliyInvitationProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Autoplay on first interaction (simulated for Milliy since it doesn't have an 'Open' button yet)
  React.useEffect(() => {
    const handleFirstClick = () => {
        if (audioRef.current && !isPlaying) {
            audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
            setIsPlaying(true);
        }
        document.removeEventListener('click', handleFirstClick);
    };
    document.addEventListener('click', handleFirstClick);
    return () => document.removeEventListener('click', handleFirstClick);
  }, [isPlaying]);

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-[#5D4037] font-serif overflow-x-hidden selection:bg-[#5D4037]/10 selection:text-[#5D4037]">
      <audio ref={audioRef} src={musicUrl} loop />

      {/* Global Mute Toggle for Viewer */}
      {musicUrl && (
          <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => {
                  if (audioRef.current) {
                      if (isPlaying) {
                          audioRef.current.pause();
                      } else {
                          audioRef.current.play();
                      }
                      setIsPlaying(!isPlaying);
                  }
              }}
              className="fixed bottom-24 right-6 z-[120] w-14 h-14 bg-white/80 backdrop-blur-xl border border-[#5D4037]/30 rounded-full flex items-center justify-center text-[#5D4037] shadow-xl shadow-black/5 active:scale-90 transition-all"
          >
              <div className={`relative transition-transform duration-500`}>
                  {isPlaying ? (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-[spin_4s_linear_infinite]"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                  )}
              </div>
          </motion.button>
      )}
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="absolute top-8 left-8 w-24 h-24 text-[#5D4037]/10 rotate-0"><UzbekPatternCorner className="w-full h-full" /></div>
        <div className="absolute top-8 right-8 w-24 h-24 text-[#5D4037]/10 rotate-90"><UzbekPatternCorner className="w-full h-full" /></div>
        <div className="absolute bottom-8 left-8 w-24 h-24 text-[#5D4037]/10 -rotate-90"><UzbekPatternCorner className="w-full h-full" /></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 text-[#5D4037]/10 rotate-180"><UzbekPatternCorner className="w-full h-full" /></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="space-y-8 z-10"
        >
          <p className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase border-y border-[#5D4037]/20 py-2 inline-block">Taklifnoma Asia</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl italic font-serif leading-tight">
            {groomName} <br /> & <br /> {brideName}
          </h1>
          <div className="max-w-md mx-auto py-6">
            <UzbekPatternDivider className="mb-6 opacity-60" />
            <p className="text-sm md:text-lg opacity-80 px-4 leading-relaxed">Ikkimizni bir butun qilgan ulug' kunimizda, bizni chin qalbdan qo'llab-quvvatlagan yaqinlarimiz – Sizlarni ko'rishdan baxtiyor bo'lamiz.</p>
          </div>
        </motion.div>
      </section>

      {/* Details */}
      <section className="py-24 px-6 md:max-w-3xl mx-auto text-center space-y-12 bg-white/40 backdrop-blur-xl rounded-[50px] my-12 border border-white/20">
          <h2 className="text-4xl italic mb-6">Nikoh Oqshomi</h2>
          <p className="text-lg opacity-80 leading-loose">Hayotimizning yangi sahifasi ochiladigan ushbu kunda Siz aziz mehmonlarimizning tashrifingiz biz uchun chinakam sharaflidir.</p>
          <div className="text-4xl font-serif text-[#BF360C]">{date}</div>
          <div className="text-xl opacity-60 uppercase tracking-[0.2em] pt-4">VAQT: {time}</div>
      </section>

      {/* Map */}
      <section className="py-24 px-6 text-center space-y-8">
            <div className="flex items-center justify-center gap-4 text-[#BF360C]"><MapPin className="w-6 h-6" /><h3 className="text-xl font-bold uppercase tracking-widest">Manzil</h3></div>
            <div className="p-10 bg-white rounded-3xl border border-[#5D4037]/10 shadow-sm max-w-2xl mx-auto">
              <h4 className="text-3xl italic mb-3">{locationName}</h4>
              <p className="opacity-75 text-base italic mb-8">{locationAddress}</p>
              <button className="px-12 py-5 bg-[#5D4037] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">Xaritadan ko'rish</button>
            </div>
      </section>

      {/* Gift Section */}
      <section className="py-32 px-6 text-center space-y-12">
          <h2 className="text-4xl italic">To'yona uchun</h2>
          <p className="text-sm opacity-60 max-w-sm mx-auto italic leading-relaxed">Agarda bizni masofadan turib tabriklamoqchi bo'lsangiz, quyidagi karta raqami orqali o'z sovg'angizni yuborishingiz mumkin.</p>
          <div className="bg-[#5D4037] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden text-left max-w-lg mx-auto">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 scale-150"><CreditCard className="w-24 h-24 text-white" /></div>
              <div className="relative z-10 space-y-10">
                  <div className="w-14 h-10 bg-[#FFD600] rounded-xl" />
                  <div>
                      <p className="text-[8px] text-white/30 uppercase font-bold mb-2">Karta raqami</p>
                      <p className="text-xl font-mono text-white tracking-widest">{cardNumber}</p>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/5 pt-6">
                      <div>
                          <p className="text-[8px] text-white/30 uppercase font-bold mb-1">Karta egasi</p>
                          <p className="text-lg italic text-white">{cardName || groomName}</p>
                      </div>
                      <button onClick={copyToClipboard} className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase transition-all ${isCopied ? 'bg-white text-[#5D4037]' : 'bg-white/10 text-white'}`}>
                          {isCopied ? 'Nusxalandi!' : 'NUSXALASH'}
                      </button>
                  </div>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-32 flex flex-col items-center justify-center gap-12 border-t border-[#5D4037]/5 bg-white/40">
        <div className="text-center space-y-6">
            <p className="text-4xl italic text-[#5D4037]">Taklifnoma Asia</p>
            <p className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-60">Baxtli lahzalar maskani</p>
        </div>
        <div className="flex flex-col items-center gap-6">
            <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest italic">O'z taklifnomangizni yarating:</p>
            <a href="https://taklifnoma.asia" target="_blank" className="px-12 py-6 bg-[#5D4037] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-[#5D4037]/20 hover:scale-105 transition-all">Taklifnoma Yaratish</a>
        </div>
      </footer>
    </main>
  );
}
