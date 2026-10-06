import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InvitationPass } from '../components/InvitationPass';
import { GoogleMapEmbed } from '../components/GoogleMapEmbed';
import { Sparkles, MapPin, Clock, Calendar, CheckCircle2, MessageCircle, X, User, Phone, Mail, Building, Navigation, ExternalLink, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const InvitationPage = () => {
  const { eventData, organisation, members } = useApp();
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [selectedMemberModal, setSelectedMemberModal] = useState(null);

  const [rsvpData, setRsvpData] = useState({
    name: '',
    phone: '',
    email: '',
    business: '',
    guests: '1'
  });

  // Hierarchy Team Breakdown
  const founder = members.find(m => m.name.toLowerCase().includes('prachi')) || {
    name: "Prachi Agrawal",
    company: "Gulabi Microgreens & Learning Cubs",
    designation: "Founder & Executive Administrator",
    category: "Microgreens & Activity Center",
    photo: "/members/member_19_prachi_agrawal.jpeg",
    phone: "7742459585",
    email: "prachimansinghka@gmail.com",
    bio: "Founder & Core Administrator of Gulabi Visionaries."
  };

  const coFounder1 = members.find(m => m.name.toLowerCase().includes('pratibha')) || {
    name: "Pratibha Chaturvedi",
    company: "Devik Organics",
    designation: "Co-Founder & Skincare Producer",
    category: "Skincare products & Candles",
    photo: "/members/member_17_pratibha_chaturvedi.jpeg",
    phone: "8209574757",
    email: "pratibhaojha26@gmail.com",
    bio: "Co-Founder of Gulabi Visionaries & Devik Organics."
  };

  const coFounder2 = members.find(m => m.name.toLowerCase().includes('deepika saboo')) || {
    name: "Deepika Saboo",
    company: "Deepika Saboo’s Nutrition Center",
    designation: "Co-Founder & Clinical Nutritionist",
    category: "Nutritionist",
    photo: "/members/member_18_deepika_saboo.jpeg",
    phone: "9001299931",
    email: "dips_0203@yahoo.co.in",
    bio: "Co-Founder of Gulabi Visionaries & Certified Clinical Nutritionist."
  };

  // Remaining members for Core Team Grid
  const coreMembers = members.filter(
    m => !m.name.toLowerCase().includes('prachi') &&
         !m.name.toLowerCase().includes('pratibha') &&
         !m.name.toLowerCase().includes('deepika saboo')
  );

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    if (!rsvpData.name || !rsvpData.phone) return;

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f472b6', '#be185d', '#ffffff']
    });

    const whatsappNum = organisation.whatsappNumber || '917742459585';
    const message = `Hello, I am RSVPing for *${eventData.name}*!

Name: ${rsvpData.name}
Phone: ${rsvpData.phone}
Email: ${rsvpData.email || 'N/A'}
Business / Company: ${rsvpData.business || 'N/A'}
Total Attendees: ${rsvpData.guests}

Looking forward to attending!`;

    const waUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setRsvpModalOpen(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-20 space-y-20 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* SECTION 1: TOP HANGING INVITATION BADGE */}
      <section className="text-center pt-2">
        <InvitationPass onRSVPClick={() => setRsvpModalOpen(true)} />
      </section>

      {/* SECTION 2: THE VENUE SECTION (BNI Style Screenshot 3) */}
      <section className="space-y-6 text-left">
        <div className="space-y-2">
          <div className="w-10 h-1 bg-pink-600 rounded-full" />
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-pink-950 tracking-tight">The venue</h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden border-2 border-pink-200 bg-white shadow-xl">
          {/* Background Map Container */}
          <div className="h-64 sm:h-72 w-full relative bg-pink-50 overflow-hidden">
            <GoogleMapEmbed
              mapsUrl={eventData.googleMapsUrl}
              venueName={eventData.venue}
              address={eventData.address}
            />
          </div>

          {/* Overlaid Venue Card */}
          <div className="p-6 sm:p-8 bg-white border-t border-pink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-900 border border-pink-300 inline-block shadow-sm">
                ANNUAL SUMMIT & NETWORKING MEET
              </span>
              <h3 className="text-2xl font-serif font-bold text-pink-950">{eventData.venue}</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">{eventData.address}</p>
              
              <div className="flex items-center gap-2 text-xs text-pink-800 font-bold pt-1">
                <Calendar className="w-4 h-4 text-pink-600" />
                <span>{eventData.day}, {eventData.date} • {eventData.time}</span>
              </div>
            </div>

            <a
              href={eventData.googleMapsUrl || "https://maps.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-pink-600 hover:bg-pink-700 text-white shadow-md transition flex items-center justify-center gap-2 shrink-0"
            >
              <Navigation className="w-4 h-4 fill-current" />
              <span>Directions</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: LEADERSHIP TEAM HIERARCHY (BNI Style Screenshot 4) */}
      <section className="space-y-8 text-center">
        <div className="text-left space-y-2">
          <div className="w-10 h-1 bg-pink-600 rounded-full" />
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-pink-950 tracking-tight">Leadership team</h2>
        </div>

        {/* Tree Hierarchy Chart Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-pink-200 shadow-xl flex flex-col items-center">
          
          {/* TOP NODE: FOUNDER (PRACHI AGRAWAL) */}
          <div 
            onClick={() => setSelectedMemberModal(founder)}
            className="cursor-pointer group flex flex-col items-center text-center max-w-xs transition"
          >
            <div className="relative mb-3">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 border-2 border-dashed border-pink-500 shadow-md group-hover:scale-105 transition duration-300 bg-white overflow-hidden">
                <img src={founder.photo} alt={founder.name} className="w-full h-full object-cover object-center rounded-full" />
              </div>
            </div>

            <span className="px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-pink-600 text-white shadow-sm mb-1.5">
              FOUNDER
            </span>
            <h3 className="text-xl font-serif font-extrabold text-pink-950 group-hover:text-pink-600 transition">{founder.name}</h3>
            <p className="text-xs text-gray-500 font-semibold">{founder.designation}</p>
          </div>

          {/* TREE CONNECTING BRANCH LINES */}
          <div className="w-full max-w-md my-6 flex flex-col items-center">
            {/* Vertical Line */}
            <div className="w-0.5 h-8 bg-pink-400" />
            {/* Horizontal Branch Bar */}
            <div className="w-full h-0.5 bg-pink-400 relative">
              <div className="absolute top-0 left-0 w-0.5 h-8 bg-pink-400" />
              <div className="absolute top-0 right-0 w-0.5 h-8 bg-pink-400" />
            </div>
          </div>

          {/* BOTTOM NODES: 2 CO-FOUNDERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 w-full max-w-xl pt-2">
            
            {/* CO-FOUNDER 1: PRATIBHA CHATURVEDI */}
            <div 
              onClick={() => setSelectedMemberModal(coFounder1)}
              className="cursor-pointer group flex flex-col items-center text-center transition"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border-2 border-dashed border-pink-500 shadow-md group-hover:scale-105 transition duration-300 bg-white mb-3 overflow-hidden">
                <img src={coFounder1.photo} alt={coFounder1.name} className="w-full h-full object-cover object-center rounded-full" />
              </div>

              <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-600 text-white shadow-sm mb-1.5">
                CO-FOUNDER
              </span>
              <h4 className="text-lg font-serif font-bold text-pink-950 group-hover:text-pink-600 transition">{coFounder1.name}</h4>
              <p className="text-xs text-gray-500 font-semibold">{coFounder1.company}</p>
            </div>

            {/* CO-FOUNDER 2: DEEPIKA SABOO */}
            <div 
              onClick={() => setSelectedMemberModal(coFounder2)}
              className="cursor-pointer group flex flex-col items-center text-center transition"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border-2 border-dashed border-pink-500 shadow-md group-hover:scale-105 transition duration-300 bg-white mb-3 overflow-hidden">
                <img src={coFounder2.photo} alt={coFounder2.name} className="w-full h-full object-cover object-center rounded-full" />
              </div>

              <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-600 text-white shadow-sm mb-1.5">
                CO-FOUNDER
              </span>
              <h4 className="text-lg font-serif font-bold text-pink-950 group-hover:text-pink-600 transition">{coFounder2.name}</h4>
              <p className="text-xs text-gray-500 font-semibold">{coFounder2.company}</p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: CORE MEMBERS GRID (BNI Style Screenshot 5) */}
      <section className="space-y-6 text-center">
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="h-px bg-pink-200 flex-1 max-w-xs" />
          <span className="text-xs font-bold uppercase tracking-widest text-pink-700">CORE MEMBERS</span>
          <div className="h-px bg-pink-200 flex-1 max-w-xs" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {coreMembers.map((m) => (
            <motion.div
              key={m.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedMemberModal(m)}
              className="p-5 rounded-2xl bg-white border-2 border-pink-200 hover:border-pink-400 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 border-dashed border-pink-500 shadow-sm mb-3 bg-pink-50 overflow-hidden shrink-0">
                <img
                  src={m.photo || "/members/member_17_pratibha_chaturvedi.jpeg"}
                  alt={m.name}
                  className="w-full h-full object-cover object-center rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/members/member_17_pratibha_chaturvedi.jpeg';
                  }}
                />
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-pink-100 text-pink-800 border border-pink-300 mb-1.5">
                {m.group || 'MEMBER'}
              </span>

              <h4 className="text-sm sm:text-base font-serif font-bold text-pink-950 line-clamp-1">{m.name}</h4>
              <p className="text-[11px] text-pink-700 font-bold uppercase tracking-wide line-clamp-1 mt-0.5">{m.company}</p>
              <p className="text-[10px] text-gray-500 font-normal line-clamp-1">{m.category}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MEMBER DETAIL MODAL DRAWER */}
      <AnimatePresence>
        {selectedMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-pink-300 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative text-slate-900 text-left"
            >
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-pink-100 text-pink-800 hover:text-white hover:bg-pink-600 transition shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-72 w-full relative bg-pink-50">
                <img src={selectedMemberModal.photo} alt={selectedMemberModal.name} className="w-full h-full object-cover object-center" />
              </div>

              <div className="p-6 text-left space-y-4">
                <div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-800 border border-pink-300">
                    {selectedMemberModal.group || 'MEMBER'}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-pink-950 mt-2">{selectedMemberModal.name}</h3>
                  <p className="text-sm font-semibold text-pink-700">{selectedMemberModal.company}</p>
                  <p className="text-xs text-gray-500 font-medium">{selectedMemberModal.category}</p>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 text-xs text-gray-700 font-normal leading-relaxed">
                  {selectedMemberModal.bio || selectedMemberModal.designation}
                </div>

                <div className="space-y-2 text-xs text-gray-700 font-semibold pt-1">
                  {selectedMemberModal.phone && (
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>{selectedMemberModal.phone}</span>
                    </div>
                  )}
                  {selectedMemberModal.email && (
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>{selectedMemberModal.email}</span>
                    </div>
                  )}
                </div>

                {selectedMemberModal.phone && (
                  <a
                    href={`https://wa.me/91${selectedMemberModal.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedMemberModal.name}, I saw your profile on Gulabi Visionaries.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md mt-4"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contact on WhatsApp</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RSVP FORM MODAL */}
      <AnimatePresence>
        {rsvpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border-2 border-pink-300 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-left text-slate-900"
            >
              <button
                onClick={() => setRsvpModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 text-pink-800 hover:text-white hover:bg-pink-600 transition shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-serif font-bold text-pink-950 mb-2">RSVP / Confirm Attendance</h3>
              <p className="text-xs text-gray-600 mb-6 font-normal">Reserve your seat for Gulabi Visionaries Annual Summit.</p>

              <form onSubmit={handleRSVPSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-pink-950 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-pink-950 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98280..."
                    value={rsvpData.phone}
                    onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-pink-950 mb-1">Company / Business Name</label>
                  <input
                    type="text"
                    placeholder="Your enterprise name"
                    value={rsvpData.business}
                    onChange={(e) => setRsvpData({ ...rsvpData, business: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md transition flex items-center justify-center gap-2 mt-4"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit RSVP via WhatsApp</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
