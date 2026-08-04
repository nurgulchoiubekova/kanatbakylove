import React from 'react';
import { Wine, Utensils, Heart, Cake } from 'lucide-react';

export const Timeline: React.FC = () => {
  const events = [
    {
      time: '16:00',
      title: 'КОНОКТОРДУН ЖЫЙЫНЫ',
      subTitle: 'Сбор гостей',
      icon: Wine,
    },
    {
      time: '17:00',
      title: 'ТОЙДУН БАШТАЛЫШЫ',
      subTitle: 'Салтанат',
      icon: Heart,
    },
    {
      time: '18:00',
      title: 'БАНКЕТ',
      subTitle: 'Праздничный ужин',
      icon: Utensils,
    },
    {
      time: '22:00',
      title: 'ТОЙДУН СОҢУ',
      subTitle: 'Завершение торжества',
      icon: Cake,
    },
  ];

  return (
    <section className="relative w-full max-w-lg mx-auto px-4 py-8">
      {/* Curved S-Line Container Background */}
      <div className="relative rounded-3xl royal-card p-8 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#5C0E20] mb-1 tracking-wider">
            ПРОГРАММА
          </h3>
          <p className="font-sans-clean text-xs uppercase tracking-widest text-[#8B1E3F]">
            Тойдун убактысы
          </p>
          <div className="w-16 h-0.5 bg-[#C48B9F] mx-auto mt-2"></div>
        </div>

        {/* Curved Flow Line (S-curve matching video) */}
        <div className="relative pl-6 pr-2">
          <svg className="absolute left-[28px] top-4 bottom-4 w-12 h-[calc(100%-32px)] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 50 400">
            <path
              d="M 10 0 C 40 100, 0 200, 30 300 C 40 350, 10 400, 10 400"
              fill="none"
              stroke="#8B1E3F"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          <div className="space-y-10 relative z-10">
            {events.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={index} className="flex items-center gap-5 group">
                  {/* Heart Badge along line */}
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-full burgundy-gradient-bg border-2 border-[#C48B9F] shadow-lg flex items-center justify-center text-[#FFF7F4] group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5 text-[#FFF7F4]" />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 p-4 rounded-2xl bg-white/80 border border-[#C48B9F]/40 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif-title font-bold text-2xl text-[#8B1E3F]">
                        {event.time}
                      </span>
                      <Heart className="w-4 h-4 text-[#8B1E3F] fill-[#8B1E3F]" />
                    </div>

                    <h4 className="font-serif-title text-lg font-bold text-[#3D0914] uppercase tracking-wide">
                      {event.title}
                    </h4>
                    <p className="font-sans-clean text-xs text-[#8B1E3F]/80">
                      {event.subTitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
