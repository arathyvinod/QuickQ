<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# QuickQ 🎯

## Basic Details

### Team Name: MOONSTACK

### Team Members
- Member 1: ARATHY VINOD - RIT
- Member 2: SONA M J - RIT

### Hosted Project Link
FRONTEND : http://127.0.0.1:5500
BACKEND : http://127.0.0.1:8000

### Project Description
QuickQ is an intelligent, full-stack canteen management platform designed to solve the chronic problem of lunchtime overcrowding in campus environments. By digitizing the food ordering process and introducing time-slot based pickup, QuickQ ensures that students spend less time in queues and more time enjoying their meals.

### The Problem statement
Traditional college canteens suffer from "peak hour congestion," where hundreds of students arrive simultaneously, leading to long wait times, missed classes, and inefficient kitchen management.

### The Solution
QuickQ bridges the gap between students and the canteen staff through a real-time web interface:

For Students: A seamless booking experience where they can view the live menu, select a meal, and—most importantly—book a specific 15-to-30-minute pickup slot.

For Canteen Staff: A centralized Admin Panel to monitor incoming orders and manage "Slot Occupancy" (capped at 20 persons per slot) to ensure the kitchen never exceeds its capacity.

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: JavaScript, Python, CSS , HTML
- Frameworks used: React, Django , FASTAPI
- Libraries used: axios
- Tools used:VS Code, Git
---

## Features

List the key features of your project:
- Feature 1: FAST ACESSIBLE PREBOOKING FOR CATEEN FOOD
- Feature 2: REDUCE THE QUEUE
- Feature 3: QR GENERATION

---

## Implementation

### For Software:

#### Installation
```bash
[Installation commands - e.g., npm install, pip install -r requirements.txt]
```

#### Run
```bash
[Run commands - e.g., npm start, python app.py]
```


## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

<img width="1434" height="919" alt="admin png" src="https://github.com/user-attachments/assets/5730f4cc-97b4-4fe1-854b-f775f4b5db6e" />

<img width="463" height="635" alt="Screenshot 2026-02-14 073346" src="https://github.com/user-attachments/assets/7fc94c4b-b110-44b1-86f0-67ad072ecfd5" />
<img width="596" height="813" alt="payment png" src="https://github.com/user-attachments/assets/3a6b4da4-6431-4a75-a782-db2671f33b8d" />
<img width="1905" height="986" alt="menu png" src="https://github.com/user-attachments/assets/a933d00d-160e-4b70-9f3e-447d8f6432a8" />
<img width="1515" height="866" alt="login png" src="https://github.com/user-attachments/assets/c713c9fb-26b6-43df-88da-456460ee50ef" />

#### Diagrams

**System Architecture:**

![Architecture Diagram](docs/architecture.png)
*Explain your system architecture - components, data flow, tech stack interaction*

**Application Workflow:**
![WhatsApp Image 2026-02-14 at 9 50 50 AM](https://github.com/user-attachments/assets/4c9173fb-d5d0-4892-9886-54ff90277d92)

---



### For Web Projects with Backend:

#### API Documentation

**Base URL:** (http://127.0.0.1:8000)

##### Endpoints

**GET /api/endpoint**
- **Description:** Retrieves the list of all available food items, descriptions, and base prices from the database.
- **Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "item123",
      "name": "Chicken Biryani",
      "price": 120,
      "available": true
    }
  ]
}
```
GET /slots

**Description:** Returns a list of time slots and their current occupancy levels to check availability.

**Parameters:** date (string): The specific date to check (default: today).

**RESPONSE**: 
{
  "slots": [
    {"time": "12:30 PM - 1:00 PM", "occupied": 9, "max_limit": 20},
    {"time": "1:00 PM - 1:30 PM", "occupied": 15, "max_limit": 20}
  ]
}
**POST /api/endpoint**
- **Description:**Creates a new food order and reserves a specific pickup slot for the student.
- **Request Body:**
```json
{
  "student_name": "Arathy",
  "item_id": "item123",
  "slot": "12:30 PM",
  "total_amount": 125.0
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Booking confirmed",
  "booking_id": "QQ789",
  "qr_data": "QUICKQ-789-VERIFIED"
}
```

**POST /api/endpoint**
- **Description:** Allows authorized canteen staff to add new items to the daily menu.
- **Request Body:**
```json
{
  "name": "Paneer Butter Masala",
  "price": 110,
  "description": "Rich and creamy cottage cheese curry"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Item added successfully"
}
```

---

#### Demo Output

**Example 1: Basic Processing**

**Input:**
```
This is a sample input file
with multiple lines of text
for demonstration purposes
```

**Command:**
```bash
python script.py sample.txt
```

**Output:**
```
Processing: sample.txt
Lines processed: 3
Characters counted: 86
Status: Success
Output saved to: output.txt
```


## Project Demo

### Video
DEMO VIDEO :

https://github.com/user-attachments/assets/827440c4-c9f0-48c8-a651-bf1f2d77a34a

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
🏗️ 1. The Frontend-Backend Handshake
Request Phase: The React website (Frontend) sends an asynchronous HTTP request to the FastAPI server (Backend) hosted on Railway.

CORS Handling: The backend uses CORSMiddleware to safely accept these requests from the student's browser.

Data Retrieval: FastAPI uses the Motor driver to fetch the current menu and slot availability from MongoDB Atlas.

🥗 2. The Student Booking Journey
Authentication: Students log in to the portal, creating a session that tracks their specific orders.

Menu Selection: The website displays live items (e.g., Chicken Biryani for ₹120).

Dynamic Billing Logic: When an item is selected, the backend logic automatically calculates the total by adding a ₹5 service fee to the base price.

Slot Management: The student chooses a pickup time. The system checks if the slot has reached its 20-person limit before allowing the booking.

Digital Receipt & QR: Upon "Payment" (simulated via UPI flow), the system updates the slot occupancy and generates a unique QR-coded digital receipt with a "PAID" status.


---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:**  ChatGPT, GEMINI


Made with ❤️ at TinkerHub
