import Link from "next/link";
import type { Course } from "@/types/course";

// Props สำหรับ CourseCard: รับข้อมูลวิชา และฟังก์ชัน callback สำหรับแก้ไข/ลบ
type CourseCardProps = {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-colors">
      <div>
        {/* รหัสวิชา และ หน่วยกิต */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="font-mono bg-white/5 px-2 py-0.5 rounded">
            {course.code}
          </span>
          <span>{course.credit} หน่วยกิต</span>
        </div>

        {/* ชื่อวิชา ลิงก์ไปยังหน้ารายละเอียด Dynamic Route */}
        <h3 className="mt-3 text-base font-semibold text-white">
          <Link
            href={`/courses/${course.id}`}
            className="hover:text-blue-400 transition-colors"
          >
            {course.name}
          </Link>
        </h3>

        {/* ผู้สอน */}
        <p className="mt-2 text-xs text-gray-400">
          ผู้สอน: <span className="text-gray-200">{course.instructor}</span>
        </p>
      </div>

      {/* ปุ่มแก้ไข และ ปุ่มลบ */}
      <div className="mt-5 pt-3 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 rounded-lg border border-amber-500/30 bg-amber-500/10 py-1.5 text-xs text-amber-300 hover:bg-amber-500/20 cursor-pointer"
          >
            แก้ไข
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex-1 rounded-lg border border-red-500/30 bg-red-500/10 py-1.5 text-xs text-red-300 hover:bg-red-500/20 cursor-pointer"
          >
            ลบ
          </button>
        </div>

        <Link
          href={`/courses/${course.id}`}
          className="block text-center rounded-lg border border-white/10 bg-white/5 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/10"
        >
          ดูรายละเอียดวิชา
        </Link>
      </div>
    </article>
  );
}
