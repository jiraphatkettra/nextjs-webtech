import type { Metadata } from "next";
import { initialGames } from "@/data/games";
import GameExplorer from "@/components/GameExplorer";

export const metadata: Metadata = {
  title: "Game Backlog | รายการเกม",
};

export default function GamesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:py-12">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Game Backlog
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          รายการบันทึกเกมที่ตั้งใจจะเล่น และสถานะความคืบหน้า
        </p>
      </div>

      <GameExplorer initialGames={initialGames} />
    </main>
  );
}
