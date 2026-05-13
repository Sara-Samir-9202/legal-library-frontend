# 📚 Mizan Legal Library – Frontend (React.js)

## 🚀 Your Professional Digital Legal Library Experience

This is the **official frontend** of the **Mizan Legal Library** platform – a complete, production-ready web application built for a real client. It provides a seamless, modern interface for legal professionals, students, and researchers to browse, search, read, and download thousands of legal books online.

🔗 **Live Demo:** [https://legal-library-frontend-iq9p.vercel.app/](https://legal-library-frontend-iq9p.vercel.app/)

🔗 **Backend Repository:** [https://github.com/Sara-Samir-9202/LegalLibraryJourney](https://github.com/Sara-Samir-9202/LegalLibraryJourney)

🔗 **Live API Documentation (Swagger):** [https://mizan-legallibrary.runasp.net/swagger/index.html](https://mizan-legallibrary.runasp.net/swagger/index.html)

---
## Frontend Architecture Details:

<img width="1024" height="487" alt="image" src="https://github.com/user-attachments/assets/d916a589-9a58-4ed1-9c92-e7a17df43c12" />


## ✨ Features

### 👥 Public Routes (No Login Required)
| Feature | Description |
|---------|-------------|
| 🏠 **Home Page** | Hero section, animated stats, featured books preview |
| 📖 **Public Books** | Browse/search all published legal books |
| 🏷️ **Categories** | Filter books by legal fields (Criminal, Civil, Constitutional, International) |
| 📝 **Register / Login** | Create account or sign in with JWT authentication |

### 🧑‍🎓 Student Routes (Logged-in Users)
| Feature | Description |
|---------|-------------|
| 👋 **Welcome Dashboard** | Personalized greeting + full book catalog |
| 📄 **Read Online** | Simulated reader view (real PDF integration ready) |
| ⬇️ **Download Books** | Track downloads + increment counters via API |
| 📚 **Books by Category** | Dynamic filtering by legal categories |

### 👑 Admin Routes (Role-Based Access)
| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Total books, downloads, users – live stats |
| ➕ **Add / Edit / Delete Books** | Full CRUD operations via API |
| 🏷️ **Manage Categories** | Create, update, or delete legal categories |
| 📁 **Upload Files** | PDF & cover image upload (integrated with backend) |

### 🔧 Shared Components
- 🧭 **Dynamic Navbar** – changes based on auth state
- 🎴 **3D Hover Book Cards** – modern UI/UX
- 🔐 **Protected Routes** – admin/student guards
- 📱 **Fully Responsive** – works on desktop, tablet, mobile

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Library** | React 18 |
| **Language** | JavaScript (ES6+) |
| **HTTP Client** | Axios (with interceptors for JWT) |
| **Routing** | React Router DOM v6 |
| **Styling** | CSS3 + CSS Variables (design tokens) |
| **Icons** | Font Awesome 6 |
| **State Management** | React Hooks (useState, useEffect, Context) |
| **Build Tool** | Create React App |
| **Deployment** | Vercel |


---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Backend API running (or use the live API endpoint)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sara-Samir-9202/legal-library-frontend.git
cd legal-library-frontend

Live Demo: Mizan Legal Library

⭐ Show Your Support
If you found this project helpful, please give it a ⭐ on GitHub!
