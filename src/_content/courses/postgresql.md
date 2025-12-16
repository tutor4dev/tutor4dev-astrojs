---
title: SQL and PostgreSQL Fundamental
seo: เรียนรู้พื้นฐานฐานข้อมูลเชิงสัมพันธ์และ PostgreSQL อย่างเป็นระบบ ตั้งแต่โครงสร้างของตาราง, การใช้ SQL พื้นฐาน (SELECT, INSERT, JOIN), การจัดการข้อมูล, ฟังก์ชันใน PostgreSQL, ไปจนถึงการใช้งาน Data Types พิเศษ, Index, Views และ Window Functions เหมาะสำหรับผู้เริ่มต้นที่ต้องการเข้าใจและใช้งานฐานข้อมูลได้จริง
active: true
---

# SQL and PostgreSQL Fundamental

### ระยะเวลาและรูปแบบการอบรม

- ระยะเวลาของหลักสูตร: 3 วัน (18 ชั่วโมง) หรือ 4 วัน (24 ชั่วโมง)
- รูปแบบการอบรม: In-house Training ณ.องค์กร หรือ หน่วยงาน ของผู้อบรม

!!!qrcode.md

### Prerequisite

- ไม่มี

### วัตถุประสงค์ของหลักสูตร

* เข้าใจหลักการพื้นฐานของฐานข้อมูลเชิงสัมพันธ์ (Relational Database)
* ใช้งาน SQL พื้นฐานในการจัดการข้อมูล
* ใช้งาน PostgreSQL ในการสร้าง แก้ไข และดึงข้อมูลจากฐานข้อมูล
* เตรียมความพร้อมสำหรับการต่อยอดไปสู่ระดับ Intermediate

### เนื้อหาของหลักสูตร

#### Introduction to Relational Databases

- ความเข้าใจพื้นฐานของฐานข้อมูลเชิงสัมพันธ์
- ตาราง (Tables), แถว (Rows), คอลัมน์ (Columns)
- Primary Key, Foreign Key, Constraints

#### Introduction to PostgreSQL

- PostgreSQL คืออะไร? จุดเด่นและการใช้งาน
- การติดตั้ง PostgreSQL (หรือใช้ผ่านออนไลน์/GUI เช่น pgAdmin)
- การสร้าง Database และ Table เบื้องต้น

#### Basic SQL Statements

- การเลือกแสดงข้อมูลด้วย `SELECT`
- การกรองข้อมูลด้วย `WHERE`
- การจัดเรียงข้อมูลด้วย `ORDER BY`
- การจำกัดผลลัพธ์ด้วย `LIMIT`

#### SQL Operators & Conditions

- Logical Operators (`AND`, `OR`, `NOT`)
- Comparison Operators (`=`, `!=`, `<`, `>`, `BETWEEN`, `IN`, `LIKE`)
- NULL และการจัดการกับค่า NULL

#### Data Manipulation Language (DML)

- การเพิ่มข้อมูล: `INSERT INTO`
- การปรับปรุงข้อมูล: `UPDATE`
- การลบข้อมูล: `DELETE`
- แนวทางการใช้ Transaction (เบื้องต้น)

#### การใช้ฟังก์ชันพื้นฐาน (Built-in Functions)

- Aggregate Functions: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`
- การจัดกลุ่มข้อมูลด้วย `GROUP BY`
- การกรองผลลัพธ์ด้วย `HAVING`

#### การเชื่อมตาราง (Joins) เบื้องต้น

- การใช้ `INNER JOIN`
- การใช้ `LEFT JOIN`, `RIGHT JOIN`
- การเชื่อมโยงข้อมูลจากหลายตาราง

#### การออกแบบและเขียน Query อย่างมีประสิทธิภาพ

- แนวทางการเขียน SQL ที่อ่านง่าย
- ความเข้าใจพื้นฐานเกี่ยวกับ Index และ Performance (เบื้องต้น)

#### Data Types พิเศษใน PostgreSQL

* `SERIAL` และ `BIGSERIAL` สำหรับ Auto Increment
* `TEXT` vs `VARCHAR`
* `BOOLEAN` และค่า `TRUE`/`FALSE`
* `ARRAY` – การเก็บข้อมูลหลายค่าภายใน column เดียว
* `JSON` / `JSONB` – เก็บข้อมูลแบบ JSON ในฐานข้อมูล
* `UUID` – การสร้างรหัสเฉพาะแบบไม่ซ้ำกัน

#### PostgreSQL Features

- Views
- CTE (Common Table Expressions) ใช้งาน `WITH`
- Window Functions ใช้งาน `ROW_NUMBER()`, `RANK()`
- Constraint ใช้งาน `CHECK`, `EXCLUSION`
- Foreign Data Wrapper
