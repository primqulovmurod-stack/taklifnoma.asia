'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Clock, ArrowRight, ShieldCheck, Heart, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const mockPayments = [
  { id: '1', amount: '49 000', date: '2026-03-15', status: 'Muvaffaqiyatli', slug: 'ali-laylo' },
  { id: '2', amount: '49 000', date: '2026-03-20', status: 'Kutilmoqda', slug: 'behzod-dilfuza' }
];

export default function BillingPage() {
  return (
    <div className="p-6 md:p-12 space-y-12 text-[#2D2424]">
      <header className="space-y-4">
        <h1 className="font-playfair text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
            To'lovlar <Heart size={28} className="text-[#E11D48]" fill="currentColor" />
        </h1>
        <p className="text-gray-400 text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2">
            <CreditCard size={14} className="text-[#E11D48]" />
            HISOB-KITOB VA TO'LOV TARIXI
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscription Info */}
          <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#1A1A1A] text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-white/5">
                  <div className="absolute top-0 right-0 p-8 text-white opacity-5 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={140} />
                  </div>
                  <div className="relative space-y-10">
                      <div className="space-y-2">
                          <p className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.3em] opacity-80">Balansingiz</p>
                          <h2 className="text-4xl font-black tracking-tighter">Faol Emas</h2>
                      </div>
                      <div className="space-y-4">
                          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest py-3 border-b border-white/5 text-gray-500">
                              <span>Faol taklifnomalar</span>
                              <span className="text-white">1 ta</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest py-3 border-b border-white/5 text-gray-500">
                              <span>Jami to'lovlar</span>
                              <span className="text-[#E11D48]">49 000 SO'M</span>
                          </div>
                      </div>
                      <button className="w-full py-5 bg-[#E11D48] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-[#E11D48]/20 flex items-center justify-center gap-3 active:scale-95 transition-all">
                          <PlusCircle size={18} /> Balansni to'ldirish
                      </button>
                  </div>
              </div>

              <div className="bg-white border border-[#FFE4E6]/50 rounded-[3rem] p-10 space-y-6 shadow-sm">
                  <h3 className="font-black text-gray-900 text-sm flex items-center gap-2 uppercase tracking-tighter">
                      <Heart size={18} className="text-[#E11D48]" fill="currentColor" />
                      Yordam kerakmi?
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-bold">To'lovlarda muammo bo'lsa yoki maxsus buyurtma qilmoqchi bo'lsangiz, biz bilan bog'laning.</p>
                  <a href="https://t.me/taklifnoma_asia" target="_blank" className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] flex items-center gap-2 mt-4 hover:translate-x-2 transition-transform">
                      TELEGRAM BILAN BOG'LANISH <ArrowRight size={14} />
                  </a>
              </div>
          </div>

          {/* Payment History */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] border border-[#FFE4E6]/50 shadow-sm overflow-hidden">
              <div className="p-10 border-b border-[#FFE4E6]/30 flex items-center justify-between">
                  <h3 className="font-black text-gray-900 uppercase tracking-[0.1em] text-[11px]">OXIRGI TO'LOVLAR</h3>
                  <div className="w-10 h-10 rounded-2xl bg-[#E11D48]/5 flex items-center justify-center text-[#E11D48] shadow-inner">
                      <Clock size={20} />
                  </div>
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full text-left">
                      <thead>
                          <tr className="bg-gray-50/50 border-b border-[#FFE4E6]/30 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                              <th className="px-10 py-8">ID</th>
                              <th className="px-10 py-8">Loyixa</th>
                              <th className="px-10 py-8">Miqdor</th>
                              <th className="px-10 py-8 text-right">Xolati</th>
                          </tr>
                      </thead>
                      <tbody>
                          {mockPayments.map((p) => (
                              <tr key={p.id} className="border-b border-[#FFE4E6]/10 hover:bg-[#FFF9FA]/50 transition-colors group">
                                  <td className="px-10 py-8 text-[11px] font-black text-gray-300">#{p.id}</td>
                                  <td className="px-10 py-8 text-xs font-black text-gray-900">
                                      <div className="flex items-center gap-2 hover:text-[#E11D48] cursor-pointer">
                                          {p.slug} <ArrowRight size={12} />
                                      </div>
                                  </td>
                                  <td className="px-10 py-8 text-xs font-black text-[#E11D48] uppercase">{p.amount} SO'M</td>
                                  <td className="px-10 py-8 text-right">
                                      <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                          p.status === 'Muvaffaqiyatli' 
                                          ? 'bg-green-50 text-green-600 border border-green-100' 
                                          : 'bg-[#FFF9FA] text-gray-400 border border-[#FFE4E6]'
                                      }`}>
                                          {p.status}
                                      </span>
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
