import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Student Course Hub",
  description: "ระบบรวบรวมข้อมูลรายวิชาสำหรับนักศึกษา",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark selection:bg-accent/30 selection:text-white">
      <body
        className={`${prompt.className} bg-surface text-text-primary min-h-screen antialiased relative overflow-x-hidden`}
      >
        {/* Apple Keynote Ambient Background Glow */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {/* Top-center soft blue spotlight */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-accent/15 via-accent/5 to-transparent blur-[140px] opacity-70" />
          {/* Subtle bottom-right aura */}
          <div className="absolute top-[600px] -right-40 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-favorite/10 to-transparent blur-[120px] opacity-40" />
        </div>

        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/60 backdrop-blur-2xl transition-all duration-300">
          <Navbar />
        </header>

        <div className="min-h-[calc(100vh-140px)]">
          {children}
        </div>

        <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-text-muted">
          <p>© 2026 Student Course Hub. Built with Next.js & React 19.</p>
        </footer>
      </body>
    </html>
  );
}
