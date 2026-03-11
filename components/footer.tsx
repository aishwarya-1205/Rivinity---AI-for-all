import { motion } from "framer-motion";
import {
  Mail,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  LucideIcon,
} from "lucide-react";

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
    <footer className="relative pb-10 pt-20 px-4 overflow-hidden">
      <div className="container-custom">
        <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                <span>A product by</span>
                <div className="flex items-center gap-1.5 grayscale opacity-70">
                  <div className="w-4 h-4 rounded-sm bg-orange-500" />
                  <span className="font-bold tracking-tight">BharatTech</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase opacity-80">
                  Support Inquiries:
                </p>
                <a
                  href="mailto:support@rivinity.ai"
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group/mail"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/mail:bg-primary/10 transition-colors">
                    <Mail size={14} />
                  </div>
                  <span className="text-sm">support@rivinity.in</span>
                </a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-heading font-bold text-foreground text-sm tracking-widest uppercase mb-6 opacity-90">
                  {category}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center group/link"
                      >
                        <span className="hover:translate-x-1 transition-transform">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="font-heading font-bold text-foreground text-sm tracking-widest uppercase mb-2 opacity-90">
                  Get in touch
                </h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">
                  We don't send spam so don't worry.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="relative group/input">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-5 pt-2">
                {socialLinks.map(({ icon: Icon, url }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:scale-110 transition-transform"
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 mb-6 text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-medium tracking-wide">
            © 2026 BharatTech Technoecosystem Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
