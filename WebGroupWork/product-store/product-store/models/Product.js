// Import Mongoose library to define a schema and model
const mongoose = require('mongoose');

// Define the schema for a product document
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Product must have a name
  },
  price: {
    type: Number,
    required: true // Product must have a price
  },
  description: String, // Optional description of the product
  category: String // Optional product category
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the Product model based on the product schema
module.exports = mongoose.model('Product', productSchema);

