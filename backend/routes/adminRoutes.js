const express = require("express");
const {
  authenticateUser,
  roleMiddleware,
  verifyAdminToken,
} = require("../middleware/authMiddleware");
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
  deleteNotification,
  markNotificationAsRead,
  createUserByAdmin,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/logout", logoutAdmin);

router.post(
  "/createUser",
  authenticateUser,
  roleMiddleware(["admin"]),
  createUserByAdmin
);

router.post(
  "/addStudents",
  authenticateUser,
  roleMiddleware(["admin", "registrar"]),
  addStudentCredentials
);

router.post(
  "/upload",
  roleMiddleware(["admin", "registrar"]),
  authenticateUser,
  uploadFile
); // Ensure this matches your backend route

router.get(
  "/certificates",
  authenticateUser,
  roleMiddleware(["admin", "registrar"]),
  getAllCertificates
);
router.get("/notifications", getNotification);
router.delete("/notifications/:id", deleteNotification);
router.put("/notifications/:id/read", markNotificationAsRead);
router.get("/certificates/:certificateID", getSingleCertificate);
router.delete(
  "/certificates/:certificateID",
  authenticateUser,
  roleMiddleware(["admin", "registrar"]),
  deleteSingleCertificate
);
router.put(
  "/certificates/:certificateID/edit",
  authenticateUser,
  roleMiddleware(["admin", "registrar"]),
  updateSingleCertificate
);

module.exports = router;
