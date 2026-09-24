"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/courses", label: "รายวิชา" },
    { href: "/games", label: "เกม" },
    { href: "/brand", label: "วงดนตรี" },
    { href: "/about", label: "เกี่ยวกับ" },
  ];

  return (
    <nav
      className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 border-b border-white/10"
      aria-label="เมนูหลัก"
    >
      <Link
        href="/"
        className="text-sm font-semibold text-white tracking-tight hover:opacity-80"
      >
        CourseHub
      </Link>

      <ul className="flex items-center gap-1.5 sm:gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
