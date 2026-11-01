import React from 'react';

export const DiwaliDiya = ({ size = 'md', className = '', glow = true }) => {
  const dimensions = {
    sm: { width: 36, height: 32 },
    md: { width: 56, height: 48 },
    lg: { width: 84, height: 72 },
    xl: { width: 120, height: 104 }
  }[size] || { width: 56, height: 48 };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Radiant Glow Halo */}
      {glow && (
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-400/40 rounded-full blur-md pointer-events-none animate-pulse"
          style={{ width: dimensions.width * 1.1, height: dimensions.height * 1.1 }}
        />
      )}

      {/* SVG Diya Lamp with Flickering Animated Flame */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 100 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)]"
      >
        <defs>
          {/* Flame Gradients */}
          <linearGradient id="diyaFlameCore" x1="50" y1="5" x2="50" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>

          <radialGradient id="diyaFlameAura" cx="50" cy="25" r="25" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>

          {/* Brass / Terracotta Diya Body Gradient */}
          <linearGradient id="diyaBodyGrad" x1="10" y1="40" x2="90" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="35%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="diyaRimGrad" x1="10" y1="42" x2="90" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Animations */}
          <style>{`
            @keyframes diyaFlicker {
              0%, 100% {
                transform: scale(1) rotate(0deg) skewX(0deg);
                opacity: 0.95;
              }
              25% {
                transform: scale(1.06, 0.94) rotate(-1.5deg) skewX(-1deg);
                opacity: 1;
              }
              50% {
                transform: scale(0.96, 1.05) rotate(1.2deg) skewX(1deg);
                opacity: 0.92;
              }
              75% {
                transform: scale(1.04, 0.98) rotate(-0.8deg) skewX(-0.5deg);
                opacity: 0.98;
              }
            }

            @keyframes sparkRise {
              0% { transform: translateY(0) scale(0.6); opacity: 0.8; }
              100% { transform: translateY(-16px) scale(0.2); opacity: 0; }
            }

            .flame-group {
              transform-origin: 50px 42px;
              animation: diyaFlicker 1.8s infinite ease-in-out;
            }

            .spark-1 {
              animation: sparkRise 1.4s infinite ease-out;
              transform-origin: 50px 10px;
            }
            .spark-2 {
              animation: sparkRise 1.8s infinite ease-out 0.6s;
              transform-origin: 47px 12px;
            }
          `}</style>
        </defs>

        {/* Outer Flame Glow */}
        <ellipse cx="50" cy="24" rx="20" ry="24" fill="url(#diyaFlameAura)" className="flame-group opacity-70" />

        {/* Main Animated Flame */}
        <g className="flame-group">
          {/* Flame Outer Shape */}
          <path
            d="M50 4 C44 14 36 22 36 32 C36 41 42 46 50 46 C58 46 64 41 64 32 C64 22 56 14 50 4 Z"
            fill="url(#diyaFlameCore)"
          />

          {/* Flame Inner Core (White-Hot Center) */}
          <path
            d="M50 16 C47 22 43 27 43 34 C43 39 46 43 50 43 C54 43 57 39 57 34 C57 27 53 22 50 16 Z"
            fill="#ffffff"
            opacity="0.9"
          />

          {/* Rising Sparks */}
          <circle cx="50" cy="8" r="1.5" fill="#fef08a" className="spark-1" />
          <circle cx="48" cy="12" r="1.2" fill="#fbbf24" className="spark-2" />
        </g>

        {/* Oil Wick */}
        <path d="M50 43 C49 41 48.5 38 49 35" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />

        {/* Terracotta/Brass Diya Body */}
        <g>
          {/* Main Bowl */}
          <path
            d="M10 46 C12 68 30 80 50 80 C70 80 88 68 90 46 C90 43 10 43 10 46 Z"
            fill="url(#diyaBodyGrad)"
          />

          {/* Diya Rim Oval */}
          <ellipse cx="50" cy="46" rx="40" ry="7" fill="url(#diyaRimGrad)" stroke="#78350f" strokeWidth="1" />

          {/* Decorative Pattern / Etching on Bowl */}
          <path
            d="M20 54 Q50 68 80 54"
            fill="none"
            stroke="#fde68a"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            opacity="0.85"
          />
          <path
            d="M26 62 Q50 74 74 62"
            fill="none"
            stroke="#fef08a"
            strokeWidth="1.2"
            opacity="0.75"
          />

          {/* Center decorative jewel/dot */}
          <circle cx="50" cy="62" r="2.5" fill="#fef08a" />
          <circle cx="38" cy="58" r="1.8" fill="#fef08a" />
          <circle cx="62" cy="58" r="1.8" fill="#fef08a" />

          {/* Base Stand */}
          <path
            d="M38 80 L35 84 C35 85 65 85 65 84 L62 80 Z"
            fill="#78350f"
          />
        </g>
      </svg>
    </div>
  );
};
