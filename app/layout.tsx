import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundPaths } from "@/components/background-paths";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
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
      { url: "/logo.svg", type: "image/svg+xml" }, // primary (sharp)
      { url: "/logo.png", type: "image/png" }, // fallback
    ],
    apple: "/logo.png",
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
      className={`${spaceGrotesk.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
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
