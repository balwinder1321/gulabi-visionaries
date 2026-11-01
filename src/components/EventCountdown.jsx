import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { DiwaliDiya } from './DiwaliDiya';

export const EventCountdown = ({ targetDate = '2026-11-08T18:00:00' }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // If targetDate is only YYYY-MM-DD or 8th Nov, ensure evening time 18:00:00 is used
    let normalizedTarget = targetDate;
    if (normalizedTarget === '2026-11-08' || normalizedTarget.includes('2026-11-08')) {
      normalizedTarget = '2026-11-08T18:00:00';
    }

    const calculateTimeLeft = () => {
      const difference = +new Date(normalizedTarget) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleCardClick = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#ec4899', '#ffffff', '#10b981'],
      shapes: ['circle', 'star']
    });
  };

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-lg mx-auto my-6 text-center">
      {/* Festive Countdown Title */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <DiwaliDiya size="sm" className="hidden sm:inline-flex" />
        <span className="text-xs sm:text-sm font-serif font-black uppercase tracking-wider text-amber-900 bg-amber-100/90 px-3.5 py-1 rounded-full border border-amber-300 shadow-sm flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
          <span>Diwali Celebration Countdown • 8th Nov 2026</span>
        </span>
        <DiwaliDiya size="sm" className="hidden sm:inline-flex" />
      </div>

      {/* 4 Countdown Boxes */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
        {units.map((unit, idx) => (
          <div
            key={idx}
            onClick={handleCardClick}
            className="cursor-pointer relative group bg-gradient-to-b from-amber-50 to-orange-50/80 border-2 border-amber-300 hover:border-amber-500 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-md shadow-[0_6px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.35)] transition-all duration-300 active:scale-95 overflow-hidden"
          >
            {/* Ambient gold glow aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-rose-400 to-yellow-400 rounded-2xl opacity-10 group-hover:opacity-30 blur-sm transition duration-300 pointer-events-none" />

            <div className="relative z-10">
              <span className="block text-2xl sm:text-4xl font-extrabold font-serif text-amber-950 tracking-tight drop-shadow-sm">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-800 mt-1">
                {unit.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-amber-800/80 font-medium mt-2">
        ✨ Tap numbers to burst festive sparklers! ✨
      </p>
    </div>
  );
};
