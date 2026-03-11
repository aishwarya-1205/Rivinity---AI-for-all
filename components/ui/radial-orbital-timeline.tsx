"use client";
import { useState, useEffect, useRef } from "react";
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
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // High-performance DOM rotation references (Bypasses React Render Cycle)
  const rotationAngleRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(true);
  const animationFrameRef = useRef<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  
  // Track strictly the DOM elements to natively adjust styling on 120fps tick
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      autoRotateRef.current = true;
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        autoRotateRef.current = false;

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        autoRotateRef.current = true;
        setPulseEffect({});
      }

      return newState;
    });
  };

  // Natively update DOM elements every tick
  const applyDOMTransformations = () => {
    const total = timelineData.length;
    timelineData.forEach((item, index) => {
      const el = nodeRefs.current[item.id];
      if (!el) return;

      const angle = ((index / total) * 360 + rotationAngleRef.current) % 360;
      const radius = 180;
      const radian = (angle * Math.PI) / 180;

      const x = radius * Math.cos(radian) + centerOffset.x;
      const y = radius * Math.sin(radian) + centerOffset.y;

      const zIndex = Math.round(100 + 50 * Math.cos(radian));
      // In JS sin(radian) ranges from -1 to 1.
      const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

      // If item is expanded, we lock its visual state to front, else orbit values
      const isExpanded = !!expandedItems[item.id];
      
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.zIndex = isExpanded ? "200" : zIndex.toString();
      el.style.opacity = isExpanded ? "1" : opacity.toString();
    });
  };

  // High performance RequestAnimationFrame loop replacing the 50ms setInterval
  const animateOrbit = () => {
    if (autoRotateRef.current) {
       rotationAngleRef.current = (rotationAngleRef.current + 0.2) % 360;
    }
    // Always apply transformations so newly expanded items apply properly
    applyDOMTransformations();
    animationFrameRef.current = requestAnimationFrame(animateOrbit);
  };

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animateOrbit);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [expandedItems]); // Restart loop with new state closures on click

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

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
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
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
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center Core */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-accent via-highlight to-accent animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-24 h-24 rounded-full border border-accent/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-28 h-28 rounded-full border border-highlight/20 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center">
              <span className="text-xs font-bold text-foreground">AI</span>
            </div>
          </div>

          {/* Orbit Ring */}
          <div className="absolute w-[360px] h-[360px] md:w-[400px] md:h-[400px] rounded-full border border-border/50"></div>
          <div className="absolute w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full border border-border/30"></div>

          {timelineData.map((item) => {
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
                className="absolute transition-all duration-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,122,24,0.3) 0%, rgba(108,99,255,0.1) 50%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-accent text-white"
                      : isRelated
                      ? "bg-highlight/50 text-white"
                      : "bg-card/80 text-foreground"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-accent shadow-lg shadow-accent/30"
                      : isRelated
                      ? "border-highlight animate-pulse"
                      : "border-border"
                  }
                  transition-all duration-300 transform backdrop-blur-sm
                  ${isExpanded ? "scale-125" : "hover:scale-110"}
                `}
                >
                  <Icon size={18} />
                </div>

                <div
                  className={`
                  absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-accent scale-110" : "text-foreground/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-card/95 backdrop-blur-xl border-border shadow-2xl shadow-accent/10 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-accent/50"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
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
                            <Zap size={10} className="mr-1 text-accent" />
                            Progress
                          </span>
                          <span className="font-mono text-card-foreground">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-highlight rounded-full"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-border">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-muted-foreground mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                              Connected
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
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
