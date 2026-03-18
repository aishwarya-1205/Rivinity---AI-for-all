"use client";

import { motion } from "framer-motion";

export default function MountainSunrise() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">

      {/* Sun core — softer, more subtle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "500px",
          height: "300px",
          marginTop: "-60px",
          background: "radial-gradient(circle at 50% 30%, rgba(235,100,40,0.35) 0%, rgba(220,90,130,0.15) 40%, rgba(150,100,200,0.07) 65%, transparent 80%)",
          filter: "blur(60px)",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      />

      {/* Vertical beam — very gentle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.4 }}
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "50vw",
          height: "70%",
          background: "linear-gradient(to bottom, rgba(235,100,40,0.10) 0%, rgba(210,90,140,0.05) 50%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* Conic rays — very faint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, delay: 0.8 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[120vh]"
        style={{
          background: "conic-gradient(from 168deg at 50% 0%, transparent 0deg, rgba(235,100,40,0.04) 12deg, rgba(220,120,160,0.05) 24deg, transparent 36deg, transparent 60deg, rgba(150,100,200,0.03) 72deg, transparent 84deg)",
          filter: "blur(30px)",
        }}
      />

      {/* Horizon glow — orange fading into pink-purple */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 3, delay: 1 }}
        className="absolute w-full"
        style={{
          top: "42%",
          height: "2px",
          background: "linear-gradient(to right, transparent 5%, rgba(150,100,200,0.2) 20%, rgba(220,90,130,0.3) 38%, rgba(235,100,40,0.35) 50%, rgba(220,90,130,0.3) 62%, rgba(150,100,200,0.2) 80%, transparent 95%)",
          filter: "blur(3px)",
        }}
      />

      {/* Valley haze — pink-purple palette */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, delay: 0.3 }}
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "65%",
          background: `
            radial-gradient(ellipse at 15% 100%, rgba(150,100,200,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 100%, rgba(150,100,200,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 90%, rgba(220,90,130,0.08) 0%, transparent 60%)
          `,
          filter: "blur(80px)",
        }}
      />

      {/* Pulsing sun breath — very soft */}
      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "320px",
          height: "180px",
          marginTop: "-20px",
          background: "rgba(235,100,40,0.10)",
          filter: "blur(80px)",
          borderRadius: "50%",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
        style={{ zIndex: 10 }}
      />
    </div>
  );
}