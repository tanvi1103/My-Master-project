// passport.js

const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

// Only load Google strategy if credentials exist
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  const GoogleStrategy = require("passport-google-oauth20").Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(new Error("No email found in Google profile"), null);
          }

          let user = await User.findOne({ email });

          if (!user) {
            user = new User({
              email,
              firstName: profile.name?.givenName || "GoogleUser",
              lastName: profile.name?.familyName || "",
              isVerified: true,
              role: "user",
              password: "",
            });

            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  console.log("✅ Google OAuth Enabled");
} else {
  console.log("⚠️ Google OAuth Disabled (Missing credentials)");
}

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;