---
title: ติดอาวุธให้กับ Windows ด้วย scoop.sh
date: 2025-12-01
tags: ['command-line', 'windows']
intro: scoop.sh เป็นตัวช่วยจัดการโปรแกรม (Package Manager) บน Windows ที่ช่วยให้การติดตั้งโปรแกรมผ่าน Command Line Interface (CLI) เป็นเรื่องง่ายและมีประสิทธิภาพ บทความนี้จะอธิบายขั้นตอนการติดตั้ง scoop.sh พร้อมแนวทางการใช้งานพื้นฐานเพื่อให้ผู้ใช้สามารถจัดการเครื่องมือพัฒนาได้สะดวกและมีประสิทธิภาพยิ่งขึ้น
seo: คู่มือการติดตั้ง scoop.sh บน Windows สำหรับจัดการแพ็กเกจด้วย CLI พร้อมคำสั่งและขั้นตอนอย่างละเอียด เหมาะสำหรับนักพัฒนาและผู้ใช้งานระดับมืออาชีพ
image: 2025-12-01-scoop-best-windows-package-manager.png
active: true
---

# ติดอาวุธให้กับ Windows ด้วย scoop.sh

**scoop.sh** เป็นตัวช่วยจัดการโปรแกรม (Package Manager) บน Windows ที่ช่วยให้การติดตั้งโปรแกรมผ่าน **Command Line Interface** (**CLI**) เป็นเรื่องง่ายและมีประสิทธิภาพ บทความนี้จะอธิบายขั้นตอนการติดตั้ง **scoop.sh** พร้อมแนวทางการใช้งานพื้นฐานเพื่อให้ผู้ใช้สามารถจัดการเครื่องมือพัฒนาได้สะดวกและมีประสิทธิภาพยิ่งขึ้น

## scoop.sh คือ ?

**scoop.sh** เป็นตัวช่วยจัดการโปรแกรม (Package Manager) บน Windows ที่ช่วยให้การติดตั้งโปรแกรมผ่าน **Command Line Interface** (**CLI**) ได้อย่างรวดเร็วและมีประสิทธิภาพโดยไม่ต้องดาวน์โหลดไฟล์ติดตั้งด้วยตนเอง อีกทั้งยังลดปัญหาการกำหนดตัวแปร `PATH` ซ้ำซ้อนและจัดเก็บโปรแกรมอย่างเป็นระเบียบในโฟลเดอร์เดียว ทำให้ง่ายต่อการอัปเดตหรือถอนการติดตั้ง

### Prerequisites

1. Windows เวอร์ชั่น 7+
2. PowerShell เวอร์ชั่น 5+
3. เปิดใช้งาน `Execution Policy – RemoteSigned`


```powershell
# ตรวจสอบเวอร์ชัน PowerShell
VersionTable.PSVersion
```

### ตั้งค่า Execution Policy

```powershell
# ตั้งค่า Execution Policy
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### ติดตั้ง scoop.sh

```powershell
# ติดตั้ง scoop.sh
iwr -useb get.scoop.sh | iex
```

```powershell
# ตรวจสอบการติดตั้ง scoop.sh
scoop --version
```

> หลังจากติดตั้ง **scoop.sh** เรียบร้อยแล้ว เราสามารถใช้งาน **scoop.sh** ได้ทั้งบน **PowerShell** และ **cmd**

### ติดตั้งโปรแกรมพื้นฐานด้วย scoop.sh

```powershell
scoop install git
scoop install 7zip
scoop install nodejs
```

### เพิ่ม `bucket` สำหรับติดตั้งโปรแกรม

```powershell
scoop bucket add extras
```

> ใน scoop.sh `bucket` คือ Manifest Repository ที่เก็บข้อมูลสำหรับใช้ในการติดตั้งโปรแกรมแต่ละตัว โดยภายใน `bucket` จะมีไฟล์ JSON อธิบายว่าโปรแกรมแต่ละตัวนั้นต้องติดตั้งอย่างไร ดาวน์โหลดจากที่ไหน ต้องการ Dependency อะไรในการติดตั้ง
>
> `bucket` อื่นๆที่สามารถติดตั้งเพิ่มได้เช่น `extras`, `games`, `versions`, `nerd-fonts`

### Maintenance scoop.sh

```powershell
# update รายการ Repositories ของโปรแกรม
scoop update

# ตรวจสอบสถานะของโปรแกรมที่ติดตั้งด้วย scoop.sh
scoop status

# upgrade โปรแกรมเป็นเวอร์ชั่นล่าสุด
scoop upgrade <app>
scoop upgrade *
```

## สรุป

**scoop.sh** เป็นตัวช่วยจัดการโปรแกรม (Package Manager) บน Windows ที่สะดวกและเหมาะสำหรับนักพัฒนาอย่างยิ่ง ด้วยขั้นตอนติดตั้งที่ง่ายและชุดคำสั่งที่เป็นมาตรฐาน ผู้ใช้สามารถควบคุมเวอร์ชันของเครื่องมือพัฒนาได้อย่างเป็นระบบ ลดภาระในการจัดการไฟล์ติดตั้งแบบเดิม
