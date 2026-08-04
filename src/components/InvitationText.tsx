import React from 'react';
import { Heart } from 'lucide-react';

export const InvitationText: React.FC = () => {
  // Days for September 2026 calendar view
  // Sept 12, 2026 is Saturday (Ишемби)
  const daysOfWeek = ['Иш', 'Ше', 'Ша', 'Тө', 'Жу', 'Иш', 'Жек'];
  const septemberDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <section className="relative w-full max-w-lg mx-auto px-4 py-8">
      <div className="relative rounded-3xl royal-card p-8 text-center overflow-hidden">
        {/* Top Hanging Floral Vine Illustration */}
        <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none opacity-80 flex justify-center">
          <svg viewBox="0 0 300 40" className="w-full h-full fill-[#8B1E3F]">
            <path d="M 0,0 Q 150,35 300,0 L 300,5 L 0,5 Z" fill="#8B1E3F" opacity="0.15" />
            <circle cx="150" cy="20" r="4" fill="#8B1E3F" />
            <circle cx="120" cy="15" r="3" fill="#D4AF37" />
            <circle cx="180" cy="15" r="3" fill="#D4AF37" />
          </svg>
        </div>

        {/* Heart Divider */}
        <div className="flex justify-center items-center gap-2 mb-6 mt-2 text-[#8B1E3F]">
          <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
          <Heart className="w-6 h-6 fill-[#8B1E3F] text-[#8B1E3F] animate-heartbeat" />
          <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
        </div>

        <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#5C0E20] mb-6 tracking-wide">
          Урматтуу коноктор!
        </h3>

        <div className="space-y-4 font-serif-title text-lg sm:text-xl text-[#3D0914] leading-relaxed">
          <p>
            Сиздерди балдарыбыз <span className="font-bold text-[#8B1E3F] text-2xl sm:text-3xl font-serif-title border-b-2 border-[#D4AF37]">Канатбек</span> менен <span className="font-bold text-[#8B1E3F] text-2xl sm:text-3xl font-serif-title border-b-2 border-[#D4AF37]">Бактыгүлдүн</span> үйлөнүү үлпөт тоюна арналган салтанатка келип, кадырлуу коногубуз болууга чакырабыз!
          </p>
        </div>

        {/* September 2026 Calendar Strip (matching video 00:11) */}
        <div className="mt-10 pt-6 border-t border-[#D4AF37]/30">
          <h4 className="font-script text-4xl text-[#8B1E3F] font-bold mb-4">
            Сентябрь
          </h4>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center font-sans-clean text-[10px] uppercase font-bold text-[#8B1E3F] mb-2">
            {daysOfWeek.map((day, idx) => (
              <span key={idx}>{day}</span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center font-serif-title text-sm font-semibold text-[#3D0914]">
            {/* September 1, 2026 starts on Tuesday (offset 1 day) */}
            <div className="col-span-1"></div>

            {septemberDays.map((day) => {
              const isWeddingDay = day === 12;
              return (
                <div
                  key={day}
                  className={`py-1.5 flex items-center justify-center relative ${
                    isWeddingDay ? 'z-10' : ''
                  }`}
                >
                  {isWeddingDay ? (
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#8B1E3F] text-[#FCF6BA] font-bold shadow-md animate-pulse">
                      <span>12</span>
                      <Heart className="absolute -top-1 -right-1 w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    </div>
                  ) : (
                    <span className="opacity-80">{day}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
