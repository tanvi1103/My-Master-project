const express = require("express");
const {
  getCertificateById,
  generateCertificatePDF,
  getCertificateByName,
  applyForCertificate,
} = require("../controllers/certificateController");

const router = express.Router();

// Route for fetching certificate by ID
router.get("/name", getCertificateByName);
router.post("/apply", applyForCertificate);
router.get("/:id", getCertificateById);

// Route for generating PDF of certificate
router.get("/:id/pdf", generateCertificatePDF);

module.exports = router;
