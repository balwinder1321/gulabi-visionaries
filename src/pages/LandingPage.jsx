import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EventCountdown } from '../components/EventCountdown';
import { MemberCard } from '../components/MemberCard';
import { AdModal } from '../components/AdModal';
import { Sparkles, Calendar, Users, Award, ShieldCheck, ArrowRight, CheckCircle, Video, MessageCircle, Mic, CreditCard, ChevronRight, Quote, Play, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  const { organisation, eventData, members, adData } = useApp();
  const [adModalOpen, setAdModalOpen] = useState(false);

  useEffect(() => {
    if (adData && adData.enabled) {
      const timer = setTimeout(() => {
        setAdModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [adData]);

  const prachi = members.find(m => m.name.toLowerCase().includes('prachi')) || {
    id: '19',
    name: 'Prachi Agrawal',
    company: 'Gulabi Microgreens & Learning Cubs',
    designation: 'Founder & Executive Administrator',
    category: 'Microgreens & Activity Center',
    group: 'FOUNDER',
    photo: '/members/member_19_prachi_agrawal.jpeg',
    bio: 'Founder & Core Administrator of Gulabi Visionaries.'
  };

  const pratibha = members.find(m => m.name.toLowerCase().includes('pratibha')) || {
    id: '17',
    name: 'Pratibha Chaturvedi',
    company: 'Devik Organics',
    designation: 'Co-Founder & Skincare Producer',
    category: 'Skincare products & Candles',
    group: 'CO-FOUNDER',
    photo: '/members/member_17_pratibha_chaturvedi.jpeg',
    bio: 'Co-Founder of Gulabi Visionaries & Devik Organics.'
  };

  const deepika = members.find(m => m.name.toLowerCase().includes('deepika saboo')) || {
    id: '18',
    name: 'Deepika Saboo',
    company: 'Deepika Saboo’s Nutrition Center',
    designation: 'Co-Founder & Clinical Nutritionist',
    category: 'Nutritionist',
    group: 'CO-FOUNDER',
    photo: '/members/member_18_deepika_saboo.jpeg',
    bio: 'Co-Founder of Gulabi Visionaries & Certified Clinical Nutritionist.'
  };

  const networkFounders = [
    { ...prachi, group: 'FOUNDER' },
    { ...pratibha, group: 'CO-FOUNDER' },
    { ...deepika, group: 'CO-FOUNDER' }
  ];

  const featuredMembers = members.filter(
    m => !m.name.toLowerCase().includes('prachi') &&
         !m.name.toLowerCase().includes('pratibha') &&
         !m.name.toLowerCase().includes('deepika saboo')
  ).slice(0, 6);

  const keyBenefits = [
    { title: "Networking Opportunities", desc: "Connect with like-minded women entrepreneurs and expand your professional network through bi-weekly meets.", icon: Users },
    { title: "Access to Referrals", desc: "Gain valuable business referrals and structured leads to grow your revenue exponentially.", icon: Award },
    { title: "Social Media Support", desc: "Dedicated team providing 10 Instagram posts OR 4 Reels for members to boost brand visibility.", icon: Video },
    { title: "Virtual Business Cards", desc: "Digital savior for instant networking whenever you meet new clients or prospects.", icon: CreditCard },
    { title: "Podcast Feature", desc: "Covering 3 members every month on YouTube & Spotify talkshows to share your brand story.", icon: Mic },
    { title: "WhatsApp Status Marketing", desc: "Power of cross-promotion with 300+ members sharing your flyers on their WhatsApp status.", icon: MessageCircle }
  ];

  const meetingRules = [
    "Attend 3 meetings out of the 6 meetings planned in the year.",
    "Come on time and silent your phone. Value community time and business.",
    "Feature presenter brings a wrapped door prize (value below ₹500).",
    "Nurture received referrals & aim to pass leads or minimum ₹100 business."
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 space-y-24">

      {/* Ad Modal Popup */}
      <AdModal
        adData={adData}
        isOpen={adModalOpen}
        onClose={() => setAdModalOpen(false)}
      />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 text-center">
        
        {/* Ambient Pink Glow Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-300/30 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-rose-300/25 blur-[100px] rounded-full pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 border border-pink-300 text-pink-900 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-4 h-4 text-pink-600 animate-spin" />
            <span>Rajasthan's Premier Women Entrepreneurs Network</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-pink-950 leading-tight">
            Empowering Women to <br className="hidden sm:block" />
            <span className="pink-gradient-text">Thrive in Business & Leadership</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-700 font-normal leading-relaxed">
            {organisation.about || "We provide referrals, business networking, digital marketing, Spotify/YouTube podcast features, and cross-collaboration opportunities to elevate women in their entrepreneurial journeys."}
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/invitation"
              className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-500 hover:to-rose-500 text-white shadow-[0_4px_20px_rgba(236,72,153,0.35)] transition-all duration-300 flex items-center gap-2 group"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>View Event Invitation Pass</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>

            {organisation?.showMembersDirectory && (
              <Link
                to="/members"
                className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-pink-50 border border-pink-200 hover:bg-pink-100 text-pink-900 transition duration-300 flex items-center gap-2 shadow-sm"
              >
                <Users className="w-4 h-4 text-pink-600" />
                <span>Explore Members Directory</span>
              </Link>
            )}

            {adData && adData.enabled && (
              <button
                onClick={() => setAdModalOpen(true)}
                className="px-6 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-rose-100 border border-rose-300 hover:bg-rose-600 hover:text-white text-rose-950 transition duration-300 flex items-center gap-2 shadow-sm"
              >
                <Play className="w-4 h-4 text-rose-600 fill-current" />
                <span>Watch Featured Ad</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Featured Ad Bar Banner (If enabled) */}
        {adData && adData.enabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => setAdModalOpen(true)}
            className="mt-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white shadow-lg cursor-pointer hover:shadow-xl transition flex flex-col sm:flex-row items-center justify-between gap-4 text-left border border-pink-400"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 text-white fill-current animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full inline-block mb-0.5">
                  {adData.badgeText || 'FEATURED PROMO'}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">{adData.title}</h3>
                <p className="text-xs text-pink-100 font-normal line-clamp-1">{adData.subtitle}</p>
              </div>
            </div>

            <div className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-pink-950 hover:bg-pink-100 transition shrink-0 flex items-center gap-1.5 shadow-md">
              <span>View / Play Ad</span>
              <ExternalLink className="w-3.5 h-3.5 text-pink-600" />
            </div>
          </motion.div>
        )}

        {/* Stats Counter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white/90 border border-pink-200 backdrop-blur-xl shadow-md"
        >
          <div className="text-center p-3 border-r border-pink-100 last:border-0">
            <span className="block text-3xl sm:text-4xl font-serif font-extrabold pink-gradient-text">300+</span>
            <span className="text-xs uppercase font-bold tracking-wider text-pink-800 mt-1 block">Active Women Entrepreneurs</span>
          </div>

          <div className="text-center p-3 border-r border-pink-100 last:border-0">
            <span className="block text-3xl sm:text-4xl font-serif font-extrabold pink-gradient-text">1,200+</span>
            <span className="text-xs uppercase font-bold tracking-wider text-pink-800 mt-1 block">Business Referrals Passed</span>
          </div>

          <div className="text-center p-3 border-r border-pink-100 last:border-0">
            <span className="block text-3xl sm:text-4xl font-serif font-extrabold pink-gradient-text">₹50L+</span>
            <span className="text-xs uppercase font-bold tracking-wider text-pink-800 mt-1 block">Revenue Generated</span>
          </div>

          <div className="text-center p-3">
            <span className="block text-3xl sm:text-4xl font-serif font-extrabold pink-gradient-text">100%</span>
            <span className="text-xs uppercase font-bold tracking-wider text-pink-800 mt-1 block">Women Empowerment</span>
          </div>
        </motion.div>

      </section>


      {/* Dynamic Event Banner Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-100 via-white to-pink-100 border border-pink-300 p-8 sm:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-600 text-white inline-block shadow-sm">
                Upcoming Featured Event
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-950 leading-tight">
                {eventData.name}
              </h2>
              <p className="text-sm text-pink-800 font-semibold">
                📅 {eventData.date} ({eventData.day}) • ⏰ {eventData.time}
              </p>
              <p className="text-sm text-gray-700 font-normal leading-relaxed">
                {eventData.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/invitation"
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-600 hover:bg-pink-500 text-white shadow-md transition duration-300 flex items-center gap-2"
                >
                  <span>Open Interactive Pass</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/invitation"
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-pink-300 hover:bg-pink-50 text-pink-900 transition shadow-sm"
                >
                  <span>Reserve Spot / RSVP</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 text-center bg-white p-6 rounded-2xl border border-pink-200 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-pink-700 block mb-1">Event Starts In</span>
              <EventCountdown targetDate={eventData.date} />
              <span className="text-xs text-pink-800 font-semibold block mt-2">📍 {eventData.venue}</span>
            </div>

          </div>
        </div>
      </section>


      {/* Key Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-700 block">Why Join Gulabi Visionaries</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-950">
            Transforming Your Business Journey
          </h2>
          <p className="text-sm text-gray-700 font-normal">
            Designed specifically for women entrepreneurs to achieve scalable revenue growth and digital visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-pink-200/80 hover:border-pink-400 transition-all duration-300 text-left space-y-3 shadow-sm hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-pink-950 group-hover:text-pink-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>


      {/* Founders & Core Leadership Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-700 block">Leadership & Vision</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-950">
            Meet the Founders
          </h2>
          <p className="text-sm text-gray-700 max-w-xl mx-auto font-normal">
            Visionary leaders guiding Rajasthan's fastest-growing women entrepreneur ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {networkFounders.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>


      {/* Meeting Rules & Community Discipline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-pink-200 shadow-md grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-700 block">Meeting Guidelines</span>
            <h2 className="text-3xl font-serif font-bold text-pink-950">
              Rules & Discipline of the Network
            </h2>
            <p className="text-sm text-gray-700 font-normal leading-relaxed">
              We value time, commitment, and mutual respect. To ensure every member receives maximum ROI and referrals, we adhere to core meeting principles.
            </p>

            <ul className="space-y-3 pt-2">
              {meetingRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-800 font-medium">
                  <CheckCircle className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-pink-50/80 p-8 rounded-2xl border border-pink-200 text-center space-y-4 shadow-sm">
            <Quote className="w-12 h-12 text-pink-400 mx-auto" />
            <h3 className="text-2xl font-serif font-bold text-pink-950 italic">
              "Progress begins with participation. Support begins by giving and showing up."
            </h3>
            <span className="block text-xs uppercase tracking-widest text-pink-700 font-bold">
              — Gulabi Visionaries Core Motto
            </span>
          </div>

        </div>
      </section>


      {/* Featured Members Showcase (Only shown when Members Directory is enabled) */}
      {organisation?.showMembersDirectory && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-pink-200 pb-4 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-700 block">Directory Preview</span>
              <h2 className="text-3xl font-serif font-bold text-pink-950">
                Featured Entrepreneur Members
              </h2>
            </div>
            <Link
              to="/members"
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 border border-pink-200 hover:bg-pink-600 text-pink-900 hover:text-white transition flex items-center gap-2 shadow-sm"
            >
              <span>View All Members</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}


      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 border border-pink-400 text-center space-y-6 shadow-xl text-white">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            Ready to Accelerate Your Enterprise?
          </h2>
          <p className="text-base text-pink-100 max-w-2xl mx-auto font-normal">
            Join 300+ inspiring women business owners across Rajasthan. Expand your referrals, podcast footprint, and market reach.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/join"
              className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-white text-pink-950 hover:bg-pink-50 shadow-xl transition duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>Apply for Membership</span>
            </Link>
            <Link
              to="/invitation"
              className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-pink-800 border border-pink-300/40 text-white hover:bg-pink-900 transition"
            >
              <span>Attend Next Meeting</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
