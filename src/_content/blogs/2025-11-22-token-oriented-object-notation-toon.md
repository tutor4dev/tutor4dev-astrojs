---
title: สวัสดี Token-oriented Object Notation
date: 2025-11-22
tags: ['javascript']
intro: Token-Oriented Object Notation หรือ (TOON) คือรูปแบบการจัดโครงสร้างข้อมูลแบบ Lightweight Data Notation ที่ถูกออกแบบมาให้มนุษย์อ่านง่ายและประมวลผลได้รวดเร็ว คล้ายกับ JSON แต่ใช้แนวคิด Token ลดความซับซ้อนของสัญลักษณ์และเน้นความกระชับ เหมาะสำหรับงานพัฒนาระบบที่ต้องการความเรียบง่ายและประสิทธิภาพ
seo: TOON หรือ Token-Oriented Object Notation คือรูปแบบข้อมูลแบบเบา อ่านง่าย และกระชับกว่า JSON เหมาะสำหรับผู้เริ่มต้นและนักพัฒนา พร้อมตัวอย่างการใช้งาน Node.js และคำอธิบายโครงสร้างพื้นฐานอย่างครบถ้วน
image: 2025-11-22-token-oriented-object-notation-toon.png
active: true
---

# สวัสดี Token-oriented Object Notation

**Token-Oriented Object Notation** หรือ (**TOON**) คือรูปแบบการจัดโครงสร้างข้อมูลแบบ Lightweight Data Notation ที่ถูกออกแบบมาให้มนุษย์อ่านง่ายและประมวลผลได้รวดเร็ว คล้ายกับ **JSON** แต่ใช้แนวคิด Token ลดความซับซ้อนของสัญลักษณ์และเน้นความกระชับ เหมาะสำหรับงานพัฒนาระบบที่ต้องการความเรียบง่ายและประสิทธิภาพ

ในยุคที่ระบบต่าง ๆ ต้องแลกเปลี่ยนข้อมูลรวดเร็วและง่ายต่อการนำไปใช้งาน ฟอร์แมตข้อมูลเช่น **JSON** กลายเป็นมาตรฐานที่เราคุ้นเคย แต่ในบางกรณี **JSON** อาจมีความเยิ่นเย้อเกินความจำเป็น เช่น ต้องใช้เครื่องหมายปีกกา เครื่องหมายอัญประกาศ และโครงสร้างที่ค่อนข้างเคร่งครัด

**TOON** จึงถูกนำเสนอเป็นอีกหนึ่งรูปแบบการบันทึกข้อมูลที่อ่านง่าย กระชับ และยืดหยุ่นกว่า เหมาะสำหรับผู้เริ่มต้นและนักพัฒนาที่ต้องการโครงสร้างเรียบง่ายแต่ยังคงความชัดเจนของข้อมูลอยู่

## Token-oriented Object Notation คืออะไร?

**Token-Oriented Object Notation** คือรูปแบบการเขียนข้อมูลที่ใช้ **Token** อย่างเช่นเครื่องหมายคำสั่งหรือสัญลักษณ์สั้น ๆ ในการบอกความหมายของโครงสร้างข้อมูล ตัวแปร และค่าต่าง ๆ จุดเด่นคืออ่านง่าย ไม่จำเป็นต้องใช้เครื่องหมายซ้อนกันจำนวนมาก

### ตัวอย่าง TOON

```toon
user:
  name = "Alice"
  age = 25
  active = true

items:
  - "pen"
  - "notebook"
  - "eraser"
```

### ตัวอย่าง JSON

```json
{
  "user": {
    "name": "Alice",
    "age": 25,
    "active": true
  },
  "items": ["pen", "notebook", "eraser"]
}
```

## การใช้งาน TOON ใน Node.js

### ตัวอย่าง TOON

```toon
product:
  id = 101
  name = "USB Keyboard"
  price = 350
  inStock = true
```

### ตัวอย่างโค้ด Node.js สำหรับอ่านและแปลงข้อมูล TOON

```js
import fs from "fs";

// ฟังก์ชัน parser ตัวอย่าง (แบบพื้นฐาน)
function parseTOON(text) {
  const lines = text.split("\n");
  const result = {}
  let currentObj = null

  for (const line of lines) {
    const trimmed = line.trim()
    
    if (trimmed.endsWith(":")) {
      const key = trimmed.replace(":", "")
      result[key] = {}
      currentObj = result[key]
    } else if (trimmed.includes("=")) {
      const [k, v] = trimmed.split("=").map(x => x.trim())
      const value = JSON.parse(v) // ใช้ JSON.parse เพื่ออ่านตัวเลข/boolean/string อัตโนมัติ
      currentObj[k] = value
    }
  }

  return result
}

// อ่านไฟล์ .toon
const text = fs.readFileSync("./data.toon", "utf-8")
const data = parseTOON(text)

console.log(data)
```

### ผลลัพธ์ที่ได้

```js
{
  product: {
    id: 101,
    name: "USB Keyboard",
    price: 350,
    inStock: true
  }
}
```

## สรุป

**TOON** เป็นรูปแบบข้อมูลที่ออกแบบมาให้เข้าใจง่าย ลดจำนวนสัญลักษณ์ที่ต้องใช้ และช่วยให้ผู้เริ่มต้นสามารถสร้างโครงสร้างข้อมูลได้อย่างสะดวก แม้ว่าจะยังไม่ได้แพร่หลายเท่ากับ **JSON** แต่ถือเป็นตัวเลือกที่น่าสนใจสำหรับงานที่ต้องการความอ่านง่าย ความกระชับ และความคล่องตัวในการจัดรูปแบบข้อมูล
