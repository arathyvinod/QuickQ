# 🍱 QuickQ – Smart Canteen Management System

A smart campus food booking system that reduces canteen queues and connects students with nearby restaurants for pre-orders. By integrating real-time slot management and digital receipts, QuickQ ensures a seamless dining experience for students and staff.

---

## 🌐 Live Demo (Cloud Deployment)

> 🚀 **Backend API Documentation:** [https://quickq-production.up.railway.app/docs](https://quickq-production.up.railway.app/docs)
> 
> 🔐 **Admin Access:** The Canteen Admin Panel is restricted to authorized staff for live menu management and occupancy monitoring.

---

## 📸 Demo Screenshots

| Student Authentication | Today's Menu & Pricing |
| :--- | :--- |
| ![Login](./assets/login.png) | ![Menu](./assets/menu.png) |

| Payment & Slot Selection | Canteen Admin Dashboard |
| :--- | :--- |
| ![Payment](./assets/payment.png) | ![Admin](./assets/admin.png) |

---

## 🚀 Features

* 🔍 **Real-time Slot Occupancy:** Dynamically monitors and restricts bookings to a maximum of 20 persons per time slot to prevent overcrowding.
* 💳 **Automated Billing Logic:** Automatically calculates a platform service fee (₹5) on top of the base food price.
* 🎟️ **QR-Based Confirmation:** Generates unique digital receipts with "PAID" status for instant counter verification.
* 🍴 **Dynamic Menu Management:** Full CRUD (Create, Read, Update, Delete) capabilities for admins to manage daily items and availability.
* 📱 **Responsive UI:** A smooth, mobile-friendly interface built for students to book meals on the go.

---

## 🧠 Technologies Used

* **React.js:** Component-driven frontend for a fast, modern user experience.
* **FastAPI (Python):** High-performance asynchronous backend API with Swagger docs.
* **MongoDB Atlas:** Scalable NoSQL cloud database for menu and booking storage.
* **Motor & Pydantic:** For asynchronous database operations and robust data validation.
* **QRCode.js:** Secure client-side generation of verifiable digital receipts.
* **Tailwind CSS:** Modern utility-first styling for a professional UI.
* **Railway.app:** Cloud infrastructure for seamless deployment and hosting.

---

## 🛠️ Installation & Setup

### 1. Backend (FastAPI)
```bash
# Navigate to backend directory
cd backend

# Install dependencies (requires motor, python-dotenv, etc.)
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
