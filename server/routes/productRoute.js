const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminMiddleware");
const userAuth = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");
const productMiddleware = require("../middlewares/productMiddleware");

router
  .get("/:productId", productMiddleware, productController.getProduct)
  .get(
    "/photo/:productId",
    productMiddleware,
    productController.getProductPhoto
  )
  .post("/", userAuth, adminAuth, productController.addProduct);

module.exports = router;
