// Type สำหรับโจทย์ประยุกต์ Game Backlog
export type GameStatus = "not_started" | "playing" | "completed";

export type Game = {
  id: string;
  title: string;
  platform: string;
  estimatedHours: number;
  status: GameStatus;
  description?: string;
};
