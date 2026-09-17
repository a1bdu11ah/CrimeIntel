# CrimeIntel — Crime Record Management System

CrimeIntel is a full-stack **Crime Record Management System (CRMS)** for managing FIRs, criminal profiles, investigations, evidence, and police personnel from a single dashboard.

The project uses a **React + Vite** frontend and a **Node.js + Express + PostgreSQL** backend. It is designed as a clean administrative portal for demonstrating CRUD workflows, routing, API integration, record management, and dashboard-style interfaces.

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
- node-postgres (pg)
- CORS
- dotenv

### Database

- Neon PostgreSQL

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

### 2. Configure Neon PostgreSQL

Create a project in [Neon](https://console.neon.tech), open **Connect**, enable connection pooling, and copy the PostgreSQL connection string.
Create `server/.env` using `server/.env.example`:

```env
PORT=5001
DATABASE_URL=postgresql://USER:PASSWORD@HOST-pooler.REGION.aws.neon.tech/neondb?sslmode=require
```

Keep the URL server-side and out of Git. Never put it in a VITE_ variable.
Install backend dependencies and create the tables once before starting:

```bash
cd server
npm install
npm run db:migrate
```

The setup is repeatable and preserves existing PostgreSQL records. It does not copy old MongoDB data.
New record IDs are UUID strings returned as `_id`, preserving the frontend API format.

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

## Deploy to Vercel

1. Import the repository as a backend project with root directory `server` and the Express preset. Set `DATABASE_URL` to your Neon pooled connection string.
2. Run `npm run db:migrate` from `server` with that same database URL before serving requests. Schema creation is an explicit setup step, not performed on every request.
3. Import the repository again as a frontend project with root directory `client`, Vite preset, build command `npm run build`, and output directory `dist`.
4. Set frontend `VITE_API_URL` to `https://YOUR-BACKEND.vercel.app/api` and deploy. Rebuild after changing this value. `client/vercel.json` handles React page refreshes.

## Database migration tests

Run `npm test` inside `server`. Tests exercise all five CRUD APIs against an in-memory PostgreSQL emulator, including validation, unique record numbers, SQL parameters, and response compatibility. They do not connect to Neon or modify real records. A live Neon connection still needs verification with your own `DATABASE_URL`.
