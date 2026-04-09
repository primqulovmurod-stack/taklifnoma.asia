'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ExternalLink, Search, ShieldCheck, Heart, Trash2, Send, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/context/ThemeContext';

export default function AdminPanel() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Security Check on Mount
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_session');
    if (auth === 'true') setIsAuthorized(true);
    
    if (isAuthorized) {
        loadData();
    }
  }, [isAuthorized]);

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
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
        const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
        
        if (isPlaceholder) {
            const localData = localStorage.getItem('taklifnoma_invitations');
            if (localData) setInvitations(JSON.parse(localData));
        } else {
            const { data: invData, error: invError } = await supabase
                .from('invitations')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (invError) throw invError;
            setInvitations(invData || []);
        }
    } catch (err) {
        console.error(err);
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
        const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
        
        if (!isPlaceholder) {
            const { error } = await supabase
                .from('invitations')
                .update({ is_paid: newStatus })
                .eq('id', id);
            
            if (error) {
                console.error('SUPABASE UPDATE ERROR:', error);
                
                // Detailed alert for debugging
                let msg = "Statusni o'zgartirib bo'lmadi.";
                if (error.message?.includes('RLS') || error.code === '42501') {
                    msg = "Xatolik: RLS Policy ruxsat bermayapti. Supabase'da 'invitations' jadvali uchun UPDATE huquqini (public) bering.";
                }
                alert(msg + "\n" + error.message);

                // 2. Revert UI if DB failed
                setInvitations(prev => prev.map(inv => 
                    inv.id === id ? { ...inv, is_paid: currentStatus } : inv
                ));
            }
        } else {
            // Placeholder/LocalStorage updates
            const localData = localStorage.getItem('taklifnoma_invitations');
            if (localData) {
                let invites = JSON.parse(localData);
                invites = invites.map((inv: any) => inv.id === id ? { ...inv, is_paid: newStatus } : inv);
                localStorage.setItem('taklifnoma_invitations', JSON.stringify(invites));
            }
        }
    } catch (err: any) {
        console.error('Fatal toggle status error:', err);
        // Revert local state
        setInvitations(prev => prev.map(inv => 
            inv.id === id ? { ...inv, is_paid: currentStatus } : inv
        ));
    }
  };

  const deleteInvite = async (id: string) => {
    if (confirm('Ushbu taklifnomani bazadan butunlay o\'chirmoqchimisiz?')) {
        const original = [...invitations];
        try {
            setInvitations(prev => prev.filter(inv => inv.id !== id));
            
            const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
            
            if (!isPlaceholder) {
                console.log('Attempting to delete invitation:', id);
                const { error } = await supabase.from('invitations').delete().eq('id', id);
                if (error) {
                    console.error('DELETE ERROR:', error);
                    let msg = "O'chirib bo'lmadi: " + error.message;
                    if (error.message?.includes('RLS') || error.code === '42501') {
                        msg = "Xatolik: DELETE huquqi yo'q. Supabase'da 'invitations' jadvali uchun DELETE ruxsatini (public) bering.";
                    }
                    alert(msg);
                    setInvitations(original);
                } else {
                    console.log('Delete successful');
                }
            } else {
                const localData = localStorage.getItem('taklifnoma_invitations');
                if (localData) {
                    let invites = JSON.parse(localData);
                    invites = invites.filter((inv: any) => inv.id !== id);
                    localStorage.setItem('taklifnoma_invitations', JSON.stringify(invites));
                }
            }
        } catch (err: any) {
            console.error('Delete error:', err);
            setInvitations(original);
        }
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
        <div className={`min-h-screen flex items-center justify-center p-6 ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#FFF9FA]'}`}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-full max-w-md p-10 rounded-[3rem] shadow-2xl border transition-all ${
                    isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-[#FFE4E6]'
                }`}
            >
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-[#E11D48]/10 rounded-3xl flex items-center justify-center text-[#E11D48] shadow-lg shadow-[#E11D48]/5">
                        <ShieldCheck size={40} />
                    </div>
                    <div className="space-y-2">
                        <h1 className={`font-serif text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin Gate</h1>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-loose">Boshqaruv paneliga kirish uchun parol kiriting</p>
                    </div>

                    <form onSubmit={handleLogin} className="w-full space-y-4">
                        <input 
                            type="password"
                            placeholder="Shaxsiy Parol"
                            className={`w-full px-8 py-5 rounded-[1.5rem] outline-none transition-all text-sm font-black tracking-widest text-center ${
                                isDarkMode ? 'bg-white/5 border-white/5 text-white focus:ring-[#E11D48]/20' : 'bg-gray-50 border-gray-100 text-gray-900 focus:ring-gray-100'
                            }`}
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
    );
  }

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
                    isDarkMode ? 'bg-white/10 border-white/5 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'
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
                        <tr className={`${isDarkMode ? 'bg-white/5' : 'bg-gray-50/50'} border-b ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">ID / Havola</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Shaxs</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Telefon</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Holat</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Sana</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Amallar</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-gray-50/50'}`}>
                        {loading ? (
                            <tr><td colSpan={6} className="p-20 text-center text-gray-400 font-bold animate-pulse">Yuklanmoqda...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={6} className="p-20 text-center text-gray-400 font-bold">Hech narsa topilmadi.</td></tr>
                        ) : filtered.map((inv) => (
                            <tr key={inv.id} className={`${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50/10'} transition-colors group`}>
                                <td className="px-8 py-6">
                                    <div className="space-y-1">
                                        <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-tighter">#{inv.id}</p>
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
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[#E11D48] ${isDarkMode ? 'bg-white/5' : 'bg-[#E11D48]/5'}`}>
                                            <Heart size={18} />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-black transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{inv.content?.groomName} & {inv.content?.brideName}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{inv.content?.theme}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                     <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-green-500 ${isDarkMode ? 'bg-green-500/10' : 'bg-green-50'}`}>
                                            <Phone size={14} />
                                        </div>
                                        <span className={`text-xs font-black transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
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
                                        <CheckCircle size={14} className={inv.is_paid ? 'opacity-100' : 'opacity-30'} />
                                        {inv.is_paid ? 'Faollashdi' : 'Kutilmoqda'}
                                    </button>
                                </td>
                                <td className={`px-8 py-6 text-sm font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
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
                                          className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
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
