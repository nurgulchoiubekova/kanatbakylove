import React from 'react';
import { Play, Sparkles, Heart } from 'lucide-react';

interface HeroVideoProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ isMusicPlaying, onToggleMusic }) => {
  return (
    <div className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-between overflow-hidden rounded-b-[40px] shadow-2xl border-b-2 border-[#D4AF37]/50 bg-[#FAF5EF]">
      {/* Top Floating Controls Bar */}
      <div className="relative z-30 w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D0B13]/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#FCF6BA] text-xs font-sans-clean shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '8s' }} />
          <span>12.09.2026</span>
        </div>

        {/* Music Toggle Button */}
        <button
          onClick={onToggleMusic}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B1E3F] hover:bg-[#701026] text-[#FCF6BA] border border-[#D4AF37] shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          title="Музыканы күйгүзүү/өчүрүү"
        >
          {isMusicPlaying ? (
            <>
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-1 bg-[#FCF6BA] rounded-full animate-bounce h-2.5"></span>
                <span className="w-1 bg-[#FCF6BA] rounded-full animate-bounce h-3.5" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1 bg-[#FCF6BA] rounded-full animate-bounce h-2" style={{ animationDelay: '0.4s' }}></span>
              </div>
              <span className="text-xs font-sans-clean font-semibold tracking-wide">Музыка ВКЛ</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#FCF6BA] fill-[#FCF6BA]" />
              <span className="text-xs font-sans-clean font-semibold tracking-wide">Музыка ВЫКЛ</span>
            </>
          )}
        </button>
      </div>

      {/* Background Image / Video Player with Elegant Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
          alt="Канатбек & Бактыгүл"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 hover:scale-110"
        />
        {/* Aesthetic Gradient Overlay matching the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D0B13]/90 via-[#2D0B13]/40 to-[#2D0B13]/95"></div>
      </div>

      {/* Main Arch Banner (Top Burgundy Card) */}
      <div className="relative z-10 my-auto text-center px-6 py-10 flex flex-col items-center w-full max-w-sm">
        {/* Burgundy Arch Frame */}
        <div className="w-full rounded-t-[100px] rounded-b-3xl bg-[#701026]/90 border-2 border-[#D4AF37] p-8 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col items-center animate-pulse-glow">
          {/* Ambient Glow Sparkles inside Frame */}
          <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[#FCF6BA] animate-ping opacity-60"></div>
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#D4AF37] animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>

          {/* Hanging White Floral Vine Ornaments */}
          <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none flex justify-around opacity-90">
            <svg viewBox="0 0 200 60" className="w-full h-full fill-white/80">
              <path d="M10,0 C20,20 15,40 10,50 M30,0 C40,15 35,30 30,45 M50,0 C60,25 55,40 50,55 M150,0 C140,25 145,40 150,55 M170,0 C160,15 165,30 170,45" stroke="#FCF6BA" strokeWidth="1" strokeDasharray="2 2" fill="none" />
              <circle cx="10" cy="50" r="4" fill="#FCF6BA" />
              <circle cx="30" cy="45" r="3" fill="#FCF6BA" />
              <circle cx="50" cy="55" r="5" fill="#FCF6BA" />
              <circle cx="150" cy="55" r="5" fill="#FCF6BA" />
              <circle cx="170" cy="45" r="3" fill="#FCF6BA" />
            </svg>
          </div>

          <p className="font-serif-title text-xs uppercase tracking-[0.3em] text-[#FCF6BA] mt-6 mb-2 font-semibold flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>ҮЙЛӨНҮҮ ТОЙ</span>
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          </p>

          {/* Couple Names in Elegant Script */}
          <h1 className="font-script text-5xl sm:text-6xl font-bold gold-gradient-text my-2 leading-tight drop-shadow-lg tracking-wide hover:scale-105 transition-transform">
            Канатбек & Бактыгүл
          </h1>

          {/* Date Badge Section inside Burgundy Arch */}
          <div className="mt-6 pt-4 border-t border-[#D4AF37]/40 w-full flex flex-col items-center">
            <span className="font-sans-clean text-[10px] uppercase tracking-widest text-[#FCF6BA]/90 font-semibold">
              Ишемби
            </span>

            <div className="flex items-center justify-center gap-3 my-2">
              <span className="text-3xl font-bold font-serif-title gold-gradient-text px-5 py-1 rounded-full border border-[#D4AF37] bg-[#2D0B13]/60 shadow-lg animate-float-slow">
                12
              </span>
            </div>

            <span className="font-serif-title text-base font-semibold uppercase tracking-wider text-[#FCF6BA]">
              Сентябрь • 2026
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="relative z-10 mb-6 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-sans-clean text-[10px] uppercase tracking-widest text-[#FCF6BA]/80">
          Төмөн сыдырыңыз
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-[#D4AF37] flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
