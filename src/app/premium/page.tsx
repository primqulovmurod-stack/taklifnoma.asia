'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Map, 
  Clock, 
  Calendar as CalendarIcon, 
  Heart, 
  Copy, 
  Check, 
  CreditCard,
  Building2,
  Navigation2,
  ArrowRight
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */

const COLORS = {
  ivory: '#FAF9F6',
  gold: '#C5A021',
  charcoal: '#1A1A1A',
  white: '#FFFFFF',
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENTS                                */
/* -------------------------------------------------------------------------- */

export default function PremiumInvitation() {
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] overflow-x-hidden selection:bg-[#C5A021]/20">
      <AnimatePresence>
        {!unlocked && (
          <LockScreen onUnlock={() => setUnlocked(true)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ 
          opacity: unlocked ? 1 : 0, 
          filter: unlocked ? 'blur(0px)' : 'blur(10px)',
          display: unlocked ? 'block' : 'none' 
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <HeroSection />
        <CalendarSection />
        <VenueSection />
        <CountdownSection />
        <GiftSection />
        <Footer />
      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&family=Cinzel:wght@400;700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background-color: #FAF9F6;
          font-family: 'Inter', sans-serif;
        }

        h1, h2, h3, .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .font-monogram {
          font-family: 'Cinzel', serif;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #FAF9F6;
        }
        ::-webkit-scrollbar-thumb {
          background: #C5A021;
        }
      `}</style>
    </div>
  );
}

/* ----------------------------- 1. LOCK SCREEN ----------------------------- */

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1A1A]"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      </div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        className="relative text-center"
      >
        <div 
          onClick={onUnlock}
          className="group cursor-pointer relative"
        >
          {/* Monogram Circle */}
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-[#C5A021] flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:bg-[#C5A021]/10">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 border border-dashed border-[#C5A021]/30 rounded-full"
            />
            
            <div className="text-[#C5A021] text-4xl md:text-5xl font-monogram font-bold tracking-widest relative z-10 transition-transform duration-500 group-hover:scale-110">
              X & M
            </div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1.1, opacity: 0.8 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute inset-0 bg-[#C5A021]/5 rounded-full"
            />
          </div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-[#C5A021]/70 text-sm tracking-[0.4em] uppercase font-light"
          >
            Tanishuv uchun bosing
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ----------------------------- 2. HERO SECTION ---------------------------- */

function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#81D8D0]">
      {/* Background Decor inspired by Tiffany Aesthetic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/10"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white/60 text-sm md:text-base tracking-[0.4em] uppercase mb-8 font-light"
        >
          Believe in Love
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-white text-6xl md:text-9xl font-serif mb-12 drop-shadow-xl tracking-tight"
        >
          Xurshidbek <span className="text-white/60 italic">&</span> Mohinur
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="h-px w-32 bg-white/30 text-white flex items-center justify-center font-monogram text-xs tracking-[1em] py-4 border-y border-white/20 uppercase">
             MMXXVI
          </div>
          <p className="text-white/80 text-xl md:text-3xl font-serif italic tracking-wide mt-4">
            Baxtimiz guvohi bo'ling
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>
    </section>
  );
}

/* ----------------------------- 3. CALENDAR ----------------------------- */

function CalendarSection() {
  const days = ['D', 'S', 'C', 'P', 'J', 'S', 'Y'];
  const month = "Iyun 2026";
  const highlightedDate = 20;

  return (
    <section className="py-24 md:py-32 flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl w-full text-center"
      >
        <span className="text-[#C5A021] text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">Tadbir sanasi</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-12">Qalblar Tutashgan Kun</h2>
        
        <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Heart size={120} color="#C5A021" fill="#C5A021" />
          </div>
          
          <div className="mb-8 flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="text-2xl font-serif text-[#1A1A1A]">{month}</h3>
            <div className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A021]/30"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A021]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A021]/30"></span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-y-6 text-center">
            {days.map((d, index) => (
              <div key={`${d}-${index}`} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</div>
            ))}
            
            {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
              <div key={date} className="relative py-2 flex items-center justify-center">
                <span className={`text-lg font-light ${date === highlightedDate ? 'text-white' : 'text-gray-800'}`}>
                  {date}
                </span>
                {date === highlightedDate && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 -z-10 flex items-center justify-center"
                  >
                    <div className="w-10 h-10 bg-[#C5A021] rounded-full flex items-center justify-center">
                        <Heart size={14} fill="red" color="red" className="mt-0.5" />
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-gray-500 font-light italic text-lg md:text-xl">
          "Hayotimizning yangi sahifasini birga kutib olamiz"
        </div>
      </motion.div>
    </section>
  );
}

/* ----------------------------- 4. VENUE SECTION --------------------------- */

function VenueSection() {
  const locations = [
    {
      type: "El Oshi",
      time: "11:00",
      place: "Oqsaroy Koshonasi",
      address: "Toshkent sh., Yunusobod tumani",
      link: "#"
    },
    {
      type: "Kuyov Navkar",
      time: "14:00",
      place: "Kuyov xonadoni",
      address: "Toshkent sh., Shayxontohur tumani",
      link: "#"
    },
    {
      type: "Nikoh Oqshomi",
      time: "18:00",
      place: "Oqsaroy Koshonasi",
      address: "Toshkent sh., Yunusobod tumani",
      link: "#"
    }
  ];

  return (
    <section className="py-24 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-serif text-[#C5A021] mb-6">Manzilimiz</h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg">
              Tantanamizning qayerda va qachon bo'lishi haqida barcha tafsilotlar. Sizni intizorlik bilan kutib qolamiz.
            </p>
            <div className="mt-12 hidden md:block">
               <div className="w-24 h-px bg-[#C5A021]"></div>
            </div>
          </div>
          
          <div className="flex-1 grid md:grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {locations.map((loc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="group p-8 border border-white/10 hover:border-[#C5A021]/50 transition-colors rounded-2xl bg-white/5"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-[#C5A021]/20 rounded-lg text-[#C5A021]">
                    {idx === 0 ? <Building2 size={28} /> : <MapPin size={28} />}
                  </div>
                  <div className="text-right">
                    <span className="text-[#C5A021] font-mono text-2xl">{loc.time}</span>
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500">Boshlanish</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif mb-2">{loc.type}</h3>
                <h4 className="text-lg font-semibold text-[#C5A021] mb-4">{loc.place}</h4>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">{loc.address}</p>
                
                <a 
                  href={loc.link}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#C5A021] text-[#C5A021] hover:bg-[#C5A021] hover:text-white transition-all rounded-full text-xs font-bold tracking-[0.2em] uppercase"
                >
                  <Navigation2 size={14} /> Xaritada ochish
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 5. COUNTDOWN ----------------------------- */

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    kun: 0, soat: 0, daqiqa: 0, soniya: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-06-20T18:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          kun: Math.floor(difference / (1000 * 60 * 60 * 24)),
          soat: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          daqiqa: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          soniya: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#1A1A1A] text-white border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-16 italic">Zavqli lahzalargacha qoldi:</h2>
        
        <div className="flex justify-center items-center gap-4 md:gap-12">
          {Object.entries(timeLeft).map(([label, value], idx) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <motion.span 
                  key={value}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl md:text-7xl font-light text-[#C5A021]"
                >
                  {String(value).padStart(2, '0')}
                </motion.span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-gray-500 mt-4">
                  {label}
                </span>
              </div>
              {idx < 3 && <div className="h-16 md:h-24 w-px bg-[#C5A021]/30 mt-[-20px] md:mt-[-40px]"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 6. GIFT SECTION ---------------------------- */

function GiftSection() {
  const [copied, setCopied] = useState(false);
  const cardNum = "8600 1234 5678 9012";

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNum.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A021]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <span className="text-[#C5A021] text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">To'yona uchun</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-8">Ehtiromingiz uchun tashakkur</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-16 font-light italic">
          Biz uchun eng katta sovg'a — sizning tashrifingiz. Agar ko'nglingizdan o'tsa, mana bu orqali tabriklashingiz mumkin:
        </p>
        
        {/* Luxury Banking Card */}
        <div className="perspective-1000 mx-auto w-full max-w-[450px]">
          <motion.div 
            whileHover={{ rotateY: 5, rotateX: -5 }}
            className="rounded-[24px] bg-gradient-to-br from-[#2a2a2a] to-[#111] p-1 border border-white/20 shadow-2xl overflow-hidden relative"
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            
            {/* World Map Texture Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
              <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>

            {/* Gold accents */}
            <div className="absolute top-0 right-0 p-8">
               <div className="w-16 h-16 bg-gradient-to-br from-[#C5A021] to-[#8a7017] rounded-full flex items-center justify-center shadow-lg border border-white/20">
                  <div className="w-10 h-10 bg-black/20 rounded-full border border-white/10"></div>
               </div>
            </div>

            <div className="p-8 md:p-12 text-left relative z-10">
              <div className="flex justify-between items-center mb-16">
                 <div className="flex flex-col gap-2">
                    <div className="w-14 h-10 bg-gradient-to-br from-[#ffd700] via-[#C5A021] to-[#ffd700] rounded-lg relative shadow-inner overflow-hidden">
                        <div className="absolute inset-x-0 top-1/2 h-px bg-black/20"></div>
                        <div className="absolute inset-y-0 left-1/3 w-px bg-black/20"></div>
                        <div className="absolute inset-y-0 right-1/3 w-px bg-black/20"></div>
                    </div>
                    <div className="text-[8px] text-[#C5A021] font-mono tracking-widest uppercase">Secured Chip</div>
                 </div>
                 <div className="text-right">
                    <div className="text-[#C5A021] font-serif text-2xl italic opacity-90 drop-shadow-md">Elite</div>
                    <div className="text-white/40 text-[8px] uppercase tracking-widest mt-1">International</div>
                 </div>
              </div>
              
              <div className="mb-10 group/num">
                <div className="text-gray-500 text-[9px] uppercase tracking-[0.3em] mb-3 font-semibold">Card Number</div>
                <div className="text-2xl md:text-3xl font-mono text-white tracking-[0.15em] drop-shadow-lg flex gap-4">
                  {cardNum.split(' ').map((chunk, i) => (
                    <span key={i}>{chunk}</span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="flex gap-12">
                  <div>
                    <div className="text-gray-500 text-[9px] uppercase tracking-widest mb-1 font-semibold">Card Holder</div>
                    <div className="text-white text-sm uppercase tracking-[0.2em] font-medium font-mono">XURSHIDBEK SULTANOV</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[9px] uppercase tracking-widest mb-1 font-semibold">Expires</div>
                    <div className="text-white text-sm font-mono tracking-widest">06 / 26</div>
                  </div>
                </div>
                
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C5A021] to-[#8a7017] hover:from-[#d1ab2a] hover:to-[#C5A021] text-black font-bold transition-all rounded-xl shadow-xl transform active:scale-95 text-xs uppercase tracking-widest"
                >
                  {copied ? (
                    <><Check size={16} /> Copied</>
                  ) : (
                    <><Copy size={16} /> Copy Number</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- FOOTER ---------------------------------- */

function Footer() {
  return (
    <footer className="py-20 bg-[#1A1A1A] border-t border-[#C5A021]/20 text-center">
      <div className="text-[#C5A021] text-3xl md:text-4xl font-monogram mb-8 tracking-[0.5em]">X & M</div>
      <p className="text-gray-500 text-xs uppercase tracking-[0.5em] font-light">
        Sizni kutib qolamiz
      </p>
      <div className="mt-12 opacity-30">
        <Heart fill="#C5A021" color="#C5A021" size={24} className="mx-auto" />
      </div>

      {/* Watermark */}
      <div className="mt-16 pb-4">
        <div className="inline-block px-4 py-1 border border-white/5 rounded-full bg-white/5">
           <span className="text-[9px] text-gray-600 font-mono tracking-[0.4em] uppercase">
             Powered by <span className="text-[#C5A021]/50">taklifnoma.ai</span>
           </span>
        </div>
      </div>
    </footer>
  );
}
