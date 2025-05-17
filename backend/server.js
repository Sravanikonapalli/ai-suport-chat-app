const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const chatRoutes = require('./routes/chatRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', chatRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
