---
title: การจัดการ Memory Management in Delphi
date: 2025-12-16
tags: ['delphi']
intro: บทความนี้จะพาคุณทำความเข้าใจการจัดการ Memory Management ใน Delphi Win32 และ Win64 Application ตั้งแต่แนวคิดพื้นฐาน ไปจนถึงการใช้งาน try...finally อย่างถูกต้อง พร้อมตัวอย่างการใช้ที่ผิดพลาด และการใช้งาน try...finally ร่วมกับ try...except เพื่อเขียนโค้ดที่ปลอดภัย อ่านง่าย และดูแลรักษาได้ในระยะยาว
seo: เรียนรู้ Memory Management ใน Delphi การใช้ try...finally อย่างถูกต้อง พร้อมตัวอย่างการใช้ที่ผิดพลาด และการใช้งาน try...finally ร่วมกับ try...except เพื่อเขียนโค้ด Delphi ที่ปลอดภัยและไม่มี Memory Leak
image: 2025-12-16-memory-management-in-delphi.png
---

# Memory Management in Delphi

Delphi ใช้ Concept **Manual Memory Management** ในการจัดการ **Win32** และ **Win64** Application

## หลักการสำคัญคือ

- Object ที่สร้างด้วย `Create` (`constructor`) **ต้องถูกทำลายด้วย `Free`**
- Delphi ไม่มี Garbage Collector
- `Free` จะเรียก `Destroy` (`destructor`) ให้โดยอัตโนมัติ
- การลืม `Free` = **Memory Leak**
- การ `Free` ซ้ำ = **Access Violation**

### การ Create และ Free Object

```pascal
begin
  var List := TStringList.Create;

  List.Add('Hello Delphi');
  List.Add('Memory Management');

  List.Free;
end;
```

> โค้ดนี้ดูเหมือนจะถูกต้องแต่ถ้าเกิด **Exception** กับสเตทเม้นใดก่อนถึง `.Free` จะเกิด **Memory Leak** ทันที เนื่องจาก `.Free` จะไม่ถูก Execute
ซึ่งวิธีแก้ก็คือ `try...finally`

### การใช้ `try...finally`

`try...finally` ถูกออกแบบมาเพื่อ **รับประกันว่าทรัพยากรจะถูกคืนเสมอ** ไม่ว่าโค้ดจะเกิด Exception หรือไม่ก็ตาม

```pascal
begin
  var List := TStringList.Create;
  try
    List.Add('Hello Delphi');
    List.Add('Memory Management');
  finally
    List.Free;
  end;
end;
```

### Precautions

- สร้าง Object **ก่อน** `try` 
- สเตทเม้นทั้งหมดอยู่ใน `try`
- `Free` อยู่ใน `finally` เท่านั้น

> สเตทเม้นใน `finally` จะถูกเรียกเสมอ ไม่ว่าโค้ดจะเกิด Exception หรือไม่ก็ตาม
>
> แต่สเตทเม้นใน `finally` **จะไม่ถูก Execute** ในกรณีที่ `var List := TStringList.Create;` เกิด Exception ซึ่งจะทำให้ไม่เกิดปัญหา **Access Violation**

### การใช้ `try...finally` จัดการ Object มากกว่า 1 ตัว

```pascal
begin
  var sl1 := TStringList.Create;
  try
    sl1.Add('Hello Delphi');

    var sl2 := TStringList.Create;
    try
      sl2.Add(sl1.Text);
    finally
      sl2.Free;
    end;
  finally
    sl1.Free;
  end;
end;
```

### การใช้ try...finally ที่ไม่ถูกต้อง ❌

```pascal
begin
  try
    var List := TStringList.Create;

    List.Add('Hello Delphi');
    List.Add('Memory Management');
  finally
    List.Free;
  end;
end;
```

> ในกรณีที่ `var List := TStringList.Create;` เกิด Exception `List` จะเป็น `nil` ทำให้ `.Free` เกิดปัญหา **Access Violation**

### การใช้ try...finally ร่วมกับ try...except

หลายคนสับสนว่า `try...except` กับ `try...finally` มีการนำไปไปใช้แตกต่างกันอย่างไร

- `try...except` → จัดการ **Error**
- `try...finally` → จัดการ **Resource**

```pascal
begin
  var FileStream := TFileStream.Create('data.txt', fmOpenRead);
  try
    try
      ProcessFile(FileStream);
    except
      on E: Exception do
      begin
        ShowMessage('เกิดข้อผิดพลาด: ' + E.Message);
      end;
    end;
  finally
    FileStream.Free;
  end;
end;
```

### ลำดับการทำงาน

1. สร้าง Object
2. ทำงาน
3. เกิด Error → เข้า `except`
4. จบแล้ว → เข้า `finally` เสมอ

## บทสรุป

- Delphi ใช้ Concept **Manual Memory Management**
- Object ที่สร้างด้วย `Create` **ต้องถูกทำลายด้วย `Free`**
- Delphi ไม่มี Garbage Collector
- `Free` จะเรียก `Destroy` ให้โดยอัตโนมัติ
- การลืม `Free` = **Memory Leak**
- การ `Free` ซ้ำ = **Access Violation**
