'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Music, 
  Image as ImageIcon, 
  CheckCircle, 
  Share2,
  LayoutDashboard,
  Save,
  CreditCard,
  ChevronLeft,
  Monitor,
  Smartphone,
  Eye,
  Layout,
  ExternalLink,
  ChevronRight,
  Settings,
  X
} from 'lucide-react';
import { InvitationContent } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import TemplatePreview, { templates } from '@/components/dashboard/TemplatePreview';
import PaymentModal from '@/components/dashboard/PaymentModal';

const INITIAL_CONTENT: InvitationContent = {
  groomName: 'Ali',
  brideName: 'Laylo',
  date: '2026-05-15',
  time: '18:00',
  locationName: 'Tantana Milliy Taomlar',
  locationAddress: 'Toshkent shahar',
  locationUrl: 'https://maps.app.goo.gl/syEH2lA3FxpMpb7z7',
  imageUrl: 'https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg',
  musicUrl: '/assets/die_with_a_smile.mp3',
  theme: 'gold-white',
  cardNumber: '9860 6004 0356 5588',
  cardName: 'MUROD P.'
};

export default function EditInvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template');
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [content, setContent] = useState<InvitationContent>({
      ...INITIAL_CONTENT,
      theme: templateParam || INITIAL_CONTENT.theme
  });
  const [isPaid, setIsPaid] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isPreviewMobile, setIsPreviewMobile] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Slug generation helper
  const generateSlug = (groom: string, bride: string, date: string) => {
    const clean = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const [year, month, day] = date.split('-').slice(0, 3);
    const shortDate = `${day || '00'}-${month || '00'}`;
    return `${clean(groom)}-${clean(bride)}-${shortDate}`;
  };

  // Fetch status helper
  const fetchStatus = async () => {
    const { data, error } = await supabase
        .from('invitations')
        .select('content, is_paid')
        .eq('id', id)
        .single();
        
    if (data && !error) {
        // Only update if something changed
        if (data.is_paid !== isPaid) {
            setIsPaid(data.is_paid);
            if (data.is_paid) {
                // Show a small success toast or alert here if needed
                console.log("Invitation activated!");
            }
        }
        return data;
    }
    return null;
  };

  // 1. Initial Load
  useEffect(() => {
    const initFetch = async () => {
        const data = await fetchStatus();
        if (data) {
            setContent(data.content);
        } else {
            // Fallback to LocalStorage
            const localData = localStorage.getItem('taklifnoma_invitations');
            if (localData) {
                const invites = JSON.parse(localData);
                const currentInvite = invites.find((inv: any) => inv.id === id);
                if (currentInvite) {
                    setContent(currentInvite.content);
                    setIsPaid(currentInvite.is_paid);
                }
            }
        }
    };
    initFetch();
  }, [id]);

  // 2. Polling for activation if not paid
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaid) {
        interval = setInterval(() => {
            fetchStatus();
        }, 10000); // Check every 10 seconds
    }
    return () => clearInterval(interval);
  }, [isPaid, id]);

  // Update content field
  const updateField = (field: keyof InvitationContent, value: string) => {
    setContent(prev => {
        const newContent = { ...prev, [field]: value };
        return newContent;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Generate slug from names and date
    const finalSlug = generateSlug(content.groomName, content.brideName, content.date);
    
    // 1. Always save to LocalStorage FIRST
    try {
        const localData = localStorage.getItem('taklifnoma_invitations');
        let invites = localData ? JSON.parse(localData) : [];
        const index = invites.findIndex((inv: any) => inv.id === id);
        
        if (index !== -1) {
            invites[index] = { ...invites[index], slug: finalSlug, content: content, is_paid: isPaid };
        } else {
            invites.push({ id, slug: finalSlug, content, is_paid: isPaid });
        }
        localStorage.setItem('taklifnoma_invitations', JSON.stringify(invites));

        // 2. Sync with Supabase (CRITICAL FOR ADMIN PANEL)
        // Only try to sync if we have a real Supabase URL (not the placeholder)
        const hasRealDb = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
        
        if (hasRealDb) {
            const { error } = await supabase
                .from('invitations')
                .upsert({
                    id: id,
                    slug: finalSlug,
                    content: content,
                    is_paid: isPaid
                });
                
            if (error) {
                console.error('DATABASE SYNC ERROR:', error.message);
                // Silent error in production to not block user, but log it
            }
        }
        
        // Logical Next Step after save
        if (!isPaid) {
            setShowPayment(true);
        } else {
            // If already paid, copying the link is the "Export" action
            const url = `https://taklifnoma.asia/${finalSlug}`;
            navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
            
    } catch (err: any) {
        console.error('FATAL SAVE ERROR:', err);
        // We don't alert if it's just a network/placeholder fail as per previous fix
    } finally {
        setIsSaving(false);
    }
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleExport = () => {
      handleSave();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-[#FFF9FA] lg:overflow-hidden relative">
      {/* Editor Pane */}
      <div className={`w-full lg:w-[450px] bg-white border-r border-[#FFE4E6]/50 flex flex-col shadow-xl z-20 ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'} min-h-screen lg:h-full`}>
        <div className="p-6 border-b border-[#FFE4E6]/20 bg-white sticky top-0 z-30">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 flex items-center gap-2 group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform text-[#E11D48]" />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Kabinet</span>
            </button>
            <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border shadow-sm ${isPaid ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100 animate-pulse'}`}>
                    {isPaid ? 'Faol ✅' : 'Chernovik (To\'lov kutilmoqda)'}
                </div>
                <button 
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#E11D48] text-white rounded-xl transition-all shadow-lg shadow-[#E11D48]/20 hover:brightness-110 active:scale-95"
                >
                    {isSaving ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Saqlash</span>
                </button>
            </div>
          </div>
          
          <div className="flex bg-gray-50 p-1 rounded-2xl">
            <button 
              onClick={() => setIsPreviewMobile(true)}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${isPreviewMobile ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
            >
              <Smartphone size={14} /> Mobil
            </button>
            <button 
              onClick={() => setIsPreviewMobile(false)}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${!isPreviewMobile ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
            >
              <Monitor size={14} /> Desktop
            </button>
          </div>
        </div>

        <div className="flex-1 lg:overflow-y-auto p-6 space-y-12 pb-40 no-scrollbar">
          {/* Names Section */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <Heart size={14} fill="currentColor" className="opacity-80" /> Asosiy ma'lumotlar
            </h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Kuyovning Ismi</label>
                <input 
                  type="text" 
                  value={content.groomName || ''} 
                  onChange={(e) => updateField('groomName', e.target.value)}
                  className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-[#E11D48]/10 outline-none transition-all text-sm font-bold shadow-inner" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Kelinning Ismi</label>
                <input 
                  type="text" 
                  value={content.brideName || ''} 
                  onChange={(e) => updateField('brideName', e.target.value)}
                  className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-[#E11D48]/10 outline-none transition-all text-sm font-bold shadow-inner"
                />
              </div>
            </div>
          </section>

          {/* Date & Time */}
          <section className="space-y-6">
             <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <Calendar size={14} /> Vaqt va Sana
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">To'y Sanasi</label>
                <input 
                  type="text" 
                  value={content.date || ''} 
                  onChange={(e) => updateField('date', e.target.value)}
                  placeholder="24 - MAY, 2026"
                  className="w-full px-6 py-5 bg-gray-50 rounded-[1.5rem] text-sm font-bold focus:ring-4 focus:ring-[#E11D48]/10 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Bashlanish Vaqti</label>
                <input 
                  type="text" 
                  value={content.time || ''} 
                  onChange={(e) => updateField('time', e.target.value)}
                  placeholder="18:00"
                  className="w-full px-6 py-5 bg-gray-50 rounded-[1.5rem] text-sm font-bold focus:ring-4 focus:ring-[#E11D48]/10 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="space-y-6">
             <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <MapPin size={14} /> Manzil tafsilotlari
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Restoran yoki Joy nomi</label>
                <input 
                  type="text" 
                  value={content.locationName || ''} 
                  onChange={(e) => updateField('locationName', e.target.value)}
                  placeholder="Masalan: Tantana Milliy Taomlar"
                  className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-[#E11D48]/10 outline-none transition-all text-sm font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Sahar / Tuman nomi</label>
                <input 
                  type="text" 
                  value={content.locationAddress || ''} 
                  onChange={(e) => updateField('locationAddress', e.target.value)}
                  placeholder="Masalan: Toshkent shahar"
                  className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-[#E11D48]/10 outline-none transition-all text-sm font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Xarita Havolasi (Google Maps)</label>
                <input 
                  type="text" 
                  value={content.locationUrl || ''} 
                  onChange={(e) => updateField('locationUrl', e.target.value)}
                  className="w-full px-8 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] focus:ring-2 focus:ring-[#E11D48]/10 text-[10px] text-gray-400 font-mono overflow-ellipsis" 
                />
              </div>
            </div>
          </section>

          {/* Card Info - NEW SECTION */}
          <section className="space-y-6 pb-20">
             <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <CreditCard size={14} /> To'yona uchun Karta raqami
            </h3>
            <div className="space-y-5 bg-[#FFF1F2] p-8 rounded-[2.5rem] border border-[#FFE4E6] ring-1 ring-[#FFE4E6]">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">Karta raqami</label>
                <input 
                  type="text" 
                  value={content.cardNumber || ''} 
                  onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      const chunks = v.match(/.{1,4}/g);
                      updateField('cardNumber', chunks ? chunks.join(' ') : v);
                  }}
                  maxLength={19}
                  placeholder="8600 0000 0000 0000"
                  className="w-full px-8 py-5 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#E11D48]/10 outline-none text-sm font-mono tracking-widest shadow-sm" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">Karta egasining Ismi</label>
                <input 
                  type="text" 
                  value={content.cardName || ''} 
                  onChange={(e) => updateField('cardName', e.target.value)}
                  placeholder="MUROD PRIQULOV"
                  className="w-full px-8 py-5 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#E11D48]/10 outline-none text-sm font-bold uppercase shadow-sm" 
                />
              </div>
              <p className="text-[9px] text-gray-400 italic px-2">Karta ma'lumotlari taklifnomaning sovg'alar bo'limida ko'rinadi.</p>
            </div>
          </section>
        </div>

        {/* Footer Action - Desktop Only */}
        <div className="hidden lg:block p-6 border-t border-[#FFE4E6] bg-white sticky bottom-0 z-30 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
          <button 
            onClick={handleExport}
            className="group w-full py-5 bg-[#E11D48] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(225,29,72,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isPaid ? (isCopied ? <CheckCircle size={20} /> : <Share2 size={20} />) : <ExternalLink size={20} />}
            {isPaid ? (isCopied ? 'HAVOLA NUSXALANDI!' : 'HAVOLANI OLISH') : 'TO\'LOV VA EKSPORT'}
          </button>
        </div>
      </div>

      {/* Preview Pane */}
      <div className={`flex-1 bg-[#FFF9FA] flex items-center justify-center overflow-hidden lg:h-screen bg-[radial-gradient(#FFE4E6_1px,transparent_1px)] [background-size:20px_20px] transition-all duration-500 ${activeTab === 'edit' ? 'hidden lg:flex' : 'flex'} min-h-screen lg:min-h-0`}>
        <div className={`transition-all duration-1000 ease-in-out shadow-[0_80px_160px_-40px_rgba(0,0,0,0.3)] overflow-hidden relative transform translate-z-0 contain-layout ${
          isPreviewMobile 
          ? 'w-full lg:w-[375px] h-full lg:h-[812px] lg:rounded-[3.5rem] lg:border-[12px] lg:border-gray-950 lg:ring-[15px] lg:ring-[#E11D48]/10' 
          : 'w-full h-full lg:w-[90%] lg:h-[85%] lg:rounded-[2rem] lg:border-[12px] lg:border-gray-950 lg:ring-[15px] lg:ring-[#E11D48]/10'
        }`}>
          {/* Phone Details */}
          {isPreviewMobile && (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-950 rounded-b-3xl z-[100] shadow-inner flex items-center justify-center">
                  <div className="w-12 h-1 rounded-full bg-gray-800" />
              </div>
              <div className="absolute top-2 left-1/2 translate-x-4 w-2 h-2 rounded-full bg-gray-800 z-[100]"></div>
            </>
          )}

          <div className="w-full h-full overflow-y-auto no-scrollbar bg-white">
            <TemplatePreview content={content} />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full px-6">
            <div className="flex items-center justify-center gap-2 bg-black/80 backdrop-blur-xl px-5 py-2.5 rounded-full shadow-2xl border border-white/10 group">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse ring-4 ring-green-500/20"></div>
               <span className="text-[10px] font-black text-white uppercase tracking-widest hidden sm:inline">Jonli sinxronizatsiya faol</span>
               <span className="text-[10px] font-black text-white uppercase tracking-widest sm:hidden">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Tabs */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-[#FFE4E6]/50 flex z-[150] pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
          <button 
            onClick={() => setActiveTab('edit')}
            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-4 transition-all ${activeTab === 'edit' ? 'text-[#E11D48]' : 'text-gray-400'}`}
          >
              <div className={`p-2 rounded-xl transition-all ${activeTab === 'edit' ? 'bg-[#E11D48]/10' : 'bg-transparent'}`}>
                <Settings size={22} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest">Tahrirlash</span>
          </button>
          
          <div className="relative flex items-center justify-center -top-6">
              <button 
                onClick={handleSave}
                className="w-14 h-14 bg-[#E11D48] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#E11D48]/30 active:scale-90 transition-all border-4 border-white"
              >
                  {isSaving ? <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={24} />}
              </button>
          </div>

          <button 
            onClick={() => setActiveTab('preview')}
            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-4 transition-all ${activeTab === 'preview' ? 'text-[#E11D48]' : 'text-gray-400'}`}
          >
              <div className={`p-2 rounded-xl transition-all ${activeTab === 'preview' ? 'bg-[#E11D48]/10' : 'bg-transparent'}`}>
                <Eye size={22} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest">Ko'rish</span>
          </button>
      </div>

      {/* Success/Payment Modal */}
      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
        onSuccess={() => setIsPaid(true)} 
        isPaid={isPaid}
        invitationId={id}
        slug={generateSlug(content.groomName, content.brideName, content.date)}
      />
    </div>
  );
}
