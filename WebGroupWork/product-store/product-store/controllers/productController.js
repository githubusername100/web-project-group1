const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from database
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message }); // Internal server error
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID
    if (!product) return res.status(404).json({ message: 'Product not found' }); // If not found, return 404
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Create new product with request body
    await newProduct.save(); // Save to database
    res.status(201).json(newProduct); // Return created product
  } catch (err) {
    res.status(400).json({ error: err.message }); // Bad request
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id); // Delete product
    res.json({ message: 'Product deleted' }); // Return confirmation
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
