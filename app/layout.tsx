import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Sainul Abid M | AI Technology Leader",
  description:
    "CTO at Iluzia Labs & Director at AyaTech. Architecting intelligent systems with GenAI, Machine Learning, and Immersive Tech.",
  keywords: ["AI", "Machine Learning", "Generative AI", "CTO", "Sainul Abid M", "Iluzia Labs", "AyaTech", "Data Science", "VR", "EdTech"],
  authors: [{ name: "Sainul Abid M" }],
  openGraph: {
    title: "Sainul Abid M | AI Technology Leader",
    description: "Building the future of intelligent systems through GenAI, ML, and Immersive Tech.",
    url: "https://sainulabid.com", // Placeholder
    siteName: "Sainul Abid M Portfolio",
    images: [
      {
        url: "/images/PhotoforBanner.jpeg", // Using existing image as fallback for OG
        width: 1200,
        height: 630,
        alt: "Sainul Abid M Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sainul Abid M | AI Technology Leader",
    description: "Building the future of intelligent systems through GenAI, ML, and Immersive Tech.",
    images: ["/images/PhotoforBanner.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="font-inter antialiased selection:bg-violet-500/30">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ScrollProgress />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
