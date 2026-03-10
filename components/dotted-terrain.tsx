"use client"

import { useEffect, useRef, useState } from "react"

export function DottedTerrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    
    checkDarkMode()
    
    // Observe class changes on html element
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      ctx.clearRect(0, 0, width, height)

      const dotSpacing = 18
      const cols = Math.ceil(width / dotSpacing) + 1
      const rows = Math.ceil(height / dotSpacing) + 1

      const centerX = width / 2
      const baseY = height * 0.55

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing
          const y = j * dotSpacing

          // Calculate distance from center for mountain shape
          const distFromCenter = Math.abs(x - centerX) / (width * 0.55)
          
          // Create multi-peak mountain terrain effect
          const peak1 = Math.max(0, 1 - Math.pow((x - centerX * 0.7) / (width * 0.3), 2)) * 0.7
          const peak2 = Math.max(0, 1 - Math.pow((x - centerX * 1.3) / (width * 0.35), 2)) * 0.6
          const peak3 = Math.max(0, 1 - Math.pow(distFromCenter, 2)) * 0.85
          const mountainHeight = Math.max(peak1, peak2, peak3)
          
          const peakY = baseY - mountainHeight * height * 0.4
          
          // Add subtle wave animation for atmosphere
          const wave = Math.sin(x * 0.008 + time * 0.3) * 8 + Math.sin(x * 0.015 + time * 0.2) * 4
          const adjustedY = peakY + wave
          
          // Only draw dots that form the mountain shape
          if (y > adjustedY) {
            // Calculate opacity based on position with smoother falloff
            const verticalFade = Math.min(1, (y - adjustedY) / (height * 0.5))
            const horizontalFade = 1 - Math.pow(distFromCenter, 1.5)
            const baseOpacity = isDark ? 0.6 : 0.5
            const opacity = Math.max(0, Math.min(baseOpacity, verticalFade * horizontalFade * baseOpacity))
            
            if (opacity > 0.015) {
              // Dot size varies based on position for depth
              const depthSize = 1.2 + (1 - verticalFade) * 0.8
              const size = depthSize + Math.sin(x * 0.03 + y * 0.03 + time * 0.15) * 0.3
              
              ctx.beginPath()
              ctx.arc(x, y, size, 0, Math.PI * 2)
              // Dark mode uses lighter dots, light mode uses darker dots
              if (isDark) {
                ctx.fillStyle = `rgba(250, 250, 250, ${opacity})`
              } else {
                ctx.fillStyle = `rgba(10, 10, 10, ${opacity})`
              }
              ctx.fill()
            }
          }
        }
      }

      time += 0.012
      animationFrameId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}
