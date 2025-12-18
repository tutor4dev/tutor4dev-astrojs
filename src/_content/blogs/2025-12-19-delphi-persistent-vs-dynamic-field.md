---
title: ทำความรู้จักกับ Persistent Fields และ Dynamic Fields ใน Delphi
date: 2025-12-19
tags: ["delphi"]
intro: บทความนี้จะพาคุณทำความรู้จักกับ Persistent Fields และ Dynamic Fields ใน Delphi พร้อมอธิบายการทำงานของ TField.OnGetText และ TField.OnSetText ที่ช่วยควบคุมการแสดงผลและการจัดรูปแบบข้อมูลใน Dataset เพื่อให้พัฒนาแอปพลิเคชันฐานข้อมูลได้ยืดหยุ่น เข้าใจง่าย และตรงตามความต้องการมากยิ่งขึ้น
seo: อธิบาย Persistent Fields และ Dynamic Fields ใน Delphi พร้อมการใช้งาน TField.OnGetText และ TField.OnSetText เพื่อจัดการการแสดงผลข้อมูลใน Dataset
image: 2025-12-19-delphi-persistent-vs-dynamic-field.png
active: true
---

# ทำความรู้จักกับ Persistent Fields และ Dynamic Fields ใน Delphi

### `TField` คืออะไรใน Delphi

`TField` คือ Component ที่ทำหน้าที่เป็นตัวแทนคอลัมน์ของข้อมูลใน DataSet เช่น `name`, `birth_date`, `amount` เป็นต้น ซึ่ง Delphi รองรับการสร้าง Field ได้ 2 รูปแบบคือ

- **Dynamic** Fields
- **Persistent** Fields

### 1. Persistent Fields

Persistent Fields คือการสร้าง Field ในขณะ Design-time โดยการใช้ **Field Editor** ซึ่ง Field ในรูปแบบนี้ค่อนข้างจะมีความสะดวกในการใช้งานแต่ก็ขาดความยืดหยุ่นเช่น ในกรณีที่แอปต้องแสดงข้อมูลที่เปลี่ยนไปตามคำสั่ง SQL หรือระบบงานมีการเปลี่ยนแปลง **Schema** ของฐานข้อมูล ทำให้การใช้ Persistent Fields อาจจะก่อให้เกิด **Exception** ในขณะ Runtime ได้

**วิธีสร้าง Persistent Fields**

![!](https://iili.io/flRv1kl.png)

![!](https://iili.io/flRSKla.png)

![!](https://iili.io/flRUP4e.png)

> หลังจากที่สร้าง Field ในแบบ Persistent เสร็จเรียบร้อยแล้ว เราสามารถที่จะใช้ **Object Inspector** ในการตั้งค่าต่างๆ ให้กับ Field เช่น **Property** หรือ **Event Handler** และก็ยังสามารถใช้โค้ดเพื่อควบคุมการทำงานในขณะ Runtime ได้อีกด้วย `FDMemTable1amount.AsFloat := 100.50;`

![!](https://iili.io/flRg4NR.png)

![!](https://iili.io/flR6qwx.png)

> Delphi จะเลือกคลาสของ Field ให้โดยอัตโนมัติเพื่อให้สัมพันธ์กับชนิดของข้อมูลใน DataSet เช่น `TWideStringField`, `TBCDField` เป็นต้น

### 2. Dynamic Fields

Delphi จะทำการสร้าง Dynamic Fields ให้โดย**อัตโนมัติ**เมื่อ DataSet ถูกเปิดใช้งานแต่พบว่ายังไม่มีการสร้าง Persistent Fields เอาไว้ในขณะ Design-time 

เนื่องจาก Dynamic Fields ถูกสร้างขึ้นในขณะ Runtime จึงทำให้การตั้งค่าต่างๆ จะต้องทำผ่านโค้ดทั้งหมด ซึ่งอาจดูยุ่งยากในช่วงที่นักพัฒนายังไม่คุ้นเคยแต่การใช้ Dynamic Fields จะช่วยให้แอปมีความยืดหยุ่นมากขึ้นพอสมควร

**ตัวอย่างการใช้งาน Dynamic Fields**

```pascal
var f := FDMemTable1.FieldByName('amount'); // f คือ Object TField

ShowMessage(FormatFloat('#,##0.00', f.AsFloat));
```

```pascal
type
  TFMain = class(TForm)
    FDMemTable1: TFDMemTable;
    procedure FormCreate(Sender: TObject);
  private
    procedure HandleFieldOnGetText(aField: TField; var aText: string; aDisplayText: Boolean);
  end;

procedure TFMain.HandleFieldOnGetText(aField: TField; var aText: string; aDisplayText: Boolean);
begin
  // แทรกโค้ดที่ต้องการ
end;

procedure TFMain.FormCreate(Sender: TObject);
begin
  var f := FDMemTable1.FieldByName('birth_date');
  f.OnGetText := HandleFieldOnGetText; // Assign Event Handler
end;
```

### เปรียบเทียบ Persistent vs Dynamic Field

| คุณสมบัติ | Persistent Fields | Dynamic Fields |
| ------------------- | ------------- | ---------------- |
| สร้างโดยอัตโนมัติ      | ❌ | ✅ |
| ตั้งค่า Property (Design-time) | ✅ | ❌ |
| ตั้งค่า Event Handler (Design-time) | ✅ | ❌ |
| ความง่าย | ง่าย | ต้องเขียนโค้ด |
| ความยืดหยุ่น | จำกัด | ยืดหยุ่นสูง |

## ทำความรู้จักกับ Event `TField.OnGetText` และ `TField.OnSetText`

### `TField.OnGetText`

Event `OnGetText` จะถูกเรียกใน **ขั้นตอนแสดงข้อมูล** ไปยัง **DBAware Controls** เช่น `TDBGrid`, `TDBEdit` เป็นต้น โดยนักพัฒนาจะใช้ Event นี้ในการแทรกโค้ดเพื่อ Transform การแสดงผลข้อมูลจากข้อมูลดิบผ่าน DataSet ไปเป็นข้อมูลตามต้องการเพื่อแสดงผล

```pascal
procedure TForm1.TFDMemTable1amountGetText(Sender: TField; var Text: string; DisplayText: Boolean);
begin
  Text := FormatFloat('#,##0.00 บาท', Sender.AsFloat);
end;
```

> 📌 ข้อมูลดิบเป็นตัวเลขแบบปกติ
>
> 📌 มีการฟอร์แมตตัวเลขเพื่อแสดงผลและมีคำว่า **บาท** ต่อท้าย

### `TField.OnSetText`

Event `OnSetText` จะถูกเรียกใน **ขั้นตอนที่ผู้ใช้ป้อนข้อมูล** โดยนักพัฒนาจะใช้ Event นี้ในการแทรกโค้ดเพื่อ Transform ข้อมูลที่ผู้ใช้ป้อนเข้ามาแปลงเป็นข้อมูลดิบที่เหมาะกับการบันทึกลงฐานข้อมูลผ่าน DataSet

```pascal
procedure TForm1.TFDMemTable1statusSetText(Sender: TField; const Text: string);
begin
  if SameText(Text, 'Active') then
    Sender.AsInteger := 1
  else
    Sender.AsInteger := 0;
end;
```

> 📌 กรณีผู้ใช้ป้อนข้อมูลด้วยค่า **`'Active'`** ฐานข้อมูลจะถูกบันทึกค่าเป็น **`1`**

### ตัวอย่างการใช้งาน `OnGetText` และ `OnSetText`

ตัวอย่างนี้จะใช้วิธีสร้าง Persistent Fields และทำการเขียน Event Handler ให้กับ `OnGetText` และ `OnSetText`

![!](https://iili.io/fl7WxmF.png)

**Requirements**

- ข้อมูลดิบใน DataSet เก็บเป็นค่า **`True`**/**`False`**
- แสดงผลผ่าน DBAware Control เป็นค่า **`'✅'`**/**`'❌'`**
- ผู้ใช้บันทึกข้อมูลโดยการป้อนค่า **`'T'`** จะถูกบันทึกเป็นค่า **`True`** หากป้อนเป็นค่าอื่นๆจะถูกบันทึกเป็นค่า **`False`**

![!](https://iili.io/fl7XBCG.png)

> การแสดงผลในขณะ Design-time

```pascal
procedure TForm1.TFDMemTable1is_activeGetText(Sender: TField; var Text: string; DisplayText: Boolean);
begin
  if Sender.AsBoolean then
    Text := '✅'
  else
    Text := '❌';
end;

procedure TForm1.TFDMemTable1is_activeSetText(Sender: TField; const Text: string);
begin
  Sender.AsBoolean := SameText(Text, 'T');
end;
```

![!](https://iili.io/fl7XQcl.png)

> การแสดงผลในขณะ Runtime

## สรุป

- 📌 **Persistent** Fields = ง่ายแต่ไม่ยืดหยุ่น
- 📌 **Dynamic** Fields = ยากกว่าเพราะต้องเขียนโค้ดเอง
- 📌 `OnGetText` = เปลี่ยน **ข้อมูลดิบ** เป็น**ข้อมูลแสดงผล**ตามที่ต้องการ
- 📌 `OnSetText` = เปลี่ยน **ข้อมูลที่ผู้ใช้ป้อน** ผ่าน **DBWare Controls** เป็น**ข้อมูลดิบ**เพื่อบันทึกลงฐานข้อมูล