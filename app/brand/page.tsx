import type { Metadata } from "next";
import { bands } from "./bands-data";
import BandExplorer from "@/components/BandExplorer";

export const metadata: Metadata = {
  title: "Favorites Bands | วงดนตรีวงโปรด",
};

export default function BrandPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:py-12">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Favorites Bands
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          ค้นหาและกดติดตามวงดนตรีวงโปรด พร้อมดูรายชื่อสมาชิกในวง
        </p>
      </div>

      <BandExplorer bands={bands} />
    </main>
  );
}
