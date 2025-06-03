# 🚀 Product Hunt Clone with Nuxt 3

A full-stack Product Hunt–style web application built using **Nuxt 3**, **Express.js**, **MongoDB**, and **Tailwind CSS**. Users can register, submit products, upvote, and comment — all in a modern, mobile-responsive interface.

---

## 🔥 Live Preview

https://product-hunt-pi.vercel.app/

---

## 🧩 Core Features

### 🔐 Authentication (JWT-based)
- User registration and login
- Auth-protected routes using JWT
- Persistent login via secure tokens

### 📝 Product Submission
- Form includes: name, tagline, description, website URL
- Logo/image upload
- Category selection: AI, SaaS, Devtools, Other

### 🌍 Explore Page
- Product listing by category
- Filter: category
- Sort: trending or latest

### 📄 Product Detail Page
- Full product info: logo, name, description, link
- Submitted by user info
- Comments section with real-time posting
- Upvote/unvote support

### 👍 Upvoting System
- Authenticated users can upvote/unvote
- Vote count updates immediately
- Prevents double voting

### 💬 Commenting
- Add text comments to product detail pages
- Comments show username and message
- Works in real-time per session

### 👤 User Profile Page
- Shows products submitted by the user
- Displays upvoted products
- Personal information and avatar

---

## 🛠️ Tech Stack

| Frontend        | Backend         | Database  | Styling         | Other |
|----------------|-----------------|-----------|------------------|-------|
| Nuxt 3 (Vue 3) | Express.js       | MongoDB   | Tailwind CSS     | JWT, Multer (file uploads) |

---




## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/producthunt-clone.git
cd producthunt-clone


npm install



