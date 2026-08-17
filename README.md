# 🎓 CourseFlow LMS

> A modern, secure, and role-based Learning Management System built with **React**, **Tailwind CSS**, **Material-UI**, **Firebase**, and **Stripe**. Tutors can create and manage courses, while students can discover, purchase, and track their learning progress—all within a unified, responsive interface.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?logo=tailwind-css)
![MUI](https://img.shields.io/badge/MUI-5.14.0-007FFF?logo=mui)
![Firebase](https://img.shields.io/badge/Firebase-10.5.0-FFCA28?logo=firebase)
![Stripe](https://img.shields.io/badge/Stripe-6.0.0-635BFF?logo=stripe)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🔐 Authentication & Security
- **Google Sign-In** via Firebase Auth
- **Role-Based Access Control** (`tutor` | `student`)
- Protected routes & session persistence

###  Payments & Monetization
- **Stripe Checkout** for secure course purchases
- Webhook-ready architecture for payment confirmation
- Receipt generation & purchase history

### 🎭 Role-Based UI
| 👨‍🏫 Tutor View | 🎓 Student View |
|------------------|-----------------|
| ✅ Create & edit courses | ✅ Browse & search catalog |
| ✅ Manage curriculum & pricing | ✅ Enroll & pay via Stripe |
| ✅ View enrolled students | ✅ Access purchased courses |
| ✅ Dashboard analytics | ✅ Progress tracking & certificates |

### 📚 Core Functionality
- Full CRUD operations for course management
- Advanced filtering (category, search, level)
- Redux Toolkit for predictable state management
- Responsive design with Tailwind CSS + MUI components
- Safe rendering & fallbacks for partial/missing data

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, React Router v6, Redux Toolkit |
| **Styling** | Tailwind CSS, Material-UI (MUI) |
| **Auth & DB** | Firebase Authentication, Firestore, Cloud Storage |
| **Payments** | Stripe API, `@stripe/react-stripe-js` |
| **State** | Redux Toolkit (Async Thunks, Slices) |
| **DevOps** | Vite / Create React App, ESLint, Prettier |

---

## 📋 Prerequisites

- Node.js `16+` & npm/yarn
- Firebase Project (Authentication, Firestore, Storage enabled)
- Stripe Account (Publishable & Secret keys)
- Google Cloud Project (OAuth 2.0 Client ID for Firebase)

---

##  Installation & Setup

### 1. Clone & Install
```bash
git clone https://github.com/emanatiya87/Lms
cd Lms
npm install
   ```

### 2. Configure Environment Variables
Create a .env file in the root directory

### 3. Firebase Setup
Go to Firebase Console
Enable Authentication → Add Google sign-in provider
Enable Firestore Database → Start in production mode
Enable Storage → Set rules to allow authenticated reads/writes
Add your web app & copy config to .env

### 4. Stripe Setup
Create a Stripe Account
Navigate to Developers → API keys
Copy Publishable key to .env
(Optional) Set up webhook endpoints for payment confirmation

### 5. Run Development Server
npm start
# or
npm run dev

📬 Contact
Eman
📧 emanatiya87@gmail.com

🔗 Portfolio : https://eman-atia-portfolio-lyart.vercel.app/ /LinkedIn: https://www.linkedin.com/in/eman-atiya-6245b0294/
<p align="center">Built with Love!❤️ for educators and learners worldwide</p>


