import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, CheckCircle, ShieldCheck, X, ArrowRight, Heart, Copy, Send, Clock, Share2, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/context/ThemeContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  price?: string;
  invitationId?: string; // This is the ID (e.g. 361twks)
  slug?: string;        // This is the slug (e.g. betxover-kelin-20-05)
  isPaid?: boolean;
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  price = "190 000", 
  invitationId,
  slug,
  isPaid: initialPaid = false 
}: PaymentModalProps) {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [copied, setCopied] = useState(false);
  const [isPaid, setIsPaid] = useState(initialPaid);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  // Realtime subscription for instant payment confirmation
  useEffect(() => {
    if (!isOpen || isPaid || !invitationId) return;

    // 1. Initial check on mount/open
    const checkStatus = async () => {
        const { data } = await supabase
          .from('invitations')
          .select('is_paid')
          .eq('id', invitationId)
          .single();
        
        if (data?.is_paid) {
          setIsPaid(true);
          onSuccess();
        }
    };
    checkStatus();

    // 2. Realtime listener for the specific record
    const channel = supabase
      .channel(`payment_sync_${invitationId}`)
      .on('postgres_changes', { 
          event: 'UPDATE', 
          table: 'invitations', 
          schema: 'public',
          filter: `id=eq.${invitationId}` 
      }, (payload) => {
          if (payload.new.is_paid) {
              setIsPaid(true);
              setStep('success');
              onSuccess();
          }
      })
      .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
  }, [isOpen, isPaid, invitationId, onSuccess]);

  // Sync initialPaid prop
  useEffect(() => {
    setIsPaid(initialPaid);
  }, [initialPaid]);

  const handlePay = () => {
    if (!formData.cardNumber) return;
    setStep('processing');
    setTimeout(() => {
        setStep('success');
    }, 2500);
  };

  const handleCopy = () => {
    if (!isPaid) return;
    const url = `https://taklifnoma.asia/${slug || invitationId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!isPaid) return;
    const url = `https://taklifnoma.asia/${slug || invitationId}`;
    const text = "Sizni nikoh oqshomimizga lutfan taklif etamiz:";
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1000] flex items-center justify-center p-6"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed z-[1010] w-full max-w-lg rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.2)] border overflow-hidden transition-all duration-500 ${
                isDarkMode ? 'bg-[#141416] border-white/5' : 'bg-white border-[#FFE4E6]'
            }`}
          >
            {step === 'details' && (
                <div className="p-10 space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar">
                    <header className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className={`font-playfair text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {isPaid ? 'Tabriklaymiz!' : 'To\'lov'}
                            </h2>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                {isPaid ? 'Taklifnomangiz tayyor' : 'Xavfsiz va tezkor'}
                            </p>
                        </div>
                        <button onClick={onClose} className={`p-3 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/5 text-gray-500' : 'hover:bg-gray-50 text-gray-300'}`}>
                            <X size={24} />
                        </button>
                    </header>

                    {!isPaid && (
                        <div className={`rounded-[2.5rem] p-8 border relative overflow-hidden transition-all ${
                            isDarkMode ? 'bg-white/5 border-white/5' : 'bg-[#E11D48]/5 border-[#FFE4E6]/50'
                        }`}>
                            <div className="absolute top-0 right-0 p-8 text-[#E11D48] opacity-5">
                                <CreditCard size={120} />
                            </div>
                            <div className="relative space-y-2 text-center md:text-left">
                                 <p className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.3em] leading-loose opacity-80">Payme / Click / Uzum</p>
                                 <div className="flex items-baseline justify-center md:justify-start gap-2">
                                    <span className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{price}</span>
                                    <span className="text-xl font-bold text-gray-400 uppercase">so'm</span>
                                 </div>
                            </div>
                        </div>
                    )}

                    <div className={`p-6 rounded-[2rem] border border-dashed text-center space-y-4 transition-all ${
                        isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                    }`}>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Taklifnoma ID va Status</p>
                            <div className="flex flex-col items-center gap-2">
                                <p className={`text-sm font-black tracking-widest uppercase mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>ID: <span className="text-[#E11D48]">{slug || invitationId}</span></p>
                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ring-1 transition-all ${
                                    isPaid 
                                    ? 'bg-green-500/10 text-green-500 ring-green-500/20' 
                                    : isDarkMode
                                        ? 'bg-orange-500/10 text-orange-500 ring-orange-500/20 animate-pulse'
                                        : 'bg-orange-50 text-orange-600 ring-orange-100 animate-pulse'
                                }`}>
                                    {isPaid ? 'Faollashtirilgan ✅' : 'Tasdiqlanish kutilmoqda ⏳'}
                                </div>
                            </div>
                        </div>
                        
                        {isPaid ? (
                            <div className="space-y-6 pt-2 animate-fade-in">
                                <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center gap-3 text-center">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Sizning havolangiz:</p>
                                    <p className="text-sm font-mono font-bold text-[#E11D48] tracking-widest break-all px-2">taklifnoma.asia/{slug}</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <button 
                                        onClick={handleShare}
                                        className="w-full flex items-center justify-center gap-4 py-5 bg-[#229ED9] text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-[#229ED9]/20 hover:brightness-110 active:scale-95"
                                    >
                                        <Send size={18} />
                                        <span>TELEGRAM’DA ULASHISH</span>
                                    </button>
                                    <button 
                                        onClick={handleCopy}
                                        className={`w-full flex items-center justify-center gap-4 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest transition-all border-2 ${
                                            copied 
                                            ? 'bg-green-50 text-green-600 border-green-100' 
                                            : isDarkMode 
                                                ? 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                                                : 'bg-white text-gray-900 border-gray-100 hover:bg-gray-50 active:scale-95'
                                        }`}
                                    >
                                        {copied ? <CheckCircle size={18} /> : <ExternalLink size={18} />}
                                        <span>{copied ? 'NUSXALANDI!' : 'HAVOLANI NUSXALASH'}</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={`p-6 rounded-3xl border flex items-center justify-center gap-3 grayscale opacity-60 transition-all ${
                                isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-100/50 border-gray-100'
                            }`}>
                                <Clock size={16} className="text-gray-400" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tasdiqlangach ulashish mumkin</span>
                            </div>
                        )}
                    </div>

                    {!isPaid && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-4 tracking-widest leading-none">Karta raqami (UZCARD / HUMO)</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        placeholder="8600 **** **** ****"
                                        className={`w-full pl-16 pr-6 py-5 border rounded-2xl outline-none transition-all text-sm font-black tracking-widest ${
                                            isDarkMode ? 'bg-white/5 border-white/5 text-white focus:ring-white/5' : 'bg-gray-50 border-gray-100 text-gray-900 focus:ring-gray-400/5'
                                        }`}
                                        value={formData.cardNumber}
                                        onChange={(e) => {
                                            const v = e.target.value.replace(/\D/g, '');
                                            const chunks = v.match(/.{1,4}/g);
                                            setFormData({...formData, cardNumber: chunks ? chunks.join(' ') : v});
                                        }}
                                        maxLength={19}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-4 tracking-widest leading-none">Muddati</label>
                                    <input 
                                        placeholder="MM/YY"
                                        className={`w-full px-6 py-5 border rounded-2xl outline-none transition-all text-sm font-black text-center tracking-widest ${
                                            isDarkMode ? 'bg-white/5 border-white/5 text-white focus:ring-white/5' : 'bg-gray-50 border-gray-100 text-gray-900 focus:ring-gray-400/5'
                                        }`}
                                        value={formData.expiry}
                                        onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-4 tracking-widest leading-none">CVC/CVV</label>
                                    <input 
                                        placeholder="***"
                                        className={`w-full px-6 py-5 border rounded-2xl outline-none transition-all text-sm font-black text-center tracking-widest ${
                                            isDarkMode ? 'bg-white/5 border-white/5 text-white focus:ring-white/5' : 'bg-gray-50 border-gray-100 text-gray-900 focus:ring-gray-400/5'
                                        }`}
                                        value={formData.cvc}
                                        onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                                    />
                                </div>
                            </div>

                            <footer className="space-y-4 pt-4">
                                <button 
                                    disabled={!formData.cardNumber}
                                    onClick={handlePay}
                                    className="w-full flex items-center justify-center gap-4 py-6 rounded-[2rem] bg-[#E11D48] text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-[#E11D48]/30 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                                >
                                    <Lock size={18} />
                                    <span>KARTA ORQALI TO'LOV</span>
                                </button>

                                <a 
                                    href={`https://t.me/Taklifnoma_Asia?text=Assalomu alaykum, taklifnomani faollashtirmoqchi edim. ID: ${slug || invitationId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full flex items-center justify-center gap-4 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all group ${
                                        isDarkMode ? 'bg-white/5 text-[#229ED9] hover:bg-white/10' : 'bg-[#229ED9]/5 text-[#229ED9] hover:bg-[#229ED9]/10'
                                    }`}
                                >
                                    <Send size={14} className="group-hover:rotate-12 transition-transform" />
                                    <span>Telegram orqali to'lov qilish</span>
                                </a>

                                <p className="pt-2 text-center flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <ShieldCheck size={14} className="text-green-400" />
                                    Bank xavfsizligi • 3D Secure
                                </p>
                            </footer>
                        </div>
                    )}

                    {isPaid && (
                         <footer className="pt-4 text-center">
                            <button 
                                onClick={onClose}
                                className="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-500 transition-colors"
                            >
                                Yopish
                            </button>
                         </footer>
                    )}
                </div>
            )}

            {step === 'processing' && (
                <div className="p-20 text-center space-y-12">
                    <div className="relative">
                         <div className="w-24 h-24 border-4 border-[#E11D48]/10 border-t-[#E11D48] rounded-full animate-spin mx-auto"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#E11D48]">
                             <CreditCard size={32} />
                         </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className={`font-playfair text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>To'lov kutilmoqda</h3>
                        <p className="text-gray-400 text-sm font-medium">Siz bilan tez orada bog'lanamiz...</p>
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className={`p-16 text-center space-y-12 relative overflow-hidden transition-all ${isDarkMode ? 'bg-[#141416]' : 'bg-white'}`}>
                    <div className="absolute top-0 right-0 p-12 text-green-500 opacity-5">
                       <CheckCircle size={160} />
                    </div>
                    
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto border-4 transition-all ${
                        isDarkMode ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-100'
                    }`}>
                        <CheckCircle size={48} className="text-green-500" />
                    </div>

                    <div className="space-y-6 relative z-10 text-center flex flex-col items-center">
                        <div className="space-y-2">
                            <h3 className={`font-playfair text-3xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {isPaid ? 'Muvaffaqiyatli!' : 'Yuborildi!'}
                            </h3>
                            <p className="text-gray-400 text-md font-medium px-4">
                                {isPaid ? 'Sizning taklifnomangiz endi hamma uchun ochiq!' : 'Xabar yuborildi. Faollashtirish uchun Telegram\'dan skrinshot yuboring.'}
                            </p>
                        </div>
                        
                        <div className="pt-8 w-full space-y-4">
                            {isPaid ? (
                                <>
                                    <button 
                                        onClick={handleShare}
                                        className="w-full flex items-center justify-center gap-4 py-6 rounded-2xl bg-[#229ED9] text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-[#229ED9]/30 hover:brightness-110 active:scale-95 transition-all"
                                    >
                                        <Send size={20} />
                                        <span>TELEGRAM’DA ULASHISH</span>
                                    </button>
                                    <button 
                                        onClick={handleCopy}
                                        className={`w-full flex items-center justify-center gap-4 py-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border-2 ${
                                            copied 
                                            ? 'bg-green-50 text-green-600 border-green-100' 
                                            : isDarkMode 
                                                ? 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                                                : 'bg-white text-gray-900 border-gray-100 hover:bg-gray-50 active:scale-95'
                                        }`}
                                    >
                                        {copied ? <CheckCircle size={20} /> : <Share2 size={20} />}
                                        <span>{copied ? 'NUSXALANDI!' : 'HAVOLANI NUSXALASH'}</span>
                                    </button>
                                </>
                            ) : (
                                <a 
                                    href={`https://t.me/Taklifnoma_Asia?text=Assalomu alaykum, to'lov qildim. ID: ${slug || invitationId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-4 py-6 rounded-2xl bg-[#229ED9] text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-[#229ED9]/30 hover:brightness-110 active:scale-95 transition-all"
                                >
                                    <Send size={20} />
                                    <span>TELEGRAMGA OTISH</span>
                                </a>
                            )}
                            <button 
                                onClick={handleFinish}
                                className="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-500 transition-colors"
                            >
                                KABINETGA QAYTISH
                            </button>
                        </div>
                    </div>
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
