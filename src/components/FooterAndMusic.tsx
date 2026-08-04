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
    <footer className="relative w-full py-12 px-4 text-center bg-[#F7EDE8] border-t border-[#C48B9F]/30">
      <div className="max-w-lg mx-auto flex flex-col items-center">
        {/* Heart Seal Visual */}
        <div className="w-20 h-20 rounded-full burgundy-gradient-bg border-2 border-[#C48B9F] shadow-2xl flex items-center justify-center mb-6 animate-pulse">
          <Heart className="w-10 h-10 text-[#FFF7F4] fill-[#FFF7F4]" />
        </div>

        {/* Main Footer Greeting */}
        <h2 className="font-script text-5xl sm:text-6xl gold-gradient-text font-bold mb-4 drop-shadow-lg">
          Сизди күтөбүз!
        </h2>

        <p className="font-serif-title text-[#FFF7F4]/90 text-lg sm:text-xl mb-8 font-semibold tracking-wide">
          Канатбек & Бактыгүл — 12.09.2026
        </p>

        {/* Action Buttons: Host RSVP list & Music toggle */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={onToggleMusic}
            className="px-5 py-2.5 rounded-full bg-[#8B1E3F] hover:bg-[#701026] text-[#FFF7F4] border border-[#C48B9F] text-sm font-sans-clean font-medium flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#C48B9F] animate-pulse" />
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
            className="px-5 py-2.5 rounded-full bg-[#FDF8F5]/10 hover:bg-[#FDF8F5]/20 text-[#FFF7F4] border border-[#C48B9F]/50 text-sm font-sans-clean font-medium flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <ListFilter className="w-4 h-4 text-[#C48B9F]" />
            <span>Коноктордун тизмеси</span>
          </button>
        </div>

        {/* Custom Audio Uploader Section at the bottom */}
        <div className="w-full mt-4 p-5 rounded-3xl bg-[#1A060B] border border-[#C48B9F]/40 text-left mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[#FFF7F4]">
              <Music className="w-5 h-5 text-[#C48B9F]" />
              <h4 className="font-serif-title font-bold text-base">
                Фондук музыканы өзгөртүү
              </h4>
            </div>

            <button
              onClick={() => setShowUploader(!showUploader)}
              className="text-xs font-sans-clean font-semibold px-3 py-1 rounded-full bg-[#8B1E3F] text-[#FFF7F4] border border-[#C48B9F]/50 hover:bg-[#701026] transition-colors"
            >
              {showUploader ? 'Жабуу' : 'Өз музыкаңды кош'}
            </button>
          </div>

          <p className="font-sans-clean text-xs text-[#FFF7F4]/70 mb-3">
            Учурдагы обон: <span className="font-semibold text-[#C48B9F]">{currentTrackName}</span>
          </p>

          {successMsg && (
            <div className="mb-3 p-2.5 rounded-xl bg-[#28A745]/20 border border-[#28A745] text-[#FFF7F4] text-xs font-sans-clean flex items-center gap-2">
              <Check className="w-4 h-4 text-[#28A745]" />
              <span>{successMsg}</span>
            </div>
          )}

          {showUploader && (
            <div className="mt-4 pt-4 border-t border-[#C48B9F]/20 space-y-4 animate-fadeIn">
              {/* Option 1: File Upload */}
              <div>
                <label className="block font-sans-clean text-xs font-semibold text-[#FFF7F4] mb-2">
                  1. Телефон же компьютерден MP3 файл тандоо:
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 rounded-xl bg-[#8B1E3F] hover:bg-[#701026] text-[#FFF7F4] font-sans-clean text-sm font-semibold border border-[#C48B9F] flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#FFF7F4]" />
                  <span>MP3 файл жүктөө (.mp3 / .m4a)</span>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2 my-2 text-[#FFF7F4]/30 text-xs font-sans-clean">
                <div className="h-[1px] bg-[#C48B9F]/20 flex-1"></div>
                <span>же</span>
                <div className="h-[1px] bg-[#C48B9F]/20 flex-1"></div>
              </div>

              {/* Option 2: MP3 URL Input */}
              <form onSubmit={handleUrlSubmit} className="space-y-2">
                <label className="block font-sans-clean text-xs font-semibold text-[#FFF7F4]">
                  2. Музыканын түз шилтемесин киргизүү (URL):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/song.mp3"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#F7EDE8] border border-[#C48B9F]/50 text-[#FFF7F4] placeholder-[#FFF7F4]/30 text-xs focus:outline-none focus:border-[#C48B9F]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#C48B9F] hover:bg-[#b8972e] text-[#F7EDE8] font-sans-clean text-xs font-bold transition-all"
                  >
                    Сактоо
                  </button>
                </div>
              </form>

              {/* Option 3: Reset */}
              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={onResetAudio}
                  className="inline-flex items-center gap-1.5 text-xs text-[#FFF7F4]/60 hover:text-[#FFF7F4] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Баштапкы музыкага кайтаруу</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Subtle Copyright */}
        <p className="font-sans-clean text-[10px] text-[#FFF7F4]/40 uppercase tracking-widest">
          Үйлөнүү той чакыруу баракчасы • 2026
        </p>
      </div>
    </footer>
  );
};

