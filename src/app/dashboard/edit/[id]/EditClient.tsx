'use client';

import React, { useState, useEffect } from 'react';
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
  Send,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { InvitationContent } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import TemplatePreview, { templates } from '@/components/dashboard/TemplatePreview';
import PaymentModal from '@/components/dashboard/PaymentModal';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const MUSIC_TRACKS = [
    { name: 'Die With A Smile (LADY GAGA)', url: '/assets/die_with_a_smile.mp3' },
    { name: 'Alex Warren - Ordinary Wedding', url: '/assets/Alex_Warren_Ordinary_Wedding_Version_Official_Music_Video.mp3' },
    { name: "Mendelssohn's Wedding March", url: "/assets/Mendelssohn's Wedding March.mp3" },
    { name: 'Wedding Nasheed (English)', url: '/assets/Wedding Nasheed _ Muhammad Al Muqit (English Lyrics).mp3' },
    { name: 'Narins Beauty Wedding Entrance', url: '/assets/Narins_Beauty_Wedding_Entrance_Music_موسيقة_عرس_نارين_بيوتي.mp3' }
];

const INITIAL_CONTENT: InvitationContent = {
  groomName: 'Kuyov',
  brideName: 'Kelin',
  date: '',
  time: '',
  locationName: '',
  locationAddress: '',
  locationUrl: '',
  imageUrl: 'https://images.pexels.com/photos/30206324/pexels-photo-30206324/free-photo-of-elegant-gold-wedding-rings-on-marble-surface.jpeg',
  musicUrl: '',
  theme: 'pink-flower',
  cardNumber: '',
  cardName: '',
  showGift: false,
  description: "Bizning hayotimizdagi eng muhim va unutilmas kunda yonimizda bo'lishingizdan bag'oyatda xursandmiz."
};

export default function EditClient({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template');
  
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
  const { user } = useAuth();
  const isDarkMode = theme === 'dark';

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'imageUrl' | 'imageUrl2' | 'imageUrl3' = 'imageUrl') => {
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

        updateField(fieldName, publicUrl);
    } catch (err: any) {
        console.error('IMAGE UPLOAD ERROR:', err);
        const localUrl = URL.createObjectURL(file);
        updateField(fieldName, localUrl);
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
        if (file.size > 15 * 1024 * 1024) throw new Error("Maksimal 15MB fayl yuklash mumkin.");

        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
        let publicUrl = "";

        if (bucketError || !buckets.find(b => b.name === 'invitations')) {
          publicUrl = URL.createObjectURL(file);
        } else {
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

        updateField('musicUrl', publicUrl);
        
        const audio = document.getElementById('preview-audio') as HTMLAudioElement;
        if (audio) {
            audio.src = publicUrl;
            audio.load();
        }

    } catch (err: any) {
        console.error('UPLOAD ERROR:', err);
        try {
          const localUrl = URL.createObjectURL(file);
          updateField('musicUrl', localUrl);
        } catch (e) {
          alert("Xatolik: " + (err.message || "Musiqani yuklab bo'lmadi"));
        }
    } finally {
        setIsUploading(false);
    }
  };

  const generateSlug = (groom: string, bride: string, date: string) => {
    const clean = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const dateStr = date || '';
    const parts = dateStr.split('-');
    const [year, month, day] = parts.length >= 3 ? parts : ['00', '00', '00'];
    const shortDate = `${day}-${month}`;
    return `${clean(groom || 'kuyov')}-${clean(bride || 'kelin')}-${shortDate}`;
  };

  const fetchStatus = async () => {
    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('content, is_paid')
            .eq('id', id)
            .single();
            
        if (data && !error) {
            if (data.is_paid !== isPaid) {
                setIsPaid(data.is_paid);
                if (data.is_paid) setShowPayment(true);
            }
            return data;
        }
    } catch (e) { console.error(e); }
    return null;
  };

  useEffect(() => {
    const initFetch = async () => {
        const data = await fetchStatus();
        if (data) {
            const finalContent = { ...data.content };
            if (finalContent.theme === 'gold-white' || finalContent.theme === 'pink-white' || !finalContent.theme) {
                if (finalContent.theme !== 'pink-flower') {
                    finalContent.theme = 'pink-flower';
                }
            }
            if (finalContent.date && finalContent.date.includes('-')) {
                const parts = finalContent.date.split('-');
                if (parts.length === 3) {
                    const [y, m, d] = parts;
                    finalContent.date = `${d}.${m}.${y}`;
                }
            }
            setContent(finalContent);
        } else {
            const localData = localStorage.getItem('taklifnoma_invitations');
            if (localData) {
                const invites = JSON.parse(localData);
                const currentInvite = invites.find((inv: any) => inv.id === id);
                if (currentInvite) {
                    const finalContent = { ...currentInvite.content };
                    if (finalContent.theme === 'gold-white' || finalContent.theme === 'pink-white' || !finalContent.theme) {
                        if (finalContent.theme !== 'pink-flower') {
                            finalContent.theme = 'pink-flower';
                        }
                    }
                    setContent(finalContent);
                    setIsPaid(currentInvite.is_paid);
                }
            }
        }
    };
    initFetch();
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaid) {
        interval = setInterval(() => {
            fetchStatus();
        }, 10000);
    }
    return () => clearInterval(interval);
  }, [isPaid, id]);

  const updateField = (field: keyof InvitationContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (forcedPhone?: string) => {
    setIsSaving(true);
    const finalSlug = generateSlug(content.groomName, content.brideName, content.date);
    const finalContent = forcedPhone ? { ...content, phone: forcedPhone } : content;

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

        const { error } = await supabase
            .from('invitations')
            .upsert({
                id: id,
                slug: finalSlug,
                content: finalContent,
                phone: finalContent.phone, 
                is_paid: isPaid,
                user_id: user?.id
            });
            
        if (error) throw error;
        
        if (isPaid) {
            const url = `https://taklifnoma.asia/${finalSlug}`;
            navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    } catch (err: any) {
        console.error('SAVE ERROR:', err);
    } finally {
        setIsSaving(false);
    }
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleExport = () => {
      // If already paid, just save and show copy notification
      if (isPaid) {
          handleSave();
          return;
      }

      // If not paid, trigger payment modal
      setShowPayment(true);

      const isValidPhone = content.phone && content.phone.startsWith('+998') && content.phone.length >= 17;
      if (isValidPhone) {
          handleSave();
          return;
      }
      const savedPhone = localStorage.getItem('user_phone');
      if (savedPhone && savedPhone.startsWith('+998') && savedPhone.length >= 17) {
          setContent(prev => ({ ...prev, phone: savedPhone }));
          handleSave(savedPhone);
          return;
      }
      window.dispatchEvent(new CustomEvent('trigger-lead-modal', { 
          detail: { forced: true, invitationId: id } 
      }));
  };

  return (
    <div className={`flex flex-col lg:flex-row h-screen lg:overflow-hidden transition-all duration-500 relative ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#FFF9FA]'}`}>
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
                    : 'bg-orange-500/10 text-orange-500 border-orange-500/20 animate-pulse'
                }`}>
                    {isPaid ? 'Faol ✅' : 'To\'lov kutilmoqda'}
                </div>
                <button 
                  onClick={() => handleSave()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#E11D48] text-white rounded-xl transition-all shadow-lg shadow-[#E11D48]/20"
                >
                    {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    <span className="text-[9px] font-black uppercase tracking-widest">Saqlash</span>
                </button>
            </div>
          </div>
          
          <div className={`flex p-1 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <button onClick={() => setIsPreviewMobile(true)} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${isPreviewMobile ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>
                <Smartphone size={14} /> Mobil
            </button>
            <button onClick={() => setIsPreviewMobile(false)} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${!isPreviewMobile ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>
                <Monitor size={14} /> Desktop
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-12 no-scrollbar">
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <Heart size={14} fill="currentColor" /> Asosiy ma'lumotlar
            </h3>
            <div className="space-y-5">
              <input type="text" placeholder="Kuyov" value={content.groomName} onChange={(e) => updateField('groomName', e.target.value)} className={`w-full px-8 py-5 rounded-[1.5rem] text-sm font-bold ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`} />
              <input type="text" placeholder="Kelin" value={content.brideName} onChange={(e) => updateField('brideName', e.target.value)} className={`w-full px-8 py-5 rounded-[1.5rem] text-sm font-bold ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`} />
              <textarea rows={3} value={content.description} onChange={(e) => updateField('description', e.target.value)} className={`w-full px-8 py-5 rounded-[1.5rem] text-sm font-bold resize-none ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`} />
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <Calendar size={14} /> Vaqt va Sana
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="15.05.2026" value={content.date} onChange={(e) => updateField('date', e.target.value)} className={`w-full px-6 py-5 rounded-[1.5rem] text-sm font-bold ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`} />
              <input type="text" placeholder="18:00" value={content.time} onChange={(e) => updateField('time', e.target.value)} className={`w-full px-6 py-5 rounded-[1.5rem] text-sm font-bold ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`} />
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <MapPin size={14} /> Manzil
            </h3>
            <div className="space-y-4">
              <input type="text" placeholder="Joy nomi" value={content.locationName} onChange={(e) => updateField('locationName', e.target.value)} className={`w-full px-8 py-5 rounded-[1.5rem] text-sm font-bold ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`} />
              <input type="text" placeholder="Manzil" value={content.locationAddress} onChange={(e) => updateField('locationAddress', e.target.value)} className={`w-full px-8 py-5 rounded-[1.5rem] text-sm font-bold ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`} />
              <input type="text" placeholder="Xarita havolasi" value={content.locationUrl} onChange={(e) => updateField('locationUrl', e.target.value)} className={`w-full px-8 py-4 rounded-[1.5rem] text-[10px] font-mono ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-50 text-gray-400'}`} />
            </div>
          </section>

          <section className="space-y-6">
             <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <ImageIcon size={14} /> Rasm
            </h3>
             <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Asosiy rasm (Hero)</label>
                    <div className={`relative w-full aspect-video rounded-[1.5rem] overflow-hidden border-2 border-dashed ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <img src={content.imageUrl} alt="Hero" className="w-full h-full object-cover" />
                        <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 opacity-0 hover:opacity-100 transition-all text-white text-[10px] font-bold uppercase">
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'imageUrl')} />
                            {isImageUploading ? <Loader2 size={24} className="animate-spin" /> : 'O\'zgartirish'}
                        </label>
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">O'rtadagi rasm</label>
                    <div className={`relative w-full aspect-video rounded-[1.5rem] overflow-hidden border-2 border-dashed ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <img src={content.imageUrl2 || content.imageUrl} alt="Middle" className="w-full h-full object-cover" />
                        <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 opacity-0 hover:opacity-100 transition-all text-white text-[10px] font-bold uppercase">
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'imageUrl2')} />
                            'O\'zgartirish'
                        </label>
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Pastki rasm</label>
                    <div className={`relative w-full aspect-video rounded-[1.5rem] overflow-hidden border-2 border-dashed ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <img src={content.imageUrl3 || content.imageUrl} alt="Bottom" className="w-full h-full object-cover" />
                        <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 opacity-0 hover:opacity-100 transition-all text-white text-[10px] font-bold uppercase">
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'imageUrl3')} />
                            'O\'zgartirish'
                        </label>
                    </div>
                </div>
             </div>
          </section>

          <section className="space-y-6">
             <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                <Music size={14} /> Musiqa
            </h3>
            <div className="grid grid-cols-1 gap-3">
                {MUSIC_TRACKS.map(track => (
                    <button key={track.url} onClick={() => updateField('musicUrl', track.url)} className={`p-4 rounded-2xl text-[10px] font-bold uppercase tracking-tight border ${content.musicUrl === track.url ? 'bg-[#E11D48] text-white border-[#E11D48]' : isDarkMode ? 'bg-white/5 border-white/5 text-gray-500' : 'bg-white border-gray-100 text-gray-600'}`}>{track.name}</button>
                ))}
                <label className={`p-4 rounded-2xl text-[10px] font-bold uppercase tracking-tight border cursor-pointer flex items-center justify-center gap-2 border-dashed ${isDarkMode ? 'bg-white/5 border-white/20 text-gray-400' : 'bg-gray-50 border-gray-300 text-gray-500'}`}>
                    <input type="file" className="hidden" accept=".mp3, .wav, .m4a, .ogg, audio/*" onChange={handleMusicUpload} />
                    {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    {selectedMusicName || "O'z musiqangizni yuklang"}
                </label>
            </div>
          </section>

          <section className="space-y-6 pb-10">
             <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2">
                    <CreditCard size={14} /> To'yona
                </h3>
                <button onClick={() => updateField('showGift', !content.showGift)} className={`w-10 h-5 rounded-full transition-all ${content.showGift ? 'bg-[#E11D48]' : 'bg-gray-600'} relative`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${content.showGift ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              {content.showGift && (
                <div className="space-y-4">
                    <input type="text" placeholder="Karta raqami" value={content.cardNumber} onChange={(e) => updateField('cardNumber', e.target.value)} className={`w-full px-8 py-5 rounded-[1.5rem] text-sm font-bold ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`} />
                    <input type="text" placeholder="Egasi" value={content.cardName} onChange={(e) => updateField('cardName', e.target.value)} className={`w-full px-8 py-5 rounded-[1.5rem] text-sm font-bold ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`} />
                </div>
              )}
          </section>

          <section className="pb-0">
              <button 
                onClick={handleExport}
                className="w-full py-6 bg-[#E11D48] text-white rounded-[2rem] font-black text-[12px] uppercase tracking-widest shadow-2xl shadow-[#E11D48]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                  <Send size={18} /> YUBORISH
              </button>
          </section>
        </div>
      </div>

      <div className={`flex-1 relative ${activeTab === 'edit' ? 'hidden lg:block' : 'block'} bg-black/10`}>
        <div className={`absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12`}>
            <div className={`relative w-full h-full max-w-[400px] max-h-[850px] shadow-2xl rounded-[3rem] overflow-y-auto overflow-x-hidden border-[8px] no-scrollbar ${isDarkMode ? 'border-[#1A1A1E]' : 'border-white'}`}>
                <TemplatePreview content={content} isPreview={true} isMuted={isAudioMuted} />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest whitespace-nowrap">Real-time Preview</span>
                </div>
            </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 z-50">
        <button onClick={() => setActiveTab('edit')} className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'edit' ? 'bg-[#E11D48] text-white' : 'text-gray-400'}`}>Edit</button>
        <button onClick={() => setActiveTab('preview')} className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-[#E11D48] text-white' : 'text-gray-400'}`}>Preview</button>
      </div>

      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
        onSuccess={() => {
            setIsPaid(true);
            setShowPayment(false);
        }}
        price="190 000" 
        invitationId={id} 
        slug={generateSlug(content.groomName, content.brideName, content.date)} 
      />
      <LeadCaptureModal />
      <audio id="preview-audio" loop muted={isAudioMuted} />
    </div>
  );
}
