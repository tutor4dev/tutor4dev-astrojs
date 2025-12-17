---
title: React.js Context API Best Pratices อย่างมือโปร
date: 2025-12-18
tags: ["reactjs", "javascript"]
intro: React Context API เป็นเครื่องมือที่หลายคนรู้จัก แต่มีน้อยคนที่ใช้อย่างถูกต้องในระดับ Production บทความนี้จะพาคุณเรียนรู้ Pattern การใช้งาน Context API แบบมืออาชีพ ตั้งแต่การออกแบบโครงสร้าง การแยก Concern ไปจนถึงการหลีกเลี่ยงปัญหา Performance ที่พบบ่อย พร้อมตัวอย่างโค้ดที่นำไปใช้ได้จริ
seo: เรียนรู้ Pattern การใช้งาน React Context API แบบมืออาชีพ พร้อมตัวอย่าง Practical อธิบายโค้ดจริง เหมาะสำหรับการใช้งานใน Production และหลีกเลี่ยงปัญหา performance
image: 2025-12-18-use-reactjs-context-api-like-professional.png
active: true
---

# React.js Context API Best Pratices อย่างมือโปร

React.js Context API เป็นเครื่องมือที่ทรงพลังแต่ก็มักถูกใช้งานผิดวิธีหลายโปรเจกต์จนอาจเจอกับปัญหาเช่น

- Context ใหญ่เกินไป → Re-render ทั้งแอป
- โค้ด Logic ปนกับ UI
- นำ Context ไปเป็น **Global State** แบบไม่ตั้งใจ
- ไม่เหมาะที่จะถูกนำมาใช้งานแทน **State Management** เช่น **Redux**, **Zustand** หรือ อื่นๆ

### Context API เหมาะกับอะไร ?

✅ **เหมาะกับ Context API**

- Theme: (Dark / Light)
- Auth: (User, Token)
- Locale: (TH/EN)
- Feature: Flags
- Global UI State (Modal, Toast)

❌ **ไม่เหมาะกับ Context API**

- State ที่เปลี่ยนบ่อยมาก (เช่น Form Input)
- Data ขนาดใหญ่ (Table, List)
- State เฉพาะ component

## Pattern ที่ 1: Split Context + Custom Hook (พื้นฐานที่ควรทำทุกครั้ง)

### ❌ Anti-Pattern ที่พบบ่อย

```jsx
export const AppContext = createContext();

<AppContext.Provider value={{ user, setUser, theme, cart }}>
```

**ปัญหา**

- Context มีขนาดใหญ่
- Re-render ในทุก Consumer
- ยากในการ Maintenance

### ✅ Professional Pattern

**AuthContext.jsx**

```jsx
import { createContext } from "react";

export const AuthContext = createContext(null);
```

**AuthProvider.jsx**

```jsx
import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

📌 **ข้อดี**

- Logic รวมอยู่ใน Provider
- Component ที่ใช้ไม่ต้องรู้ Implementation

**useAuth.mjs**

```js
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
```

📌 **ข้อดี**

- ป้องกันการใช้ Context นอก Provider
- DX (Developer Experience) ดีขึ้นมาก

**Profile.jsx**

```jsx
function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      <p>Hello {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Pattern ที่ 2: แยก State กับ Action (Reducer Pattern)

**themeReducer.mjs**

```js
function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        mode: state.mode === "light" ? "dark" : "light",
      };
    default:
      throw new Error("Unknown action");
  }
}
```
**ThemeProvider.jsx**

```jsx
import { createContext, useReducer } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    mode: "light",
  });

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

📌 **ข้อดีของ Reducer Pattern**

- Logic ชัดเจน
- ง่ายต่อการ Scale
- Predictable State

## Pattern ที่ 3: Multiple Context

> แตกเป็นหลาย Context ดีกว่า Context ขนาดใหญ่เพียงหนึ่งเดียว

```jsx
<AuthProvider>
  <ThemeProvider>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </ThemeProvider>
</AuthProvider>
```

📌 **ข้อดีของ Multiple Context**

- แยก Concern
- ลดdki Re-render
- โค้ดอ่านง่าย

## สรุป Best Practices

✅ **เหมาะกับ Context API**

- State เป็น Global
- State นั้นมีการเปลี่ยนแปลงไม่บ่อย

✅ **ควรทำเสมอ**

- แตก Context ตาม Concern
- ใช้ Custom Hook ร่วมกับ Context
- แยกโค้ด Logic ออกจาก UI
- ใช้ Reducer เมื่อ State มีความซับซ้อน

❌ **ควรหลีกเลี่ยง**

- Context ขนาดใหญ่เพียงหนึ่งเดียว
- นำมาใช้แทนที่ State Management
