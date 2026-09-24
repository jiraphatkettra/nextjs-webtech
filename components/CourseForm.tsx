"use client";

// นำเข้า React Hooks และ Type ของข้อมูล
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Course } from "@/types/course";

// Type สำหรับข้อมูลระหว่างที่ผู้ใช้กำลังกรอกในฟอร์ม (ทุกฟิลด์เป็นข้อความ)
export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

// ค่าเริ่มต้นของฟอร์ม (ฟอร์มว่าง)
const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

// Type สำหรับเก็บข้อความแจ้งเตือนข้อผิดพลาด
type FormErrors = Partial<Record<keyof CourseDraft, string>>;

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

// แปลงข้อมูล Course เป็น CourseDraft เมื่อต้องการแก้ไข
function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }
  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  // State สำหรับเก็บข้อมูลในฟอร์ม
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));

  // State สำหรับเก็บข้อความ error
  const [errors, setErrors] = useState<FormErrors>({});

  // ฟังก์ชันตรวจสอบความถูกต้องของข้อมูล
  function validate(value: CourseDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.code.trim() === "") {
      nextErrors.code = "กรุณาระบุรหัสวิชา";
    }

    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อวิชา";
    }

    const creditNum = Number(value.credit);
    if (!Number.isInteger(creditNum) || creditNum < 1 || creditNum > 6) {
      nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
    }

    if (value.instructor.trim() === "") {
      nextErrors.instructor = "กรุณาระบุชื่ออาจารย์ผู้สอน";
    }

    return nextErrors;
  }

  // ฟังก์ชัน handleChange ฟังก์ชันเดียวรองรับทุกช่องด้วย [name]: value
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ถ้าเริ่มพิมพ์ ให้ล้าง error ของช่องนั้น
    if (errors[name as keyof CourseDraft]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }

  // ฟังก์ชันเมื่อกดส่งฟอร์ม
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // ป้องกันหน้าเว็บ reload

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    // ถ้ามี error ให้หยุด ไม่ส่งข้อมูล
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // ส่งข้อมูลกลับไปให้ Parent บันทึก
    onSave(draft);

    // ล้างค่าในฟอร์ม
    setDraft(emptyDraft);
    setErrors({});
  }

  const isEditing = Boolean(initialCourse);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
        <h2 className="text-base font-semibold text-white">
          {isEditing ? `แก้ไขรายวิชา (${initialCourse?.code})` : "เพิ่มรายวิชาใหม่"}
        </h2>
        {isEditing && (
          <span className="text-xs text-amber-400">กำลังแก้ไขข้อมูล</span>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* ช่องรหัสวิชา */}
          <div>
            <label htmlFor="code" className="block text-xs font-medium text-gray-300 mb-1">
              รหัสวิชา
            </label>
            <input
              id="code"
              name="code"
              type="text"
              value={draft.code}
              onChange={handleChange}
              placeholder="เช่น CS101"
              aria-invalid={!!errors.code}
              aria-describedby={errors.code ? "code-error" : undefined}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
            />
            {errors.code && (
              <p id="code-error" className="mt-1 text-xs text-red-400">
                {errors.code}
              </p>
            )}
          </div>

          {/* ช่องหน่วยกิต */}
          <div>
            <label htmlFor="credit" className="block text-xs font-medium text-gray-300 mb-1">
              หน่วยกิต (1-6)
            </label>
            <input
              id="credit"
              name="credit"
              type="number"
              inputMode="numeric"
              min="1"
              max="6"
              value={draft.credit}
              onChange={handleChange}
              placeholder="เช่น 3"
              aria-invalid={!!errors.credit}
              aria-describedby={errors.credit ? "credit-error" : undefined}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
            />
            {errors.credit && (
              <p id="credit-error" className="mt-1 text-xs text-red-400">
                {errors.credit}
              </p>
            )}
          </div>
        </div>

        {/* ช่องชื่อวิชา */}
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1">
            ชื่อวิชา
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={draft.name}
            onChange={handleChange}
            placeholder="เช่น Data Structures and Algorithms"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        {/* ช่องชื่อผู้สอน */}
        <div>
          <label htmlFor="instructor" className="block text-xs font-medium text-gray-300 mb-1">
            อาจารย์ผู้สอน
          </label>
          <input
            id="instructor"
            name="instructor"
            type="text"
            value={draft.instructor}
            onChange={handleChange}
            placeholder="เช่น อาจารย์ประจำวิชา"
            aria-invalid={!!errors.instructor}
            aria-describedby={errors.instructor ? "instructor-error" : undefined}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
          />
          {errors.instructor && (
            <p id="instructor-error" className="mt-1 text-xs text-red-400">
              {errors.instructor}
            </p>
          )}
        </div>

        {/* ปุ่มบันทึก และ ปุ่มยกเลิก */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer"
          >
            {isEditing ? "บันทึกการแก้ไข" : "บันทึกข้อมูล"}
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
