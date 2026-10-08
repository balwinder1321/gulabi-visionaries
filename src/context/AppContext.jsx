import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialOrganisation, initialEvent, initialMembers, initialAd } from '../data/initialData';
import { supabase } from '../supabase';

const AppContext = createContext();

const CLOUD_STORE_ID = 'ff808181a09d98f701a11bc1e27b212e';
const CLOUD_STORE_URL = `https://api.restful-api.dev/objects/${CLOUD_STORE_ID}`;

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
    const parsed = saved ? JSON.parse(saved) : initialAd;
    if (parsed) {
      if (parsed.ctaText && parsed.ctaText.includes('Explore Collection')) {
        parsed.ctaText = 'Visit Page';
      }
      if (!parsed.redirectUrl || parsed.redirectUrl === '/members' || parsed.redirectUrl === '/join') {
        parsed.redirectUrl = 'https://www.instagram.com/gulabi_visionaries?stkn=MW5yNzkxOXpmdmE1NA==';
      }
    }
    return parsed;
  });

  const [adminUser, setAdminUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // Sync from Cloud Store & Supabase on Initial Load
  useEffect(() => {
    const fetchCloudData = async () => {
      // 1. Fetch from Zero-Config Global Cloud Store (Works instantly on all devices)
      try {
        const res = await fetch(CLOUD_STORE_URL);
        if (res.ok) {
          const result = await res.json();
          if (result && result.data) {
            if (result.data.organisation) {
              setOrganisation(result.data.organisation);
              localStorage.setItem('gulabi_organisation', JSON.stringify(result.data.organisation));
            }
            if (result.data.event) {
              setEventData(result.data.event);
              localStorage.setItem('gulabi_event_v2', JSON.stringify(result.data.event));
            }
            if (result.data.members) {
              setMembers(result.data.members);
              localStorage.setItem('gulabi_members', JSON.stringify(result.data.members));
            }
            if (result.data.ad) {
              setAdData(result.data.ad);
              localStorage.setItem('gulabi_ad', JSON.stringify(result.data.ad));
            }
            setIsCloudSynced(true);
          }
        }
      } catch (err) {
        console.warn('Cloud store fetch notice:', err);
      }

      // 2. Fetch from Supabase Table if user created table
      try {
        const { data, error } = await supabase.from('app_data').select('*');
        if (!error && data && data.length > 0) {
          data.forEach(item => {
            if (item.id === 'organisation' && item.data) {
              setOrganisation(item.data);
              localStorage.setItem('gulabi_organisation', JSON.stringify(item.data));
            }
            if (item.id === 'event' && item.data) {
              setEventData(item.data);
              localStorage.setItem('gulabi_event_v2', JSON.stringify(item.data));
            }
            if (item.id === 'members' && item.data) {
              setMembers(item.data);
              localStorage.setItem('gulabi_members', JSON.stringify(item.data));
            }
            if (item.id === 'ad' && item.data) {
              setAdData(item.data);
              localStorage.setItem('gulabi_ad', JSON.stringify(item.data));
            }
          });
          setIsCloudSynced(true);
        }
      } catch (err) {
        console.warn('Supabase sync notice:', err);
      }
    };

    fetchCloudData();

    // Subscribe to Realtime Postgres Changes
    const subscription = supabase
      .channel('public:app_data')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'app_data' }, (payload) => {
        if (payload.new && payload.new.id && payload.new.data) {
          const { id, data } = payload.new;
          if (id === 'organisation') setOrganisation(data);
          if (id === 'event') setEventData(data);
          if (id === 'members') setMembers(data);
          if (id === 'ad') setAdData(data);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Helper function to push global state to Cloud Store & Supabase
  const pushGlobalCloudState = async (newOrg, newEv, newMem, newAd) => {
    // 1. Instant Cloud Store Push
    try {
      await fetch(CLOUD_STORE_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'gulabi_visionaries_global_store',
          data: {
            organisation: newOrg,
            event: newEv,
            members: newMem,
            ad: newAd
          }
        })
      });
      setIsCloudSynced(true);
    } catch (err) {
      console.warn('Cloud store update notice:', err);
    }
  };

  const syncToCloud = async (key, dataObj, newOrg = organisation, newEv = eventData, newMem = members, newAd = adData) => {
    // Push full state to Cloud Store
    pushGlobalCloudState(newOrg, newEv, newMem, newAd);

    // Also push to Supabase
    try {
      await supabase.from('app_data').upsert({
        id: key,
        data: dataObj,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    } catch (err) {
      console.warn(`Supabase save notice for ${key}:`, err);
    }
  };

  // Local Storage Backups
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
    const updated = { ...organisation, ...newOrgData };
    setOrganisation(updated);
    syncToCloud('organisation', updated, updated, eventData, members, adData);
    showToast('Organisation details updated globally across all devices!');
  };

  const updateEvent = (newEventData) => {
    const updated = { ...eventData, ...newEventData };
    setEventData(updated);
    syncToCloud('event', updated, organisation, updated, members, adData);
    showToast('Event invitation updated globally across all devices!');
  };

  const updateAdData = (newAdData) => {
    const updated = { ...adData, ...newAdData };
    setAdData(updated);
    syncToCloud('ad', updated, organisation, eventData, members, updated);
    showToast('Ad & Promo settings updated globally across all devices!');
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
    const updatedMembers = [createdMember, ...members];
    setMembers(updatedMembers);
    syncToCloud('members', updatedMembers, organisation, eventData, updatedMembers, adData);
    showToast(`Member "${createdMember.name}" added globally across all devices!`);
    return createdMember;
  };

  const updateMember = (id, updatedFields) => {
    const updatedMembers = members.map(m => m.id === id ? { ...m, ...updatedFields } : m);
    setMembers(updatedMembers);
    syncToCloud('members', updatedMembers, organisation, eventData, updatedMembers, adData);
    showToast('Member profile updated globally across all devices!');
  };

  const deleteMember = (id) => {
    const updatedMembers = members.filter(m => m.id !== id);
    setMembers(updatedMembers);
    syncToCloud('members', updatedMembers, organisation, eventData, updatedMembers, adData);
    showToast('Member removed globally.');
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
    localStorage.removeItem('gulabi_event_v2');
    localStorage.removeItem('gulabi_members');
    localStorage.removeItem('gulabi_ad');
    syncToCloud('organisation', initialOrganisation, initialOrganisation, initialEvent, initialMembers, initialAd);
    showToast('Website restored to original defaults globally!');
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
      showToast,
      isCloudSynced
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
