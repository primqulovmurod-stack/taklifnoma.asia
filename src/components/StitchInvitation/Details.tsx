'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Details: React.FC<any> = ({ locationName, locationAddress, cardNumber, cardName, groomName }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (cardNumber) {
      navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-24 pb-32 px-6 max-w-screen-md mx-auto bg-stitch-surface text-stitch-on-surface min-h-[100dvh]"
    >
      <h2 className="font-headline text-5xl text-stitch-primary mb-12 leading-tight">Tadbir <br/><span className="italic font-normal text-stitch-on-surface">tafsilotlari</span></h2>
      <div className="grid grid-cols-1 gap-10">
        <div className="flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stitch-outline-variant/10 flex items-start gap-6">
            <span className="material-symbols-outlined text-stitch-primary text-4xl">favorite</span>
            <div>
              <h3 className="font-headline text-2xl mb-1 text-stitch-on-surface">Nikoh marosimi</h3>
            </div>
          </div>
        </div>
        
        <div className="rounded-[2.5rem] overflow-hidden bg-white min-h-[350px] relative p-8 flex flex-col justify-end shadow-2xl group border border-stitch-outline-variant/10">
          <div className="relative z-20 text-black space-y-2 text-center">
            <h2 className="font-headline text-4xl tracking-wide text-stitch-primary">{locationName}</h2>
            <p className="text-sm opacity-80 font-body tracking-wider uppercase">{locationAddress}</p>
            <a href="#" className="inline-flex items-center gap-3 mt-6 bg-stitch-primary text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">Xaritani ko'rish</a>
          </div>
        </div>

        {/* Gift Section */}
        <div className="bg-stitch-primary p-10 rounded-[3rem] shadow-2xl text-left relative overflow-hidden text-white">
           <div className="relative z-10 space-y-10">
                <div className="w-14 h-11 bg-white/20 rounded-xl" />
                <div className="space-y-6">
                   <div>
                      <p className="text-[8px] opacity-40 uppercase tracking-widest mb-2 font-bold">Karta raqami</p>
                      <p className="text-xl font-mono tracking-widest">{cardNumber}</p>
                   </div>
                   <div className="flex justify-between items-end border-t border-white/10 pt-6">
                       <div>
                          <p className="text-[8px] opacity-40 uppercase tracking-widest mb-1 font-bold">Karta egasi</p>
                          <p className="text-lg italic">{cardName || groomName}</p>
                       </div>
                       <button onClick={copyToClipboard} className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase transition-all ${isCopied ? 'bg-white text-stitch-primary' : 'bg-white/10 text-white border border-white/20'}`}>
                          {isCopied ? 'NUSXALANDI!' : 'NUSXALASH'}
                       </button>
                   </div>
                </div>
           </div>
        </div>

        {/* Branding Footer */}
        <div className="pt-20 text-center space-y-8">
            <p className="text-4xl italic text-stitch-primary font-headline">Taklifnoma Asia</p>
            <div className="space-y-6">
                <p className="text-[10px] text-stitch-on-surface-variant font-bold uppercase tracking-widest">O'z taklifnomangizga ega bo'ling:</p>
                <a href="https://taklifnoma.asia" target="_blank" className="inline-block px-10 py-5 bg-stitch-primary text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-xl">Taklifnoma Yaratish</a>
            </div>
        </div>
      </div>
    </motion.main>
  );
};
