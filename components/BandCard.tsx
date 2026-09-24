import Link from "next/link";
import type { Band } from "@/app/brand/bands-data";

type BandCardProps = {
  band: Band;
  isFollowed: boolean;
  likeCount: number;
  onToggleFollow: (id: string) => void;
  onLike: (id: string) => void;
};

export default function BandCard({
  band,
  isFollowed,
  likeCount,
  onToggleFollow,
  onLike,
}: BandCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-colors">
      <div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="font-mono text-gray-300">Band Profile</span>
          <span>{band.members.length} สมาชิก</span>
        </div>

        <h2 className="mt-3 text-lg font-bold text-white">
          {band.name} <span className="text-sm font-normal text-gray-400">({band.thaiName})</span>
        </h2>

        <p className="mt-2 text-xs text-gray-400 leading-relaxed line-clamp-3">
          {band.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          {/* ปุ่มติดตาม */}
          <button
            type="button"
            onClick={() => onToggleFollow(band.id)}
            className={`flex-1 rounded-lg py-1.5 px-3 text-xs font-medium cursor-pointer ${
              isFollowed
                ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {isFollowed ? "ติดตามแล้ว" : "ติดตาม"}
          </button>

          {/* ปุ่ม Like */}
          <button
            type="button"
            onClick={() => onLike(band.id)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 cursor-pointer"
          >
            ถูกใจ ({likeCount})
          </button>
        </div>

        <Link
          href={`/brand/${band.id}`}
          className="block text-center rounded-lg border border-white/10 bg-white/5 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/10"
        >
          ดูสมาชิกในวง
        </Link>
      </div>
    </article>
  );
}
