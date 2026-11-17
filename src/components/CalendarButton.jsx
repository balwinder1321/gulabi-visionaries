import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CalendarButton = ({ className = '' }) => {
  const { eventData } = useApp();

  const hasValidDate = eventData?.date && /^\d{4}-\d{2}-\d{2}$/.test(eventData.date);

  if (!hasValidDate) {
    return (
      <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full bg-pink-50 border border-pink-200 text-xs font-semibold text-pink-900 ${className}`}>
        <Calendar className="w-4 h-4 text-pink-600 shrink-0" />
        <span>Dates to be announced</span>
      </div>
    );
  }

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(eventData.name || 'Gulabi Visionaries Event');
    const details = encodeURIComponent(eventData.description || '');
    const location = encodeURIComponent(`${eventData.venue}, ${eventData.address}`);
    
    // Parse date (e.g. 2026-11-20 -> 20261120T053000Z for 11:00 AM to 1:00 PM IST)
    const dateStr = (eventData.date || '2026-11-20').replace(/-/g, '');
    const dates = `${dateStr}T053000Z/${dateStr}T073000Z`;

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(googleUrl, '_blank');
  };

  const handleDownloadICS = () => {
    const title = eventData.name || 'Gulabi Visionaries Event';
    const details = eventData.description || '';
    const location = `${eventData.venue}, ${eventData.address}`;
    const dateStr = (eventData.date || '2026-11-20').replace(/-/g, '');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Gulabi Visionaries//Event Invitation//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
DTSTART:${dateStr}T053000Z
DTEND:${dateStr}T073000Z
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
