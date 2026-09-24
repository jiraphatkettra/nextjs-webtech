"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import CourseForm, { type CourseDraft } from "@/components/CourseForm";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({ initialCourses }: CourseExplorerProps) {
  // State เก็บรายการวิชาทั้งหมด
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  // State คำค้นหา
  const [keyword, setKeyword] = useState("");

  // State เก็บ id ของวิชาที่กำลังแก้ไข (ถ้าเป็น null คือโหมดเพิ่มใหม่)
  const [editingId, setEditingId] = useState<string | null>(null);

  // เมื่อผู้ใช้พิมพ์ในช่องค้นหา
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  // เพิ่มวิชาใหม่ (Create)
  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };

    setCourses((prev) => [...prev, newCourse]);
  }

  // ลบวิชา (Delete)
  function handleDelete(id: string) {
    setCourses((prev) => prev.filter((course) => course.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  }

  // แก้ไขวิชา (Update)
  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course
      )
    );
    setEditingId(null);
  }

  // ฟังก์ชันรวมการบันทึก: ถ้า editingId เป็น null ให้เพิ่ม ถ้ามีค่าให้แก้ไข
  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  // ค้นหาวิชาที่กำลังแก้ไข
  const editingCourse = courses.find((course) => course.id === editingId);

  // กรองรายวิชาตามคำค้นหา (Derived State)
  const searchText = keyword.trim().toLowerCase();
  const visibleCourses = courses.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText) ||
      course.instructor.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="mt-6 space-y-6">
      {/* ฟอร์มเพิ่ม/แก้ไขวิชา */}
      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {/* แถบค้นหาและสถิติ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
        <input
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชา รหัสวิชา หรือผู้สอน..."
          className="w-full sm:max-w-xs rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
        />

        <div className="text-xs text-gray-400">
          แสดง {visibleCourses.length} จากทั้งหมด {courses.length} รายวิชา
        </div>
      </div>

      {/* รายการวิชา */}
      {visibleCourses.length === 0 ? (
        <div className="rounded-xl border border-white/10 p-8 text-center text-sm text-gray-400">
          ไม่พบรายวิชาที่ค้นหา
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => {
                setEditingId(course.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
