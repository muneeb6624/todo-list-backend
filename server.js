const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/config/db');

dotenv.config();
connectDB();

const app = express();

// CORS configuration for production
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? ['https://todo-list-frontend-puce.vercel.app'] // Replace with your actual frontend URL
//     : ['http://localhost:5173'], // Add your local frontend ports
//   credentials: true
// }));

app.use(cors({
  origin: [
    'http://localhost:5173', // Vite default port
    'http://localhost:3000', // React default port
    'http://localhost:3001', // Alternative port
    'https://todo-list-frontend-puce.vercel.app',
    'http://100.25.43.78'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./api/routes/authRoutes'));
app.use('/api/todos', require('./api/routes/todoRoutes'));

// Test route
app.get('/testing', (req, res) => {
    res.json({ message: 'Server is running on Vercel!' });
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Todo Backend API is live!' });
});

// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

module.exports = app;