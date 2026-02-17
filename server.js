// const express = require('express');
// const cors = require('cors');
// const cookieParser = require("cookie-parser");
// require('dotenv').config();
// const connectDB = require('./config/connectionDB');

// const app = express();
// const port = process.env.PORT || 5000;

// connectDB();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://rifah-frontend.vercel.app"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       return callback(new Error('CORS blocked this origin'), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/auth", require("./routes/login"));
// app.use('/api/members', require("./routes/RifahMembers"));

// // ✅ FIXED: Changed to match frontend expectation '/api/service-requests'
// app.use('/api/service-requests', require('./routes/serviceRequestRoutes')); 

// app.use('/api/member-profile', require('./routes/member'));

// app.listen(port, () => {
//   console.log(`🚀 Local Server: http://localhost:${port}`);
// });

// const express = require('express');
// const cors = require('cors');
// const cookieParser = require("cookie-parser");
// // ✅ 1. NEW IMPORTS
// const session = require('express-session'); 
// const passport = require('passport'); 

// require('dotenv').config();
// const connectDB = require('./config/connectionDB');

// // ✅ 2. Import your passport config file (Ensure you created this file!)
// require('./config/passport'); 

// const app = express();
// const port = process.env.PORT || 5000;

// connectDB();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://rifah-frontend.vercel.app"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       return callback(new Error('CORS blocked this origin'), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());
// app.use(cookieParser());

// // ✅ 3. ADD SESSION MIDDLEWARE (Required for Passport)
// app.use(session({
//     secret: process.env.JWT_SECRET || 'your_secret_key', // Use your .env secret
//     resave: false,             // Don't save session if unmodified
//     saveUninitialized: false,  // Don't create session until something stored
//     cookie: { 
//         secure: process.env.NODE_ENV === 'production', // False for localhost, True for Vercel
//         maxAge: 24 * 60 * 60 * 1000 // 1 day
//     }
// }));

// // ✅ 4. INITIALIZE PASSPORT
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use("/auth", require("./routes/login"));
// app.use('/api/members', require("./routes/RifahMembers"));
// app.use('/api/service-requests', require('./routes/serviceRequestRoutes')); 
// app.use('/api/member-profile', require('./routes/member'));

// app.listen(port, () => {
//   console.log(`🚀 Local Server: http://localhost:${port}`);
// });

//----------------------17/02---------------11.10-------------

const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Connect to DB
const connectDB = require('./config/connectionDB');

// Import Passport Strategies
require('./config/passport');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// --- CONFIGURATION ---
const allowedOrigins = [
  "http://localhost:5173",
  "https://rifah-frontend.vercel.app"
];

// ✅ 1. CORS CONFIGURATION
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS blocked this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// ✅ 1.5 FIX: SECURITY HEADERS FOR GOOGLE LOGIN
// This manually sets the policy so the popup can talk to this window.
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// ✅ 2. SESSION MIDDLEWARE
app.use(session({
  secret: process.env.JWT_SECRET || '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',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // crucial for cross-site cookies
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// ✅ 3. INITIALIZE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/payment", require("./routes/payment"));
// --- ROUTES ---
app.use("/auth", require("./routes/login"));
app.use('/api/members', require("./routes/RifahMembers"));
app.use('/api/service-requests', require('./routes/serviceRequestRoutes'));
app.use('/api/member-profile', require('./routes/member'));

app.listen(port, () => {
  console.log(`🚀 Local Server: http://localhost:${port}`);
});