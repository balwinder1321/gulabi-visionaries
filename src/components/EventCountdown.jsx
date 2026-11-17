import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const EventCountdown = ({ targetDate = '2026-11-15' }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isValid: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const parsed = +new Date(targetDate);
      if (isNaN(parsed)) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isValid: false };
      }
      const difference = parsed - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isValid: true
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isValid: false };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft.isValid) {
    return (
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-2 border-dashed border-pink-300 text-center shadow-sm max-w-lg mx-auto my-6 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-[11px] font-bold uppercase tracking-wider mb-1">
          <Clock className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
          <span>Schedule Announcement</span>
        </div>
        <h4 className="text-base sm:text-lg font-serif font-bold text-pink-950">Dates and time will be announced shortly</h4>
        <p className="text-xs text-gray-600">Register your interest below to receive WhatsApp updates as soon as the schedule is finalized!</p>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto my-6">
      {units.map((unit, idx) => (
        <div
          key={idx}
          className="relative group bg-white border border-pink-200 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-md shadow-[0_4px_15px_rgba(236,72,153,0.1)] hover:border-pink-400 transition-all duration-300"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-b from-pink-400 to-rose-400 rounded-2xl opacity-10 group-hover:opacity-30 blur-sm transition duration-300"></div>
          <div className="relative z-10">
            <span className="block text-2xl sm:text-4xl font-extrabold font-serif text-pink-950 tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-pink-700 mt-1">
              {unit.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
