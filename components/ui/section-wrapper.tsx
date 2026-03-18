import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  as?: "section" | "div";
  py?: boolean;
  style?: React.CSSProperties;
}

export const SectionWrapper = forwardRef<HTMLDivElement, SectionWrapperProps>(
  (
    {
      children,
      className,
      id,
      containerClassName,
      as: Component = "section",
      py = true,
      style,
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        id={id}
        style={style}
        className={cn(
          py && "py-16 sm:py-24", // Consistent vertical rhythm
          "relative overflow-hidden",
          className
        )}
      >
        <div
          className={cn(
            "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", // Strict horizontal layout
            containerClassName
          )}
        >
          {children}
        </div>
      </Component>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
