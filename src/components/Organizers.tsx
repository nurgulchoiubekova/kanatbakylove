import React from 'react';

export const Organizers: React.FC = () => {
  return (
    <section className="relative w-full max-w-lg mx-auto px-4 py-6 text-center">
      <div className="rounded-3xl royal-card p-8 relative overflow-hidden">
        <h3 className="font-sans-clean text-xs uppercase tracking-[0.25em] font-bold text-[#8B1E3F] mb-4">
          УРМАТТОО МЕНЕН ТОЙ ЭЭЛЕРИ:
        </h3>

        <div className="space-y-3 my-4">
          <div className="py-2.5 px-4 rounded-2xl bg-white/90 border border-[#D4AF37]/40 shadow-sm">
            <p className="font-script text-3xl sm:text-4xl text-[#8B1E3F] font-bold">
              Төлөнбек & Эркингүл
            </p>
          </div>

          <div className="py-2.5 px-4 rounded-2xl bg-white/90 border border-[#D4AF37]/40 shadow-sm">
            <p className="font-script text-3xl sm:text-4xl text-[#8B1E3F] font-bold">
              Руслан & Жыпариза
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
