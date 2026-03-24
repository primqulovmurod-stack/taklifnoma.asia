'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CalendarSection() {
  const days = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
  
  // June 2026 starts on a Monday. In Mon-Sun week, Monday is index 0.
  const emptyDays = Array(0).fill(null);
  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);
  
  return (
    <section className="relative w-full py-12 md:py-24 bg-[#F8FAFC] flex flex-col items-center justify-center font-sans border-t border-gray-100">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-12 space-y-2 md:space-y-3"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 md:mb-2">
          Sana
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">Iyun 2026</h2>
        <p className="text-xs md:text-sm font-medium text-[#64748B]">
          Ushbu kun kalendaringizda belgilangan bo&apos;lsin
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-lg px-4 sm:px-6"
      >
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-purple-900/5 border border-purple-50 p-5 sm:p-6 md:p-10">
          <div className="grid grid-cols-7 gap-y-4 md:gap-y-6 gap-x-1 sm:gap-x-2 md:gap-x-4 text-center">
            {days.map((day, i) => (
              <div key={i} className="text-xs font-bold text-[#64748B] uppercase pb-4 border-b border-gray-100">
                {day}
              </div>
            ))}
            
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="h-10 md:h-12" />
            ))}
            
            {monthDays.map((day) => {
              const isWeddingDay = day === 20;
              return (
                <div key={day} className="relative flex items-center justify-center h-10 md:h-12">
                  {isWeddingDay ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center bg-purple-700 text-white rounded-[1rem] shadow-lg shadow-purple-500/40 z-10"
                    >
                      <span className="text-lg font-bold">{day}</span>
                    </motion.div>
                  ) : (
                    <span className="text-[15px] font-medium text-[#0F172A]/80 hover:text-purple-700 transition-colors cursor-default">
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
