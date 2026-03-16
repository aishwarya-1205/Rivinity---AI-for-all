"use client";
import {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
} from "react";
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
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [orbitRadius, setOrbitRadius] = useState(220);
  const [isMobile, setIsMobile] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  // Per-node screen positions driven by RAF — these are container-relative px values
  const [nodePositions, setNodePositions] = useState<
    Record<number, { x: number; y: number }>
  >({});

  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0); // current orbit angle in radians
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const cardTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const orbitRadiusRef = useRef(220);

  // Keep ref in sync with state
  useEffect(() => {
    orbitRadiusRef.current = orbitRadius;
  }, [orbitRadius]);

  useLayoutEffect(() => {
    const updateRadius = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const containerEl = containerRef.current;
      const containerWidth = containerEl
        ? containerEl.getBoundingClientRect().width
        : screenWidth;
      const usable = Math.min(containerWidth, screenHeight);

      let radius: number;
      if (screenWidth < 380) {
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

  // RAF loop — computes each node's (x,y) in container space every frame
  useEffect(() => {
    const total = timelineData.length;

    const tick = () => {
      if (!pausedRef.current) {
        angleRef.current += 0.004;
      }

      const containerEl = containerRef.current;
      if (containerEl) {
        const w = containerEl.offsetWidth;
        const h = containerEl.offsetHeight;
        const cx = w / 2;
        const cy = h / 2;
        const r = orbitRadiusRef.current;

        const positions: Record<number, { x: number; y: number }> = {};
        timelineData.forEach((item, i) => {
          const baseAngle = (i / total) * Math.PI * 2;
          const a = angleRef.current + baseAngle;
          positions[item.id] = {
            x: cx + r * Math.cos(a),
            y: cy + r * Math.sin(a),
          };
        });
        setNodePositions(positions);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [timelineData]);

  const getRelatedItems = (itemId: number): number[] => {
    const current = timelineData.find((item) => item.id === itemId);
    return current ? current.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (activeNodeId === null) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      // Deselect only when clicking the empty orbit backdrop
      if (
        target === containerRef.current ||
        target.dataset.backdrop === "true"
      ) {
        if (cardTimerRef.current) clearTimeout(cardTimerRef.current);
        setCardVisible(false);
        setActiveNodeId(null);
        setPulseEffect({});
        pausedRef.current = false;
      }
    },
    []
  );

  const toggleItem = (id: number) => {
    if (cardTimerRef.current) clearTimeout(cardTimerRef.current);

    const alreadyOpen = activeNodeId === id;

    if (!alreadyOpen) {
      // Pause rotation immediately
      pausedRef.current = true;
      setActiveNodeId(id);
      setCardVisible(false);

      // Card appears after node finishes floating (400ms CSS transition)
      cardTimerRef.current = setTimeout(() => setCardVisible(true), 420);

      const relatedItems = getRelatedItems(id);
      const newPulse: Record<number, boolean> = {};
      relatedItems.forEach((relId) => {
        newPulse[relId] = true;
      });
      setPulseEffect(newPulse);
    } else {
      setCardVisible(false);
      setActiveNodeId(null);
      setPulseEffect({});
      pausedRef.current = false;
    }
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-accent border-accent";
      case "in-progress":
        return "text-white bg-highlight border-highlight";
      default:
        return "text-foreground bg-secondary border-border";
    }
  };

  const activeItem =
    activeNodeId !== null
      ? timelineData.find((i) => i.id === activeNodeId) ?? null
      : null;

  const nodeSize = isMobile ? 36 : 44;
  const cardWidth = isMobile ? 220 : 280;

  // Where the active node floats to: top-center of the container
  const getFloatTarget = (): { x: number; y: number } => {
    const containerEl = containerRef.current;
    if (!containerEl) return { x: 0, y: 0 };
    const w = containerEl.offsetWidth;
    const h = containerEl.offsetHeight;
    return {
      x: w / 2,
      y: h / 2 - orbitRadius * 0.82,
    };
  };

  return (
    <>
      <style>{`
        @keyframes cardSlideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px) scale(0.94); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)      scale(1); }
        }
        @keyframes nodeFloat {
          from { opacity: 0.6; }
          to   { opacity: 1; }
        }
      `}</style>

      <div
        ref={containerRef}
        className="w-full flex items-center justify-center relative select-none"
        style={{
          height: `${orbitRadius * 2 + 160}px`,
          minHeight: isMobile ? "360px" : "460px",
          maxHeight: isMobile ? "560px" : "740px",
          overflow: "visible",
        }}
        onClick={handleContainerClick}
        data-backdrop="true"
      >
        {/* ── Decorative orbit rings (pure visual, no rotation) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="absolute rounded-full border border-border/50"
            style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
          />
          <div
            className="absolute rounded-full border border-border/30"
            style={{ width: orbitRadius * 1.5, height: orbitRadius * 1.5 }}
          />
        </div>

        {/* ── Center core ── */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-accent via-highlight to-accent animate-pulse flex items-center justify-center z-10"
          style={{
            width: isMobile ? 48 : 64,
            height: isMobile ? 48 : 64,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
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

        {/* ── Nodes — positioned via JS, NOT inside any rotating element ── */}
        {timelineData.map((item) => {
          const pos = nodePositions[item.id];
          if (!pos) return null;

          const isExpanded = activeNodeId === item.id;
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          const floatTarget = isExpanded ? getFloatTarget() : null;

          // Final rendered position: float target when expanded, orbit pos otherwise
          const renderX = floatTarget ? floatTarget.x : pos.x;
          const renderY = floatTarget ? floatTarget.y : pos.y;

          return (
            <div
              key={item.id}
              className="absolute cursor-pointer flex flex-col items-center"
              style={{
                left: renderX,
                top: renderY,
                transform: "translate(-50%, -50%)",
                // Smooth float transition only when becoming/leaving expanded
                transition: isExpanded
                  ? "left 0.45s cubic-bezier(0.34,1.4,0.64,1), top 0.45s cubic-bezier(0.34,1.4,0.64,1)"
                  : activeNodeId !== null
                    ? "none" // other nodes: no transition while one is expanded
                    : "none", // rotating: no transition (RAF drives it)
                zIndex: isExpanded ? 60 : 20,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {/* Energy glow aura */}
              <div
                className={`absolute rounded-full pointer-events-none${isPulsing ? " animate-pulse" : ""}`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,122,24,0.28) 0%, rgba(108,99,255,0.10) 50%, transparent 70%)",
                  width: item.energy * 0.5 + 40,
                  height: item.energy * 0.5 + 40,
                  left: -((item.energy * 0.5 + 40 - nodeSize) / 2),
                  top: -((item.energy * 0.5 + 40 - nodeSize) / 2),
                }}
              />

              {/* Gradient border glow */}
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute -inset-[2px] rounded-full opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,122,24,0.9), rgba(108,99,255,0.9))",
                    filter: "blur(5px)",
                  }}
                />
                <div
                  className={`
                    relative rounded-full flex items-center justify-center
                    border transition-all duration-300 backdrop-blur-sm
                    ${isExpanded
                      ? "bg-accent text-white border-accent shadow-xl scale-125"
                      : isRelated
                        ? "bg-highlight/50 text-white border-highlight scale-110"
                        : "bg-card/90 text-foreground border-border hover:scale-110"
                    }
                  `}
                  style={{ width: nodeSize, height: nodeSize }}
                >
                  <Icon size={isMobile ? 14 : 18} />
                </div>
              </div>

              {/* Label — always upright (node is never inside a rotated element) */}
              <div
                className={`
                  mt-2 whitespace-nowrap font-semibold tracking-wider transition-all duration-300
                  ${isMobile ? "text-[9px]" : "text-xs"}
                  ${isExpanded ? "text-accent" : "text-foreground/70"}
                `}
              >
                {item.title}
              </div>
            </div>
          );
        })}

        {/* ── Detail card — sibling to nodes, never inside orbit ring ── */}
        {activeItem && cardVisible && (() => {
          const ft = getFloatTarget();
          return (
            <Card
              className="absolute bg-card/95 backdrop-blur-xl border-border shadow-2xl shadow-accent/10 z-[100] overflow-visible"
              style={{
                width: cardWidth,
                // Position below the floated node
                left: ft.x,
                top: ft.y + nodeSize * 0.6 + 22,
                transform: "translateX(-50%)",
                animation:
                  "cardSlideDown 0.32s cubic-bezier(0.34,1.4,0.64,1) forwards",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Connector stem */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-px h-3 bg-accent/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent/70 mt-px" />
              </div>

              <CardHeader className="pb-2 px-3 pt-3">
                <div className="flex justify-between items-center">
                  <Badge
                    className={`px-2 text-[10px] ${getStatusStyles(activeItem.status)}`}
                  >
                    {activeItem.status === "completed"
                      ? "COMPLETE"
                      : activeItem.status === "in-progress"
                        ? "IN PROGRESS"
                        : "UPCOMING"}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {activeItem.date}
                  </span>
                </div>
                <CardTitle className="text-sm mt-2 text-card-foreground">
                  {activeItem.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-[11px] text-muted-foreground px-3 pb-3">
                <p>{activeItem.content}</p>

                <div className="mt-3 pt-2 border-t border-border">
                  <div className="flex justify-between items-center text-[10px] mb-1">
                    <span className="flex items-center text-card-foreground">
                      <Zap size={10} className="mr-1 text-accent" /> Progress
                    </span>
                    <span className="font-mono text-card-foreground">
                      {activeItem.energy}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-highlight rounded-full"
                      style={{ width: `${activeItem.energy}%` }}
                    />
                  </div>
                </div>

                {activeItem.relatedIds.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-border">
                    <div className="flex items-center mb-2">
                      <Link size={10} className="text-muted-foreground mr-1" />
                      <h4 className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                        Connected
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {activeItem.relatedIds.map((relatedId) => {
                        const relatedItem = timelineData.find(
                          (i) => i.id === relatedId
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
          );
        })()}

        {/* Hint */}
        <p
          className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-muted-foreground pointer-events-none"
          data-backdrop="true"
        >
          {activeItem
            ? "Click outside to resume rotation."
            : "Click on any node to explore details. Click outside to resume rotation."}
        </p>
      </div>
    </>
  );
}