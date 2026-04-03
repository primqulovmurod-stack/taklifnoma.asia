'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/lib/types';
import { GiftSection } from '@/components/luxury/GiftSection';

interface FloralInvitationProps {
  content: InvitationContent;
}

export const FloralInvitation: React.FC<FloralInvitationProps> = ({ content }) => {
  const { groomName, brideName, date, time, locationName, imageUrl, cardNumber, cardName } = content;

  return (
    <div className="relative w-full min-h-screen bg-white flex flex-col items-center overflow-x-hidden selection:bg-pink-100">
      {/* Backgrounds */}
      <div className="absolute top-0 w-full h-64 opacity-40 pointer-events-none">
        <Image src="/assets/floral.png" alt="floral-top" fill className="object-cover object-top" priority />
      </div>
      
      <main className="z-10 w-full max-w-md px-8 py-24 flex flex-col items-center text-center space-y-16">
        <div className="space-y-4 pt-12">
          <p className="tracking-[0.4em] uppercase text-[10px] text-pink-400 font-black">Taklifnoma Asia</p>
          <div className="w-8 h-px bg-pink-100 mx-auto"></div>
        </div>

        <div className="space-y-6">
          <h1 className="text-6xl text-gray-800 font-serif lowercase leading-none">{groomName}</h1>
          <p className="text-2xl font-serif italic text-pink-300">va</p>
          <h1 className="text-6xl text-gray-800 font-serif lowercase leading-none">{brideName}</h1>
        </div>

        {imageUrl && (
          <div className="relative w-full aspect-[1/1.2] rounded-t-full rounded-b-lg overflow-hidden border-4 border-white shadow-2xl">
            <Image src={imageUrl} alt="Couple" fill className="object-cover" />
          </div>
        )}

        <div className="space-y-12 w-full">
          <div className="space-y-4">
             <div className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">Marosim Vaqti</div>
             <p className="font-serif text-4xl text-gray-800">{date}</p>
             <p className="text-pink-400 uppercase tracking-widest text-sm font-bold italic">Soat {time}</p>
          </div>

          <div className="p-10 bg-pink-50/30 rounded-3xl border border-pink-100/50 backdrop-blur-sm space-y-6">
            <h3 className="text-2xl text-gray-800 font-serif lowercase">{locationName}</h3>
            <button className="w-full py-5 bg-white border border-pink-100 text-pink-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-400 hover:text-white transition-all shadow-md">
              Xaritani ko'rish
            </button>
          </div>

          {/* Dynamic Gift Info */}
          <div className="py-8">
             <GiftSection cardNumber={cardNumber} cardName={cardName} />
          </div>
        </div>

        <footer className="pt-20 pb-10 w-full">
          <div className="space-y-12">
            <p className="text-4xl italic text-gray-800 font-serif">Taklifnoma Asia</p>
            <div className="space-y-6 pt-12">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">O'z taklifnomangizga ega bo'ling:</p>
              <a href="https://taklifnoma.asia" target="_blank" className="inline-block px-12 py-5 bg-pink-400 text-white rounded-2xl text-[11px] font-black tracking-[0.3em] uppercase shadow-xl shadow-pink-200">Taklifnoma Yaratish</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
