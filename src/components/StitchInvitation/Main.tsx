'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Home } from './Home';
import { Story } from './Story';
import { Details } from './Details';
import { RSVP } from './RSVP';
import { NavBar } from './NavBar';

export default function StitchInvitation(content: any) {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home key="home" {...content} />;
      case 'story':
        return <Story key="story" {...content} />;
      case 'details':
        return <Details key="details" {...content} />;
      case 'rsvp':
        return <RSVP key="rsvp" {...content} />;
      default:
        return <Home key="home" {...content} />;
    }
  };

  return (
    <div className="bg-stitch-surface min-h-[100dvh] font-body antialiased selection:bg-stitch-primary/10">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
