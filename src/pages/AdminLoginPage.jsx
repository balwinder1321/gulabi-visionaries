import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, KeyRound } from 'lucide-react';

export const AdminLoginPage = () => {
  const { loginAdmin, adminUser } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = loginAdmin(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setErrorMsg(res.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-pink-200 shadow-xl relative text-left space-y-6 text-slate-900">
        
        {/* Top Emblem */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-pink-100 border border-pink-300 text-pink-600 flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-8 h-8 text-pink-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-pink-950">Admin CMS Portal</h2>
          <p className="text-xs text-pink-800 font-semibold">Sign in to manage events, members & website content</p>
        </div>


        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-pink-900 mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-pink-600 absolute left-4 top-3.5" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 focus:border-pink-500 text-gray-900 text-sm outline-none transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-pink-900 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-pink-600 absolute left-4 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 focus:border-pink-500 text-gray-900 text-sm outline-none transition font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-[0_4px_20px_rgba(236,72,153,0.35)] transition duration-300 flex items-center justify-center gap-2 mt-2"
          >
            <span>Login to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
