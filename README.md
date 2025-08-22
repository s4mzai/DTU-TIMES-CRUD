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

The backend server will run on `http://localhost:3001` by default.

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

### User Interface
- Modern, responsive design
- Intuitive navigation
- Form validation
- Real-time updates

## 🔧 API Endpoints

The backend provides the following REST API endpoints:

- `GET /editions` - Retrieve all editions
- `GET /editions/:id` - Retrieve a specific edition
- `POST /editions` - Create a new edition
- `PUT /editions/:id` - Update an existing edition
- `DELETE /editions/:id` - Delete an edition

## 📁 Component Structure

### Frontend Components
- **Navbar** - Navigation component
- **EditionCard** - Display individual edition information
- **CreateEdition** - Form for creating new editions
- **EditEdition** - Form for editing existing editions
- **EditionDetails** - Detailed view of a single edition
- **Editions** - List view of all editions

### UI Components
- **Button** - Reusable button component
- **Input** - Form input component
- **Select** - Dropdown selection component
- **Calendar** - Date picker component
- **Alert Dialog** - Confirmation dialogs
- **Popover** - Overlay component

## 🚀 Deployment

### Backend
The backend can be deployed to any Node.js hosting platform (Heroku, Railway, Render, etc.).

### Frontend
The frontend is configured for Vercel deployment with `vercel.json` configuration.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Note**: This is a development project. The `db.json` file serves as a mock database and should not be used in production environments.
