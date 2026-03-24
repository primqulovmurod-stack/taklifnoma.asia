'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[95vh] bg-white flex flex-col items-center justify-center overflow-hidden font-sans pt-8 md:pt-20 pb-12 md:pb-20">
      
      {/* Soft E-commerce Background Blobs */}
      <div className="absolute top-[5%] left-[0%] w-80 h-80 bg-[#F3E8FF] rounded-full blur-[100px] opacity-80 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-[#F3E8FF] rounded-full blur-[100px] opacity-60 pointer-events-none" />

      {/* Decorative dots pattern */}
      <div className="absolute top-[20%] left-[45%] w-32 h-32 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #7E22CE 2px, transparent 2px)', backgroundSize: '16px 16px' }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        {/* Left Typography Side */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6">

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#0F172A] leading-[1.1] tracking-tight">
            Xurshidbek <br className="hidden md:block"/> <span className="text-2xl md:text-5xl text-[#64748B] font-medium mx-2">&amp;</span> <br className="hidden md:block"/> <span className="text-purple-700">Mohinur</span>
          </h1>

          <p className="text-[#64748B] text-sm md:text-base max-w-md leading-relaxed">
            Bizning hayotimizdagi eng muhim va unutilmas kunda yonimizda bo&apos;lishingizdan bag&apos;oyatda xursandmiz. Ushbu kunni biz bilan baham ko&apos;ring.
          </p>

          <a href="#" className="inline-flex items-center justify-center bg-purple-700 text-white px-8 md:px-10 py-3.5 md:py-5 rounded-full font-bold text-sm md:text-base hover:bg-purple-800 transition-all shadow-xl shadow-purple-500/30 gap-3 mt-2 md:mt-4 w-full sm:w-auto transform hover:-translate-y-1">
            Xaritani ko&apos;rish <span>&rarr;</span>
          </a>

          <div className="flex items-center gap-6 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100 w-full justify-center md:justify-start">
            <div className="text-center md:text-left">
               <span className="font-extrabold text-2xl text-[#0F172A]">20 Iyun 2026</span>
               <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-semibold">Asosiy Sana</p>
            </div>
            <div className="w-[1px] h-10 bg-gray-200" />
            <div className="text-center md:text-left">
               <span className="font-extrabold text-2xl text-[#0F172A]">18:00</span>
               <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-semibold">Vaqt</p>
            </div>
          </div>
        </div>

        {/* Right side image */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
          <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[600px] mx-auto overflow-hidden shadow-2xl bg-gray-100 rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] border-8 border-white">
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2000&auto=format&fit=crop")' }} />
          </div>
        </div>
        
      </motion.div>
    </section>
  );
}
