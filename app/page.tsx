import Link from "next/link";

// 1. ประกาศ Type สำหรับ Course
type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

export default function HomePage() {
  const siteName = "Student Course Hub";
  const description = "ศูนย์รวมและค้นหาข้อมูลรายวิชาสำหรับนักศึกษา";

  // 👉 2. เพิ่มข้อมูลรายวิชาตรงนี้ครับ (มีทั้งหมด 4 รายการ id ไม่ซ้ำกัน)
  const courses: Course[] = [
    { id: 1, code: "10301231", title: "Web Technology", credits: 3, isOpen: true },
    { id: 2, code: "10301232", title: "Database Systems", credits: 3, isOpen: false },
    { id: 3, code: "10301233", title: "Software Engineering", credits: 3, isOpen: true },
    { id: 4, code: "10301234", title: "Computer Networks", credits: 3, isOpen: true },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-20">
      {/* Apple Keynote Hero Section */}
      <section className="relative text-center flex flex-col items-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/[0.1] px-4 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-xl mb-6 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span>Next-Generation Course Discovery</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gradient-apple max-w-3xl leading-[1.1]">
          {siteName}
        </h1>
        <p className="mt-5 text-base sm:text-xl text-text-muted font-normal max-w-xl leading-relaxed">
          {description} — วางแผนการเรียนอย่างชาญฉลาด รวดเร็ว และแม่นยำ
        </p>

        {/* Apple CTA Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-accent/25 transition-all duration-200 hover:bg-accent-hover hover:scale-105 active:scale-95"
          >
            <span>สำรวจรายวิชาทั้งหมด</span>
            <span>→</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.1] px-6 py-3 text-sm font-medium text-text-primary backdrop-blur-md transition-all duration-200 hover:bg-white/[0.08] hover:border-white/[0.2]"
          >
            <span>เกี่ยวกับระบบ</span>
          </Link>
        </div>

        {/* Apple Tech Specs Strip (Bento Metrics) */}
        <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl">
          <div className="apple-card rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gradient-apple">4</div>
            <div className="text-[11px] sm:text-xs text-text-muted mt-1">รายวิชาในระบบ</div>
          </div>
          <div className="apple-card rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gradient-apple">12</div>
            <div className="text-[11px] sm:text-xs text-text-muted mt-1">หน่วยกิตรวม</div>
          </div>
          <div className="apple-card rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">75%</div>
            <div className="text-[11px] sm:text-xs text-text-muted mt-1">เปิดรับลงทะเบียน</div>
          </div>
        </div>
      </section>

      {/* Target Audience Bento Box */}
      <section className="mt-16 sm:mt-24">
        <div className="apple-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-accent">Audience & Purpose</span>
            <h2 className="mt-2 text-xl sm:text-2xl font-bold text-text-primary">กลุ่มผู้ใช้งานเป้าหมาย</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed max-w-2xl">
              ออกแบบมาเพื่อให้นักศึกษาเข้าถึงข้อมูลหลักสูตรได้อย่างราบรื่น ตรวจสอบสถานะการเปิดรับได้ทันทีแบบเรียลไทม์
              พร้อมระบบคัดกรองรายวิชาโปรดที่จะช่วยให้การจัดตารางเรียนในแต่ละเทอมสะดวกและมีประสิทธิภาพสูงสุด
            </p>
          </div>
        </div>
      </section>

      {/* 👉 3. นำ courses มาวนลูปแสดงผลด้วย map() (Apple Bento Grid) */}
      <section className="mt-12 sm:mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
            รายวิชาแนะนำ (Featured Courses)
          </h2>
          <Link
            href="/courses"
            className="text-xs font-medium text-accent hover:text-accent-hover transition-colors"
          >
            ดูทั้งหมด →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.id}
              className="apple-card group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-white/[0.06] border border-white/[0.08] px-2.5 py-0.5 text-[11px] font-mono text-text-secondary">
                    {course.code}
                  </span>

                  {course.isOpen ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#30d158]" />
                      เปิดให้ลงทะเบียน
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[11px] font-medium text-rose-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                      ปิดการลงทะเบียน
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight text-text-primary group-hover:text-white transition-colors duration-200">
                  {course.title}
                </h3>
                <p className="mt-1.5 text-xs text-text-muted">
                  หน่วยกิต: <span className="text-text-secondary font-medium">{course.credits}</span> หน่วยกิต
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-text-muted">
                <span>ภาคการศึกษา 1/2569</span>
                <span className="text-accent group-hover:translate-x-0.5 transition-transform">รายละเอียด →</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
