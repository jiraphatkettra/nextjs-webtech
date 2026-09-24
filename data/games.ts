import type { Game } from "@/types/game";

// ข้อมูลจำลองเกมเริ่มต้น
export const initialGames: Game[] = [
  {
    id: "elden-ring",
    title: "Elden Ring",
    platform: "PC",
    estimatedHours: 120,
    status: "playing",
    description: "เกมแนว Action RPG ผจญภัยสำรวจโลกกว้าง",
  },
  {
    id: "zelda-totk",
    title: "Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    estimatedHours: 85,
    status: "completed",
    description: "เกมผจญภัยในดินแดนไฮรูล",
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    platform: "PlayStation 5",
    estimatedHours: 55,
    status: "not_started",
    description: "เกมแนวไซเบอร์พังก์ในเมืองไนท์ซิตี้",
  },
  {
    id: "black-myth-wukong",
    title: "Black Myth: Wukong",
    platform: "PC",
    estimatedHours: 45,
    status: "playing",
    description: "เกมแอ็กชันผจญภัยตามวรรณกรรมไซอิ๋ว",
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    platform: "PC",
    estimatedHours: 100,
    status: "not_started",
    description: "เกม RPG สวมบทบาทและวางแผนการต่อสู้",
  },
];
