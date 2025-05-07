const mongoose = require('mongoose');
const { rotate } = require('pdfkit');

const adminSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  notifications: [
    {
      message: String,
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  role: { 
    type: String, 
    enum: ['admin', 'registrar'], 
    default: 'admin' 
  },
});

module.exports = mongoose.model('Admin', adminSchema);



