const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 5000;
const connectDB = require('./config/connectionDB');
connectDB();

// Enable CORS and JSON parsing
app.use(cors(
    {   //origin:'http://localhost:5173',
       origin: "https://rifah-frontend.vercel.app",
    }
));
app.use(express.json());
app.use('/api/members',require("./router/RifahMembers"));



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 