<div align="center">

# 🎌 Anime Explorer

**ค้นพบ ติดตาม และบันทึกอนิเมะที่คุณชื่นชอบ**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-5-FF6B35?style=for-the-badge)](https://zustand-demo.pmnd.rs)

</div>

---

## ภาพรวม

Anime Explorer เป็น Web Application สำหรับค้นหาและติดตามอนิเมะ ดึงข้อมูลจาก **Jikan API v4** (MyAnimeList) โดยไม่ต้องใช้ API Key พร้อมระบบบันทึก Favorites และ Watch Later ที่คงอยู่แม้ปิด Browser

---

## Features

| Feature | รายละเอียด |
|---|---|
| 🔍 **ค้นหาอนิเมะ** | Search พร้อม Debounce 500ms เพื่อลด API calls |
| 🎭 **กรองตาม Genre** | Dropdown filter เลือก Genre ได้หลายรายการ |
| 🏆 **Hero Banner** | แสดงอนิเมะยอดนิยมประจำซีซั่นแบบ Full-screen |
| 📺 **Popular This Season** | Grid แสดงอนิเมะยอดนิยมพร้อม Pagination |
| 📈 **Trending** | Top trending anime พร้อมสถิติ rating และ views |
| ❤️ **Favorites** | บันทึก-ลบรายการโปรด (เก็บใน localStorage) |
| 🕐 **Watch Later** | บันทึกรายการไว้ดูทีหลัง (เก็บใน localStorage) |
| 📄 **Anime Detail Modal** | ดู synopsis, genres, rating, studio และข้อมูลเพิ่มเติม |
| 🔔 **Toast Notifications** | แจ้งเตือนทุก action ด้วย Sonner |
| 📱 **Responsive Design** | รองรับทุกขนาดหน้าจอ (Mobile → Desktop) |

---

## Tech Stack

```
Frontend    │ React 19 + TypeScript 5.9
Build Tool  │ Vite 8
Styling     │ Tailwind CSS v4
State       │ Zustand 5 (with localStorage persistence)
Routing     │ React Router DOM v7
HTTP Client │ Axios
API         │ Jikan API v4 (MyAnimeList — ฟรี, ไม่ต้องใช้ Key)
Icons       │ Lucide React
Toast       │ Sonner
```

---

## โครงสร้างโปรเจกต์

```
src/
├── components/
│   ├── AnimeCard.tsx          # การ์ดอนิเมะแต่ละรายการ
│   ├── AnimeDetailModal.tsx   # Modal แสดงรายละเอียด
│   ├── AnimeGrid.tsx          # Grid + Hero + Pagination
│   ├── HeroSection.tsx        # Banner อนิเมะแนะนำ
│   ├── SearchBar.tsx          # ช่องค้นหา + กรอง Genre
│   └── Sidebar.tsx            # เมนูนำทาง (Responsive)
├── pages/
│   ├── Home.tsx               # หน้าหลัก (ค้นพบอนิเมะ)
│   ├── Trending.tsx           # อนิเมะ Trending
│   ├── Favorites.tsx          # รายการโปรด
│   └── WatchLater.tsx         # ดูทีหลัง
├── store/
│   └── watchlistStore.ts      # Zustand store (favorites + watchLater)
├── services/
│   └── animeService.ts        # Jikan API integration
├── types/
│   └── types.ts               # TypeScript interfaces
└── layouts/
    └── RootLayout.tsx         # Layout หลักของแอป
```

---

## เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

- Node.js 18+
- npm หรือ pnpm

### ติดตั้งและรัน

```bash
# Clone repository
git clone https://github.com/your-username/anime-explorer.git
cd anime-explorer

# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev
```

เปิด Browser ที่ **http://localhost:5173**

### Scripts

```bash
npm run dev       # รัน dev server พร้อม HMR
npm run build     # Build สำหรับ production
npm run preview   # Preview production build
npm run lint      # ตรวจสอบ code ด้วย ESLint
```

---

## API

โปรเจกต์นี้ใช้ **[Jikan API v4](https://docs.api.jikan.moe/)** ซึ่งเป็น REST API ของ MyAnimeList ที่ใช้งานได้ฟรีโดยไม่ต้องลงทะเบียน

| Endpoint | การใช้งาน |
|---|---|
| `/seasons/now` | อนิเมะยอดนิยมประจำซีซั่น |
| `/anime?q=...` | ค้นหาอนิเมะ |
| `/top/anime` | อนิเมะ Trending |
| `/genres/anime` | รายการ Genre ทั้งหมด |

---

<div align="center">

Built with ❤️ using React + TypeScript

</div>
