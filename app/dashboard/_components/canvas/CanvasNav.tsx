import { ChevronDown, SquareArrowRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import SettingsModal from "../shared/SettingsModal";
import ReactDOM from "react-dom";
import { User, Settings, Download, LogOut } from "lucide-react";

const Portal = ({ children }: { children: React.ReactNode }) =>
  typeof document !== "undefined" ? ReactDOM.createPortal(children, document.body) : null;

interface CanvasNavProps {
  rightPanelOpen?: boolean;
  setRightPanelOpen?: (open: boolean) => void;
  title?: string;
  showModelSelector?: boolean;
}

const CanvasNav = ({ 
  rightPanelOpen, 
  setRightPanelOpen,
  title,
  showModelSelector = true
}: CanvasNavProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const profilePanelRef = useRef<HTMLDivElement>(null);

  // Close profile on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        profileOpen &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(target) &&
        profilePanelRef.current &&
        !profilePanelRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

  return (
    <>
      <div 
        className="h-[52px] flex items-center justify-between px-5 shrink-0 z-10"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="w-20 pl-4 flex items-center">
          {title && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground/80 tracking-tight">
                {title}
              </span>
            </div>
          )}
        </div>

        {/* Center */}
        <div className="flex items-center justify-center flex-1">
          {showModelSelector && (
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-muted/50 border border-transparent hover:border-border/40 transition-all duration-200">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="text-[13px] font-medium text-foreground/80">Rivinity Core</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/50" />
            </button>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 w-20 justify-end">
          {setRightPanelOpen && (
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 mr-1 ${
                rightPanelOpen
                  ? "bg-accent/10 text-[#ff7a18]"
                  : "text-muted-foreground/50 hover:text-foreground/80 hover:bg-muted/60"
              }`}
            >
              <SquareArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            ref={profileBtnRef}
            onClick={() => setProfileOpen((v) => !v)}
            className={`w-8 h-8 rounded-xl gradient-accent flex items-center justify-center text-white text-[12px] font-bold transition-all duration-200 hover:opacity-90 shadow-sm ${
              profileOpen ? "ring-2 ring-[#ff7a18]/30 ring-offset-1 ring-offset-background" : ""
            }`}
          >
            JD
          </button>
        </div>
      </div>

      {/* Profile Dropdown */}
      {profileOpen && (
        <Portal>
          <div
            ref={profilePanelRef}
            className="glass-strong border border-border/40 shadow-float overflow-hidden animate-in fade-in zoom-in-95 duration-200 rounded-xl"
            style={{
              position: "fixed",
              top: (profileBtnRef.current?.getBoundingClientRect().bottom ?? 0) + 8,
              right: window.innerWidth - (profileBtnRef.current?.getBoundingClientRect().right ?? 0),
              width: 220,
              zIndex: 9999,
            }}
          >
            <div className="px-4 py-4 border-b border-border/40 flex items-center gap-3 bg-muted/20">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                JD
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-foreground truncate tracking-tight">
                  John Doe
                </p>
                <p className="text-[11px] text-muted-foreground/60 truncate">
                  john@rivinity.ai
                </p>
              </div>
            </div>
            <div className="p-1.5 space-y-0.5">
              {[
                { icon: User, label: "View profile" },
                { icon: Settings, label: "Account settings" },
                { icon: Download, label: "Export data" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.label === "Account settings") {
                      setSettingsOpen(true);
                    }
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all duration-150"
                >
                  <item.icon className="w-3.5 h-3.5 text-muted-foreground/50" />
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-border/40 my-1.5 mx-2" />
              <button 
                onClick={() => setProfileOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-all duration-150"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            </div>
          </div>
        </Portal>
      )}

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default CanvasNav;
