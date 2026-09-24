// Type ของรายวิชา ตามใบงานที่ 10
export type Course = {
  id: string;         // รหัสประจำวิชา (CS101 หรือ UUID)
  code: string;       // รหัสวิชา
  name: string;       // ชื่อวิชา
  credit: number;     // จำนวนหน่วยกิต (1-6)
  instructor: string; // อาจารย์ผู้สอน
};
