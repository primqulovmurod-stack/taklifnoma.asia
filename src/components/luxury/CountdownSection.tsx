'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownSectionProps {
  weddingDate: string; // Masalan: "24 - MAY, 2026"
  isPreview?: boolean;
}

const CountdownSection: React.FC<CountdownSectionProps> = ({ weddingDate, isPreview = false }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    let targetDate = new Date();
    
    const parseWeddingDate = (dateStr?: string) => {
      if (!dateStr) return new Date();
      
      const uzbekFormat = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/;
      const match = dateStr.trim().match(uzbekFormat);
      
      if (match) {
        const day = parseInt(match[1]);
        const month = parseInt(match[2]) - 1;
        const year = parseInt(match[3]);
        const d = new Date(year, month, day, 18, 0, 0); // Default to 6 PM
        if (!isNaN(d.getTime())) return d;
      }
      
      const standard = new Date(dateStr);
      if (!isNaN(standard.getTime())) return standard;
      
      return new Date();
    };

    targetDate = parseWeddingDate(weddingDate);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const TimeBlock = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className={`${isPreview ? 'w-12 h-12' : 'w-16 h-16 md:w-20 md:h-20'} bg-white shadow-xl rounded-2xl flex items-center justify-center border-b-4 border-[#E11D48]/20`}>
        <span className={`${isPreview ? 'text-lg' : 'text-2xl md:text-3xl'} font-black text-[#0F172A]`}>{value < 10 ? `0${value}` : value}</span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#E11D48] mt-3">{label}</span>
    </div>
  );

  return (
    <section className={`${isPreview ? 'py-8' : 'py-16'} px-6 bg-transparent relative overflow-hidden`}>
      <div className="max-w-md mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`text-center ${isPreview ? 'mb-6' : 'mb-10'}`}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#E11D48]/30"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E11D48]">Teskari Sanoq</span>
            <div className="h-[1px] w-8 bg-[#E11D48]/30"></div>
          </div>
          <h2 className={`${isPreview ? 'text-base' : 'text-xl'} font-serif text-[#0F172A]`}>Baxitli kunimizga qolgan vaqt</h2>
        </motion.div>

        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {[{ value: timeLeft.days, label: 'Kun' }, { value: timeLeft.hours, label: 'Soat' }, { value: timeLeft.minutes, label: 'Daqiqa' }, { value: timeLeft.seconds, label: 'Soniya' }].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
            >
              <TimeBlock value={item.value} label={item.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
