import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { EventCountdown } from './EventCountdown';
import { CalendarButton } from './CalendarButton';
import { Calendar, Clock, MapPin, Sparkles, Share2, MessageCircle, CheckCircle2, ChevronDown, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InvitationPass = ({ onRSVPClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { eventData, organisation } = useApp();

  const handleOpenPass = () => {
    setIsOpen(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#f472b6', '#be185d', '#ffffff', '#ffd1e8']
    });
  };

  const handleShareWhatsApp = () => {
    const url = window.location.origin + '/invitation';
    const text = `🌸 *OFFICIAL EVENT INVITATION* 🌸\n\nYou are cordially invited to *${eventData.name}* hosted by *${organisation.name}*!\n\n📅 Date: ${eventData.date} (${eventData.day})\n⏰ Time: ${eventData.time}\n📍 Venue: ${eventData.venue}\n\nClick here to view your VIP invitation pass & RSVP:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/invitation');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const passTitle = organisation?.invitationBranding || 'Empowering Women';
  const ribbonLabel = `${passTitle.toUpperCase()} • ${passTitle.toUpperCase()} •`;

  return (
    <div className="w-full max-w-lg mx-auto relative flex flex-col items-center pt-8 pb-4">
      
      {/* Lanyard Ribbon Hanging from Top */}
      <div className="w-8 h-20 sm:h-28 bg-gradient-to-b from-pink-700 via-rose-600 to-pink-700 flex flex-col items-center justify-center relative shadow-md rounded-t-sm z-20 overflow-hidden">
        <div className="text-[9px] font-black uppercase text-white/90 tracking-widest rotate-90 whitespace-nowrap select-none">
          {ribbonLabel}
        </div>
      </div>

      {/* Lanyard Clip / Ring Connector */}
      <div className="w-12 h-6 bg-slate-300 border-2 border-slate-400 rounded-md shadow-md z-30 flex items-center justify-center -mt-1">
        <div className="w-6 h-2 bg-slate-500 rounded-full" />
      </div>

      {/* Hanging Badge Pass Container */}
      <div className="w-full relative z-10 -mt-2">
        <div className="relative bg-white border-2 border-pink-200 rounded-[32px] shadow-[0_20px_50px_rgba(236,72,153,0.15)] overflow-hidden text-slate-900 text-center">
          
          {/* CLOSED BADGE STATE */}
          {!isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={handleOpenPass}
              className="cursor-pointer group flex flex-col items-center"
            >
              {/* Top Red/Pink Header Block */}
              <div className="w-full bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 p-6 sm:p-8 text-white flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-white p-1 shadow-md mb-3 flex items-center justify-center overflow-hidden border-2 border-pink-200">
                  <img src={organisation.logo || "/assets/gulabi_logo.png"} alt="Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-wider">{passTitle}</h3>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 w-full space-y-5 text-center">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-pink-600 block">YOU'RE INVITED</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-pink-950 leading-tight">
                    {eventData.name || 'Field Visit at Gopala Poshak Bhandar'}
                  </h2>
                </div>

                <div className="w-full h-px bg-pink-100 my-2" />

                <div className="space-y-2 text-sm text-gray-700 font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 text-pink-600" />
                    <span>{eventData.date || '2026-10-15'}{eventData.day ? ` (${eventData.day})` : ''}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-4 h-4 text-pink-600 shrink-0" />
                    <span className="truncate max-w-xs">{eventData.venue || 'Gopala Poshak Bhandar by Nikkita Agarwal'}</span>
                  </div>
                </div>

                {/* Animated Tap to Open Footer */}
                <div className="pt-4">
                  <div className="py-3 px-6 rounded-full bg-pink-50 border border-pink-200 text-pink-950 text-xs font-bold uppercase tracking-wider group-hover:bg-pink-600 group-hover:text-white transition duration-300 flex items-center justify-center gap-2 shadow-sm">
                    <Sparkles className="w-4 h-4 text-pink-600 group-hover:text-white animate-spin" />
                    <span>TAP TO OPEN</span>
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
              {/* Open Header Badge */}
              <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white text-center rounded-b-3xl shadow-md">
                <div className="w-16 h-16 rounded-full bg-white p-1 shadow-md mx-auto mb-2 flex items-center justify-center overflow-hidden">
                  <img src={organisation.logo || "/assets/gulabi_logo.png"} alt="Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <h2 className="text-3xl font-serif font-black uppercase tracking-tight">Welcome</h2>
                <span className="text-xs font-bold uppercase tracking-widest text-pink-100">{passTitle}</span>
              </div>

              {/* Event Image Banner if present */}
              {eventData.bannerImage && (
                <div className="rounded-2xl overflow-hidden border border-pink-200 shadow-sm max-h-[500px] bg-pink-50 flex items-center justify-center p-2">
                  <img src={eventData.bannerImage} alt={eventData.name} className="w-full h-auto max-h-[480px] object-contain rounded-xl" />
                </div>
              )}

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-pink-600">Official Pass Details</span>
                <h3 className="text-2xl font-serif font-bold text-pink-950">{eventData.name}</h3>
                <p className="text-xs text-gray-600 font-normal leading-relaxed">{eventData.description}</p>
              </div>

              {/* Agenda Items */}
              {eventData.agenda && eventData.agenda.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-pink-950 block">Meeting Schedule</span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {eventData.agenda.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-pink-50/70 border border-pink-200 flex items-center justify-between text-xs">
                        <span className="font-bold text-pink-900 bg-white px-2 py-1 rounded-lg border border-pink-200">{item.time}</span>
                        <span className="font-semibold text-gray-800 text-right">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Countdown Timer */}
              <div className="text-center pt-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-pink-700 block mb-1">Event Countdown</span>
                <EventCountdown targetDate={eventData.date} />
              </div>

              {/* Buttons Bar */}
              <div className="pt-4 border-t border-pink-100 flex flex-col gap-3">
                <button
                  onClick={onRSVPClick}
                  className="w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RSVP / Confirm Attendance</span>
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
                    className="p-3 rounded-2xl bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-600 hover:text-white transition shadow-sm"
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
