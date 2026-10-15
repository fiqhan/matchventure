import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MatchVenture",
  description: "Jelajah Bangun Datar dan Bangun Ruang",
  icons: {
    icon: "@/favicon.png",
    apple: "@/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Navbar Global */}
        <Navbar />
        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer Global */}
        <Footer />
      </body>
    </html>
  );
}
