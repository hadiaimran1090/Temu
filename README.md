# ✨ Temu E-Commerce Store – Shop Like a Billionaire ✨

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&size=28&pause=1000&color=FF5B2E&center=true&vCenter=true&width=900&lines=Temu+Store+-+Shop+Like+a+Billionaire;React+%7C+Express+%7C+PostgreSQL+%7C+Redux+Toolkit+in+One+Platform" alt="Typing Animation"/>
</p>

---

## 🚀 About the Project

**Temu E-Commerce Store** is a premium, fully responsive web application inspired by the official Temu platform.  
It provides a seamless shopping experience for buyers, featuring a responsive dual-layout header, localized multi-language support (English & Urdu), robust cart management with live quantity modifications, and PostgreSQL database synchronization.

Built with dedication, Temu brings together powerful features like:
- **Responsive Three-Stage Header Layout** (Mobile Drawer / Tablet Grid wrapping / Full Desktop Inline)
- **Live Search Bar** with Debouncing and Sanitization
- **Interactive Categories Overlay** with complete dynamic subcategory mappings
- **Dynamic Dual Theme** supporting a premium Light/Dark mode toggler
- **Flexible Language Translation System** (English & Urdu translations)
- **Interactive Support Center** with native WhatsApp app protocol redirect and dynamic FAQs
- **Live Cart Operations** with database/localStorage sync and editable quantity dropdowns (1-99)
- **Secure Order Checkouts** with complete frontend validations and multi-request prevention
- **Database Upsert Synchronization** auto-seeding 60+ products securely on backend startup

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
</p>

---

## ⚡ Features

### 🛒 E-Commerce & Cart
- Browse products by dynamic categories & subcategories
- Debounced product searching and sanitized filters
- Add items to cart with dynamic Redux-state synchronization
- Modify cart quantity directly from a premium select dropdown (1 to 99)
- LocalStorage caching fallback for guest visitors
- Database cart persistence for registered accounts

### 🔐 Account & Checkouts
- Register and Login with instant local thunk state caching
- Secure order placement with real-time field validation (Pakistani phone format, addresses, and postcodes)
- Instant Order History tracker showing detailed invoice status
- Prevented double checkout actions using disabled thunk tracking

### 🛠️ Support & Configurations
- Dedicated Customer Support page with native device app protocol triggers (`whatsapp://`)
- Complete environment configuration for Support variables (`VITE_SUPPORT_WHATSAPP_NUMBER` & `VITE_SUPPORT_EMAIL`)
- Full FAQ interactive accordion toggles localized in both English & Urdu

---

## ⚙️ Setup & Installation

### 🔹 Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/) Database server
- Git

### 🔹 Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/temu.git
   cd temu
   ```

2. **Database Configuration**
   - Ensure your local PostgreSQL server is running.
   - Create a database named `temu_store`.

3. **Backend Setup**
   ```bash
   cd backend
   # Rename .env.example to .env and configure your DATABASE_URL, JWT_SECRET, and PORT
   npm install
   npm run dev
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   # Configure your .env variables (VITE_API_URL, VITE_SUPPORT_WHATSAPP_NUMBER)
   npm install
   npm run dev
   ```

5. **Default URLs**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

---

## 🎬 Deployment

This project contains pre-configured Vercel routing configurations. 
Redirections and routing are handled via `vercel.json` rewrite patterns to prevent SPA 404 router errors when refreshing pages.

- **Frontend Build Configuration:**
  - Build command: `npm run build`
  - Output directory: `dist`
- **Backend Configuration:**
  - Standard Express serverless mapping.

---

## 🎬 Demo

[![App Demo](frontend/public/temu-favicon.svg)](https://temu-frontend-sage.vercel.app/)

---

## 🌟 Support & Contribution

If you find this project helpful, please consider giving it a **⭐ Star** on GitHub — it helps a lot! 🚀

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?size=22&duration=3000&color=FF5B2E&center=true&vCenter=true&width=600&lines=Contributions+are+Welcome!;Star+the+Repo+if+you+like+it!" alt="Typing SVG">
</p>
