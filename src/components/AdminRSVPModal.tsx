import React from 'react';
import { RSVPResponse } from '../types';
import { X, Users, CheckCircle, XCircle, Trash2 } from 'lucide-react';

interface AdminRSVPModalProps {
  rsvps: RSVPResponse[];
  onClose: () => void;
  onClear: () => void;
}

export const AdminRSVPModal: React.FC<AdminRSVPModalProps> = ({ rsvps, onClose, onClear }) => {
  const totalAttendingGuests = rsvps
    .filter((r) => r.attending)
    .reduce((sum, r) => sum + r.guestCount, 0);

  const totalResponses = rsvps.length;
  const attendingCount = rsvps.filter((r) => r.attending).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[85vh] rounded-3xl bg-[#FAF5EF] p-6 shadow-2xl border-2 border-[#D4AF37] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/40">
          <div>
            <h3 className="font-serif-title text-2xl font-bold text-[#5C0E20]">
              Той конокторунун тизмеси
            </h3>
            <p className="font-sans-clean text-xs text-[#8B1E3F]">
              Той ээлери үчүн RSVP баракчасы
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#8B1E3F]/10 text-[#8B1E3F] hover:bg-[#8B1E3F]/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary Grid */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="p-3 rounded-2xl bg-[#8B1E3F]/10 border border-[#D4AF37]/30 text-center">
            <span className="font-sans-clean text-[10px] uppercase text-[#8B1E3F]">Жалпы адам</span>
            <p className="font-serif-title font-bold text-2xl text-[#5C0E20]">{totalAttendingGuests}</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#28A745]/10 border border-[#28A745]/30 text-center">
            <span className="font-sans-clean text-[10px] uppercase text-[#28A745]">Катышат</span>
            <p className="font-serif-title font-bold text-2xl text-[#28A745]">{attendingCount}</p>
          </div>

          <div className="p-3 rounded-2xl bg-red-100 border border-red-200 text-center">
            <span className="font-sans-clean text-[10px] uppercase text-red-700">Келе албайт</span>
            <p className="font-serif-title font-bold text-2xl text-red-700">
              {totalResponses - attendingCount}
            </p>
          </div>
        </div>

        {/* List of Guests */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 my-2">
          {rsvps.length === 0 ? (
            <p className="text-center py-8 text-gray-500 font-serif-title italic">
              Азырынча жооптор жок. Коноктор анкетти толтурганда ушул жерде көрүнөт.
            </p>
          ) : (
            rsvps.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm flex items-center justify-between"
              >
                <div>
                  <h5 className="font-serif-title font-bold text-lg text-[#3D0914]">
                    {item.name}
                  </h5>
                  <p className="font-sans-clean text-xs text-gray-500">
                    Жөнөтүлгөн убактысы: {item.submittedAt}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {item.attending ? (
                    <span className="px-3 py-1 rounded-full bg-[#28A745]/10 text-[#28A745] text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{item.guestCount} адам</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Келбейт</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-[#D4AF37]/40 flex justify-between items-center">
          {rsvps.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-red-600 font-sans-clean flex items-center gap-1 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Тизмени тазалоо</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto py-2 px-5 rounded-xl bg-[#8B1E3F] text-white font-serif-title font-bold text-sm"
          >
            Жабуу
          </button>
        </div>
      </div>
    </div>
  );
};
