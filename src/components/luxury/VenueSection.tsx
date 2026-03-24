'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export function VenueSection() {
  return (
    <section className="relative w-full py-12 md:py-24 bg-white flex flex-col items-center justify-center font-sans overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-[#F3E8FF] rounded-full blur-[100px] opacity-60 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl px-6"
      >
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left visual half */}
          <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 md:p-12 min-h-[250px] md:min-h-[300px] relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop")' }} />
            <div className="absolute inset-0 bg-[#7E22CE]/10" />
            
            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" strokeWidth={2} />
            </div>
          </div>

          {/* Right content half */}
          <div className="w-full md:w-1/2 p-6 md:p-14 flex flex-col items-center md:items-start text-center md:text-left bg-white">
            <span className="inline-block bg-purple-100 text-purple-700 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 md:mb-6 w-max">
              Manzil
            </span>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-4">
              Oqsaroy Koshonasi
            </h2>
            
            <p className="text-[#64748B] text-xs md:text-sm leading-relaxed mb-8 md:mb-10">
              Surxondaryo viloyati, Sho&apos;rchi tumani
            </p>

            <a 
              href="#" 
              className="inline-flex items-center justify-center bg-purple-700 text-white h-12 md:h-14 px-8 rounded-full font-bold text-sm hover:bg-purple-800 transition-colors shadow-lg shadow-purple-500/20 gap-3 w-full sm:w-max hover:-translate-y-1 transform duration-300"
            >
              <span>Xaritadan topish</span>
              <Navigation className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
}
