export type BandMember = {
  id: number;
  name: string;
  role: string;
  image?: string;
};

export type Band = {
  id: string; // รหัสอ้างอิงตรงกับชื่อไฟล์รูปภาพ
  name: string; // ชื่อวง
  thaiName: string; // ชื่อภาษาไทย
  image: string; // path รูปภาพใน public/image
  description: string; // คำอธิบายสั้นๆ
  members: BandMember[]; // รายชื่อสมาชิกในวง
};

export const bands: Band[] = [
  {
    id: "threemandown",
    name: "Three Man Down",
    thaiName: "ทรีแมนดาวน์",
    image: "/image/threemandown.jpeg",
    description: "วงป็อปร็อกสัญชาติไทย เจ้าของเพลงฮิตอย่าง ฝนตกไหม, ถ้าเธอรักฉันจริง",
    members: [
      { id: 1, name: "กฤตย์ จีรพัฒนานุวงศ์ (กิต)", role: "ร้องนำ (Lead Vocal)", image: "/image/members/กิต.jpeg" },
      { id: 2, name: "พีรพล เอี่ยมจำรัส (ตูน)", role: "กีตาร์ (Guitar)", image: "/image/members/ตูน.jpg" },
      { id: 3, name: "วิศรุต ปฐมศิริ (เส็ง)", role: "ซินธิไซเซอร์ / คีย์บอร์ด (Synthesizer / Keyboard)", image: "/image/members/เส็ง.jpg" },
      { id: 4, name: "เตธนันท์ วงศ์ปรีชาโชค (เต)", role: "กลอง (Drums)", image: "/image/members/เต.jpg" },
    ],
  },
  {
    id: "cocktail",
    name: "Cocktail",
    thaiName: "ค็อกเทล",
    image: "/image/cocktail.jpg",
    description: "วงร็อกที่มีภาษาเพลงสละสลวย เจ้าของเพลง เธอทำให้ฉันเสียใจ, คุกเข่า",
    members: [
      { id: 1, name: "ปัณฑพล ประสารราชกิจ (โอม)", role: "ร้องนำ (Lead Vocal)", image: "/image/members/โอม.jpg" },
      { id: 2, name: "ชวรัตน์ หรรษคุณาฒัย (เชา)", role: "กีตาร์ (Guitar)", image: "/image/members/เชา.jpg" },
      { id: 3, name: "เกริกเกียรติ สว่างวงศ์ (ปาร์ค)", role: "เบส (Bass)", image: "/image/members/ปาร์ค.jpg" },
      { id: 4, name: "ฟิลิปส์ เปรมสิริกรณ์ (ฟิลิปส์)", role: "กลอง (Drums)", image: "/image/members/ฟิลิปส์.jpg" },
    ],
  },
  {
    id: "bigass",
    name: "Big Ass",
    thaiName: "บิ๊กแอส",
    image: "/image/bigass.jpg",
    description: "วงร็อกระดับตำนาน เจ้าของเพลง เล่นของสูง, ก่อนตาย, ลมเปลี่ยนทิศ",
    members: [
      { id: 1, name: "เดชา โคนาโล (เจ๋ง)", role: "ร้องนำ (Lead Vocal)", image: "/image/members/เจ๋ง.jpg" },
      { id: 2, name: "พูนศักดิ์ จตุระบุล (อ๊อฟ)", role: "กีตาร์นำ, ร้องประสาน (Lead Guitar / Backing Vocal)", image: "/image/members/ออฟ.jpg" },
      { id: 3, name: "อภิชาติ พรมรักษา (หมู)", role: "กีตาร์ริทึ่ม, ร้องประสาน (Rhythm Guitar / Backing Vocal)", image: "/image/members/หมู.webp" },
      { id: 4, name: "พงศ์พันธ์ พลสิทธิ์ (โอ๊ค)", role: "เบส (Bass)", image: "/image/members/โอ๊ค.jpg" },
      { id: 5, name: "ขจรเดช พรมรักษา (กบ)", role: "กลอง (Drums)", image: "/image/members/กบ.jpg" },
    ],
  },

];
