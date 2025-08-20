# JobBoard

JobBoard is a full-stack web application to explore jobs, apply, and manage resumes. It has a **frontend** built with **Next.js** and a **backend** built with **Node.js, Express, and MongoDB**.

---

## Features

### Frontend

* User registration and login
* View available jobs
* Apply for jobs
* Upload resume (PDF, DOC, DOCX)
* View submitted applications
* Responsive design for mobile and desktop
* Loading states and toast notifications

### Backend

* REST API built with Express
* User authentication with JWT
* Password hashing with bcrypt
* Job management and application storage
* Resume upload handling
* MongoDB for storing users, jobs, and applications

---

## Technologies

* **Frontend:** Next.js, React, Tailwind CSS, Axios, Sonner (for notifications)
* **Backend:** Node.js, Express, MongoDB, Mongoose, bcrypt, JWT

---

## Setup

### Backend

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env` file and add:

   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   ```
4. Start the server:

   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env` file and add backend URL:

   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   ```
4. Start the frontend:

   ```bash
   npm run dev
   ```

---

## Deployment

* Backend can be deployed on **Render** or **Railway**.
* Frontend can be deployed on **Vercel**.
* Update `NEXT_PUBLIC_API_BASE_URL` in frontend `.env` to the deployed backend URL.

