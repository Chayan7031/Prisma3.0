import type { Metadata } from "next";
import { Rajdhani, Space_Grotesk, JetBrains_Mono, Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-tech",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-script",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif-italic",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PRISMA 3.0 | Departmental Magazine • CSE KGEC",
  description: "Official Departmental Magazine of Computer Science and Engineering, Kalyani Government Engineering College.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${caveat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050a12] text-[#f8fafc]">{children}</body>
    </html>
  );
}
