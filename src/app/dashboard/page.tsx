'use client';

import React, { useState } from 'react';
import { FloralInvitation } from '@/components/FloralInvitation';
import { InvitationContent } from '@/lib/types';
import { motion } from 'framer-motion';
import { 
  Heart, Calendar, MapPin, Music, Image as ImageIcon, 
  Send, Lock, CheckCircle, Share2 
} from 'lucide-react';

const defaultContent: InvitationContent = {
  groomName: 'Ali',
  brideName: 'Laylo',
  date: '2026-05-15',
  time: '18:00',
  locationName: 'Tantana Milliy Taomlar Majmuasi',
  locationUrl: 'https://maps.google.com',
  imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600',
  musicUrl: 'standard-love-1'
};

export default function DashboardPage() {
  const [content, setContent] = useState<InvitationContent>(defaultContent);
  const [isPaid, setIsPaid] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className={`flex-1 overflow-y-auto border-r border-gray-50 p-6 lg:p-12 h-screen ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
        <div className="max-w-xl mx-auto space-y-12">
          <header className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">Onlinetaklifnoma</h1>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Personal Studio</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100 cursor-pointer" onClick={() => setIsPaid(!isPaid)}>
               <div className={`w-2 h-2 rounded-full ${isPaid ? 'bg-green-400' : 'bg-orange-400'}`}></div>
               <span className="text-[10px] font-bold uppercase text-gray-500">
                 {isPaid ? 'Faol' : 'To\'lanmagan'}
               </span>
            </div>
          </header>

          <div className="space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-pink-500">
                <Heart size={16} fill="currentColor" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Asosiy Qahramonlar</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Kuyov</span>
                  <input name="groomName" value={content.groomName} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-pink-50 focus:border-pink-200 transition-all text-sm outline-none font-medium" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Kelin</span>
                  <input name="brideName" value={content.brideName} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-pink-50 focus:border-pink-200 transition-all text-sm outline-none font-medium" />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-2 text-blue-500">
                <Calendar size={16} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Sana va Vaqt</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" name="date" value={content.date} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-100 transition-all text-sm outline-none" />
                <input type="time" name="time" value={content.time} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-100 transition-all text-sm outline-none" />
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-2 text-orange-500">
                <MapPin size={16} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Manzil</h3>
              </div>
              <div className="space-y-4">
                <input placeholder="Restoran nomi" name="locationName" value={content.locationName} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-50 focus:border-orange-100 transition-all text-sm outline-none" />
                <input placeholder="Xarita havolasi" name="locationUrl" value={content.locationUrl} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-50 focus:border-orange-100 transition-all text-[10px] font-mono outline-none" />
              </div>
            </section>

            <section className="space-y-6">
               <div className="flex items-center gap-2 text-indigo-500">
                <Music size={16} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Musiqa va Surat</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                 <select name="musicUrl" value={content.musicUrl} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 outline-none appearance-none cursor-pointer text-sm">
                    <option value="standard-love-1">Classic Wedding Waltz</option>
                    <option value="standard-love-2">Soft Oriental Piano</option>
                    <option value="standard-love-3">Modern Floral Pop</option>
                 </select>
                 <div className="flex gap-4">
                    <input placeholder="Rasm havolasi" name="imageUrl" value={content.imageUrl} onChange={handleInputChange} className="flex-1 px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-gray-50 transition-all text-[10px] outline-none" />
                    <button className="px-6 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all flex items-center gap-2">
                       <ImageIcon size={16} />
                       <span className="text-xs font-bold uppercase">Upload</span>
                    </button>
                 </div>
              </div>
            </section>
          </div>

          <footer className="pt-10 flex flex-col gap-4">
             <button disabled={!isPaid} className={`w-full py-5 rounded-2xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-4 transition-all ${isPaid ? 'bg-blue-500 text-white shadow-lg shadow-blue-50 active:scale-95' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                {isPaid ? <Send size={18} /> : <Lock size={18} />}
                Telegramda ulashish
             </button>
          </footer>
        </div>
      </div>

      <div className={`flex-1 bg-gray-50/50 p-6 flex flex-col items-center justify-center min-h-screen ${activeTab === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
        <div className="relative w-full max-w-sm">
           <div className="relative aspect-[9/19] w-full bg-white rounded-[3.5rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.1)] border-[14px] border-gray-950 overflow-hidden ring-8 ring-white">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-950 rounded-b-3xl z-50"></div>
              <div className="w-full h-full overflow-y-auto scrollbar-hide bg-white">
                <FloralInvitation content={content} />
              </div>
           </div>
           <button onClick={() => setActiveTab('edit')} className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:hidden px-8 py-4 bg-gray-900 text-white rounded-full shadow-2xl font-bold uppercase tracking-widest text-[10px] z-[100] border border-gray-700">
             Tahrirlashga qaytish
           </button>
        </div>
        <p className="mt-8 text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">Jonli ko'rinish • Real-time Preview</p>
      </div>

      <button onClick={() => setActiveTab('preview')} className={`fixed bottom-8 right-8 lg:hidden w-16 h-16 rounded-full bg-pink-600 text-white shadow-2xl z-[90] flex items-center justify-center ${activeTab === 'preview' ? 'hidden' : 'flex'}`}>
         <Share2 />
      </button>
    </div>
  );
}
