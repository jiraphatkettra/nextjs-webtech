"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Game, GameStatus } from "@/types/game";

export type GameDraft = {
  title: string;
  platform: string;
  estimatedHours: string;
  status: GameStatus;
  description: string;
};

const emptyGameDraft: GameDraft = {
  title: "",
  platform: "",
  estimatedHours: "",
  status: "not_started",
  description: "",
};

type GameFormErrors = Partial<Record<keyof GameDraft, string>>;

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

const PLATFORMS = [
  "PC",
  "PlayStation 5",
  "Nintendo Switch",
  "Xbox Series X/S",
  "มือถือ (iOS/Android)",
];

function toGameDraft(game?: Game): GameDraft {
  if (!game) return emptyGameDraft;
  return {
    title: game.title,
    platform: game.platform,
    estimatedHours: String(game.estimatedHours),
    status: game.status,
    description: game.description || "",
  };
}

export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toGameDraft(initialGame));
  const [errors, setErrors] = useState<GameFormErrors>({});

  // ตรวจสอบความถูกต้องของข้อมูล
  function validate(value: GameDraft): GameFormErrors {
    const nextErrors: GameFormErrors = {};

    if (value.title.trim() === "") {
      nextErrors.title = "กรุณาระบุชื่อเกม";
    }

    if (value.platform.trim() === "") {
      nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
    }

    const hours = Number(value.estimatedHours);
    if (!Number.isInteger(hours) || hours <= 0) {
      nextErrors.estimatedHours = "เวลาเล่นต้องเป็นจำนวนเต็มบวก (มากกว่า 0)";
    }

    return nextErrors;
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof GameDraft]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyGameDraft);
    setErrors({});
  }

  const isEditing = Boolean(initialGame);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
        <h2 className="text-base font-semibold text-white">
          {isEditing ? `แก้ไขเกม (${initialGame?.title})` : "เพิ่มเกมใน Backlog"}
        </h2>
        {isEditing && (
          <span className="text-xs text-amber-400">กำลังแก้ไขข้อมูล</span>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* ชื่อเกม */}
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-xs font-medium text-gray-300 mb-1">
              ชื่อเกม
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={draft.title}
              onChange={handleChange}
              placeholder="เช่น Elden Ring"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-400">{errors.title}</p>
            )}
          </div>

          {/* แพลตฟอร์ม */}
          <div>
            <label htmlFor="platform" className="block text-xs font-medium text-gray-300 mb-1">
              แพลตฟอร์ม
            </label>
            <select
              id="platform"
              name="platform"
              value={draft.platform}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-[#161618] px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="">-- เลือกแพลตฟอร์ม --</option>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.platform && (
              <p className="mt-1 text-xs text-red-400">{errors.platform}</p>
            )}
          </div>

          {/* เวลาเล่นโดยประมาณ */}
          <div>
            <label htmlFor="estimatedHours" className="block text-xs font-medium text-gray-300 mb-1">
              เวลาเล่นโดยประมาณ (ชั่วโมง)
            </label>
            <input
              id="estimatedHours"
              name="estimatedHours"
              type="number"
              min="1"
              value={draft.estimatedHours}
              onChange={handleChange}
              placeholder="เช่น 50"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
            />
            {errors.estimatedHours && (
              <p className="mt-1 text-xs text-red-400">{errors.estimatedHours}</p>
            )}
          </div>

          {/* สถานะ */}
          <div>
            <label htmlFor="status" className="block text-xs font-medium text-gray-300 mb-1">
              สถานะ
            </label>
            <select
              id="status"
              name="status"
              value={draft.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-[#161618] px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="not_started">ยังไม่เริ่ม</option>
              <option value="playing">กำลังเล่น</option>
              <option value="completed">เล่นจบแล้ว</option>
            </select>
          </div>

          {/* คำอธิบาย */}
          <div>
            <label htmlFor="description" className="block text-xs font-medium text-gray-300 mb-1">
              บันทึกสั้นๆ (ถ้ามี)
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={draft.description}
              onChange={handleChange}
              placeholder="เช่น เล่นจบเนื้อเรื่องหลักแล้ว"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer"
          >
            {isEditing ? "บันทึกการแก้ไข" : "เพิ่มเกม"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 hover:bg-white/10 cursor-pointer"
            >
              ยกเลิก
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
