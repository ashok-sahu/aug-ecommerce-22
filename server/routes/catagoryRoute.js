const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminMiddleware");
const userAuth = require("../middlewares/authMiddleware");
const categoryMiddleware = require("../middlewares/categoryMiddleware");
const validator = require("../validators/CatagoryValidators");
const categoryController = require("../controllers/catagoryController");

router
  .get("/all", categoryController.getAllCategory)
  .get(
    "/:categoryId",
    categoryMiddleware,
    categoryController.getCategory
  )
  .post(
    "/",
    validator.isRequestValidated,
    userAuth,
    adminAuth,
    validator.validateCatagoryRequest,
    categoryController.addCategory
  )
  .put(
    "/:categoryId",
    userAuth,
    adminAuth,
    categoryMiddleware,
    categoryController.updateCategory
  )
  .delete(
    "/:categoryId",
    userAuth,
    adminAuth,
    categoryMiddleware,
    categoryController.deleteCategory
  );

module.exports = router;
