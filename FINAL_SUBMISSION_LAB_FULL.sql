-- ==============================================================================
-- วิชา: ระบบฐานข้อมูล (Database Systems) มหาวิทยาลัยแม่โจ้
-- ชื่อ-นามสกุล: นายจิรภัทร เกตุตรา  รหัสนักศึกษา: 6804101311
-- สาขาวิชา: วิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์ ชั้นปีที่ 2
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mydb;

-- ------------------------------------------------------------------------------
-- ข้อ 1: โครงสร้างตาราง ER Diagram (5 ตาราง: Faculty, Department, Student, Subject, Register)
-- ------------------------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS register;
DROP TABLE IF EXISTS enrollment;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS faculty;
SET FOREIGN_KEY_CHECKS = 1;

-- 1.1 ตารางคณะ (Faculty)
CREATE TABLE faculty (
    facultyid INT PRIMARY KEY,
    facultyname VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1.2 ตารางสาขาวิชา (Department)
CREATE TABLE department (
    deptid INT PRIMARY KEY,
    deptname VARCHAR(255) NOT NULL,
    facultyid INT,
    FOREIGN KEY (facultyid) REFERENCES faculty(facultyid) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1.3 ตารางนักศึกษา (Student) *code เป็น BIGINT เพื่อรองรับรหัส 10 หลัก*
CREATE TABLE student (
    id INT PRIMARY KEY,
    code BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    gender VARCHAR(20),
    year INT,
    gpa DECIMAL(3,2),
    revenue DECIMAL(10,2),
    deptid INT,
    FOREIGN KEY (deptid) REFERENCES department(deptid) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1.4 ตารางวิชา (Subject)
CREATE TABLE subject (
    subjectid INT PRIMARY KEY AUTO_INCREMENT,
    subjectcode VARCHAR(20) NOT NULL,
    subjectname VARCHAR(255) NOT NULL,
    credit INT NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1.5 ตารางการลงทะเบียน (Register) *ตารางกลางเชื่อม Many-to-Many*
CREATE TABLE register (
    regid INT PRIMARY KEY AUTO_INCREMENT,
    studentid INT NOT NULL,
    subjectid INT NOT NULL,
    semester VARCHAR(20) DEFAULT '1/2569',
    grade VARCHAR(5) DEFAULT NULL,
    FOREIGN KEY (studentid) REFERENCES student(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (subjectid) REFERENCES subject(subjectid) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- ข้อ 2: กรอกข้อมูลลงในตาราง
-- ------------------------------------------------------------------------------
-- ข้อมูลคณะ (5 คณะ)
INSERT INTO faculty (facultyid, facultyname) VALUES
(1, 'คณะผลิตกรรมการเกษตร'),
(2, 'คณะวิทยาศาสตร์'),
(3, 'คณะบริหารธุรกิจ'),
(4, 'คณะวิศวกรรมและอุตสาหกรรมเกษตร'),
(5, 'คณะสถาปัตยกรรมศาสตร์และการออกแบบสิ่งแวดล้อม');

-- ข้อมูลสาขาวิชา (10 สาขาวิชา)
INSERT INTO department (deptid, deptname, facultyid) VALUES
(101, 'สาขาวิชาพืชไร่', 1),
(102, 'สาขาวิชาพืชสวน', 1),
(201, 'สาขาวิชาวิทยาการคอมพิวเตอร์', 2),
(202, 'สาขาวิชาเคมี', 2),
(301, 'สาขาวิชาการตลาด', 3),
(302, 'สาขาวิชาการบัญชี', 3),
(401, 'สาขาวิชาวิศวกรรมเกษตร', 4),
(402, 'สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร', 4),
(501, 'สาขาวิชาภูมิสถาปัตยกรรม', 5),
(502, 'สาขาวิชาสถาปัตยกรรมศาสตร์', 5);

-- ข้อมูลนักศึกษาเพื่อนร่วมสาขาและต่างสาขา
INSERT INTO student (id, code, name, lastname, gender, year, gpa, revenue, deptid) VALUES
(1, 6601101, 'สมชาย', 'ใจดี', 'ชาย', 2, 3.25, 15000, 101),
(2, 6601102, 'กัญญา', 'ศิริผล', 'หญิง', 2, 3.70, 20000, 101),
(3, 6501103, 'อนันต์', 'ผาสุก', 'ชาย', 3, 2.65, 12000, 101),
(4, 6401104, 'ณัชชา', 'แก้วกล้า', 'หญิง', 4, 3.10, 18000, 101),
(11, 6604101, 'จิรภัทร', 'เจริญทรัพย์', 'ชาย', 2, 3.65, 22000, 201),
(12, 6504102, 'อริสรา', 'สงคราม', 'หญิง', 3, 3.80, 25000, 201),
(13, 6704103, 'ณัฐวุฒิ', 'ศรีสุข', 'ชาย', 1, 2.95, 15000, 201),
(14, 6404104, 'พลอย', 'สุวรรณศรี', 'หญิง', 4, 3.45, 21000, 201),
(15, 6604105, 'ธีรภัทร', 'นพคุณ', 'ชาย', 2, 3.15, 18000, 201);

-- ข้อมูลของตนเอง (นายจิรภัทร เกตุตรา)
INSERT INTO student (id, code, name, lastname, gender, year, gpa, revenue, deptid) VALUES
(51, 6804101311, 'จิรภัทร', 'เกตุตรา', 'ชาย', 2, 3.37, 18000.00, 201);

-- ข้อมูลตาราง Subject (6 รายวิชา ตามหลักสูตร วท.บ. วิทยาการคอมพิวเตอร์ ม.แม่โจ้ ปี 2 เทอม 1)
INSERT INTO subject (subjectid, subjectcode, subjectname, credit) VALUES
(1, '10700313', 'ภาษาอังกฤษเชิงวิทยาศาสตร์และนวัตกรรม (English for Science and Innovation)', 3),
(2, '10301211', 'หลักการเขียนโปรแกรมเชิงวัตถุ (Principles of Object-Oriented Programming)', 3),
(3, '10301222', 'ระบบฐานข้อมูล (Database Systems)', 3),
(4, '10301223', 'การวิเคราะห์และออกแบบเชิงวัตถุ (Object Oriented Analysis and Design)', 3),
(5, '10301225', 'ระบบการจัดการฐานข้อมูล (Database Management Systems)', 3),
(6, '10301231', 'ปัญญาประดิษฐ์ (Artificial Intelligence)', 3);

-- ข้อมูลตาราง Register (18 รายการ - เกินเกณฑ์ 10 Records)
-- การลงทะเบียนของ นายจิรภัทร เกตุตรา (ลงทะเบียนครบ 6 วิชา 18 หน่วยกิต)
INSERT INTO register (studentid, subjectid, semester, grade) VALUES
(51, 1, '1/2569', 'A'),
(51, 2, '1/2569', 'A'),
(51, 3, '1/2569', 'A'),
(51, 4, '1/2569', 'B+'),
(51, 5, '1/2569', 'A'),
(51, 6, '1/2569', 'B+');

-- การลงทะเบียนของนักศึกษาเพื่อนร่วมสาขาวิทยาการคอมพิวเตอร์
INSERT INTO register (studentid, subjectid, semester, grade) VALUES
(11, 1, '1/2569', 'B+'),
(11, 2, '1/2569', 'A'),
(11, 3, '1/2569', 'B'),
(12, 2, '1/2569', 'A'),
(12, 3, '1/2569', 'A'),
(12, 4, '1/2569', 'B+'),
(13, 1, '1/2569', 'B'),
(13, 3, '1/2569', 'C+'),
(14, 3, '1/2569', 'B'),
(14, 5, '1/2569', 'A'),
(15, 3, '1/2569', 'B+'),
(15, 6, '1/2569', 'A');

-- ------------------------------------------------------------------------------
-- ข้อ 3: แสดงข้อมูลการลงทะเบียนเรียนของตนเอง (นายจิรภัทร เกตุตรา)
-- ------------------------------------------------------------------------------
SELECT 
    s.code AS รหัสนักศึกษา,
    CONCAT(s.name, ' ', s.lastname) AS ชื่อ_นามสกุล,
    s.year AS ชั้นปี,
    s.gpa AS เกรดเฉลี่ยสะสม,
    d.deptname AS สาขาวิชา,
    f.facultyname AS คณะ,
    sub.subjectcode AS รหัสวิชา,
    sub.subjectname AS ชื่อวิชา,
    sub.credit AS หน่วยกิต,
    r.semester AS ภาคการศึกษา,
    r.grade AS เกรด
FROM register r
JOIN student s ON r.studentid = s.id
JOIN department d ON s.deptid = d.deptid
JOIN faculty f ON d.facultyid = f.facultyid
JOIN subject sub ON r.subjectid = sub.subjectid
WHERE s.code = 6804101311;

-- ------------------------------------------------------------------------------
-- ข้อ 4: แสดงข้อมูลรายวิชาที่นักศึกษาสาขาวิทยาการคอมพิวเตอร์ลงทะเบียนเรียน
-- ------------------------------------------------------------------------------
SELECT DISTINCT
    sub.subjectcode AS รหัสวิชา,
    sub.subjectname AS ชื่อวิชา,
    sub.credit AS หน่วยกิต,
    d.deptname AS สาขาวิชา
FROM register r
JOIN student s ON r.studentid = s.id
JOIN department d ON s.deptid = d.deptid
JOIN subject sub ON r.subjectid = sub.subjectid
WHERE d.deptname LIKE '%วิทยาการคอมพิวเตอร์%'
ORDER BY sub.subjectcode;

-- ------------------------------------------------------------------------------
-- ข้อ 5: แสดงข้อมูลรายวิชาและผลการเรียนที่นักศึกษาสาขาวิทยาการคอมพิวเตอร์ลงทะเบียนเรียน
-- ------------------------------------------------------------------------------
SELECT 
    s.code AS รหัสนักศึกษา,
    CONCAT(s.name, ' ', s.lastname) AS ชื่อ_นามสกุล,
    d.deptname AS สาขาวิชา,
    sub.subjectcode AS รหัสวิชา,
    sub.subjectname AS ชื่อวิชา,
    sub.credit AS หน่วยกิต,
    r.semester AS ภาคการศึกษา,
    r.grade AS ผลการเรียน
FROM register r
JOIN student s ON r.studentid = s.id
JOIN department d ON s.deptid = d.deptid
JOIN subject sub ON r.subjectid = sub.subjectid
WHERE d.deptname LIKE '%วิทยาการคอมพิวเตอร์%'
ORDER BY s.code, sub.subjectcode;