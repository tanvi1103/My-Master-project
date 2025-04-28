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
} = require("../controllers/adminController");

const router = express.Router();

router.post("/login", loginAdmin);
router.get('/logout', logoutAdmin);

router.post("/addStudents", addStudentCredentials); 
router.get("/certificates", authenticateToken, getAllCertificates);
router.get("/certificates/:certificateID", getSingleCertificate);
router.delete("/certificates/:certificateID", authenticateToken, deleteSingleCertificate);
router.put("/certificates/:certificateID/edit", authenticateToken, updateSingleCertificate);

module.exports = router;
