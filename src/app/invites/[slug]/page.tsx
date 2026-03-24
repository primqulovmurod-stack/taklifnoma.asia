'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ElegantInvitation } from '@/components/ElegantInvitation';
import { InvitationContent } from '@/lib/types';

// Mock Fetch Function (Replace with Supabase later)
const getInvitation = async (slug: string) => {
  // Simulate DB Delay
  await new Promise(r => setTimeout(r, 1000));
  
  // Mock Data
  return {
    is_paid: true, 
    content: {
      groomName: 'Mirzohid',
      brideName: 'Nilufar',
      date: '2026-06-15',
      time: '18:00',
      locationName: 'HAYAT RECEPTION HALL',
      locationUrl: 'https://maps.google.com',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000',
      musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    } as InvitationContent
  };
};

export default function InvitePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvitation(slug).then(res => {
      setData(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-16 h-16 border-4 border-gray-100 border-t-gray-800 rounded-full animate-spin"></div>
        <p className="font-serif italic text-gray-400 animate-pulse text-lg tracking-widest uppercase">Sahifa yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex justify-center overflow-x-hidden">
      <ElegantInvitation content={data.content} />
    </div>
  );
}
