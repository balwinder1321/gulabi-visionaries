import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Instagram, Youtube, MessageCircle, Heart, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { organisation } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#fff0f5] via-[#fce7f3] to-[#fbcfe8] border-t border-pink-200/80 pt-16 pb-12 relative overflow-hidden text-gray-700">
      {/* Ambient Soft Rose Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-pink-400/20 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Description */}
          <div className="space-y-4 text-left">
            <Logo size="lg" showTagline={true} />
            <p className="text-sm text-gray-600 leading-relaxed font-normal mt-4">
              {organisation.about || "Rajasthan's premier women entrepreneur network. Empowering women through business referrals, digital marketing, podcasts, and collaborative growth."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={organisation.instagramUrl || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-pink-300 flex items-center justify-center text-pink-600 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={organisation.youtubeUrl || "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-pink-300 flex items-center justify-center text-pink-600 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition duration-300 shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${organisation.whatsappNumber || '917742459585'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition duration-300 shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="text-left">
            <h3 className="text-lg font-serif font-bold text-pink-950 mb-4 border-b border-pink-300 pb-2 inline-block">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-pink-700 transition flex items-center gap-2 font-medium text-gray-700">
                  <span className="text-pink-600 font-bold">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/invitation" className="hover:text-pink-700 transition flex items-center gap-2 text-pink-900 font-semibold">
                  <span className="text-pink-600 font-bold">›</span> Event Invitation Pass
                </Link>
              </li>
              <li>
                <Link to="/members" className="hover:text-pink-700 transition flex items-center gap-2 font-medium text-gray-700">
                  <span className="text-pink-600 font-bold">›</span> Members Directory
                </Link>
              </li>
              <li>
                <Link to="/join" className="hover:text-pink-700 transition flex items-center gap-2 font-medium text-gray-700">
                  <span className="text-pink-600 font-bold">›</span> Become a Member
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-pink-700 transition flex items-center gap-2 font-medium text-gray-700">
                  <span className="text-pink-600 font-bold">›</span> Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Offerings */}
          <div className="text-left">
            <h3 className="text-lg font-serif font-bold text-pink-950 mb-4 border-b border-pink-300 pb-2 inline-block">
              Member Benefits
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">•</span>
                <span>Active Business Referral Ecosystem (300+ Members)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">•</span>
                <span>WhatsApp & Instagram Status Marketing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">•</span>
                <span>Talkshow Podcast Features (YouTube & Spotify)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">•</span>
                <span>Virtual Business Cards & Media Coverage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">•</span>
                <span>Gulabi Field Visits & Door Prizes</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="text-left">
            <h3 className="text-lg font-serif font-bold text-pink-950 mb-4 border-b border-pink-300 pb-2 inline-block">
              Contact & Secretariat
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-gray-600 font-medium block">Phone & WhatsApp:</span>
                  <div className="space-y-0.5 pt-0.5">
                    <a href="tel:+917742459585" className="text-pink-950 hover:text-pink-700 font-semibold block">
                      +91 77424 59585 (Prachi)
                    </a>
                    <a href="tel:+918209574757" className="text-pink-950 hover:text-pink-700 font-semibold block">
                      +91 82095 74757 (Pratibha)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-gray-600 font-medium block">Email Address:</span>
                  <a href={`mailto:${organisation.contactEmail || 'prachimansinghka@gmail.com'}`} className="text-pink-950 hover:text-pink-700 font-semibold break-all">
                    {organisation.contactEmail || 'prachimansinghka@gmail.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-gray-600 font-medium block">Location:</span>
                  <span className="text-pink-950 font-medium">{organisation.address || 'Jaipur, Rajasthan, India'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-pink-300/70 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-medium">
          <p>© {new Date().getFullYear()} {organisation.name || 'Gulabi Visionaries'}. All Rights Reserved. Empowering Women Leaders.</p>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-pink-900 font-medium">
              Crafted with <Heart className="w-3.5 h-3.5 fill-pink-600 text-pink-600 animate-pulse" /> for Visionary Women
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white border border-pink-300 text-pink-700 hover:text-white hover:bg-pink-600 transition shadow-sm"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Developer Credit Line */}
        <div className="mt-6 pt-4 border-t border-pink-300/40 text-center">
          <p className="text-[11px] text-pink-900/80 font-medium tracking-wide">
            Website Designed & Developed by <span className="font-bold text-pink-950">Sardar Balwinder Singh</span> • Want to create a website like this?{' '}
            <a
              href="https://wa.me/916303248510?text=Hello%20Sardar%20Balwinder%20Singh%2C%20I%20saw%20the%20Gulabi%20Visionaries%20website%20and%20I%20am%20interested%20in%20creating%20a%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-700 hover:text-pink-950 font-bold underline transition inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3 text-emerald-600 inline" />
              <span>Message +91 63032 48510 on WhatsApp</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
