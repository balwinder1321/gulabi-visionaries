import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Calendar, Users, Building, ShieldCheck, LogOut, Plus, Edit, Trash2, Save, RotateCcw, ExternalLink, Sparkles, X, Check, Image, MapPin, Upload, Play, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminDashboardPage = () => {
  const {
    adminUser,
    logoutAdmin,
    organisation,
    updateOrganisation,
    eventData,
    updateEvent,
    members,
    addMember,
    updateMember,
    deleteMember,
    adData,
    updateAdData,
    resetToDefaults
  } = useApp();

  const navigate = useNavigate();

  // If not logged in as admin, redirect to login
  if (!adminUser) {
    return <Navigate to="/admin" replace />;
  }

  const [activeTab, setActiveTab] = useState('event'); // 'event', 'members', 'organisation', 'ads'

  // Editable Event State
  const [eventForm, setEventForm] = useState(eventData);

  // Editable Organisation State
  const [orgForm, setOrgForm] = useState(organisation);

  // Editable Ad State
  const [adForm, setAdForm] = useState(adData || {
    enabled: true,
    title: 'Featured Enterprise Promo',
    subtitle: 'Check out our featured deals from Gulabi Visionaries members.',
    mediaType: 'image',
    mediaUrl: '/members/member_17_pratibha_chaturvedi.jpeg',
    redirectUrl: '/members',
    skipSeconds: 3,
    badgeText: 'SPONSORED AD',
    ctaText: 'Visit Featured Page ›'
  });

  // Member Modal State (Add / Edit)
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [memberForm, setMemberForm] = useState({
    name: '',
    company: '',
    designation: '',
    category: '',
    email: '',
    phone: '',
    group: 'Diary Pearl',
    photo: '/members/member_17_pratibha_chaturvedi.jpeg',
    bio: ''
  });

  const handleBannerFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventForm(prev => ({ ...prev, bannerImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdMediaFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const isVideo = file.type.startsWith('video/');
        setAdForm(prev => ({
          ...prev,
          mediaUrl: reader.result,
          mediaType: isVideo ? 'video' : 'image'
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMemberPhotoFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberForm(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    updateEvent(eventForm);
  };

  const handleSaveOrganisation = (e) => {
    e.preventDefault();
    updateOrganisation(orgForm);
  };

  const handleSaveAd = (e) => {
    e.preventDefault();
    updateAdData(adForm);
  };

  const handleOpenAddMember = () => {
    setEditingMemberId(null);
    setMemberForm({
      name: '',
      company: '',
      designation: '',
      category: 'General Business',
      email: '',
      phone: '',
      group: 'Diary Pearl',
      photo: '/members/member_17_pratibha_chaturvedi.jpeg',
      bio: ''
    });
    setMemberModalOpen(true);
  };

  const handleOpenEditMember = (member) => {
    setEditingMemberId(member.id);
    setMemberForm({ ...member });
    setMemberModalOpen(true);
  };

  const handleSaveMemberForm = (e) => {
    e.preventDefault();
    if (editingMemberId) {
      updateMember(editingMemberId, memberForm);
    } else {
      addMember(memberForm);
    }
    setMemberModalOpen(false);
  };

  const handleDeleteMember = (id, name) => {
    if (window.confirm(`Are you sure you want to delete member "${name}"?`)) {
      deleteMember(id);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Header */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-pink-200 shadow-md flex flex-col md:flex-row items-start sm:items-center justify-between gap-4 text-left text-slate-900">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-pink-100 border border-pink-300 text-pink-600 flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-pink-700 block">CMS Control Panel</span>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-pink-950">Admin Dashboard</h1>
            <p className="text-[11px] sm:text-xs text-gray-600">Logged in: <span className="text-pink-950 font-bold">{adminUser?.name || adminUser?.email}</span></p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start sm:justify-end">
          <button
            onClick={() => {
              if (window.confirm('Restore all organisation, event, and member data to original PDF defaults?')) {
                resetToDefaults();
                setEventForm(eventData);
                setOrgForm(organisation);
              }
            }}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold bg-pink-50 border border-pink-200 text-pink-900 hover:bg-pink-100 transition flex items-center gap-1.5 shadow-sm"
            title="Reset to Original PDF Data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-pink-600" />
            <span>Reset Defaults</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold bg-pink-50 border border-pink-200 text-pink-900 hover:bg-pink-100 transition flex items-center gap-1.5 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-pink-600" />
            <span>View Live Site</span>
          </a>

          <button
            onClick={() => {
              logoutAdmin();
              navigate('/admin');
            }}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-rose-50 border border-rose-300 text-rose-700 hover:bg-rose-600 hover:text-white transition flex items-center gap-1.5 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-pink-200 pb-2 overflow-x-auto no-scrollbar scroll-smooth">
        <button
          onClick={() => setActiveTab('event')}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shrink-0 ${
            activeTab === 'event'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
              : 'bg-white text-pink-900 border border-pink-200 hover:bg-pink-50 shadow-sm'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Event</span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shrink-0 ${
            activeTab === 'members'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
              : 'bg-white text-pink-900 border border-pink-200 hover:bg-pink-50 shadow-sm'
          }`}
        >
          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Members ({members.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('organisation')}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shrink-0 ${
            activeTab === 'organisation'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
              : 'bg-white text-pink-900 border border-pink-200 hover:bg-pink-50 shadow-sm'
          }`}
        >
          <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Organisation</span>
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shrink-0 ${
            activeTab === 'ads'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
              : 'bg-white text-pink-900 border border-pink-200 hover:bg-pink-50 shadow-sm'
          }`}
        >
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Ad & Banner</span>
        </button>
      </div>


      {/* TAB 1: EVENT MANAGEMENT */}
      {activeTab === 'event' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 sm:p-8 rounded-3xl bg-white border border-pink-200 shadow-xl text-left space-y-6">
          <div className="flex items-center justify-between border-b border-pink-100 pb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-pink-950">Event Invitation Details</h2>
              <p className="text-xs text-gray-600">Changes will automatically update the public invitation pass & countdown timer.</p>
            </div>
            <Link to="/invitation" className="text-xs text-pink-600 font-semibold underline hover:text-pink-800 transition" target="_blank">
              Preview Invitation Page ›
            </Link>
          </div>

          <form onSubmit={handleSaveEvent} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Event Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.name}
                  onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Event Date (YYYY-MM-DD)
                </label>
                <input
                  type="date"
                  required
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Day of Week
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunday"
                  value={eventForm.day}
                  onChange={(e) => setEventForm({ ...eventForm, day: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10:30 AM IST"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Venue Name
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.venue}
                  onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Full Venue Address
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.address}
                  onChange={(e) => setEventForm({ ...eventForm, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Google Maps Location URL
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/?q=..."
                  value={eventForm.googleMapsUrl}
                  onChange={(e) => setEventForm({ ...eventForm, googleMapsUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Invitation Banner / Flyer Image
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2.5 rounded-2xl bg-pink-100 border border-pink-300 hover:bg-pink-200 text-pink-900 text-xs font-bold uppercase cursor-pointer transition flex items-center gap-2 shrink-0 shadow-sm">
                      <Upload className="w-4 h-4 text-pink-600" />
                      <span>Upload Banner from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerFileUpload}
                      />
                    </label>
                    {eventForm.bannerImage && (
                      <div className="flex items-center gap-2">
                        <img src={eventForm.bannerImage} alt="Banner Preview" className="w-16 h-10 object-cover object-top rounded-xl border border-pink-300 shadow-sm" />
                        <span className="text-[10px] text-emerald-600 font-bold">✓ Image Loaded</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Or paste image URL / path"
                    value={eventForm.bannerImage}
                    onChange={(e) => setEventForm({ ...eventForm, bannerImage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-xs font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                Event Description
              </label>
              <textarea
                rows="4"
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
              ></textarea>
            </div>

            {/* Meeting Schedule / Agenda Editor */}
            <div className="space-y-4 pt-4 border-t border-pink-100 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-extrabold text-pink-950">Meeting Schedule / Timeline</h3>
                  <p className="text-xs text-gray-600">Customize each session time & title displayed on the VIP invitation pass.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newAgenda = [...(eventForm.agenda || []), { time: '12:00 PM', title: 'New Schedule Session', desc: '' }];
                    setEventForm({ ...eventForm, agenda: newAgenda });
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-pink-100 text-pink-800 hover:bg-pink-600 hover:text-white transition flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Session</span>
                </button>
              </div>

              <div className="space-y-3">
                {(eventForm.agenda || []).map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-200 flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-full sm:w-36 shrink-0">
                      <label className="block text-[10px] font-bold uppercase text-pink-900 mb-1">Time</label>
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => {
                          const updated = [...eventForm.agenda];
                          updated[idx] = { ...updated[idx], time: e.target.value };
                          setEventForm({ ...eventForm, agenda: updated });
                        }}
                        placeholder="12:00 PM"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-pink-200 text-xs font-bold text-pink-950 outline-none focus:border-pink-500"
                      />
                    </div>

                    <div className="w-full flex-1">
                      <label className="block text-[10px] font-bold uppercase text-pink-900 mb-1">Session Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...eventForm.agenda];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setEventForm({ ...eventForm, agenda: updated });
                        }}
                        placeholder="Session title"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-pink-200 text-xs font-semibold text-gray-900 outline-none focus:border-pink-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = eventForm.agenda.filter((_, i) => i !== idx);
                        setEventForm({ ...eventForm, agenda: updated });
                      }}
                      className="p-2.5 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white transition shrink-0 self-end sm:self-center"
                      title="Remove Session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Event Details</span>
            </button>
          </form>
        </motion.div>
      )}


      {/* TAB 2: MEMBER MANAGEMENT */}
      {activeTab === 'members' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-pink-200 shadow-xl">
            <div className="text-left">
              <h2 className="text-2xl font-serif font-bold text-pink-950">Members Directory Management</h2>
              <p className="text-xs text-gray-600">Add, edit or remove directory members. Changes update public directory live.</p>
            </div>
            
            <button
              onClick={handleOpenAddMember}
              className="px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md flex items-center gap-2 shrink-0 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Member</span>
            </button>
          </div>

          {/* Members Table / List */}
          <div className="rounded-3xl bg-white border border-pink-200 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-pink-100/70 text-xs font-bold uppercase tracking-wider text-pink-950 border-b border-pink-200">
                  <tr>
                    <th className="py-4 px-6">Member Photo & Name</th>
                    <th className="py-4 px-6">Company & Category</th>
                    <th className="py-4 px-6">Group</th>
                    <th className="py-4 px-6">Contact Info</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-100">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-pink-50/50 transition">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img src={m.photo} alt={m.name} className="w-10 h-10 rounded-full object-cover object-top border border-pink-300 shadow-sm" />
                        <div>
                          <span className="font-bold text-pink-950 block">{m.name}</span>
                          <span className="text-xs text-pink-700 font-medium block">{m.designation}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-900 block">{m.company}</span>
                        <span className="text-xs text-gray-500 block">{m.category}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-pink-100 text-pink-800 border border-pink-300">
                          {m.group}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs space-y-0.5">
                        <div className="text-gray-700 font-medium">{m.phone}</div>
                        <div className="text-pink-600 font-semibold">{m.email}</div>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditMember(m)}
                          className="p-2 rounded-xl bg-pink-100 text-pink-800 hover:bg-pink-600 hover:text-white border border-pink-200 transition shadow-sm"
                          title="Edit Member"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(m.id, m.name)}
                          className="p-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 transition shadow-sm"
                          title="Delete Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </motion.div>
      )}


      {/* TAB 3: ORGANISATION MANAGEMENT */}
      {activeTab === 'organisation' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 sm:p-8 rounded-3xl bg-white border border-pink-200 shadow-xl text-left space-y-6">
          <div className="border-b border-pink-100 pb-4">
            <h2 className="text-2xl font-serif font-bold text-pink-950">Organisation Branding & Information</h2>
            <p className="text-xs text-gray-600">Edit organisation name, logo, mission statement, tagline, and contact info.</p>
          </div>

          <form onSubmit={handleSaveOrganisation} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Organisation Name
                </label>
                <input
                  type="text"
                  required
                  value={orgForm.name}
                  onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Tagline
                </label>
                <input
                  type="text"
                  value={orgForm.tagline}
                  onChange={(e) => setOrgForm({ ...orgForm, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Contact Phone & WhatsApp
                </label>
                <input
                  type="text"
                  value={orgForm.contactPhone}
                  onChange={(e) => setOrgForm({ ...orgForm, contactPhone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Contact Email Address
                </label>
                <input
                  type="email"
                  value={orgForm.contactEmail}
                  onChange={(e) => setOrgForm({ ...orgForm, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Members Directory Page Visibility Toggle */}
            <div className="p-5 rounded-2xl bg-pink-50/80 border-2 border-pink-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-pink-950">Members Directory Page Visibility</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${orgForm.showMembersDirectory ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-gray-200 text-gray-700'}`}>
                    {orgForm.showMembersDirectory ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-normal">
                  When disabled, the Members Directory page and navbar tab are hidden. You can enable it anytime from this switch.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={!!orgForm.showMembersDirectory}
                  onChange={(e) => setOrgForm({ ...orgForm, showMembersDirectory: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
              </label>
            </div>

            {/* Invitation Pass Header Branding Option */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                Invitation Pass Header Branding
              </label>
              <input
                type="text"
                placeholder="e.g. Empowering Women or Gulabi Visionaries"
                value={orgForm.invitationBranding ?? 'Empowering Women'}
                onChange={(e) => setOrgForm({ ...orgForm, invitationBranding: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
              />
              <p className="text-[11px] text-gray-500 font-normal mt-1">
                Controls the header badge title on the Invitation Pass page. Change to "Empowering Women" or "Gulabi Visionaries" anytime.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                Logo Image URL / Path
              </label>
              <input
                type="text"
                value={orgForm.logo}
                onChange={(e) => setOrgForm({ ...orgForm, logo: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                About / Overview Description
              </label>
              <textarea
                rows="4"
                value={orgForm.about}
                onChange={(e) => setOrgForm({ ...orgForm, about: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                Mission Statement
              </label>
              <textarea
                rows="4"
                value={orgForm.mission}
                onChange={(e) => setOrgForm({ ...orgForm, mission: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Organisation Info</span>
            </button>
          </form>
        </motion.div>
      )}


      {/* TAB 4: AD & BANNER MANAGEMENT */}
      {activeTab === 'ads' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 sm:p-8 rounded-3xl bg-white border border-pink-200 shadow-xl text-left space-y-6">
          <div className="flex items-center justify-between border-b border-pink-100 pb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-pink-950">Home Page Advertisement & Video Controls</h2>
              <p className="text-xs text-gray-600">Configure pop-up ads, video ads, or poster banners displayed to visitors on the home page.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-pink-950 uppercase">Enable Home Ad Popup:</label>
              <input
                type="checkbox"
                checked={adForm.enabled}
                onChange={(e) => setAdForm({ ...adForm, enabled: e.target.checked })}
                className="w-5 h-5 accent-pink-600 cursor-pointer"
              />
            </div>
          </div>

          <form onSubmit={handleSaveAd} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Ad Title / Headline
                </label>
                <input
                  type="text"
                  required
                  value={adForm.title}
                  onChange={(e) => setAdForm({ ...adForm, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Ad Subtitle / Short Description
                </label>
                <input
                  type="text"
                  value={adForm.subtitle}
                  onChange={(e) => setAdForm({ ...adForm, subtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Ad Media Type
                </label>
                <select
                  value={adForm.mediaType}
                  onChange={(e) => setAdForm({ ...adForm, mediaType: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="image">Poster Image</option>
                  <option value="video">Video (MP4 / YouTube)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Skip Delay (Seconds)
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={adForm.skipSeconds}
                  onChange={(e) => setAdForm({ ...adForm, skipSeconds: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Click Redirect Link URL (Target Webpage / WhatsApp / Instagram)
                </label>
                <input
                  type="text"
                  placeholder="https://... or /members"
                  value={adForm.redirectUrl}
                  onChange={(e) => setAdForm({ ...adForm, redirectUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Upload Ad Poster / Video from Device
                </label>
                <div className="space-y-2">
                  <label className="px-4 py-2.5 rounded-2xl bg-pink-100 border border-pink-300 hover:bg-pink-200 text-pink-900 text-xs font-bold uppercase cursor-pointer transition flex items-center justify-center gap-2 shadow-sm">
                    <Upload className="w-4 h-4 text-pink-600" />
                    <span>Upload Image / Video File</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleAdMediaFileUpload}
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="Or paste image / video URL"
                    value={adForm.mediaUrl}
                    onChange={(e) => setAdForm({ ...adForm, mediaUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-xs font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Badge Tag Text
                </label>
                <input
                  type="text"
                  value={adForm.badgeText}
                  onChange={(e) => setAdForm({ ...adForm, badgeText: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={adForm.ctaText}
                  onChange={(e) => setAdForm({ ...adForm, ctaText: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Ad & Banner Settings</span>
            </button>
          </form>
        </motion.div>
      )}


      {/* ADD / EDIT MEMBER MODAL */}
      <AnimatePresence>
        {memberModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-pink-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left text-slate-900"
            >
              <button
                onClick={() => setMemberModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 text-pink-700 hover:text-white hover:bg-pink-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-serif font-bold text-pink-950 mb-6">
                {editingMemberId ? 'Edit Member Profile' : 'Add New Member to Directory'}
              </h3>

              <form onSubmit={handleSaveMemberForm} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-pink-950 mb-1">
                    Member Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-pink-950 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={memberForm.company}
                      onChange={(e) => setMemberForm({ ...memberForm, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-pink-950 mb-1">
                      Business Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={memberForm.category}
                      onChange={(e) => setMemberForm({ ...memberForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-pink-950 mb-1">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={memberForm.designation}
                    onChange={(e) => setMemberForm({ ...memberForm, designation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-pink-950 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={memberForm.phone}
                      onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-pink-950 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-pink-950 mb-1">
                      Directory Group
                    </label>
                    <select
                      value={memberForm.group}
                      onChange={(e) => setMemberForm({ ...memberForm, group: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                    >
                      <option value="Founders">Founders</option>
                      <option value="Diary Emerald">Diary Emerald</option>
                      <option value="Diary Pearl">Diary Pearl</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-pink-950 mb-1">
                      Member Photo
                    </label>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <label className="flex-1 px-3 py-2 rounded-xl bg-pink-100 border border-pink-300 hover:bg-pink-200 text-pink-900 text-xs font-bold uppercase cursor-pointer transition flex items-center justify-center gap-1.5 shadow-sm">
                          <Upload className="w-3.5 h-3.5 text-pink-600" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleMemberPhotoFileUpload}
                          />
                        </label>
                        {memberForm.photo && (
                          <img src={memberForm.photo} alt="Preview" className="w-9 h-9 rounded-full object-cover object-top border border-pink-300 shadow-sm shrink-0" />
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Or photo URL / path"
                        value={memberForm.photo}
                        onChange={(e) => setMemberForm({ ...memberForm, photo: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-xs font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-pink-950 mb-1">
                    Bio / Description
                  </label>
                  <textarea
                    rows="3"
                    value={memberForm.bio}
                    onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/70 border border-pink-200 text-gray-900 text-sm font-medium outline-none focus:border-pink-500 focus:bg-white transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 mt-4"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingMemberId ? 'Update Member Profile' : 'Add Member to Directory'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
