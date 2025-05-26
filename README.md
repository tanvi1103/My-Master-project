# 🎓Web-Based Graduate Document Credentials Verification System for Bonga University

A full-stack **web-based graduate verification system with national ID verification** built with the MERN stack. 
This system allows external users (employers, institutions) to verify the authenticity of graduate certificates, 
while providing internal administrators secure tools for managing, uploading, and tracking graduate data.


- **frontend**: React-based ExternalUser/registrar/admin dashboard and chat UI  
- **backend**: Express.js REST API for user management, authentication, and chat (with Socket.IO)  
- **nationalidapi**: Microservice for national ID verification

---

## Project Structure

```
FINALPROJECT/
│
├── backend/           # Main backend API (Nodejs, Express, MongoDB, Socket.IO)
│   ├── api/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── image/
│   ├── middleware/
│   ├── models/
│   ├── public/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/          # React frontend (Vite, Tailwindcss, Framer Motion)
│   ├── src/
│   │   ├── admin/
│   │   ├── assets/
│   │   ├── chat/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── registrar/
│   │   └── user/
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── ...
│
├── nationalidapi/     # Microservice for national ID verification
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── idServer.js
│   └── package.json
│
└── .gitignore
```

---

## Live URLs (Development)

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:5000](http://localhost:5000)
- **National ID API:** [http://localhost:7000](http://localhost:7000)

---

## Features

- **Admin Login** with rate limiting and lockout after failed attempts
- **User Management** (CRUD, search, edit, delete, photo upload)
- **National ID Verification** via dedicated microservice
- **Real-time Chat** (Socket.IO) between users and admins
- **Role-based Access** (admin, registrar, user)
- **Responsive UI** with Tailwind CSS and Framer Motion
- **Security**: Helmet.js, CORS, JWT authentication, express-rate-limit

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios, SweetAlert2
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.IO
- **National ID API:** Node.js, Express, MongoDB
- **Security:** Helmet.js, express-rate-limit, CORS, JWT

---

## Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_ADMIN_ROUTE=http://localhost:5000/api/admin
VITE_NATIONAL_ID_ROUTE=http://localhost:7000/api/national-ids
VITE_AUTH_ROUTE=http://localhost:5000/api/auth
VITE_CHAT_ROUTE=http://localhost:5000/api/chat
```

### Backend (`backend/.env`)
```env
MONGO_URI=your_mongodb_url, like "mongodb+srv://<mongoDB_user_name>:<password>@cluster0.s4fepks.mongodb.net/nationalIdInfo?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=your_secret_key

ADMIN_EMAIL=madishamadiso00@gmail.com

EMAIL_SERVICE=Gmail
EMAIL_USER=madishamadiso00@gmail.com
EMAIL_PASSWORD=@urim asqp wnfs faah

JWT_EXPIRE=7d
```

### National ID API (`nationalidapi/.env`)
```env
MONGODB_NATIONAL_ID_URI=your_mongodb_url, like "mongodb+srv://<mongoDB_user_name>:<password>@cluster0.s4fepks.mongodb.net/nationalIdInfo?retryWrites=true&w=majority&appName=Cluster0
PORT=7000
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

---

## Setup & Installation

### Frontend

```sh
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Backend

```sh
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

### National ID API

```sh
cd nationalidapi
npm install
npm run dev
# Runs on http://localhost:7000
```

---

## Security

- **Helmet.js**: Sets HTTP headers for security.
- **CORS**: Only allows requests from whitelisted origins.
- **JWT**: Used for authentication and authorization.
- **express-rate-limit**: Protects against brute-force attacks.
- **Rate Limiting**:
  - Global: 100 requests per 15 minutes per IP.
  - Admin Login: 5 attempts per minute per IP. After 5 failed attempts, login is locked for 1 minute.

---

## Troubleshooting

- **CORS errors:** Ensure backend CORS middleware is at the top and origins are correct.
- **MongoDB connection issues:** Check your `MONGO_URI` in `.env`.
- **Rate limit lockout:** Wait for 1 minute after 5 failed login attempts.
- **Socket.IO issues:** Make sure the frontend and backend use the same allowed origins and credentials.

---

## License

This project is for educational purposes.  
See [LICENSE](LICENSE) for details.

---

**Author:** Madiso Melese  
**Contact:** madishamadiso00@gmail.com




## 📌 Features

### ✅ External Users
- Real-time graduate verification by name, department, CGPA, and graduation year.
- QR code verification on PDF certificates.
- Certificate search result with detailed view.
- Location & IP tracking of external users for security.
