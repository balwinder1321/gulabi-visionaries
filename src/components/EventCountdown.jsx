import React, { useState, useEffect } from 'react';

export const EventCountdown = ({ targetDate = '2026-11-15' }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
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
