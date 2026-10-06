import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialOrganisation, initialEvent, initialMembers, initialAd } from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [organisation, setOrganisation] = useState(() => {
    const saved = localStorage.getItem('gulabi_organisation');
    return saved ? JSON.parse(saved) : initialOrganisation;
  });

  const [eventData, setEventData] = useState(() => {
    const saved = localStorage.getItem('gulabi_event_v2');
    return saved ? JSON.parse(saved) : initialEvent;
  });

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('gulabi_members');
    return saved ? JSON.parse(saved) : initialMembers;
  });

  const [adData, setAdData] = useState(() => {
    const saved = localStorage.getItem('gulabi_ad');
    return saved ? JSON.parse(saved) : initialAd;
  });

  const [adminUser, setAdminUser] = useState(null);

  const [toastMessage, setToastMessage] = useState(null);

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('gulabi_organisation', JSON.stringify(organisation));
  }, [organisation]);

  useEffect(() => {
    localStorage.setItem('gulabi_event_v2', JSON.stringify(eventData));
  }, [eventData]);

  useEffect(() => {
    localStorage.setItem('gulabi_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('gulabi_ad', JSON.stringify(adData));
  }, [adData]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const updateOrganisation = (newOrgData) => {
    setOrganisation(prev => ({ ...prev, ...newOrgData }));
    showToast('Organisation details updated successfully!');
  };

  const updateEvent = (newEventData) => {
    setEventData(prev => ({ ...prev, ...newEventData }));
    showToast('Event invitation details updated successfully!');
  };

  const updateAdData = (newAdData) => {
    setAdData(prev => ({ ...prev, ...newAdData }));
    showToast('Ad & Promo settings updated successfully!');
  };

  const addMember = (newMember) => {
    const id = Date.now().toString();
    const createdMember = {
      id,
      name: newMember.name || 'New Member',
      company: newMember.company || 'Business',
      designation: newMember.designation || 'Entrepreneur',
      category: newMember.category || 'General',
      email: newMember.email || '',
      phone: newMember.phone || '',
      group: newMember.group || 'Diary Pearl',
      photo: newMember.photo || '/members/member_17_pratibha_chaturvedi.jpeg',
      bio: newMember.bio || 'Member of Gulabi Visionaries network.'
    };
    setMembers(prev => [createdMember, ...prev]);
    showToast(`Member "${createdMember.name}" added successfully!`);
    return createdMember;
  };

  const updateMember = (id, updatedFields) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
    showToast('Member profile updated successfully!');
  };

  const deleteMember = (id) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    showToast('Member removed from directory.');
  };

  const loginAdmin = (email, password) => {
    if ((email === 'admin@gulabi.org' || email === 'admin') && password === 'admin123') {
      const user = { email: 'admin@gulabi.org', name: 'Prachi Agrawal (Admin)', role: 'admin' };
      setAdminUser(user);
      showToast('Welcome back, Admin!');
      return { success: true };
    }
    if (email && password && password.length >= 6) {
      const user = { email, name: 'Gulabi Admin', role: 'admin' };
      setAdminUser(user);
      showToast('Admin logged in successfully!');
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials. Use admin@gulabi.org / admin123' };
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    showToast('Admin logged out safely.');
  };

  const resetToDefaults = () => {
    setOrganisation(initialOrganisation);
    setEventData(initialEvent);
    setMembers(initialMembers);
    setAdData(initialAd);
    localStorage.removeItem('gulabi_organisation');
    localStorage.removeItem('gulabi_event');
    localStorage.removeItem('gulabi_members');
    localStorage.removeItem('gulabi_ad');
    showToast('Website restored to original defaults!');
  };

  return (
    <AppContext.Provider value={{
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
      adminUser,
      loginAdmin,
      logoutAdmin,
      resetToDefaults,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
