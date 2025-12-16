---
title: OOP Concept และ คำศัพท์สำหรับ Delphi Component Writer
date: 2025-12-17
tags: ['delphi']
intro: Delphi ยังคงเป็นหนึ่งในเครื่องมือที่แข็งแกร่งสำหรับการพัฒนาแอปพลิเคชัน ด้วย Paradigm แบบ OOP (Object-Oriented Programming) โดยเฉพาะเมื่อทำงานกับ Component หรือที่นักพัฒนา Delphi มักเรียกว่า VCL (Visual Component Library) บทความนี้จะพาคุณทำความเข้าใจแนวคิด OOP ที่จำเป็น และคำศัพท์ที่ Component Writer ควรรู้
seo: อธิบายแนวคิด OOP และศัพท์เทคนิคที่จำเป็นสำหรับ Delphi Component Writer เข้าใจการพัฒนา VCL อย่างเป็นระบบ เหมาะสำหรับนักพัฒนา Delphi ทุกระดับ
image: 2025-12-17-oop-concept-for-delphi-component-writer.png
active: true
---

# OOP Concept และ ศัพท์เทคนิคสำหรับ Delphi Component Writer

## 4 หลักการสำคัญของ OOP

**OOP (Object-Oriented Programming)** คือแนวคิดการเขียนโปรแกรมที่มองทุกอย่างเป็น **วัตถุ (Object)**
Delphi ถูกออกแบบมาให้รองรับ **OOP** แบบเต็มรูปแบบตั้งแต่ภาษา **Object Pascal** ใน **Turbo Pascal** ซึ่งเรียกได้ว่าเป็นเวอร์ชั่นต้นตำรับของ Delphi

### 1. Encapsulation

**Encapsulation** คือการควบคุมการถูกเข้าถึงตัวแปรหรือเมธอดของคลาส

```pascal
type
  TMyComponent = class(TComponent)
  private
    FValue: Integer; // ไม่สามารถถูกเข้าถึงจากคลาสอื่นได้
  public
    property Value: Integer read FValue; // ถูกเข้าถึงได้จากคลาสอื่น (อ่านอย่างเดียว) โดยผ่าน property ที่เป็น public
  end;
```

**ประโยชน์**

- ป้องกันการถูกเข้าถึงหรือถูกแก้ไขข้อมูลโดยตรงจากคลาสอื่น
- ควบคุมการใช้งานผ่าน Property

### 2. Inheritance

**Inheritance** คือการสร้างคลาสใหม่โดยการสืบทอดความสามารถต่อจากคลาสต้นแบบ

```pascal
type
  TCustomButton = class(TButton)
  public
    procedure Click; override;
  end;
```

**ประโยชน์**

- ลดการเขียนโค้ดซ้ำซ้อน **DRY**
- ขยายความสามารถต่อจากคลาสต้นแบบ

### 3. Polymorphism

**Polymorphism** คือการมีเมธอดชื่อเดียวกันแต่ทำงานแตกต่างกันตามคลาสที่เป็นเจ้าของ

```pascal
procedure Draw(AControl: TControl);
begin
  AControl.Paint;
end;
```

### 4. Abstraction

การออกแบบโดยเน้น **สิ่งที่ทำได้** (`abstract`/`interface`) มากกว่า **ทำอย่างไร** (**Implementation**)

```pascal
type
  TMyBaseComponent = class abstract
  public
    procedure Execute; virtual; abstract; // กำหนดความสามารถไว้ล่วงหน้าเพื่อเพิ่มโค้ดในการทำงานในคลาสที่มาสืบทอด
  end;
```

## OOP ที่เกี่ยวข้องกับการเขียน Component โดยตรง

Delphi Component ที่เราจะพัฒนาต้องสืบทอดมาจาก `TComponent` (**Base Class**) โดยที่ `TComponent` และคลาสทุกๆคลาสใน Delphi จะมี **Root Class** คือ `TObject` ดังนั้นการเข้าใจโครงสร้างนี้สำคัญจึงถือเป็นเรื่องสำคัญมากสำหรับ Delphi Component Writer

```
TObject
 └─ TPersistent
     └─ TComponent
         └─ TControl
```

## คำศัพท์ที่ Component Writer ควรรู้

### Base-Class/Superclass และ Derived Class/Subclass

- กรณีที่ `TMyComponent` สืบทอดจาก `TComponent` หมายความว่า `TComponent` เป็น **Base-Class** ของ `TMyComponent`
- กรณีที่ `TMyComponent` สืบทอดจาก `TComponent` หมายความว่า `TMyComponent` เป็น **Derived-Class** ของ `TComponent`

### Method Overriding

การเพิ่มเติมหรือแทนที่โค้ดของ **Based-Class** ด้วยโค้ดของคลาสที่มาสืบทอด

```pascal
type
TMyComponent = class(TComponent)
public
  procedure Click; override;
end;

implementation

procedure TMyComponent.Click;
begin
  inherited; // เรียกใช้งานโค้ดของ Base-Class

  // โค้ดเพิ่มเติม
end;
```

### Method Overloading

การมีเมธอดชื่อเดียวกันในคลาสเดียวกันแต่มี **Method Signature** ที่ต่างกัน

```pascal
type
TMyComponent = class(TComponent)
public
  procedure MakeSound; overload;
  procedure MakeSound(const aLanguage: string); overload;
end;
```

### TComponent

คลาสที่เป็น **Base Class**/**Superclass** ของ Component ทุกตัว

### Owner

เนื่องจาก Delphi มีการจัดการ Memory ในแบบ **Manual Memory Management** การกำหนด **Owner** จึงสำคัญในการป้องกันปัญหาเรื่อง Memory Leak: [การจัดการ Memory Management in Delphi](/blogs/2025-12-16-memory-management-in-delphi)

```pascal
var MyComponent1 := TMyComponent.Create(Self);
```

> ถ้า **Owner** ถูก **Free** → Component จะถูก **Free** ไปด้วยโดยอัตโนมัติ

### Property

`published` + `property` เป็น **Identifier** ที่เชื่อมโยงการแสดงค่าไปยัง **Object Inspector**

```pascal
public
  FCaption: string
published
  property Caption: string read FCaption write FCaption;
```

- `published` + `property` → แสดงค่า **Object Inspector** (**Design-Time** และ **Runtime**)
- `public` + `property` → ใช้ในโค้ดเท่านั้น (**Runtime** เท่านั้น)

### Event

**Callback** ที่เปิดให้ผู้ใช้เขียนโค้ดที่ต้องการเมื่อมีเหตุการใดๆเกิดขึ้นกับ Component

```pascal
type
  TOnValueChange = procedure(Sender: TObject; Value: Integer) of object;
```

### Streaming

กระบวนการบันทึก/โหลดค่า **Property** ของ Component ไปยังไฟล์ **.dfm** (Form, DataModule)

```pascal
published
  property Color;
```

Delphi จะทำการ **Serialize** ค่าที่ถูกป้อนให้กับ **Object Inspector** ไปยังไฟล์ **.dfm** ให้โดยอัตโนมัติ

### Notification

เมธอด `Notification` จะถูกสั่งให้ทำงานอัตโนมัติเมื่อ Component อื่นๆถูกลบออกจาก Form, DataModule

```pascal
procedure Notification(aComponent: TComponent; Operation: TOperation); override;
```

### Design-Time vs Runtime

| ประเภท      | ความหมาย            |
| ----------- | ------------------- |
| Design-Time | ขณะออกแบบใน IDE     |
| Runtime     | ขณะโปรแกรมกำลังทำงาน |

Component Writer จึงต้องเขียนโค้ดรองรับการทำงานของ Component ให้รองรับทั้ง 2 สถานะการณ์

### Register Procedure

ใช้ลงทะเบียน (ติดตั้ง) Component ให้แสดงใน Tool Palette

```pascal
procedure Register;
begin
  RegisterComponents('My Components Group', [TMyComponent]);
end;
```

### Package (.bpl)

ไฟล์โปรเจคของ Component จะเรียกว่า **Package** โดยอาจแยกเป็น 2 ประเภทต่อ 1 โปรเจคคือ

- Design-Time Package
- Runtime Package

## สรุป

Delphi 12 ยังคงโดดเด่นด้าน OOP และ Component-Based Development หากเราต้องการเป็น **Component Writer** ที่ดีจึงควรที่จะ

- เข้าใจ OOP อย่างลึกซึ้ง
- รู้โครงสร้างคลาสของ Delphi
- เข้าใจคำศัพท์ด้าน Design-Time / Streaming / Event

สิ่งเหล่านี้จะช่วยให้เราสร้าง Component ที่ใช้งานง่าย ดูแลรักษาง่าย และเป็นมืออาชีพมากขึ้น

