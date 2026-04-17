const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    CategoryName: { type: String, default: null },
    description: { type: String, default: null },
    Status: { type: String, default: 'Active' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Categories', CategorySchema)



