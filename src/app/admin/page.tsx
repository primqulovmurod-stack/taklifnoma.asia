'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ExternalLink, Search, ShieldCheck, Heart, Trash2, Send, Phone, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/context/ThemeContext';

export default function AdminPanel() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({ total: 0, paid: 0, pending: 0 });
  const { setTheme } = useTheme();
  
  // Force dark mode globally on mount for admin page
  useEffect(() => {
    setTheme('dark');
    document.documentElement.classList.add('dark');
  }, [setTheme]);

  // Admin panel is permanently in premium dark mode
  const isDarkMode = true; 

  // Security Check on Mount
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_session');
    if (auth === 'true') setIsAuthorized(true);
    
    if (isAuthorized) {
        loadData();
    }
  }, [isAuthorized]);

  useEffect(() => {
    // Calculate stats whenever invitations change
    setStats({
        total: invitations.length,
        paid: invitations.filter(i => i.is_paid).length,
        pending: invitations.filter(i => !i.is_paid).length
    });
  }, [invitations]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default Security Password
    if (password === 'Taklifnoma2026!') {
        sessionStorage.setItem('admin_session', 'true');
        setIsAuthorized(true);
    } else {
        alert("Xato parol! 🛑");
    }
  };

  useEffect(() => {
    if (!isAuthorized) return;
    
    // Subscribe to REALTIME updates
    const channel = supabase
      .channel('admin_realtime_sync')
      .on('postgres_changes', { event: '*', table: 'invitations', schema: 'public' }, (payload) => {
          if (payload.eventType === 'INSERT') {
              setInvitations(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
              setInvitations(prev => prev.map(inv => inv.id === payload.new.id ? payload.new : inv));
          } else if (payload.eventType === 'DELETE') {
              setInvitations(prev => prev.filter(inv => inv.id !== payload.old.id));
          }
      })
      .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
  }, [isAuthorized]);

  const loadData = async () => {
    setLoading(true);
    try {
        // Fetch from Supabase
        const { data: invData, error: invError } = await supabase
            .from('invitations')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (invError) {
            console.error('Admin fetch error:', invError);
            // Backup fallback to local storage
            const localData = localStorage.getItem('taklifnoma_invitations');
            if (localData) {
                const parsed = JSON.parse(localData);
                // Ensure newest first for local data too
                parsed.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setInvitations(parsed);
            }
        } else if (invData) {
            setInvitations(invData);
            localStorage.setItem('taklifnoma_invitations', JSON.stringify(invData));
        }
    } catch (err) {
        console.error('Fatal loadData error:', err);
    } finally {
        setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    
    // 1. Optimistic Update (Immediate UI response)
    setInvitations(prev => prev.map(inv => 
        inv.id === id ? { ...inv, is_paid: newStatus } : inv
    ));

    try {
        console.log('Attempting to toggle status via API:', id);
        const response = await fetch('/api/admin/toggle-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Taklifnoma2026!'
            },
            body: JSON.stringify({ id, isPaid: newStatus })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('TOGGLE API ERROR:', error);
            
            // If API fails, try direct Supabase update (as backup)
            const { error: dbError } = await supabase
                .from('invitations')
                .update({ is_paid: newStatus })
                .eq('id', id);

            if (dbError) {
                console.error('Direct toggle error:', dbError);
                alert("Statusni yangilab bo'lmadi! API va DB xatosi.");
                // Revert UI
                setInvitations(prev => prev.map(inv => 
                    inv.id === id ? { ...inv, is_paid: currentStatus } : inv
                ));
            }
        }
        
        // Always update local storage for consistency
        const localData = localStorage.getItem('taklifnoma_invitations');
        if (localData) {
            let invites = JSON.parse(localData);
            invites = invites.map((inv: any) => inv.id === id ? { ...inv, is_paid: newStatus } : inv);
            localStorage.setItem('taklifnoma_invitations', JSON.stringify(invites));
        }
    } catch (err: any) {
        console.error('Fatal toggle status error:', err);
        // Revert local state
        setInvitations(prev => prev.map(inv => 
            inv.id === id ? { ...inv, is_paid: currentStatus } : inv
        ));
    }
  };

  const deleteInvite = async (invId: string) => {
    if (!invId) {
        alert("XALOLIK: Taklifnoma ID topilmadi!");
        return;
    }

    const confirmed = window.confirm("Ushbu taklifnomani (+ rasm/fayllarni) butunlay o'chirib tashlamoqchimisiz?");
    if (!confirmed) return;

    const originalData = [...invitations];
    try {
        // UI dan vaqtinchalik olib tashlash
        setInvitations(prev => prev.filter(item => item.id !== invId));

        const response = await fetch(`/api/admin/delete?id=${invId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Taklifnoma2026!'
            }
        });

        if (!response.ok) {
            throw new Error("Serverda o'chirishda xatolik yuz berdi.");
        }

        // Local storage sync
        const local = localStorage.getItem('taklifnoma_invitations');
        if (local) {
            const data = JSON.parse(local).filter((x: any) => x.id !== invId);
            localStorage.setItem('taklifnoma_invitations', JSON.stringify(data));
        }

        alert("Taklifnoma muvaffaqiyatli o'chirildi! ✅");
    } catch (err) {
        alert("Xatolik: O'chirib bo'lmadi! ❌");
        setInvitations(originalData); // Qaytarish
    }
  };

  const filtered = invitations.filter(inv => 
    inv.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.content?.groomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.content?.brideName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthorized) {
    return (
      <div className="dark">
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#0A0A0A]">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-10 rounded-[3rem] shadow-2xl border transition-all bg-[#141416] border-white/5"
            >
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-[#E11D48]/10 rounded-3xl flex items-center justify-center text-[#E11D48] shadow-lg shadow-[#E11D48]/5">
                        <ShieldCheck size={40} />
                    </div>
                    <div className="space-y-2">
                        <h1 className="font-serif text-3xl font-black text-white">Admin Gate</h1>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-loose">Boshqaruv paneliga kirish uchun parol kiriting</p>
                    </div>

                    <form onSubmit={handleLogin} className="w-full space-y-4">
                        <input 
                            type="password"
                            placeholder="Shaxsiy Parol"
                            className="w-full px-8 py-5 rounded-[1.5rem] outline-none transition-all text-sm font-black tracking-widest text-center bg-white/5 border-white/5 text-white focus:ring-[#E11D48]/20"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                        <button 
                            type="submit"
                            className="w-full py-5 bg-[#E11D48] text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-[#E11D48]/20 hover:brightness-110 active:scale-95 transition-all"
                        >
                            KIRISH 🛡️
                        </button>
                    </form>
                    
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest italic pt-4">&copy; 2026 Taklifnoma.Asia — High Authority Only</p>
                </div>
            </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark" style={{ backgroundColor: '#0A0A0A', color: 'white', '--background': '#0A0A0A', '--foreground': '#FFFFFF' } as React.CSSProperties}>
      <div className="min-h-screen transition-all duration-500 p-6 md:p-12 font-sans selection:bg-[#E11D48]/10" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 rounded-[3rem] shadow-xl border transition-all" style={{ backgroundColor: '#141416', borderColor: 'rgba(255,255,255,0.05)' }}>
           <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#E11D48] font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={16} /> Taklifnoma Asia Admin
                </div>
                <div className="flex items-center gap-4">
                    <h1 className="font-serif text-4xl font-black transition-colors text-white">Boshqaruv Paneli</h1>
                    <ShieldCheck className="text-[#E11D48] animate-pulse" size={24} />
                </div>
           </div>

           <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="ID yoki ism bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 pr-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-[#E11D48]/5 transition-all w-full md:w-[350px] text-sm font-medium border bg-white/10 border-white/5 text-white shadow-inner"
              />
           </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { label: 'Jami Taklifnomalar', value: stats.total, color: 'blue', icon: Heart },
                { label: 'To\'langanlar', value: stats.paid, color: 'green', icon: CheckCircle },
                { label: 'Kutilmoqda', value: stats.pending, color: 'orange', icon: XCircle }
            ].map((stat, idx) => (
                <div key={idx} className="p-8 rounded-[2.5rem] bg-[#141416] border border-white/5 shadow-lg flex items-center justify-between group hover:border-[#E11D48]/20 transition-all">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
                        <h3 className="text-4xl font-black text-white">{stat.value}</h3>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${stat.color}-500/10 text-${stat.color}-500`}>
                        <stat.icon size={28} />
                    </div>
                </div>
            ))}
        </div>

        <div className="rounded-[3rem] shadow-xl border transition-all overflow-hidden" style={{ backgroundColor: '#141416', borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/5">
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">T/r</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">ID / Havola</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Shaxs</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Telefon</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Email</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Holat</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right whitespace-nowrap">Amallar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan={7} className="p-20 text-center text-gray-400 font-bold animate-pulse">Yuklanmoqda...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={7} className="p-20 text-center text-gray-400 font-bold">Hech narsa topilmadi.</td></tr>
                        ) : filtered.map((inv, index) => (
                            <tr key={inv.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <span className="text-xs font-black text-gray-600">{index + 1}</span>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <div className="space-y-1">
                                        <p className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-tighter">{inv.id}</p>
                                        <a 
                                            href={`/${inv.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[13px] font-black text-[#E11D48] flex items-center gap-2 hover:text-[#BE123C] transition-all"
                                        >
                                            <span>{inv.slug}</span>
                                            <ExternalLink size={12} className="flex-shrink-0" />
                                        </a>
                                    </div>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <div className="flex flex-col max-w-[180px]">
                                        <p className="text-sm font-black transition-colors text-white truncate">{inv.content?.groomName} & {inv.content?.brideName}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest truncate">{inv.content?.theme || 'Custom Style'}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap">
                                     <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-green-500 bg-green-500/10 flex-shrink-0">
                                            <Phone size={12} />
                                        </div>
                                        <span className="text-xs font-black transition-colors text-gray-400">
                                            {inv.phone || inv.content?.phone || 'Noma\'lum'}
                                        </span>
                                     </div>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap">
                                     <div className="flex items-center gap-2 max-w-[150px]">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-blue-500 bg-blue-500/10 flex-shrink-0">
                                            <Mail size={12} />
                                        </div>
                                        <span className="text-xs font-medium transition-colors text-gray-400 truncate">
                                            {inv.email || inv.content?.email || 'Noma\'lum'}
                                        </span>
                                     </div>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <button 
                                        onClick={() => toggleStatus(inv.id, inv.is_paid)}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                                            inv.is_paid 
                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20 shadow-lg shadow-green-500/5' 
                                            : 'bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500/20'
                                        }`}
                                    >
                                        <CheckCircle size={12} className={inv.is_paid ? 'opacity-100' : 'opacity-30'} />
                                        {inv.is_paid ? 'Faol' : 'Kutilmoqda'}
                                    </button>
                                </td>
                                <td className="px-6 py-6 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-1.5">
                                        <button 
                                          onClick={() => {
                                              const url = `https://taklifnoma.asia/${inv.slug}`;
                                              window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Tabriklaymiz! Sizning taklifnomangiz tayyor va faollashtirildi! 💍✨ %0A%0AHavola: ')}${encodeURIComponent(url)}`, '_blank');
                                          }}
                                          className="p-2.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg transition-all shadow-lg"
                                          title="Telegram"
                                        >
                                            <Send size={14} />
                                        </button>
                                        <button 
                                          onClick={() => deleteInvite(inv.id)}
                                          className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-lg active:scale-95"
                                          title="O'chirish"
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
    </div>
  );
}
// FORCE UPDATE TEST 123456
