const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  certificateID: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  gstatus: {
    type: String,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
    min: 1.75, // optional: minimum value constraint
    max: 4, // optional: maximum value constraint (assuming 4.0 scale)
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  photo: {
    type: String,
    default: () => {
      const gender = Math.random() > 0.5 ? 'men' : 'women';
      const id = Math.floor(Math.random() * 100);
      return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
    }
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Certificate", CertificateSchema);
