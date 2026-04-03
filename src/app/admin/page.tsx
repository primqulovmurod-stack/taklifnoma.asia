'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ExternalLink, Search, ShieldCheck, Heart, User, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminPanel() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
            const { data, error } = await supabase.from('invitations').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            setInvitations(data || []);
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
    <div className="min-h-screen bg-[#FFF9FA] p-6 md:p-12 font-sans selection:bg-[#E11D48]/10">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[3rem] shadow-xl border border-[#FFE4E6]">
           <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#E11D48] font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={16} /> Taklifnoma Asia Admin
                </div>
                <h1 className="font-serif text-4xl font-black text-gray-900 leading-tight">Boshqaruv Paneli</h1>
                <p className="text-gray-400 text-sm font-medium">Barcha buyurtmalar va to'lovlarni nazorat qilish</p>
           </div>

           <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="ID yoki ism bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-[#E11D48]/5 transition-all w-full md:w-[350px] text-sm font-medium"
              />
           </div>
        </header>

        <div className="bg-white rounded-[3rem] shadow-xl border border-[#FFE4E6] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-50">
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">ID / Havola</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">G'oyib / Shaxs</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Holat</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Sana</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Amallar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan={5} className="p-20 text-center text-gray-400 font-bold animate-pulse">Yuklanmoqda...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={5} className="p-20 text-center text-gray-400 font-bold">Hech narsa topilmadi.</td></tr>
                        ) : filtered.map((inv) => (
                            <tr key={inv.id} className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-8 py-6">
                                    <div className="space-y-1 group relative z-10">
                                        <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-tighter">#{inv.id}</p>
                                        <a 
                                            href={`/${inv.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-black text-[#E11D48] flex items-center gap-2 hover:text-[#BE123C] transition-all cursor-pointer relative z-20"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <span className="hover:underline decoration-2 underline-offset-4">{inv.slug}</span>
                                            <ExternalLink size={14} className="opacity-70" />
                                        </a>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#E11D48]/5 flex items-center justify-center text-[#E11D48]">
                                            <Heart size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-900">{inv.content?.groomName} & {inv.content?.brideName}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{inv.content?.theme}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <button 
                                        onClick={() => toggleStatus(inv.id, inv.is_paid)}
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                                            inv.is_paid 
                                            ? 'bg-green-50 text-green-600 border border-green-100' 
                                            : 'bg-orange-50 text-orange-600 border border-orange-100 hover:bg-orange-100'
                                        }`}
                                    >
                                        {inv.is_paid ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                        {inv.is_paid ? 'Faollashtirilgan' : 'Kutilmoqda'}
                                    </button>
                                </td>
                                <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                                    {inv.content?.date}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button 
                                          onClick={() => deleteInvite(inv.id)}
                                          className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 size={20} />
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
