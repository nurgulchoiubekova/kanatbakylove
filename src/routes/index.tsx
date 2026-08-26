import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Envelope3D } from "@/components/Envelope3D";
import { HeroVideo } from "@/components/HeroVideo";
import { InvitationText } from "@/components/InvitationText";
import { Timeline } from "@/components/Timeline";
import { Organizers } from "@/components/Organizers";
import { LocationCard } from "@/components/LocationCard";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ContactSection } from "@/components/ContactSection";
import { WishesSection } from "@/components/WishesSection";
import { FooterAndMusic } from "@/components/FooterAndMusic";
import { AdminWishesModal } from "@/components/AdminWishesModal";
import type { Wish } from "@/types";
import { RomanticMusicPlayer } from "@/utils/audio";

const TITLE = "Үйлөнүү той — Нарынбек & Бегимай";
const DESCRIPTION =
  "Нарынбек менен Бегимайдын үйлөнүү тоюна чакыруу — 13.10.2026, «Мейкин» рестораны.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentTrackName, setCurrentTrackName] = useState("Alex Warren - Ordinary");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const musicPlayerRef = useRef<RomanticMusicPlayer | null>(null);

  useEffect(() => {
    musicPlayerRef.current = new RomanticMusicPlayer();
    setCurrentTrackName(musicPlayerRef.current.getCurrentTrackName());

    const saved = localStorage.getItem("wedding_wishes");
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved wishes", e);
      }
    }
  }, []);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    if (musicPlayerRef.current && !isMusicPlaying) {
      musicPlayerRef.current.start();
      setIsMusicPlaying(true);
    }
  };

  const handleToggleMusic = () => {
    if (!musicPlayerRef.current) return;
    if (isMusicPlaying) {
      musicPlayerRef.current.stop();
      setIsMusicPlaying(false);
    } else {
      musicPlayerRef.current.start();
      setIsMusicPlaying(true);
    }
  };

  const handleUploadAudio = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl && musicPlayerRef.current) {
        musicPlayerRef.current.setCustomAudio(dataUrl, file.name);
        setCurrentTrackName(file.name);
        setIsMusicPlaying(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSetAudioUrl = (url: string) => {
    if (!musicPlayerRef.current) return;
    const trackName = url.split("/").pop() || "Интернет ыры";
    musicPlayerRef.current.setCustomAudio(url, trackName);
    setCurrentTrackName(trackName);
    setIsMusicPlaying(true);
  };

  const handleResetAudio = () => {
    if (!musicPlayerRef.current) return;
    musicPlayerRef.current.resetToDefault();
    setCurrentTrackName(musicPlayerRef.current.getCurrentTrackName());
    setIsMusicPlaying(true);
  };

  const handleWishSubmitted = (newWish: Wish) => {
    setWishes((prev) => [newWish, ...prev]);
  };

  const handleClearWishes = () => {
    localStorage.removeItem("wedding_wishes");
    setWishes([]);
  };

  const handleDeleteWish = (id: string) => {
    const updated = wishes.filter((w) => w.id !== id);
    setWishes(updated);
    localStorage.setItem("wedding_wishes", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#2D0B13] text-[#4A1521] font-serif-title antialiased selection:bg-[#8B1E3F] selection:text-white flex flex-col justify-between">
      {!isEnvelopeOpen && <Envelope3D onOpen={handleOpenEnvelope} isOpen={isEnvelopeOpen} />}

      {isEnvelopeOpen && (
        <div className="w-full max-w-md mx-auto bg-[#2D0B13] shadow-2xl overflow-hidden min-h-screen flex flex-col justify-between animate-fadeIn transition-opacity duration-1000">
          <main className="w-full space-y-4">
            <HeroVideo isMusicPlaying={isMusicPlaying} onToggleMusic={handleToggleMusic} />
            <InvitationText />
            <Timeline />
            <Organizers />
            <LocationCard />
            <CountdownTimer />
            <ContactSection />
            <WishesSection onWishSubmitted={handleWishSubmitted} />
          </main>

          <FooterAndMusic
            isMusicPlaying={isMusicPlaying}
            currentTrackName={currentTrackName}
            onToggleMusic={handleToggleMusic}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onUploadAudio={handleUploadAudio}
            onSetAudioUrl={handleSetAudioUrl}
            onResetAudio={handleResetAudio}
          />
        </div>
      )}

      {isAdminOpen && (
        <AdminWishesModal
          wishes={wishes}
          onClose={() => setIsAdminOpen(false)}
          onClear={handleClearWishes}
          onDeleteWish={handleDeleteWish}
        />
      )}
    </div>
  );
}
