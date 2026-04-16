const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
    EnquiryName: { type: String, default: null },
    Email: { type: String, default: null },
    Subject: { type: String, default: null },
    Message: { type: String, default: null },
    Status: { type: String, default: 'Active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);

