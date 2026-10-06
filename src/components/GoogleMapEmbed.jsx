import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export const GoogleMapEmbed = ({ mapsUrl, venueName, address }) => {
  // Extract or convert URL for embedding safely
  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('google.com/maps/embed')) return url;
    
    // Convert regular search / share URL to embed URL or search iframe
    const encodedAddress = encodeURIComponent(address || venueName || 'Jaipur Rajasthan');
    return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const embedUrl = getEmbedUrl(mapsUrl);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-pink-200 bg-white shadow-md">
      {embedUrl ? (
        <iframe
          title="Event Location Map"
          src={embedUrl}
          className="w-full h-72 sm:h-96 border-0 filter contrast-105"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ) : (
        <div className="h-72 sm:h-96 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-pink-50 to-white">
          <MapPin className="w-12 h-12 text-pink-600 mb-3 animate-bounce" />
          <h4 className="text-xl font-serif font-bold text-pink-950">{venueName}</h4>
          <p className="text-sm text-pink-800 max-w-md mt-1 font-medium">{address}</p>
        </div>
      )}

      {/* Overlay Bar with Open Map Link */}
      <div className="p-4 bg-white/95 backdrop-blur-md border-t border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-600 shrink-0 shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-pink-700">Venue Address</span>
            <span className="block text-sm font-semibold text-gray-900">{address || 'MI Road, Jaipur, Rajasthan'}</span>
          </div>
        </div>

        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 border border-pink-300 hover:bg-pink-600 hover:border-pink-600 text-pink-900 hover:text-white transition duration-300 flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
