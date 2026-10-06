import React from 'react';
import { useApp } from '../context/AppContext';

export const Logo = ({ size = 'md', showTagline = false }) => {
  const { organisation } = useApp();

  const logoSizes = {
    sm: 'h-8 w-auto',
    md: 'h-11 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Lotus Graphic & Logo Image */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500"></div>
        {organisation.logo ? (
          <img
            src={organisation.logo}
            alt={organisation.name}
            className={`${logoSizes[size]} object-contain relative z-10 filter drop-shadow-[0_4px_12px_rgba(236,72,153,0.3)]`}
          />
        ) : (
          /* Stylized Lotus SVG Emblem fallback */
          <div className="relative z-10 text-pink-500 flex items-center justify-center">
            <svg viewBox="0 0 100 80" className="w-10 h-10 fill-current text-pink-500 drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]">
              <path d="M50 5 C40 25, 20 35, 10 50 C25 50, 40 45, 50 25 C60 45, 75 50, 90 50 C80 35, 60 25, 50 5 Z" fill="#ec4899" />
              <path d="M50 15 C35 30, 15 45, 0 60 C20 60, 38 52, 50 35 C62 52, 80 60, 100 60 C85 45, 65 30, 50 15 Z" fill="#f472b6" opacity="0.9" />
              <path d="M50 25 C25 45, 5 65, 5 75 C30 75, 42 65, 50 50 C58 65, 70 75, 95 75 C95 65, 75 45, 50 25 Z" fill="#be185d" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className={`font-serif font-bold tracking-tight text-pink-950 group-hover:text-pink-600 transition-colors ${textSizes[size]}`}>
          {organisation.name || 'Gulabi Visionaries'}
        </span>
        {showTagline && (
          <span className="text-xs text-pink-300 tracking-wider font-medium uppercase">
            {organisation.tagline || 'Empowering Women Entrepreneurs Network'}
          </span>
        )}
      </div>
    </div>
  );
};
