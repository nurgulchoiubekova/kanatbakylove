import React, { useState, useRef } from 'react';
import { Heart, Volume2, VolumeX, ListFilter, Music, Upload, Link as LinkIcon, RotateCcw, Check } from 'lucide-react';

interface FooterAndMusicProps {
  isMusicPlaying: boolean;
  currentTrackName: string;
  onToggleMusic: () => void;
  onOpenAdmin: () => void;
  onUploadAudio: (file: File) => void;
  onSetAudioUrl: (url: string) => void;
  onResetAudio: () => void;
}

export const FooterAndMusic: React.FC<FooterAndMusicProps> = ({
  isMusicPlaying,
  currentTrackName,
  onToggleMusic,
  onOpenAdmin,
  onUploadAudio,
  onSetAudioUrl,
  onResetAudio,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadAudio(file);
      setSuccessMsg(`"${file.name}" кошулду!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onSetAudioUrl(urlInput.trim());
      setUrlInput('');
      setSuccessMsg('Музыка шилтемеси сакталды!');
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  return (
    <footer className="relative w-full py-12 px-4 text-center bg-[#2D0B13] border-t border-[#D4AF37]/30">
      <div className="max-w-lg mx-auto flex flex-col items-center">
        {/* Heart Seal Visual */}
        <div className="w-20 h-20 rounded-full burgundy-gradient-bg border-2 border-[#D4AF37] shadow-2xl flex items-center justify-center mb-6 animate-pulse">
          <Heart className="w-10 h-10 text-[#FCF6BA] fill-[#FCF6BA]" />
        </div>

        {/* Main Footer Greeting */}
        <h2 className="font-script text-5xl sm:text-6xl gold-gradient-text font-bold mb-4 drop-shadow-lg">
          Сизди күтөбүз!
        </h2>

        <p className="font-serif-title text-[#FCF6BA]/90 text-lg sm:text-xl mb-8 font-semibold tracking-wide">
          Нарынбек & Бегимай — 13.10.2026
        </p>

        {/* Action Buttons: Host Wishes list & Music toggle */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={onToggleMusic}
            className="px-5 py-2.5 rounded-full bg-[#8B1E3F] hover:bg-[#701026] text-[#FCF6BA] border border-[#D4AF37] text-sm font-sans-clean font-medium flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span>Музыка: КҮЙҮП ТУРАТ</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-gray-300" />
                <span>Музыка: ӨЧҮК</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenAdmin}
            className="px-5 py-2.5 rounded-full bg-[#FAF5EF]/10 hover:bg-[#FAF5EF]/20 text-[#FCF6BA] border border-[#D4AF37]/50 text-sm font-sans-clean font-medium flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <ListFilter className="w-4 h-4 text-[#D4AF37]" />
            <span>Каалоолор тизмеси</span>
          </button>
        </div>


        {/* Subtle Copyright */}
        <p className="font-sans-clean text-[10px] text-[#FCF6BA]/40 uppercase tracking-widest">
          Үйлөнүү той чакыруу баракчасы • 2026
        </p>
      </div>
    </footer>
  );
};

