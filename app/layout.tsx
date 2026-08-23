import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    <html lang="th">
      <body>
        <header className="siteHeader">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
