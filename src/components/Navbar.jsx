import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useApp } from '../context/AppContext';
import { Calendar, Users, UserPlus, ShieldCheck, Menu, X, Sparkles, MessageCircle } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { adminUser, organisation } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allNavItems = [
    { label: 'Event Invitation', path: '/', icon: Calendar, highlight: true },
    { label: 'Members Directory', path: '/members', icon: Users, requiresDirectory: true },
    { label: 'Network Overview', path: '/about', icon: Sparkles },
    { label: 'Join Us', path: '/join', icon: UserPlus },
  ];

  const navItems = allNavItems.filter(item => !item.requiresDirectory || organisation?.showMembersDirectory);

  const isActive = (path) => {
    if (path === '/' && (location.pathname === '/' || location.pathname === '/invitation')) return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-pink-200/80 py-3 shadow-[0_4px_20px_rgba(236,72,153,0.12)]' 
        : 'bg-gradient-to-b from-[#fff0f5]/95 via-[#fff5f8]/80 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <Logo size="md" showTagline={false} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/90 border border-pink-200/80 p-1.5 rounded-full backdrop-blur-md shadow-sm">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  active
                    ? 'text-white bg-gradient-to-r from-pink-600 to-rose-600 shadow-[0_4px_15px_rgba(236,72,153,0.35)]'
                    : item.highlight
                    ? 'text-pink-900 hover:text-pink-600 hover:bg-pink-100/60'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-pink-600'}`} />}
                <span>{item.label}</span>
                {item.highlight && !active && (
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons: Admin CMS & WhatsApp Quick Link */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`https://wa.me/${organisation.whatsappNumber || '917742459585'}?text=${encodeURIComponent('Hello Gulabi Visionaries, I would like to know more about your network.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition flex items-center gap-1.5 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Us</span>
          </a>

          <Link
            to="/admin"
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border bg-pink-50 text-pink-900 border-pink-200 hover:bg-pink-100 hover:border-pink-300 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-pink-600" />
            <span>Admin Dashboard</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white border border-pink-200 text-pink-700 hover:text-pink-900 shadow-sm"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-pink-200 px-4 pt-4 pb-6 mt-2 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${
                    active
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                      : 'text-gray-800 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-pink-600'}`} />}
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-pink-500 text-white rounded-full">
                      Live
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-pink-100 flex flex-col gap-2">
              <a
                href={`https://wa.me/${organisation.whatsappNumber || '917742459585'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-center text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Contact on WhatsApp</span>
              </a>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl text-center text-sm font-semibold bg-pink-50 text-pink-900 border border-pink-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-pink-600" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
