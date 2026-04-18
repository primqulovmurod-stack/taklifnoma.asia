'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Music, Heart, Phone, Clock, Share2, Sparkles, ChevronDown } from 'lucide-react';

import { InvitationContent } from '@/lib/types';

const defaultContent: InvitationContent = {
  groomName: 'Xurshidbek',
  brideName: 'Mohinurbonu',
  date: '2026-05-25',
  time: '18:00',
  locationName: 'Toshkent, "Navro\'z" restorani',
  locationAddress: 'Shayxontohur tumani, Labzak ko\'chasi',
  locationUrl: 'https://maps.google.com',
  musicUrl: '/assets/music.mp3',
  imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
};

const ShadcnAnimatedInvitation = ({ content = defaultContent }: { content?: InvitationContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const handleOpen = () => {
    setIsOpen(true);
    // In a real app, music would play here
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#D4AF37] selection:text-black overflow-x-hidden font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -1000 }}
            transition={{ duration: 1, ease: 'circOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A] p-6 text-center"
          >
            <div className="max-w-md w-full space-y-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex justify-center gap-4 text-[#D4AF37]">
                  <Sparkles size={24} className="animate-pulse" />
                </div>
                <h2 className="text-sm font-light tracking-[0.5em] uppercase text-gray-400">Taklifnoma</h2>
                <h1 className="text-5xl md:text-6xl font-serif text-[#D4AF37] leading-tight">
                  {content.groomName} <br /> & <br /> {content.brideName}
                </h1>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="relative group px-12 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all hover:bg-[#C5A028] shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <span className="relative z-10">O'CHISH</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
              
              <div className="pt-12">
                <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">Premium Wedding Series</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`relative ${isOpen ? 'block' : 'hidden'}`}>
        {/* Floating Controls */}
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-[#D4AF37] shadow-2xl"
          >
            <Music size={20} className={isPlaying ? 'animate-spin-slow' : ''} />
          </motion.button>
        </div>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center p-6 overflow-hidden">
          <motion.div 
            style={{ opacity, scale }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img 
              src={content.imageUrl} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="relative z-20 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-2"
            >
              <p className="text-[#D4AF37] tracking-[0.4em] uppercase text-sm font-medium">Bismillahir Rohmanir Rohim</p>
              <div className="h-[1px] w-24 bg-[#D4AF37]/30 mx-auto my-6" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="text-7xl md:text-9xl font-serif text-[#D4AF37] leading-none"
            >
              Nikoh <br /> To'yi
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-6 text-xl md:text-2xl font-light tracking-widest text-gray-300"
            >
              <span>{content.groomName}</span>
              <Heart fill="#D4AF37" size={24} className="text-[#D4AF37]" />
              <span>{content.brideName}</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30"
            >
              <ChevronDown size={32} />
            </motion.div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-32 px-6 bg-[#080808]">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-6 group hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                <Calendar size={28} />
              </div>
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-2">Sana</h3>
                <p className="text-2xl font-serif">{content.date}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-6 group hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                <Clock size={28} />
              </div>
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-2">Vaqti</h3>
                <p className="text-2xl font-serif">Soat {content.time} da</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-6 group hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-2">Restoran</h3>
                <p className="text-2xl font-serif">{content.locationName}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Invitation Text Section */}
        <section className="py-40 px-6 bg-black relative">
          <div className="max-w-2xl mx-auto text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <Heart className="mx-auto text-[#D4AF37]" size={40} />
              <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 italic">
                "Bizni birlashtirgan bu go'zal oqshomda, hayotimizning yangi sahifasini siz azizlar bilan birgalikda kutib olishdan baxtiyormiz. Lutfan baxtli kunimizning guvohi bo'ling."
              </p>
              <div className="flex justify-center gap-12 pt-8">
                <div className="text-center">
                  <p className="text-[#D4AF37] font-serif text-3xl mb-2">{content.groomName}</p>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500">Kuyov Taraf</span>
                </div>
                <div className="text-center">
                  <p className="text-[#D4AF37] font-serif text-3xl mb-2">{content.brideName}</p>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500">Kelin Taraf</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-32 px-6 bg-[#0A0A0A]">
            <div className="max-w-4xl mx-auto rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md p-10 md:p-20 relative">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-4xl font-serif text-[#D4AF37]">Manzilimiz</h2>
                    <p className="text-gray-400 font-light">{content.locationAddress || ''}</p>
                    <div className="flex flex-col gap-4 pt-4">
                       <a 
                        href={content.locationUrl}
                        target="_blank"
                        className="flex items-center gap-4 group"
                       >
                         <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                           <MapPin size={20} />
                         </div>
                         <span className="font-medium tracking-wide">Xaritada ochish</span>
                       </a>
                    </div>
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 shadow-2xl">
                    {/* Placeholder for Map / Image */}
                    <img 
                      src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop" 
                      className="w-full h-full object-cover"
                      alt="Venue"
                    />
                  </div>
               </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="py-20 text-center border-t border-white/5">
             <div className="space-y-6">
                <p className="text-[10px] tracking-[0.4em] uppercase text-gray-600">Created by</p>
                <h3 className="text-2xl font-serif opacity-50 tracking-widest">TAKIFNOMA.ASIA</h3>
                <div className="flex justify-center gap-6 text-gray-500">
                    <Share2 size={20} className="hover:text-[#D4AF37] cursor-pointer" />
                    <Phone size={20} className="hover:text-[#D4AF37] cursor-pointer" />
                </div>
             </div>
        </footer>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@200..800&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #030303;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ShadcnAnimatedInvitation;
