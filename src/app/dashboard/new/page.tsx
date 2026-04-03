'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LayoutDashboard, Sparkles, Star, Heart, CheckCircle, ArrowRight, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { templates } from '@/components/dashboard/TemplatePreview';
import { supabase } from '@/lib/supabase';

export default function NewInvitationPage() {
  const router = useRouter();

    const handleSelectTemplate = async (templateId: string) => {
    // Generate a unique ID (all caps for consistency with admin screenshot)
    const newId = Math.random().toString(36).substring(2, 9).toUpperCase();
    const newInvitation = {
        id: newId,
        slug: `taklifnoma-${newId}`,
        is_paid: false,
        content: {
            groomName: 'Kuyov',
            brideName: 'Kelin',
            date: '2026-05-15',
            time: '18:00',
            locationName: 'Restoran nomi',
            locationAddress: 'Manzil',
            locationUrl: '',
            imageUrl: 'https://images.pexels.com/photos/30206324/pexels-photo-30206324.jpeg',
            musicUrl: '/assets/die_with_a_smile.mp3',
            theme: templateId,
            cardNumber: '8600 **** **** ****',
            cardName: 'ISM FAMILIYA'
        }
    };

    // 1. Save to LocalStorage
    const localData = localStorage.getItem('taklifnoma_invitations');
    let invites = [];
    if (localData) {
        invites = JSON.parse(localData);
    }
    invites.push(newInvitation);
    localStorage.setItem('taklifnoma_invitations', JSON.stringify(invites));

    // 2. Sync with Supabase (AWAIT IT)
    const hasRealDb = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    
    if (hasRealDb) {
        try {
            const { error } = await supabase.from('invitations').insert({
                id: newId,
                slug: newInvitation.slug,
                is_paid: false,
                content: newInvitation.content
            });
            
            if (error) {
                console.error('Supabase initial sync error:', error.message);
                // Even if it fails, we still proceed to editor because we have LocalStorage fallback
            }
        } catch (e) {
            console.error('Initial Supabase sync failed:', e);
        }
    }

    // 3. Navigate to editor
    router.push(`/dashboard/edit/${newId}`);
  };

  return (
    <div className="p-6 md:p-12 space-y-12">
      <header className="space-y-4">
        <Link 
            href="/dashboard"
            className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 hover:text-[#E11D48] transition-colors group"
        >
            <LayoutDashboard size={14} className="group-hover:-translate-x-1 transition-transform" />
            Kabinetingizga qaytish
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
                <h1 className="font-playfair text-4xl font-black text-gray-900 tracking-tight">Dizayn Tanlash</h1>
                <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                    <Sparkles size={14} className="text-[#E11D48]" fill="currentColor" />
                    O'zingizga yoqqan premium dizaynni tanlab, tahrirlashni boshlang
                </p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          {templates.map((template, i) => (
              <motion.div 
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="bg-white rounded-[2.5rem] border border-[#FFE4E6] shadow-[0_30px_60px_-15px_rgba(225,29,72,0.05)] overflow-hidden flex flex-col group cursor-pointer"
                onClick={() => handleSelectTemplate(template.id)}
              >
                  <div className="aspect-[3/4] bg-[#FDFCF9] relative overflow-hidden">
                      {/* Real Image Preview */}
                      <Image 
                        src={template.image} 
                        alt={template.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        priority={i < 3}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-6 right-6">
                          <div className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/90 backdrop-blur-md text-gray-900 shadow-xl border border-white/20">
                              {template.style}
                          </div>
                      </div>

                      {/* Action Buttons Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-8">
                          <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(template.image, '_blank');
                            }}
                            className="w-full py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-2"
                          >
                              <Eye size={18} /> KATTALAShTIRIB KO'RISh
                          </button>
                          <button 
                            className="w-full py-4 bg-[#E11D48] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#E11D48]/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                          >
                              <CheckCircle size={18} /> UShBU DIZAYNNI TANLASh
                          </button>
                      </div>
                  </div>

                  <div className="p-8 space-y-3 bg-white text-center">
                      <h4 className="font-playfair text-2xl font-black text-gray-900 group-hover:text-[#E11D48] transition-colors">{template.name}</h4>
                      <div className="flex items-center justify-center gap-1.5 text-[#E11D48]">
                          {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pt-2">Premium Edition 2026</p>
                  </div>
              </motion.div>
          ))}
      </div>
    </div>
  );
}
