import React, { useState } from 'react';
import { MapPin, Navigation, Calendar, Clock, X, ExternalLink } from 'lucide-react';

export const LocationCard: React.FC = () => {
  const [showMapModal, setShowMapModal] = useState(false);

  const restaurantName = "«Алтын Казына» рестораны";
  const address = "Бишкек ш., Проспект Победы, 351";
  
  // Direct 2GIS and Google Maps URLs
  const gisLink = "https://2gis.kg/bishkek/search/%D0%90%D0%BB%D1%82%D1%8B%D0%BD%20%D0%9A%D0%B0%D0%B7%D1%8B%D0%BD%D0%B0";
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Алтын Казына ресторан " + address)}`;

  return (
    <section className="relative w-full max-w-lg mx-auto px-4 py-6">
      <div className="rounded-3xl royal-card p-8 text-center relative overflow-hidden">
        {/* Header Badge */}
        <div className="inline-flex p-3 rounded-full bg-[#8B1E3F] text-[#FFF7F4] shadow-lg mb-4">
          <MapPin className="w-6 h-6" />
        </div>

        <p className="font-sans-clean text-xs uppercase tracking-widest text-[#8B1E3F] mb-1 font-bold">
          ТОЙ ДАРЕГИ
        </p>

        <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#5C0E20] mb-2">
          {restaurantName}
        </h3>

        <p className="font-sans-clean text-sm text-[#3D0914] mb-6 flex items-center justify-center gap-1.5">
          <Navigation className="w-4 h-4 text-[#8B1E3F]" />
          <span>{address}</span>
        </p>

        {/* Date & Time Pills */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-3.5 rounded-2xl bg-white border border-[#C48B9F]/40 flex flex-col items-center shadow-sm">
            <Calendar className="w-4 h-4 text-[#8B1E3F] mb-1" />
            <span className="font-sans-clean text-[10px] uppercase text-[#8B1E3F] font-bold">Датасы</span>
            <span className="font-serif-title font-bold text-lg text-[#5C0E20]">12.09.2026</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#C48B9F]/40 flex flex-col items-center shadow-sm">
            <Clock className="w-4 h-4 text-[#8B1E3F] mb-1" />
            <span className="font-sans-clean text-[10px] uppercase text-[#8B1E3F] font-bold">Убактысы</span>
            <span className="font-serif-title font-bold text-lg text-[#5C0E20]">16:00</span>
          </div>
        </div>

        {/* Button: "КАРТАНЫ АЧУУ" */}
        <button
          onClick={() => setShowMapModal(true)}
          className="w-full py-4 px-6 rounded-2xl burgundy-gradient-bg text-[#FFF7F4] font-serif-title text-xl font-bold tracking-wider shadow-lg hover:shadow-xl border border-[#C48B9F] transition-all flex items-center justify-center gap-3 active:scale-98 cursor-pointer"
        >
          <Navigation className="w-5 h-5 text-[#FFF7F4]" />
          <span>КАРТАНЫ АЧУУ</span>
        </button>
      </div>

      {/* Map Modal Window */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-[#FDF8F5] p-6 shadow-2xl border-2 border-[#C48B9F]">
            <button
              onClick={() => setShowMapModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#8B1E3F]/10 text-[#8B1E3F] hover:bg-[#8B1E3F]/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-serif-title text-xl font-bold text-[#5C0E20] mb-1 text-center">
              {restaurantName}
            </h4>
            <p className="font-sans-clean text-xs text-center text-[#8B1E3F] mb-5">
              {address}
            </p>

            {/* Embedded Interactive Google Map */}
            <div className="w-full h-48 rounded-2xl overflow-hidden border border-[#C48B9F] mb-5 shadow-inner">
              <iframe
                title="Ресторан Алтын Казына"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.38073822187!2d74.60!3d42.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDUyJzE1LjAiTiA3NMKwMzYnMTUuMCJF!5e0!3m2!1sen!2skg!4v1620000000000!5m2!1sen!2skg"
                allowFullScreen
              ></iframe>
            </div>

            <div className="space-y-3">
              <a
                href={gisLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#28A745] hover:bg-[#218838] text-white font-sans-clean text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>2GIS картадан ачуу</span>
              </a>

              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-sans-clean text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Google Maps картадан ачуу</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
