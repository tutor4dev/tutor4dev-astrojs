---
title: ติดตั้ง Home Assistant โดยใช้ TinyCore Linux
date: 2025-11-19
tags: ['iot']
intro: TinyCore Linux คือระบบปฏิบัติการ Linux ที่มีขนาดเล็กอย่างเหลือเชื่อซึ่งมีขนาดเพียง 2x MB เท่านั้น บทความนี้จึงขอใช้ TinyCore Linux ในการติดตั้ง Home Assistant (Home Automation Platform) แทนวิธีการติดตั้งใน Documation ของ Official Site ซึ่งแนะนำให้ใช้ Ubuntu ซึ่งมีขนาดของ Image ถึง 3.x-4.x GB
seo: TinyCore Linux คือระบบปฏิบัติการ Linux ที่มีขนาดเล็กอย่างเหลือเชื่อซึ่งมีขนาดเพียง 2x MB เท่านั้น บทความนี้จึงขอใช้ TinyCore Linux ในการติดตั้ง Home Assistant (Home Automation Platform) แทนวิธีการติดตั้งใน Documation ของ Official Site ซึ่งแนะนำให้ใช้ Ubuntu ซึ่งมีขนาดของ Image ถึง 3.x-4.x GB
image: 2025-11-19-install-home-assistant-using-tiny-core.png
---


# ติดตั้ง Home Assistant โดยใช้ TinyCore Linux

**TinyCore Linux** คือระบบปฏิบัติการ Linux ที่มีขนาดเล็กอย่างเหลือเชื่อซึ่งมีขนาดเพียง 2x MB เท่านั้น บทความนี้จึงขอใช้ **TinyCore Linux** ในการติดตั้ง Home Assistant (Home Automation Platform) แทนวิธีการติดตั้งใน Documation ของ Official Site ซึ่งแนะนำให้ใช้ Ubuntu ซึ่งมีขนาดของ Image ถึง 3.x-4.x GB

## Home Assistant คือ?

**Home Assistant** (**HAOS**) คือ ซอฟต์แวร์โอเพนซอร์ส (Open Source) ที่ใช้เป็นศูนย์กลางในการควบคุมและสร้างระบบอัตโนมัติ (Home Automation) ให้กับอุปกรณ์ Smart Home ต่างๆ ในบ้านของเรา

- ศูนย์กลางควบคุมที่เชื่อมต่อและควบคุมอุปกรณ์สมาร์ทโฮมได้หลากหลายยี่ห้อและโปรโตคอล (เช่น ไฟ, ปลั๊ก, เซ็นเซอร์, กล้อง, ลำโพง) ไว้ในที่เดียว
- เป็นซอฟต์แวร์ที่ติดตั้งและทำงานบนเซิร์ฟเวอร์ส่วนตัวของเราเอง (เช่น Generic x86-64, Raspberry Pi, อื่นๆ) ทำให้ไม่ต้องพึ่งพา Cloud Server ของผู้ผลิตแต่ละราย เพิ่มความเป็นส่วนตัวและความปลอดภัย
- สามารถสร้างระบบอัตโนมัติที่ซับซ้อนตามความต้องการและไม่ถูกจำกัดโดยแบรนด์ใดแบรนด์หนึ่ง

## ปัญหาการติดตั้ง HAOS บน Generic x86-64

Official Site ได้แนะนำวิธีการติดตั้ง **HAOS** สำหรับ [Generic x86-64](https://www.home-assistant.io/installation/generic-x86-64/)

### 1. การติดตั้งด้วยวิธีการ Flash Harddisk/SSD

การติดตั้ง **HAOS** ด้วยวิธีนี้สร้างความยุ่งยากให้กับผู้ที่ไม่ต้องการยุ่งกับการติดตั้ง Hardware อีกทั้ง Mini PC บางรุ่นไม่สามารถถอด Harddisk/SSD ได้

### 2. การติดตั้งด้วยวิธีการ ดาวน์โหลดและบูทเครื่องด้วย Ubuntu และ ใช้ Utility App ในการ Flash Harddisk/SSD

การติดตั้ง **HAOS** ด้วยวิธีนี้ ต้องทำการดาวน์โหลด Image ของ Ubuntu ซึ่งมีขนาดใหญ่ (3-4.x GB) เพื่อมาทำ Bootable USB Flash Drive

### ใช้ TinyCore Linux แทน Ubuntu

ในบทความนี้จึงขอแนะนำวิธีการใช้ **TinyCore Linux** Image แทน Ubuntu Image เนื่องจากมีขนาดเล็กกระทัดรัด (2x MB) โดยจะมีขั้นตอนการคร่าวๆ ดังนี้

1. ดาวน์โหลด Image **TinyCore Linux** และ **HAOS**
2. ทำ Bootable USB ด้วย Ventoy
3. บูต PC ด้วย **TinyCore Linux**
4. Mount USB Partition และติดตั้ง **HAOS**

## Ventoy คือ ?

![](https://www.ventoy.net/static/img/screen/screen_bios2.png)

**Ventoy** คือ ซอฟต์แวร์โอเพนซอร์ส (Open-Source) ที่ใช้สำหรับสร้าง USB Bootable Drive ที่มี Feature ที่น่าสนใจดังนี้

1. สามารถใช้ Flash Drive เพียงตัวเดียวเลือกบูต/ติดตั้งระบบปฏิการได้หลากหลาย โดยเมื่อติดตั้ง **Ventoy** ลงใน Flash Drive แล้วเราสามารถเก็บไฟล์ Image (.iso, .img, ฯลฯ) ของระบบปฏิบัติการต่างๆ (เช่น Windows, Linux, Windows PE) เพื่อเป็นตัวเลือกในการใช้งานในแต่ละครั้ง
2. สามารถแบ่ง Partition (**Preserved Space**) ใน Flash Drive ได้เพื่อใช้จัดเก็บ Image/ไฟล์ เพิ่มเติมอื่นๆ

### Preserved Space คือ ?

**Preserved Space** ใน **Ventoy** คือ พื้นที่ว่างที่ถูกสงวนไว้ (Reserved Space) ที่ส่วนท้ายของ Flash Drive

โดยปกติ **Ventoy** จะสร้าง 2 Partition (Partition สำหรับบูตและเก็บไฟล์ Image สำหรับ OS) แต่ฟังก์ชันนี้จะกันพื้นที่ไว้ให้กับ Partition ที่ 3 เพื่อใช้ในการเก็บ Image/ไฟล์เพิ่มเติมอื่นๆ ซึ่งในบทความนี้เราจะใช้เก็บ **HAOS** Image

> เหตุที่เราไม่สามารถเก็บ **HAOS** Image ใน Partition เดียวกันกับ **TinyCore Linux** Image เนื่องจากหลังจากบูตเข้าระบบด้วย **TinyCore Linux** แล้ว Partition ดังกล่าวจะไม่สามารถถูกเข้าถึงได้

![](https://www.ventoy.net/static/img/disklayout_reserve.png)

### สร้าง Bootable USB Flash Drive

1. ดาวน์โหลด [**Ventoy**](https://www.ventoy.net/en/download.html)

2. ติดตั้ง **Ventoy** โดยเลือก Option เพื่อสร้าง **Preserved Space** ตามรูป

![](https://www.ventoy.net/static/img/ventoy2disk2_en.png)

![](https://www.ventoy.net/static/img/reserved_space_en.png)

3. Format **Preserved Space** Partition ด้วย *FAT*

![](https://i.imgur.com/4PfQf35.png)

>  Format **Preserved Space** Partition ด้วย *FAT* เนื่องจาก Linux ไม่สามารถอ่าน *NTFS* Partition ได้

4. ดาวน์โหลด [**TinyCore Linux**](https://distro.ibiblio.org/tinycorelinux/downloads.html) และ [**HAOS** Image](https://www.home-assistant.io/installation/generic-x86-64/)
5. Copy **TinyCore Linux** ➡️ Parition ที่ 2
6. Copy **HAOS** Image ➡️ Partition ที่ 3

## เริ่มการติดตั้ง HAOS

### 1. บูตเครื่องโดยใช้ Ventoy Bootable USB

1. บูตเครื่องโดยใช้ Ventoy Bootable USB
2. เลือก **TinyCore Linux**

### 2. Mount Preserved Space Partition

ทำการตรวจสอบ USB โดยพิมพ์คำสั่ง `lsblk` ใน Terminal โดย Bootable USB จะถูกอ้างอิงด้วย *sdb* และ **Preserved Space** จะถูกอ้างอิงด้วย *sdb3*

```sh
# lsblk

sdb
├─sdb1   13G  exfat  <-- this is the Ventoy data partition (tinycore.iso, ubuntu.iso)
├─sdb2   32M  fat    <-- this is the EFI boot partition
├─sdb3   1G   fat    <-- this is the preserved partition (haos.img.xz)
```

ตรวจสอบโปรแกรมพิ้นฐานบน **TinyCore Linux** เช่น `busybox`, `xz`, `dd`

```sh
busybox --help
xz --help
dd --help
```

Mount Preserved Splace

```sh
# mount the usb
fdisk -l
mkdir /mnt/usb
# sda3 is the third partition ventoy bootable USB which stores the .img.xz file, where sdb1 stores the .iso file
sudo mount /dev/sdb3 /mnt/usb
ls /mnt/usb
```

จัดการ Partition และ Format SSD สำหรับติดตั้ง **HAOS**

```sh
# list all partition on the SSD
fdisk -l /dev/sda

# fdisk to delete all partition from the SSD
fdisk /dev/sda
# type p to list all partition
# type o to create new disk (delete all partitions)
# type w to write the changes (result in new disk with no partitions)

# decompress + flash the SSD
xz -dc /mnt/usb/haos.img.xz | dd of=/dev/sda bs=4M && sync
```

ถอด Bootable USB และทำการรีบูต ก็จะเป็นการบูตเข้าสู่ **HAOS** เป็นอันเสร็จสิ้นครับ