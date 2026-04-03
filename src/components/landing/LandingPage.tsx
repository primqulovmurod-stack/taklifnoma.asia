'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Instagram, Send, Sun, Moon, Star, ExternalLink, HelpCircle, CheckCircle2, ChevronDown, Sparkles, ArrowRight, Clock, Heart, Music, MapPin, CreditCard } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => setMounted(true), []);

  const handleStartDesign = () => {
    router.push('/dashboard/new');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FFF9FA] dark:bg-[#0A0A0A] text-[#2D2424] dark:text-gray-100 font-sans selection:bg-[#E11D48]/20 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-[#FFE4E6] dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-[#E11D48] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#E11D48]/20 group-hover:rotate-12 transition-transform">
                <Heart size={20} fill="currentColor" />
            </div>
            <span className="font-playfair text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">Taklifnoma<span className="text-[#E11D48]">.Asia</span></span>
          </button>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#namunalar" className="hover:text-[#E11D48] transition-colors">Namunalar</a>
            <a href="#xizmatlar" className="hover:text-[#E11D48] transition-colors">Xizmatlar</a>
            <Link href="/dashboard" className="hover:text-[#E11D48] transition-colors">Kabinet</Link>
            <a href="#aloqa" className="hover:text-[#E11D48] transition-colors">Aloqa</a>
          </div>

          <div className="flex items-center gap-4">
            <button
               onClick={toggleTheme}
               className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-[#E11D48] transition-all"
            >
               {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={handleStartDesign}
              className="hidden md:flex px-8 py-4 bg-[#E11D48] text-white rounded-2xl text-[10px] font-black shadow-2xl shadow-[#E11D48]/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
            >
              Taklifnoma qilish
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Modern Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_50%,#FFE4E6_0%,transparent_50%)] opacity-40 dark:opacity-10" />
           
           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                 <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E11D48]/5 rounded-full border border-[#E11D48]/10 text-[#E11D48] text-[9px] font-black uppercase tracking-[0.2em]">
                        <Sparkles size={12} fill="currentColor" /> 2026-yilning eng go'zal dizaynlari
                    </div>
                    <h1 className="text-6xl md:text-8xl font-playfair font-black text-gray-900 dark:text-white leading-[1] tracking-tighter">
                        Eng <span className="text-[#E11D48] italic">chiroyli</span> to'yingiz uchun
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-xl">
                        An'anaviy qog'oz taklifnomalardan voz keching. Biz bilan zamonaviy va premium darajadagi virtual taklifnomalarni bir zumda yarating.
                    </p>
                 </div>

                 <div className="flex flex-col sm:flex-row items-center gap-6">
                    <button 
                       onClick={handleStartDesign}
                       className="w-full sm:w-auto px-12 py-6 bg-[#E11D48] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-[#E11D48]/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                       Taklifnoma qilish <ArrowRight size={20} />
                    </button>
                    <Link 
                       href="#namunalar"
                       className="w-full sm:w-auto px-12 py-6 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-100 dark:border-white/10 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                    >
                       Namunalar <Star size={20} />
                    </Link>
                 </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                  <div className="absolute inset-0 bg-[#E11D48] rounded-[5rem] blur-[120px] opacity-10 animate-pulse" />
                  <img 
                    src="https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg" 
                    className="w-full h-auto rounded-[4rem] border-[16px] border-white dark:border-white/5 shadow-2xl relative z-10"
                    alt="Wedding Rings"
                  />
                  <div className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-white/5 z-20 space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#E11D48] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#E11D48]/20">
                            <Clock size={24} />
                        </div>
                        <div>
                            <div className="font-black text-sm dark:text-white uppercase tracking-tight">3 daqiqa ichida</div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">O'z taklifnomangizni yarating</div>
                        </div>
                     </div>
                  </div>
              </motion.div>
           </div>
        </section>

        {/* Services Section - RESTORED INFO */}
        <section id="xizmatlar" className="py-32 bg-white dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-20">
                <h2 className="text-4xl md:text-5xl font-playfair font-black dark:text-white tracking-tighter uppercase">Nima uchun online taklifnoma?</h2>
                <div className="w-20 h-1.5 bg-[#E11D48] mx-auto rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: <Music size={32} />, title: 'Musiqali hamrohlik', desc: 'Siz tanlagan maxsus musiqa fonda yangrab turadi.' },
                    { icon: <MapPin size={32} />, title: 'Locatsiya (Xarita)', desc: 'Mehmonlar Google yoki Yandex Maps orqali restoran manzilini topishadi.' },
                    { icon: <Clock size={32} />, title: 'Kalendarga saqlash', desc: 'To\'y sanasini mehmonlar o\'z telefonlariga eslatma qilib qo\'yishadi.' },
                    { icon: <CreditCard size={32} />, title: 'To\'yona (Karta)', desc: 'Istasangiz to\'yona uchun karta raqamingizni ham joylab beramiz.' },
                ].map((item, i) => (
                    <div key={i} className="group p-10 rounded-[3rem] bg-[#FFF9FA] dark:bg-white/5 border border-gray-50 dark:border-transparent hover:border-[#E11D48]/20 hover:scale-[1.02] transition-all">
                        <div className="w-20 h-20 bg-[#E11D48]/10 text-[#E11D48] rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-[#E11D48] group-hover:text-white transition-colors">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-black mb-4 dark:text-white uppercase tracking-tighter">{item.title}</h3>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Samples Section - RESTORED INFO */}
        <section id="namunalar" className="py-32 bg-[#FFF9FA] dark:bg-[#121212]">
            <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-20">
                <h2 className="text-4xl md:text-5xl font-playfair font-black dark:text-white tracking-tighter uppercase">Namunalarimiz</h2>
                <div className="w-20 h-1.5 bg-[#E11D48] mx-auto rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                   {[
                    { 
                        title: 'Rolex Luxury Edition', 
                        style: 'Zamonaviy, Rolex', 
                        link: 'https://xurshid-mohinur-rolex.vercel.app/'
                    },
                    { 
                        title: 'Pink Romance Edition', 
                        style: 'Nozik, Pushti', 
                        link: 'https://xurshid-mohinur-pink.vercel.app/'
                    },
                    { 
                        title: 'Gold & White Classic', 
                        style: 'Elegant, Oq-Oltin', 
                        link: 'https://kenjabek-gold-white.vercel.app/'
                    },
                   ].map((sample, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -10 }}
                        className="group relative h-[720px] rounded-[3.5rem] overflow-hidden border-8 border-gray-950 dark:border-white/10 shadow-2xl bg-black transition-all ring-1 ring-white/10"
                    >
                        {/* Interactive Preview Container - PERFECT CENTERED */}
                        <div className="absolute inset-0 w-full h-full overflow-y-auto no-scrollbar bg-white">
                            <iframe 
                                src={sample.link} 
                                className="w-[400px] h-[800px] border-none origin-top-left"
                                style={{ 
                                    transform: 'scale(0.9)', 
                                    marginLeft: '-12.5px', // Fine-tune centering
                                    marginTop: '-40px'     // Shift up to center the core content
                                }}
                                title={sample.title}
                                loading="lazy"
                            ></iframe>
                            
                            {/* Overlay that allows scrolling but captures initial focus */}
                            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/60 transition-all"></div>
                        </div>

                        {/* Card Info Overlay - Balanced for centering */}
                        <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center z-20 pointer-events-none group-hover:translate-y-1 transition-transform duration-500">
                            <div className="w-full transform group-hover:scale-105 transition-all">
                                <h3 className="font-playfair text-xl font-black mb-1 text-white uppercase tracking-tight drop-shadow-lg">{sample.title}</h3>
                                <p className="text-[#E11D48] text-[9px] font-black mb-6 uppercase tracking-[0.3em] drop-shadow-md">{sample.style}</p>
                                <a 
                                    href={sample.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E11D48] text-white rounded-full text-[9px] font-black shadow-2xl hover:bg-white hover:text-[#E11D48] transition-all uppercase tracking-widest pointer-events-auto ring-4 ring-[#E11D48]/20"
                                >
                                    TO'LIQ KO'RISH <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                        
                        {/* Device Top Bar Mock */}
                        <div className="absolute top-0 inset-x-0 h-8 flex items-center justify-center z-30 pointer-events-none">
                            <div className="w-24 h-5 bg-black rounded-b-2xl shadow-inner border-x border-b border-white/5"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Process Section - RESTORED INFO */}
        <section className="py-32 bg-white dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-20">
                <h2 className="text-4xl md:text-5xl font-playfair font-black dark:text-white tracking-tighter uppercase">Buyurtma berish</h2>
                <div className="w-20 h-1.5 bg-[#E11D48] mx-auto rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative text-center">
                {[
                    { step: '01', title: 'Loyihani yarating', desc: 'Sizga mos shablonni tanlab, ma\'lumotlarni kiriting.' },
                    { step: '02', title: 'To\'lovni amalga oshiring', desc: 'To\'lovdan so\'ng taklifnomangiz admin tomonidan tasdiqlanadi.' },
                    { step: '03', title: 'Hovolani ulashing', desc: 'Tayyor taklifnoma havolasini mehmonlarga yuboring.' },
                ].map((item, i) => (
                    <div key={i} className="space-y-6">
                        <div className="w-24 h-24 rounded-[2rem] bg-[#E11D48] text-white flex items-center justify-center text-3xl font-black mx-auto shadow-xl shadow-[#E11D48]/20">
                            {item.step}
                        </div>
                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">{item.title}</h3>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Testimonials - RESTORED INFO */}
        <section className="py-32 bg-[#FFF9FA] dark:bg-black">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-20">
                    <h2 className="text-4xl md:text-5xl font-playfair font-black dark:text-white tracking-tighter uppercase">Mijozlarimizdan</h2>
                    <div className="w-20 h-1.5 bg-[#E11D48] mx-auto rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: 'Azizbek & Madina', text: 'Taklifnoma juda ajoyib chiqdi! Hamma mehmonlarimizga yoqdi, ayniqsa musiqasi va xaritasi juda qulay bo\'ldi.' },
                        { name: 'Sardorbek', text: 'Tez va sifatli xizmat. Bir kunda tayyorlab berishdi. Tilla rangli dizayni haqiqatdan ham premium ko\'rinadi.' },
                        { name: 'Dilnoza', text: 'Raqamli taklifnoma haqiqatdan ham qulay ekan. Qog\'oz taklifnoma tarqatishdan ko\'ra 10 baravar oson va arzon!' },
                    ].map((review, i) => (
                        <div key={i} className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-transparent animate-fade-in text-center space-y-6">
                            <div className="flex gap-1 items-center justify-center text-[#E11D48]">
                                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-400 italic text-lg leading-relaxed">"{review.text}"</p>
                            <h4 className="font-black text-gray-900 dark:text-white text-xs uppercase tracking-widest">— {review.name}</h4>
                        </div>
                    ))}
                </div>
        </section>

        {/* FAQ - RESTORED INFO */}
        <section className="py-32 bg-white dark:bg-[#050505]">
            <div className="max-w-3xl mx-auto px-6 space-y-6">
                {[
                    { q: "Buyurtma qancha vaqtda tayyor bo'ladi?", a: "Odatda dushbordda tahrirlanganingizdan so'ng, to'lov tasdiqlanishi bilan 5-10 daqiqa ichida ishga tushadi." },
                    { q: "To'lov qanday qilinadi?", a: "To'lovlar online tarzda admin bilan bog'lanish (Telegram) orqali amalga oshiriladi." },
                    { q: "Musiqani o'zgartirsa bo'ladimi?", a: "Albatta, tahrirlash oynasida istalgan musiqani havolasini qo'yishingiz mumkin." },
                ].map((faq, i) => (
                    <div key={i} className="p-8 rounded-[2rem] bg-[#FFF9FA] dark:bg-white/5 border border-gray-50 dark:border-transparent space-y-4">
                        <h4 className="font-black dark:text-white uppercase tracking-tighter flex justify-between items-center text-sm md:text-base">
                            {faq.q} <ChevronDown size={18} className="text-[#E11D48]" />
                        </h4>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-[#E11D48] relative overflow-hidden text-center text-white px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                <h2 className="text-4xl md:text-7xl font-playfair font-black leading-tight tracking-tighter">
                   Baxtli kuningizni <span className="italic opacity-80">bugunoq</span> rejalashtiring!
                </h2>
                <button 
                  onClick={handleStartDesign}
                  className="px-16 py-8 bg-white text-[#E11D48] rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  Hozir Boshlash
                </button>
            </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer id="aloqa" className="bg-[#050505] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mb-20 text-center lg:text-left">
            <div className="space-y-8">
              <div className="font-playfair text-3xl font-black text-[#E11D48] tracking-tighter uppercase">Taklifnoma.Asia</div>
              <p className="text-gray-400 font-medium leading-relaxed">
                Zamonaviy to'ylar uchun eng chiroyli virtual taklifnomalar xizmati. Biz baxtli kunlaringizni go'zal qilish uchun ishlaymiz.
              </p>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-[#E11D48] font-black uppercase tracking-[0.2em] text-[11px]">Bog'lanish</h4>
              <div className="space-y-4">
                <a href="tel:+998915930833" className="flex items-center justify-center lg:justify-start gap-4 hover:text-[#E11D48] transition-colors">
                  <Phone size={20} className="text-[#E11D48]" />
                  <span className="text-lg font-black">+998 (91) 593-08-33</span>
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[#E11D48] font-black uppercase tracking-[0.2em] text-[11px]">Ijtimoiy tarmoqlar</h4>
              <div className="flex justify-center lg:justify-start gap-6">
                <a href="https://instagram.com/taklifnoma.asia" target="_blank" className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E11D48] transition-all">
                  <Instagram size={28} />
                </a>
                <a href="https://t.me/taklifnoma_asia" target="_blank" className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E11D48] transition-all">
                  <Send size={28} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest italic">&copy; 2026 Taklifnoma.Asia — Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
