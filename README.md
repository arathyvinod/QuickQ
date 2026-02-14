# 🍱 QuickQ – Smart Canteen Management Website

A smart campus food booking platform designed to reduce canteen queues and connect students with nearby restaurants for pre-orders. This web-based system allows students to browse menus, book pickup slots, and receive digital receipts—all through their browser.

---

## 🌐 Project Access

> 🚀 **Backend API Documentation:** [https://quickq-production.up.railway.app/docs](https://quickq-production.up.railway.app/docs)
> 
> 💻 **Local Development URL:** `http://127.0.0.1:5500` (Frontend) | `http://127.0.0.1:8000` (Backend)

---

## 📸 Demo Screenshots

| Student Login | Today's Menu |
| :--- | :--- |
| ![Login](https://github.com/arathyvinod/QuickQ/raw/main/assets/login.png) | ![Menu](https://github.com/arathyvinod/QuickQ/raw/main/assets/menu.png) |

| Payment & Slot Selection | Canteen Admin Panel |
| :--- | :--- |
| ![Payment](https://github.com/arathyvinod/QuickQ/raw/main/assets/payment.png) | ![Admin](https://github.com/arathyvinod/QuickQ/raw/main/assets/admin.png) |

---

## 🚀 Key Features

* 🔍 **Real-time Slot Tracking:** The website dynamically monitors pickup windows to ensure no more than 20 people arrive at the same time.
* 💳 **Smart Billing:** Integrated pricing logic that calculates the base meal cost plus a ₹5 service fee.
* 🎟️ **QR-Based Verification:** After booking, the website generates a unique digital receipt for the student to show at the counter.
* 🍴 **Live Menu Control:** A dedicated admin interface for canteen staff to add or remove food items instantly.
* 🌐 **Fully Responsive:** Designed to work perfectly on both mobile phone browsers and desktop computers.

---

## 🧠 Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript, Tailwind CSS.
* **Backend:** FastAPI (Python) for high-speed asynchronous API handling.
* **Database:** MongoDB Atlas (NoSQL) for flexible data storage.
* **Drivers:** Motor (Async MongoDB) and Pydantic for data validation.
* **Deployment:** Railway.app for cloud hosting.

---

## 🛠️ Installation & Setup

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
