export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-16">
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] px-3 py-1 text-[11px] font-mono text-accent mb-3">
          <span>About CourseHub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient-apple">
          เกี่ยวกับเรา
        </h1>
        <p className="mt-3 text-base text-text-muted leading-relaxed max-w-2xl">
          Student Course Hub มุ่งมั่นที่จะสร้างประสบการณ์การวางแผนการศึกษาที่สะดวก ลื่นไหล
          และแม่นยำที่สุดสำหรับนักศึกษาทุกคน
        </p>
      </div>

      {/* Bento Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="apple-card rounded-3xl p-6 sm:p-8">
          <div className="h-10 w-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-text-primary">วัตถุประสงค์ของระบบ</h2>
          <ul className="mt-4 space-y-3 text-sm text-text-muted">
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span>รวบรวมข้อมูลรายวิชาที่เปิดสอนให้ค้นหาง่ายและครบถ้วน</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
              <span>แสดงสถานะการเปิดรับลงทะเบียนแบบอัปเดตต่อเนื่อง</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-favorite mt-2 flex-shrink-0" />
              <span>ระบบบันทึกรายวิชาโปรดเพื่อวางแผนจัดตารางสอนล่วงหน้า</span>
            </li>
          </ul>
        </section>

        <section className="apple-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="h-10 w-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-text-primary mb-4">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-text-primary">ทีมผู้พัฒนา</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              โครงงานพัฒนาระบบนี้จัดทำขึ้นโดยนักศึกษาสาขาวิชาเทคโนโลยีสารสนเทศ ภายใต้กระบวนวิชาเทคโนโลยีเว็บ (Web Technology)
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-text-muted font-mono">
            <span>Next.js 16 • React 19</span>
            <span className="text-accent">IT WebTech</span>
          </div>
        </section>
      </div>
    </main>
  );
}
