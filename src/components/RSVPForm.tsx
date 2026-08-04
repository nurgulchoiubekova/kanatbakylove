import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RSVPResponse } from '../types';
import { CheckCircle2, Plus, Minus, Send, Heart } from 'lucide-react';

interface RSVPFormProps {
  onRSVPSubmitted: (rsvp: RSVPResponse) => void;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onRSVPSubmitted }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Сураныч, атыңызды жазыңыз!');
      return;
    }

    setErrorMsg('');
    const newRSVP: RSVPResponse = {
      id: Date.now().toString(),
      name: name.trim(),
      attending,
      guestCount: attending ? guestCount : 0,
      submittedAt: new Date().toLocaleDateString('ky-KG'),
    };

    // Trigger celebratory golden confetti burst if attending
    if (attending) {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#C48B9F', '#FFD700', '#8B1E3F', '#FFF7F4'],
      });
    }

    // Save to local storage
    const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    localStorage.setItem('wedding_rsvps', JSON.stringify([newRSVP, ...existing]));

    onRSVPSubmitted(newRSVP);
    setIsSubmitted(true);
  };

  return (
    <section className="relative w-full max-w-lg mx-auto px-4 py-6">
      <div className="rounded-3xl royal-card p-8 relative overflow-hidden">
        {/* Top Flower Illustration Ornament */}
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-[#8B1E3F]/10 border border-[#C48B9F] flex items-center justify-center">
            <Heart className="w-8 h-8 text-[#8B1E3F] fill-[#8B1E3F]" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="font-script text-5xl font-bold text-[#8B1E3F] mb-1">
            Анкета
          </h3>
          <p className="font-serif-title text-sm text-[#3D0914] italic">
            Тойго катышууңузду ырастаңыз
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#28A745]/10 text-[#28A745] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#28A745]" />
            </div>

            <h4 className="font-serif-title text-2xl font-bold text-[#5C0E20]">
              Рахмат, {name}!
            </h4>

            <p className="font-serif-title text-base text-[#3D0914]">
              {attending
                ? `Жообуңуз кабыл алынды. Сизди ${guestCount} адам болуп күтөбүз!`
                : 'Жообуңуз кабыл алынды. Тилекке каршы, катыша албай турганыңызга өкүнөбүз.'}
            </p>

            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 px-6 py-2 rounded-full border border-[#C48B9F] text-[#8B1E3F] text-xs font-sans-clean font-semibold uppercase tracking-wider hover:bg-[#8B1E3F]/5"
            >
              Жоопту өзгөртүү
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input: Name */}
            <div>
              <label className="block font-serif-title text-lg font-semibold text-[#5C0E20] mb-2">
                Сиздин атыңыз:
              </label>
              <input
                type="text"
                placeholder="аты"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[#C48B9F]/50 text-[#3D0914] placeholder-[#8B1E3F]/40 focus:outline-none focus:border-[#8B1E3F] font-serif-title text-lg shadow-sm"
              />
              {errorMsg && (
                <p className="text-xs text-red-600 font-sans-clean mt-1 font-medium">{errorMsg}</p>
              )}
            </div>

            {/* Attendance Toggle */}
            <div>
              <label className="block font-serif-title text-lg font-semibold text-[#5C0E20] mb-3">
                Тойго катыша аласызбы?
              </label>

              <div className="space-y-3">
                <label
                  onClick={() => setAttending(true)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    attending
                      ? 'bg-[#8B1E3F]/10 border-[#8B1E3F] text-[#5C0E20] font-bold shadow-sm'
                      : 'bg-white border-[#C48B9F]/40 text-[#3D0914]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      attending ? 'border-[#8B1E3F] bg-[#8B1E3F]' : 'border-gray-400'
                    }`}
                  >
                    {attending && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span className="font-serif-title text-base sm:text-lg">Албетте, катышам</span>
                </label>

                <label
                  onClick={() => setAttending(false)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    !attending
                      ? 'bg-[#8B1E3F]/10 border-[#8B1E3F] text-[#5C0E20] font-bold shadow-sm'
                      : 'bg-white border-[#C48B9F]/40 text-[#3D0914]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      !attending ? 'border-[#8B1E3F] bg-[#8B1E3F]' : 'border-gray-400'
                    }`}
                  >
                    {!attending && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span className="font-serif-title text-base sm:text-lg">
                    Тилекке каршы, катыша албайм
                  </span>
                </label>
              </div>
            </div>

            {/* Guest Counter */}
            {attending && (
              <div className="pt-2">
                <label className="block font-serif-title text-lg font-semibold text-[#5C0E20] mb-2">
                  Адамдын саны:
                </label>

                <div className="flex items-center justify-center gap-6 p-3 rounded-2xl bg-white border-2 border-[#C48B9F]/50 max-w-xs mx-auto shadow-sm">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-10 h-10 rounded-full bg-[#8B1E3F] text-white flex items-center justify-center text-xl font-bold active:scale-90 transition-transform cursor-pointer"
                  >
                    <Minus className="w-5 h-5" />
                  </button>

                  <span className="font-serif-title font-bold text-3xl text-[#5C0E20] w-12 text-center">
                    {guestCount}
                  </span>

                  <button
                    type="button"
                    onClick={() => setGuestCount(guestCount + 1)}
                    className="w-10 h-10 rounded-full bg-[#8B1E3F] text-white flex items-center justify-center text-xl font-bold active:scale-90 transition-transform cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl burgundy-gradient-bg text-[#FFF7F4] font-serif-title text-xl font-bold tracking-wider shadow-lg hover:shadow-xl border border-[#C48B9F] transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <Send className="w-5 h-5 text-[#FFF7F4]" />
              <span>жиберүү</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
