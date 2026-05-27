const mongoose = require("mongoose");
const bcryptLib = require("bcrypt"); // User.js uses bcrypt, not bcryptjs usually! Wait, I'll check.
const bcryptjs = require("bcryptjs");
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
    // 1. Create Admin (Admin Collection)
    const hashedAdminPassword = await bcryptjs.hash("admin123", 10);
    await Admin.deleteOne({ email: "admin@mitadt.com" });
    const admin = new Admin({
      email: "admin@mitadt.com",
      password: hashedAdminPassword,
      firstName: "Admin",
      lastName: "User",
      gender: "male",
      role: "admin"
    });
    await admin.save();
    console.log("✅ Admin created: admin@mitadt.com / admin123");

    // 2. Create Registrar (User Collection)
    await User.deleteOne({ email: "registrar@mitadt.com" });
    await User.deleteOne({ nationalIdNumber: "9876543210987654" });
    const registrar = new User({
      nationalIdNumber: "9876543210987654",
      firstName: "Registrar",
      lastName: "User",
      gender: "female",
      phone: "0987654321",
      email: "registrar@mitadt.com",
      password: "registrar123", // Mongoose pre-save hook in User.js will hash this using bcrypt
      role: "registrar",
      isVerified: true
    });
    await registrar.save();
    console.log("✅ Registrar created: registrar@mitadt.com / registrar123");

    // 3. Create Regular User (User Collection)
    await User.deleteOne({ email: "user@mitadt.com" });
    await User.deleteOne({ nationalIdNumber: "1234567890123456" });
    const user = new User({
      nationalIdNumber: "1234567890123456",
      firstName: "Demo",
      lastName: "User",
      gender: "male",
      phone: "1234567890",
      email: "user@mitadt.com",
      password: "user1234", 
      role: "user",
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
