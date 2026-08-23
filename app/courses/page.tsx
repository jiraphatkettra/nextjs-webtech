type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

const courses: Course[] = [
  { id: 1, code: "10301231", title: "Web Technology", credits: 3, isOpen: true },
  { id: 2, code: "10301232", title: "Database Systems", credits: 3, isOpen: false },
  { id: 3, code: "10301233", title: "Software Engineering", credits: 3, isOpen: true },
  { id: 4, code: "10301234", title: "Computer Networks", credits: 3, isOpen: true },
];

export default function CoursesPage() {
  return (
    <main className="page">
      <h1>รายวิชาที่เปิดสอน</h1>
      <section className="courseGrid">
        {courses.map((course) => (
          <article key={course.id} className="courseCard">
            <h2>{course.title}</h2>
            <p>รหัสวิชา: {course.code}</p>
            <p>จำนวนหน่วยกิต: {course.credits} หน่วยกิต</p>
            <p>สถานะ: {course.isOpen ? "🟢 เปิดให้ลงทะเบียน" : "🔴 ปิดการลงทะเบียน"}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
