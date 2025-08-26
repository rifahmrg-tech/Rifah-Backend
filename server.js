const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 5000;
const connectDB = require('./config/connectionDB');
const cookieParser = require("cookie-parser");   //fl
connectDB();

// Enable CORS and JSON parsing
app.use(cors(
    {   //origin:'http://localhost:5173',
          origin: "https://rifah-frontend.vercel.app",
       credentials:true
    }
));
app.use(express.json());
   app.use(cookieParser());  //fl
app.use('/api/members',require("./routes/RifahMembers"));
app.use("/auth", require("./routes/login"));    //fl
app.use('/api',require('./routes/serviceRequestRoutes'));



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 