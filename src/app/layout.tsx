import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExperienceMatch.ai",
  description: "KI-gestütztes Matching für die nächste Generation von Fachkräften im DACH-Raum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSerif.variable} ${inter.variable} antialiased bg-[#0a0c0a] text-[#e0e5e0] font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
