'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

export function GiftSection() {
  const [copied, setCopied] = useState(false);
  const cardNumber = "8600 1234 5678 9012";

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full py-24 bg-white flex flex-col items-center justify-center overflow-hidden font-sans">

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg px-6 relative z-10 flex flex-col items-center gap-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            To&apos;yona uchun
          </h2>
        </div>

        {/* Vibrant E-commerce Card */}
        <div className="perspective-1000 w-full">
          <motion.div 
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full aspect-[1.6/1] rounded-3xl p-6 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl shadow-purple-900/30"
            style={{
              background: 'linear-gradient(135deg, #7E22CE 0%, #4C1D95 100%)',
            }}
          >
            {/* Card Overlays */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D8B4FE]/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="flex justify-between items-start z-10">
              <div className="w-12 h-9 rounded-md bg-[#FCD34D] bg-opacity-90 shadow-inner flex flex-col justify-evenly px-2 relative overflow-hidden border border-yellow-400">
                <div className="w-full h-[1px] bg-yellow-600/30" />
                <div className="w-full h-[1px] bg-yellow-600/30" />
                <div className="w-full h-[1px] bg-yellow-600/30" />
              </div>
              <span className="text-white/80 font-black text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                Gift Card
              </span>
            </div>

            <div className="space-y-4 sm:space-y-6 z-10 w-full">
              <div className="font-sans text-[15px] min-[400px]:text-lg sm:text-2xl md:text-[28px] text-white font-extrabold tracking-wider sm:tracking-widest tabular-nums drop-shadow-md whitespace-nowrap text-center sm:text-left">
                {cardNumber}
              </div>
              
              <div className="flex justify-center sm:justify-end items-end w-full">
                <button 
                  onClick={handleCopy}
                  className="group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 bg-white/10 hover:bg-white transition-all duration-300 backdrop-blur-md flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  {copied ? <Check size={16} className="text-[#0F172A]" /> : <Copy size={16} className="text-white group-hover:text-[#0F172A]" />}
                  <span className="font-bold text-[10px] md:text-xs uppercase tracking-widest text-white group-hover:text-[#0F172A] transition-colors">
                    {copied ? "Saqlandi" : "Nusxa Olish"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
