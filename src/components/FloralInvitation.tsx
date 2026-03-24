'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/lib/types';

interface FloralInvitationProps {
  content: InvitationContent;
  isLocked?: boolean;
}

export const FloralInvitation: React.FC<FloralInvitationProps> = ({ content, isLocked }) => {
  const { groomName, brideName, date, time, locationName, imageUrl } = content;

  if (isLocked) {
    return (
      <div className="flex items-center justify-center min-h-[500px] bg-white p-8 text-center h-full">
        <div className="max-w-xs space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto"
          >
            <span className="text-3xl text-pink-400">🔒</span>
          </motion.div>
          <h2 className="text-2xl font-serif text-gray-800">Taklifnoma hali faollashtirilmagan</h2>
          <p className="text-gray-400 text-xs uppercase tracking-widest leading-relaxed">To'lov amalga oshirilgandan so'ng taklifnoma to'liq ochiladi.</p>
          <a href="/" className="inline-block mt-4 text-[10px] font-bold text-pink-600 uppercase tracking-[0.2em] border-b border-pink-200 pb-1">Bosh sahifaga qaytish</a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-full bg-white flex flex-col items-center">
      {/* Floral Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-48 opacity-40 pointer-events-none">
        <Image 
          src="/assets/floral.png" 
          alt="floral-top" 
          fill 
          className="object-cover object-top"
          priority
        />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-48 opacity-40 pointer-events-none rotate-180">
        <Image 
          src="/assets/floral.png" 
          alt="floral-bottom" 
          fill 
          className="object-cover object-top"
          priority
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 w-full px-8 py-24 flex flex-col items-center text-center space-y-10"
      >
        <div className="space-y-4">
          <p className="tracking-[0.4em] uppercase text-[10px] text-pink-400 font-bold">Taklifnoma</p>
          <div className="w-8 h-px bg-pink-100 mx-auto"></div>
        </div>

        <div className="space-y-4 py-4">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-5xl text-gray-800 font-serif lowercase"
          >
            {groomName}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl font-serif italic text-pink-300"
          >
            va
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className="text-5xl text-gray-800 font-serif lowercase"
          >
            {brideName}
          </motion.h1>
        </div>

        {imageUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 1.5 }}
            className="relative w-full aspect-[1/1.2] rounded-t-full rounded-b-lg overflow-hidden border-4 border-white shadow-xl ring-1 ring-gray-100"
          >
            <Image 
              src={imageUrl} 
              alt="Couple" 
              fill 
              className="object-cover"
            />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-8 pt-6 w-full"
        >
          <div className="space-y-1">
             <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">Marosim Vaqti</div>
             <p className="font-serif text-3xl text-gray-800">{date}</p>
             <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Soat {time}</p>
          </div>

          <div className="p-8 bg-gray-50/50 rounded-3xl border border-gray-100/50 backdrop-blur-sm space-y-4">
            <h3 className="text-lg text-gray-800 font-serif lowercase">{locationName}</h3>
            <button className="w-full py-4 bg-white border border-gray-100 text-gray-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-pink-50 hover:text-pink-600 transition-all shadow-sm">
              Xaritani ko'rish
            </button>
          </div>
        </motion.div>

        <div className="pt-20 pb-10 w-full">
          <div className="w-12 h-px bg-pink-100 mx-auto opacity-50"></div>
          <p className="mt-8 text-[8px] text-gray-300 uppercase tracking-[0.4em] font-medium italic">
            onlinetaklifnoma.uz orqali yaratildi
          </p>
        </div>
      </motion.div>
    </div>
  );
};
