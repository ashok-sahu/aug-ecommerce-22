const fs = require("fs");
const formidable = require("formidable");
const Product = require("../models/Product/ProductModel");

exports.addProduct = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        status: "failed",
        message: "image could not be uploaded",
        error: err,
      });
    }
    if (!files.photo) {
      return res.status(400).json({
        status: "failed",
        error: "image is required!",
      });
    }
    if (
      files.photo.type !== "image/jpeg" &&
      files.photo.type !== "image/jpg" &&
      files.photo.type !== "image/png"
    ) {
      return res.status(400).json({
        status: "failed",
        error: "Image type not support!",
      });
    }
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        status: "failed",
        error: "all fields are required!",
      });
    }

    let product = new Product(fields);
    //1mb = 1000000
    if (files.photo.size > 1000000) {
      return res.status(400).json({
        status: "failed",
        error: "image size must be below 1mb",
      });
    }

    product.photo.data = fs.readFileSync(files.photo.path);
    product.photo.contentType = files.photo.type;

    try {
      await product.save();
      res.status(200).json({
        status: "success",
        message: "Product Created Successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: "failed",
        message: "error while creating product",
        error: error,
      });
    }
  });
};

exports.getProduct = async (req,res,next) =>{
    if(req.product.photo){
        req.product.photo = undefined
        return res.status(200).json({
            status:'success',
            data:req.product
        })
    }
}

exports.getProductPhoto = async (req,res,next) =>{
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.contentType)
        return res.status(200).json({
            status:'success',
            data:req.product.photo.data
        })
    }
    res.status(400).json({
        status:'failed',
        error:'failed to load image'
    })
}