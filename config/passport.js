const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Login = require("../model/login"); // Ensure this path is correct

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // e.g., "http://localhost:5000/auth/google/callback"
      proxy: true // ⚠️ Important for production (Vercel/Heroku)
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;

        // 1. Check if user exists by GoogleID OR Email
        let user = await Login.findOne({
          $or: [{ googleId: googleId }, { username: email }]
        });

        if (user) {
          // 2. If user exists but hasn't linked Google yet, link it now
          if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
          }
          return done(null, user);
        }

        // 3. If no user exists, create a new one
        const newUser = await Login.create({
          username: email,
          googleId: googleId,
          role: "Candidate", // Default role
          profileCompleted: 0
        });

        return done(null, newUser);

      } catch (err) {
        console.error("Passport Auth Error:", err);
        return done(err, null);
      }
    }
  )
);

// ✅ Serialize: Save ONLY the user ID to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ✅ Deserialize: Find the user by ID from the database
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Login.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;