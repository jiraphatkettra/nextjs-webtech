import type { Metadata } from "next";
import { courses } from "@/data/courses";
import CourseExplorer from "@/components/CourseExplorer";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด | Course Hub",
};

export default function CoursesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:py-12">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          รายวิชาทั้งหมด
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          ระบบจัดการรายวิชาสำหรับนักศึกษา (เพิ่ม ลบ แก้ไข และค้นหาข้อมูล)
        </p>
      </div>

      <CourseExplorer initialCourses={courses} />
    </main>
  );
}
