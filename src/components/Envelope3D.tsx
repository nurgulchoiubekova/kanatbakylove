import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playEnvelopeOpenSound } from '../utils/audio';

interface Envelope3DProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const Envelope3D: React.FC<Envelope3DProps> = ({ onOpen, isOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    // Play wax seal snap & sparkle sound
    playEnvelopeOpenSound();

    // Golden Dust / Sparkle Particle Burst
    const duration = 1800;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 80,
        origin: { x: 0.2, y: 0.5 },
        colors: ['#D4AF37', '#FFD700', '#FCF6BA', '#AA771C', '#8B1E3F'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 80,
        origin: { x: 0.8, y: 0.5 },
        colors: ['#D4AF37', '#FFD700', '#FCF6BA', '#AA771C', '#8B1E3F'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Trigger full opening transition
    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 1300);
  };

  if (isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2D0B13] px-4 overflow-hidden">
      {/* Background ambient lighting and golden sparkle dust */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px] animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-[#FCF6BA] blur-[1px] animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/5 left-1/3 w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px] animate-ping" style={{ animationDuration: '2.5s' }}></div>
      </div>

      {/* 3D Envelope Container */}
      <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] perspective-1000 select-none">
        <div
          onClick={handleOpen}
          className={`relative w-full h-full cursor-pointer transition-all duration-700 transform-style-3d shadow-2xl ${
            isOpening ? 'scale-105' : 'hover:scale-[1.02]'
          }`}
        >
          {/* Envelope Backing Paper */}
          <div className="absolute inset-0 rounded-2xl bg-[#FAF5EF] border-2 border-[#E6D7C3] overflow-hidden flex flex-col justify-between p-6 shadow-2xl">
            {/* Elegant Floral Corner Ornaments */}
            <div className="absolute top-3 left-3 w-16 h-16 pointer-events-none opacity-80">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#8B1E3F]">
                <path d="M10,10 C30,15 45,30 50,50 C30,45 15,30 10,10 Z" />
                <circle cx="20" cy="20" r="3" fill="#D4AF37" />
                <circle cx="35" cy="15" r="2" fill="#D4AF37" />
              </svg>
            </div>
            <div className="absolute top-3 right-3 w-16 h-16 pointer-events-none opacity-80 rotate-90">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#8B1E3F]">
                <path d="M10,10 C30,15 45,30 50,50 C30,45 15,30 10,10 Z" />
                <circle cx="20" cy="20" r="3" fill="#D4AF37" />
              </svg>
            </div>
            <div className="absolute bottom-3 left-3 w-16 h-16 pointer-events-none opacity-80 -rotate-90">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#8B1E3F]">
                <path d="M10,10 C30,15 45,30 50,50 C30,45 15,30 10,10 Z" />
                <circle cx="20" cy="20" r="3" fill="#D4AF37" />
              </svg>
            </div>
            <div className="absolute bottom-3 right-3 w-16 h-16 pointer-events-none opacity-80 rotate-180">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#8B1E3F]">
                <path d="M10,10 C30,15 45,30 50,50 C30,45 15,30 10,10 Z" />
                <circle cx="20" cy="20" r="3" fill="#D4AF37" />
              </svg>
            </div>

            {/* Envelope Fold Seams (Drawn as elegant thin gold/burgundy dashed lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 380 475" preserveAspectRatio="none">
              <path d="M 0,0 L 190,230 L 380,0" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
              <path d="M 0,475 L 190,230 L 380,475" fill="none" stroke="#8B1E3F" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Top Envelope Flap (Rotates Upwards on Open) */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-1000 transform-style-3d z-20 ${
              isOpening ? '[transform:rotateX(-180deg)] opacity-20' : '[transform:rotateX(0deg)]'
            }`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(180deg, #FAF5EF 0%, #F1E5D8 100%)',
              borderBottom: '1.5px solid #D4AF37',
              filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))'
            }}
          >
            <div className="w-full h-full border-t-2 border-b border-[#D4AF37]/50"></div>
          </div>

          {/* Wax Seal in Center with Gold Monogram "К & Б" */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
            <div
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full burgundy-gradient-bg flex items-center justify-center border-4 border-[#701026] shadow-2xl transition-all duration-500 ${
                isOpening ? 'scale-125 opacity-0' : 'animate-seal hover:scale-105'
              }`}
              style={{
                boxShadow: '0 12px 30px rgba(88, 11, 29, 0.8), 0 0 25px rgba(212, 175, 55, 0.6), inset 0 2px 8px rgba(255, 255, 255, 0.4)'
              }}
            >
              {/* Outer Seal Metallic Rim */}
              <div className="absolute inset-1 rounded-full border border-[#D4AF37]/70 pointer-events-none"></div>

              {/* Gold Monogram "К & Б" */}
              <div className="text-center font-script text-2xl sm:text-3xl font-bold gold-gradient-text tracking-wider leading-none drop-shadow-md select-none">
                К & Б
              </div>

              {/* Decorative Ring */}
              <div className="absolute inset-2.5 rounded-full border border-dashed border-[#FCF6BA]/50 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Instruction text below envelope */}
      <div className="mt-8 text-center z-10 animate-pulse">
        <p className="font-serif-title text-xl sm:text-2xl text-[#FCF6BA] tracking-wider mb-2 drop-shadow-md">
          Конвертти ачуу үчүн басыңыз
        </p>
        <div className="flex justify-center items-center gap-1.5 text-[#D4AF37]">
          <span className="inline-block animate-bounce text-xl">✨</span>
          <span className="font-sans-clean text-xs uppercase tracking-widest text-[#E6D7C3]/90">
            Сургуч мөөрдү басыңыз
          </span>
          <span className="inline-block animate-bounce text-xl">✨</span>
        </div>
      </div>
    </div>
  );
};
