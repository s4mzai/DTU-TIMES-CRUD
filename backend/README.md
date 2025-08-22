# DTU Times Backend API

A RESTful API server for managing DTU Times magazine editions.

## 🌐 Live Demo

**Frontend:** [https://dtutimes.vercel.app](https://dtutimes.vercel.app)  
**Backend API:** [https://dtu-times-backend.onrender.com/editions](https://dtu-times-backend.onrender.com/editions)

## ✨ Features

- **Create Editions**: Add new magazine editions
- **Read Editions**: Get all or specific editions
- **Update Editions**: Modify edition information
- **Delete Editions**: Remove editions
- **Data Persistence**: JSON file storage

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **CORS** - Cross-origin support
- **Morgan** - Request logging
- **UUID** - ID generation

## 🚀 Setup

### Prerequisites
- Node.js (v16+)
- npm

### Installation
```bash
git clone https://github.com/s4mzai/DTU-TIMES-Backend.git
cd backend
npm install
npm start
```

### Development
```bash
npm run dev
```

## 🔌 API Documentation

### Base URL
```
https://dtu-times-backend.onrender.com
```

### Endpoints

#### Get All Editions
```http
GET /editions
```

#### Get Edition by ID
```http
GET /editions/:id
```

#### Create Edition
```http
POST /editions
```

#### Update Edition
```http
PUT /editions/:id
```

#### Delete Edition
```http
DELETE /editions/:id
```

## 📁 Project Structure
```
backend/
├── server.js      # Main server
├── db.json        # Database file
└── package.json   # Dependencies
```
