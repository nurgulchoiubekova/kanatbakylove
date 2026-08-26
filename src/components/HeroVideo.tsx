import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import heroImage from '../assets/hero-invitation.jpg.asset.json';

interface HeroVideoProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ isMusicPlaying, onToggleMusic }) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden rounded-b-[40px] shadow-2xl bg-[#FAF5EF]">
      {/* Top Floating Controls Bar */}
      <div className="relative z-30 w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D0B13]/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#FCF6BA] text-xs font-sans-clean shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '8s' }} />
          <span>13.10.2026</span>
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

      {/* Background Invitation Card Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src="https://i.pinimg.com/originals/50/91/39/5091394ba3a417716680afc358962fdf.jpg"
          alt="Той чакыруу фон"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft vignette for readability at the edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D0B13]/10 via-transparent to-[#2D0B13]/10"></div>
      </div>

      {/* Main Names & Date Overlay */}
      <div className="relative z-10 my-auto text-center px-6 flex flex-col items-center w-full max-w-sm">
        <p className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#5C0E20] mb-2 font-semibold flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>ҮЙЛӨНҮҮ ТОЙ</span>
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
        </p>

        {/* Couple Names */}
        <h1 className="font-script text-5xl sm:text-6xl font-bold gold-gradient-text my-2 leading-tight drop-shadow-lg tracking-wide hover:scale-105 transition-transform">
          Нарынбек & Бегимай
        </h1>

        {/* Date */}
        <div className="mt-4 flex flex-col items-center">
          <span className="font-serif-title text-2xl font-bold text-[#5C0E20]">
            13.10.2026
          </span>
          <span className="font-sans-clean text-[10px] uppercase tracking-widest text-[#5C0E20]/80 font-semibold">
            Шейшемби
          </span>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="relative z-10 mb-6 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-sans-clean text-[10px] uppercase tracking-widest text-[#5C0E20]/80">
          Төмөн сыдырыңыз
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-[#D4AF37] flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
