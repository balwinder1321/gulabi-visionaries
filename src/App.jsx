import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { InvitationPage } from './pages/InvitationPage';
import { MembersPage } from './pages/MembersPage';
import { JoinPage } from './pages/JoinPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Global Notification Toast
function NotificationToast() {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-white/95 border border-pink-300 shadow-[0_10px_30px_rgba(236,72,153,0.25)] flex items-center gap-3 text-pink-950 text-xs font-semibold backdrop-blur-xl"
      >
        <CheckCircle2 className="w-5 h-5 text-pink-600 shrink-0 animate-pulse" />
        <span>{toastMessage.message}</span>
      </motion.div>
    </AnimatePresence>
  );
}

export function AppContent() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7a6c8] text-gray-900 selection:bg-pink-500 selection:text-white">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<InvitationPage />} />
          <Route path="/invitation" element={<InvitationPage />} />
          <Route path="/about" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="*" element={<InvitationPage />} />
        </Routes>
      </main>

      <Footer />
      <NotificationToast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
