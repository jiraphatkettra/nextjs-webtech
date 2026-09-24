import type { Course } from "@/types/course";

// ข้อมูลจำลองรายวิชาตั้งต้น
export const courses: Course[] = [
  {
    id: "CS101",
    code: "CS101",
    name: "Introduction to Computer Science",
    credit: 3,
    instructor: "อาจารย์สมชาย รักคอมพิวเตอร์",
  },
  {
    id: "CS201",
    code: "CS201",
    name: "Data Structures and Algorithms",
    credit: 3,
    instructor: "ดร.วิภา สถิตยศาสตร์",
  },
  {
    id: "CS202",
    code: "CS202",
    name: "Database Systems",
    credit: 3,
    instructor: "ผศ.มานพ ระบบฐานข้อมูล",
  },
  {
    id: "CS301",
    code: "CS301",
    name: "Software Engineering",
    credit: 3,
    instructor: "อาจารย์กิตติศักดิ์ วิศวกรรมซอฟต์แวร์",
  },
  {
    id: "WEB231",
    code: "10301231",
    name: "เว็บเทคโนโลยี",
    credit: 3,
    instructor: "อาจารย์ประจำวิชา",
  },
];
