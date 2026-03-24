'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { InvitationContent } from '@/lib/types';

interface ElegantInvitationProps {
  content: InvitationContent;
}

type Language = 'uz' | 'ru';

export const ElegantInvitation: React.FC<ElegantInvitationProps> = ({ content }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [language, setLanguage] = useState<Language>('uz');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { groomName, brideName, date, time, locationName, imageUrl, locationUrl, musicUrl } = content;

  // Premium Palette
  const ivory = "#FAF9F6";
  const gold = "#C5A021";
  const charcoal = "#1A1A1A";

  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date(`${date}T${time}:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time]);

  // Translations
  const t = {
    uz: {
      invitation: 'Taklifnoma',
      inviteText: 'Sizlarni qalbimiz to\'ridagi eng quvonchli kunimiz — nikoh oqshomimizga lutfan taklif etamiz. Bu kun biz uchun yangi hayot ostonasi bo\'lib, sizning ishtirokingiz davramizni yanada fayzli qiladi.',
      date: '15-iyun, 2026-yil',
      timeLabel: 'Vaqti: 18:00',
      venue: 'HAYAT RECEPTION HALL',
      location: 'Manzil: Toshkent sh., Mirzo Ulug\'bek tumani',
      yandexMaps: 'Yandex Maps',
      googleMaps: 'Google Maps',
      giftTitle: 'To\'yona uchun',
      giftText: 'Agarda bizni masofadan tabriklamoqchi bo\'lsangiz, quyidagi karta raqamidan foydalanishingiz mumkin:',
      copyCard: 'Karta raqamini ko\'chirish',
      copied: 'Nusxalandi!',
      countdownTitle: 'Tantana boshlanishiga qoldi:',
      days: 'Kun',
      hours: 'Soat',
      minutes: 'Daqiqa',
      seconds: 'Soniya',
      waiting: 'Sizni intiqlik bilan kutamiz!',
      ceremony: 'Nikoh marosimi',
      wedding: 'To\'y oqshomi',
      backToBase: 'Bosh sahifa'
    },
    ru: {
      invitation: 'Приглашение',
      inviteText: 'Мы с большой радостью приглашаем вас разделить с нами самый счастливый день в нашей жизни — день нашей свадьбы. Ваше присутствие сделает этот праздник незабываемым.',
      date: '15 июня, 2026 год',
      timeLabel: 'Время: 18:00',
      venue: 'HAYAT RECEPTION HALL',
      location: 'Адрес: г. Ташкент, Мирзо-Улугбекский район',
      yandexMaps: 'Yandex Карты',
      googleMaps: 'Google Карты',
      giftTitle: 'Для подарков',
      giftText: 'Если вы хотите поздравить нас дистанционно, вы можете воспользоваться номером карты ниже:',
      copyCard: 'Копировать номер карты',
      copied: 'Скопировано!',
      countdownTitle: 'До торжества осталось:',
      days: 'Дней',
      hours: 'Часов',
      minutes: 'Минут',
      seconds: 'Секунд',
      waiting: 'Ждем вас с нетерпением!',
      ceremony: 'Никох',
      wedding: 'Свадебный вечер',
      backToBase: 'Главная'
    }
  };

  const currentT = t[language];

  const handleUnlock = () => {
    setIsUnlocked(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAF9F6] overflow-x-hidden selection:bg-[#C5A021]/30">
      {/* Background Music */}
      <audio ref={audioRef} src={musicUrl || "/assets/music.mp3"} loop />

      {/* Language Switcher */}
      <div className="fixed top-8 right-8 z-[60] flex gap-3">
        {(['uz', 'ru'] as Language[]).map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`w-10 h-10 rounded-full text-[10px] font-bold transition-all border flex items-center justify-center ${
              language === lang 
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xl scale-110' 
                : 'bg-white/40 text-black/40 border-black/10 backdrop-blur-md hover:bg-white'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Music Toggle */}
      <div className="fixed top-8 left-8 z-[60]">
        <button 
          onClick={toggleMusic}
          className="w-12 h-12 bg-white/40 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all text-xl"
        >
          {isPlaying ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Lock Screen Overlay (Figma Version) */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0C0C0C]"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative text-center px-12"
            >
              <button 
                onClick={handleUnlock}
                className="relative w-40 h-40 mb-16 mx-auto group perspective-1000"
              >
                <div className="absolute inset-0 bg-[#C5A021]/20 rounded-full blur-[60px] animate-pulse" />
                <div className="absolute inset-0 border border-[#C5A021]/30 rounded-full group-hover:scale-110 transition-transform duration-1000" />
                <div className="relative w-full h-full bg-[#1A1A1A] rounded-full flex flex-col items-center justify-center border border-[#C5A021]/50 shadow-[0_0_50px_rgba(197,160,33,0.2)] overflow-hidden">
                   <div className="text-white text-5xl font-serif tracking-tighter mb-2 italic">
                     {groomName[0]}
                     <span className="text-[#C5A021] not-italic px-1">&</span>
                     {brideName[0]}
                   </div>
                   <div className="w-12 h-[1px] bg-[#C5A021]/30" />
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                </div>
              </button>
              
              <div className="space-y-4">
                <h2 className="text-[#C5A021] text-[10px] tracking-[0.8em] font-bold uppercase transition-all group-hover:tracking-[1em]">Taklifnoma</h2>
                <button 
                  onClick={handleUnlock}
                  className="text-white/30 text-[9px] tracking-[0.5em] uppercase hover:text-white transition-colors duration-500 font-montserrat"
                >
                  Ochish uchun bosing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-md mx-auto relative bg-[#FAF9F6] min-h-screen shadow-[0_0_120px_rgba(0,0,0,0.15)] overflow-hidden">
        {/* Hero Section (Figma version) */}
        <section className="relative h-screen w-full flex flex-col justify-end pb-32">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={isUnlocked ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image 
              src={imageUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000"} 
              alt="Couple" 
              fill 
              className="object-cover"
              priority
            />
            {/* Elegant Gradient Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <div className="relative z-10 px-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: "circOut" }}
              className="space-y-4"
            >
              <h1 className="text-6xl text-white font-serif leading-tight">
                {groomName} <br />
                <span className="text-[#C5A021] text-4xl italic lowercase opacity-70">va</span> <br />
                {brideName}
              </h1>
              <div className="w-12 h-px bg-[#C5A021] mx-auto opacity-50" />
              <p className="text-white/60 text-[10px] tracking-[0.8em] uppercase font-bold font-montserrat">Sizni taklif etamiz</p>
            </motion.div>

            {/* Down Arrow Animation */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="pt-12 opacity-30"
            >
               <div className="w-px h-16 bg-gradient-to-b from-white/0 to-white mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* Invitation Text (New font: Cormorant) */}
        <section className="py-40 px-12 text-center bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-3xl text-[#C5A021]/30">🕊️</div>
            <p className="text-xl leading-[1.8] text-gray-800 font-cormorant italic font-medium px-4">
              "{currentT.inviteText}"
            </p>
            <div className="flex justify-center gap-2">
               <div className="w-1 h-1 rounded-full bg-[#C5A021]" />
               <div className="w-1 h-1 rounded-full bg-[#C5A021]/30" />
               <div className="w-1 h-1 rounded-full bg-[#C5A021]/10" />
            </div>
          </motion.div>
        </section>

        {/* Calendar Section (June 2026) */}
        <section className="py-32 px-10 bg-[#FAF9F6] border-y border-black/5">
           <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16 space-y-4"
           >
              <div className="text-[10px] tracking-[0.6em] font-bold text-[#C5A021] uppercase mb-2">Tantanali kun</div>
              <h3 className="text-4xl font-serif text-gray-900 tracking-tighter">{currentT.date}</h3>
              <p className="text-xs text-gray-400 font-montserrat tracking-widest uppercase">{currentT.timeLabel}</p>
           </motion.div>
           
           <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="max-w-xs mx-auto bg-white p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-100"
           >
              <div className="grid grid-cols-7 gap-y-6 text-center">
                 {(language === 'uz' ? ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'] : ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']).map((d, i) => (
                   <div key={`${d}-${i}`} className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{d}</div>
                 ))}
                 {/* June 2026 starts on Monday */}
                 {[...Array(30)].map((_, i) => (
                   <div 
                    key={i} 
                    className={`relative py-4 text-sm font-serif ${i + 1 === 15 ? 'text-white z-10' : 'text-gray-400'}`}
                   >
                     {i + 1}
                     {i + 1 === 15 && (
                       <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center -z-10"
                       >
                         <div className="w-10 h-10 bg-[#1A1A1A] rounded-full shadow-xl" />
                         <div className="absolute top-0 right-0 text-[10px] text-red-500">❤️</div>
                       </motion.div>
                     )}
                   </div>
                 ))}
              </div>
           </motion.div>
        </section>

        {/* Venue Section (Double Venue) */}
        <section className="py-40 px-8 text-center bg-white space-y-24">
           <div className="space-y-12">
              <div className="flex flex-col items-center gap-6">
                <p className="text-[#C5A021] text-[10px] tracking-[0.5em] uppercase font-bold">Manzilimiz</p>
                <div className="w-px h-12 bg-[#C5A021]/20" />
              </div>
              <h3 className="text-3xl font-serif text-gray-900 leading-tight">{currentT.venue}</h3>
              <p className="text-xs text-gray-400 font-montserrat uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">{currentT.location}</p>
           </div>

           <div className="grid grid-cols-1 gap-6 max-w-xs mx-auto">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={locationUrl || "#"} 
                className="py-6 rounded-3xl border border-gray-100 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] bg-white text-gray-700 shadow-xl hover:shadow-[#C5A021]/10 transition-all group"
              >
                <span className="text-xl grayscale group-hover:grayscale-0 transition-opacity">🗺️</span> {currentT.googleMaps}
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={locationUrl || "#"} 
                className="py-6 rounded-3xl border border-gray-100 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] bg-[#1A1A1A] text-white shadow-xl transition-all"
              >
                <span className="text-xl">📍</span> {currentT.yandexMaps}
              </motion.a>
           </div>
        </section>

        {/* Countdown (Luxury Theme) */}
        <section className="py-40 px-8 text-center bg-[#0C0C0C] relative">
           <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A021]/30 to-transparent" />
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-20"
           >
             <h3 className="text-[10px] uppercase tracking-[0.8em] font-bold text-[#C5A021]">{currentT.countdownTitle}</h3>
             <div className="flex justify-between items-center max-w-xs mx-auto px-4">
                <CountdownBox value={timeLeft.days.toString().padStart(2, '0')} label={currentT.days} />
                <div className="h-10 w-[1px] bg-[#C5A021]/20" />
                <CountdownBox value={timeLeft.hours.toString().padStart(2, '0')} label={currentT.hours} />
                <div className="h-10 w-[1px] bg-[#C5A021]/20" />
                <CountdownBox value={timeLeft.minutes.toString().padStart(2, '0')} label={currentT.minutes} />
                <div className="h-10 w-[1px] bg-[#C5A021]/20" />
                <CountdownBox value={timeLeft.seconds.toString().padStart(2, '0')} label={currentT.seconds} />
             </div>
           </motion.div>
        </section>

        {/* Gift Section (Glassmorphism Bank Card) */}
        <section className="py-40 px-10 text-center space-y-16 bg-white">
           <div className="space-y-6">
              <p className="text-[#C5A021] text-[10px] tracking-[0.4em] uppercase font-bold">To'yona uchun</p>
              <h3 className="text-4xl font-serif text-gray-900 tracking-tight">{currentT.giftTitle}</h3>
              <p className="text-sm text-gray-400 font-cormorant italic max-w-[280px] mx-auto leading-relaxed">
                "{currentT.giftText}"
              </p>
           </div>

           <motion.div 
            whileHover={{ y: -10, rotate: -1 }}
            className="group relative p-12 bg-gradient-to-br from-[#1A1A1A] to-[#000000] rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden text-left"
           >
              <div className="absolute top-0 right-0 p-12 text-5xl opacity-5 font-serif italic text-white">MASTERCARD</div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#C5A021]/15 rounded-full blur-[80px]" />

              <div className="relative z-10 space-y-12">
                <div className="flex justify-between items-center">
                   <div className="w-14 h-11 bg-gradient-to-tr from-[#D4AF37] to-[#F9EAB8] rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" />
                   <div className="text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase">Humo / Uzcard</div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                      <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold font-montserrat">Karta egasi</p>
                      <p className="text-2xl font-serif text-white tracking-[0.1em] uppercase">{groomName}</p>
                  </div>
                  <div className="space-y-2">
                      <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold font-montserrat">Karta raqami</p>
                      <p className="text-[26px] font-mono text-white tracking-[0.12em] font-light">9860 •••• •••• 1234</p>
                  </div>
                </div>

                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigator.clipboard.writeText("9860123456781234");
                    alert(currentT.copied);
                  }}
                  className="w-full py-6 bg-white text-black rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl hover:bg-[#C5A021] hover:text-white transition-all duration-500"
                >
                  {currentT.copyCard}
                </motion.button>
              </div>
           </motion.div>
        </section>

        {/* Footer (Final message) */}
        <footer className="pt-40 pb-24 px-10 text-center bg-[#FAF9F6]">
           <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-32"
           >
              <div className="space-y-16">
                <div className="text-5xl text-[#C5A021] opacity-20 italic font-serif">❦</div>
                <h2 className="text-5xl font-serif italic text-gray-900 leading-tight px-4">{currentT.waiting}</h2>
              </div>
              
              <div className="space-y-12">
                <div className="h-px w-24 bg-black/5 mx-auto" />
                <div className="space-y-6">
                  <p className="text-[9px] tracking-[1em] uppercase text-black/30 font-bold font-montserrat">Onlinetaklifnoma.uz</p>
                  <p className="text-[8px] text-gray-400 uppercase tracking-widest font-cormorant">Sizning go'zal davringiz - bizning ishimiz</p>
                </div>
              </div>
           </motion.div>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

const CountdownBox = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="text-5xl font-serif text-white tracking-tighter">{value}</div>
    <div className="text-[7px] uppercase tracking-[0.5em] text-[#C5A021] font-bold font-montserrat">{label}</div>
  </div>
);
