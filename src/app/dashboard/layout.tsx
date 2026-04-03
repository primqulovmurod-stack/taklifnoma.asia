'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Menu, 
  X,
  CreditCard,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    setLoading(false);
  }, []);

  const menuItems = [
    { name: 'Mening taklifnomalarim', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Yangi yaratish', icon: PlusCircle, href: '/dashboard/new' },
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#FFF9FA]'}`}>
        <div className="w-12 h-12 border-4 border-[#E11D48] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Skip layout for login page
  if (pathname === '/dashboard/login') {
    return <>{children}</>;
  }

  return (
    <div className={`min-h-screen flex transition-all duration-500 ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#FFF9FA]'}`}>
      {/* Sidebar for desktop */}
      <aside className={`hidden lg:flex flex-col w-72 border-r sticky top-0 h-screen transition-all duration-500 ${
          isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-[#FFE4E6]/50'
      }`}>
        <div className={`p-8 border-b h-24 flex items-center transition-all ${isDarkMode ? 'border-white/5' : 'border-[#FFE4E6]/30'}`}>
            <Link href="/" className="flex items-center gap-2">
                <span className="font-playfair text-xl font-black tracking-tighter text-[#E11D48]">TAKLIFNOMA</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-[8px] uppercase tracking-widest font-black">Asia</span>
            </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                pathname === item.href 
                ? 'bg-[#E11D48] text-white shadow-xl shadow-[#E11D48]/20 translate-x-1' 
                : isDarkMode 
                    ? 'text-gray-500 hover:bg-white/5 hover:text-white'
                    : 'text-gray-400 hover:bg-[#FFF1F2] hover:text-[#E11D48]'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-12 mb-8 text-center space-y-4">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-[#E11D48] mx-auto shadow-sm transition-all ${
                isDarkMode ? 'bg-white/5' : 'bg-[#FFF1F2]'
            }`}>
                <Heart size={32} fill="currentColor" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-relaxed px-4">
                Baxtli kunlaringiz uchun <br /> Taklifnoma.Asia
            </p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 w-full z-40 backdrop-blur-md border-b h-20 flex items-center justify-between px-6 transition-all ${
          isDarkMode ? 'bg-[#141416]/80 border-white/5' : 'bg-white/80 border-[#FFE4E6]/30'
      }`}>
        <Link href="/" className="flex items-center gap-2">
            <span className="font-playfair text-xl font-black tracking-tighter text-[#E11D48]">TAKLIFNOMA</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-[8px] uppercase tracking-widest font-black">Asia</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(true)} className={`p-2 transition-all ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed left-0 top-0 bottom-0 w-72 z-[60] flex flex-col transition-all duration-500 lg:hidden ${
                  isDarkMode ? 'bg-[#0F0F10]' : 'bg-white'
              }`}
            >
              <div className={`p-8 h-24 flex items-center justify-between border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-playfair text-xl font-black tracking-tighter text-[#E11D48]">TAKLIFNOMA</span>
                </Link>
                <button onClick={() => setIsSidebarOpen(false)} className={`p-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 p-6 space-y-2">
                {menuItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                      pathname === item.href 
                      ? 'bg-[#E11D48] text-white shadow-xl shadow-[#E11D48]/20' 
                      : isDarkMode 
                        ? 'text-gray-500 hover:bg-white/5'
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full lg:pt-0 pt-20 overflow-y-auto lg:h-screen">
        <div className={`max-w-7xl mx-auto min-h-full ${isDarkMode ? 'text-white' : 'text-[#2D2424]'}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
