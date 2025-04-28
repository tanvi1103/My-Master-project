const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const Certificate = require("../models/Certificate");
const XLSX = require("xlsx");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

// ==============================
// Multer Configuration (Secure)
// ==============================
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
      const uniqueName = crypto.randomBytes(8).toString("hex") + path.extname(file.originalname);
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /xlsx|xls/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only Excel files (xlsx, xls) are allowed!"));
  },
}).single("file");

// ========================
// Admin Login
// ========================
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ========================
// Admin Logout
// ========================
const logoutAdmin = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// ========================
// Upload Students File
// ========================
const uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || "Upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const workbook = XLSX.readFile(req.file.path);
      const sheetNameList = workbook.SheetNames;
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

      const students = data.map(record => ({
        certificateID: record.certificateID,
        firstName: record.firstName,
        middleName: record.middleName,
        lastName: record.lastName,
        department: record.department,
        gender: record.gender,
        cgpa: record.cgpa,
        college: record.college,
        startDate: record.startDate,
        endDate: record.endDate,
      }));

      await Student.insertMany(students);
      res.status(200).json({ message: "File uploaded and data saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error processing file" });
    }
  });
};

// ========================
// Get All Certificates
// ========================
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    if (!certificates.length) {
      return res.status(404).json({ message: "No certificates found" });
    }
    res.status(200).json(certificates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ========================
// Get Single Certificate
// ========================
const getSingleCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateID: req.params.certificateID });
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ========================
// Update Single Certificate
// ========================
const updateSingleCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOneAndUpdate(
      { certificateID: req.params.certificateID },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ========================
// Delete Single Certificate
// ========================
const deleteSingleCertificate = async (req, res) => {
  try {
    const result = await Certificate.findOneAndDelete({ certificateID: req.params.certificateID });
    if (!result) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ========================
// Add New Certificate
// ========================
const addStudentCredentials = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed", errors: errors.array() });
  }

  try {
    const { certificateID, studentName, internshipDomain, startDate, endDate } = req.body;

    const existing = await Certificate.findOne({ certificateID });
    if (existing) {
      return res.status(400).json({ message: `Certificate ID ${certificateID} already exists` });
    }

    const certificate = new Certificate({
      certificateID,
      studentName,
      internshipDomain,
      startDate,
      endDate,
    });

    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ========================
// Export Controllers
// ========================
module.exports = {
  loginAdmin,
  logoutAdmin,
  uploadFile,
  getAllCertificates,
  getSingleCertificate,
  updateSingleCertificate,
  deleteSingleCertificate,
  addStudentCredentials,
};
