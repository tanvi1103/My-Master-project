const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const Certificate = require("../models/Certificate");
const XLSX = require("xlsx");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require('uuid');

// ==============================
// Multer Configuration (Secure)
// ==============================
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
      const uniqueName =
        crypto.randomBytes(8).toString("hex") + path.extname(file.originalname);
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /xlsx|xls/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
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

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
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
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// ========================
// Upload Students File
// ========================
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: "No file uploaded",
        type: "validation"
      });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetNameList = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

    // Validate required fields
    const requiredFields = ['certificateID', 'firstName', 'lastName', 'department', 
                          'gender', 'cgpa', 'program', 'gstatus', 'college', 
                          'startDate', 'endDate'];
    
    const missingFields = requiredFields.filter(field => 
      !data[0] || data[0][field] === undefined
    );

    if (missingFields.length > 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        type: "validation"
      });
    }

    // Check for duplicate certificateID within the file
    const certificateIDs = data.map(record => record.certificateID);
    const duplicateIDs = [...new Set(
      certificateIDs.filter((id, index) => certificateIDs.indexOf(id) !== index)
    )];

    if (duplicateIDs.length > 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: `Duplicate certificateID(s) in file: ${duplicateIDs.join(', ')}`,
        type: "duplicate",
        duplicateIds: duplicateIDs
      });
    }

    // Check for existing certificateIDs in database
    const existingCertificates = await Certificate.find({
      certificateID: { $in: certificateIDs }
    });

    if (existingCertificates.length > 0) {
      fs.unlinkSync(req.file.path);
      const existingIDs = existingCertificates.map(cert => cert.certificateID);
      return res.status(400).json({
        success: false,
        message: `CertificateID(s) already exist in database: ${existingIDs.join(', ')}`,
        type: "duplicate",
        duplicateIds: existingIDs
      });
    }

    // Process and validate each record
    const students = [];
    const errors = [];

    data.forEach((record, index) => {
      try {
        // Validate and process each field
        if (!record.certificateID || record.certificateID.trim() === '') {
          throw new Error('CertificateID cannot be empty');
        }

        const startDate = new Date(record.startDate);
        if (isNaN(startDate.getTime())) throw new Error('Invalid start date format');
        
        const endDate = new Date(record.endDate);
        if (isNaN(endDate.getTime())) throw new Error('Invalid end date format');
        
        if (startDate > endDate) throw new Error('Start date cannot be after end date');
        
        const cgpa = parseFloat(record.cgpa);
        if (isNaN(cgpa) || cgpa < 0 || cgpa > 4) throw new Error('CGPA must be between 0 and 4');

        students.push({
          certificateID: record.certificateID.trim(),
          firstName: record.firstName.trim(),
          middleName: record.middleName?.trim() || '',
          lastName: record.lastName.trim(),
          department: record.department.trim(),
          gender: record.gender.trim(),
          cgpa,
          program: record.program.trim(),
          gstatus: record.gstatus.trim(),
          college: record.college.trim(),
          startDate,
          endDate
        });
      } catch (error) {
        errors.push(`Row ${index + 2}: ${error.message}`);
      }
    });

    if (errors.length > 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Validation errors in Excel file',
        type: "validation",
        errors
      });
    }

    // Save to database with proper error handling
    try {
      const result = await Certificate.insertMany(students, { ordered: false });
      
      fs.unlinkSync(req.file.path);
      
      return res.status(201).json({ 
        success: true,
        message: "File processed successfully",
        recordsProcessed: result.length
      });

    } catch (mongoError) {
      fs.unlinkSync(req.file.path);
      
      if (mongoError.code === 11000) {
        // Extract duplicate IDs from the error
        let duplicateIds = [];
        
        if (mongoError.writeErrors) {
          duplicateIds = mongoError.writeErrors.map(err => err.err.op.certificateID);
        } else if (mongoError.keyValue) {
          duplicateIds = [mongoError.keyValue.certificateID];
        }

        return res.status(400).json({
          success: false,
          message: "Duplicate certificateID(s) found",
          type: "duplicate",
          duplicateIds,
          recordsProcessed: mongoError.result?.insertedCount || 0
        });
      }

      // For other MongoDB errors
      return res.status(500).json({
        success: false,
        message: "Database error occurred",
        type: "database",
        error: mongoError.message
      });
    }

  } catch (error) {
    console.error('Upload error:', error);
    
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Server error processing file",
      type: "server",
      error: error.message
    });
  }
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
    const certificate = await Certificate.findOne({
      certificateID: req.params.certificateID,
    });
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
    const result = await Certificate.findOneAndDelete({
      certificateID: req.params.certificateID,
    });
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
    return res
      .status(400)
      .json({ message: "Validation failed", errors: errors.array() });
  }

  try {
    const {
      certificateID,
      firstName,
      middleName,
      lastName,
      department,
      college,
      gender,
      cgpa,
      program,
      gstatus,
      startDate,
      endDate,
    } = req.body;

    const existing = await Certificate.findOne({ certificateID });
    if (existing) {
      return res
        .status(400)
        .json({ message: `Certificate ID ${certificateID} already exists` });
    }

    const certificate = new Certificate({
      certificateID: uuidv4(),
      firstName,
      middleName,
      lastName,
      department,
      college,
      gender,
      cgpa,
      program,
      gstatus,
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
