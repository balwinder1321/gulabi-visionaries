import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DiwaliDiya } from './DiwaliDiya';

export const DiwaliBanner = () => {
  const [daysLeft, setDaysLeft] = useState(7);

  useEffect(() => {
    const target = new Date('2026-11-08T18:00:00');
    const diff = target - new Date();
    if (diff > 0) {
      setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    } else {
      setDaysLeft(0);
    }
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-amber-50 text-xs py-2 px-3 sm:px-6 relative z-50 shadow-md border-b border-amber-400/30 overflow-hidden">
      {/* Subtle sparkling background shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-200/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 relative z-10">
        
        {/* Left Side: Diya & Greeting */}
        <div className="flex items-center gap-2 font-medium">
          <DiwaliDiya size="sm" className="hidden sm:inline-flex -my-1" />
          <span className="font-serif font-black tracking-wider text-yellow-200 uppercase text-[11px] sm:text-xs">
            🪔 Shubh Deepavali
          </span>
          <span className="hidden md:inline text-amber-100/90 text-[11px]">
            • May the Divine Light illuminate your business & life with endless prosperity!
          </span>
        </div>

        {/* Center / Right Side: Countdown to 8th Nov & CTA Link */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-full border border-amber-300/30 text-[11px] font-bold text-yellow-200 shadow-inner">
            <Calendar className="w-3.5 h-3.5 text-yellow-300" />
            <span>
              {daysLeft > 0 ? `Diwali: ${daysLeft} Days to 8th Nov` : 'Happy Diwali Today!'}
            </span>
          </div>

          <Link
            to="/invitation"
            className="px-3 py-1 rounded-full bg-white text-rose-800 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider hover:bg-yellow-100 transition shadow-sm hover:scale-105 active:scale-95"
          >
            Diwali Invitation Pass ✨
          </Link>
        </div>

      </div>
    </div>
  );
};
