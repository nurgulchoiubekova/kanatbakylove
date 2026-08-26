import React from 'react';
import { Wish } from '../types';
import { X, MessageSquareHeart, Trash2 } from 'lucide-react';

interface AdminWishesModalProps {
  wishes: Wish[];
  onClose: () => void;
  onClear: () => void;
  onDeleteWish?: (id: string) => void;
}

export const AdminWishesModal: React.FC<AdminWishesModalProps> = ({
  wishes,
  onClose,
  onClear,
  onDeleteWish,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[85vh] rounded-3xl bg-[#FAF5EF] p-6 shadow-2xl border-2 border-[#D4AF37] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/40">
          <div>
            <h3 className="font-serif-title text-2xl font-bold text-[#5C0E20]">
              Каалоо-тилектер тизмеси
            </h3>
            <p className="font-sans-clean text-xs text-[#8B1E3F]">
              Нарынбек & Бегимайдын тоюна калтырылган тилектер ({wishes.length})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#8B1E3F]/10 text-[#8B1E3F] hover:bg-[#8B1E3F]/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Wishes */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 my-4">
          {wishes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-serif-title italic">
              <MessageSquareHeart className="w-12 h-12 text-[#8B1E3F]/30 mx-auto mb-2" />
              <p>Азырынча каалоо-тилектер жок.</p>
            </div>
          ) : (
            wishes.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-serif-title font-bold text-lg text-[#8B1E3F]">
                    {item.name}
                  </h5>
                  <div className="flex items-center gap-2">
                    <span className="font-sans-clean text-[10px] text-gray-400">
                      {item.submittedAt}
                    </span>
                    {onDeleteWish && (
                      <button
                        onClick={() => onDeleteWish(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Өчүрүү"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="font-serif-title text-sm text-[#3D0914] leading-relaxed italic bg-[#FAF5EF]/60 p-3 rounded-xl">
                  «{item.wish}»
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-[#D4AF37]/40 flex justify-between items-center">
          {wishes.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-red-600 font-sans-clean flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Тизмени тазалоо</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto py-2 px-5 rounded-xl bg-[#8B1E3F] text-white font-serif-title font-bold text-sm hover:bg-[#701026] transition-colors cursor-pointer"
          >
            Жабуу
          </button>
        </div>
      </div>
    </div>
  );
};
