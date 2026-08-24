# 🚔 Crime Record Management System (CRMS)

A full-stack **Crime Record Management System (CRMS)** developed using **React.js, Node.js, Express.js, and MongoDB**.  
This system helps manage crime-related records such as FIRs, Criminals, Cases, Evidence, and Police Personnel efficiently through a user-friendly dashboard.

---

# 📌 Project Description

The **Crime Record Management System** is designed to digitize and organize crime-related records. It enables law enforcement or administrative staff to securely store, update, retrieve, and manage information.

The system includes a **dashboard interface** that displays summary statistics and supports **CRUD operations** across multiple modules.

This project demonstrates full-stack web development concepts including:

- REST API development
- Database integration
- React-based frontend
- Component-based UI
- Backend routing and controllers
- Data visualization using dashboard

---

# ✨ Features

## 📊 Dashboard
- Displays total counts of:
  - FIR Records
  - Criminal Records
  - Case Records
  - Evidence Records
  - Personnel Records
- Fetches real-time data from backend APIs

## 📝 FIR Management
- Add FIR records
- View FIR list
- Edit FIR details
- Delete FIR records

## 👤 Criminal Management
- Add Criminal details
- View Criminal records
- Update Criminal data
- Delete Criminal records

## ⚖️ Case Management
- Manage case information
- Link FIR with criminal records
- Track case status

## 🔍 Evidence Management
- Store evidence details
- Maintain evidence records
- Update evidence information

## 👮 Personnel Management
- Manage police personnel records
- Add, update, and remove personnel

---

# 🛠️ Technology Stack

## Frontend
- React.js
- React Router
- Axios
- HTML5
- CSS3
- JavaScript (ES6)

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Tools & Utilities
- REST APIs
- JSON
- Git & GitHub

---

# 📂 Project Folder Structure
CRMS/
│
├── client/ # React Frontend
│ ├── public/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ │ ├── routes/
│ │ └── App.js
│
├── server/ # Node.js Backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── config/
│ ├── server.js
│ └── .env
│
├── README.md
├── .gitignore


---

# ⚙️ Installation Guide

## Step 1 — Clone Repository

```bash
git clone https://github.com/your-username/CRMS.git
cd CRMS
🚀 Running Backend

Navigate to server folder:

cd server
npm install
npm start

Backend will run on:

http://localhost:5000
🚀 Running Frontend

Open new terminal:

cd client
npm install
npm start

Frontend will run on:

http://localhost:3000
🗄️ MongoDB Setup

Make sure MongoDB is running locally or use MongoDB Atlas.

Update your .env file inside:

server/.env

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
🔗 API Endpoints Overview
FIR APIs
Method	Endpoint
GET	/api/firs
POST	/api/firs
PUT	/api/firs/:id
DELETE	/api/firs/:id
Criminal APIs
Method	Endpoint
GET	/api/criminals
POST	/api/criminals
PUT	/api/criminals/:id
DELETE	/api/criminals/:id
Case APIs
Method	Endpoint
GET	/api/cases
POST	/api/cases
PUT	/api/cases/:id
DELETE	/api/cases/:id
Evidence APIs
Method	Endpoint
GET	/api/evidence
POST	/api/evidence
PUT	/api/evidence/:id
DELETE	/api/evidence/:id
Personnel APIs
Method	Endpoint
GET	/api/personnel
POST	/api/personnel
PUT	/api/personnel/:id
DELETE	/api/personnel/:id
📸 Screenshots

Add screenshots here:

Dashboard Screenshot
FIR Management Screenshot
Criminal Management Screenshot
🔮 Future Enhancements
Authentication system (Login/Register)
Role-based access control
File upload for evidence
Data export (PDF/Excel)
Advanced search filters
Graph-based analytics
🧪 Testing

Basic testing includes:

API testing using Postman
CRUD operation validation
Frontend form validation


📜 License

This project is licensed under the MIT License.