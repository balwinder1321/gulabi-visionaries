import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, User, Phone, Mail, Building, Briefcase, MessageSquare, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const JoinPage = () => {
  const { organisation } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    business: '',
    designation: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.business.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Phone Number, and Business Name).');
      return;
    }

    // Fire celebratory confetti
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f472b6', '#be185d', '#ffffff']
    });

    setSubmitted(true);

    const whatsappNumber = "917742459585";
    const message = `Hello, I am interested in joining ${organisation.name || 'Gulabi Visionaries'}.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Business: ${formData.business}
Designation: ${formData.designation || 'N/A'}
Message: ${formData.message || 'Looking forward to growing together!'}`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Title Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-900 text-xs font-bold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Membership Application</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-pink-950 tracking-tight">
          Join <span className="pink-gradient-text">Gulabi Visionaries</span>
        </h1>

        <p className="text-sm text-gray-700 max-w-xl mx-auto font-normal leading-relaxed">
          Fill out the form below to apply for membership in Rajasthan's premier women entrepreneur network. Your details will generate an instant WhatsApp application to our founding secretariat (+91 77424 59585).
        </p>
      </div>

      {/* Form Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-pink-200 shadow-xl relative text-slate-900">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-400/10 blur-[100px] pointer-events-none"></div>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-pink-950">Application Generated!</h3>
            <p className="text-sm text-pink-900 max-w-md mx-auto font-medium">
              Opening WhatsApp with your application details for phone number <span className="text-pink-950 font-bold">+91 77424 59585</span>...
            </p>
            <a
              href={`https://wa.me/917742459585?text=${encodeURIComponent(`Hello, I am interested in joining ${organisation.name}.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nBusiness: ${formData.business}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Click Here If WhatsApp Didn't Open Automatically</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold">
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-900 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-pink-600 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarti Maheshwari"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 focus:border-pink-500 text-gray-900 placeholder-gray-400 text-sm outline-none transition font-medium"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-900 mb-2">
                  Phone Number (WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-pink-600 absolute left-4 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9828070470"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 focus:border-pink-500 text-gray-900 placeholder-gray-400 text-sm outline-none transition font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-pink-600 absolute left-4 top-3.5" />
                  <input
                    type="email"
                    placeholder="e.g. aarti.boob1@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 focus:border-pink-500 text-gray-900 placeholder-gray-400 text-sm outline-none transition font-medium"
                  />
                </div>
              </div>

              {/* Business / Company */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-900 mb-2">
                  Business / Company Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-pink-600 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Choc&mate"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 focus:border-pink-500 text-gray-900 placeholder-gray-400 text-sm outline-none transition font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pink-900 mb-2">
                Designation / Category
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-pink-600 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. Homemade Chocolates Specialist / Managing Director"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 focus:border-pink-500 text-gray-900 placeholder-gray-400 text-sm outline-none transition font-medium"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pink-900 mb-2">
                Message / Brief Business Description
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-pink-600 absolute left-4 top-3.5" />
                <textarea
                  rows="4"
                  placeholder="Tell us a little bit about your enterprise and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 focus:border-pink-500 text-gray-900 placeholder-gray-400 text-sm outline-none transition font-medium"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-500 hover:to-rose-500 text-white shadow-[0_4px_20px_rgba(236,72,153,0.35)] transition duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit & Open WhatsApp (+91 77424 59585)</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
