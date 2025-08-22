# DTU Times CRUD

A full-stack web application for managing DTU Times editions with a React frontend and Node.js backend.

## 🏗️ Project Structure

```
dtu-times-crud/
├── backend/                 # Node.js backend server
│   ├── server.js           # Express server with CRUD endpoints
│   ├── db.json             # JSON database file
│   └── package.json        # Backend dependencies
├── dtu-times-frontend/     # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   └── main.jsx        # Main application entry point
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Live Demo

- **Frontend Application**: [DTU Times Frontend](https://dtutimes.vercel.app)
- **Backend API**: [DTU Times Backend](https://dtu-times-backend.onrender.com/editions)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The backend server will run on `http://localhost:5000` by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd dtu-times-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will run on `http://localhost:5173` by default.

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **JSON Server** - Mock REST API for development
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Re-usable components built with Radix UI and Tailwind CSS

## 📱 Features

### Edition Management
- **Create** new editions with title, description, and publication date
- **Read** all editions with detailed information
- **Update** existing edition details
- **Delete** editions from the system


## 🔧 API Endpoints

The backend provides the following REST API endpoints:

- `GET /editions` - Retrieve all editions
- `GET /editions/:id` - Retrieve a specific edition
- `POST /editions` - Create a new edition
- `PUT /editions/:id` - Update an existing edition
- `DELETE /editions/:id` - Delete an edition

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
