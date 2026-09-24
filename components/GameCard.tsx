import Link from "next/link";
import type { Game, GameStatus } from "@/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (newStatus: GameStatus) => void;
};

// ป้ายกำกับภาษาไทยสำหรับแต่ละสถานะ
const STATUS_LABELS: Record<GameStatus, string> = {
  not_started: "ยังไม่เริ่ม",
  playing: "กำลังเล่น",
  completed: "เล่นจบแล้ว",
};

export default function GameCard({
  game,
  onEdit,
  onDelete,
  onStatusChange,
}: GameCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-colors">
      <div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="font-mono bg-white/5 px-2 py-0.5 rounded">
            {game.platform}
          </span>
          <span
            className={
              game.status === "completed"
                ? "text-emerald-400"
                : game.status === "playing"
                ? "text-amber-400"
                : "text-gray-400"
            }
          >
            {STATUS_LABELS[game.status]}
          </span>
        </div>

        <h3 className="mt-3 text-base font-semibold text-white">
          <Link
            href={`/games/${game.id}`}
            className="hover:text-blue-400 transition-colors"
          >
            {game.title}
          </Link>
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          เวลาเล่น: <span className="text-gray-200">{game.estimatedHours} ชั่วโมง</span>
        </p>

        {game.description && (
          <p className="mt-2 text-xs text-gray-400 line-clamp-2">
            {game.description}
          </p>
        )}
      </div>

      <div className="mt-5 pt-3 border-t border-white/10 space-y-2">
        {/* เปลี่ยนสถานะด่วน (ส่วนขยาย 1) */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>เปลี่ยนสถานะ:</span>
          <select
            value={game.status}
            onChange={(e) => onStatusChange(e.target.value as GameStatus)}
            className="rounded border border-white/10 bg-[#161618] px-2 py-1 text-xs text-gray-200 outline-none"
          >
            <option value="not_started">ยังไม่เริ่ม</option>
            <option value="playing">กำลังเล่น</option>
            <option value="completed">เล่นจบแล้ว</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 rounded-lg border border-amber-500/30 bg-amber-500/10 py-1.5 text-xs text-amber-300 hover:bg-amber-500/20 cursor-pointer"
          >
            แก้ไข
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex-1 rounded-lg border border-red-500/30 bg-red-500/10 py-1.5 text-xs text-red-300 hover:bg-red-500/20 cursor-pointer"
          >
            ลบ
          </button>
        </div>

        <Link
          href={`/games/${game.id}`}
          className="block text-center rounded-lg border border-white/10 bg-white/5 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/10"
        >
          ดูรายละเอียดเกม
        </Link>
      </div>
    </article>
  );
}
