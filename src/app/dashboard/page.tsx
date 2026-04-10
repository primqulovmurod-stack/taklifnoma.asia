'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Plus, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  CreditCard, 
  CheckCircle,
  Clock,
  ChevronRight,
  Heart,
  Moon,
  Sun
} from 'lucide-react';
import { Invitation } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/context/ThemeContext';

// Mock data for demonstration
const mockInvitations: Invitation[] = [
  {
    id: '1',
    slug: 'ali-laylo',
    is_paid: true,
    content: {
      groomName: 'Ali',
      brideName: 'Laylo',
      date: '2026-05-15',
      time: '18:00',
      locationName: 'Tantana Milliy Taomlar',
      locationUrl: '#',
      imageUrl: '',
      musicUrl: '',
      theme: 'gold-white'
    }
  },
  {
    id: '2',
    slug: 'behzod-dilfuza',
    is_paid: false,
    content: {
      groomName: 'Behzod',
      brideName: 'Dilfuza',
      date: '2026-06-20',
      time: '19:00',
      locationName: 'Navro\'z To\'yxonasi',
      locationUrl: '#',
      imageUrl: '',
      musicUrl: '',
      theme: 'floral'
    }
  }
];

export default function DashboardPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setLoading(true);
        // Always try Supabase first
        const { data, error } = await supabase.from('invitations').select('*').order('created_at', { ascending: false });
        
        if (error) {
            console.error('Supabase fetch error:', error);
            // Fallback to local storage on DB error
            const localData = localStorage.getItem('taklifnoma_invitations');
            if (localData) {
                setInvitations(JSON.parse(localData));
            } else {
                setInvitations(mockInvitations);
            }
        } else if (data && data.length > 0) {
            setInvitations(data);
            // Also update local storage for offline use
            localStorage.setItem('taklifnoma_invitations', JSON.stringify(data));
        } else {
            // No data in Supabase, check local storage
            const localData = localStorage.getItem('taklifnoma_invitations');
            if (localData) {
                setInvitations(JSON.parse(localData));
            } else {
                setInvitations(mockInvitations);
            }
        }
      } catch (err) {
        console.error('Fetch catch error:', err);
        const localData = localStorage.getItem('taklifnoma_invitations');
        setInvitations(localData ? JSON.parse(localData) : mockInvitations);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Ushbu taklifnomani o\'chirib tashlamoqchimisiz?')) {
        const updated = invitations.filter(inv => inv.id !== id);
        setInvitations(updated);
        localStorage.setItem('taklifnoma_invitations', JSON.stringify(updated));
    }
  };


  return (
    <div className={`min-h-screen transition-all duration-500 p-6 md:p-12 pb-24 space-y-12 ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#FFF9FA]'}`}>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
            <h1 className={`font-playfair text-4xl font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Mening Taklifnomalarim</h1>
            <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm font-black tracking-widest uppercase flex items-center gap-2">
                    <Heart size={14} className="text-[#E11D48]" fill="currentColor" />
                    Sizning barcha saqlangan loyihalaringiz
                </p>
                
                <button 
                  onClick={toggleTheme}
                  className={`p-2 rounded-xl transition-all shadow-sm flex items-center gap-2 border ${
                    isDarkMode 
                    ? 'bg-[#18181B] border-white/5 text-yellow-400' 
                    : 'bg-white border-[#FFE4E6] text-gray-400 hover:text-[#E11D48]'
                  }`}
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">
                      {isDarkMode ? 'KUN' : 'TUN'}
                    </span>
                </button>
            </div>
        </div>
        <Link 
            href="/dashboard/new"
            className="inline-flex items-center gap-3 bg-[#E11D48] text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-[#E11D48]/20 hover:scale-105 active:scale-95 transition-all text-[11px] uppercase tracking-widest"
        >
            <Plus size={20} strokeWidth={3} />
            <span>YANGI YARATISH</span>
        </Link>
      </header>

      {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                  <div key={i} className="h-80 bg-white rounded-3xl animate-pulse"></div>
              ))}
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {invitations.map((invite) => (
                  <motion.div 
                    key={invite.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className={`rounded-[2.5rem] border transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col group ${
                        isDarkMode 
                        ? 'bg-[#18181B] border-white/5' 
                        : 'bg-white border-[#EAD0A8]/20'
                    }`}
                  >
                      <div className={`aspect-video flex items-center justify-center p-8 relative overflow-hidden transition-colors ${isDarkMode ? 'bg-[#1E1E22]' : 'bg-gray-50'}`}>
                          <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-[#E11D48] to-transparent"></div>
                          <div className="relative text-center space-y-2">
                              <h3 className={`font-playfair text-2xl font-black transition-colors ${isDarkMode ? 'text-white' : 'text-[#2D2424]'}`}>
                                  {invite.content.groomName} & {invite.content.brideName}
                              </h3>
                              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{invite.content.theme}</p>
                          </div>
                          <div className="absolute top-6 right-6">
                              <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                  invite.is_paid 
                                  ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                  : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                              }`}>
                                  {invite.is_paid ? 'Faol ✅' : 'Chernovik'}
                              </div>
                          </div>
                      </div>

                      <div className="p-8 space-y-6 flex-1">
                          <div className="space-y-4">
                              <div className={`flex items-center gap-3 text-sm font-bold transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  <Clock size={16} className="text-[#E11D48]" />
                                  <span>{invite.content.date} • {invite.content.time}</span>
                              </div>
                              <div className="text-[10px] font-black text-[#E11D48] tracking-widest uppercase">
                                  Taklifnoma Linki: <span className={`font-medium lowercase transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>taklifnoma.asia/{invite.slug}</span>
                              </div>
                          </div>

                           <div className={`grid grid-cols-2 gap-4 pt-4 border-t relative transition-colors ${isDarkMode ? 'border-white/5' : 'border-[#FFE4E6]/20'}`}>
                             <button 
                               onClick={() => handleDelete(invite.id!)}
                               className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-red-500 transition-colors z-10"
                             >
                               <Trash2 size={16} />
                             </button>
                              <Link 
                                href={`/dashboard/edit/${invite.id}`}
                                className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${
                                    isDarkMode 
                                    ? 'bg-[#1E1E22] text-gray-300 border-white/5 hover:bg-[#E11D48] hover:text-white' 
                                    : 'bg-gray-50 text-gray-600 border-transparent hover:bg-[#E11D48]/5 hover:text-[#E11D48] hover:border-[#E11D48]/20'
                                }`}
                              >
                                  <Edit3 size={16} /> Tahrirlash
                              </Link>
                              <Link 
                                href={`/${invite.slug}`}
                                target="_blank"
                                className={`flex items-center justify-center gap-2 py-4 border rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm ${
                                    isDarkMode 
                                    ? 'border-white/10 text-white bg-white/5 hover:bg-[#E11D48]' 
                                    : 'border-[#FFE4E6]/50 text-[#E11D48] hover:bg-[#E11D48] hover:text-white'
                                }`}
                              >
                                  <ExternalLink size={16} /> Ko'rish
                              </Link>
                          </div>
                      </div>
                  </motion.div>
              ))}

              {/* Empty State / New project placeholder */}
               <Link 
                href="/dashboard/new"
                className={`h-full min-h-[320px] rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center p-8 group transition-all text-center ${
                    isDarkMode 
                    ? 'bg-[#18181B] border-white/10 hover:border-[#E11D48] hover:bg-[#E11D48]/5' 
                    : 'bg-white border-[#FFE4E6] hover:border-[#E11D48] hover:bg-[#FFF1F2]'
                }`}
              >
                  <div className="w-16 h-16 rounded-full bg-[#E11D48]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Plus className="text-[#E11D48]" size={32} strokeWidth={3} />
                  </div>
                  <h4 className={`font-black mb-2 uppercase tracking-widest text-[11px] transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Yangi Taklifnoma</h4>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-tighter">Boshqa loyihani boshlang</p>
              </Link>
          </div>
      )}
    </div>
  );
}
