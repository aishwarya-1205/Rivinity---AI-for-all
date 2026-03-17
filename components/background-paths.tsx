"use client";

import { useEffect, useRef } from "react";

export function BackgroundPaths() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="pg2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
          </linearGradient>

          <style>{`
            @keyframes dash1 {
              0%   { stroke-dashoffset: 2000; opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 0; }
            }
            @keyframes dash2 {
              0%   { stroke-dashoffset: 0; opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 1; }
              100% { stroke-dashoffset: -2000; opacity: 0; }
            }
            .bp { stroke-dasharray: 2000; fill: none; }
            .bp:nth-child(odd)  { animation: dash1 var(--dur, 40s) var(--del, 0s) infinite ease-in-out; }
            .bp:nth-child(even) { animation: dash2 var(--dur, 40s) var(--del, 0s) infinite ease-in-out; }
          `}</style>
        </defs>

        {/* Left-to-right sweeping paths */}
        <path
          className="bp"
          style={{ "--dur": "22s", "--del": "0s" } as React.CSSProperties}
          d="M-300 800 C200 600 400 300 800 200 S1200 100 1800 50"
          stroke="url(#pg1)"
          strokeWidth="0.8"
          strokeOpacity="0.06"
        />
        <path
          className="bp"
          style={{ "--dur": "26s", "--del": "2s" } as React.CSSProperties}
          d="M-200 700 C100 500 500 350 900 250 S1300 150 1800 120"
          stroke="url(#pg1)"
          strokeWidth="0.6"
          strokeOpacity="0.12"
        />
        <path
          className="bp"
          style={{ "--dur": "30s", "--del": "4s" } as React.CSSProperties}
          d="M-400 900 C0 700 300 400 750 300 S1100 200 1700 180"
          stroke="url(#pg1)"
          strokeWidth="1.0"
          strokeOpacity="0.10"
        />
        <path
          className="bp"
          style={{ "--dur": "24s", "--del": "6s" } as React.CSSProperties}
          d="M-100 600 C300 450 600 280 950 220 S1350 160 1800 90"
          stroke="url(#pg2)"
          strokeWidth="0.7"
          strokeOpacity="0.13"
        />
        <path
          className="bp"
          style={{ "--dur": "28s", "--del": "1s" } as React.CSSProperties}
          d="M-350 850 C50 650 350 380 780 280 S1150 180 1750 140"
          stroke="url(#pg2)"
          strokeWidth="0.5"
          strokeOpacity="0.11"
        />
        <path
          className="bp"
          style={{ "--dur": "32s", "--del": "3s" } as React.CSSProperties}
          d="M-250 750 C150 550 450 320 850 240 S1250 130 1800 70"
          stroke="url(#pg1)"
          strokeWidth="0.9"
          strokeOpacity="0.09"
        />
        <path
          className="bp"
          style={{ "--dur": "20s", "--del": "5s" } as React.CSSProperties}
          d="M-150 650 C250 480 550 300 920 230 S1320 140 1800 100"
          stroke="url(#pg2)"
          strokeWidth="0.6"
          strokeOpacity="0.14"
        />
        <path
          className="bp"
          style={{ "--dur": "34s", "--del": "7s" } as React.CSSProperties}
          d="M-450 950 C-50 750 250 450 700 340 S1050 230 1650 200"
          stroke="url(#pg1)"
          strokeWidth="0.4"
          strokeOpacity="0.08"
        />

        {/* Top-to-bottom arcing paths */}
        <path
          className="bp"
          style={{ "--dur": "25s", "--del": "1.5s" } as React.CSSProperties}
          d="M200 -100 C300 200 200 500 350 700 S500 850 600 950"
          stroke="url(#pg2)"
          strokeWidth="0.7"
          strokeOpacity="0.10"
        />
        <path
          className="bp"
          style={{ "--dur": "29s", "--del": "3.5s" } as React.CSSProperties}
          d="M500 -150 C600 150 480 450 550 680 S650 830 720 1000"
          stroke="url(#pg1)"
          strokeWidth="0.5"
          strokeOpacity="0.12"
        />
        <path
          className="bp"
          style={{ "--dur": "23s", "--del": "5.5s" } as React.CSSProperties}
          d="M900 -80  C950 220 820 480 880 700 S950 860 1000 980"
          stroke="url(#pg2)"
          strokeWidth="0.8"
          strokeOpacity="0.09"
        />
        <path
          className="bp"
          style={{ "--dur": "27s", "--del": "0.5s" } as React.CSSProperties}
          d="M1200 -120 C1250 180 1100 460 1150 690 S1200 850 1250 1000"
          stroke="url(#pg1)"
          strokeWidth="0.6"
          strokeOpacity="0.11"
        />

        {/* Diagonal cross paths */}
        <path
          className="bp"
          style={{ "--dur": "35s", "--del": "2.5s" } as React.CSSProperties}
          d="M-200 -100 C200 200 600 500 900 600 S1300 750 1700 900"
          stroke="url(#pg1)"
          strokeWidth="0.5"
          strokeOpacity="0.08"
        />
        <path
          className="bp"
          style={{ "--dur": "31s", "--del": "4.5s" } as React.CSSProperties}
          d="M1700 -100 C1300 200 900 400 600 550 S200 700 -100 900"
          stroke="url(#pg2)"
          strokeWidth="0.5"
          strokeOpacity="0.08"
        />
        <path
          className="bp"
          style={{ "--dur": "38s", "--del": "6.5s" } as React.CSSProperties}
          d="M-100 -50  C400 250 700 500 950 620 S1350 780 1800 950"
          stroke="url(#pg1)"
          strokeWidth="0.4"
          strokeOpacity="0.07"
        />
        <path
          className="bp"
          style={{ "--dur": "33s", "--del": "8s" } as React.CSSProperties}
          d="M1800 -50  C1350 250 1050 450 750 600 S350 780 -100 950"
          stroke="url(#pg2)"
          strokeWidth="0.4"
          strokeOpacity="0.07"
        />
      </svg>
    </div>
  );
}
