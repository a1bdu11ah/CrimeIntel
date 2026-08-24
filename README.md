# CrimeIntel — Crime Record Management System

CrimeIntel is a full-stack **Crime Record Management System (CRMS)** for managing FIRs, criminal profiles, investigations, evidence, and police personnel from a single dashboard.

The project uses a **React + Vite** frontend and a **Node.js + Express + MongoDB** backend. It is designed as a clean administrative portal for demonstrating CRUD workflows, routing, API integration, record management, and dashboard-style interfaces.

## Main Features

- Secure login flow and protected application routes
- Dashboard with crime-record statistics and recent activity
- FIR registration, viewing, editing, and deletion
- Criminal profile management
- Case management and investigation progress tracking
- Evidence record management
- Police personnel directory and record management
- Responsive dark-themed administrative interface
- REST API integration between frontend and backend

## Technology Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React icons

### Backend

- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

### Database

- MongoDB / MongoDB Atlas

## Project Structure

```text
CrimeIntel-main/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── case/
│   │   │   ├── criminal/
│   │   │   ├── dashboard/
│   │   │   ├── evidence/
│   │   │   ├── fir/
│   │   │   └── personnel/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd CrimeIntel-main
```

### 2. Configure MongoDB

Create or update `server/.env` with your MongoDB connection string.

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
```

Do not commit real database credentials to a public repository.

### 3. Run the backend

```bash
cd server
npm install
npm start
```

The backend runs by default at:

```text
http://localhost:5001
```

For development with Nodemon:

```bash
npm run dev
```

### 4. Run the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Vite will display the local frontend URL in the terminal. Its default development URL is usually:

```text
http://localhost:5173
```

## API Routes

The Express server currently mounts the following main endpoints:

| Module | Base Endpoint |
| --- | --- |
| FIR | `/api/fir` |
| Criminals | `/api/criminal` |
| Cases | `/api/case` |
| Evidence | `/api/evidence` |
| Personnel | `/api/personnel` |

The server health/root endpoint is:

```text
GET /
```

A successful response returns a message confirming that the CRMS backend API is running.

## Application Modules

### Dashboard

Provides an operational overview of FIRs, criminal records, active cases, personnel, recent activity, and case distribution.

### FIR Management

Create, view, update, and remove First Information Report records.

### Criminal Records

Store and maintain criminal profile information and linked FIR details.

### Case Management

Manage investigation records and track case progress through different stages.

### Evidence Management

Store evidence information including evidence type, collection details, responsible personnel, and status.

### Personnel Management

Maintain police personnel records including rank, station, badge information, contact details, and status.

## Useful Commands

### Frontend

```bash
npm run dev       # Start Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build
```

### Backend

```bash
npm start         # Start the Express server
npm run dev       # Start with Nodemon
```

## Future Improvements

Possible enhancements include role-based permissions, advanced record search, dashboard charts, evidence file uploads, audit logs, report export, stronger authentication, notification workflows, and additional analytics.

## Security Note

This project is suitable for learning and demonstration purposes. A production law-enforcement system would require substantially stronger authentication, authorization, encryption, auditing, privacy controls, secure file storage, backup policies, and compliance review.

## License

Add the appropriate project license before public distribution.
