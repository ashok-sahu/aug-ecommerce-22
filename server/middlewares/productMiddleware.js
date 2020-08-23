const mongoose = require("mongoose");
const Product = require("../models/Product/ProductModel");

module.exports = async function (req, res, next) {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(403).json({
      status: "failed",
      error: "product not in database",
    });
  }

  try {
    let product = await Product.findById(productId).populate("category");
    if (!product) {
      return res.status(403).json({
        status: "failed",
        error: "product not found!",
      });
    }
    req.product = product;
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "failed",
      error: error,
    });
  }
  next();
};
