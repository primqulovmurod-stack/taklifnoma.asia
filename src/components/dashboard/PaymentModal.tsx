'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, CheckCircle, ShieldCheck, X, ArrowRight, Heart, Copy, Send, Clock } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  price?: string;
  invitationId?: string;
  isPaid?: boolean;
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  price = "190 000", 
  invitationId = "YANGI",
  isPaid = false 
}: PaymentModalProps) {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
        setStep('success');
    }, 2500);
  };

  const handleCopy = () => {
    if (!isPaid) return;
    const url = `https://taklifnoma.asia/${invitationId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[1000] flex items-center justify-center p-6"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed z-[1010] w-full max-w-lg bg-white rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.2)] border border-[#FFE4E6] overflow-hidden"
          >
            {step === 'details' && (
                <div className="p-10 space-y-8">
                    <header className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="font-playfair text-3xl font-black text-gray-900 tracking-tight">To'lov</h2>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Xavfsiz va tezkor</p>
                        </div>
                        <button onClick={onClose} className="p-3 rounded-full hover:bg-gray-50 text-gray-300">
                            <X size={24} />
                        </button>
                    </header>

                    <div className="bg-[#E11D48]/5 rounded-[2.5rem] p-8 border border-[#FFE4E6]/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-[#E11D48] opacity-5">
                            <CreditCard size={120} />
                        </div>
                        <div className="relative space-y-2 text-center md:text-left">
                             <p className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.3em] leading-loose opacity-80">Payme / Click / Uzum</p>
                             <div className="flex items-baseline justify-center md:justify-start gap-2">
                                <span className="text-4xl font-black text-gray-900">{price}</span>
                                <span className="text-xl font-bold text-gray-400 uppercase">so'm</span>
                             </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 text-center space-y-4">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Taklifnoma ID raqamingiz</p>
                                <p className="text-sm font-black text-[#E11D48] tracking-tighter uppercase">{invitationId}</p>
                            </div>
                            
                            {/* Copy Link Button - Conditional */}
                            <button 
                                onClick={handleCopy}
                                disabled={!isPaid}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border ${
                                    isPaid 
                                    ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' 
                                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                                }`}
                            >
                                {isPaid ? (
                                    <>
                                        {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                                        {copied ? 'NUshALANDI!' : 'HAVOLANI NUShALASh'}
                                    </>
                                ) : (
                                    <>
                                        <Clock size={14} />
                                        FAOLLAShTIRILGACH NUShALASh MUMKIN
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <footer className="space-y-4">
                        <a 
                            href={`https://t.me/taklifnoma_asia?text=Assalomu alaykum, buyurtma qilmoqchiman. ID: ${invitationId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-4 py-6 rounded-[2rem] bg-[#229ED9] text-white font-black text-sm uppercase tracking-widest hover:brightness-110 shadow-xl shadow-[#229ED9]/20 transition-all group"
                        >
                            <Send size={20} className="group-hover:rotate-12 transition-transform" />
                            <span>TELEGRAM ORQALI TASDIQLASH</span>
                        </a>

                        <button 
                            onClick={handlePay}
                            className="w-full flex items-center justify-center gap-4 py-6 rounded-[2rem] bg-[#E11D48] text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-[#E11D48]/30 hover:brightness-110 active:scale-95 transition-all"
                        >
                            <Lock size={18} />
                            <span>KARTA ORQALI TO'LOV</span>
                        </button>

                        <p className="pt-4 text-center flex items-center justify-center gap-2 text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                            <ShieldCheck size={14} className="text-green-400" />
                            Xavfsiz bank to'lovi • 24/7 Qo'llab-quvvatlash
                        </p>
                    </footer>
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
                        <h3 className="font-playfair text-2xl font-black text-gray-900">To'lov kutilmoqda</h3>
                        <p className="text-gray-400 text-sm font-medium">Siz bilan tez orada bog'lanamiz...</p>
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className="p-16 text-center space-y-12 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 text-green-500 opacity-5">
                       <CheckCircle size={160} />
                    </div>
                    
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto border-4 border-green-100">
                        <CheckCircle size={48} className="text-green-500" />
                    </div>

                    <div className="space-y-6 relative z-10 text-center flex flex-col items-center">
                        <div className="space-y-2">
                            <h3 className="font-playfair text-3xl font-black text-gray-900 leading-tight">Yuborildi!</h3>
                            <p className="text-gray-400 text-md font-medium px-4">Buyurtmangiz qabul qilindi. Faollashtirish uchun Telegram'dan skrinshot yuboring.</p>
                        </div>
                        
                        <div className="pt-8 w-full">
                            <button 
                                onClick={handleFinish}
                                className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl bg-[#1D1D1D] text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-black/10 group"
                            >
                                <span>KABINETGA QAYTISH</span>
                                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
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
