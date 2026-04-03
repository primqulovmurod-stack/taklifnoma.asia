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
  X,
  Upload,
  Loader2,
  RefreshCw,
  Sun,
  Moon
} from 'lucide-react';
import { InvitationContent } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import TemplatePreview, { templates } from '@/components/dashboard/TemplatePreview';
import PaymentModal from '@/components/dashboard/PaymentModal';
import { useTheme } from '@/context/ThemeContext';

const MUSIC_TRACKS = [
    { name: 'Die With A Smile (LADY GAGA)', url: '/assets/die_with_a_smile.mp3' },
    { name: 'Million Atirgullar (Uzbek)', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { name: 'Classical Piano Wedding', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { name: 'Romantic Guitar', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { name: 'Soft Wedding Bells', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];

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
  const [isUploading, setIsUploading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
        alert("Fayl o'lchami juda katta (Maksimal 10MB)!");
        return;
    }

    setIsUploading(true);
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${id}-${Date.now()}.${fileExt}`;
        const filePath = `music/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('invitations')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('invitations')
            .getPublicUrl(filePath);

        updateField('musicUrl', publicUrl);
        
        // Auto-play preview
        const audio = document.getElementById('preview-audio') as HTMLAudioElement;
        if (audio) {
            audio.src = publicUrl;
            audio.load();
            audio.play().catch(e => console.log('Autoplay blocked'));
        }

    } catch (err: any) {
        console.error('UPLOAD ERROR DETAILS:', err);
        let errorMsg = "Musiqani yuklashda xatolik yuz berdi.";
        
        if (err?.message?.includes('bucket')) {
            errorMsg = "Xatolik: Supabase Storage'da 'invitations' papkasi topilmadi. Iltimos, Supabase Dashboard'da yangi 'invitations' papkasini (Public) yarating.";
        } else if (err?.message?.includes('policy')) {
            errorMsg = "Xatolik: Fayl yuklash ruxsati yo'q. Storage Policies (RLS) qoidalarini tekshiring.";
        }
        
        alert(errorMsg + "\n\nAsl xatolik: " + (err?.message || "Noma'lum xato"));
    } finally {
        setIsUploading(false);
    }
  };

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
                // Instantly open the success/share modal
                setShowPayment(true);
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
      const hasPhone = localStorage.getItem('lead_modal_shown');
      if (!hasPhone) {
          window.dispatchEvent(new CustomEvent('trigger-lead-modal', { detail: { forced: true } }));
          return;
      }
      handleSave();
  };

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen lg:h-screen transition-all duration-500 relative ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#FFF9FA]'} lg:overflow-hidden`}>
      {/* Editor Pane */}
      <div className={`w-full lg:w-[450px] border-r flex flex-col shadow-xl z-20 transition-all duration-500 ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'} min-h-screen lg:h-full ${
          isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-[#FFE4E6]/50'
      }`}>
        <div className={`p-6 border-b sticky top-0 z-30 transition-all duration-500 ${
            isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-[#FFE4E6]/20'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 flex items-center gap-2 group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform text-[#E11D48]" />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Kabinet</span>
            </button>
            <div className="flex items-center gap-2">
                <button 
                  onClick={toggleTheme}
                  className={`p-2 rounded-xl transition-all border ${
                    isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-gray-50 border-gray-100 text-gray-400'
                  }`}
                >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border shadow-sm ${
                    isPaid 
                    ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                    : isDarkMode 
                        ? 'bg-orange-500/10 text-orange-500 border-orange-500/20 animate-pulse'
                        : 'bg-orange-50 text-orange-600 border-orange-100 animate-pulse'
                }`}>
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
          
          <div className={`flex p-1 rounded-2xl transition-all ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <button 
              onClick={() => setIsPreviewMobile(true)}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                  isPreviewMobile 
                  ? isDarkMode ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-400'
              }`}
            >
              <Smartphone size={14} /> Mobil
            </button>
            <button 
              onClick={() => setIsPreviewMobile(false)}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                  !isPreviewMobile 
                  ? isDarkMode ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-400'
              }`}
            >
              <Monitor size={14} /> Desktop
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-12 pb-64 no-scrollbar relative">
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
                  className={`w-full px-8 py-5 border border-transparent rounded-[1.5rem] focus:ring-4 focus:ring-[#E11D48]/10 outline-none transition-all text-sm font-bold shadow-inner ${
                      isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'
                  }`} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Kelinning Ismi</label>
                <input 
                  type="text" 
                  value={content.brideName || ''} 
                  onChange={(e) => updateField('brideName', e.target.value)}
                  className={`w-full px-8 py-5 border border-transparent rounded-[1.5rem] focus:ring-4 focus:ring-[#E11D48]/10 outline-none transition-all text-sm font-bold shadow-inner ${
                      isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'
                  }`} 
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
                  className={`w-full px-6 py-5 rounded-[1.5rem] text-sm font-bold focus:ring-4 focus:ring-[#E11D48]/10 outline-none ${
                    isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'
                  }`} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Bashlanish Vaqti</label>
                <input 
                  type="text" 
                  value={content.time || ''} 
                  onChange={(e) => updateField('time', e.target.value)}
                  placeholder="18:00"
                  className={`w-full px-6 py-5 rounded-[1.5rem] text-sm font-bold focus:ring-4 focus:ring-[#E11D48]/10 outline-none ${
                    isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'
                  }`}
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
                  className={`w-full px-8 py-5 border border-transparent rounded-[1.5rem] focus:ring-4 focus:ring-[#E11D48]/10 outline-none transition-all text-sm font-bold ${
                    isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'
                  }`} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Sahar / Tuman nomi</label>
                <input 
                  type="text" 
                  value={content.locationAddress || ''} 
                  onChange={(e) => updateField('locationAddress', e.target.value)}
                  placeholder="Masalan: Toshkent shahar"
                  className={`w-full px-8 py-5 border border-transparent rounded-[1.5rem] focus:ring-4 focus:ring-[#E11D48]/10 outline-none transition-all text-sm font-bold ${
                    isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'
                  }`} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Xarita Havolasi (Google Maps)</label>
                <input 
                  type="text" 
                  value={content.locationUrl || ''} 
                  onChange={(e) => updateField('locationUrl', e.target.value)}
                  className={`w-full px-8 py-4 border border-transparent rounded-[1.5rem] focus:ring-2 focus:ring-[#E11D48]/10 text-[10px] font-mono overflow-ellipsis ${
                    isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-50 text-gray-400'
                  }`} 
                />
              </div>
            </div>
          </section>

          {/* Music Section - NEW */}
          <section className="space-y-6">
             <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <Music size={14} /> Musiqa va Nizom
            </h3>
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-4 rounded-2xl transition-all ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                 <div className="space-y-0.5">
                    <p className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Musiqa ijrosi</p>
                    <p className="text-[9px] text-gray-400 font-medium">Taklifnoma ochilganda musiqa qo'yilsinmi?</p>
                 </div>
                 <button 
                   onClick={() => updateField('musicUrl', content.musicUrl ? '' : '/assets/die_with_a_smile.mp3')}
                   className={`w-12 h-6 rounded-full transition-all relative ${content.musicUrl ? 'bg-[#E11D48]' : isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}
                 >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${content.musicUrl ? 'left-7' : 'left-1'}`} />
                 </button>
              </div>

              {content.musicUrl !== '' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        {MUSIC_TRACKS.map(track => (
                            <button
                              key={track.url}
                              onClick={() => {
                                  const preview = document.getElementById('preview-audio') as HTMLAudioElement;
                                  if (preview) {
                                      // Toggle logic: If same URL and is playing -> Pause
                                      if (content.musicUrl === track.url && !preview.paused) {
                                          preview.pause();
                                          // Update state to trigger re-render for the bars
                                          updateField('musicUrl', track.url); 
                                      } else {
                                          updateField('musicUrl', track.url);
                                          try {
                                              preview.src = track.url;
                                              preview.load(); 
                                              preview.play().catch(e => console.log('Autoplay blocked'));
                                          } catch (e) { console.error(e); }
                                      }
                                  }
                              }}
                              className={`p-6 rounded-3xl text-left transition-all border-2 flex items-center justify-between group active:scale-[0.98] ${
                                content.musicUrl === track.url 
                                ? isDarkMode ? 'bg-white/10 border-[#E11D48] text-white shadow-xl' : 'bg-white border-[#E11D48] text-[#E11D48] shadow-xl' 
                                : isDarkMode ? 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10' : 'bg-white border-gray-50 text-gray-500 hover:border-[#FFE4E6]'
                              }`}
                            >
                                <span className="text-[11px] font-black uppercase tracking-tighter">{track.name}</span>
                                {content.musicUrl === track.url && (
                                    <div className="flex gap-1 items-end h-4">
                                        {[1,2,3].map(i => (
                                            <div 
                                                key={i} 
                                                className="w-1.5 h-full bg-[#E11D48] rounded-full animate-bounce" 
                                                style={{ 
                                                    animationDelay: `${i*0.1}s`,
                                                    // Only move if audio is NOT paused
                                                    animationPlayState: document.getElementById('preview-audio') && !(document.getElementById('preview-audio') as HTMLAudioElement).paused ? 'running' : 'paused'
                                                }} 
                                            />
                                        ))}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex flex-col gap-3">
                            <label className="text-[9px] font-black text-gray-400 uppercase ml-2 tracking-widest leading-none">Maxsus Musiqa</label>
                            <label className={`
                                relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-[2rem] transition-all cursor-pointer group
                                ${isUploading ? 'bg-gray-50 border-gray-200' : isDarkMode ? 'bg-white/5 border-white/10 hover:border-[#E11D48]' : 'bg-white border-[#FFE4E6] hover:border-[#E11D48] hover:bg-[#FFF9FA]'}
                            `}>
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="audio/*"
                                    onChange={handleMusicUpload}
                                    disabled={isUploading}
                                />
                                {isUploading ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 size={32} className="text-[#E11D48] animate-spin" />
                                        <p className="text-[10px] font-black uppercase text-[#E11D48] tracking-widest animate-pulse">Yuklanmoqda...</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-[#E11D48]/5 rounded-full flex items-center justify-center text-[#E11D48] group-hover:scale-110 group-hover:bg-[#E11D48]/10 transition-all">
                                            <Upload size={24} />
                                        </div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Muzika Yuklash (MP3)</p>
                                        <p className="text-[9px] text-gray-400 font-medium tracking-tight">O'zingizga yoqqan musiqani tanlang</p>
                                    </div>
                                )}
                            </label>
                        </div>

                        <div className="relative pt-2">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className={`w-full border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}></div>
                            </div>
                            <div className="relative flex justify-center text-center">
                                <span className={`px-4 text-[8px] font-black text-gray-300 uppercase tracking-[0.3em] ${isDarkMode ? 'bg-[#141416]' : 'bg-white'}`}>Yoki havola orqali</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                <input 
                  type="text" 
                  value={content.musicUrl || ''} 
                  onChange={(e) => updateField('musicUrl', e.target.value)}
                  placeholder="https://example.com/music.mp3"
                  className={`w-full px-8 py-5 border-2 border-transparent rounded-[1.5rem] focus:border-[#E11D48]/10 focus:ring-4 focus:ring-[#E11D48]/5 outline-none transition-all text-[11px] font-mono ${
                    isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-400'
                  }`} 
                />
                        </div>
                    </div>
                </div>
              )}
            </div>
          </section>

          {/* Card Info - NEW SECTION */}
          <section className="space-y-6 pb-20">
             <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <CreditCard size={14} /> To'yona uchun Karta raqami
            </h3>
            <div className={`space-y-5 p-8 rounded-[2.5rem] border ring-1 transition-all ${
                isDarkMode ? 'bg-[#1E1E22] border-white/5 ring-white/5' : 'bg-[#FFF1F2] border-[#FFE4E6] ring-[#FFE4E6]'
            }`}>
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
                  className={`w-full px-8 py-5 border rounded-2xl focus:ring-4 focus:ring-[#E11D48]/10 outline-none text-sm font-mono tracking-widest shadow-sm ${
                    isDarkMode ? 'bg-white/5 border-white/5 text-white' : 'bg-white border-gray-100 text-gray-900'
                  }`} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">Karta egasining Ismi</label>
                <input 
                  type="text" 
                  value={content.cardName || ''} 
                  onChange={(e) => updateField('cardName', e.target.value)}
                  placeholder="MUROD PRIQULOV"
                  className={`w-full px-8 py-5 border rounded-2xl focus:ring-4 focus:ring-[#E11D48]/10 outline-none text-sm font-bold uppercase shadow-sm ${
                    isDarkMode ? 'bg-white/5 border-white/5 text-white' : 'bg-white border-gray-100 text-gray-900'
                  }`} 
                />
              </div>
              <p className="text-[9px] text-gray-400 italic px-2">Karta ma'lumotlari taklifnomaning sovg'alar bo'limida ko'rinadi.</p>
            </div>
          </section>
        </div>

        {/* Footer Action - Desktop Only */}
        <div className={`hidden lg:block p-6 border-t sticky bottom-0 z-30 shadow-[0_-20px_40px_rgba(0,0,0,0.02)] transition-all duration-500 ${
            isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-[#FFE4E6]'
        }`}>
          <button 
            onClick={handleExport}
            className="group w-full py-5 bg-[#E11D48] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(225,29,72,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isPaid ? (isCopied ? <CheckCircle size={20} /> : <Share2 size={20} />) : <ExternalLink size={20} />}
            {isPaid ? (isCopied ? 'HAVOLA NUSXALANDI!' : 'HAVOLANI OLISH') : 'TO\'LOV VA EKSPORT'}
          </button>
        </div>
      </div>

      {/* Expert Preview Pane */}
      <div className={`flex-1 flex items-center justify-center overflow-x-hidden transition-all duration-500 ${activeTab === 'edit' ? 'hidden lg:flex' : 'flex'} min-h-screen lg:min-h-0 relative ${
          isDarkMode ? 'bg-[#0F0F11]' : 'bg-gray-50'
      }`}>
        <div className={`absolute inset-0 opacity-40 ${isDarkMode ? 'bg-[radial-gradient(circle_at_50%_40%,#E11D48_0%,transparent_60%)]' : 'bg-[radial-gradient(circle_at_50%_40%,#FFE4E6_0%,transparent_60%)]'}`}></div>
        
        {/* Mobile View: No Frame, Full Height */}
        <div className="lg:hidden w-full h-full relative z-10 overflow-y-auto">
             <TemplatePreview content={content} />
        </div>

        {/* Desktop View: With Device Frame */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block relative z-10 scale-[0.8] md:scale-95 xxl:scale-110"
        >
            <div className="absolute -inset-10 bg-black/10 blur-[100px] rounded-full opacity-10" />
            
            {/* Device Frame */}
            <div className="w-[385px] h-[795px] bg-gray-900 rounded-[3.8rem] p-3 shadow-[0_50px_120px_rgba(0,0,0,0.3)] border-[10px] border-gray-800 relative ring-1 ring-gray-700/50">
                {/* Dynamic Island */}
                <div className="absolute top-9 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-[1000] shadow-inner flex items-center justify-center">
                    <div className="w-14 h-1.5 bg-gray-950/20 rounded-full" />
                </div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden relative shadow-inner">
                    <TemplatePreview content={content} />
                    
                    {/* Floating Status */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[150]">
                      <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/10">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                         <span className="text-[9px] font-black text-white uppercase tracking-widest">REAL-TIME PREVIEW</span>
                      </div>
                    </div>
                </div>

                {/* Device Buttons */}
                <div className="absolute top-36 -left-3 w-1.5 h-14 bg-gray-800 rounded-r-lg" />
                <div className="absolute top-56 -left-3 w-1.5 h-24 bg-gray-800 rounded-r-lg" />
                <div className="absolute top-36 -right-3 w-1.5 h-28 bg-gray-800 rounded-l-lg" />
            </div>
        </motion.div>
      </div>

      {/* Mobile Navigation Tabs */}
      <div className={`lg:hidden fixed bottom-0 left-0 w-full border-t flex z-[150] pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ${
          isDarkMode ? 'bg-[#141416]/95 border-white/5 backdrop-blur-xl' : 'bg-white/95 border-[#FFE4E6]/50 backdrop-blur-xl'
      }`}>
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
                className="w-14 h-14 bg-[#E11D48] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#E11D48]/30 active:scale-90 transition-all border-4 border-white dark:border-[#141416]"
              >
                  {isSaving ? <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : <Share2 size={24} />}
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

      {/* Hidden Audio for Previewing */}
      <audio id="preview-audio" className="hidden" />

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
