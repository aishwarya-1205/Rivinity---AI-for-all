import { Mail, Instagram, Linkedin, Twitter, LucideIcon } from "lucide-react";

type SocialLink = {
  icon: LucideIcon;
  url: string;
};

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: Record<string, FooterLink[]> = {
  About: [
    { label: "Our Story", href: "#" },
    { label: "Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Research", href: "#" },
  ],
  Solutions: [
    { label: "Security", href: "#" },
    { label: "CLOS-AI", href: "#" },
    { label: "Governance", href: "#" },
    { label: "Deepfake Detection", href: "#" },
    { label: "Compliance", href: "#" },
    { label: "Post Your Ad", href: "/advertise" },
  ],
  "Other Links": [
    { label: "Documentation", href: "#" },
    { label: "API Status", href: "#" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks: SocialLink[] = [
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/company/bharatartificialintelligence/",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/rivinityai/",
  },
  {
    icon: Twitter,
    url: "https://x.com/rivinityai",
  },
];

export function Footer() {
  return (
    // Outer wrapper: isolated white background so it's never affected by parent section colors
    <footer
      className="relative pb-28 pt-32 px-4"
      style={{
        backgroundColor: "#ffffff",
        isolation: "isolate",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden"
      >
        <span
          className="font-black tracking-tight select-none"
          style={{
            fontSize: "clamp(120px, 18vw, 260px)",
            lineHeight: 0.8,
            background: "linear-gradient(90deg,#a855f7,#f97316,#3b82f6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            opacity: 0.07,
            letterSpacing: "-0.05em",
          }}
        >
          RIVINITY
        </span>
      </div>
      <div className="container-custom relative z-10">
        <div className="relative">
          {/* Subtle gradient glow — low opacity, just a hint of color */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-2px",
              borderRadius: "3rem",
              zIndex: 0,
              filter: "blur(32px)",
              opacity: 0.35,
              background: "linear-gradient(135deg, #a855f7, #f97316, #3b82f6)",
              pointerEvents: "none",
            }}
          />

          {/* Card */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              backgroundColor: "#ffffff",
              border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: "3rem",
              padding: "2.5rem",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
              {/* Col 1 */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>A product by</span>
                  <div className="flex items-center gap-1.5 opacity-60">
                    <div className="w-4 h-4 rounded-sm bg-orange-500" />
                    <span className="font-bold tracking-tight text-gray-600">
                      BharatTech
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-800 mb-3 tracking-wide uppercase">
                    Support Inquiries:
                  </p>
                  <a
                    href="mailto:support@rivinity.in"
                    className="flex items-center gap-2.5 text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Mail size={14} />
                    </div>
                    <span className="text-sm">support@rivinity.in</span>
                  </a>
                </div>
              </div>

              {/* Link columns */}
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="font-bold text-gray-900 text-sm tracking-widest uppercase mb-6">
                    {category}
                  </h4>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-gray-500 hover:text-gray-900 transition-all duration-300"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Get in touch */}
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm tracking-widest uppercase mb-2">
                    Get in touch
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    We don&apos;t send spam so don&apos;t worry.
                  </p>
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-gray-50 border border-gray-200 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200/60 text-gray-700 placeholder:text-gray-400"
                />

                <div className="flex items-center gap-5 pt-2">
                  {socialLinks.map(({ icon: Icon, url }, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-800 transition-colors"
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 mb-[-1rem] text-center">
          <p className="text-[15px] sm:text-s text-gray-400 font-medium tracking-wide">
            © 2026 BharatTech Technoecosystem Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
