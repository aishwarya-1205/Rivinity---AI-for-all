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
    <footer className="relative pb-28 pt-32 px-4 bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden"
      >
        <div
          className="flex justify-between w-full max-w-[80vw] mx-auto font-black select-none pointer-events-none"
          style={{
            fontSize: "clamp(50px, 10vw, 360px)",
            lineHeight: 1,
            opacity: 0.08,
            background: "linear-gradient(90deg,#a855f7,#f97316,#3b82f6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            whiteSpace: "nowrap",
          }}
        >
          {"RIVINITY".split("").map((char, i) => (
            <span key={i} className="flex-1 text-center">
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="relative">
          {/* Gradient glow border */}
          <div
            aria-hidden
            className="absolute -inset-[2px] rounded-[3rem] pointer-events-none"
            style={{
              zIndex: 0,
              filter: "blur(32px)",
              opacity: 0.35,
              background: "linear-gradient(135deg, #a855f7, #f97316, #3b82f6)",
            }}
          />

          {/* Card */}
          <div className="relative z-[1] bg-white dark:bg-gray-900 border border-black/[0.07] dark:border-white/[0.08] rounded-[3rem] p-10 shadow-sm dark:shadow-black/30 transition-colors duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
              {/* Col 1 — brand + contact */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                  <span>A product by</span>
                  <div className="flex items-center gap-1.5 opacity-60">
                    <div className="w-4 h-4 rounded-sm bg-orange-500" />
                    <span className="font-bold tracking-tight text-gray-600 dark:text-gray-300">
                      BharatTech
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 tracking-wide uppercase">
                    Support Inquiries:
                  </p>
                  <a
                    href="mailto:support@rivinity.in"
                    className="flex items-center gap-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Mail size={14} />
                    </div>
                    <span className="text-sm">support@rivinity.in</span>
                  </a>
                </div>
              </div>

              {/* Link columns */}
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm tracking-widest uppercase mb-6">
                    {category}
                  </h4>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
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
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm tracking-widest uppercase mb-2">
                    Get in touch
                  </h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                    We don&apos;t send spam so don&apos;t worry.
                  </p>
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200/60 dark:focus:ring-purple-500/30 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                />

                <div className="flex items-center gap-5 pt-2">
                  {socialLinks.map(({ icon: Icon, url }, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
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
          <p className="text-[15px] sm:text-s text-gray-400 dark:text-gray-600 font-medium tracking-wide">
            © 2026 BharatTech Technoecosystem Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
