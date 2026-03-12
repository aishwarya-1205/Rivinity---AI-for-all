"use client";

export const Component = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 50%, rgba(255,122,24,0.18) 0%, rgba(200,109,215,0.12) 40%, rgba(108,99,255,0.10) 60%, transparent 75%),
          linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black 35%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black 35%, transparent 100%)",
      }}
    />
  );
};
