import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, ExternalLink, Briefcase, Sparkles, Building, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MemberCard = ({ member }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const groupColors = {
    'Founders': 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-400',
    'Diary Emerald': 'bg-emerald-100 text-emerald-900 border-emerald-300',
    'Diary Pearl': 'bg-pink-100 text-pink-900 border-pink-300'
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="group relative bg-white border-2 border-pink-200 hover:border-pink-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left"
      >
        {/* Top Image Frame */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-pink-50">
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/gulabi_logo.png';
            }}
          />

          {/* Group Tag */}
          <div className="absolute top-3 right-3 z-10">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${groupColors[member.group] || 'bg-pink-100 text-pink-900 border-pink-300'}`}>
              {member.group}
            </span>
          </div>

          {/* Business Category Pill */}
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-pink-950 border border-pink-200 max-w-full truncate shadow-sm">
              <Briefcase className="w-3.5 h-3.5 text-pink-600 shrink-0" />
              <span className="truncate">{member.category}</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-pink-950 group-hover:text-pink-600 transition-colors">
              {member.name}
            </h3>
            
            <p className="text-sm font-semibold text-pink-700 flex items-center gap-1.5 mt-1">
              <Building className="w-3.5 h-3.5 text-pink-600 shrink-0" />
              <span>{member.company}</span>
            </p>

            <p className="text-xs text-gray-600 font-normal mt-3 line-clamp-2 leading-relaxed">
              {member.bio || member.designation}
            </p>
          </div>

          {/* Quick Action Footer */}
          <div className="pt-4 mt-4 border-t border-pink-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {member.phone && (
                <a
                  href={`https://wa.me/91${member.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${member.name}, I found your contact on Gulabi Visionaries directory.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 hover:bg-emerald-600 hover:text-white transition shadow-sm"
                  title="Contact on WhatsApp"
                  aria-label="Contact on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 rounded-full bg-pink-50 border border-pink-200 text-pink-600 hover:bg-pink-600 hover:text-white transition shadow-sm"
                  title="Send Email"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-pink-900 hover:text-white bg-pink-50 border border-pink-200 hover:bg-pink-600 transition flex items-center gap-1 shadow-sm"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Member Details Modal Drawer */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border border-pink-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-slate-900"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-pink-100 text-pink-800 hover:text-white hover:bg-pink-600 transition shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-80 w-full relative bg-pink-50">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
              </div>

              <div className="p-6 text-left relative z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${groupColors[member.group]}`}>
                  {member.group}
                </span>

                <h3 className="text-2xl font-serif font-bold text-pink-950 mt-2">{member.name}</h3>
                <p className="text-base font-semibold text-pink-700 mt-0.5">{member.company}</p>
                <p className="text-xs text-pink-800 uppercase font-semibold tracking-wide mt-0.5">{member.category}</p>

                <div className="my-4 p-4 rounded-2xl bg-pink-50/60 border border-pink-100 text-sm text-gray-700 font-normal leading-relaxed">
                  {member.bio || member.designation}
                </div>

                <div className="space-y-2 text-sm text-gray-700 font-medium">
                  {member.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-pink-600" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-pink-600" />
                      <span>{member.email}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href={`https://wa.me/91${member.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${member.name}, I am interested in connecting regarding your business ${member.company}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white text-center flex items-center justify-center gap-2 shadow-lg transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct</span>
                  </a>

                  <a
                    href={`mailto:${member.email}`}
                    className="flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 border border-pink-300 hover:bg-pink-600 text-pink-900 hover:text-white text-center flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Member</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
