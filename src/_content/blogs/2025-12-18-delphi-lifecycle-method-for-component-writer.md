---
title: Lifecycle Method ที่สำคัญสำหรับ Delphi Component Writer
date: 2025-12-18
tags: ['delphi']
intro: บทความนี้จะพาคุณไปรู้จัก Lifecycle Method ที่ Delphi Component Writer ควรรู้ เช่น Create, Free, Loaded, Notification พร้อมอธิบายวัตถุประสงค์และตัวอย่างการใช้งานจริง เพื่อให้ผู้อ่านสามารถสร้าง Component ที่เสถียร ปลอดภัย และพร้อมในใช้งานทั้งในสถานะการ Design-Time และ Runtime
seo: Lifecycle Method ที่สำคัญสำหรับ Delphi Component Writer เช่น Create, Free, Loaded, Notification พร้อมตัวอย่างการใช้งานจริงและแนวคิด Lifecycle ของ Component เพื่อรองรับการใช้งาน ทั้ง Design-Time และ Runtime
image: 2025-12-18-delphi-lifecycle-method-for-component-writer.png
---

# Lifecycle Method ที่สำคัญสำหรับ Delphi Component Writer

การพัฒนา Custom **Component** ใน Delphi เป็นหนึ่งใน Feature สำคัญที่ทำให้ Delphi ได้รับความนิยมมาอย่างยาวนานจนถึงปัจจุบัน โดยเฉพาะใน Delphi เวอร์ชั่นล่าสุดก็ยังคงรองรับการพัฒนา Custom **Component** โดยใช้ **Paradigm** แบบ **OOP**

หัวใจสำคัญของการพัฒนา **Component** ให้ทำงานถูกต้อง ปลอดภัย และใช้งานได้ดีทั้งใน **Designer-time** (ตั้งค่าผ่าน **Object Inspector**) และ **Runtime** โดยการเขียนโค้ดนั้น Component Writer จำเป็นที่จะต้องเข้าใจ **Lifecycle การทำงานของ Component** และ **Method** หลักที่สำคัญที่ Delphi ได้เตรียมไว้ให้

> นักพัฒนา Delphi หลายท่านนิยมเรียก **Component** ว่า **VCL (Visual Component Library)**

### Visual Component & Non-Visual Component

- Visual Component คือ Component ที่มีลักษณะเป็น UI เพื่อถูกใช้สำหรับการแสดงผลลัพธ์หรือการรับค่าอินพุตต่างๆ เช่น `TForm`, `TButton`, `TEdit`, ฯลฯ
- Non-Visual Component คือ Component ที่ทำงานใน Backgroud ระหว่างที่แอพพลิเคชั่นกำลังทำงาน โดยผู้ใช้งานจะไม่สามารถมองเห็น Component เหล่านี้ได้ ทั้งที่พวกมันกำลังทำงานอยู่ เช่น `TTimer`, `TFDQuery`, `TImageList`, ฯลฯ

บทความนี้จะพาไปรู้จัก จะข้อเน้นตัวอย่างไปที่การพัฒนา Non-Visual Component โดย Method ตัวอย่างที่จะพูดถึงในบทความนี้คือ
`Create`, `Destroy`, `Free`, `Loaded`, `Notification` และอื่นๆ พร้อมตัวอย่างการใช้งาน

## เริ่มต้นพัฒนา Component

อ่านเพิ่มเติมเกี่ยวกับ [OOP Concept และ คำศัพท์สำหรับ Delphi Component Writer](/blogs/2025-12-17-oop-concept-for-delphi-component-writer)

### โค้ดเทมเพลทพื้นฐานที่จำเป็นสำหรับการพัฒนา Component

```pascal
unit MyComponent;

interface

uses
  System.Classes;

type
  TMyComponent = class(TComponent) // สืมทอดความสามารถต่อจาก TComponent
  end;

implementation

end.
```

> จากตัวอย่างโค้ดข้างต้น Component ใหม่ของเรา `TMyComponent` จะมีคุณสมบัติเท่ากับ Component ต้นแบบ (`TComponent`) ทุกประการโดยยังไม่มีคุณสมบัติใหม่เพิ่มเติม

### 1. constructor Create – จุดเริ่มต้นของการกำเนิด Component

**วัตถุประสงค์**

`Create` เป็นเมธอดประเภท `constructor` ที่จะถูกเรียกเมื่อมีคำสั่งสร้าง Component วัตถุประสงค์ของการโค้ดในเมธอดนี้คือ

- กำหนดค่าเริ่มต้น (Default Value)
- สร้าง Object หรือ Component ที่ใช้ภายใน Component เอง

```pascal
type
  TMyComponent = class(TComponent)
  private
    FAbout: string;
    FList: TStringList;
  public
    constructor Create(aOwner: TObject); override;
  published
    property About: string read FAbout;
  end;

implementation

constructor TMyComponent.Create(aOwner: TObject);
begin
  inherited;

  FAbout := 'TMyComponent Version 0.1 by tutor4dev';
  FList := TStringList.Create;
end;

end.
```

> **Precautions**
>
> เมธอด `Create` จะต้องเรียก `inherited Create(aOwner)` หรือเรียกแค่ `inherited` เหมือนในตัวอย่างก็ได้ในกรณีที่ Component ใหม่ของเรามี **Method Signature** เหมือนกันกับ Component ต้นฉบับ

### 2. destructor Destroy – การคืนทรัพยากรอย่างถูกต้อง

**วัตถุประสงค์**

เมธอด `Destroy` ใช้สำหรับ

- Free Object ที่สร้างขึ้นเอง
- คืนหน่วยความจำ
- ปิด Resource ต่างๆ (File, Stream, Timer)

> **Precautions:**
>
> **Object** ซึ่งเป็น **Member** ของ Component ควรจะต้องถูก **Free** ที่ **Destroy**

```pascal
type
  TMyComponent = class(TComponent)
  private
    FList: TStringList;
  public
    constructor Create(AOwner: TComponent); override;
    destructor Destroy; override;
  end;

constructor TMyComponent.Create(AOwner: TComponent);
begin
  inherited;

  FList := TStringList.Create; // สร้าง Object
end;

destructor TMyComponent.Destroy;
begin
  FList.Free; // ทำงาน Object

  inherited;
end;
```

### 3. Free – วิธีทำลาย Object อย่างปลอดภัย

**วัตถุประสงค์**

`Free` เป็นเมธอดที่ใช้เรียกเมธอด `Destroy` แบบปลอดภัยถ้า **Object** เป็น `nil` และเรียกใช้ `Free` จะไม่เกิด Error

```pascal
MyComponent.Free; // ปลอดภัยกว่าการเรียก Destroy โดยตรง
```

> **Precautions**
>
> ❌ อย่าเรียก `Destroy` โดยตรง
> ✅ เรียก `Free` เพื่อทำทำลาย Object โดย `Free` จะเรียก `Destroy` ให้โดยอัตโนมัติ

### 4. Loaded – หลังจากอ่านค่าจาก **.dfm** เสร็จแล้ว

**วัตถุประสงค์**

`Loaded` จะถูกเรียกหลังจาก **Object Inspecto**r โหลดค่า **Property** ของ Component ถูกโหลดจาก **.dfm**

```pascal
type
  TMyComponent = class(TComponent)
  private
    FFDQuery: TFDQuery;
    FCachedUpdates: Boolean;
    procedure SetFDQuery(aFDQuery: TFDQuery);
  protected
    procedure Loaded; override;
  published
    property FCachedUpdates: Boolean read FCachedUpdate write FCachedUpdates;
    property FDQuery: TFDQuery read FFDQuery write SetFDQuery;
  end;

procedure TMyComponent.Loaded;
begin
  inherited;

  FFDQuery.CachedUpdates := FCachedUpdates; // กำหนดค่าได้อย่างมั่นใจว่าทั้ง FFDQuery และ FCachedUpdates ได้รับการ Assigned ค่าครบถ้วนทั้ง 2 ตัวแล้ว
end;

procedure TMyComponent.SetFDQuery(aFDQuery: TFDQuery);
begin
  FFDQuery := aFDQuery;

  // FFDQuery.CachedUpdates := FCachedUpdates; // FCachedUpdates อาจยังไม่ถูก Assign ค่า
end;
```

> เนื่องจากเราไม่สามารถมั่นใจได้ว่าในขณะ Runtime ซึ่งเมธอด `SetFDQuery` กำลังทำงานนั้น `FCachedUpdates` ได้รับการ **Assign** ค่าแล้วหรือไม่

### 5. Notification – ตรวจจับการถูกลบของ Component อื่น

**วัตถุประสงค์**

ใช้ตรวจสอบเมื่อ Component ที่เราอ้างอิงอยู่ถูกสร้างหรือถูกลบ สำคัญมากเมื่อ Component มีการอ้างอิงกัน

```pascal
type
  TMyComponent = class(TComponent)
  private
    FDataSet: TDataSet;
  protected
    procedure Notification(aComponent: TComponent; Operation: TOperation); override;
  published
    property DataSet: TDataSet read FDataSet write FDataSet;
  end;

procedure TMyComponent.Notification(aComponent: TComponent; Operation: TOperation);
begin
  inherited;

  if (Operation = opRemove) and (FDataSet = aComponent) then
    FDataSet := nil;
end;
```

> ป้องกัน **Access Violation** ในกรณีที่ผู้ใช้ลบ **DataSet** ที่ได้กำหนดค่าให้กับ **Property** `TMyComponent.DataSet` ไว้แล้วไปลบ **DataSet** ทิ้งจาก **Form**, **DataModule** ในภายหลัง หรือถูกลบในขณะ **Runtime**

### 6. Assign – คัดลอกค่าระหว่าง Component

**วัตถุประสงค์**

ใช้สำหรับคัดลอก **Property** จาก Component หนึ่งไปยังอีกตัวมักใช้กับ `TPersistent`

```pascal
procedure TMyComponent.Assign(Source: TPersistent);
begin
  if Source is TMyComponent then
    FText := TMyComponent(Source).FText
  else
    inherited;
end;
```

### 7. DefineProperties – ควบคุมการเขียนลง **.dfm**

**วัตถุประสงค์**

ใช้กำหนด **Property** พิเศษที่ไม่ใช่ `published` **Property** หรือเก็บข้อมูลในรูปแบบเฉพาะ มักใช้ใน Component ระดับ Advanced

```pascal
procedure DefineProperties(Filer: TFiler); override;
```

## สรุป Lifecycle ของ Component (เข้าใจง่าย)

1. เมธอด `Create` ทำงาน
2. **Object Inspector** โหลดค่า **Property** จาก **.dfm**
3. เมธอด `Loaded` ทำงาน
4. `Notification` ทำงานในกรณีที่ Component ตัวอื่นถูกลบ
5. `Destroy` ทำงานโดยถูกเรียกผ่าน `Free`
