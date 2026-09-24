import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initialGames } from "@/data/games";

type GameDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: GameDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const game = initialGames.find((g) => g.id.toLowerCase() === id.toLowerCase());

  return {
    title: game ? `${game.title} | Game Backlog` : "ไม่พบเกม",
  };
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { id } = await params;
  const game = initialGames.find((g) => g.id.toLowerCase() === id.toLowerCase());

  if (!game) {
    notFound();
  }

  const statusLabel =
    game.status === "completed"
      ? "เล่นจบแล้ว"
      : game.status === "playing"
      ? "กำลังเล่น"
      : "ยังไม่เริ่ม";

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link
        href="/games"
        className="inline-block mb-6 text-xs text-blue-400 hover:underline"
      >
        ← กลับไปหน้า Game Backlog
      </Link>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono text-sm bg-white/5 px-2.5 py-1 rounded text-gray-300">
            {game.platform}
          </span>
          <span className="text-sm text-gray-300">{statusLabel}</span>
        </div>

        <h1 className="text-2xl font-bold text-white">{game.title}</h1>

        <div className="pt-2 text-sm text-gray-300 space-y-2">
          <p>
            <span className="text-gray-400">เวลาเล่นโดยประมาณ:</span> {game.estimatedHours} ชั่วโมง
          </p>
          {game.description && (
            <p>
              <span className="text-gray-400">รายละเอียด:</span> {game.description}
            </p>
          )}
          <p>
            <span className="text-gray-400">รหัสเกม:</span> {game.id}
          </p>
        </div>
      </div>
    </main>
  );
}
