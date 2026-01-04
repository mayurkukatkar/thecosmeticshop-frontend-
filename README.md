# The Product Shop

![The Product Shop](https://via.placeholder.com/800x200?text=The+Product+Shop)

**The Product Shop** is a modern, full-stack e-commerce application designed to provide a seamless and premium shopping experience. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this project demonstrates a robust architecture suitable for scalable retail platforms.

## 🚀 Technlogy Stack

### Frontend
- **React.js**: Component-based UI library for building interactive user interfaces.
- **Vite**: Next-generation frontend tooling for fast builds and hot module replacement.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive UI design.
- **Lucide React**: Beautiful & consistent icon pack.
- **Axios**: Promise-based HTTP client for the browser.

### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **JWT (JSON Web Tokens)**: Secure authentication and information exchange.

## ✨ Key Features

- **User Authentication**: Secure Sign Up, Login, and Profile management using JWT.
- **Product Catalog**: Browsing, searching, and filtering of products with rich details.
- **Shopping Cart**: Dynamic cart functionality with real-time updates.
- **Order Management**: Streamlined checkout process and order tracking.
- **Admin Dashboard**: Comprehensive panel for managing products, orders, and users.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Modern UI/UX**: Clean, minimalist aesthetic with smooth transitions and interactions.

## 🛠️ Installation & Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/mayurkukatkar/thecosmeticshop.git
cd thecosmeticshop
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies.
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies.
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The application will launch on `http://localhost:5173`.

## 📂 Project Structure

```
thecosmeticshop/
├── backend/            # Node.js & Express Backend
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
│
└── frontend/           # React Frontend
    ├── public/         # Static assets
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── pages/      # Application pages
    │   ├── context/    # React Context (Auth, Cart)
    │   └── main.jsx    # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
© 2024 The Product Shop. All rights reserved.
