import React, { useState, useEffect } from 'react';

export const CountdownTimer: React.FC = () => {
  // Target wedding date: September 12, 2026 at 16:00
  const targetDate = new Date('2026-09-12T16:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full max-w-lg mx-auto px-4 py-6 text-center">
      <div className="rounded-3xl royal-card p-8 relative overflow-hidden">
        <h3 className="font-script text-4xl sm:text-5xl text-[#8B1E3F] font-bold mb-6">
          Той-кечесине чейин:
        </h3>

        {/* 4 Timer Circular Badges matching video */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#8B1E3F] bg-white flex items-center justify-center shadow-md">
              <span className="font-serif-title font-bold text-2xl sm:text-3xl text-[#5C0E20]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
            </div>
            <span className="font-sans-clean text-xs uppercase text-[#8B1E3F] mt-2 font-bold">
              күн
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#8B1E3F] bg-white flex items-center justify-center shadow-md">
              <span className="font-serif-title font-bold text-2xl sm:text-3xl text-[#5C0E20]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
            </div>
            <span className="font-sans-clean text-xs uppercase text-[#8B1E3F] mt-2 font-bold">
              саат
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#8B1E3F] bg-white flex items-center justify-center shadow-md">
              <span className="font-serif-title font-bold text-2xl sm:text-3xl text-[#5C0E20]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
            </div>
            <span className="font-sans-clean text-xs uppercase text-[#8B1E3F] mt-2 font-bold">
              мүнөт
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#8B1E3F] bg-white flex items-center justify-center shadow-md animate-pulse">
              <span className="font-serif-title font-bold text-2xl sm:text-3xl text-[#8B1E3F]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <span className="font-sans-clean text-xs uppercase text-[#8B1E3F] mt-2 font-bold">
              секунда
            </span>
          </div>
        </div>

        {/* Delicate Ornamental Lace Strip (matches video 00:26) */}
        <div className="w-full h-8 my-2 opacity-80 flex items-center justify-center">
          <svg viewBox="0 0 400 30" className="w-full h-full fill-[#8B1E3F]">
            <pattern id="lacePattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="3" fill="none" stroke="#8B1E3F" strokeWidth="1" />
              <path d="M0,10 Q10,0 20,10 Q10,20 0,10 Z" fill="none" stroke="#C48B9F" strokeWidth="0.8" />
            </pattern>
            <rect width="100%" height="20" fill="url(#lacePattern)" />
          </svg>
        </div>
      </div>
    </section>
  );
};
