"use client";

import { memo, useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface VoiceCard {
  id: string;
  category: string;
  title: string;
  tags: string;
  audioSrc: string;
  imageSrc?: string;
  bgStyle: React.CSSProperties;
}

const VOICE_CARDS: VoiceCard[] = [
  {
    id: "character",
    category: "Character",
    title: "Voice Acting",
    tags: "Expressive • Lively • Charismatic",
    audioSrc: "",
    imageSrc: "/texture-white.jpg",
    bgStyle: {
      background:
        "linear-gradient(160deg, #c8885a 0%, #b07248 35%, #956040 65%, #7a4c30 100%)",
    },
  },
  {
    id: "narrator",
    category: "Narrator",
    title: "Audiobook",
    tags: "Professional • Calm • Articulate",
    audioSrc: "",
    imageSrc: "/paper.jpg",
    bgStyle: {
      background:
        "linear-gradient(160deg, #d0c8c0 0%, #b8b0a8 35%, #a09890 65%, #888480 100%)",
    },
  },
  {
    id: "companion",
    category: "Companion",
    title: "Intimate Conversation",
    tags: "Sensual • Flirty • Emotional",
    audioSrc: "",
    imageSrc: "/concrete.jpg",
    bgStyle: {
      background:
        "linear-gradient(160deg, #d87090 0%, #c05878 35%, #a84068 65%, #8c2c52 100%)",
    },
  },
];

const BAR_HEIGHTS = [3, 5, 9, 15, 21, 26, 28, 26, 21, 15, 9, 5, 3];
const DOT_COUNT = 9;

function Waveform({
  visible,
  playing,
}: {
  visible: boolean;
  playing: boolean;
}) {
  const shouldAnimate = visible || playing;

  return (
    <div
      className="flex items-center gap-[3px] pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Left dots */}
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <span
          key={`dl-${i}`}
          style={{
            display: "block",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.55)",
          }}
        />
      ))}

      {/* Bars */}
      {BAR_HEIGHTS.map((h, i) => (
        <span
          key={`b-${i}`}
          style={{
            display: "block",
            width: 3,
            height: h,
            borderRadius: 2,
            background: "white",
            transformOrigin: "center",
            animation: shouldAnimate
              ? `fishWave 0.7s ease-in-out infinite alternate`
              : "none",
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}

      {/* Right dots */}
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <span
          key={`dr-${i}`}
          style={{
            display: "block",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.55)",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SINGLE CARD
────────────────────────────────────────────────────────────────── */
function VoiceCardItem({ card }: { card: VoiceCard }) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!card.audioSrc) {
      // No audio yet → just toggle waveform animation for visual demo
      setPlaying((p) => !p);
      return;
    }
    if (!audioRef.current) {
      audioRef.current = new Audio(card.audioSrc);
      audioRef.current.onended = () => setPlaying(false);
    }
    if (playing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  const waveVisible = hovered || playing;
  const buttonVisible = true;

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={toggle}
    >
      {/* ── Background image (optional) ── */}
      {card.imageSrc && (
        <img
          src={card.imageSrc}
          alt={card.category}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: hovered ? "brightness(1.05)" : "brightness(0.95)",
            transform: hovered ? "scale(1.07)" : "scale(1.0)",
            transition:
              "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
          }}
        />
      )}

      {/* ── Gradient layer (bg when no image, tint overlay when image present) ──
           Also zooms slightly with the image for a unified depth feel            */}
      <div
        className="absolute inset-0"
        style={{
          ...card.bgStyle,
          transform: hovered ? "scale(1.07)" : "scale(1.0)",
          transition:
            "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
          // when an image is behind, act as a semi-transparent tint
          opacity: card.imageSrc ? 0.72 : 1,
        }}
      />

      {/* ── Content (sits above zoom layers, doesn't scale) ── */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Category label — top left */}
        <div className="px-4 pt-4">
          <span
            className="text-sm font-semibold drop-shadow-sm"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            {card.category}
          </span>
        </div>

        {/* Waveform — vertically centered */}
        <div className="flex-1 flex items-center justify-center px-3">
          <Waveform visible={waveVisible} playing={playing} />
        </div>

        {/* Bottom: title + tags + play button */}
        <div className="px-4 pb-4 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p
              className="text-[13px] font-semibold leading-snug drop-shadow-sm"
              style={{ color: "white" }}
            >
              {card.title}
            </p>
            <p
              className="text-[11px] mt-0.5 leading-snug"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {card.tags}
            </p>
          </div>

          {/* Play / Pause button — fades in on hover (Fish Audio behaviour) */}
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="flex-shrink-0 rounded-full flex items-center justify-center shadow-md"
            style={{
              width: 38,
              height: 38,
              background: "rgba(255,255,255,0.92)",
              opacity: 1,
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.25s ease",
            }}
          >
            {playing ? (
              <Pause style={{ width: 14, height: 14, color: "#0a0a0a" }} />
            ) : (
              <Play
                style={{
                  width: 14,
                  height: 14,
                  color: "#0a0a0a",
                  marginLeft: 1,
                }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   VOICE DEMO — drop-in replacement for the old VoiceDemo
   in DemoShowcase.tsx. Same export name, nothing else to change.
────────────────────────────────────────────────────────────────── */
export const VoiceDemo = memo(function VoiceDemo() {
  return (
    <>
      {/* Global keyframe — injected once, tiny */}
      <style>{`
        @keyframes fishWave {
          0%   { transform: scaleY(0.3);  }
          100% { transform: scaleY(1.3);  }
        }
      `}</style>

      <div className="flex flex-col h-full px-5 pt-4 pb-5 gap-3">
        {/* Sub-heading */}
        <p
          className="text-center text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: "var(--muted-foreground)" }}
        >
          AI Voice but this time, it&apos;s alive.
        </p>

        {/* Three equal cards */}
        <div className="flex gap-3 flex-1 min-h-0">
          {VOICE_CARDS.map((card) => (
            <div key={card.id} className="flex-1 min-w-0">
              <VoiceCardItem card={card} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
