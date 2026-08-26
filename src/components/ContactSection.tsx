import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const organizerPhone = "996700484888"; // WhatsApp contact link (+996 700 484 888)
  const prefilledMessage = encodeURIComponent("Саламатсызбы! Нарынбек менен Бегимайдын үйлөнүү үлпөт той-кечеси боюнча суроом бар эле.");

  return (
    <section className="relative w-full max-w-lg mx-auto px-4 py-6 text-center">
      <div className="rounded-3xl royal-card p-8 flex flex-col items-center relative overflow-hidden">
        <h3 className="font-script text-4xl sm:text-5xl font-bold text-[#8B1E3F] mb-3">
          Деталдар:
        </h3>

        <p className="font-serif-title text-base sm:text-lg text-[#3D0914] mb-4 leading-relaxed max-w-md">
          Эгерде сиздерде кандайдыр бир суроолор, каалоолор, белектер же сюрприздер болсо, биздин уюштуруучубуз менен байланыша аласыздар:
        </p>

        <p className="font-serif-title font-bold text-xl text-[#8B1E3F] mb-6">
          +996 700 484 888
        </p>

        {/* WhatsApp Floating Button with Flower Icon */}
        <div className="relative mb-2 w-full">
          {/* Burgundy Flower Decoration behind WhatsApp icon */}
          <div className="w-16 h-16 rounded-full bg-[#8B1E3F]/10 border-2 border-[#D4AF37] flex items-center justify-center mb-4 mx-auto">
            <Heart className="w-8 h-8 text-[#8B1E3F] fill-[#8B1E3F]" />
          </div>

          <a
            href={`https://wa.me/${organizerPhone}?text=${prefilledMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-8 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans-clean text-base font-bold shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span>WhatsApp аркылуу байланышуу</span>
          </a>
        </div>
      </div>
    </section>
  );
};
