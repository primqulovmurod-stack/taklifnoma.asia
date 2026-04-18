'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Calendar, MapPin, Music, Heart, Sparkles, Clock, Phone, ChevronDown } from 'lucide-react';

import { InvitationContent } from '@/lib/types';

const defaultContent: InvitationContent = {
  groomName: 'George',
  brideName: 'Salomey',
  date: '2026-10-25',
  time: '12:00',
  locationName: 'The Church Premises',
  locationAddress: 'Assemblies of God, Marivile Homes, Manet-Teshie Link, Greater Accra',
  locationUrl: 'https://maps.google.com',
  musicUrl: '/assets/music.mp3',
  imageUrl: 'https://images.unsplash.com/photo-1544924405-4c0787b4a240?q=80&w=2070&auto=format&fit=crop',
};

const WhiteGold3DInvitation = ({ content = defaultContent, isPreview = false }: { content?: InvitationContent; isPreview?: boolean }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#4A4435] selection:bg-[#D4AF37] selection:text-white overflow-x-hidden font-sans pb-20">
      {/* Decorative Ornaments (Fixed Background) */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
         <div className="absolute top-0 right-0 w-96 h-96 bg-[url('https://www.transparenttextures.com/patterns/white-lace.png')] opacity-40 rotate-180" />
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-[url('https://www.transparenttextures.com/patterns/white-lace.png')] opacity-40" />
      </div>

      <main ref={containerRef} className="relative z-10 max-w-2xl mx-auto px-4 pt-10">
        
        {/* Main Card Container */}
        <motion.div 
          style={{ scale, rotateY }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(74,68,53,0.15)] border-[1px] border-[#E8E4D9] overflow-hidden"
        >
          {/* 3D Paper Cut Border Overlay */}
          <div className="absolute inset-0 border-[16px] border-white z-20 pointer-events-none shadow-inner" />
          
          {/* Inner Decorative Frame */}
          <div className="p-12 md:p-16 relative">
            
            {/* Header Ornament */}
            <div className="flex flex-col items-center mb-12">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative w-24 h-24 mb-6"
               >
                  <div className="absolute inset-0 border-2 border-dashed border-[#D4AF37]/30 rounded-full" />
                  <div className="absolute inset-4 border border-[#D4AF37]/50 rounded-full flex items-center justify-center">
                     <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#E6BE8A] to-[#FDFCF9] shadow-[0_0_10px_#D4AF37]" />
                  </div>
                  {/* Sunburst lines */}
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute top-1/2 left-1/2 w-[1px] h-2 bg-[#D4AF37] -translate-y-12 origin-bottom"
                      style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
                    />
                  ))}
               </motion.div>
               <h2 className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#A6894B]">Together With</h2>
               <h3 className="text-xs tracking-[0.3em] uppercase mt-2 font-bold text-[#A6894B]">Their Families</h3>
            </div>

            {/* Names Section */}
            <div className="text-center space-y-4 mb-14">
               <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-6xl md:text-8xl font-script text-[#A6894B] tracking-tight leading-tight"
               >
                 {content.groomName}
               </motion.h1>
               <div className="flex items-center justify-center gap-4">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
                  <span className="text-4xl font-script text-[#D4AF37]">&</span>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
               </div>
               <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-script text-[#A6894B] tracking-tight leading-tight"
               >
                 {content.brideName}
               </motion.h1>
               <p className="text-[9px] tracking-[0.3em] uppercase text-gray-400 mt-8">Invites you to their <br /> wedding celebration</p>
            </div>

            {/* Date and Time Grid */}
            <div className="grid grid-cols-2 border-y-[1px] border-[#F1EEE5] py-10 mb-12">
               <div className="text-center border-r-[1px] border-[#F1EEE5] space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-[#A6894B] font-bold">Saturday</p>
                  <p className="text-3xl font-serif text-[#4A4435]">{content.date.split('-')[2]}</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#A6894B] font-bold">OCT. 2026</p>
               </div>
               <div className="text-center flex flex-col justify-center space-y-2">
                  <p className="text-4xl font-serif text-[#4A4435]">{content.time.split(':')[0]}</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#A6894B] font-bold">PM GMT</p>
               </div>
            </div>

            {/* Location Details */}
            <div className="text-center space-y-6">
               <div className="flex justify-center">
                  <MapPin size={24} className="text-[#D4AF37]" strokeWidth={1} />
               </div>
               <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#4A4435]">@ {content.locationName}</p>
                  <p className="max-w-xs mx-auto text-[10px] leading-relaxed text-gray-500 uppercase tracking-widest">
                    {content.locationAddress || ''}
                  </p>
               </div>
               
               <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#A6894B] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-[#A6894B]/20 transition-all hover:bg-[#8B723F]"
               >
                 View on Map
               </motion.button>
            </div>

            {/* RSVP Section */}
            <div className="mt-20 pt-10 border-t border-dashed border-[#D4AF37]/30 text-center">
                <h4 className="text-xl font-script text-[#A6894B] mb-4 text-2xl">RSVP:</h4>
                <div className="flex justify-center gap-10">
                   <div className="space-y-1">
                      <p className="text-[8px] uppercase tracking-widest font-bold text-gray-400">GIFTY</p>
                      <p className="text-[10px] tracking-widest font-bold">+233 454 883 593</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[8px] uppercase tracking-widest font-bold text-gray-400">EMMA</p>
                      <p className="text-[10px] tracking-widest font-bold">+233 345 433 324</p>
                   </div>
                </div>
            </div>

            {/* 3D Decorative Leaves Overlay (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-30">
               {/* Simplified SVG ornaments to mimic the 3D effect */}
               <svg viewBox="0 0 400 200" className="w-full h-full fill-white drop-shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                  <path d="M0,200 Q100,100 200,200 Q300,100 400,200" fill="white" />
                  <circle cx="200" cy="180" r="5" fill="#D4AF37" stroke="white" strokeWidth="2" />
               </svg>
            </div>
          </div>
        </motion.div>

        {/* Closing Tag */}
        <div className="text-center mt-12 space-y-4">
           <Heart fill="#D4AF37" size={20} className="text-[#D4AF37] mx-auto opacity-30" />
           <p className="text-[8px] tracking-[0.4em] uppercase text-gray-400 font-bold">Premium 3D Collection — Takdlifnoma.Asia</p>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@400;700&display=swap');
        
        .font-script {
          font-family: 'Great Vibes', cursive;
        }
        
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #FDFCF9;
        }
      `}</style>
    </div>
  );
};

export default WhiteGold3DInvitation;
