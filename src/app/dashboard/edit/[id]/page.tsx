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
  Volume2,
  VolumeX,
  Sun,
  Moon
} from 'lucide-react';
import { InvitationContent } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import TemplatePreview, { templates } from '@/components/dashboard/TemplatePreview';
import PaymentModal from '@/components/dashboard/PaymentModal';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import { useTheme } from '@/context/ThemeContext';
const MUSIC_TRACKS = [
    { name: 'Die With A Smile (LADY GAGA)', url: '/assets/die_with_a_smile.mp3' },
    { name: 'Alex Warren - Ordinary Wedding', url: '/assets/Alex_Warren_Ordinary_Wedding_Version_Official_Music_Video.mp3' },
    { name: "Mendelssohn's Wedding March", url: "/assets/Mendelssohn's Wedding March.mp3" },
    { name: 'Wedding Nasheed (English)', url: '/assets/Wedding Nasheed _ Muhammad Al Muqit (English Lyrics).mp3' },
    { name: 'Narins Beauty Wedding Entrance', url: '/assets/Narins_Beauty_Wedding_Entrance_Music_موسيقة_عرس_نارين_بيوتي.mp3' }
];

const INITIAL_CONTENT: InvitationContent = {
  groomName: 'Ali',
  brideName: 'Laylo',
  date: '',
  time: '',
  locationName: '',
  locationAddress: '',
  locationUrl: '',
  imageUrl: 'https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg',
  musicUrl: '',
  theme: 'pink-luxury',
  cardNumber: '',
  cardName: '',
  showGift: false,
  description: "Bizning hayotimizdagi eng muhim va unutilmas kunda yonimizda bo'lishingizdan bag'oyatda xursandmiz. Ushbu kunni biz bilan baham ko'ring."
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
  const [selectedMusicName, setSelectedMusicName] = useState<string>("");
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
        alert("Rasm o'lchami juda katta (Maksimal 5MB)!");
        return;
    }

    setIsImageUploading(true);
    try {
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
        let publicUrl = "";

        if (bucketError || !buckets.find(b => b.name === 'invitations')) {
          publicUrl = URL.createObjectURL(file);
        } else {
          const fileExt = file.name.split('.').pop();
          const fileName = `${id}-${Date.now()}.${fileExt}`;
          const filePath = `images/${fileName}`;

          const { error: uploadError } = await supabase.storage
              .from('invitations')
              .upload(filePath, file, { cacheControl: '3600', upsert: false });

          if (uploadError) throw uploadError;

          const { data: { publicUrl: supabaseUrl } } = supabase.storage
              .from('invitations')
              .getPublicUrl(filePath);
          
          publicUrl = supabaseUrl;
        }

        updateField('imageUrl', publicUrl);
    } catch (err: any) {
        console.error('IMAGE UPLOAD ERROR:', err);
        const localUrl = URL.createObjectURL(file);
        updateField('imageUrl', localUrl);
    } finally {
        setIsImageUploading(false);
    }
  };

  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedMusicName(file.name);

    if (file.size > 10 * 1024 * 1024) {
        alert("Fayl o'lchami juda katta (Maksimal 10MB)!");
        return;
    }

    setIsUploading(true);
    try {
        // Validation
        if (file.size > 15 * 1024 * 1024) throw new Error("Maksimal 15MB fayl yuklash mumkin.");

        // 1. Initial connection check & Bucket check
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
        
        let publicUrl = "";

        if (bucketError || !buckets.find(b => b.name === 'invitations')) {
          console.warn("Supabase Storage ulanmadi yoki 'invitations' bucket yo'q. Local preview rejimiga o'tildi.");
          // LOCAL FALLBACK: Create a local URL for instant preview
          publicUrl = URL.createObjectURL(file);
        } else {
          // SUPABASE UPLOAD (Standard flow)
          const fileExt = file.name.split('.').pop();
          const fileName = `${id}-${Date.now()}.${fileExt}`;
          const filePath = `music/${fileName}`;

          const { error: uploadError } = await supabase.storage
              .from('invitations')
              .upload(filePath, file, { cacheControl: '3600', upsert: false });

          if (uploadError) throw uploadError;

          const { data: { publicUrl: supabaseUrl } } = supabase.storage
              .from('invitations')
              .getPublicUrl(filePath);
          
          publicUrl = supabaseUrl;
        }

        // Apply URL (Either Supabase or Local Blob)
        updateField('musicUrl', publicUrl);
        
        // Auto-play preview
        const audio = document.getElementById('preview-audio') as HTMLAudioElement;
        if (audio) {
            audio.src = publicUrl;
            audio.load();
            audio.play().catch(e => console.log('Autoplay blocked preview'));
        }

    } catch (err: any) {
        console.error('UPLOAD ERROR:', err);
        // Fallback to local even on unexpected crash
        try {
          const localUrl = URL.createObjectURL(file);
          updateField('musicUrl', localUrl);
          alert("Musiqa lokal rejimda yuklandi (Serverda xatolik bo'lgani uchun). Sahifa yangilanguncha ishlaydi.");
        } catch (e) {
          alert("Xatolik: " + (err.message || "Musiqani yuklab bo'lmadi"));
        }
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
            const finalContent = { ...data.content };
            if (finalContent.theme === 'gold-white' || !finalContent.theme) {
                finalContent.theme = 'pink-luxury';
            }
            // Sanani DD.MM.YYYY formatiga o'tkazish (Agar u YYYY-MM-DD bo'lsa)
            if (finalContent.date && finalContent.date.includes('-')) {
                const [y, m, d] = finalContent.date.split('-');
                finalContent.date = `${d}.${m}.${y}`;
            }

            // CLEANUP LEGACY SAMPLE DATA
            if (finalContent.locationName === 'Tantana Milliy Taomlar') finalContent.locationName = '';
            if (finalContent.locationAddress === 'Toshkent shahar') finalContent.locationAddress = '';
            if (finalContent.locationUrl === 'https://maps.app.goo.gl/syEH2lA3FxpMpb7z7') finalContent.locationUrl = '';
            if (!finalContent.description) finalContent.description = "Bizning hayotimizdagi eng muhim va unutilmas kunda yonimizda bo'lishingizdan bag'oyatda xursandmiz. Ushbu kunni biz bilan baham ko'ring.";
            
            setContent(finalContent);
        } else {
            // Fallback to LocalStorage
            const localData = localStorage.getItem('taklifnoma_invitations');
            if (localData) {
                const invites = JSON.parse(localData);
                const currentInvite = invites.find((inv: any) => inv.id === id);
                if (currentInvite) {
                    const finalContent = { ...currentInvite.content };
                    if (finalContent.theme === 'gold-white' || !finalContent.theme) {
                        finalContent.theme = 'pink-luxury';
                    }
                    if (finalContent.date && finalContent.date.includes('-')) {
                        const [y, m, d] = finalContent.date.split('-');
                        finalContent.date = `${d}.${m}.${y}`;
                    }

                    // CLEANUP LEGACY SAMPLE DATA
                    if (finalContent.locationName === 'Tantana Milliy Taomlar') finalContent.locationName = '';
                    if (finalContent.locationAddress === 'Toshkent shahar') finalContent.locationAddress = '';
                    if (finalContent.locationUrl === 'https://maps.app.goo.gl/syEH2lA3FxpMpb7z7') finalContent.locationUrl = '';
                    if (!finalContent.description) finalContent.description = "Bizning hayotimizdagi eng muhim va unutilmas kunda yonimizda bo'lishingizdan bag'oyatda xursandmiz. Ushbu kunni biz bilan baham ko'ring.";

                    setContent(finalContent);
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

  // 3. Listen for phone updates from LeadCaptureModal
  useEffect(() => {
      const handleUpdated = (e: any) => {
          if (e.detail?.phone) {
              setContent(prev => ({ ...prev, phone: e.detail.phone }));
              // After phone is updated, proceed to save immediately with direct parameter
              handleSave(e.detail.phone); 
          }
      };
      window.addEventListener('invitation-updated', handleUpdated);
      return () => window.removeEventListener('invitation-updated', handleUpdated);
  }, []);

  // Update content field
  const updateField = (field: keyof InvitationContent, value: any) => {
    setContent(prev => {
        const newContent = { ...prev, [field]: value };
        return newContent;
    });
  };

  const handleSave = async (forcedPhone?: string) => {
    setIsSaving(true);
    
    // Generate slug from names and date
    const finalSlug = generateSlug(content.groomName, content.brideName, content.date);
    
    // Final content with potential forced phone
    const finalContent = forcedPhone ? { ...content, phone: forcedPhone } : content;

    // 1. Always save to LocalStorage FIRST
    try {
        const localData = localStorage.getItem('taklifnoma_invitations');
        let invites = localData ? JSON.parse(localData) : [];
        const index = invites.findIndex((inv: any) => inv.id === id);
        
        if (index !== -1) {
            invites[index] = { ...invites[index], slug: finalSlug, content: finalContent, is_paid: isPaid };
        } else {
            invites.push({ id, slug: finalSlug, content: finalContent, is_paid: isPaid });
        }
        localStorage.setItem('taklifnoma_invitations', JSON.stringify(invites));

        // 2. Sync with Supabase (CRITICAL FOR CROSS-DEVICE CONSISTENCY)
        try {
            const { error } = await supabase
                .from('invitations')
                .upsert({
                    id: id,
                    slug: finalSlug,
                    content: finalContent,
                    phone: finalContent.phone, 
                    is_paid: isPaid
                });
                
            if (error) {
                console.error('DATABASE SYNC ERROR:', error);
                alert("Bazaga saqlashda xatolik! Supabase'da INSERT/UPDATE ruxsatlarini (public) tekshiring: " + error.message);
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
      // 1. Check if we already have a valid phone number in the content
      const isValidPhone = content.phone && content.phone.startsWith('+998') && content.phone.length >= 17;
      
      if (isValidPhone) {
          handleSave();
          return;
      }

      // 2. If missing, check if we have a valid one in localStorage
      const savedPhone = localStorage.getItem('user_phone');
      const isSavedValid = savedPhone && savedPhone.startsWith('+998') && savedPhone.length >= 17;

      if (isSavedValid) {
          // Found a real number! Associate and proceed immediately
          setContent(prev => ({ ...prev, phone: savedPhone }));
          handleSave(savedPhone); // Direct pass for instant sync
          return;
      }

      // 3. If still no valid number, force the modal
      window.dispatchEvent(new CustomEvent('trigger-lead-modal', { 
          detail: { 
              forced: true,
              invitationId: id 
          } 
      }));
  };

  return (
    <div className={`flex flex-col lg:flex-row h-screen lg:overflow-hidden transition-all duration-500 relative ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#FFF9FA]'}`}>
      {/* Editor Pane */}
      <div className={`w-full lg:w-[450px] border-r flex flex-col shadow-xl z-20 transition-all duration-500 ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'} h-screen ${
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
                onClick={handleExport}
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
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Taklif matni</label>
                <textarea 
                  rows={3}
                  value={content.description || ''} 
                  onChange={(e) => updateField('description', e.target.value)}
                  className={`w-full px-8 py-5 border border-transparent rounded-[1.5rem] focus:ring-4 focus:ring-[#E11D48]/10 outline-none transition-all text-sm font-bold shadow-inner resize-none ${
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
                  placeholder="15.05.2026"
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
                  className={`w-full px-8 py-5 border border-transparent rounded-[1.5rem] focus:ring-4 focus:ring-[#E11D48]/10 outline-none transition-all text-sm font-bold ${
                    isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'
                  }`} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Xarita Havolasi</label>
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

          {/* Image Section - NEW */}
          <section className="space-y-6">
             <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <ImageIcon size={14} /> Asosiy rasm
            </h3>
            <div className={`
                relative w-full aspect-video rounded-[2rem] overflow-hidden border-2 border-dashed transition-all group
                ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-[#E11D48]' : 'bg-gray-50 border-gray-200 hover:border-[#E11D48] hover:bg-[#FFF9FA]'}
            `}>
                <img 
                    src={content.imageUrl} 
                    alt="Preview" 
                    className={`w-full h-full object-cover transition-all duration-500 ${isImageUploading ? 'opacity-30 blur-sm' : 'opacity-100'}`} 
                />
                
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/40 opacity-0 group-hover:opacity-100 transition-all">
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    {isImageUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 size={24} className="text-white animate-spin" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Yuklanmoqda...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Upload size={24} className="text-white" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Rasmni o'zgartirish</span>
                        </div>
                    )}
                </label>

                {isImageUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                         <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
            <p className="text-[9px] text-gray-400 font-medium px-2">Eng yaxshi ko'rinish uchun vertikal (portret) rasm yuklang.</p>
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
                                    /* barcha fayllarni ko'rsatish */
                                    onChange={handleMusicUpload}
                                />
                                {isUploading ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 size={32} className="text-[#E11D48] animate-spin" />
                                        <p className="text-[10px] font-black uppercase text-[#E11D48] tracking-widest animate-pulse">Yuklanmoqda...</p>
                                    </div>
                                ) : selectedMusicName ? (
                                    <div className="flex flex-col items-center gap-3 text-center px-4">
                                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-1">
                                            <CheckCircle size={24} />
                                        </div>
                                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl w-full justify-between mt-2">
                                          <div className="flex items-center gap-2">
                                            <div className="p-2 bg-[#E11D48]/10 rounded-lg text-[#E11D48]">
                                              {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Ovozni tekshirish</span>
                                          </div>
                                          <button 
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setIsAudioMuted(!isAudioMuted);
                                            }}
                                            className={`relative w-10 h-5 rounded-full transition-all duration-300 focus:outline-none ${
                                              !isAudioMuted ? 'bg-[#E11D48]' : 'bg-gray-600'
                                            }`}
                                          >
                                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${
                                              !isAudioMuted ? 'left-6' : 'left-1'
                                            }`} />
                                          </button>
                                        </div>
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

                    </div>
                </div>
              )}
            </div>
          </section>

          {/* Card Info - NEW SECTION */}
          <section className="space-y-6 pb-20">
             <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                    <CreditCard size={14} /> To'yona uchun Karta raqami
                </h3>
                <button 
                  onClick={() => updateField('showGift', !content.showGift)}
                  className={`relative w-10 h-5 rounded-full transition-all duration-300 focus:outline-none ${
                    content.showGift ? 'bg-[#E11D48]' : 'bg-gray-600'
                  }`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${
                    content.showGift ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

             <AnimatePresence>
                {content.showGift && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-8 rounded-[2.5rem] border-2 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#FFE4E6]'} space-y-8`}>
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-gray-400 uppercase ml-2 tracking-widest leading-none">Karta raqami</label>
                            <input 
                                type="text" 
                                value={content.cardNumber || ''}
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/\s/g, '');
                                    if (raw.length <= 16) {
                                        const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
                                        updateField('cardNumber', formatted);
                                    }
                                }}
                                className={`w-full px-8 py-5 rounded-[2rem] border-2 transition-all outline-none text-center text-lg font-black tracking-[0.2em] ${isDarkMode ? 'bg-white/10 border-white/10 text-white focus:border-[#E11D48]' : 'bg-gray-50 border-gray-100 text-gray-900 focus:border-[#E11D48]'}`}
                                placeholder="8600 **** **** ****"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-gray-400 uppercase ml-2 tracking-widest leading-none">Karta egasining ismi</label>
                            <input 
                                type="text" 
                                value={content.cardName || ''}
                                onChange={(e) => updateField('cardName', e.target.value)}
                                className={`w-full px-8 py-5 rounded-[2rem] border-2 transition-all outline-none text-center text-sm font-black uppercase tracking-widest ${isDarkMode ? 'bg-white/10 border-white/10 text-white focus:border-[#E11D48]' : 'bg-gray-50 border-gray-100 text-gray-900 focus:border-[#E11D48]'}`}
                                placeholder="ISM FAMILIYA"
                            />
                        </div>

                        <p className="text-[10px] text-gray-400 text-center italic font-medium">Karta ma'lumotlari taklifnomaning sovg'alar bo'limida ko'rinadi.</p>
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
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
       <div className={`flex-1 flex items-center justify-center overflow-x-hidden transition-all duration-500 ${activeTab === 'edit' ? 'hidden lg:flex' : 'flex'} h-screen relative pt-12 pb-24 ${
          isDarkMode ? 'bg-[#0F0F11]' : 'bg-gray-50'
      }`}>
        <div className={`absolute inset-0 opacity-40 ${isDarkMode ? 'bg-[radial-gradient(circle_at_50%_40%,#E11D48_0%,transparent_60%)]' : 'bg-[radial-gradient(circle_at_50%_40%,#FFE4E6_0%,transparent_60%)]'}`}></div>
        
        {/* Mobile View: No Frame, Full Height */}
        <div className="lg:hidden w-full h-full relative z-10 overflow-y-auto scroll-smooth">
             <TemplatePreview content={content} isMuted={isAudioMuted} />
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
                <div className="w-full h-full bg-white rounded-[2.8rem] overflow-y-auto relative shadow-inner no-scrollbar scroll-smooth">
                    <TemplatePreview content={content} isMuted={isAudioMuted} />
                    
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
                onClick={handleExport}
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
      <audio id="preview-audio" className="hidden" muted={isAudioMuted} />

      <div className="fixed bottom-24 right-8 z-[200] flex flex-col gap-3">
          <button 
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all ${
              isAudioMuted ? 'bg-gray-800 text-white' : 'bg-[#E11D48] text-white animate-pulse'
            }`}
          >
            {isAudioMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
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
      <LeadCaptureModal />
    </div>
  );
}
