import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdModal = ({ adData, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(adData?.skipSeconds || 3);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const initialSkip = adData?.skipSeconds || 0;
    setTimeLeft(initialSkip);
    setCanSkip(initialSkip === 0);

    if (initialSkip > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, adData]);

  if (!isOpen || !adData || !adData.enabled) return null;

  const handleAdClick = (e) => {
    if (e) {
      e.stopPropagation();
    }
    const rawUrl = adData?.redirectUrl ? adData.redirectUrl.trim() : "";
    const targetUrl = (rawUrl && rawUrl !== '/members' && rawUrl !== '/join')
      ? rawUrl
      : "https://www.instagram.com/gulabi_visionaries?stkn=MW5yNzkxOXpmdmE1NA==";

    let finalUrl = targetUrl;
    if (finalUrl.startsWith('/')) {
      navigate(finalUrl);
    } else {
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = `https://${finalUrl}`;
      }
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  const isVideo = adData.mediaType === 'video' || (adData.mediaUrl && adData.mediaUrl.match(/\.(mp4|webm|ogg)(\?.*)?$/i));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white border-2 border-pink-300 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl text-slate-900 text-left flex flex-col max-h-[90vh]"
        >
          {/* Top Header Bar */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 border-b border-pink-200 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-600 text-white shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{adData.badgeText || 'SPONSORED AD'}</span>
              </span>
              <span className="text-xs text-pink-900 font-bold truncate max-w-[200px] sm:max-w-xs">
                Click Ad to open link
              </span>
            </div>

            <div className="flex items-center gap-2">
              {canSkip ? (
                <button
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-pink-600 transition shadow-md flex items-center gap-1"
                >
                  <span>Skip Ad</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-200 text-pink-950 border border-pink-300 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-600 animate-ping" />
                  <span>Skip in {timeLeft}s</span>
                </div>
              )}
            </div>
          </div>

          {/* Media Content Container (Clickable to Redirect) */}
          <div 
            onClick={handleAdClick}
            className="relative cursor-pointer group bg-pink-950 overflow-hidden flex-1 min-h-[260px] sm:min-h-[340px] flex items-center justify-center"
          >
            {isVideo ? (
              <div className="relative w-full h-full flex items-center justify-center">
                {adData.mediaUrl?.includes('youtube.com') || adData.mediaUrl?.includes('youtu.be') ? (
                  <iframe
                    src={adData.mediaUrl.replace('watch?v=', 'embed/')}
                    title="Ad Video"
                    className="w-full h-full min-h-[300px] border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={adData.mediaUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-contain max-h-[420px]"
                  />
                )}
              </div>
            ) : (
              <div className="relative w-full h-full min-h-[280px] sm:min-h-[340px]">
                <img
                  src={adData.mediaUrl}
                  alt={adData.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/members/member_17_pratibha_chaturvedi.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors" />
                
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-pink-950 shadow-md border border-pink-200 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition">
                  <ExternalLink className="w-3.5 h-3.5 text-pink-600" />
                  <span>Tap to Visit Website</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Info Bar */}
          <div className="p-5 sm:p-6 bg-white border-t border-pink-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
            <div className="text-left flex-1 min-w-0 pr-2">
              <h4 className="text-base sm:text-lg font-serif font-bold text-pink-950 truncate">{adData.title}</h4>
              <p className="text-xs text-gray-600 font-normal mt-0.5 line-clamp-2">{adData.subtitle}</p>
            </div>

            <div className="w-full sm:w-auto shrink-0 flex justify-end">
              <button
                onClick={handleAdClick}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-500 hover:to-rose-500 text-white shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>
                  {adData.ctaText && !adData.ctaText.includes('Explore Collection')
                    ? adData.ctaText.replace(/›/g, '').trim()
                    : 'Visit Page'}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
