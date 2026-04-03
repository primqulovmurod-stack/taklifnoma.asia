'use client';

import React, { use, useEffect, useState } from 'react';
import TemplatePreview from '@/components/dashboard/TemplatePreview';
import { InvitationContent } from '@/lib/types';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Heart, Clock, Send, Lock } from 'lucide-react';

export default function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const [invitation, setInvitation] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitation = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('invitations')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.log('Not in DB, checking local storage...');
          // Check local storage as fallback
          const localData = typeof window !== 'undefined' ? localStorage.getItem('taklifnoma_invitations') : null;
          if (localData) {
            const invites = JSON.parse(localData);
            const found = invites.find((inv: any) => inv.slug === slug);
            if (found) {
                setInvitation(found);
                setLoading(false);
                return;
            }
          }
          setInvitation(null);
        } else {
          setInvitation(data);
        }
      } catch (err) {
        console.error(err);
        setInvitation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, [slug]);

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF9FA]">
            <div className="w-16 h-16 border-4 border-[#E11D48] border-t-transparent rounded-full animate-spin"></div>
        </div>
     );
  }

  // Invitation Not Found in Database
  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF9FA] p-6 text-center">
        <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-2xl border border-[#FFE4E6] space-y-10">
            <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-400 mx-auto">
                <Heart size={48} className="opacity-20" />
            </div>
            
            <div className="space-y-4">
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Taklifnoma Asia</h1>
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Taklifnoma Topilmadi</h2>
                <p className="text-gray-400 font-medium leading-relaxed text-sm">
                   Ushbu taklifnoma hali bazaga saqlanmagan yoki manzili noto'g'ri. <br /> Tahrirlagichga qaytib, taklifnomani saqlang.
                </p>
            </div>

            <div className="pt-6 border-t border-gray-50 flex gap-4">
                <a 
                   href="/dashboard"
                   className="flex-1 py-4 bg-gray-50 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-gray-100 transition-all"
                >
                  KABINETGA QAYTISH
                </a>
            </div>
        </div>
      </div>
    );
  }

  // Not paid / Not activated
  if (!invitation.is_paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF9FA] p-6 text-center">
        <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-2xl border border-[#FFE4E6] space-y-10">
            <div className="w-24 h-24 bg-[#E11D48]/5 rounded-3xl flex items-center justify-center text-[#E11D48] mx-auto animate-pulse">
                <Clock size={48} />
            </div>
            
            <div className="space-y-4">
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Taklifnoma Asia</h1>
                <p className="text-gray-400 font-medium leading-relaxed text-sm px-4">
                   Ushbu taklifnoma hozircha faollashtirilmagan. To'lov tasdiqlangandan so'ng 10 daqiqa ichida ishga tushadi.
                </p>
            </div>

            <div className="pt-6 border-t border-gray-50 space-y-4">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic leading-relaxed">To'lovni tasdiqlash uchun chekni yuboring:</p>
                <a 
                  href="https://t.me/Taklifnoma_Asia" 
                  target="_blank"
                  className="flex items-center justify-center gap-3 w-full py-5 bg-[#E11D48] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-[#E11D48]/20 hover:scale-105 transition-all"
                >
                  <Send size={16} /> Telegram orqali to'lov
                </a>
            </div>
        </div>
      </div>
    );
  }

  // Paid and Activated
  return (
    <div className="min-h-screen">
      <TemplatePreview content={invitation.content} />
    </div>
  );
}
