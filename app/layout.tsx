import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundPaths } from "@/components/landing/background-paths";
import "./globals.css";

// Inter — the exact font used throughout the Rivinity product UI
// Covers all weight levels visible in the screenshot: light labels → bold headings
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Inter also drives display/heading role (no separate display font in Rivinity UI)
const interDisplay = Inter({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rivinity | The Intelligence Infrastructure for Humanity",
  description:
    "Rivinity is an Artificial Intelligence Operating System designed to democratize intelligence for humanity. Build, deploy, and scale AI applications with the global intelligence infrastructure.",
  generator: "Rivinity",
  keywords: [
    "AI",
    "Artificial Intelligence",
    "Machine Learning",
    "AI Infrastructure",
    "AI Operating System",
  ],
  authors: [{ name: "Rivinity" }],
  icons: {
    icon: [
      { url: "/logo_64x64.svg", type: "image/svg+xml" }, // primary (sharp)
      { url: "/logo_64x64.png", type: "image/png" }, // fallback
    ],
    apple: "/logo_64x64.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#FFFFFF" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interDisplay.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased tracking-tight selection:bg-accent/20">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <BackgroundPaths />

          <div className="relative will-change-transform" style={{ zIndex: 1 }}>
            {children}
          </div>

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
