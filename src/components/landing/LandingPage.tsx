'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Instagram, Send, Sun, Moon, Star, ExternalLink, HelpCircle, CheckCircle2, ChevronDown, Sparkles, ArrowRight, Clock, Heart } from 'lucide-react';
import { useTheme } from 'next-themes';

const LandingPage = () => {
  const { theme, setTheme } = useTheme();
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
               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
           {/* Background Elements */}
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
                        Mehmonlarni hayratda qoldiradigan mukammal virtual taklifnomalar. Bir zumda yarating va ulashing.
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

                 <div className="flex items-center gap-10 pt-10 border-t border-gray-100 dark:border-white/5">
                    <div className="space-y-1">
                        <div className="text-3xl font-black text-gray-900 dark:text-white leading-none">50K+</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Baxtli Juftliklar</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-3xl font-black text-gray-900 dark:text-white leading-none">24H</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tezkor Xizmat</div>
                    </div>
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
                    src="https://images.pexels.com/photos/30154030/pexels-photo-30154030/free-photo-of-beautiful-pastel-wedding-invitations-with-rings.jpeg" 
                    className="w-full h-auto rounded-[4rem] border-[16px] border-white dark:border-white/5 shadow-2xl relative z-10"
                    alt="Main Preview"
                  />
                  <div className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-white/5 z-20 space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <div className="font-black text-sm dark:text-white uppercase tracking-tight">Xavfsiz To'lov</div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Click & Payme</div>
                        </div>
                     </div>
                  </div>
              </motion.div>
           </div>
        </section>

        {/* Features Grid */}
        <section id="xizmatlar" className="py-32 bg-white dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center space-y-4 mb-20">
                    <h2 className="text-4xl md:text-5xl font-playfair font-black dark:text-white tracking-tighter uppercase">Nega aynan biz?</h2>
                    <div className="w-20 h-1.5 bg-[#E11D48] mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <Clock size={32} />, title: 'Tezkorlik', desc: 'Atigi 5 minut ichida taklifnomangiz tayyor bo\'ladi.' },
                        { icon: <ExternalLink size={32} />, title: 'Havola', desc: 'Tayyor taklifnomani bitta link orqali yuboring.' },
                        { icon: <HelpCircle size={32} />, title: 'Qulaylik', desc: 'Hech qanday qog\'oz tarqatishga hojat yo\'q.' },
                        { icon: <Phone size={32} />, title: 'Support', desc: 'Adminlarimiz 24/7 sizga yordam berishga tayyor.' },
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
            </div>
        </section>

        {/* CTA Footer Section */}
        <section className="py-24 bg-[#FFF9FA] dark:bg-black overflow-hidden relative">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                <h2 className="text-4xl md:text-7xl font-playfair font-black dark:text-white leading-tight animate-pulse">
                    Baxtli kuningizni <span className="text-[#E11D48]">bugunoq</span> rejalashtiring!
                </h2>
                <button 
                  onClick={handleStartDesign}
                  className="px-16 py-8 bg-[#E11D48] text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-[0_30px_60px_rgba(225,29,72,0.4)] hover:brightness-110 active:scale-95 transition-all"
                >
                  Hozir Boshlash
                </button>
            </div>
        </section>
      </main>

      {/* Basic Footer */}
      <footer id="aloqa" className="bg-white dark:bg-black py-20 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
           <div>
              <div className="font-playfair text-2xl font-black text-[#E11D48] mb-2 uppercase">Taklifnoma.Asia</div>
              <p className="text-gray-400 text-xs font-black uppercase tracking-widest italic">&copy; 2026 Barcha huquqlar himoyalangan</p>
           </div>
           <div className="flex gap-4">
              <a href="https://t.me/taklifnoma_asia" target="_blank" className="w-14 h-14 bg-[#229ED9]/10 text-[#229ED9] rounded-2xl flex items-center justify-center hover:bg-[#229ED9] hover:text-white transition-all">
                <Send size={24} />
              </a>
              <a href="https://instagram.com/taklifnoma.asia" target="_blank" className="w-14 h-14 bg-[#E11D48]/10 text-[#E11D48] rounded-2xl flex items-center justify-center hover:bg-[#E11D48] hover:text-white transition-all">
                <Instagram size={24} />
              </a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
