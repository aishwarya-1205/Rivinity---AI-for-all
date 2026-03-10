"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

import { cn } from "@/lib/utils"

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.95, 0.9, 0.85], // Warm cream tone matching Rivinity palette
  markerColor: [255 / 255, 122 / 255, 24 / 255], // Rivinity orange #FF7A18
  glowColor: [0.98, 0.95, 0.9],
  markers: [
    // Major Indian cities
    { location: [19.076, 72.8777], size: 0.12 },   // Mumbai
    { location: [28.6139, 77.209], size: 0.12 },   // Delhi
    { location: [12.9716, 77.5946], size: 0.1 },   // Bangalore
    { location: [13.0827, 80.2707], size: 0.08 }, // Chennai
    { location: [22.5726, 88.3639], size: 0.08 }, // Kolkata
    { location: [17.385, 78.4867], size: 0.08 },  // Hyderabad
    { location: [23.0225, 72.5714], size: 0.06 }, // Ahmedabad
    { location: [18.5204, 73.8567], size: 0.06 }, // Pune
    // Other global cities
    { location: [40.7128, -74.006], size: 0.06 },  // New York
    { location: [51.5074, -0.1278], size: 0.05 }, // London
    { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
    { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
    { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)

  // Optimization: Only render the globe if it's actually scrolled into view
  const isInView = useInView(canvasRef, { margin: "200px" })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      // Extremely important performance optimization:
      // If the globe is off-screen, do absolutely nothing on this animation frame
      if (!isInView) return;

      if (!pointerInteracting.current) phi += 0.005
      state.phi = phi + r
      state.width = width * 2
      state.height = width * 2
    },
    [r, isInView], // Added isInView to dependencies
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"))
    return () => globe.destroy()
  }, [isInView]) // Re-bind effect if view state changes so the render loop halts/starts properly

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
