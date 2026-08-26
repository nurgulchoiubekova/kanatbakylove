import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Wish } from '../types';
import { Heart, Send, Sparkles, MessageSquareHeart, CheckCircle2 } from 'lucide-react';

interface WishesSectionProps {
  onWishSubmitted?: (wish: Wish) => void;
}

export const WishesSection: React.FC<WishesSectionProps> = ({ onWishSubmitted }) => {
  const [name, setName] = useState('');
  const [wishText, setWishText] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('wedding_wishes');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        console.error('Error reading saved wishes', e);
      }
    } else {
      setWishes([]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Сураныч, атыңызды жазыңыз!');
      return;
    }
    if (!wishText.trim()) {
      setErrorMsg('Сураныч, каалоо-тилегиңизди жазыңыз!');
      return;
    }

    setErrorMsg('');
    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      wish: wishText.trim(),
      submittedAt: new Date().toLocaleDateString('ky-KG', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };

    // Confetti celebration
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#FFD700', '#8B1E3F', '#FCF6BA'],
    });

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_wishes', JSON.stringify(updated));

    if (onWishSubmitted) {
      onWishSubmitted(newWish);
    }



    setIsSubmitted(true);
    setName('');
    setWishText('');
  };

  return (
    <section className="relative w-full max-w-lg mx-auto px-4 py-6">
      <div className="rounded-3xl royal-card p-8 relative overflow-hidden">
        {/* Decorative Top Heart Badge */}
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-[#8B1E3F]/10 border border-[#D4AF37] flex items-center justify-center shadow-md">
            <Heart className="w-8 h-8 text-[#8B1E3F] fill-[#8B1E3F] animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="font-script text-5xl font-bold text-[#8B1E3F] mb-1">
            Каалоо-тилектер
          </h3>
          <p className="font-serif-title text-sm text-[#3D0914] italic">
            Жаштарга ак тилектериңизди жана ак каалооңузду калтырыңыз
          </p>
        </div>

        {isSubmitted && (
          <div className="mb-6 p-4 rounded-2xl bg-[#28A745]/10 border border-[#28A745]/30 text-center animate-fadeIn">
            <CheckCircle2 className="w-8 h-8 text-[#28A745] mx-auto mb-2" />
            <h4 className="font-serif-title font-bold text-lg text-[#5C0E20]">
              Чоң рахмат!
            </h4>
            <p className="font-serif-title text-sm text-[#3D0914]">
              Сиздин каалоо-тилегиңиз ийгиликтүү кошулду.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-3 px-4 py-1.5 rounded-full border border-[#D4AF37] text-[#8B1E3F] text-xs font-sans-clean font-semibold uppercase tracking-wider hover:bg-[#8B1E3F]/5"
            >
              Дагы каалоо жазуу
            </button>
          </div>
        )}

        {/* Wish Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block font-serif-title text-base font-semibold text-[#5C0E20] mb-1.5">
              Сиздин атыңыз:
            </label>
            <input
              type="text"
              placeholder="Мисалы: Асан & Үсөн"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[#D4AF37]/50 text-[#3D0914] placeholder-[#8B1E3F]/40 focus:outline-none focus:border-[#8B1E3F] font-serif-title text-base shadow-sm"
            />
          </div>

          <div>
            <label className="block font-serif-title text-base font-semibold text-[#5C0E20] mb-1.5">
              Каалоо-тилегиңиз:
            </label>
            <textarea
              rows={3}
              placeholder="Жаштарга каалооңузду жазыңыз..."
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[#D4AF37]/50 text-[#3D0914] placeholder-[#8B1E3F]/40 focus:outline-none focus:border-[#8B1E3F] font-serif-title text-base shadow-sm resize-none"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-600 font-sans-clean font-medium text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl burgundy-gradient-bg text-[#FCF6BA] font-serif-title text-lg font-bold tracking-wider shadow-lg hover:shadow-xl border border-[#D4AF37] transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <Send className="w-5 h-5 text-[#FCF6BA]" />
            <span>Каалоо-тилек жиберүү</span>
          </button>
        </form>

        {/* Display Received Wishes List */}
        <div className="pt-6 border-t border-[#D4AF37]/30">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquareHeart className="w-5 h-5 text-[#8B1E3F]" />
            <h4 className="font-serif-title font-bold text-xl text-[#5C0E20]">
              Жөнөтүлгөн каалоолор
            </h4>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
            {wishes.length === 0 ? (
              <p className="text-center py-4 text-xs font-serif-title italic text-gray-500">
                Биринчи болуп каалоо-тилегиңизди калтырыңыз!
              </p>
            ) : (
              wishes.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white/90 border border-[#D4AF37]/40 shadow-sm text-left relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-serif-title font-bold text-base text-[#8B1E3F]">
                      {item.name}
                    </span>
                    <span className="font-sans-clean text-[10px] text-gray-400">
                      {item.submittedAt}
                    </span>
                  </div>
                  <p className="font-serif-title text-sm text-[#3D0914] leading-relaxed italic">
                    «{item.wish}»
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
