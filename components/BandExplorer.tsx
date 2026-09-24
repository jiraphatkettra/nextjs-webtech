"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "@/app/brand/bands-data";
import BandCard from "@/components/BandCard";

type BandExplorerProps = {
  bands: Band[];
};

type SortOption = "default" | "name-asc" | "members";

export default function BandExplorer({ bands }: BandExplorerProps) {
  // 1. คำค้นหา
  const [keyword, setKeyword] = useState("");

  // 2. รายการ ID วงที่กดติดตาม
  const [followedIds, setFollowedIds] = useState<string[]>([]);

  // 3. ตัวกรองแสดงเฉพาะที่ติดตาม
  const [onlyFollowed, setOnlyFollowed] = useState(false);

  // 4. จำนวน Like ของแต่ละวง
  const [likes, setLikes] = useState<Record<string, number>>({});

  // 5. ตัวเลือกเรียงลำดับ
  const [sortBy, setSortBy] = useState<SortOption>("default");

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFollow(id: string) {
    setFollowedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((item) => item !== id)
        : [...prevIds, id]
    );
  }

  function handleLike(id: string) {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }

  function handleReset() {
    setKeyword("");
    setOnlyFollowed(false);
    setSortBy("default");
  }

  // คำนวณ visibleBands (Derived State)
  const searchText = keyword.trim().toLowerCase();
  const filteredBands = bands.filter((band) => {
    const matchesSearch =
      band.name.toLowerCase().includes(searchText) ||
      band.thaiName.toLowerCase().includes(searchText);

    const matchesFollow = onlyFollowed ? followedIds.includes(band.id) : true;

    return matchesSearch && matchesFollow;
  });

  const visibleBands = [...filteredBands].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "members") {
      return b.members.length - a.members.length;
    }
    return 0;
  });

  return (
    <div className="mt-6 space-y-6">
      {/* แถบค้นหาและตัวกรอง */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <input
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรี..."
          className="w-full sm:max-w-xs rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
        />

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* ปุ่มสลับดูเฉพาะที่ติดตาม */}
          <button
            type="button"
            onClick={() => setOnlyFollowed((prev) => !prev)}
            className={`rounded-lg border px-3 py-2 transition-colors cursor-pointer ${
              onlyFollowed
                ? "border-blue-500 bg-blue-600 text-white"
                : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {onlyFollowed ? "แสดงทั้งหมด" : "เฉพาะที่ติดตาม"}
          </button>

          {/* สถิติติดตาม */}
          <span className="text-gray-400">
            ติดตามแล้ว: <strong className="text-white">{followedIds.length}</strong> วง
          </span>

          {/* เรียงลำดับ */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-white/10 bg-[#161618] px-2.5 py-2 text-xs text-gray-300 outline-none"
          >
            <option value="default">เรียงตามปกติ</option>
            <option value="name-asc">ชื่อ (A-Z)</option>
            <option value="members">จำนวนสมาชิก</option>
          </select>

          {(keyword || onlyFollowed || sortBy !== "default") && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-blue-400 hover:underline cursor-pointer ml-1"
            >
              ล้างตัวกรอง
            </button>
          )}
        </div>
      </div>

      {/* รายการการ์ด */}
      {visibleBands.length === 0 ? (
        <div className="rounded-xl border border-white/10 p-8 text-center text-sm text-gray-400">
          ไม่พบวงดนตรีที่ค้นหา
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowed={followedIds.includes(band.id)}
              likeCount={likes[band.id] || 0}
              onToggleFollow={handleToggleFollow}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}
