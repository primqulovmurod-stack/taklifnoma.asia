'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const targetDate = new Date('2026-06-20T18:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Kun', value: timeLeft.days },
    { label: 'Soat', value: timeLeft.hours },
    { label: 'Daqiqa', value: timeLeft.minutes },
    { label: 'Soniya', value: timeLeft.seconds }
  ];

  if (!isMounted) return null;

  return (
    <section className="relative w-full py-12 md:py-24 bg-[#F8FAFC] text-[#0F172A] flex flex-col items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl px-4 mx-auto text-center"
      >
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-6 md:p-16 border border-gray-100 flex flex-col items-center">
          
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6 border border-purple-100">
            Intiqlik bilan
          </span>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-2 md:mb-4">
            Kutayotgan damlarga...
          </h2>
          <p className="text-xs md:text-sm font-medium text-[#64748B] mb-8 md:mb-12">
            Sanoqli vaqtlar qoldi
          </p>

          <div className="flex items-center justify-center w-full max-w-2xl mx-auto gap-0.5 sm:gap-2 md:gap-6">
            {timeUnits.map((unit, index) => (
              <React.Fragment key={unit.label}>
                <div className="flex flex-col items-center justify-center relative w-12 sm:w-16 md:w-28 text-center gap-1 sm:gap-2">
                  <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-tighter tabular-nums drop-shadow-sm">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest text-[#64748B] uppercase">
                    {unit.label}
                  </span>
                </div>
                {index < 3 && (
                   <div className="text-xl sm:text-3xl md:text-5xl text-gray-200 font-bold h-full flex items-start mt-[-10px] sm:mt-[-20px] md:mt-[-30px] mx-0.5 sm:mx-1">
                     :
                   </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <a href="#" className="mt-8 md:mt-14 inline-flex items-center justify-center bg-purple-700 text-white h-12 md:h-14 px-8 md:px-10 rounded-full font-bold text-sm tracking-wide hover:bg-purple-800 transition-colors shadow-lg shadow-purple-500/30 w-full sm:w-auto transform hover:-translate-y-1 duration-300">
             Taklifnomaga o&apos;tish &rarr;
          </a>
        </div>
      </motion.div>
    </section>
  );
}
