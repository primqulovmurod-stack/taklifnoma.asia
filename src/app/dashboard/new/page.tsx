'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LayoutDashboard, Sparkles, Star, CheckCircle, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { templates } from '@/components/dashboard/TemplatePreview';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/context/ThemeContext';

export default function NewInvitationPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleSelectTemplate = async (templateId: string) => {
    const newId = Math.random().toString(36).substring(2, 9).toUpperCase();
    const newInvitation = {
        id: newId,
        slug: `taklifnoma-${newId}`,
        is_paid: false,
        content: {
            groomName: 'Kuyov',
            brideName: 'Kelin',
            date: '2026-05-15',
            time: '18:00',
            locationName: 'Restoran nomi',
            locationAddress: 'Manzil',
            locationUrl: '',
            imageUrl: 'https://images.pexels.com/photos/30206324/pexels-photo-30206324.jpeg',
            musicUrl: '/assets/die_with_a_smile.mp3',
            theme: templateId,
            cardNumber: '8600 **** **** ****',
            cardName: 'ISM FAMILIYA'
        }
    };

    const localData = localStorage.getItem('taklifnoma_invitations');
    let invites = [];
    if (localData) {
        invites = JSON.parse(localData);
    }
    invites.push(newInvitation);
    localStorage.setItem('taklifnoma_invitations', JSON.stringify(invites));

    // 2. Sync with Supabase (CRITICAL FOR CROSS-DEVICE CONSISTENCY)
    try {
        console.log('Syncing new invitation to Supabase:', newId);
        const { error } = await supabase.from('invitations').upsert({
            id: newId,
            slug: newInvitation.slug,
            is_paid: false,
            content: newInvitation.content
        });

        if (error) {
            console.error('Supabase UPSERT error:', error);
            alert("MA'LUMOTLAR FAQAT BRAUZERDA SAQLANDI: Supabase xatosi: " + error.message);
        } else {
            console.log('Supabase sync successful');
        }
    } catch (e: any) { 
        console.error('DATABASE SYNC FATAL:', e);
        alert("Fatal xatolik: Cloud bazasiga ulanib bo'lmadi.");
    }
    router.push(`/dashboard/edit/${newId}`);
  };

  return (
    <div className={`p-6 md:p-12 space-y-12 transition-all duration-500 min-h-screen ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#FFF9FA]'}`}>
      <header className="space-y-4">
        <Link 
            href="/dashboard"
            className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 hover:text-[#E11D48] transition-colors group"
        >
            <LayoutDashboard size={14} className="group-hover:-translate-x-1 transition-transform" />
            Kabinetingizga qaytish
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
                <h1 className={`font-playfair text-4xl font-black transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dizayn Tanlash</h1>
                <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                    <Sparkles size={14} className="text-[#E11D48]" fill="currentColor" />
                    O'zingizga yoqqan premium dizaynni tanlab, tahrirlashni boshlang
                </p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 pb-20">
          {templates.map((template, i) => (
              <motion.div 
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className={`rounded-[2.5rem] border shadow-[0_30px_60px_-15px_rgba(225,29,72,0.05)] overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 ${
                    isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-[#FFE4E6]'
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                  <div className="aspect-[3/4] bg-[#FDFCF9] relative overflow-hidden">
                      <Image 
                        src={template.image} 
                        alt={template.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        priority={i < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                      
                      <div className="absolute top-6 right-6">
                          <div className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md shadow-xl border transition-all ${
                              isDarkMode ? 'bg-black/60 text-white border-white/10' : 'bg-white/90 text-gray-900 border-white/20'
                          }`}>
                              {template.style}
                          </div>
                      </div>

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-6 p-10">
                          <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(template.image, '_blank');
                            }}
                            className="w-full py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-2"
                          >
                              <Eye size={20} /> TEZKO'R KO'RISh
                          </button>
                          <button 
                            className="w-full py-5 bg-[#E11D48] text-white rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-[#E11D48]/30 scale-105 hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                          >
                              <CheckCircle size={20} /> UShBU DIZAYNNI TANLASh
                          </button>
                      </div>
                  </div>

                  <div className={`p-10 space-y-3 text-center border-t transition-all ${
                      isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-gray-50'
                  }`}>
                      <p className="text-[9px] text-[#E11D48] font-black uppercase tracking-[0.3em] mb-2">{template.style}</p>
                      <h4 className={`font-playfair text-3xl font-black group-hover:text-[#E11D48] transition-colors leading-tight ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{template.name}</h4>
                      <div className="flex items-center justify-center gap-1.5 text-yellow-400 pt-2">
                          {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />) }
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pt-4">Taklifnoma Asia — Premium</p>
                  </div>
              </motion.div>
          ))}
      </div>
    </div>
  );
}
