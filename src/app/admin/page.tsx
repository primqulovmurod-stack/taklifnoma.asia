'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ExternalLink, Search, ShieldCheck, Heart, Trash2, Send, Phone, Clock as ClockIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/context/ThemeContext';

export default function AdminPanel() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'invites' | 'leads'>('invites');
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
        const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
        
        if (isPlaceholder) {
            const localData = localStorage.getItem('taklifnoma_invitations');
            if (localData) setInvitations(JSON.parse(localData));
        } else {
            // Fetch invites
            const { data: invData, error: invError } = await supabase.from('invitations').select('*').order('created_at', { ascending: false });
            if (invError) throw invError;
            setInvitations(invData || []);

            // Fetch leads
            const { data: leadData, error: leadError } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
            if (!leadError) {
                setLeads(leadData || []);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    
    // 1. Update State immediately
    setInvitations(prev => prev.map(inv => 
        inv.id === id ? { ...inv, is_paid: newStatus } : inv
    ));

    try {
        // 2. Update Supabase
        const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
        if (!isPlaceholder) {
            await supabase
                .from('invitations')
                .update({ is_paid: newStatus })
                .eq('id', id);
        }
        
        // 3. Sync with LocalStorage
        const localData = localStorage.getItem('taklifnoma_invitations');
        if (localData) {
            const parsed = JSON.parse(localData);
            const updated = parsed.map((inv: any) => 
                inv.id === id ? { ...inv, is_paid: newStatus } : inv
            );
            localStorage.setItem('taklifnoma_invitations', JSON.stringify(updated));
        }
    } catch (err) {
        console.error('Update error:', err);
    }
  };

  const deleteInvite = async (id: string) => {
    if (confirm('Ushbu taklifnomani bazadan butunlay o\'chirmoqchimisiz?')) {
        try {
            // Update State
            setInvitations(prev => prev.filter(inv => inv.id !== id));

            // Update Supabase
            const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
            if (!isPlaceholder) {
                await supabase.from('invitations').delete().eq('id', id);
            }
            
            // Sync with LocalStorage
            const localData = localStorage.getItem('taklifnoma_invitations');
            if (localData) {
                const parsed = JSON.parse(localData);
                const updated = parsed.filter((inv: any) => inv.id !== id);
                localStorage.setItem('taklifnoma_invitations', JSON.stringify(updated));
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    }
  };

  const filtered = invitations.filter(inv => 
    inv.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.content?.groomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.content?.brideName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-all duration-500 p-6 md:p-12 font-sans selection:bg-[#E11D48]/10 ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#FFF9FA]'}`}>
      <div className="max-w-7xl mx-auto space-y-12">
        <header className={`flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 rounded-[3rem] shadow-xl border transition-all ${
            isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-[#FFE4E6]'
        }`}>
           <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#E11D48] font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={16} /> Taklifnoma Asia Admin
                </div>
                <h1 className={`font-serif text-4xl font-black transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Boshqaruv Paneli</h1>
           </div>

           <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="ID yoki ism bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-14 pr-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-[#E11D48]/5 transition-all w-full md:w-[350px] text-sm font-medium border ${
                    isDarkMode ? 'bg-white/5 border-white/5 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'
                }`}
              />
           </div>
        </header>

        <div className={`rounded-[3rem] shadow-xl border transition-all overflow-hidden ${
            isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-[#FFE4E6]'
        }`}>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className={`${isDarkMode ? 'bg-white/5' : 'bg-gray-50/50'} border-b border-gray-50/5 dark:border-white/5`}>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">ID / Havola</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Shaxs</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Telefon</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Holat</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Sana</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Amallar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50/5 dark:divide-white/5">
                        {loading ? (
                            <tr><td colSpan={6} className="p-20 text-center text-gray-400 font-bold animate-pulse">Yuklanmoqda...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={6} className="p-20 text-center text-gray-400 font-bold">Hech narsa topilmadi.</td></tr>
                        ) : filtered.map((inv) => (
                            <tr key={inv.id} className={`${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50/30'} transition-colors`}>
                                <td className="px-8 py-6">
                                    <div className="space-y-1">
                                        <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-tighter">#{inv.id}</p>
                                        <a 
                                            href={`/${inv.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-black text-[#E11D48] flex items-center gap-2 hover:text-[#BE123C] transition-all"
                                        >
                                            <span className="hover:underline underline-offset-4">{inv.slug}</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#E11D48]/5 flex items-center justify-center text-[#E11D48]">
                                            <Heart size={18} />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-black transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{inv.content?.groomName} & {inv.content?.brideName}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{inv.content?.theme}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                     <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                                            <Phone size={14} />
                                        </div>
                                        <span className={`text-xs font-black transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {inv.phone || inv.content?.phone || 'Mavjud emas'}
                                        </span>
                                     </div>
                                </td>
                                <td className="px-8 py-6">
                                    <button 
                                        onClick={() => toggleStatus(inv.id, inv.is_paid)}
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                                            inv.is_paid 
                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                                            : 'bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500/20'
                                        }`}
                                    >
                                        {inv.is_paid ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                        {inv.is_paid ? 'Faollashdi' : 'Kutilmoqda'}
                                    </button>
                                </td>
                                <td className={`px-8 py-6 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {inv.content?.date}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button 
                                          onClick={() => {
                                              const url = `https://taklifnoma.asia/${inv.slug}`;
                                              window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Tabriklaymiz! Sizning taklifnomangiz tayyor va faollashtirildi! 💍✨ %0A%0AHavola: ')}${encodeURIComponent(url)}`, '_blank');
                                          }}
                                          className="p-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-xl transition-all"
                                          title="Telegram"
                                        >
                                            <Send size={16} />
                                        </button>
                                        <button 
                                          onClick={() => deleteInvite(inv.id)}
                                          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}
