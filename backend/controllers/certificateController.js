const PDFDocument = require("pdfkit");
const Certificate = require("../models/Certificate");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
exports.getCertificateByName = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      cgpa,
      department,
      endDate,
      gender,
    } = req.query; // <-- use req.query

    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !cgpa ||
      !department ||
      !endDate ||
      !gender
    ) {
      return res
        .status(400)
        .json({
          message: "all fields are required, please fill and try again",
        });
    }
    const endYear = parseInt(endDate, 10);
    const certificate = await Certificate.findOne({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      cgpa: cgpa,
      department: department,
      gender: gender,
      $expr: { $eq: [{ $year: "$endDate" }, endYear] },
    });

    if (!certificate) {
      console.log("No certificate found for the given student and domain");
      return res.status(404).json({ message: "Certificate not found" });
    }

    console.log("Certificate found:", certificate);
    res.json(certificate);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      certificateID: req.params.id,
    });

    if (!certificate) {
      console.log("No certificate found"); // Debugging: Log if no certificate is found
      return res.status(404).json({ message: "Certificate not found" });
    }

    console.log("Certificate data:", certificate); // Debugging: Log the found certificate data
    res.json(certificate); // Return JSON here
  } catch (error) {
    console.error("Server error:", error); // Debugging: Log the server error details
    res.status(500).json({ message: "Server error" });
  }
};

// Generate PDF certificate
// exports.generateCertificatePDF = async (req, res) => {
//   try {
//     const certificate = await Certificate.findOne({
//       certificateID: req.params.id,
//     });

//     if (!certificate) {
//       return res.status(404).send("Certificate not found");
//     }
//     const fullName = `${certificate.firstName} ${certificate.middleName} ${certificate.lastName}`;
//     const department = `B.Sc in ${certificate.department}`;
//     const doc = new PDFDocument({ size: "A4", layout: "landscape" });
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename="${certificate.firstName}_certificate.pdf"`
//     );
//     res.setHeader("Content-Type", "application/pdf");

//     doc.pipe(res);

//     // Draw background rectangle
//     doc
//       .rect(0, 0, doc.page.width, doc.page.height)
//       .fill("#f9f9f9")
//       .stroke("#4a90e2")
//       .lineWidth(8);

//     // Certificate Header
//     doc
//       .fontSize(20)
//       .fillColor("#4a90e2")
//       .text("Certificate of Achievement", { align: "center", underline: true })
//       .moveDown(0.5);

//     // Main Content
//     doc
//       .fontSize(14)
//       .fillColor("#333")
//       .text("This certifies that", { align: "center" })
//       .moveDown(0.5);

//     doc
//       .fontSize(24)
//       .fillColor("#4a90e2")
//       .text(fullName, { align: "center" })
//       .moveDown(0.5);

//     doc
//       .fontSize(14)
//       .fillColor("#333")
//       .text("has successfully completed the", { align: "center" })
//       .moveDown(0.5);

//     doc
//       .fontSize(18)
//       .fillColor("#4a90e2")
//       .text(department, { align: "center" })
//       .moveDown(0.5);

//     doc
//       .fontSize(14)
//       .fillColor("#333")
//       .text(
//         `Duration: ${new Date(
//           certificate.startDate
//         ).toLocaleDateString()} - ${new Date(
//           certificate.endDate
//         ).toLocaleDateString()}`,
//         { align: "center" }
//       )
//       .moveDown(1);

//     doc
//       .fontSize(12)
//       .fillColor("#666")
//       .text(
//         "We commend your dedication and exceptional performance throughout the course. This certificate is a testament to your hard work and commitment.",
//         { align: "center" }
//       )
//       .moveDown(1);

//     // Signature and Date Section
//     doc
//       .fontSize(12)
//       .fillColor("#333")
//       .text("Signature:", { align: "center" })
//       .moveDown(0.5)
//       .text("CertiSys", { align: "center" }) // Placeholder for signature
//       .moveDown(1);

//     doc
//       .text("Date of Issue:", { align: "center" })
//       .text(new Date().toLocaleDateString(), { align: "center" })
//       .moveDown(1);

//     // Footer
//     doc
//       .fontSize(10)
//       .fillColor("#777")
//       .text("Certified by CertiSys", { align: "center" })
//       .moveDown(1);

//     // --- QR Code Section ---

//     const qrUrl = `http://localhost:5173/certificate/${certificate.certificateID}`;
//     const qrDataUrl = await QRCode.toDataURL(qrUrl);

//     // Place QR code at bottom right
//     doc.image(qrDataUrl, doc.page.width - 120, doc.page.height - 120, {
//       width: 100,
//       height: 100,
//     });

//     // Finalize PDF file
//     doc.end();
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     res.status(500).send("Error generating PDF");
//   }
// };


exports.generateCertificatePDF = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateID: req.params.id });

    if (!certificate) return res.status(404).send("Certificate not found");

    const fullName = `${certificate.firstName} ${certificate.middleName} ${certificate.lastName}`;
    const department = `Bachelor of Science in ${certificate.department}`;

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margins: { top: 40, bottom: 20, left: 50, right: 50 },
    });

    res.setHeader("Content-Disposition", `attachment; filename="${certificate.firstName}_certificate.pdf"`);
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Border and background
    doc
      .save()
      .lineWidth(5)
      .strokeColor("#1a3e72")
      .fillColor("#fffdf6")
      .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .fillAndStroke()
      .restore();

    // University seal (top center)
    if (fs.existsSync("./public/university-seal.png")) {
      doc.image("./public/university-seal.png", 
        doc.page.width / 2 - 70, 20, { width: 150 });

    }

    // Header text
    doc
      .moveDown(5)
      .fontSize(20).fillColor("#1a3e72").font("Helvetica-Bold").text("BONGA UNIVERSITY", { align: "center" })
      .moveDown(0.2)
      .fontSize(14).font("Helvetica").text("Office of the Registrar", { align: "center" })
      .moveDown(0.6)
      .fontSize(24).font("Helvetica-Bold").text("CERTIFICATE OF COMPLETION", { align: "center", underline: true })
      .moveDown(0.8);

    // Main body text
    doc
      .fontSize(14).fillColor("#333").font("Helvetica").text("This is to certify that", { align: "center" }).moveDown(0.6)
      .fontSize(26).fillColor("#1a3e72").font("Helvetica-Bold").text(fullName.toUpperCase(), { align: "center" }).moveDown(0.6)
      .fontSize(14).fillColor("#333").font("Helvetica")
      .text("has successfully fulfilled all requirements for the degree of", { align: "center" }).moveDown(0.5)
      .fontSize(20).fillColor("#1a3e72").font("Helvetica-Bold").text(department, { align: "center" }).moveDown(0.8);

    // Program duration
    doc
      .fontSize(12).fillColor("#555").font("Helvetica-Oblique")
      .text(
        `Program Duration: ${new Date(certificate.startDate).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric"
        })} to ${new Date(certificate.endDate).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric"
        })}`,
        { align: "center" }
      )
      .moveDown(0.8);

    // Degree conferment
    doc
      .fontSize(12).fillColor("#333").font("Helvetica")
      .text(
        "The University Senate has conferred this degree with all the rights, privileges, and honors appertaining thereto.",
        { align: "center" }
      )

    // Signature section
    const sigY = doc.page.height - 170;

    doc
      .fontSize(12).text("_________________________", 100, sigY, { align: "center", width: 200 })
      .font("Helvetica-Bold").text("Dr. Jane Smith", 100, sigY + 20, { align: "center", width: 200 })
      .font("Helvetica").text("University Registrar", 100, sigY + 40, { align: "center", width: 200 });

    doc
      .fontSize(12).text("_________________________", doc.page.width / 2 - 100, sigY, { align: "center", width: 200 })
      .font("Helvetica-Bold").text("Dr. Robert Johnson", doc.page.width / 2 - 100, sigY + 20, { align: "center", width: 200 })
      .font("Helvetica").text("Dean, Faculty of Sciences", doc.page.width / 2 - 100, sigY + 40, { align: "center", width: 200 });

    doc
      .fontSize(12).text("_________________________", doc.page.width - 300, sigY, { align: "center", width: 200 })
      .text("Date of Conferral", doc.page.width - 300, sigY + 20, { align: "center", width: 200 })
      .text(
        new Date().toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric"
        }),
        doc.page.width - 300,
        sigY + 40,
        { align: "center", width: 200 }
      );

    // Bottom seal
    if (fs.existsSync("./public/university-seal.png")) {
      doc.image("./public/university-seal.png", doc.page.width / 2 - 35, 
        doc.page.height - 125, { width: 150 });
    }

    // QR code
    doc.roundedRect(doc.page.width - 120, doc.page.height - 120, 80, 80, 5)
       .stroke("#1a3e72")
       .lineWidth(1);
    const qrUrl = `http://localhost:5173/certificate/${certificate.certificateID}`;
    const qrDataUrl = await QRCode.toDataURL(qrUrl);
    doc.image(qrDataUrl, doc.page.width - 110, doc.page.height - 110, { width: 60 });
   
    

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};
