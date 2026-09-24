# 🎸 สรุปคู่มือและบันทึกการทำงาน: Favorite Bands (วงดนตรีวงโปรด)

> **ปรับปรุงล่าสุดเมื่อ:** วันพุธที่ 23 กันยายน 2026  
> **ไฟล์เป้าหมาย:** `components/BandExplorer.tsx`, `components/BandCard.tsx`, และ `app/brand/page.tsx`

---

## 📌 1. ความคืบหน้าปัจจุบัน (Current Status)

✅ **ทำเสร็จสมบูรณ์ 100% ตามข้อกำหนดในใบงานท้ายเล่มและส่วนขยาย:**
1. **สร้าง `components/BandCard.tsx` (Child Component)**:
   - รับ Props: `band: Band`, `isFollowed: boolean`, `likeCount: number`
   - Callback Props: `onToggleFollow: (id: string) => void`, `onLike: (id: string) => void`
   - รองรับ accessibility (`aria-pressed`), ป้องกัน form submit (`type="button"`)
   - แสดงปุ่มติดตาม, ปุ่ม Like พร้อมจำนวน, จำนวนสมาชิก และลิงก์ดูรายละเอียด
2. **สร้าง `components/BandExplorer.tsx` (Parent Client Component)**:
   - โครงสร้าง 6 ส่วนตามแบบเรียน Next.js App Router:
     1. `import` และ `"use client"`
     2. `BandExplorerProps = { bands: Band[] }`
     3. State: `keyword` (Controlled Input), `followedIds` (Lifting State Up), `onlyFollowed`, `likes`, `sortBy`
     4. Handlers: `handleKeywordChange`, `handleToggleFollow`, `handleLike`, `handleReset`, `handleSortBy`
     5. Derived State: `searchText`, `visibleBands` (กรองและเรียงลำดับสด)
     6. JSX: แถบค้นหา, ปุ่มกรอง, ปุ่มเรียงลำดับ, ตัวนับติดตาม, Empty State, Grid แสดง `BandCard`
3. **เชื่อมโยงใน `app/brand/page.tsx` (Server Component)**:
   - นำเข้า `BandExplorer` และส่งต่อ `bands` เข้าไปผ่าน Props
   - กำหนด `metadata` ตามมาตรฐาน Next.js

---

## 🎯 2. สรุปข้อสอบ / แนวทางการตอบคำถามอาจารย์

1. **ทำไม `band.id` ถึงใช้ `string[]` ไม่ใช่ `number[]` แบบรายวิชา?**
   - เพราะใน `bands-data.ts` กำหนด `id` ของวงเป็น string เช่น `"threemandown"`, `"cocktail"` ต่างจาก `course.id` ที่เป็นตัวเลข

2. **ทำไมต้องใช้ Lifting State Up สำหรับ `followedIds`?**
   - เพราะตัวนับจำนวนวงที่ติดตาม (`followedIds.length`) อยู่ด้านบน (Parent) แต่ปุ่มคลิกติดตามอยู่ด้านล่างในการ์ดแต่ละใบ (Child) จึงต้องเก็บ State ไว้ที่ Parent แล้วส่ง Callback function ลงไป

3. **ทำไม `visibleBands` และ `followedIds.length` ไม่ต้องใช้ `useState`?**
   - เป็น **Derived State** (ข้อมูลที่คำนวณสดได้จากข้อมูลที่มีอยู่แล้ว) ช่วยป้องกันข้อมูลไม่ตรงกัน (Out-of-sync) และลดความซ้ำซ้อนของ State ตาม Best Practice ของ React

4. **ทำไมต้องใช้ `setFollowedIds(prev => ...)` (Updater Function)?**
   - เพื่อให้อ้างอิงค่า State ก่อนหน้าได้อย่างแม่นยำ ป้องกันปัญหาข้อมูลหายเมื่อผู้ใช้กดคลิกปุ่มอย่างรวดเร็ว

5. **ทำไม `BandCard.tsx` ไม่ต้องใส่ `"use client"`?**
   - เพราะถูก import เข้ามาใน `BandExplorer.tsx` ซึ่งมี `"use client"` อยู่แล้ว จึงกลายเป็น Client Component โดยอัตโนมัติตาม App Router Boundary
