const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/config/db');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./api/routes/authRoutes'));
app.use('/api/todos', require('./api/routes/todoRoutes'));
app.get('/testing', (req,res)=> {
    res.json({ message: 'Server is running' });
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

