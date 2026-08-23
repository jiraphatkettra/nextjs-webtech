import Image from "next/image";


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
    {
      id: 1,
      code: "10301231",
      title: "Web Technology",
      credits: 3,
      isOpen: true,
    },
    {
      id: 2,
      code: "10301232",
      title: "Database Systems",
      credits: 3,
      isOpen: false,
    },
    {
      id: 3,
      code: "10301233",
      title: "Software Engineering",
      credits: 3,
      isOpen: true,
    },
    {
      id: 4,
      code: "10301234",
      title: "Computer Networks",
      credits: 3,
      isOpen: true,
    },
  ];

  return (
    <main className="page">
      <h1>{siteName}</h1>
      <p>{description}</p>

      <section>
        <h2>กลุ่มผู้ใช้งานเป้าหมาย</h2>
        <p>เว็บไซต์นี้เหมาะสำหรับนักศึกษาที่ต้องการวางแผนการลงทะเบียนเรียน และค้นหารายวิชาที่เปิดสอน</p>
      </section>

      {/* 👉 3. นำ courses มาวนลูปแสดงผลด้วย map() */}
      <section className="courseGrid">
        {courses.map((course) => (
          <article key={course.id} className="courseCard">
            <h3>{course.title}</h3>
            <p>รหัสวิชา: {course.code}</p>
            <p>หน่วยกิต: {course.credits} หน่วยกิต</p>
            <p>สถานะ: {course.isOpen ? "🟢 เปิดให้ลงทะเบียน" : "🔴 ปิดการลงทะเบียน"}</p>
          </article>
        ))}
      </section>
    </main>
  );
}


