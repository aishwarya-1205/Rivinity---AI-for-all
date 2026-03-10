"use client";

import React from "react";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = ({
  testimonials,
  duration = 30,
  className = "",
}: {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}) => {
  const items = [...testimonials, ...testimonials];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex flex-col gap-6 testimonial-scroll"
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        {items.map(({ text, image, name, role }, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-card border border-white/5 hover:border-accent/30 transition-all shadow-md max-w-sm w-full"
          >
            <p className="text-sm text-foreground/90 leading-relaxed">
              {text}
            </p>

            <div className="flex items-center gap-3 mt-6">
              {image.startsWith("http") ? (
                <img
                  src={image}
                  alt={name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white font-bold text-sm">
                  {image}
                </div>
              )}

              <div>
                <div className="font-semibold text-sm">{name}</div>
                <div className="text-xs text-muted-foreground">{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
