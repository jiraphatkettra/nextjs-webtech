import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/data/courses";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

// สร้าง Metadata ตามชื่อวิชา
export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((item) => item.id.toLowerCase() === id.toLowerCase());

  return {
    title: course ? `${course.name} | Course Hub` : "ไม่พบรายวิชา",
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = courses.find((item) => item.id.toLowerCase() === id.toLowerCase());

  // ถ้าไม่พบข้อมูล ให้แสดงหน้า 404
  if (!course) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link
        href="/courses"
        className="inline-block mb-6 text-xs text-blue-400 hover:underline"
      >
        ← กลับไปหน้ารายวิชาทั้งหมด
      </Link>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono text-sm bg-white/5 px-2.5 py-1 rounded text-gray-300">
            {course.code}
          </span>
          <span className="text-sm text-gray-400">{course.credit} หน่วยกิต</span>
        </div>

        <h1 className="text-2xl font-bold text-white">{course.name}</h1>

        <div className="pt-2 text-sm text-gray-300 space-y-2">
          <p>
            <span className="text-gray-400">อาจารย์ผู้สอน:</span> {course.instructor}
          </p>
          <p>
            <span className="text-gray-400">รหัสอ้างอิงระบบ:</span> {course.id}
          </p>
        </div>
      </div>
    </main>
  );
}
