const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Or bcrypt depending on what's available
require("dotenv").config();

const Admin = require("./models/Admin");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/graduation_project")
  .then(() => {
    console.log("MongoDB Connected");
    seedDatabase();
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Determine bcrypt implementation based on what User.js uses (bcrypt vs bcryptjs)
    const bcryptLib = require('bcryptjs'); 

    const hashedPasswordAdmin = await bcryptLib.hash("admin123", 10);
    const hashedPasswordRegistrar = await bcryptLib.hash("registrar123", 10);
    const hashedPasswordUser = await bcryptLib.hash("user1234", 10); // user password min 8 chars

    // 1. Create Admin
    await Admin.deleteOne({ email: "admin@mitadt.com" });
    const admin = new Admin({
      email: "admin@mitadt.com",
      password: hashedPasswordAdmin,
      firstName: "Admin",
      lastName: "User",
      gender: "male",
      role: "admin"
    });
    await admin.save();
    console.log("✅ Admin created: admin@mitadt.com / admin123");

    // 2. Create Registrar
    await Admin.deleteOne({ email: "registrar@mitadt.com" });
    const registrar = new Admin({
      email: "registrar@mitadt.com",
      password: hashedPasswordRegistrar,
      firstName: "Registrar",
      lastName: "User",
      gender: "female",
      role: "registrar"
    });
    await registrar.save();
    console.log("✅ Registrar created: registrar@mitadt.com / registrar123");

    // 3. Create Regular User
    await User.deleteOne({ email: "user@mitadt.com" });
    await User.deleteOne({ nationalIdNumber: "1234567890123456" });
    
    const user = new User({
      nationalIdNumber: "1234567890123456",
      firstName: "Demo",
      lastName: "User",
      gender: "male",
      phone: "1234567890",
      email: "user@mitadt.com",
      password: "user1234", // Mongoose pre-save hook might hash this again, let's use plaintext if hook exists
      isVerified: true
    });
    await user.save();
    console.log("✅ Regular User created: user@mitadt.com / user1234");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}
