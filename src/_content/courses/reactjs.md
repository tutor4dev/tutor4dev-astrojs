---
title: React.js Fundamental
seo: เรียนรู้แนวคิดหลักของ React ตั้งแต่พื้นฐานจนถึงระดับกลาง-สูง ครอบคลุม useState, useEffect, useReducer, การจัดการ State, การใช้ Context, การสร้าง Custom Hook, การ Optimize Performance ด้วย Memoization และแนวทางการออกแบบโครงสร้างโปรเจกต์ React อย่างมีประสิทธิภาพ
---

# React.js Fundamental

### ระยะเวลาและรูปแบบการอบรม

- ระยะเวลาของหลักสูตร: 2 วัน (12 ชั่วโมง) หรือ 3 วัน (18 ชั่วโมง)
- รูปแบบการอบรม: In-house Training ณ.องค์กร หรือ หน่วยงาน ของผู้อบรม

!!!qrcode.md

### Prerequisite

- พื้นฐานการเขียนโปรแกรมภาษา HTML
- พื้นฐานการเขียนโปรแกรมภาษา JavaScript

### วัตถุประสงค์ของหลักสูตร

- เพื่อให้ผู้เข้าร่วมอบรมมีความรู้ความเข้าใจพื้นฐานเกี่ยวกับ React.js
- เข้าใจแนวคิดของการพัฒนา Web Application แบบ Component-Based
- เข้าใจหลักการทำงานของ Virtual DOM และการจัดการสถานะ (state)
- เข้าใจการส่ง `props` ระหว่าง Components และการจัดการ Life Cycle
- ใช้งาน `useState`, `useEffect` และ Hooks ต่างๆ

### เนื้อหาของหลักสูตร

#### Recap Core Concepts in React

- React.js Overview
- JSX, `props`, `useState()`, Component Tree
- Functional Component Best Practices

#### Thinking in React

- วิเคราะห์ UI เป็น Component
- วางโครงสร้างการแบ่ง State และ `props`

#### Sharing State Between Components

- Lifting-up State
- Callback Function ผ่าน `props`

#### Extracting State Logic into Reducer

- ใช้งาน `useReducer`
- เขียน Reducer Function
- จัดการ Complex State (`object`/`array`)

#### Deep `props` using Context

* ปัญหา `props` Drilling
* React Context
* ใช้งาน `useContext`

#### Preserving and Resetting State

- การ Preserve State ระหว่าง Render
- การ Reset State อย่างถูกต้อง

#### Unnecessary State

- แนวคิด Derived State
- ทำไมไม่ควรเก็บทุกอย่างใน State
- ตัวอย่าง Common Anti-patterns

#### Synchronizing with Effects

- ใช้งาน `useEffect`
- ทำงานกับDSide Effects (API, timeout, event listener)
- เข้าใจ dependency Array อย่างถูกต้อง

#### Cleanup Logic in `useEffect`

- การป้องกัน Memory Leak
- `useEffect` Cleanup Pattern

#### Fetching Data with `useEffect` + Error Handling

- การจัดการ Loading, Success, Error State
- การใช้ `AbortController`

#### Building Custom Hooks

- Custom Hook Overview
- แนวทางการแยก Logic ออกจาก UI

#### Memoization (Performance Optimization)

- `React.memo`, `useMemo`, `useCallback` Overview

#### Component Composition & Children `props`

- แนวคิด Component as `props`
- การส่ง JSX เป็น `children`
- Slot-like Pattern

#### Project Structure & Best Practices

- จัดโครงสร้างโปรเจกต์ React อย่างไรให้ง่ายต่อการดูแล
- State: Local vs. Context vs. Global
- แนวทางเขียนโค้ดให้ Testable และ Reusable

#### Mini Project

**"Task Manager Pro"**

- Add/Edit/Delete Tasks
- Filter by Status
- Theme Toggle (Context)
- Persist tasks with `localStorage` (Custom Hook)
- ใช้ Reducer หรือ `useEffect`
