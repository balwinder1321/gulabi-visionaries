import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CalendarButton = ({ className = '' }) => {
  const { eventData } = useApp();

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(eventData.name || 'Gulabi Visionaries Event');
    const details = encodeURIComponent(eventData.description || '');
    const location = encodeURIComponent(`${eventData.venue}, ${eventData.address}`);
    
    // Parse date (e.g. 2026-11-15 -> 20261115T103000Z)
    const dateStr = (eventData.date || '2026-11-15').replace(/-/g, '');
    const dates = `${dateStr}T050000Z/${dateStr}T083000Z`;

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(googleUrl, '_blank');
  };

  const handleDownloadICS = () => {
    const title = eventData.name || 'Gulabi Visionaries Event';
    const details = eventData.description || '';
    const location = `${eventData.venue}, ${eventData.address}`;
    const dateStr = (eventData.date || '2026-11-15').replace(/-/g, '');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Gulabi Visionaries//Event Invitation//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
DTSTART:${dateStr}T050000Z
DTEND:${dateStr}T083000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <button
        onClick={handleGoogleCalendar}
        className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-600 hover:bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] transition duration-300 flex items-center gap-2"
      >
        <Calendar className="w-4 h-4 text-white" />
        <span>Add to Google Calendar</span>
      </button>

      <button
        onClick={handleDownloadICS}
        className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 border border-pink-200 hover:bg-pink-600 text-pink-900 hover:text-white transition duration-300 flex items-center gap-2 shadow-sm"
      >
        <Download className="w-4 h-4 text-pink-600" />
        <span>Download .ICS File</span>
      </button>
    </div>
  );
};
