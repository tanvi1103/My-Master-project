const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
  loginAdmin,
  getAllCertificates,
  getSingleCertificate,
  updateSingleCertificate,
  deleteSingleCertificate,
  addStudentCredentials,
  logoutAdmin,
  uploadFile,
  getNotification,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/login", loginAdmin);
router.get('/logout', logoutAdmin);

router.post("/addStudents", authenticateToken, addStudentCredentials);
router.post("/upload", authenticateToken, uploadFile); // Ensure this matches your backend route

router.get("/certificates", getAllCertificates);
router.get("/notifications", getNotification);
router.get("/certificates/:certificateID", getSingleCertificate);
router.delete("/certificates/:certificateID", authenticateToken, deleteSingleCertificate);
router.put("/certificates/:certificateID/edit", authenticateToken, updateSingleCertificate);

module.exports = router;
