"use client";
import { useState, useLayoutEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  );
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [orbitRadius, setOrbitRadius] = useState(220);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateRadius = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Use the container's actual width, not just screen width
      const containerEl = containerRef.current;
      const containerWidth = containerEl
        ? containerEl.getBoundingClientRect().width
        : screenWidth;

      const usable = Math.min(containerWidth, screenHeight);

      let radius: number;

      if (screenWidth < 380) {
        // Very small phones: keep nodes fully within viewport
        radius = Math.min(containerWidth * 0.28, 100);
      } else if (screenWidth < 480) {
        radius = Math.min(containerWidth * 0.3, 120);
      } else if (screenWidth < 768) {
        radius = Math.min(containerWidth * 0.32, 150);
      } else if (screenWidth < 1024) {
        radius = usable * 0.3;
      } else {
        radius = 220;
      }

      setOrbitRadius(radius);
      setIsMobile(screenWidth < 768);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const rotationAngleRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(true);
  const animationFrameRef = useRef<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const getNodePosition = (index: number, total: number, rotation: number) => {
    const angle = ((index / total) * 360 + rotation) % 360;
    const rad = (angle * Math.PI) / 180;
    return {
      x: orbitRadius * Math.cos(rad),
      y: orbitRadius * Math.sin(rad),
    };
  };

  const applyDOMTransformations = () => {
    const total = timelineData.length;
    timelineData.forEach((item, index) => {
      const el = nodeRefs.current[item.id];
      if (!el) return;
      const { x, y } = getNodePosition(index, total, rotationAngleRef.current);
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
  };

  const animateOrbit = () => {
    if (autoRotateRef.current) {
      rotationAngleRef.current = (rotationAngleRef.current + 0.2) % 360;
    }
    applyDOMTransformations();
    animationFrameRef.current = requestAnimationFrame(animateOrbit);
  };

  useLayoutEffect(() => {
    applyDOMTransformations();
    animationFrameRef.current = requestAnimationFrame(animateOrbit);
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [expandedItems, orbitRadius]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      autoRotateRef.current = true;
    }
  };

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    rotationAngleRef.current = 270 - targetAngle;
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        autoRotateRef.current = false;
        const relatedItems = getRelatedItems(id);
        const newPulse: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulse[relId] = true;
        });
        setPulseEffect(newPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        autoRotateRef.current = true;
        setPulseEffect({});
      }

      return newState;
    });
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-accent border-accent";
      case "in-progress":
        return "text-white bg-highlight border-highlight";
      case "pending":
        return "text-foreground bg-secondary border-border";
      default:
        return "text-foreground bg-secondary border-border";
    }
  };

  const total = timelineData.length;

  // On mobile the expanded card should render above the node, not below,
  // to avoid being clipped at the bottom of the container.
  const getCardOffset = (nodeId: number): string => {
    if (!isMobile) return "top-20";
    const nodeEl = nodeRefs.current[nodeId];
    if (!nodeEl) return "top-20";
    const rect = nodeEl.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return "top-20";
    // If the node is in the lower half of the container, show card above
    const relativeY = rect.top - containerRect.top;
    return relativeY > containerRect.height / 2 ? "bottom-14" : "top-14";
  };

  // Card width: narrower on small mobile
  const cardWidthClass = isMobile ? "w-52" : "w-56 sm:w-64 lg:w-72";

  return (
    <div
      className="w-full flex items-center justify-center overflow-hidden relative"
      style={{
        // Dynamically size height so the full orbit fits: diameter + node size + label + padding
        height: `${orbitRadius * 2 + 120}px`,
        minHeight: isMobile ? "320px" : "420px",
        maxHeight: isMobile ? "480px" : "650px",
      }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Center Core */}
          <div
            className="absolute rounded-full bg-gradient-to-br from-accent via-highlight to-accent animate-pulse flex items-center justify-center z-[5]"
            style={{ width: isMobile ? 48 : 64, height: isMobile ? 48 : 64 }}
          >
            <div className="absolute w-24 h-24 rounded-full border border-accent/20 animate-ping opacity-70" />
            <div
              className="absolute w-28 h-28 rounded-full border border-highlight/20 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center">
              <span className="text-xs font-bold text-foreground">AI</span>
            </div>
          </div>

          {/* Orbit rings */}
          <div
            className="absolute rounded-full border border-border/50 pointer-events-none"
            style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
          />
          <div
            className="absolute rounded-full border border-border/30 pointer-events-none"
            style={{ width: orbitRadius * 1.5, height: orbitRadius * 1.5 }}
          />

          {timelineData.map((item, index) => {
            const { x: initX, y: initY } = getNodePosition(index, total, 0);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            // Node size: smaller on mobile
            const nodeSize = isMobile
              ? "w-9 h-9"
              : "w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12";
            const labelTop = isMobile ? "top-10" : "top-9 sm:top-12 lg:top-14";

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute left-1/2 top-1/2 cursor-pointer"
                style={{
                  transform: `translate(-50%, -50%) translate(${initX}px, ${initY}px)`,
                  transition: "opacity 0.3s, filter 0.3s",
                  zIndex: isExpanded ? 50 : 10,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy glow aura */}
                <div
                  className={`absolute rounded-full ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,122,24,0.3) 0%, rgba(108,99,255,0.1) 50%, transparent 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                {/* Gradient border wrapper */}
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute -inset-[2px] rounded-full blur-[6px] opacity-70"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,122,24,0.9), rgba(108,99,255,0.9))",
                    }}
                  />
                  <div
                    className={`
                      relative ${nodeSize} rounded-full flex items-center justify-center
                      border transition-all duration-300 transform backdrop-blur-sm
                      ${
                        isExpanded
                          ? "bg-accent text-white border-accent shadow-lg scale-125"
                          : isRelated
                            ? "bg-highlight/50 text-white border-highlight"
                            : "bg-card/90 text-foreground border-border hover:scale-110"
                      }
                    `}
                  >
                    <Icon size={isMobile ? 14 : 18} />
                  </div>
                </div>

                {/* Label — hidden on very small screens to avoid overlap */}
                <div
                  className={`
                    absolute ${labelTop} left-1/2 -translate-x-1/2 whitespace-nowrap
                    font-semibold tracking-wider transition-all duration-300
                    ${isMobile ? "text-[9px]" : "text-xs"}
                    ${isExpanded ? "text-accent scale-110" : "text-foreground/70"}
                  `}
                >
                  {item.title}
                </div>

                {/* Expanded detail card */}
                {isExpanded && (
                  <Card
                    className={`absolute left-1/2 -translate-x-1/2 ${cardWidthClass} ${getCardOffset(item.id)} bg-card/95 backdrop-blur-xl border-border shadow-2xl shadow-accent/10 overflow-visible z-50`}
                    style={{
                      animation:
                        "cardReveal 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                    }}
                  >
                    <style>{`
                      @keyframes cardReveal {
                        from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.92); }
                        to   { opacity: 1; transform: translateX(-50%) translateY(0px)  scale(1); }
                      }
                    `}</style>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-accent/50" />
                    <CardHeader className="pb-2 px-3 pt-3">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-[10px] ${getStatusStyles(item.status)}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                              ? "IN PROGRESS"
                              : "UPCOMING"}
                        </Badge>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-xs mt-2 text-card-foreground">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-[11px] text-muted-foreground px-3 pb-3">
                      <p>{item.content}</p>

                      <div className="mt-3 pt-2 border-t border-border">
                        <div className="flex justify-between items-center text-[10px] mb-1">
                          <span className="flex items-center text-card-foreground">
                            <Zap size={10} className="mr-1 text-accent" />{" "}
                            Progress
                          </span>
                          <span className="font-mono text-card-foreground">
                            {item.energy}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-highlight rounded-full"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-border">
                          <div className="flex items-center mb-2">
                            <Link
                              size={10}
                              className="text-muted-foreground mr-1"
                            />
                            <h4 className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                              Connected
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId,
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-[10px] border-border bg-transparent hover:bg-accent/10 text-card-foreground hover:text-accent transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-muted-foreground"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
