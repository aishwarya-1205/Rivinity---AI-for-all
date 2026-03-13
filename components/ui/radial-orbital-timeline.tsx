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

const ORBIT_RADIUS = 220;

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  );
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

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
      x: ORBIT_RADIUS * Math.cos(rad),
      y: ORBIT_RADIUS * Math.sin(rad),
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
    // Paint correct positions synchronously before first frame
    applyDOMTransformations();
    animationFrameRef.current = requestAnimationFrame(animateOrbit);
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [expandedItems]);

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

  return (
    <div
      className="w-full h-[600px] md:h-[700px] flex flex-col items-center justify-center overflow-hidden relative"
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
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-accent via-highlight to-accent animate-pulse flex items-center justify-center z-[5]">
            <div className="absolute w-24 h-24 rounded-full border border-accent/20 animate-ping opacity-70" />
            <div
              className="absolute w-28 h-28 rounded-full border border-highlight/20 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center">
              <span className="text-xs font-bold text-foreground">AI</span>
            </div>
          </div>

          {/* Orbit ring — diameter exactly matches ORBIT_RADIUS */}
          <div
            className="absolute rounded-full border border-border/50 pointer-events-none"
            style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }}
          />
          <div
            className="absolute rounded-full border border-border/30 pointer-events-none"
            style={{ width: ORBIT_RADIUS * 1.5, height: ORBIT_RADIUS * 1.5 }}
          />

          {timelineData.map((item, index) => {
            // Static initial position matching rotation=0 so there's no flash at (0,0)
            const { x: initX, y: initY } = getNodePosition(index, total, 0);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute left-1/2 top-1/2 cursor-pointer"
                style={{
                  // RAF overwrites this every frame — this just sets a valid
                  // starting position so nodes never flash at the origin
                  transform: `translate(-50%, -50%) translate(${initX}px, ${initY}px)`,
                  // Do NOT put `transition` on transform — it fights the RAF loop
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
                  {/* Gradient ring */}
                  <div
                    className="absolute -inset-[2px] rounded-full blur-[6px] opacity-70"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,122,24,0.9), rgba(108,99,255,0.9))",
                    }}
                  />

                  {/* Node button */}
                  <div
                    className={`
      relative w-12 h-12 rounded-full flex items-center justify-center
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
                    <Icon size={18} />
                  </div>
                </div>

                {/* Label */}
                <div
                  className={`
                    absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-xs font-semibold tracking-wider transition-all duration-300
                    ${isExpanded ? "text-accent scale-110" : "text-foreground/70"}
                  `}
                >
                  {item.title}
                </div>

                {/* Expanded detail card */}
                {isExpanded && (
                  <Card
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-card/95 backdrop-blur-xl border-border shadow-2xl shadow-accent/10 overflow-visible z-50"
                    style={{
                      animation:
                        "cardReveal 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                    }}
                  >
                    <style>{`
                    @keyframes cardReveal {
                      from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.92); }
                      to   { opacity: 1; transform: translateX(-50%) translateY(0px)  scale(1);    }
                    }
                  `}</style>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-accent/50" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(item.status)}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                              ? "IN PROGRESS"
                              : "UPCOMING"}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-card-foreground">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-xs mb-1">
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
                        <div className="mt-4 pt-3 border-t border-border">
                          <div className="flex items-center mb-2">
                            <Link
                              size={10}
                              className="text-muted-foreground mr-1"
                            />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
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
                                  className="flex items-center h-6 px-2 py-0 text-xs border-border bg-transparent hover:bg-accent/10 text-card-foreground hover:text-accent transition-all"
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
