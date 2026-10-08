import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MemberCard } from '../components/MemberCard';
import { Search, Filter, Users, Sparkles, UserPlus, MessageCircle, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MembersPage = () => {
  const { members } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Flag to control visibility of members section (Set to true in future to restore all members exactly as they are)
  const SHOW_MEMBERS = false;

  const groups = ['All', 'Founders', 'Diary Emerald', 'Diary Pearl'];

  const categories = useMemo(() => {
    const set = new Set(members.map(m => m.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [members]);

  const filteredMembers = useMemo(() => {
    if (!SHOW_MEMBERS) return [];
    const list = members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.bio && member.bio.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesGroup = selectedGroup === 'All' || member.group === selectedGroup;
      const matchesCategory = selectedCategory === 'All' || member.category === selectedCategory;

      return matchesSearch && matchesGroup && matchesCategory;
    });

    const groupPriority = { 'Founders': 1, 'Diary Emerald': 2, 'Diary Pearl': 3 };
    return [...list].sort((a, b) => {
      const priorityA = groupPriority[a.group] || 99;
      const priorityB = groupPriority[b.group] || 99;
      return priorityA - priorityB;
    });
  }, [members, searchTerm, selectedGroup, selectedCategory]);

  return (
    <div className="min-h-screen pt-24 pb-16 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-900 text-xs font-bold uppercase tracking-widest shadow-sm">
          <Users className="w-3.5 h-3.5 text-pink-600" />
          <span>Members Directory ({members.length} Active Entrepreneurs)</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-pink-950 tracking-tight">
          Gulabi Visionaries <span className="pink-gradient-text">Member Network</span>
        </h1>

        <p className="text-sm text-gray-700 font-normal leading-relaxed">
          Connect directly with Rajasthan's finest women-led enterprises, artisanal producers, healthcare experts, and creative innovators.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-6 rounded-3xl bg-white border border-pink-200/80 shadow-md space-y-4">

        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-pink-600 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search member by name, business, category, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 focus:border-pink-500 text-gray-900 placeholder-gray-400 text-sm outline-none transition font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-3 text-xs text-pink-700 hover:text-pink-950 bg-pink-100 px-2 py-1 rounded-full font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">

          {/* Group Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            {groups.map((grp) => (
              <button
                key={grp}
                onClick={() => setSelectedGroup(grp)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${selectedGroup === grp
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                    : 'bg-pink-50 text-pink-900 hover:bg-pink-100 border border-pink-200'
                  }`}
              >
                {grp}
              </button>
            ))}
          </div>

          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Filter className="w-4 h-4 text-pink-600 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-xs font-bold text-pink-900 outline-none cursor-pointer hover:border-pink-400 transition"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-gray-900 font-medium">
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Members Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-pink-200 shadow-md space-y-4">
          <Users className="w-12 h-12 text-pink-400 mx-auto" />
          <h3 className="text-xl font-serif font-bold text-pink-950">No Members Found</h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto font-normal">
            We couldn't find any member matching "{searchTerm}". Try clearing your search term or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGroup('All');
              setSelectedCategory('All');
            }}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-600 text-white hover:bg-pink-500 transition shadow-md"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Dual CTA Section: Join Network & Book Ad Space */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Network Join CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-white to-pink-50 border border-pink-200 text-left flex flex-col justify-between space-y-4 shadow-sm">
          <div>
            <h3 className="text-xl font-serif font-bold text-pink-950">Are you a Woman Entrepreneur?</h3>
            <p className="text-xs text-gray-700 font-normal mt-1">Get listed on Gulabi Visionaries directory and boost your business referrals across Rajasthan.</p>
          </div>
          <Link
            to="/join"
            className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md self-start flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Apply to Join Network</span>
          </Link>
        </div>

        {/* Book Website Ad Space CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-900 via-rose-950 to-pink-950 text-white border border-pink-700 text-left flex flex-col justify-between space-y-4 shadow-md relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-500/20 text-pink-200 border border-pink-400/30 inline-block">
              📢 FEATURED PROMO BANNER
            </span>
            <h3 className="text-xl font-serif font-bold text-white">Book Ad Space on Our Website</h3>
            <p className="text-xs text-pink-100 font-normal leading-relaxed">
              Showcase your enterprise, product catalog, or video promo to 300+ women entrepreneurs and daily site visitors.
            </p>
          </div>
          
          <a
            href={`https://wa.me/919001299931?text=${encodeURIComponent("Hello Gulabi Visionaries, I would like to inquire about booking Ad Space / Promo Banner on your website.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-md self-start flex items-center gap-2 relative z-10 transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Book Ad Space via WhatsApp (+91 90012 99931)</span>
          </a>
        </div>

      </div>

    </div>
  );
};

