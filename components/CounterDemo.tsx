// ============================================================================
// 📘 ใบงานปฏิบัติรายวิชา 10301231 เว็บเทคโนโลยี: State, Events และ Component Communication
// ไฟล์: src/components/CounterDemo.tsx (Client Component สำหรับการทดลองในส่วนที่ 2)
// ============================================================================
// 🎯 วัตถุประสงค์ของไฟล์นี้:
// 1. [ใบงาน ส่วนที่ 2.1] เปรียบเทียบตัวแปรธรรมดา (let count = 0) กับการใช้ React State (useState)
//    - ตัวแปรธรรมดา: เมื่อค่าเปลี่ยน React จะไม่รู้ จึงไม่มีการ Re-render และตัวเลขบนจอไม่เปลี่ยน
//    - useState: เมื่อเรียก setCount React จะรับรู้และ Re-render หน้าจอให้อัตโนมัติ
// 2. [ใบงาน ส่วนที่ 2.3] การอัปเดต State ที่อ้างอิงค่าเดิม:
//    - แบบที่ 1: setCount(count + 1) หลายครั้งในรอบเดียว จะได้ค่าเพิ่มขึ้นเพียง 1 เพราะค่า count ใน closure ยังคงเดิม
//    - แบบที่ 2: setCount((prevCount) => prevCount + 1) ใช้ Updater Function ทำให้ได้ค่าที่อัปเดตต่อเนื่องจริง
//
// 💡 [แนวทางการตอบอาจารย์เมื่อถูกถามเกี่ยวกับไฟล์นี้]:
// - ถาม: "ทำไม onClick={handleClick} ถึงไม่มีวงเล็บเปิด-ปิดต่อท้าย?"
//   ตอบ: เพราะเราต้องการ 'ส่งการอ้างอิงฟังก์ชัน' (Function Reference) ให้ปุ่มเก็บไว้เรียกใช้เมื่อเกิดเหตุการณ์คลิก
//         หากใส่ handleClick() จะเป็นการสั่งให้ฟังก์ชันทำงานทันทีตั้งแต่ตอน Render ซึ่งไม่ถูกต้อง
// ============================================================================

"use client"; // ต้องใส่ use client เพราะมีการใช้ React Hooks (useState) และ Event Handler (onClick)

import { useState } from "react";

export default function CounterDemo() {
  // [ใบงาน ส่วนที่ 2.2] สร้าง State count ค่าเริ่มต้นเป็น 0 (TypeScript อนุมาน Type เป็น number)
  const [count, setCount] = useState(0);

  // ฟังก์ชัน Event Handler ที่ทำงานเมื่อปุ่มถูกคลิก
  function handleClick() {
    // อัปเดต State โดยสั่งให้ setCount เพิ่มค่าขึ้น 1 เพื่อกระตุ้นให้ React Re-render
    setCount(count + 1);
  }

  return (
    <button
      type="button"
      onClick={handleClick} // ส่งฟังก์ชันไปโดยไม่ใส่วงเล็บ เพื่อให้ทำงานเมื่อเกิดเหตุการณ์คลิกเท่านั้น
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-card px-4 py-2 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent-subtle cursor-pointer"
    >
      คลิกแล้ว <span className="text-accent font-semibold">{count}</span> ครั้ง
    </button>
  );
}
