import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "StudioSpace | Find Your Creative Space",
    template: "%s | StudioSpace",
  },

  description:
    "Discover and book photography studios, film stages, podcast lounges, music suites and creative spaces with StudioSpace.",

  keywords: [
    "Studio rental",
    "Photography studio",
    "Film studio",
    "Podcast studio",
    "Creative space",
    "StudioSpace",
  ],

  openGraph: {
    title: "StudioSpace | Find Your Creative Space",
    description:
      "Find inspiring creative spaces and bring your next project to life.",
    siteName: "StudioSpace",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <ThemeProvider>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}