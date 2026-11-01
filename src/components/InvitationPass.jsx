import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { EventCountdown } from './EventCountdown';
import { CalendarButton } from './CalendarButton';
import { Calendar, Clock, MapPin, Sparkles, Share2, MessageCircle, CheckCircle2, Flame, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DiwaliDiya } from './DiwaliDiya';

export const InvitationPass = ({ onRSVPClick }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const { eventData, organisation } = useApp();

  const triggerCrackers = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#ffffff', '#10b981'],
      shapes: ['circle', 'star']
    });
  };

  const handleOpenPass = () => {
    setIsOpen(true);
    triggerCrackers();
  };

  const handleBurstDiwaliCrackers = (e) => {
    e.stopPropagation();
    triggerCrackers();
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0.2, y: 0.7 },
        colors: ['#f59e0b', '#fbbf24', '#ef4444', '#ffffff']
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 0.8, y: 0.7 },
        colors: ['#ec4899', '#a855f7', '#10b981', '#ffffff']
      });
    }, 200);
  };

  const handleShareWhatsApp = () => {
    const url = window.location.origin + '/invitation';
    const text = `🪔 *TOGETHER WE RISE - DIWALI SPECIAL INVITATION* 🪔\n\nYou are cordially invited to *${eventData.name || 'Diwali Mahotsav & Business Showcase'}* hosted by *${organisation.name}*!\n\n📅 Date: ${eventData.date || '2026-11-08'} (${eventData.day || 'Sunday'})\n⏰ Time: ${eventData.time || '06:00 PM Onwards'}\n📍 Venue: ${eventData.venue || 'Jaipur, India'}\n\nClick here to view your VIP Diwali Invitation Pass & RSVP:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/invitation');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const passTitle = organisation?.invitationBranding || 'Together We Rise';
  const ribbonLabel = `🪔 SHUBH DIWALI • ${passTitle.toUpperCase()} • 8TH NOV 🪔`;

  return (
    <div className="w-full max-w-lg mx-auto relative flex flex-col items-center pt-4 pb-4">
      
      {/* Decorative Traditional Toran (Marigold & Mango Leaves) */}
      <div className="w-full max-w-md flex items-center justify-between px-2 -mb-2 z-30 select-none">
        <div className="flex items-center gap-1.5 animate-bounce" style={{ animationDuration: '3s' }}>
          <span className="text-xl">🌼</span>
          <span className="text-sm">🍃</span>
          <span className="text-xl">🌺</span>
        </div>
        <div className="flex items-center gap-2">
          <DiwaliDiya size="sm" />
          <span className="text-[11px] font-serif font-black tracking-widest text-amber-900 bg-amber-100/95 px-3 py-0.5 rounded-full border border-amber-300 shadow-sm">
            ✨ SHUBH DEEPAVALI 2026 ✨
          </span>
          <DiwaliDiya size="sm" />
        </div>
        <div className="flex items-center gap-1.5 animate-bounce" style={{ animationDuration: '3.5s' }}>
          <span className="text-xl">🌺</span>
          <span className="text-sm">🍃</span>
          <span className="text-xl">🌼</span>
        </div>
      </div>

      {/* Lanyard Ribbon Hanging from Top */}
      <div className="w-9 h-20 sm:h-28 bg-gradient-to-b from-amber-600 via-rose-600 to-amber-700 flex flex-col items-center justify-center relative shadow-md rounded-t-sm z-20 overflow-hidden border-x border-amber-300/40">
        <div className="text-[9px] font-black uppercase text-amber-100 tracking-widest rotate-90 whitespace-nowrap select-none drop-shadow">
          {ribbonLabel}
        </div>
      </div>

      {/* Lanyard Clip / Ring Connector */}
      <div className="w-12 h-6 bg-gradient-to-b from-amber-200 to-amber-400 border-2 border-amber-500 rounded-md shadow-md z-30 flex items-center justify-center -mt-1">
        <div className="w-6 h-2 bg-amber-700 rounded-full" />
      </div>

      {/* Hanging Badge Pass Container */}
      <div className="w-full relative z-10 -mt-2">
        <div className="relative bg-white border-2 border-amber-300 rounded-[32px] shadow-[0_20px_50px_rgba(245,158,11,0.25)] overflow-hidden text-slate-900 text-center">
          
          {/* CLOSED BADGE STATE */}
          {!isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={handleOpenPass}
              className="cursor-pointer group flex flex-col items-center"
            >
              {/* Top Diwali Header Block */}
              <div className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 p-6 sm:p-8 text-white flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-white p-1 shadow-md mb-3 flex items-center justify-center overflow-hidden border-2 border-amber-300">
                  <img src={organisation.logo || "/assets/gulabi_logo.png"} alt="Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <DiwaliDiya size="sm" />
                  <h3 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-wider text-yellow-100">{passTitle}</h3>
                  <DiwaliDiya size="sm" />
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 w-full space-y-5 text-center">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block">🪔 YOU'RE CORDIALLY INVITED 🪔</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-950 leading-tight">
                    {eventData.name || 'Diwali Mahotsav & Business Showcase'}
                  </h2>
                </div>

                {eventData.bannerImage && (
                  <div className="w-full max-h-64 rounded-2xl overflow-hidden border border-amber-200 shadow-sm bg-amber-50/50 flex items-center justify-center p-1.5 my-2">
                    <img src={eventData.bannerImage} alt={eventData.name} className="w-full h-auto max-h-60 object-contain rounded-xl" />
                  </div>
                )}

                <div className="w-full h-px bg-amber-100 my-2" />

                <div className="space-y-2 text-sm text-gray-700 font-medium">
                  <div className="flex items-center justify-center gap-2 text-amber-900 font-bold">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>{eventData.date || '2026-11-08'} ({eventData.day || 'Sunday'})</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="truncate max-w-xs">{eventData.venue || 'Jaipur, India'}</span>
                  </div>
                </div>

                {/* Animated Tap to Open Footer */}
                <div className="pt-4">
                  <div className="py-3 px-6 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 text-amber-950 text-xs font-bold uppercase tracking-wider group-hover:bg-amber-600 group-hover:text-white transition duration-300 flex items-center justify-center gap-2 shadow-sm">
                    <Sparkles className="w-4 h-4 text-amber-600 group-hover:text-white animate-spin" />
                    <span>TAP TO OPEN PASS & CELEBRATE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* OPENED BADGE STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 text-left space-y-6"
            >
              {/* Open Header Badge with Diya Lamps */}
              <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white text-center rounded-b-3xl shadow-md relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-white p-1 shadow-md mx-auto mb-2 flex items-center justify-center overflow-hidden border-2 border-amber-300">
                  <img src={organisation.logo || "/assets/gulabi_logo.png"} alt="Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <DiwaliDiya size="sm" />
                  <div>
                    <h2 className="text-3xl font-serif font-black uppercase tracking-tight text-yellow-100">Welcome</h2>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-200">{passTitle}</span>
                  </div>
                  <DiwaliDiya size="sm" />
                </div>

                <div className="mt-2 inline-block px-3 py-1 bg-black/25 rounded-full border border-amber-300/40 text-[10px] uppercase font-bold tracking-widest text-amber-200">
                  🪔 Grand Diwali Celebration Pass 🪔
                </div>
              </div>

              {/* Event Image Banner if present */}
              {eventData.bannerImage && (
                <div className="rounded-2xl overflow-hidden border-2 border-amber-200 shadow-md max-h-[640px] bg-amber-50/50 flex items-center justify-center p-2 relative group">
                  <img src={eventData.bannerImage} alt={eventData.name} className="w-full h-auto max-h-[620px] object-contain rounded-xl shadow-sm" />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                    DIWALI SPECIAL • 8TH NOV
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-amber-950">{eventData.name || 'Diwali Mahotsav & Business Showcase'}</h3>
                <p className="text-xs text-gray-700 font-normal leading-relaxed">{eventData.description}</p>
              </div>

              {/* Agenda Items */}
              {eventData.agenda && eventData.agenda.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-950 block">Meeting & Celebration Schedule</span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {eventData.agenda.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between text-xs gap-3">
                        <span className="font-bold text-amber-900 bg-white px-2 py-1 rounded-lg border border-amber-200 shrink-0">{item.time}</span>
                        <div className="text-right">
                          <span className="font-bold text-gray-900 block">{item.title}</span>
                          {item.desc && <span className="text-[10px] text-gray-600 block">{item.desc}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Countdown Timer for 8th Nov */}
              <div className="pt-2">
                <EventCountdown targetDate={eventData.date || '2026-11-08T18:00:00'} />
              </div>

              {/* Buttons Bar */}
              <div className="pt-4 border-t border-amber-200 flex flex-col gap-3">
                
                {/* Interactive Burst Crackers Button */}
                <button
                  type="button"
                  onClick={handleBurstDiwaliCrackers}
                  className="w-full py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 hover:to-rose-400 text-white shadow-lg transition flex items-center justify-center gap-2 active:scale-95 group"
                >
                  <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-45 transition duration-300 animate-pulse" />
                  <span>🎆 Burst Diwali Crackers! 🎆</span>
                </button>

                <button
                  onClick={onRSVPClick}
                  className="w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-700 via-rose-700 to-amber-800 hover:from-amber-600 hover:to-rose-600 text-white shadow-md transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RSVP for Diwali Celebration & Advertise</span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <CalendarButton />
                  </div>
                  
                  <button
                    onClick={handleShareWhatsApp}
                    className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-700 hover:bg-emerald-600 hover:text-white transition shadow-sm"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-600 hover:text-white transition shadow-sm"
                    title="Copy Link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {copied && (
                  <span className="text-[10px] text-emerald-600 font-bold text-center">✓ Link copied!</span>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};
