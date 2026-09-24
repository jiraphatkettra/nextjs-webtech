"use client";

import { useState, type ChangeEvent } from "react";
import type { Game, GameStatus } from "@/types/game";
import GameCard from "@/components/GameCard";
import GameForm, { type GameDraft } from "@/components/GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  // State รายการเกมทั้งหมด
  const [games, setGames] = useState<Game[]>(initialGames);

  // State คำค้นหา
  const [keyword, setKeyword] = useState("");

  // State ตัวกรองสถานะ
  const [statusFilter, setStatusFilter] = useState<"all" | GameStatus>("all");

  // State เก็บ id ของเกมที่กำลังแก้ไข
  const [editingId, setEditingId] = useState<string | null>(null);

  // State เก็บ id ของเกมที่กำลังยืนยันการลบ
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  // เพิ่มเกมใหม่ (Create)
  function handleCreate(draft: GameDraft) {
    const newGame: Game = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      platform: draft.platform.trim(),
      estimatedHours: Number(draft.estimatedHours),
      status: draft.status,
      description: draft.description.trim() || undefined,
    };

    setGames((prev) => [...prev, newGame]);
  }

  // ยืนยันการลบเกม (Delete)
  function handleConfirmDelete() {
    if (!deletingId) return;
    setGames((prev) => prev.filter((g) => g.id !== deletingId));
    if (editingId === deletingId) setEditingId(null);
    setDeletingId(null);
  }

  // แก้ไขเกม (Update)
  function handleUpdate(id: string, draft: GameDraft) {
    setGames((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              title: draft.title.trim(),
              platform: draft.platform.trim(),
              estimatedHours: Number(draft.estimatedHours),
              status: draft.status,
              description: draft.description.trim() || undefined,
            }
          : g
      )
    );
    setEditingId(null);
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  // เปลี่ยนสถานะด่วนจากการ์ด (ส่วนขยาย 1)
  function handleStatusChange(id: string, newStatus: GameStatus) {
    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
    );
  }

  const editingGame = games.find((g) => g.id === editingId);
  const deletingGame = games.find((g) => g.id === deletingId);

  // คำนวณชั่วโมงรวมของเกมที่ยังไม่เริ่ม (ส่วนขยาย 2: Derived State)
  const unstartedHours = games
    .filter((g) => g.status === "not_started")
    .reduce((sum, g) => sum + g.estimatedHours, 0);

  // กรองตามคำค้นหาและสถานะ (ส่วนขยาย 3)
  const searchText = keyword.trim().toLowerCase();
  const visibleGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchText) ||
      game.platform.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ? true : game.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mt-6 space-y-6">
      {/* ฟอร์มเพิ่ม/แก้ไขเกม */}
      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {/* แถบสถิติและตัวกรอง */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
        <input
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อเกม หรือแพลตฟอร์ม..."
          className="w-full sm:max-w-xs rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
        />

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | GameStatus)}
            className="rounded-lg border border-white/10 bg-[#161618] px-3 py-2 text-xs text-gray-200 outline-none"
          >
            <option value="all">สถานะทั้งหมด</option>
            <option value="not_started">ยังไม่เริ่ม</option>
            <option value="playing">กำลังเล่น</option>
            <option value="completed">เล่นจบแล้ว</option>
          </select>

          <span className="text-gray-400">
            ชั่วโมงที่ยังไม่เริ่ม: <strong className="text-white">{unstartedHours}</strong> ชม.
          </span>
        </div>
      </div>

      {/* รายการเกม */}
      {visibleGames.length === 0 ? (
        <div className="rounded-xl border border-white/10 p-8 text-center text-sm text-gray-400">
          ไม่พบเกมในรายการ
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={() => {
                setEditingId(game.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={() => setDeletingId(game.id)}
              onStatusChange={(status) => handleStatusChange(game.id, status)}
            />
          ))}
        </div>
      )}

      {/* กล่องยืนยันก่อนลบ (ส่วนขยาย 4) */}
      {deletingGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#1c1c1e] p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">ยืนยันการลบเกม</h3>
            <p className="text-xs text-gray-300">
              คุณต้องการลบเกม &ldquo;{deletingGame.title}&rdquo; ใช่หรือไม่?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/5 cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-500 cursor-pointer"
              >
                ลบรายการ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
